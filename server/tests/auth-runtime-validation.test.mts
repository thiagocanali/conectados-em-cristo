import test from 'node:test'
import assert from 'node:assert/strict'
import {
  canAccessModerationCase, canEditOwnedContent, canInteractDirectly,
  canReadPrayerRequest, canRemoveReaction,
  type ModerationPolicyInput, type OwnedContentPolicyInput,
  type DirectInteractionPolicyInput, type PrayerRequestPolicyInput
} from '../src/auth/authorization.mjs'
import {
  resolveAuthenticatedPrincipal, IdentityResolutionError, AccountUnavailableError, type TrustedExternalIdentity,
  type IdentityRepository, type AuthenticatedPrincipal
} from '../src/auth/identity.mjs'
import {
  evaluateCommunityContentAccess, evaluateDirectInteractionAccess,
  evaluateModerationCaseAccess, evaluateOwnedContentEditAccess, evaluateReactionRemovalAccess
} from '../src/auth/authorization-context.mjs'

// These casts simulate malformed adapter/database output, which bypasses static types at runtime.
test('edit permission requires the boolean true rather than a truthy adapter value', () => {
  for (const editWindowOpen of [undefined, null, 'false', 'true', 1, {}, []]) {
    const input = { accountStatus: 'active', actorAccountId: 'a', ownerAccountId: 'a', resourceStatus: 'active', editWindowOpen } as unknown as OwnedContentPolicyInput
    assert.equal(canEditOwnedContent(input).allowed, false)
  }
})

test('interaction requires an explicit boolean block result', () => {
  for (const blockedEitherDirection of [undefined, null, 0, '', 'false']) {
    const input = { actorStatus: 'active', targetStatus: 'active', actorAccountId: 'a', targetAccountId: 'b', blockedEitherDirection } as unknown as DirectInteractionPolicyInput
    assert.equal(canInteractDirectly(input).allowed, false)
  }
})

const moderation = {
  actorStatus: 'active', role: 'moderator', actorAccountId: 'a', caseCommunityId: 'c',
  assignedCommunityIds: ['c'], hasConflictOfInterest: false
} as const

test('moderation rejects unknown conflict results and malformed assignment lists', () => {
  for (const hasConflictOfInterest of [undefined, null, 0, '', 'false']) {
    assert.equal(canAccessModerationCase({ ...moderation, hasConflictOfInterest } as unknown as ModerationPolicyInput).allowed, false)
  }
  for (const assignedCommunityIds of [undefined, null, 'c', ['c', null], { includes: () => true }]) {
    assert.equal(canAccessModerationCase({ ...moderation, assignedCommunityIds } as unknown as ModerationPolicyInput).allowed, false)
  }
})

test('administrator justification requires explicit true and a nonblank string', () => {
  for (const justifiedNeed of [undefined, null, 1, 'true']) {
    assert.equal(canAccessModerationCase({ ...moderation, role: 'administrator', justifiedNeed, justification: 'Review' } as unknown as ModerationPolicyInput).allowed, false)
  }
  for (const justification of [null, undefined, 42, {}, '   ']) {
    assert.equal(canAccessModerationCase({ ...moderation, role: 'administrator', justifiedNeed: true, justification } as unknown as ModerationPolicyInput).allowed, false)
  }
})

test('prayer audience is a list of IDs and unknown visibility never grants non-owner access', () => {
  const input = { actorStatus: 'active', actorAccountId: 'a', ownerAccountId: 'b', visibility: 'selected', selectedAudienceAccountIds: ['a'] }
  for (const visibility of [undefined, null, '', 'unexpected']) {
    assert.equal(canReadPrayerRequest({ ...input, visibility } as unknown as PrayerRequestPolicyInput).allowed, false)
  }
  for (const selectedAudienceAccountIds of [undefined, null, 'a', ['a', 1]]) {
    assert.equal(canReadPrayerRequest({ ...input, selectedAudienceAccountIds } as unknown as PrayerRequestPolicyInput).allowed, false)
  }
})

test('missing or non-string owner IDs deny access without throwing', () => {
  for (const id of [undefined, null, 1, {}, '', '   ']) {
    assert.equal(canRemoveReaction({ accountStatus: 'active', actorAccountId: id, reactionOwnerAccountId: id } as unknown as Parameters<typeof canRemoveReaction>[0]).allowed, false)
  }
})

