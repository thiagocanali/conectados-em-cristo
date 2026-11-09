import type { AccountStatus, AuthenticatedPrincipal } from './identity.mjs'
import {
  canReadCommunityContent,
  canEditOwnedContent,
  canInteractDirectly,
  canRemoveReaction,
  type OwnedContentPolicyInput,
  type AdultEligibility,
  type CommunityStatus,
  type MembershipStatus,
  type PolicyDecision
} from './authorization.mjs'

export interface CommunityAuthorizationFactsRepository {
  findCommunityStatus(communityId: string): Promise<CommunityStatus | null>
  findMembershipStatus(accountId: string, communityId: string): Promise<MembershipStatus | null>
  findAdultEligibility(accountId: string): Promise<AdultEligibility | null>
}

export async function evaluateCommunityContentAccess(
  repository: CommunityAuthorizationFactsRepository,
  principal: AuthenticatedPrincipal,
  communityId: string
): Promise<PolicyDecision> {
  if (principal.accountStatus !== 'active') {
    return canReadCommunityContent({
      accountStatus: principal.accountStatus,
      adultEligibility: 'unknown',
      communityStatus: 'draft',
      membershipStatus: 'left'
    })
  }

  if (!principal.accountId.trim() || !communityId.trim()) {
    return { allowed: false, reason: 'resource_unavailable' }
  }

  const [communityStatus, membershipStatus, adultEligibility] = await Promise.all([
    repository.findCommunityStatus(communityId),
    repository.findMembershipStatus(principal.accountId, communityId),
    repository.findAdultEligibility(principal.accountId)
  ])

  return canReadCommunityContent({
    accountStatus: principal.accountStatus,
    adultEligibility: adultEligibility ?? 'unknown',
    communityStatus: communityStatus ?? 'draft',
    membershipStatus: membershipStatus ?? 'left'
  })
}

export interface OwnedContentAuthorizationFacts {
  ownerAccountId: string
  resourceStatus: OwnedContentPolicyInput['resourceStatus']
  editWindowOpen: boolean
}

export interface OwnedContentAuthorizationFactsRepository {
  findOwnedContentFacts(contentId: string): Promise<OwnedContentAuthorizationFacts | null>
}

export interface ReactionAuthorizationFactsRepository {
  findReactionOwnerAccountId(reactionId: string): Promise<string | null>
}

export interface DirectInteractionAuthorizationFactsRepository {
  findAccountStatus(accountId: string): Promise<AccountStatus | null>
  hasBlockEitherDirection(actorAccountId: string, targetAccountId: string): Promise<boolean>
}

/** The target ID selects a record; target status and block state come from trusted persistence. */
export async function evaluateDirectInteractionAccess(
  repository: DirectInteractionAuthorizationFactsRepository,
  principal: AuthenticatedPrincipal,
  targetAccountId: string
): Promise<PolicyDecision> {
  if (principal.accountStatus !== 'active') {
    return canInteractDirectly({
      actorStatus: principal.accountStatus,
      targetStatus: 'deleted',
      actorAccountId: principal.accountId,
      targetAccountId,
      blockedEitherDirection: true
    })
  }

  if (!principal.accountId.trim() || !targetAccountId.trim() || principal.accountId === targetAccountId) {
    return { allowed: false, reason: 'resource_unavailable' }
  }

  const [targetStatus, blockedEitherDirection] = await Promise.all([
    repository.findAccountStatus(targetAccountId),
    repository.hasBlockEitherDirection(principal.accountId, targetAccountId)
  ])

  return canInteractDirectly({
    actorStatus: principal.accountStatus,
    targetStatus: targetStatus ?? 'deleted',
    actorAccountId: principal.accountId,
    targetAccountId,
    blockedEitherDirection
  })
}

/**
 * Loads persisted ownership, visibility and edit-window facts before applying
 * the pure policy. The content ID is only a selector, never proof of ownership.
 */
export async function evaluateOwnedContentEditAccess(
  repository: OwnedContentAuthorizationFactsRepository,
  principal: AuthenticatedPrincipal,
  contentId: string
): Promise<PolicyDecision> {
  if (principal.accountStatus !== 'active') {
    return canEditOwnedContent({
      accountStatus: principal.accountStatus,
      actorAccountId: principal.accountId,
      ownerAccountId: '',
      resourceStatus: 'deleted',
      editWindowOpen: false
    })
  }

  if (!principal.accountId.trim() || !contentId.trim()) {
    return { allowed: false, reason: 'resource_unavailable' }
  }

  const facts = await repository.findOwnedContentFacts(contentId)
  if (!facts) return { allowed: false, reason: 'resource_unavailable' }

  return canEditOwnedContent({
    accountStatus: principal.accountStatus,
    actorAccountId: principal.accountId,
    ownerAccountId: facts.ownerAccountId,
    resourceStatus: facts.resourceStatus,
    editWindowOpen: facts.editWindowOpen
  })
}

/** Reaction ownership is always resolved from persistence; a request cannot supply its owner. */
export async function evaluateReactionRemovalAccess(
  repository: ReactionAuthorizationFactsRepository,
  principal: AuthenticatedPrincipal,
  reactionId: string
): Promise<PolicyDecision> {
  if (principal.accountStatus !== 'active') {
    return canRemoveReaction({
      accountStatus: principal.accountStatus,
      actorAccountId: principal.accountId,
      reactionOwnerAccountId: ''
    })
  }

  if (!principal.accountId.trim() || !reactionId.trim()) {
    return { allowed: false, reason: 'resource_unavailable' }
  }

  const reactionOwnerAccountId = await repository.findReactionOwnerAccountId(reactionId)
  if (!reactionOwnerAccountId) return { allowed: false, reason: 'resource_unavailable' }

  return canRemoveReaction({
    accountStatus: principal.accountStatus,
    actorAccountId: principal.accountId,
    reactionOwnerAccountId
  })
}
