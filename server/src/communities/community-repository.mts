import type { Pool } from 'pg'

export interface PublicCommunity {
  id: string
  slug: string
  name: string
  category: string
  description: string
  rulesSummary: string
  joinMode: 'open' | 'approval'
}

export interface PublicCommunityPage {
  items: PublicCommunity[]
  nextCursor?: string
}

export interface CommunityListOptions {
  cursor?: string
  limit: number
}

export interface CommunityRepository {
  listPublic(options: CommunityListOptions): Promise<PublicCommunityPage>
  getPublicById(id: string): Promise<PublicCommunity | null>
}

interface CommunityCursor {
  name: string
  id: string
}

export class InvalidCommunityCursorError extends Error {
  readonly statusCode = 400

  constructor() {
    super('Invalid community cursor')
    this.name = 'InvalidCommunityCursorError'
  }
}

const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
const cursorPattern = /^[A-Za-z0-9_-]{1,512}$/

function encodeCursor(community: Pick<PublicCommunity, 'name' | 'id'>): string {
  return Buffer.from(JSON.stringify({ name: community.name, id: community.id })).toString('base64url')
}

function decodeCursor(value: string): CommunityCursor {
  try {
    if (!cursorPattern.test(value)) throw new InvalidCommunityCursorError()

    const decoded = Buffer.from(value, 'base64url')
    if (decoded.toString('base64url') !== value) throw new InvalidCommunityCursorError()

    const parsed: unknown = JSON.parse(decoded.toString('utf8'))
    if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
      throw new InvalidCommunityCursorError()
    }

    const cursor = parsed as Record<string, unknown>
    if (
      Object.keys(cursor).length !== 2 ||
      typeof cursor.name !== 'string' ||
      cursor.name.length < 1 ||
      cursor.name.length > 100 ||
      typeof cursor.id !== 'string' ||
      !uuidPattern.test(cursor.id)
    ) {
      throw new InvalidCommunityCursorError()
    }

    return { name: cursor.name, id: cursor.id }
  } catch {
    throw new InvalidCommunityCursorError()
  }
}

export class PostgresCommunityRepository implements CommunityRepository {
  constructor(private readonly pool: Pool) {}

  async listPublic(options: CommunityListOptions): Promise<PublicCommunityPage> {
    const cursor = options.cursor ? decodeCursor(options.cursor) : null
    const result = await this.pool.query<PublicCommunity>(
      `SELECT
         id::text AS id,
         slug,
         name,
         category,
         description,
         rules_summary AS "rulesSummary",
         join_mode AS "joinMode"
       FROM communities
       WHERE status = 'active'
         AND catalog_visibility = 'listed'
         AND (
           $2::text IS NULL
           OR (name COLLATE "C", id) > ($2::text COLLATE "C", $3::uuid)
         )
       ORDER BY name COLLATE "C" ASC, id ASC
       LIMIT $1`,
      [options.limit + 1, cursor?.name ?? null, cursor?.id ?? null]
    )

    const hasMore = result.rows.length > options.limit
    const items = result.rows.slice(0, options.limit)
    const lastItem = items.at(-1)

    return {
      items,
      ...(hasMore && lastItem ? { nextCursor: encodeCursor(lastItem) } : {})
    }
  }

  async getPublicById(id: string): Promise<PublicCommunity | null> {
    const result = await this.pool.query<PublicCommunity>(
      `SELECT
         id::text AS id,
         slug,
         name,
         category,
         description,
         rules_summary AS "rulesSummary",
         join_mode AS "joinMode"
       FROM communities
       WHERE id = $1::uuid
         AND status = 'active'
         AND catalog_visibility = 'listed'
       LIMIT 1`,
      [id]
    )

    return result.rows[0] ?? null
  }
}
