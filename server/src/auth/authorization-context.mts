import type { AuthenticatedPrincipal } from './identity.mjs'
import {
  canReadCommunityContent,
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
