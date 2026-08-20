import { Context, Service } from 'cordis'
import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'

export interface HudStaticConfig {
  port?: number
  host?: string
  rootPath?: string
}

declare module 'cordis' {
  interface Context {
    hudServer: HudStaticService
  }
}

const MIME_TYPES: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
}

export class HudStaticService extends Service<HudStaticConfig> {
  static provide = 'hudServer'
  public server?: http.Server
  public port: number = 3000
  public host: string = '0.0.0.0'
  public rootPath: string = ''

  constructor(ctx: Context, config: HudStaticConfig = {}) {
    super(ctx, 'hudServer')
    this.port = config.port || Number(process.env.PORT) || 3000
    this.host = config.host || process.env.HOST || '0.0.0.0'
    this.rootPath = config.rootPath || path.resolve(process.cwd(), 'src/client')
  }

  async [Service.init]() {
    const server = http.createServer((req, res) => {
      this.handleRequest(req, res)
    })

    await new Promise<void>((resolve, reject) => {
      server.listen(this.port, this.host, () => {
        this.server = server
        this.ctx.emit('hud/ready', { port: this.port, host: this.host })
        resolve()
      })
      server.on('error', reject)
    })

    return async () => {
      if (this.server) {
        await new Promise<void>((resolve) => {
          this.server?.close(() => resolve())
        })
      }
    }
  }

  public handleRequest(req: http.IncomingMessage, res: http.ServerResponse): void {
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      res.writeHead(405, { 'Content-Type': 'text/plain' })
      res.end('Method Not Allowed')
      return
    }

    const parsedUrl = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`)
    let pathname = decodeURIComponent(parsedUrl.pathname)
    if (pathname === '/') pathname = '/index.html'

    const safePath = path.normalize(pathname).replace(/^(\.\.[\/\\])+/, '')
    const filePath = path.join(this.rootPath, safePath)

    if (!filePath.startsWith(this.rootPath)) {
      res.writeHead(403, { 'Content-Type': 'text/plain' })
      res.end('Forbidden')
      return
    }

    fs.stat(filePath, (err, stats) => {
      if (err || !stats.isFile()) {
        res.writeHead(404, { 'Content-Type': 'text/plain' })
        res.end('Not Found')
        return
      }

      const ext = path.extname(filePath).toLowerCase()
      const contentType = MIME_TYPES[ext] || 'application/octet-stream'

      res.writeHead(200, {
        'Content-Type': contentType,
        'Content-Length': stats.size,
        'Cache-Control': 'no-cache',
      })

      if (req.method === 'HEAD') {
        res.end()
        return
      }

      const stream = fs.createReadStream(filePath)
      stream.pipe(res)
    })
  }
}

export const name = 'hud-static'

export function apply(ctx: Context, config: HudStaticConfig = {}) {
  ctx.plugin(HudStaticService, config)
}
