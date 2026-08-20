# Sub-Plan 2.1.01 — Native HUD Frontend Client

## Objective
Build a lightweight, clean, and modern HUD frontend directly under `src/client/` using semantic HTML, dark glassmorphic CSS, and modular ES modules (each <= 256 LOC).

## Scope & Components
1. `src/client/index.html`: Semantic layout for Top Header, Canvas Viewport, Left Drawer, Right Sidesheet, and Floating Dock.
2. `src/client/css/`: `theme.css` (variables/glassmorphism), `layout.css` (grid/flex layout), `components.css` (cards, buttons, tags).
3. `src/client/js/`:
   - `app.js`: State store, shortcut listeners (`Z` for zen mode, `1-4` for tools).
   - `canvas.js`: HTML5 Canvas rendering background frame and interactive polygon/box overlays.
   - `keyframes.js`: Keyframe thumbnail strip with active selection and thumbnail generation.
   - `annotations.js`: Detected objects list, confidence tags, visibility toggles, and label manager.
4. `src/client/assets/`: Embedded/sample keyframe dataset.

## Verification
- Clean rendering in modern browsers without CDN or build dependencies.
- Every file <= 256 LOC.
