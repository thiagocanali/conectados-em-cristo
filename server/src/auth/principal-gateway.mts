import {
  resolveAuthenticatedPrincipal,
  type AuthenticatedPrincipal,
  type IdentityRepository,
  type TrustedExternalIdentity
} from './identity.mjs'

export type IdentityVerifier = (authorization: string | undefined) => Promise<TrustedExternalIdentity>

/**
 * Composes provider-side token validation with the current internal account
 * status. Neither step is optional. Do not cache principals between requests:
 * suspensions must take effect on the next request.
 */
export function createAuthenticatedPrincipalResolver(
  verifyIdentity: IdentityVerifier,
  repository: IdentityRepository
): (authorization: string | undefined) => Promise<AuthenticatedPrincipal> {
  return async authorization => {
    const identity = await verifyIdentity(authorization)
    return resolveAuthenticatedPrincipal(repository, identity)
  }
}
