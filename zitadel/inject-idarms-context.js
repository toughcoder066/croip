/**
 * Zitadel Complement Token Action — "Pre access token creation" trigger.
 *
 * Replaces the CURRENT live Action, which hardcodes the same concessionId/assemblyId pair
 * (the one seeded "CROIP Default Concession (Dev)" row) into every single access token it
 * complements, regardless of who's authenticating. That was fine while only one concession
 * existed; it is NOT fine once a second concession is onboarded, because every one of that
 * concession's human users and API-client machine users would still get stamped with the
 * FIRST concession's id, silently misattributing everything they do.
 *
 * This version reads concessionId/assemblyId (and, for machine users, roles) from the
 * authenticating identity's own Zitadel metadata instead of a constant:
 *   - Oversight officers (platform-governance-service's `User` rows) don't currently get
 *     this metadata set at invite time — they fall through to the same hardcoded default as
 *     before, which is still correct for them (CROIP staff aren't scoped to one concession).
 *   - A concessionaire's API-client machine user DOES get `concessionId` and `roles`
 *     metadata set when provisioned — see provisionMachineUser in
 *     services/platform-governance-service/src/lib/zitadel-management.ts. This Action is
 *     what makes that metadata actually reach the JWT as the `urn:idarms:context` claim and
 *     `urn:idarms:service-roles` claim that every service's auth.ts already checks.
 *
 * CAVEAT — written from Zitadel's documented Actions v1 JS API conventions, but not
 * exercised against this live v4.16.0 instance. The exact shape of `ctx.v1.getUser()` /
 * metadata decoding may differ from what's below; verify against the instance (e.g. by
 * logging ctx inside a throwaway Action first) before replacing the live one.
 *
 * To apply: Console → Actions → replace the existing Action's script with this file's
 * contents (or push via Management API: PUT /management/v1/actions/{actionId}), keeping it
 * attached to the same "Pre access token creation" trigger. No code in this repo needs to
 * change — every service's auth.ts already just reads whatever `urn:idarms:context` claim
 * shows up in the token.
 */
function injectIdarmsContext(ctx, api) {
  // Fallback: the single seeded dev concession/assembly — keeps every existing CROIP staff
  // (oversight) login working exactly as before, since those don't carry this metadata.
  var concessionId = '81fdc8f3-fcad-481a-b7fa-e916d5e97d9e';
  var assemblyId = '01c23cab-b1b2-4dae-b99b-32ea574632d9';
  var roles = null;

  var user = ctx.v1.getUser();
  var metadata = (user && user.metadata) || [];

  metadata.forEach(function (entry) {
    // Zitadel returns metadata values base64-encoded.
    var value = decodeBase64(entry.value);
    if (entry.key === 'concessionId' && value) concessionId = value;
    if (entry.key === 'assemblyId' && value) assemblyId = value;
    if (entry.key === 'roles' && value) roles = value;
  });

  api.v1.claims.setClaim('urn:idarms:context', { concessionId: concessionId, assemblyId: assemblyId });

  // Human (authorization_code) logins already get their project-role grants asserted into
  // ZITADEL_ROLES_CLAIM natively — this claim exists only to cover machine users, which
  // never carry that native claim regardless of role grants. Only set it when metadata
  // actually supplied roles, so a human login's permissions still come from the native
  // claim alone.
  if (roles) {
    api.v1.claims.setClaim('urn:idarms:service-roles', roles.split(' '));
  }
}

function decodeBase64(value) {
  if (!value) return null;
  try {
    return Buffer.from(value, 'base64').toString('utf8');
  } catch (e) {
    return null;
  }
}
