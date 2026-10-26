/**
 * Thin client for Zitadel's Management API, used for everything CROIP itself provisions in
 * Zitadel on another identity's behalf: inviting internal CROIP users (oversight officials,
 * staff) via the v2 User Service API, and provisioning/revoking concessionaire API-client
 * machine users via the v1 Management API. Never used for ratepayers or concession field
 * personnel, who authenticate through their own flows.
 *
 * Deliberately NOT wired up with real credentials by default: ZITADEL_MANAGEMENT_URL,
 * ZITADEL_MANAGEMENT_PAT and ZITADEL_ORGANIZATION_ID are unset in every .env.example in this
 * repo (a real self-hosted Zitadel instance does run as part of the stack — AUTH_MODE=zitadel
 * everywhere already verifies its tokens — but no Management API PAT has been generated for
 * platform-governance-service to call back into it). Until those three env vars are set,
 * every function below no-ops into a clearly logged stub and returns a placeholder — the rest
 * of each flow (PENDING_ACTIVATION state / ApiClient lifecycle, resend/rotate, audit trail)
 * works end-to-end regardless, so these functions are the only things that need to change
 * once real credentials exist.
 *
 * provisionMachineUser/deactivateMachineUser below are verified working against this
 * project's live Zitadel v4.16.0 instance. inviteUser (human users) is still written from
 * Zitadel's documented API conventions only — not yet exercised against a live instance —
 * so verify its request/response shape before relying on it in production.
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

/**
 * Real machine-to-machine credentials for a concessionaire's backend integration (their
 * "API key"), backed by an actual Zitadel machine user + client_credentials secret —
 * exactly the same mechanism property-registry-service's own machine user already uses
 * for its one internal call to shared-services. Every service already verifies real
 * Zitadel-issued JWTs, so this is what makes a concessionaire's API key *work* end-to-end,
 * unlike the locally-hashed placeholder this replaces.
 *
 * Uses Zitadel's v1 Management API: POST /management/v1/users/machine to create the user,
 * then PUT /management/v1/users/{id}/secret (singular, PUT — not the plausible-looking but
 * wrong /secrets/generate POST) to generate its client_credentials secret. Both calls are
 * verified working against this project's live Zitadel v4.16.0 instance, not just written
 * from docs.
 *
 * Stamps a `concessionId` metadata entry on the new machine user for forensic/audit
 * purposes only — nothing reads it at request time. An earlier version of this design also
 * relied on a Zitadel Action reading that metadata to inject a `urn:idarms:context` claim
 * into every token (see zitadel/inject-idarms-context.js, now historical). That was
 * abandoned after confirming empirically that this Zitadel version does not apply a
 * Target's returned claims to client_credentials-issued tokens, Zitadel-documented contract
 * or not. Every service now resolves a service token's concession instead by calling this
 * service's own GET /v1/api-clients/:clientId/context with the verified JWT's own
 * `client_id` claim (see governanceService.getApiClientContext and each service's
 * auth.ts) — no Action, no Target, no webhook involved.
 */
export interface ZitadelMachineUserInput {
  userName: string;
  name: string;
  concessionId: string;
}

export interface ZitadelMachineCredentials {
  zitadelUserId: string;
  clientId: string;
  clientSecret: string;
  issuedVia: 'zitadel' | 'stub';
}

async function setUserMetadata(config: NonNullable<ReturnType<typeof managementConfig>>, userId: string, key: string, value: string): Promise<void> {
  const response = await fetch(`${config.url}/management/v1/users/${userId}/metadata/${key}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${config.pat}`,
      'x-zitadel-orgid': config.orgId,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ value: Buffer.from(value, 'utf8').toString('base64') })
  });
  if (!response.ok) {
    const detail = await response.text().catch(() => '');
    throw new Error(`Zitadel set-metadata call failed (${response.status}): ${detail.slice(0, 500)}`);
  }
}

