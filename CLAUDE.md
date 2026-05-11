# CLAUDE.md — estudio/

## Role

Git repository and master template for all kosmos video projects. Scene templates and the render script live here. Individual videos are produced in git worktrees under `proyectos/`, not here.

## Key Files

| File | Purpose |
|---|---|
| `config.json` | Declares personas, music, palette, scene order, export settings |
| `render.js` | Calls hyperframes per scene, injects persona data, produces output |
| `escenas/*.html` | Reusable scene templates driven by `window.KOSMOS` data |
| `output/` | Temporary render artifacts — gitignored, never commit |

## When to Edit Here

Only to improve the template itself:
- Add a new reusable scene type to `escenas/`
- Fix or extend `render.js`
- Update the `config.json` schema defaults

For a specific video, always work in the worktree: `proyectos/<slug>/`.

## Scene Data Contract

`render.js` injects a `window.KOSMOS` object into each scene before rendering:

```js
window.KOSMOS = {
  personas: [{ nombre, apodo, colores, stats, fotos, assets }],
  paleta: { fondo, primario, secundario, texto, acento },
  titulo: "...",
  duracion: 4
}
```

Scenes must not hard-code names or colors — always read from `window.KOSMOS`.

## Git Rules

- `output/` is in `.gitignore`
- No AI co-author in commits
- Commit message format: `type: short description` (Conventional Commits)

## Worktree Commands

```bash
# Create project
git worktree add D:\kosmos\proyectos\<slug>

# List all active projects
git worktree list

# Remove after export
git worktree remove D:\kosmos\proyectos\<slug>
```
