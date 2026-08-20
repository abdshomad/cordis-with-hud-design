import { describe, it, expect } from 'vitest'
import { bootstrap } from '../src/index.js'

describe('Cordis App Bootstrap', () => {
  it('initializes Cordis context and registers hud server', async () => {
    const testPort = 3197
    const app = await bootstrap({ port: testPort, host: '127.0.0.1' })

    expect(app.root).toBeDefined()
    expect(app.root.hudServer).toBeDefined()

    const res = await fetch(`http://127.0.0.1:${testPort}/`)
    expect(res.status).toBe(200)
    const text = await res.text()
    expect(text).toContain('<!DOCTYPE html>')

    await app.shutdown()
  })
})
