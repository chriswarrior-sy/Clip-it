# Clip-it
YouTube clipper generator website 
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>YouTube Video Clipper</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh; padding: 20px; }
        .container { max-width: 1200px; margin: 0 auto; background: white; border-radius: 20px; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3); overflow: hidden; }
        header { background: linear-gradient(135deg, #ff0000 0%, #cc0000 100%); color: white; padding: 40px 20px; text-align: center; }
        header h1 { font-size: 2.5em; margin-bottom: 10px; }
        header p { font-size: 1.1em; opacity: 0.9; }
        .main-content { padding: 40px 20px; }
        .input-section { max-width: 800px; margin: 0 auto 40px; text-align: center; }
        .input-section label { display: block; font-weight: bold; margin-bottom: 10px; color: #333; }
        .input-section input { width: 100%; padding: 15px 20px; font-size: 16px; border: 2px solid #ddd; border-radius: 10px; margin-bottom: 15px; transition: border-color 0.3s; }
        .input-section input:focus { outline: none; border-color: #667eea; }
        .input-section button { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; padding: 15px 40px; font-size: 16px; border-radius: 10px; cursor: pointer; font-weight: bold; transition: transform 0.2s, box-shadow 0.2s; }
        .input-section button:hover { transform: translateY(-2px); box-shadow: 0 10px 20px rgba(102, 126, 234, 0.4); }
        .video-container { max-width: 1000px; margin: 0 auto; }
        #youtube-player, #preview-player { width: 100%; aspect-ratio: 16/9; background: #000; border-radius: 10px; overflow: hidden; }
        .clip-controls { background: #f8f9fa; padding: 30px; border-radius: 10px; margin-top: 20px; }
        .clip-controls h2 { color: #333; margin-bottom: 20px; }
        .time-inputs { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px; }
        .time-group { background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); }
        .time-group label { display: block; font-weight: bold; margin-bottom: 10px; color: #555; }
        .time-group input { width: 60px; padding: 10px; font-size: 18px; text-align: center; border: 2px solid #ddd; border-radius: 5px; margin-right: 5px; }
        .time-group input:focus { outline: none; border-color: #667eea; }
        .quick-actions { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 20px; }
        .quick-actions button { background: #6c757d; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; font-size: 14px; }
        .quick-actions button:hover { background: #5a6268; }
        .duration-display { background: #e9ecef; padding: 15px; border-radius: 5px; text-align: center; margin-bottom: 20px; font-weight: bold; color: #333; }
        .create-btn, .preview-btn { width: 100%; padding: 15px; font-size: 18px; border: none; border-radius: 10px; cursor: pointer; font-weight: bold; margin-bottom: 10px; transition: transform 0.2s, box-shadow 0.2s; }
        .create-btn { background: linear-gradient(135deg, #28a745 0%, #218838 100%); color: white; }
        .create-btn:hover { transform: translateY(-2px); box-shadow: 0 10px 20px rgba(40, 167, 69, 0.4); }
        .preview-btn { background: linear-gradient(135deg, #ffc107 0%, #e0a800 100%); color: #333; }
        .preview-btn:hover { transform: translateY(-2px); box-shadow: 0 10px 20px rgba(255, 193, 7, 0.4); }
        .download-section { background: #d4edda; padding: 30px; border-radius: 10px; text-align: center; margin-top: 20px; }
        .download-section h3 { color: #155724; margin-bottom: 10px; }
        .download-section p { color: #155724; margin-bottom: 20px; }
        .download-btn { display: inline-block; background: linear-gradient(135deg, #28a745 0%, #218838 100%); color: white; padding: 15px 40px; border-radius: 10px; text-decoration: none; font-weight: bold; font-size: 18px; margin-bottom: 10px; }
        .secondary-btn { display: block; width: 100%; padding: 15px; background: #6c757d; color: white; border: none; border-radius: 10px; font-size: 16px; cursor: pointer; font-weight: bold; }
        .error-message { background: #f8d7da; color: #721c24; padding: 20px; border-radius: 10px; margin: 20px 0; border: 1px solid #f5c6cb; }
        .hidden { display: none; }
        footer { background: #f8f9fa; padding: 20px; text-align: center; color: #666; border-top: 2px solid #e9ecef; }
        @media (max-width: 768px) { header h1 { font-size: 1.8em; } .time-inputs { grid-template-columns: 1fr; } .quick-actions { grid-template-columns: 1fr; } }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>🎬 YouTube Video Clipper</h1>
            <p>Create short clips from YouTube videos instantly</p>
        </header>

        <div class="main-content">
            <div class="input-section">
                <label for="youtube-url">Enter YouTube URL:</label>
                <input type="text" id="youtube-url" placeholder="https://www.youtube.com/watch?v=..." required>
                <button id="load-video">Load Video</button>
            </div>

            <div id="video-container" class="video-container hidden">
                <div id="youtube-player"></div>
                
                <div class="clip-controls">
                    <h2>Set Clip Parameters</h2>
                    
                    <div class="time-inputs">
                        <div class="time-group">
                            <label>Start Time:</label>
                            <input type="number" id="start-hours" placeholder="HH" min="0" max="23" value="0">
                            <input type="number" id="start-minutes" placeholder="MM" min="0" max="59" value="0">
                            <input type="number" id="start-seconds" placeholder="SS" min="0" max="59" value="0">
                        </div>

                        <div class="time-group">
                            <label>End Time:</label>
                            <input type="number" id="end-hours" placeholder="HH" min="0" max="23" value="0">
                            <input type="number" id="end-minutes" placeholder="MM" min="0" max="59" value="0">
                            <input type="number" id="end-seconds" placeholder="SS" min="0" max="59" value="0">
                        </div>
                    </div>

                    <div class="quick-actions">
                        <button id="set-current-start">Set Start to Current Position</button>
                        <button id="set-current-end">Set End to Current Position</button>
                    </div>

                    <div class="duration-display">
                        <span>Clip Duration: <span id="clip-duration">0s</span></span>
                    </div>

                    <button id="create-clip" class="create-btn">Create Clip</button>
                    <button id="preview-clip" class="preview-btn">Preview Clip</button>
                </div>

                <div id="preview-container" class="preview-container hidden">
                    <h3>Preview</h3>
                    <div id="preview-player"></div>
                </div>

                <div id="download-section" class="download-section hidden">
                    <h3>✅ Clip Created Successfully!</h3>
                    <p>Your clip is ready for download</p>
                    <a id="download-link" class="download-btn">Download Clip</a>
                    <button id="create-another" class="secondary-btn">Create Another Clip</button>
                </div>
            </div>

            <div id="error-message" class="error-message hidden"></div>
        </div>

        <footer>
            <p>⚠️ For personal use only. Respect copyright and YouTube's Terms of Service.</p>
        </footer>
    </div>

    <script>
        let player;
        let previewPlayer;
        let videoId = null;

        function onYouTubeIframeAPIReady() {
            console.log('YouTube API ready');
        }

        document.addEventListener('DOMContentLoaded', function() {
            document.getElementById('load-video').addEventListener('click', loadVideo);
            document.getElementById('set-current-start').addEventListener('click', setCurrentStartTime);
            document.getElementById('set-current-end').addEventListener('click', setCurrentEndTime);
            document.getElementById('create-clip').addEventListener('click', createClip);
            document.getElementById('preview-clip').addEventListener('click', previewClip);
            document.getElementById('create-another').addEventListener('click', resetForm);

            const timeInputs = document.querySelectorAll('input[type="number"]');
            timeInputs.forEach(input => {
                input.addEventListener('change', updateDuration);
            });
        });

        function validateYouTubeURL(url) {
            const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
            const match = url.match(regex);
            return match ? match[1] : null;
        }

        function loadVideo() {
            const url = document.getElementById('youtube-url').value.trim();
            videoId = validateYouTubeURL(url);

            if (!videoId) {
                showError('Invalid YouTube URL. Please enter a valid YouTube video URL.');
                return;
            }

            hideError();
            document.getElementById('video-container').classList.remove('hidden');

            if (player) {
                player.destroy();
            }

            player = new YT.Player('youtube-player', {
                height: '100%',
                width: '100%',
                videoId: videoId,
                playerVars: {
                    'playsinline': 1,
                    'rel': 0,
                    'modestbranding': 1
                },
                events: {
                    'onReady': onPlayerReady,
                    'onStateChange': onPlayerStateChange
                }
            });
        }

        function onPlayerReady(event) {
            console.log('Player ready');
        }

        function onPlayerStateChange(event) {
            if (event.data === YT.PlayerState.PLAYING) {
                checkClipEnd();
            }
        }

        function checkClipEnd() {
            if (player && previewPlayer) {
                const currentTime = player.getCurrentTime();
                const endTime = getTimeInSeconds('end');
                if (currentTime >= endTime) {
                    player.pauseVideo();
                }
            }
        }

        function setCurrentStartTime() {
            if (!player || !player.getCurrentTime) return;
            const currentTime = Math.floor(player.getCurrentTime());
            setTimeFromSeconds('start', currentTime);
            updateDuration();
        }

        function setCurrentEndTime() {
            if (!player || !player.getCurrentTime) return;
            const currentTime = Math.floor(player.getCurrentTime());
            setTimeFromSeconds('end', currentTime);
            updateDuration();
        }

        function setTimeFromSeconds(prefix, totalSeconds) {
            const hours = Math.floor(totalSeconds / 3600);
            const minutes = Math.floor((totalSeconds % 3600) / 60);
            const seconds = totalSeconds % 60;

            document.getElementById(`${prefix}-hours`).value = hours;
            document.getElementById(`${prefix}-minutes`).value = minutes;
            document.getElementById(`${prefix}-seconds`).value = seconds;
        }

        function getTimeInSeconds(prefix) {
            const hours = parseInt(document.getElementById(`${prefix}-hours`).value) || 0;
            const minutes = parseInt(document.getElementById(`${prefix}-minutes`).value) || 0;
            const seconds = parseInt(document.getElementById(`${prefix}-seconds`).value) || 0;
            return hours * 3600 + minutes * 60 + seconds;
        }

        function updateDuration() {
            const startTime = getTimeInSeconds('start');
            const endTime = getTimeInSeconds('end');
            const duration = endTime - startTime;
            document.getElementById('clip-duration').textContent = duration > 0 ? `${duration}s` : '0s';
        }

        function previewClip() {
            const startTime = getTimeInSeconds('start');
            const endTime = getTimeInSeconds('end');

            if (endTime <= startTime) {
                showError('End time must be greater than start time.');
                return;
            }

            hideError();
            document.getElementById('preview-container').classList.remove('hidden');

            if (previewPlayer) {
                previewPlayer.destroy();
            }

            previewPlayer = new YT.Player('preview-player', {
                height: '100%',
                width: '100%',
                videoId: videoId,
                playerVars: {
                    'start': startTime,
                    'playsinline': 1,
                    'rel': 0,
                    'modestbranding': 1
                },
                events: {
                    'onReady': function(event) {
                        event.target.seekTo(startTime);
                        event.target.playVideo();
                    },
                    'onStateChange': function(event) {
                        if (event.data === YT.PlayerState.PLAYING) {
                            const checkInterval = setInterval(() => {
                                if (previewPlayer.getCurrentTime() >= endTime) {
                                    previewPlayer.pauseVideo();
                                    clearInterval(checkInterval);
                                }
                            }, 100);
                        }
                    }
                }
            });
        }

        function createClip() {
            const startTime = getTimeInSeconds('start');
            const endTime = getTimeInSeconds('end');

            if (endTime <= startTime) {
                showError('End time must be greater than start time.');
                return;
            }

            if (endTime - startTime > 600) {
                showError('Clip duration cannot exceed 10 minutes.');
                return;
            }

            hideError();

            // Create a download link using a clip service or generate embed
            const clipUrl = `https://www.youtube.com/embed/${videoId}?start=${startTime}&end=${endTime}`;
            
            document.getElementById('download-section').classList.remove('hidden');
            document.getElementById('download-link').href = clipUrl;
            document.getElementById('download-link').target = '_blank';
        }

        function resetForm() {
            document.getElementById('youtube-url').value = '';
            document.getElementById('video-container').classList.add('hidden');
            document.getElementById('preview-container').classList.add('hidden');
            document.getElementById('download-section').classList.add('hidden');
            document.getElementById('clip-duration').textContent = '0s';
            
            setTimeFromSeconds('start', 0);
            setTimeFromSeconds('end', 0);

            if (player) {
                player.destroy();
                player = null;
            }
            if (previewPlayer) {
                previewPlayer.destroy();
                previewPlayer = null;
            }
        }

        function showError(message) {
            const errorElement = document.getElementById('error-message');
            errorElement.textContent = message;
            errorElement.classList.remove('hidden');
        }

        function hideError() {
            document.getElementById('error-message').classList.add('hidden');
        }
    </script>
    <script src="https://www.youtube.com/iframe_api"></script>
</body>
</html>
