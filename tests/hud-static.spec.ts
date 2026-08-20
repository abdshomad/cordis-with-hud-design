import { describe, it, expect, afterEach } from 'vitest'
import { Context } from 'cordis'
import * as HudPlugin from '../src/plugins/hud-static.js'
import path from 'node:path'

describe('HudStaticPlugin', () => {
  let ctx: Context
  let fiber: any

  afterEach(async () => {
    if (fiber) {
      await fiber.dispose()
      fiber = undefined
    }
  })

  it('initializes Cordis and serves static index.html', async () => {
    ctx = new Context()
    const testPort = 3199

    fiber = ctx.plugin(HudPlugin.HudStaticService, {
      port: testPort,
      host: '127.0.0.1',
      rootPath: path.resolve(process.cwd(), 'src/client'),
    })
    await fiber

    const res = await fetch(`http://127.0.0.1:${testPort}/`)
    expect(res.status).toBe(200)
    expect(res.headers.get('content-type')).toContain('text/html')
    const text = await res.text()
    expect(text).toContain('<!DOCTYPE html>')
  })

  it('returns 404 for non-existent files', async () => {
    ctx = new Context()
    const testPort = 3198

    fiber = ctx.plugin(HudPlugin.HudStaticService, {
      port: testPort,
      host: '127.0.0.1',
      rootPath: path.resolve(process.cwd(), 'src/client'),
    })
    await fiber

    const res = await fetch(`http://127.0.0.1:${testPort}/non-existent-path-12345.xyz`)
    expect(res.status).toBe(404)
  })
})
