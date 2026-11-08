import { randomUUID } from 'node:crypto'
import Fastify, { type FastifyInstance } from 'fastify'

const liveResponseSchema = {
  type: 'object',
  required: ['status'],
  additionalProperties: false,
  properties: {
    status: { type: 'string', enum: ['ok'] }
  }
} as const

const problemResponseSchema = {
  type: 'object',
  required: ['type', 'title', 'status', 'detail', 'instance', 'requestId'],
  additionalProperties: false,
  properties: {
    type: { type: 'string' },
    title: { type: 'string' },
    status: { type: 'integer' },
    detail: { type: 'string' },
    instance: { type: 'string' },
    requestId: { type: 'string', format: 'uuid' }
  }
} as const

function problemTitle(statusCode: number): string {
  switch (statusCode) {
    case 400: return 'Bad Request'
    case 401: return 'Unauthorized'
    case 403: return 'Forbidden'
    case 404: return 'Not Found'
    case 405: return 'Method Not Allowed'
    case 413: return 'Payload Too Large'
    case 415: return 'Unsupported Media Type'
    case 422: return 'Unprocessable Content'
    case 429: return 'Too Many Requests'
    default: return 'Internal Server Error'
  }
}

function problemDetail(statusCode: number): string {
  return statusCode >= 500
    ? 'An unexpected error occurred.'
    : 'The request could not be processed.'
}

export function buildApp(): FastifyInstance {
  const app = Fastify({
    logger: false,
    bodyLimit: 16 * 1024,
    trustProxy: false,
    requestIdHeader: false,
    genReqId: () => randomUUID()
  })

  app.addHook('onSend', async (request, reply, payload) => {
    reply.header('cache-control', 'no-store')
    reply.header('x-content-type-options', 'nosniff')
    reply.header('x-request-id', request.id)
    return payload
  })

  app.setNotFoundHandler(async (request, reply) => {
    return reply
      .code(404)
      .type('application/problem+json')
      .send({
        type: 'about:blank',
        title: 'Not Found',
        status: 404,
        detail: problemDetail(404),
        instance: request.url.split('?')[0],
        requestId: request.id
      })
  })

  app.setErrorHandler(async (error, request, reply) => {
    const candidateStatus = error.statusCode ?? 500
    const statusCode = candidateStatus >= 400 && candidateStatus < 500
      ? candidateStatus
      : 500

    return reply
      .code(statusCode)
      .type('application/problem+json')
      .send({
        type: 'about:blank',
        title: problemTitle(statusCode),
        status: statusCode,
        detail: problemDetail(statusCode),
        instance: request.url.split('?')[0],
        requestId: request.id
      })
  })

  app.get('/api/v1/health/live', {
    schema: {
      response: {
        200: liveResponseSchema,
        500: problemResponseSchema
      }
    }
  }, async () => ({ status: 'ok' as const }))

  return app
}
