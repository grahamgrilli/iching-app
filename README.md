# I Ching — The Book of Changes

A static web app for interpreting I Ching hexagram readings. Record your three-coin tosses and receive interpretations from the Wilhelm/Baynes translation, plus short **Plain read** notes for each hexagram.

## Features

<<<<<<< HEAD
- **Manual coin input** — Toggle 3 coins per line (heads = solid disk, tails = open ring; 3 vs 2 points)
- **Brushstroke hexagram** — Lines rendered in a Hokusai-inspired ink style
- **Interpretations** — Judgement, Image, expandable line-by-line Wilhelm / Baynes text, and a plain-language gloss under **Plain read** (`src/data/soberJudgementNotes.json`)
=======
- **Manual coin input** — Toggle 3 coins per line to match your physical roll (**Heads● = 3, Tails○ = 2**, Wilhelm-style: three tails → 6 / broken, three heads → 9 / solid)
- **Brushstroke hexagram** — Lines rendered in a Hokusai-inspired ink style
- **Interpretations** — Judgement, Image, expandable line texts, plus a **Plain read** (even-handed friction/limits gloss—not part of Wilhelm)
- **Taoist I Ching tab** — Taoist-oriented Judgement, Image, and line notes keyed to each hexagram (spirit of Liu Yiming / Thomas Cleary’s *The Taoist I Ching*, **without** reproducing Cleary’s copyrighted text). Replace or extend via `src/data/clearyInterpretations.json` if you have suitable rights or your own notes.
>>>>>>> 61fef51 (Update README.)
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
