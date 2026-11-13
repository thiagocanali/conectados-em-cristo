import { randomUUID } from 'node:crypto'
import Fastify, {
  type FastifyInstance,
  type FastifyReply,
  type FastifyRequest
} from 'fastify'
import type { CommunityRepository } from './communities/community-repository.mjs'

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

const publicCommunitySchema = {
  type: 'object',
  required: ['id', 'slug', 'name', 'category', 'description', 'rulesSummary', 'joinMode'],
  additionalProperties: false,
  properties: {
    id: { type: 'string', format: 'uuid' },
    slug: { type: 'string', maxLength: 80, pattern: '^[a-z0-9]+(?:-[a-z0-9]+)*$' },
    name: { type: 'string', minLength: 1, maxLength: 100 },
    category: { type: 'string', minLength: 1, maxLength: 60 },
    description: { type: 'string', maxLength: 300 },
    rulesSummary: { type: 'string', maxLength: 1200 },
    joinMode: { type: 'string', enum: ['open', 'approval'] }
  }
} as const

const publicCommunityPageSchema = {
  type: 'object',
  required: ['items'],
  additionalProperties: false,
  properties: {
    items: { type: 'array', items: publicCommunitySchema },
    nextCursor: { type: 'string', maxLength: 1024 }
  }
} as const

interface CommunityListQuery {
  cursor?: string
  limit?: number
}

export interface AppOptions {
  communityRepository?: CommunityRepository
  databaseReadinessCheck?: () => Promise<void>
}

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
    case 503: return 'Service Unavailable'
    default: return statusCode >= 400 && statusCode < 500 ? 'Client Error' : 'Internal Server Error'
  }
}

function problemDetail(statusCode: number): string {
  return statusCode >= 500
    ? 'An unexpected error occurred.'
    : 'The request could not be processed.'
}

function isDatabaseUnavailable(error: unknown): boolean {
  if (typeof error !== 'object' || error === null || !('code' in error) || typeof error.code !== 'string') {
    return false
  }

  return error.code.startsWith('08') ||
    error.code === '57P01' ||
    ['ECONNREFUSED', 'ETIMEDOUT', 'EHOSTUNREACH'].includes(error.code)
}

function sendProblem(request: FastifyRequest, reply: FastifyReply, statusCode: number) {
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
}

export function buildApp(options: AppOptions = {}): FastifyInstance {
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
    return sendProblem(request, reply, 404)
  })

  app.setErrorHandler(async (error, request, reply) => {
    const candidateStatus = typeof error === 'object' && error !== null && 'statusCode' in error && typeof error.statusCode === 'number'
      ? error.statusCode
      : 500
    const statusCode = isDatabaseUnavailable(error)
      ? 503
      : candidateStatus >= 400 && candidateStatus < 500
        ? candidateStatus
        : 500

    return sendProblem(request, reply, statusCode)
  })

  app.get('/api/v1/health/live', {
    schema: {
      response: {
        200: liveResponseSchema,
        500: problemResponseSchema
      }
    }
  }, async () => ({ status: 'ok' as const }))

  app.get('/api/v1/health/ready', {
    schema: {
      response: {
        200: liveResponseSchema,
        503: problemResponseSchema
      }
    }
  }, async (request, reply) => {
    if (!options.databaseReadinessCheck) return sendProblem(request, reply, 503)

    try {
      await options.databaseReadinessCheck()
      return { status: 'ok' as const }
    } catch {
      return sendProblem(request, reply, 503)
    }
  })

  app.get<{ Querystring: CommunityListQuery }>('/api/v1/communities', {
    schema: {
      querystring: {
        type: 'object',
        additionalProperties: false,
        properties: {
          cursor: { type: 'string', maxLength: 1024, pattern: '^[A-Za-z0-9_-]+$' },
          limit: { type: 'integer', minimum: 1, maximum: 50, default: 20 }
        }
      },
      response: {
        200: publicCommunityPageSchema,
        400: problemResponseSchema,
        503: problemResponseSchema
      }
    }
  }, async (request, reply) => {
    if (!options.communityRepository) return sendProblem(request, reply, 503)

    return options.communityRepository.listPublic({
      ...(request.query.cursor ? { cursor: request.query.cursor } : {}),
      limit: request.query.limit ?? 20
    })
  })

  app.get<{ Params: { communityId: string } }>('/api/v1/communities/:communityId', {
    schema: {
      params: {
        type: 'object',
        required: ['communityId'],
        additionalProperties: false,
        properties: {
          communityId: { type: 'string', format: 'uuid' }
        }
      },
      response: {
        200: publicCommunitySchema,
        400: problemResponseSchema,
        404: problemResponseSchema,
        503: problemResponseSchema
      }
    }
  }, async (request, reply) => {
    if (!options.communityRepository) return sendProblem(request, reply, 503)

    const community = await options.communityRepository.getPublicById(request.params.communityId)
    if (!community) return sendProblem(request, reply, 404)
    return community
  })

  return app
}
