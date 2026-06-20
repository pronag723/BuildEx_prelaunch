# BuildEx — Launch Countdown Landing Page

A standalone "coming soon" promo page for [BuildEx](https://pronag723.github.io/BuildEx/),
with a launch countdown, animated green gradient (matching the main site), feature cards,
and Discord/social CTAs. **Zero build step** — plain HTML + CSS + vanilla JS.

This is a separate project from the main BuildEx app.

## Edit before going live

Everything you need to change lives in [`config.js`](./config.js):

| Constant | What it does |
| --- | --- |
| `LAUNCH_DATE` | Countdown target (ISO 8601, e.g. `"2026-07-05T17:00:00Z"`). When it passes, the timer flips to an **"Enter BuildEx"** button. |
| `DISCORD_URL` | Your Discord invite (primary CTA). |
| `SITE_URL` | Where **"Enter BuildEx"** points after launch. |
| `SOCIALS` | Extra social buttons — `{ label, url, icon }`. `icon` is any [lucide](https://lucide.dev/icons) name. Note: lucide no longer ships brand logos (YouTube/X/etc.), so the defaults use generic icons (`play`, `at-sign`, `music`). |

## Run locally

Open `index.html` directly in a browser, or serve the folder:

```bash
npx serve .
# or
python -m http.server 8000
```

To test the "live" state, set `LAUNCH_DATE` to a few seconds in the future, reload,
and watch it flip to the **Enter BuildEx** button — then restore the real date.

## Deploy to GitHub Pages

1. Create a new GitHub repo (e.g. `buildex-launch`) and push this folder.
2. Repo **Settings → Pages → Build and deployment → Deploy from a branch**, select
   `main` / `/ (root)`.
3. The site goes live at `https://<user>.github.io/buildex-launch/`.

`.nojekyll` is included so GitHub Pages serves the files as-is. All asset paths are
relative, so it works under any subpath without extra config. For a custom domain,
add a `CNAME` file and configure it under Pages settings.
