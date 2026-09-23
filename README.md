# Shivangi Gosain — Portfolio

Plain HTML/CSS/JS, no build step. Free to host on Vercel.

## Files
```
index.html      site content
style.css       styling
script.js       tab switching
assets/         CAD.pdf, resume.pdf, SVG diagrams
```

## Advanced CAD PDF
Keep `assets/CAD.pdf` in the `assets/` folder alongside the other site assets when uploading or deploying the site. The Advanced CAD card links directly to this file.

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
