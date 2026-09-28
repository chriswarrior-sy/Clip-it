# Clip-it

A lightweight YouTube clipper for generating and sharing 1-minute clip links from a video URL.

## What it does

- Paste a YouTube video URL
- Load the video in the browser
- Set a start and end time
- Preview a custom clip
- Automatically generate 1-minute video segments for the loaded video
- Open, copy, or share each generated clip link

## Features

- Simple static front-end app
- No build step required
- Works directly from the browser
- Generates shareable YouTube clip links based on timestamps
- Lets you quickly copy or share each 1-minute segment

## Run locally

Because this is a frontend-only app, you can run it with any simple web server.

```bash
cd Clip-it
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Project structure

- `index.html` — the whole app UI and logic

## Notes

- This app uses the YouTube IFrame API to preview and load videos.
- It generates timestamp-based YouTube clip links rather than downloadable MP4 files.
- The app is intended for personal use and should be used in line with YouTube's terms and copyright policies.
