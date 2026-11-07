import Fastify, { type FastifyInstance } from 'fastify'

const liveResponseSchema = {
  type: 'object',
  required: ['status'],
  additionalProperties: false,
  properties: {
    status: { type: 'string', enum: ['ok'] }
  }
} as const

export function buildApp(): FastifyInstance {
  const app = Fastify({
    logger: false,
    bodyLimit: 16 * 1024,
    trustProxy: false
  })

  app.addHook('onSend', async (_request, reply, payload) => {
    reply.header('cache-control', 'no-store')
    reply.header('x-content-type-options', 'nosniff')
    return payload
  })

  app.get('/api/v1/health/live', {
    schema: {
      response: {
        200: liveResponseSchema
      }
    }
  }, async () => ({ status: 'ok' as const }))

  return app
}
