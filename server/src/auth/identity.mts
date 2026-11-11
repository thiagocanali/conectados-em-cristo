import { isNonBlankString } from './validation.mjs'

export const ACCOUNT_STATUSES = ['pending_verification', 'active', 'restricted', 'suspended', 'deleted'] as const

export type AccountStatus = typeof ACCOUNT_STATUSES[number]

export interface TrustedExternalIdentity {
  provider: string
  subject: string
}

export interface InternalAccount {
  id: string
  status: AccountStatus
}

export interface IdentityRepository {
  findAccountByIdentity(identity: TrustedExternalIdentity): Promise<InternalAccount | null>
}

export interface AuthenticatedPrincipal extends TrustedExternalIdentity {
  accountId: string
  accountStatus: AccountStatus
}

export class IdentityResolutionError extends Error {
  readonly code = 'IDENTITY_NOT_RESOLVED'
  constructor(message = 'Authenticated identity could not be resolved.') {
    super(message)
    this.name = 'IdentityResolutionError'
  }
}

export class AccountUnavailableError extends Error {
  readonly code = 'ACCOUNT_UNAVAILABLE'
  constructor(message = 'Account is not available for protected operations.') {
    super(message)
    this.name = 'AccountUnavailableError'
  }
}

/**
 * Provider adapters must return only identity data that has already passed
 * provider-specific token/session validation. This module deliberately does
 * not parse, verify, or trust client-supplied tokens.
 */
export async function resolveAuthenticatedPrincipal(
  repository: IdentityRepository,
  identity: TrustedExternalIdentity
): Promise<AuthenticatedPrincipal> {
  if (!identity || !isNonBlankString(identity.provider) || !isNonBlankString(identity.subject)) {
    throw new IdentityResolutionError()
  }
  const account = await repository.findAccountByIdentity(identity)
  if (!account) throw new IdentityResolutionError()
  if (account.status !== 'active') throw new AccountUnavailableError()
  if (typeof account.id !== 'string' || !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(account.id)) {
    throw new IdentityResolutionError()
  }
  return {
    provider: identity.provider,
    subject: identity.subject,
    accountId: account.id,
    accountStatus: account.status
  }
}
