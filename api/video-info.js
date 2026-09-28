const ytdl = require('@distube/ytdl-core');

module.exports = async (req, res) => {
  if (req.method !== 'GET') return res.status(405).json({ error: 'GET only' });
  const { videoId } = req.query;
  if (!videoId || !ytdl.validateID(videoId)) return res.status(400).json({ error: 'Invalid YouTube video ID.' });
  try {
    const info = await ytdl.getInfo(videoId);
    const duration = Number(info.videoDetails.lengthSeconds);
    if (!duration) throw new Error('Video duration unavailable.');
    res.setHeader('Cache-Control', 'public, max-age=300');
    return res.status(200).json({ duration });
  } catch (error) {
    return res.status(502).json({ error: 'Unable to read this YouTube video. It may be private, restricted, or unavailable.' });
  }
};
