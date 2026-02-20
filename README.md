# Portfolio site

Live URL: https://dheepakkaran.github.io/me/

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
