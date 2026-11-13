import { buildRuntimeApp } from './runtime.mjs'

const port = Number(process.env.API_PORT ?? 3001)
const host = process.env.API_HOST ?? '127.0.0.1'

if (!Number.isInteger(port) || port < 1 || port > 65_535) {
  throw new Error('API_PORT must be an integer between 1 and 65535')
}

const app = buildRuntimeApp()

try {
  await app.listen({ port, host })
} catch {
  await app.close()
  process.exitCode = 1
}