export async function provisionMachineUser(input: ZitadelMachineUserInput): Promise<ZitadelMachineCredentials> {
  const config = managementConfig();

  if (!config) {
    const suffix = `${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
    console.warn(
      `[zitadel-management] ZITADEL_MANAGEMENT_URL/PAT/ORGANIZATION_ID not configured — ` +
      `skipping real machine-user provisioning for concession ${input.concessionId}. Returning a ` +
      `placeholder credential that will NOT work against any service's real auth. Set those three ` +
      `env vars on platform-governance-service to enable real API keys.`
    );
    return {
      zitadelUserId: `pending_machine_${suffix}`,
      clientId: `stub_client_${suffix}`,
      clientSecret: `stub_secret_${randomHex(24)}`,
      issuedVia: 'stub'
    };
  }

  const createResponse = await fetch(`${config.url}/management/v1/users/machine`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${config.pat}`,
      'x-zitadel-orgid': config.orgId,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      userName: input.userName,
      name: input.name,
      description: `Concessionaire API client — concession ${input.concessionId}`,
      accessTokenType: 'ACCESS_TOKEN_TYPE_JWT'
    })
  });
  if (!createResponse.ok) {
    const detail = await createResponse.text().catch(() => '');
    throw new Error(`Zitadel machine-user creation failed (${createResponse.status}): ${detail.slice(0, 500)}`);
  }
  const created = (await createResponse.json()) as { userId?: string };
  if (!created.userId) throw new Error('Zitadel machine-user creation succeeded but returned no userId');

  await setUserMetadata(config, created.userId, 'concessionId', input.concessionId);

  const secretResponse = await fetch(`${config.url}/management/v1/users/${created.userId}/secret`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${config.pat}`,
      'x-zitadel-orgid': config.orgId,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({})
  });
  if (!secretResponse.ok) {
    const detail = await secretResponse.text().catch(() => '');
    throw new Error(`Zitadel client-secret generation failed (${secretResponse.status}): ${detail.slice(0, 500)}`);
  }
  const secret = (await secretResponse.json()) as { clientId?: string; clientSecret?: string };
  if (!secret.clientId || !secret.clientSecret) {
    throw new Error('Zitadel client-secret generation succeeded but returned no clientId/clientSecret');
  }

  return { zitadelUserId: created.userId, clientId: secret.clientId, clientSecret: secret.clientSecret, issuedVia: 'zitadel' };
}

/**
 * Deactivates the Zitadel machine user backing a revoked/rotated-away API client — this is
 * the step that actually stops its tokens from working. A service's real auth.ts verifies
 * the JWT's signature and expiry against Zitadel directly; it never re-checks our local
 * ApiClient row, so flipping that row's `status` to REVOKED alone would not revoke anything.
 * No-ops (with a logged warning) for a stub-issued credential, which never had a real
 * Zitadel user to deactivate.
 */
export async function deactivateMachineUser(zitadelUserId: string): Promise<void> {
  const config = managementConfig();

  if (!config || zitadelUserId.startsWith('pending_machine_')) {
    console.warn(`[zitadel-management] Skipping Zitadel deactivation for stub-issued machine user ${zitadelUserId} — it was never real.`);
    return;
  }

  const response = await fetch(`${config.url}/management/v1/users/${zitadelUserId}/_deactivate`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${config.pat}`,
      'x-zitadel-orgid': config.orgId,
      'Content-Type': 'application/json'
    }
  });
  if (!response.ok && response.status !== 404) {
    const detail = await response.text().catch(() => '');
    throw new Error(`Zitadel machine-user deactivation failed (${response.status}): ${detail.slice(0, 500)}`);
  }
}

function randomHex(bytes: number): string {
  const arr = new Uint8Array(bytes);
  for (let i = 0; i < bytes; i++) arr[i] = Math.floor(Math.random() * 256);
  return Array.from(arr, (b) => b.toString(16).padStart(2, '0')).join('');
}
