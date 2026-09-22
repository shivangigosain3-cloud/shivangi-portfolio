# Shivangi Gosain — Portfolio

Plain HTML/CSS/JS, no build step. Free to host on Vercel.

## Files
```
index.html      site content
style.css       styling
script.js       tab switching
assets/         resume.pdf, CAD screenshots, SVG diagrams
```

## Before you deploy
- Skim the Boeing and GE Vernova callout boxes and the CAD images — double check with a Boeing/GE contact
  that these are okay to post publicly before this goes live anywhere.
- Fill in the "placeholder description" notes under Fluid Mechanics, Thermodynamics, and System Dynamics
  in the Education tab with your real course content.

## Adding your 2 Advanced CAD videos
1. Create a folder `assets/videos/` inside `portfolio/` and put your two video files in it
   (`.mp4` is the safest web format — if yours are `.mov`, convert with e.g. `ffmpeg -i in.mov out.mp4`,
   or most phone/editing apps can export mp4 directly).
2. Open `index.html`, find the **Advanced CAD** card, and look for the commented-out block that starts with
   `<!-- To add your 2 videos... -->`.
3. Delete the `<!--` and `-->` around it, and duplicate the whole `<div class="video-wrap">...</div>` block
   once per video. Update each one's `src="assets/videos/your-file.mp4"` and the caption text.
4. Keep each video under ~50–75MB so the page still loads reasonably fast — compress with HandBrake or
   ffmpeg if they're larger (`ffmpeg -i in.mp4 -vcodec libx264 -crf 28 out.mp4`).

## Push to GitHub
```bash
cd portfolio
git init
git add .
git commit -m "Initial portfolio"
gh repo create shivangi-portfolio --public --source=. --push
# (or create the repo on github.com and follow its "push an existing repo" instructions)
```

## Deploy on Vercel (free)
1. Go to vercel.com → **Add New… → Project**.
2. Import the GitHub repo you just created.
3. Framework preset: choose **Other** (it's static HTML — no build command, no output directory needed).
4. Click **Deploy**. You'll get a `your-project.vercel.app` URL in under a minute.
5. Any time you push to `main`, Vercel redeploys automatically.

Optional: add a custom domain later from the Vercel project's **Settings → Domains** tab.
