# Sub-Plan 1.2.01 — HUD Static Delivery Plugin

## Objective
Implement a reusable Cordis plugin/service under `src/plugins/hud-static.ts` that serves the static visual workspace from `hud-design/` via HTTP without altering any files inside `hud-design/`.

## Scope & Changes
1. Create `src/plugins/hud-static.ts` implementing a Cordis service/plugin.
2. Serve static files (`index.html`, `static/css`, `static/js`, `static/data`, `static/img`) on a configurable port (default `3087` or `3000`).
3. Handle graceful shutdown using Cordis lifecycle hooks (`ctx.effect` / `[Service.init]`).
4. Add unit/integration test in `tests/hud-static.spec.ts`.

## Verification
- Targeted test `npx vitest run tests/hud-static.spec.ts` passes.
- File size ≤ 256 LOC.
