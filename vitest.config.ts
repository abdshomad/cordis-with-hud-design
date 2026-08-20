import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['tests/**/*.spec.ts'],
    exclude: ['cordis/**', 'hud-design/**', 'node_modules/**'],
  },
})
