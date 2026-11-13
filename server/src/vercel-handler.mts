import type { IncomingMessage, ServerResponse } from 'node:http'
import type { FastifyInstance } from 'fastify'

export function createVercelHandler(app: FastifyInstance) {
  return async function handler(request: IncomingMessage, response: ServerResponse): Promise<void> {
    // Fastify memoizes readiness; concurrent invocations reuse the same instance.
    await app.ready()
    app.server.emit('request', request, response)
  }
}
