const ytdl = require('@distube/ytdl-core');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('ffmpeg-static');

module.exports = async (req, res) => {
  if (req.method !== 'GET') return res.status(405).json({ error: 'GET only' });
  const { videoId } = req.query;
  const start = Number(req.query.start), end = Number(req.query.end);
  if (!videoId || !ytdl.validateID(videoId) || !Number.isInteger(start) || !Number.isInteger(end) || start < 0 || end <= start || end - start > 60) {
    return res.status(400).json({ error: 'Invalid clip range.' });
  }
  try {
    const info = await ytdl.getInfo(videoId);
    const duration = Number(info.videoDetails.lengthSeconds);
    if (start >= duration) return res.status(400).json({ error: 'Clip starts outside the video.' });
    const actualEnd = Math.min(end, duration);
    res.setHeader('Content-Type', 'video/mp4');
    res.setHeader('Content-Disposition', `attachment; filename="clip-${start}-${actualEnd}.mp4"`);
    res.setHeader('Cache-Control', 'no-store');
    const input = ytdl.downloadFromInfo(info, { quality: '18', filter: 'audioandvideo' });
    ffmpeg(input)
      .setStartTime(start)
      .duration(actualEnd - start)
      .videoCodec('libx264')
      .audioCodec('aac')
      .format('mp4')
      .outputOptions('-movflags frag_keyframe+empty_moov')
      .on('error', error => { if (!res.headersSent) res.status(500).json({ error: 'Clip encoding failed.' }); })
      .pipe(res, { end: true });
  } catch (error) {
    return res.status(502).json({ error: 'Unable to download this video. It may be private, restricted, or unavailable.' });
  }
};
ffmpeg.setFfmpegPath(ffmpegPath);
