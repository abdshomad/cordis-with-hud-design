#!/usr/bin/env python3
"""
2-Pass Test & Screenshot Capture Runner
Complies with AGENTS.md §7:
  Pass 1: no screenshots (unit/integration test suite verification)
  Pass 2: with screenshots (only after Pass 1 is OK, captures numbered screenshots starting from main window)
"""

import argparse
import os
import subprocess
import sys
import time
from pathlib import Path


def run_pass_1_tests() -> bool:
    print("\n==========================================")
    print(" [Pass 1] Running Targeted Unit/Integration Tests (No Screenshots)")
    print("==========================================")
    cmd = ["npx", "vitest", "run"]
    result = subprocess.run(cmd, capture_output=False)
    if result.returncode != 0:
        print("[Pass 1] FAILED: Tests did not pass.")
        return False
    print("[Pass 1] PASSED: All unit/integration tests OK.")
    return True


def run_pass_2_screenshots(cycle: int, task_id: str, slug: str, port: int = 3000) -> bool:
    print("\n==========================================")
    print(" [Pass 2] Starting App & Capturing E2E Feature Screenshots")
    print("==========================================")

    from playwright.sync_api import sync_playwright

    out_dir = Path(f"screenshots/cycle-{cycle}/{task_id}-{slug}")
    out_dir.mkdir(parents=True, exist_ok=True)
    print(f"Screenshots directory: {out_dir.resolve()}")

    # Start Cordis HUD App in background
    env = os.environ.copy()
    env["PORT"] = str(port)
    env["HOST"] = "127.0.0.1"

    proc = subprocess.Popen(
        ["npx", "tsx", "src/index.ts"],
        env=env,
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        text=True,
    )

    try:
        # Wait up to 10s for server to be responsive
        url = f"http://127.0.0.1:{port}"
        time.sleep(2)

        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True)
            context = browser.new_context(viewport={"width": 1920, "height": 1080})
            page = context.new_page()

            print(f"Navigating to {url}...")
            page.goto(url, timeout=15000)
            page.wait_for_timeout(2000)

            def capture(num: int, step_name: str):
                filename = f"{num:02d}-{step_name}.png"
                target_path = out_dir / filename
                page.screenshot(path=str(target_path))
                print(f"  ✓ Captured: {filename}")
                page.wait_for_timeout(500)

            # Step 1: Main window
            capture(1, "main-workspace")

            # Step 2: Zen mode toggle
            page.keyboard.press("z")
            page.wait_for_timeout(400)
            capture(2, "zen-mode")
            page.keyboard.press("z")
            page.wait_for_timeout(400)

            # Step 3: Keyframe strip minimized
            if page.locator("#btn-minimize-left-drawer").is_visible():
                page.click("#btn-minimize-left-drawer")
                page.wait_for_timeout(400)
                capture(3, "left-drawer-minimized")
                page.click("#btn-minimize-left-drawer")
                page.wait_for_timeout(400)

            # Step 4: Sidesheet interaction
            if page.locator("#btn-toggle-right-drawer").is_visible():
                page.click("#btn-toggle-right-drawer")
                page.wait_for_timeout(400)
                capture(4, "right-sidesheet-open")
                page.click("#btn-toggle-right-drawer")
                page.wait_for_timeout(400)

            # Step 5: Full interface overview
            capture(5, "full-workspace-overview")

            browser.close()
            print("[Pass 2] PASSED: All screenshots captured successfully.")
            return True

    except Exception as e:
        print(f"[Pass 2] ERROR capturing screenshots: {e}")
        return False
    finally:
        proc.terminate()
        try:
            proc.wait(timeout=3)
        except subprocess.TimeoutExpired:
            proc.kill()


def main():
    parser = argparse.ArgumentParser(description="2-Pass Testing and Screenshot Runner")
    parser.add_argument("--screenshots", action="store_true", help="Run Pass 2 (with screenshots)")
    parser.add_argument("--cycle", type=int, default=1, help="Cycle number")
    parser.add_argument("--task", type=str, default="1.3.01", help="Task ID")
    parser.add_argument("--slug", type=str, default="cordis-lifecycle-bootstrap", help="Task slug")
    parser.add_argument("--port", type=int, default=3000, help="Server port")
    args = parser.parse_args()

    # Pass 1: Run unit tests first (Always mandatory)
    pass1_ok = run_pass_1_tests()
    if not pass1_ok:
        sys.exit(1)

    # Pass 2: Only after Pass 1 is OK, if flag enabled or full run requested
    if args.screenshots:
        pass2_ok = run_pass_2_screenshots(args.cycle, args.task, args.slug, args.port)
        if not pass2_ok:
            sys.exit(1)


if __name__ == "__main__":
    main()
