import type { TrustedExternalIdentity } from './identity.mjs'

export class InvalidBearerTokenError extends Error {
  readonly statusCode = 401
  constructor() {
    super('Invalid or expired authentication token.')
    this.name = 'InvalidBearerTokenError'
  }
}

export class AuthProviderUnavailableError extends Error {
  readonly statusCode = 503
  constructor() {
    super('Authentication provider is unavailable.')
    this.name = 'AuthProviderUnavailableError'
  }
}

const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

/**
 * Validate bearer tokens against the configured Supabase Auth server on every
 * protected request. Never decode unverified JWTs or trust user_metadata.
 * The caller must still resolve the verified subject to an active local account.
 */
export function createSupabaseIdentityVerifier(
  projectUrl: string,
  publishableKey: string,
  fetcher: typeof fetch = fetch
): (authorization: string | undefined) => Promise<TrustedExternalIdentity> {
  const url = new URL(projectUrl)
  if (url.protocol !== 'https:' || url.username || url.password || url.search || url.hash ||
      url.pathname !== '/' || !url.hostname.endsWith('.supabase.co') ||
      !publishableKey || /\s/.test(publishableKey)) {
    throw new Error('Invalid Supabase Auth configuration')
  }
  const endpoint = new URL('/auth/v1/user', url)

  return async authorization => {
    const match = /^Bearer ([A-Za-z0-9._~-]{1,8192})$/.exec(authorization ?? '')
    if (!match) throw new InvalidBearerTokenError()

    let response: Response
    try {
      response = await fetcher(endpoint, {
        method: 'GET',
        headers: {
          apikey: publishableKey,
          authorization: `Bearer ${match[1]}`
        },
        signal: AbortSignal.timeout(5000),
        redirect: 'error',
        cache: 'no-store'
      })
    } catch {
      throw new AuthProviderUnavailableError()
    }

    if (response.status === 401 || response.status === 403) throw new InvalidBearerTokenError()
    if (!response.ok) throw new AuthProviderUnavailableError()

    let payload: unknown
    try {
      payload = await response.json()
    } catch {
      throw new AuthProviderUnavailableError()
    }
    if (!payload || typeof payload !== 'object' || !('id' in payload) ||
        typeof payload.id !== 'string' || !uuid.test(payload.id)) {
      throw new AuthProviderUnavailableError()
    }
    return { provider: 'supabase', subject: payload.id }
  }
}
