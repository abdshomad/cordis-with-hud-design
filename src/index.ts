import { Context } from 'cordis'
import fs from 'node:fs'
import path from 'node:path'
import * as HudPlugin from './plugins/hud-static.js'

// Load .env if present
try {
  if (fs.existsSync('.env')) {
    process.loadEnvFile?.('.env')
  }
} catch {}

export interface BootstrapOptions {
  port?: number
  host?: string
  registerSignals?: boolean
}

export async function bootstrap(options: BootstrapOptions = {}) {
  const root = new Context()

  const port = options.port || Number(process.env.PORT) || 3000
  const host = options.host || process.env.HOST || '0.0.0.0'
  const rootPath = path.resolve(process.cwd(), 'src/client')

  console.log('[Cordis] Initializing Cordis microkernel...')

  root.on('hud/ready', (info: { port: number; host: string }) => {
    const displayHost = info.host === '0.0.0.0' ? 'localhost' : info.host
    console.log(`[Cordis] HUD Design Plugin active: http://${displayHost}:${info.port}`)
    console.log('[Cordis] Platform ready and listening.')
  })

  const fiber = root.plugin(HudPlugin.HudStaticService, {
    port,
    host,
    rootPath,
  })

  await fiber

  const shutdown = async () => {
    console.log('\n[Cordis] Shutting down platform gracefully...')
    await fiber.dispose()
    console.log('[Cordis] Shutdown complete.')
  }

  if (options.registerSignals) {
    const onSignal = async () => {
      await shutdown()
      process.exit(0)
    }
    process.once('SIGINT', onSignal)
    process.once('SIGTERM', onSignal)
  }

  return { root, fiber, shutdown }
}

// Auto-run if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  bootstrap({ registerSignals: true }).catch((err) => {
    console.error('[Cordis] Bootstrap error:', err)
    process.exit(1)
  })
}
