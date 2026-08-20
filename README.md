# Cordis HUD App

Minimalist workspace integrating the **Cordis** IoC microkernel platform with the **HUD Design** interface as a pluggable static frontend.

## Quick Start
```bash
npm install
npm start
```
*Opens HUD interface at `http://localhost:3000` (or configured `PORT`).*

## Project Structure
- `cordis/` — Cordis IoC microkernel submodule (read-only).
- `hud-design/` — HUD frontend static UI submodule (read-only).
- `src/` — Root Cordis platform entrypoint and plugins.
- `plans/` — Lifecycle enhancement plans and backlog.
- `docs/` — Feature lists and technical documentation.
- `AGENTS.md` — Agent guidelines and development workflows.
