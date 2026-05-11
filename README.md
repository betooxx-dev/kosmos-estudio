# kosmos-estudio

Video production template powered by [HyperFrames](https://github.com/heygen-com/hyperframes). Build cinematic sports videos from HTML scenes — no video editing software required.

## What it does

Each video is a set of HTML/CSS/JS scenes animated with GSAP and rendered to `.mp4` by HyperFrames. Fighter data lives in a shared resource library and gets injected at render time via variables, so the same templates work for any fighter.

## Structure

```
estudio/
├── composition.html   # Master composition — declares scenes and timing
├── config.json        # Per-project config: fighter, music, palette, export settings
├── render.js          # Builds and runs the hyperframes render command from config.json
└── escenas/
    ├── 01-intro.html  # Fighter photo + name + nickname entrance
    ├── 02-stats.html  # Record and stats grid
    └── 03-cierre.html # Closing card with oversized nickname
```

Fighter assets (photos, metadata) live outside this repo in `kosmos/recursos/personas/<slug>/`.

## Workflow

```bash
# 1. Preview scenes live
npx hyperframes preview

# 2. Render a video (reads config.json + fighter metadata)
node render.js

# 3. Dry-run to inspect variables without rendering
node render.js --dry-run
```

## Working on a specific video

Each video gets its own isolated git worktree — never edit scenes directly here:

```bash
# Create a new project
git worktree add ../proyectos/<slug>

# List active projects
git worktree list

# Clean up after export
git worktree remove ../proyectos/<slug>
```

## Skills

Installed via `npx skills add heygen-com/hyperframes`. Includes HyperFrames core, GSAP, anime.js, Lottie, Tailwind, Three.js, TTS, background removal, and more.

## Commit conventions

`type: slug` — e.g. `feat: add highlights scene`, `fix: gsap timeline in 01-intro`

No AI co-author lines.
