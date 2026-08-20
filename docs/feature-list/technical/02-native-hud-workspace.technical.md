# 02. Native HUD Workspace (Technical)

## 2.1 Native Frontend Client
- `[🤖 AI Enhancement (Cycle 2, Task 2.1.01)]`
  - HTML Shell: `src/client/index.html` (76 LOC).
  - Styles: `src/client/css/theme.css` (49 LOC), `src/client/css/layout.css` (140 LOC), `src/client/css/components.css` (174 LOC).
  - Client Modules: `src/client/js/app.js` (133 LOC), `src/client/js/canvas.js` (98 LOC), `src/client/js/keyframes.js` (52 LOC), `src/client/js/annotations.js` (56 LOC).
  - All files strictly adhere to <= 256 LOC limit.

## 2.2 Backend Submodule Detachment
- `[🤖 AI Enhancement (Cycle 2, Task 2.2.01)]`
  - Service Update: `src/plugins/hud-static.ts` sets default `rootPath` to `src/client`.
  - App Bootstrap: `src/index.ts` loads from `src/client`.
  - Tests: `tests/hud-static.spec.ts` verifies delivery from `src/client`.

## 2.3 Verification & Screenshots
- `[🤖 AI Enhancement (Cycle 2, Task 2.3.01)]`
  - Test Suite: `tests/test_and_capture.py` (2-pass runner).
  - Pass 1: Headless unit test suite (`npx vitest run`, 3 passed).
  - Pass 2: E2E capture (`screenshots/cycle-2/2.1.01-native-hud-client/`).
