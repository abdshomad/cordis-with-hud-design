# Next Enhancements — Cycle 1: Minimalist Cordis HUD Skeleton App

> Parent contract: `plans/README.md` | Guidelines: `AGENTS.md`

## Overview
Bootstrap the most minimalistic skeleton application hosting the Cordis IoC microkernel platform and delivering the HUD Design interface as a pluggable static service with a single-command launcher, zero submodule modifications, and clean lifecycle logging.

---

## 1. Feature: Core Platform & Orchestration

### 1.1 Sub-feature: Root Runtime & Foundation
- [ ] **1.1.01** [⚙ automation / 🔌 plugin-service] Set up root Node.js/TypeScript configuration, dependencies (`cordis`), single launch script, and test runner without modifying submodules.
  - Sub-plan: `plans/plan-1.1.01-root-foundation.md`

### 1.2 Sub-feature: HUD Static Delivery Plugin
- [ ] **1.2.01** [🔌 plugin-service / ⚡ performance] Implement a Cordis plugin service that serves the static HUD design UI (`hud-design/`) over HTTP cleanly from the root workspace.
  - Sub-plan: `plans/plan-1.2.01-hud-static-plugin.md`

### 1.3 Sub-feature: Core Lifecycle & Status Heartbeat
- [ ] **1.3.01** [🔌 plugin-service / ⚙ automation] Implement the main Cordis app entrypoint that registers the HUD plugin, handles lifecycle start/stop signals, and outputs readable readiness status to the console.
  - Sub-plan: `plans/plan-1.3.01-cordis-lifecycle-bootstrap.md`
