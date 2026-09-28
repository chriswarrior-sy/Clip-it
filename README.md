# Clip-it

A lightweight web app for selecting a start and end time from a YouTube video and opening a clip preview link.

## Features

- Paste a YouTube video URL
- Load the video directly in the browser
- Set a clip start time and end time
- Preview the selected segment
- Generate an embeddable clip link for sharing or review

## Run locally

Because this is a static front-end app, you can run it with any simple web server.

```bash
cd Clip-it
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Project structure

- `index.html` — the full application UI and logic

## Notes

- This app uses the YouTube IFrame API.
- It is a front-end-only project and does not render or export a real video file server-side.
- It is intended for personal use and should be used in line with YouTube's terms and copyright policies.
