import type { Pool } from 'pg'
import type { IdentityRepository, InternalAccount, TrustedExternalIdentity } from './identity.mjs'

/**
 * Read-only lookup of the internal account mapped to a provider-verified
 * identity. Both identifiers are bound parameters, never interpolated SQL.
 * The schema and dedicated runtime grants must be deployed before wiring
 * this adapter into protected routes.
 */
export class PostgresIdentityRepository implements IdentityRepository {
  constructor(private readonly pool: Pick<Pool, 'query'>) {}

  async findAccountByIdentity(identity: TrustedExternalIdentity): Promise<InternalAccount | null> {
    const result = await this.pool.query<InternalAccount>(
      `SELECT a.id::text AS id, a.status
         FROM account_identities AS i
         JOIN accounts AS a ON a.id = i.account_id
        WHERE i.provider = $1
          AND i.subject = $2
        LIMIT 1`,
      [identity.provider, identity.subject]
    )
    return result.rows[0] ?? null
  }
}
