import { createHash, randomBytes } from 'node:crypto'

import { createRemoteJWKSet, jwtVerify } from 'jose'

// Self-hosted Zitadel instance (see the `zitadel` service in docker-compose.yml) — the
// real identity provider behind portal login and Profile > Connections. Google/Microsoft/
// GitHub federation is configured on the Zitadel side (its own console), not here.
export const ZITADEL_ISSUER = process.env.ZITADEL_ISSUER || 'http://localhost:8080'
export const ZITADEL_CLIENT_ID = process.env.ZITADEL_CLIENT_ID || ''

const jwks = createRemoteJWKSet(new URL(`${ZITADEL_ISSUER}/oauth/v2/keys`))

function base64url(input: Buffer): string {
  return input.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

/** PKCE code_verifier + S256 code_challenge for the Authorization Code flow. */
export function generatePkce(): { verifier: string; challenge: string } {
  const verifier = base64url(randomBytes(32))
  const challenge = base64url(createHash('sha256').update(verifier).digest())

  return { verifier, challenge }
}

export function generateState(): string {
  return base64url(randomBytes(16))
}

/** Verifies a Zitadel-issued ID token's signature, issuer, and audience. */
export async function verifyZitadelIdToken(idToken: string) {
  const { payload } = await jwtVerify(idToken, jwks, {
    issuer: ZITADEL_ISSUER,
    audience: ZITADEL_CLIENT_ID
  })

  return payload
}
