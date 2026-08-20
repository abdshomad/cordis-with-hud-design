# Sub-Plan 1.3.01 — Cordis Lifecycle Bootstrap

## Objective
Implement the main root application bootstrap (`src/index.ts`) that initializes the Cordis `Context`, registers the HUD Static Plugin, and outputs clear lifecycle readiness status to the console.

## Scope & Changes
1. Create `src/index.ts` initializing Cordis `Context`.
2. Load the HUD Static Plugin and any core logging services.
3. Emit and log lifecycle events: platform starting, plugin active, server URL, and graceful shutdown handling on `SIGINT`/`SIGTERM`.
4. Add single-command startup script `./run.sh` at root.

## Verification
- Running `npm start` or `./run.sh` logs the Cordis readiness and server URL.
- File size ≤ 256 LOC.
