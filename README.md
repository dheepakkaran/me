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