test('invalid external identity values never reach the repository', async () => {
  let calls = 0
  const repository: IdentityRepository = { findAccountByIdentity: async () => { calls++; return null } }
  for (const identity of [null, undefined, {}, { provider: ' ', subject: 's' }, { provider: 'p', subject: 42 }, { provider: 'p', subject: ' ' }]) {
    await assert.rejects(resolveAuthenticatedPrincipal(repository, identity as TrustedExternalIdentity), IdentityResolutionError)
  }
  assert.equal(calls, 0)
})

test('an active account with an invalid internal UUID cannot become a principal', async () => {
  for (const id of [undefined, null, 1, '', '   ', 'user@example.invalid', '00000000-0000-0000-0000-000000000000']) {
    const repository = { findAccountByIdentity: async () => ({ id, status: 'active' }) } as IdentityRepository
    await assert.rejects(resolveAuthenticatedPrincipal(repository, { provider: 'p', subject: 's' }), IdentityResolutionError)
  }
})

test('all context loaders reject malformed principal IDs before repository access', async () => {
  const inaccessible = new Proxy({}, { get() { throw new Error('Repository must not be accessed') } })
  for (const accountId of [undefined, null, 1, '', '   ']) {
    const principal = { provider: 'p', subject: 's', accountStatus: 'active', accountId } as AuthenticatedPrincipal
    assert.equal((await evaluateCommunityContentAccess(inaccessible as Parameters<typeof evaluateCommunityContentAccess>[0], principal, 'c')).allowed, false)
    assert.equal((await evaluateDirectInteractionAccess(inaccessible as Parameters<typeof evaluateDirectInteractionAccess>[0], principal, 'b')).allowed, false)
    assert.equal((await evaluateModerationCaseAccess(inaccessible as Parameters<typeof evaluateModerationCaseAccess>[0], principal, 'case')).allowed, false)
    assert.equal((await evaluateOwnedContentEditAccess(inaccessible as Parameters<typeof evaluateOwnedContentEditAccess>[0], principal, 'post')).allowed, false)
    assert.equal((await evaluateReactionRemovalAccess(inaccessible as Parameters<typeof evaluateReactionRemovalAccess>[0], principal, 'reaction')).allowed, false)
  }
})

test('dependency failures propagate instead of becoming an authenticated account', async () => {
  const error = new Error('dependency unavailable')
  const repository: IdentityRepository = { findAccountByIdentity: async () => { throw error } }
  await assert.rejects(resolveAuthenticatedPrincipal(repository, { provider: 'p', subject: 's' }), value => value === error)
})

test('context loaders never turn incomplete persisted block or conflict facts into permission', async () => {
  const principal: AuthenticatedPrincipal = { provider: 'p', subject: 's', accountId: 'a', accountStatus: 'active' }
  const directRepository = {
    findAccountStatus: async () => 'active',
    hasBlockEitherDirection: async () => null
  } as unknown as Parameters<typeof evaluateDirectInteractionAccess>[0]
  assert.equal((await evaluateDirectInteractionAccess(directRepository, principal, 'b')).allowed, false)
  const moderationRepository = {
    findCaseCommunityId: async () => 'c', findPlatformRole: async () => 'moderator',
    findAssignedCommunityIds: async () => ['c'], hasModerationConflict: async () => undefined
  } as unknown as Parameters<typeof evaluateModerationCaseAccess>[0]
  assert.equal((await evaluateModerationCaseAccess(moderationRepository, principal, 'case')).allowed, false)
  const contentRepository = {
    findOwnedContentFacts: async () => ({ ownerAccountId: 'a', resourceStatus: 'active', editWindowOpen: 'false' })
  } as unknown as Parameters<typeof evaluateOwnedContentEditAccess>[0]
  assert.equal((await evaluateOwnedContentEditAccess(contentRepository, principal, 'post')).allowed, false)
})

test('resolving the next request observes an account suspension instead of caching the principal', async () => {
  let status: 'active' | 'suspended' = 'active'
  let calls = 0
  const repository: IdentityRepository = {
    findAccountByIdentity: async () => { calls++; return { id: '11111111-1111-4111-8111-111111111111', status } }
  }
  const identity = { provider: 'p', subject: 's' }
  assert.equal((await resolveAuthenticatedPrincipal(repository, identity)).accountStatus, 'active')
  status = 'suspended'
  await assert.rejects(resolveAuthenticatedPrincipal(repository, identity), AccountUnavailableError)
  assert.equal(calls, 2)
})
