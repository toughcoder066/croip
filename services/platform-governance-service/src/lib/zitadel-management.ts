/**
 * Thin client for Zitadel's Management/User v2 API, used only to invite internal CROIP
 * users (oversight officials, staff) — never for ratepayers or concession personnel, who
 * authenticate through their own flows.
 *
 * Deliberately NOT wired up with real credentials: ZITADEL_MANAGEMENT_URL and
 * ZITADEL_MANAGEMENT_PAT are unset in every .env.example in this repo, and no Zitadel
 * instance exists yet. Until they're set, inviteUser() below no-ops into a clearly logged
 * stub and returns a placeholder id — the rest of the invite flow (PENDING_ACTIVATION
 * state, resend, audit trail) works end-to-end regardless, so this function is the only
 * thing that needs to change once real credentials exist.
 *
 * The real-call branch targets Zitadel's v2 User Service API (POST /v2/users/human,
 * creating the user with no password so Zitadel treats it as unverified and the console/API
 * can trigger its own invite-code email). This shape is written from Zitadel's documented
 * v2 API conventions but has not been exercised against a live instance — verify the exact
 * request/response shape against your instance's API version before relying on it in
 * production, and adjust here if it differs.
 */

export interface ZitadelInviteInput {
  email: string;
  fullName: string;
  phone?: string;
}

export interface ZitadelInviteResult {
  zitadelId: string;
  invited: boolean;
  /** Present only in the stub path, so callers/logs can tell a real invite never went out. */
  stub?: true;
}

function managementConfig() {
  const url = process.env.ZITADEL_MANAGEMENT_URL;
  const pat = process.env.ZITADEL_MANAGEMENT_PAT;
  const orgId = process.env.ZITADEL_ORGANIZATION_ID;
  if (!url || !pat || !orgId) return null;
  return { url: url.replace(/\/$/, ''), pat, orgId };
}

export async function inviteUser(input: ZitadelInviteInput): Promise<ZitadelInviteResult> {
  const config = managementConfig();

  if (!config) {
    const placeholderId = `pending_invite_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
    console.warn(
      `[zitadel-management] ZITADEL_MANAGEMENT_URL/PAT/ORGANIZATION_ID not configured — ` +
      `skipping real Zitadel invite for ${input.email}. User created in PENDING_ACTIVATION ` +
      `with placeholder id ${placeholderId}; no password-reset email was sent. Set those three ` +
      `env vars on platform-governance-service to enable real invites.`
    );
    return { zitadelId: placeholderId, invited: false, stub: true };
  }

  const [givenName, ...rest] = input.fullName.trim().split(/\s+/);
  const familyName = rest.join(' ') || givenName;

  const response = await fetch(`${config.url}/v2/users/human`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${config.pat}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      organization: { orgId: config.orgId },
      profile: { givenName, familyName },
      email: { email: input.email, isVerified: false },
      ...(input.phone ? { phone: { phone: input.phone, isVerified: false } } : {})
    })
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => '');
    throw new Error(`Zitadel user-invite call failed (${response.status}): ${detail.slice(0, 500)}`);
  }

  const body = (await response.json()) as { userId?: string };
  if (!body.userId) throw new Error('Zitadel user-invite call succeeded but returned no userId');

  return { zitadelId: body.userId, invited: true };
}
