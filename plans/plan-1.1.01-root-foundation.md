# Sub-Plan 1.1.01 — Root Runtime & Foundation

## Objective
Set up the root project structure for the Node.js/TypeScript Cordis environment, providing package configuration, dev/start scripts, and targeted test tooling while keeping all submodule directories strictly read-only.

## Scope & Changes
1. Create root `package.json` with scripts (`start`, `dev`, `test`) and dependencies (`cordis`, `tsx`, `vitest`).
2. Create root `tsconfig.json` configured for ES modules and modern TypeScript.
3. Ensure single-command execution (`npm start` or `./run.sh`).

## Verification
- `npm run test` or targeted vitest check passes.
- Submodules `cordis/` and `hud-design/` have zero modifications.
