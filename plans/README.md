# Plans & Cycle Management Contract

This directory manages the iterative lifecycle enhancements for the Cordis HUD application following `AGENTS.md`.

## Structure
- `cycle_state.json` — Tracks the current cycle number.
- `next-enhancements.md` — Active backlog of planned tasks for the current cycle.
- `plan-<X.Y.Z>-<slug>.md` — Detailed sub-plan per planned task.
- `reviews/` — Review reports for each completed cycle.
- `archive/` — Completed sub-plans organized by cycle (`archive/cycle-<N>/`).

## Task ID Convention
Unique format `<feature>.<subfeature>.<seq>` (e.g. `1.1.01`). IDs are immutable and strictly monotonically increasing across all cycles.
