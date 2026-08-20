# 01. Core Platform & Orchestration (Technical)

## 1.1 Root Runtime & Foundation
- `[🤖 AI Enhancement (Cycle 1, Task 1.1.01)]`
  - Manifest & Config: `package.json`, `tsconfig.json`, `vitest.config.ts`.
  - Launcher: `run.sh` (POSIX bash script auto-checking dependencies and launching `tsx src/index.ts`).
  - Dependencies: `cordis` (4.0.0-rc.8), `tsx`, `vitest`.
- `[👤 User Direction]`
  - Environment Loading: `process.loadEnvFile?.('.env')` in `src/index.ts`.
  - Configuration File: `.env` (`PORT=4004`, `HOST=0.0.0.0`).

## 1.2 HUD Static Delivery Plugin
- `[🤖 AI Enhancement (Cycle 1, Task 1.2.01)]`
  - Implementation: `src/plugins/hud-static.ts` (`HudStaticService` subclassing Cordis `Service<HudStaticConfig>`).
  - Lifecycle: Implements `Service.init` creating Node `http.Server`, emitting `hud/ready` event on context.
  - Safe Serving: Path traversal sanitization via `path.normalize`, MIME-type map, and stream piping from `hud-design/` (read-only submodule).
  - Tests: `tests/hud-static.spec.ts`.

## 1.3 Core Lifecycle & Status Heartbeat
- `[🤖 AI Enhancement (Cycle 1, Task 1.3.01)]`
  - Bootstrap Entry: `src/index.ts` (`bootstrap()` returning `{ root, fiber, shutdown }`).
  - Event Listeners: Subscribes to `hud/ready` to print URL and readiness to console.
  - Signal Traps: Captures `SIGINT` / `SIGTERM` for clean `fiber.dispose()`.
  - Tests: `tests/bootstrap.spec.ts`.
