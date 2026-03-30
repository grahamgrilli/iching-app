# I Ching — The Book of Changes

A static web app for interpreting I Ching hexagram readings. Record your three-coin tosses and receive interpretations from the Wilhelm/Baynes translation, plus short **Plain read** notes for each hexagram.

## Features

- **Manual coin input** — Toggle 3 coins per line to match your physical roll (Heads=3, Tails=2)
- **Brushstroke hexagram** — Lines rendered in a Hokusai-inspired ink style
- **Interpretations** — Judgement, Image, expandable line-by-line Wilhelm / Baynes text, and a plain-language gloss under **Plain read** (`src/data/soberJudgementNotes.json`)
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

Matches Morning-Charge-Up: **main** branch. (Morning-Charge-Up uses root; this app builds to **docs/**.)

1. Run `npm run deploy` to build into `docs/`
2. Commit and push: `git add docs && git commit -m "Deploy" && git push`
3. In repo **Settings → Pages**: Branch **main**, Folder **/docs**
4. Site: **https://grahamgrilli.github.io/iching-app/**

## Data

- **Wilhelm/Baynes** — Based on the [iching-wilhelm-dataset](https://github.com/adamblvck/iching-wilhelm-dataset) (MIT).
- **Plain read** — App-authored glosses in `src/data/soberJudgementNotes.json`; edit freely for tone and clarity.
