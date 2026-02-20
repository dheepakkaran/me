# Portfolio site

Live URL: https://dheepakkaran.github.io/me/

## White screen - root cause and fix

If GitHub Pages is configured to serve the repository root (`main` / root), it serves source files (`src/main.tsx`) directly.
Browsers cannot execute TSX source directly, so the page can appear blank/white.

This repo now includes a GitHub Actions workflow that builds Vite output (`dist/`) and deploys it to GitHub Pages.

## One-time setup in GitHub

1. Open **Repo → Settings → Pages**.
2. In **Build and deployment**, set **Source = GitHub Actions**.
3. Push/merge your latest code into `main`.
4. Wait for workflow **Deploy to GitHub Pages** to finish.
5. Open: https://dheepakkaran.github.io/me/ and hard refresh.

## Local verify commands

- `npm run build`
- `npm run preview -- --host 0.0.0.0 --port 4173`
- Visit `http://localhost:4173/me/`
## Why GitHub Pages sometimes shows old text

If you changed text in source (for example `four determined attempts` -> `two determined attempts`) but live site still shows old content, usually one of these is the reason:

1. Change is committed only in a feature branch (like `work`) and not merged to `main`.
2. New build was not deployed to Pages.
3. Browser/CDN cache is still showing previous assets.

## Step-by-step fix

1. Confirm source has the latest text:
   - `src/components/About/index.tsx`
2. Run local build:
   - `npm run build`
3. Deploy updated build to `gh-pages` branch:
   - `npm run deploy`
4. In GitHub repository:
   - **Settings → Pages → Source** should point to `gh-pages` branch (root).
5. Hard refresh your browser (or open in Incognito).

## Helpful scripts

- `npm run build` - creates production build in `dist/`
- `npm run deploy` - builds and publishes to `gh-pages` branch
