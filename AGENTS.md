# AGENTS.md — estudio/

## Purpose

The master editing template and git repository for all video production in kosmos. This is the **source of truth** for scene structure, render logic, and workflow improvements. Individual videos are never edited here — they live in worktrees under `proyectos/`.

## Structure

```
estudio/
├── .git/              # Git repository root
├── escenas/           # Base HTML scene templates
│   ├── 01-intro.html
│   ├── 02-stats.html
│   └── 03-cierre.html
├── config.json        # Project configuration (overridden per worktree)
├── render.js          # Render orchestrator — calls hyperframes per scene
└── output/            # Temporary render output (gitignored)
```

## How to Work Here

**Never edit scenes for a specific video in this folder.** Instead:

```bash
# Create a new project worktree
git -C D:\kosmos\estudio worktree add D:\kosmos\proyectos\<slug>

# Work in the worktree
# When done, remove it
git -C D:\kosmos\estudio worktree remove D:\kosmos\proyectos\<slug>
```

The only time you commit directly to estudio/ is when **improving the template itself** — adding a new reusable scene type, fixing the render script, updating defaults.

## config.json Schema

```json
{
  "titulo": "Video title",
  "personas": ["slug-persona-1", "slug-persona-2"],
  "musica": "../../recursos/musica/track.mp3",
  "paleta": "../../recursos/paletas/combate-nocturno.json",
  "escenas": [
    { "archivo": "escenas/01-intro.html", "duracion": 4 },
    { "archivo": "escenas/02-stats.html", "duracion": 6 },
    { "archivo": "escenas/03-cierre.html", "duracion": 3 }
  ],
  "exportar": {
    "fps": 30,
    "resolucion": "1920x1080",
    "formato": "mp4"
  }
}
```

## render.js Responsibilities

1. Load `config.json`
2. For each persona slug, load `recursos/personas/<slug>/metadata.json`
3. For each scene in order, call hyperframes with the HTML file and injected data
4. Concatenate rendered clips into a single output file in `output/`

## Scene Template Conventions

- Files prefixed with order number: `01-intro.html`, `02-stats.html`
- Scenes receive person data via a `window.KOSMOS` global injected by render.js
- Use CSS variables for colors so the palette can be swapped without editing HTML:
  ```css
  :root {
    --color-primario: var(--kosmos-primario, #ffffff);
  }
  ```

## Git Conventions

- Commit only template improvements (new scenes, render.js fixes, config schema changes)
- `output/` is gitignored
- Commit messages follow Conventional Commits: `feat:`, `fix:`, `chore:`
- No AI co-author lines

## Build & Test Commands

```bash
# Render current config (from inside estudio/ or a worktree)
node render.js

# List active worktrees
git worktree list
```
