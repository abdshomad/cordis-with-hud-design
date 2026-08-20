# Cordis HUD App — Agent Guidelines

> Read-first (e/n/r/m): `plans/README.md` -> `docs/feature-list/README.md` + matching `NN-*.md`. Skills: `.agents/skills/cordis/SKILL.md`, `.agents/skills/hud-design/SKILL.md`.

## §0 — North Star
- **Cordis IoC Microkernel:** Modular services/plugins via DI (`inject`), reactive lifecycles (`ctx.effect`), type-safe events (`emit`, `parallel`, `bail`).
- **HUD Delivery:** Frictionless static HUD serving, single-command startup, clear lifecycle logging.

## Non-negotiables (Every Trigger)
- **Submodules Read-Only:** Never edit/create files in `cordis/` or `hud-design/`. Root only.
- **User Directions:** Never revert `[👤 User Direction]` items (badge-grep `docs/feature-list/`).
- **No Churn:** No duplicate/synonym tasks or redundant styler passes. Real data only; DRY & reuse.
- **Env & Ops:** Node.js/TS (`npm`, `tsx`, `node`). For Python, always use `uv` (`uv venv`, `init`, `add`, `sync`, `run`; never raw pip/python). Targeted tests only (`npx vitest run <file>`).
- **Simplicity & Git:** Cut UI bloat (§8). Never git commit unless explicitly asked; when asked, commit only once until asked again. Never push.

## §1 — Trigger "e" (Enhance / Plan)
- Read: `plans/cycle_state.json` -> `plans/next-enhancements.md` -> `docs/feature-list/`.
- Increment `cycle_state.json` (+1). Plan 1–5 high-impact, non-duplicate tasks (tags: 🖌 UI-simplification / ⚙ automation / ⚡ performance / 🔌 plugin-service).
- Unique ID `<feature>.<subfeature>.<seq>` (scan `plans/`, `max+1`). One sub-plan `plans/plan-<X.Y.Z>-<slug>.md` per task.
- Plan commit format: one-line header with cycle & tasks (`plan(cycle-<N>): <summary> (<start> - <end>)`), followed by itemized bullet changes.

## §2 — Trigger "n" (Next / Execute)
- Resolve open findings in `plans/reviews/`. Execute `[TODO]` task(s) sequentially adhering to submodule boundaries.
- Mark `[DONE]`, dual-write (§4), pass targeted tests (§7).
- Output: completed task(s) + exact run commands/paths.

## §3 — Trigger "r" (Review)
- Audit: real code, Cordis lifecycle wired, tested, dual-documented, LOC limits, submodules untouched, anti-duplication pass.
- Write next `plans/reviews/review-N.md` (findings H/M/L + verdict + required actions).
- Auto-run Trigger "m" after review.

## §4 — Trigger "m" (Move / Archive)
- Dual-write each `[DONE]` task: functional line in `docs/feature-list/NN-*.md` + technical entry in `docs/feature-list/technical/NN-*.technical.md` (badged `[🤖 AI Enhancement (Cycle <N>, Task <X.Y.Z>)]`).
- Remove completed tasks from `next-enhancements.md`. Archive sub-plans to `plans/archive/cycle-<N>/`.
- Auto-run Trigger "e" if cycle complete.

## §5 — Code & Limits
- New/refactored files <= 256 LOC (frontend static bundles <= 700 LOC; test files exempt).

## §6 — Ad-hoc Requests
- Implement requested feature; dual-write under matching docs badged `[👤 User Direction]`.

## §7 — Testing
- Run targeted tests per module (e.g. `npx vitest run <file>`). Zero failures required.
- **2-Pass Testing & Screenshots:** Test twice with flag (Pass 1: no screenshots; Pass 2: only after Pass 1 is OK, capture numbered screenshots starting from main window into `screenshots/cycle-{c}/{taskid}-{slug}/<num>-<step>.png`).

## §8 — UI Simplicity
- Clean, minimal, dense presentation. Cut unnecessary modals/sidebars/config layers. Automation-first.
