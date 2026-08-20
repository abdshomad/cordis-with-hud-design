# Next Enhancements — Cycle 2: Native Detached HUD Workspace

> Parent contract: `plans/README.md` | Guidelines: `AGENTS.md`

## Overview
Implement our own first-class, lightweight, and modular HUD frontend inside `src/client/` using modern vanilla ES modules and clean glassmorphic CSS, detaching the Cordis platform completely from the `hud-design` submodule.

---

## 2. Feature: Native HUD Workspace (Detached)

### 2.1 Sub-feature: Native Frontend Client
- [x] **2.1.01** [🖌 UI-simplification / ⚡ performance] Implement native HUD frontend assets in `src/client/` (Header, Canvas Viewport, Keyframe Strip, Object Annotations Panel, Floating Dock) adhering to <= 256 LOC per file. [DONE]
  - Sub-plan: `plans/plan-2.1.01-native-hud-client.md`

### 2.2 Sub-feature: Backend Submodule Detachment
- [x] **2.2.01** [🔌 plugin-service / ⚙ automation] Update `HudStaticService` and `bootstrap` to point to `src/client/` by default, fully detaching runtime execution from the `hud-design` submodule. [DONE]
  - Sub-plan: `plans/plan-2.2.01-backend-detachment.md`

### 2.3 Sub-feature: Verification & 2-Pass Screenshots
- [x] **2.3.01** [⚙ automation] Run targeted tests and capture Cycle 2 E2E feature screenshots into `screenshots/cycle-2/2.1.01-native-hud-client/`. [DONE]
  - Sub-plan: `plans/plan-2.3.01-verification-screenshots.md`
