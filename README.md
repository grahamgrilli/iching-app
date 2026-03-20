# I Ching — The Book of Changes

A static web app for interpreting I Ching hexagram readings. Record your three-coin tosses and receive interpretations from the Wilhelm/Baynes translation.

## Features

- **Manual coin input** — Toggle 3 coins per line to match your physical roll (Heads=3, Tails=2)
- **Brushstroke hexagram** — Lines rendered in a Hokusai-inspired ink style
- **Interpretations** — Judgement, Image, and expandable line-by-line texts
- **Changing lines** — Strong yin (6) and strong yang (9) show line-specific guidance and a resulting hexagram

## Local Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deploy to GitHub Pages

1. Create a repository named `iching-app` (or your choice) on GitHub
2. Update `vite.config.ts` — set `base` to `'/${your-repo-name}/'`
3. Update `package.json` — set `homepage` to `https://YOUR_USERNAME.github.io/${your-repo-name}/`
4. Install gh-pages and deploy:

```bash
npm install --save-dev gh-pages
npm run deploy
```

5. In your repo Settings → Pages, set source to the `gh-pages` branch

## Data

Hexagram interpretations are based on the Wilhelm/Baynes I Ching translation. Structure inspired by the [iching-wilhelm-dataset](https://github.com/adamblvck/iching-wilhelm-dataset) (MIT).
