import type { AuthenticatedPrincipal } from './identity.mjs'
import {
  canReadCommunityContent,
  canEditOwnedContent,
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

/**
 * Loads the minimum trusted facts required for community-content access.
 *
 * The principal must come from the server-side identity boundary. The
 * community ID is only a resource selector; membership, age eligibility and
 * community state are always loaded from trusted repositories.
 *
 * Repository failures intentionally propagate to the application boundary
 * (normally mapped to a generic 503). Missing records fail closed.
 */
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

/**
 * Reaction ownership is always resolved from persistence; a request cannot
 * supply the owner account ID used by the policy.
 */
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
