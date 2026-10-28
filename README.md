# Ganesh Ram P S – Portfolio

Files: `index.html`, `style.css`, `script.js` (no build step, no frameworks).

## Run locally
Double-click `index.html`, or run `python3 -m http.server 8000` in this folder and open http://localhost:8000.

## Edit content
All text lives in `index.html` (sections are commented). Colours are CSS variables at the top of `style.css`.

## Add a profile photo
1. Put your photo at `images/profile.jpg` (square, ~600x600).
2. In `index.html` replace the `<div class="photo-placeholder">…</div>` with:
   `<img src="images/profile.jpg" alt="Ganesh Ram P S" width="340" height="340">`

## Project links
Project cards currently link to your GitHub profile. Replace each href with the exact repo URL.

## Deploy free
**GitHub Pages:** create a repo, upload the files, Settings → Pages → Deploy from branch `main` / root.
**Netlify:** go to app.netlify.com/drop and drag the folder in.

## Make the contact form really send email
Create a free Formspree/EmailJS form and replace the `mailto` block in `script.js` with a `fetch()` call.
