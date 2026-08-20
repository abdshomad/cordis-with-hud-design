# Sub-Plan 2.2.01 — Backend Submodule Detachment

## Objective
Update Cordis static server plugin (`src/plugins/hud-static.ts`) and root bootstrap (`src/index.ts`) to serve directly from `src/client/` by default.

## Scope & Changes
1. Change `rootPath` default from `hud-design` to `src/client`.
2. Update tests to verify `src/client/` is served properly.
3. Completely isolate runtime execution from the `hud-design` submodule.

## Verification
- Targeted Vitest tests pass with 0 failures.
- Server boots and delivers `src/client/index.html`.
