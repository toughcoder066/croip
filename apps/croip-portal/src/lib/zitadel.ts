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

export interface ZitadelLoginResult {
  tokens: {
    access_token: string
    id_token: string
    expires_in: number
    refresh_token?: string
  }
  claims: Awaited<ReturnType<typeof verifyZitadelIdToken>>
  userinfo: { email?: string; name?: string }
}

/**
 * Performs headless authentication against Zitadel using the Authorization Code + PKCE
 * flow without exposing Zitadel's hosted login UI to the browser.
 * Credentials are fully verified by Zitadel; on success, real Zitadel OIDC tokens
 * (with project roles and iDARMS claims) are returned.
 */
export async function loginWithZitadelCredentials(
  email: string,
  password: string,
  origin: string
): Promise<ZitadelLoginResult> {
  const { verifier, challenge } = generatePkce()
  const state = generateState()
  const redirectUri = `${origin}/api/auth/oauth/zitadel/callback`

  const authorizeUrl = new URL(`${ZITADEL_ISSUER}/oauth/v2/authorize`)
  authorizeUrl.searchParams.set('client_id', ZITADEL_CLIENT_ID)
  authorizeUrl.searchParams.set('redirect_uri', redirectUri)
  authorizeUrl.searchParams.set('response_type', 'code')
  authorizeUrl.searchParams.set(
    'scope',
    'openid profile email offline_access ' +
      'urn:zitadel:iam:org:project:id:zitadel:aud ' +
      'urn:zitadel:iam:org:project:id:396579532015927301:roles ' +
      'urn:zitadel:iam:org:project:id:396579532015927301:aud'
  )
  authorizeUrl.searchParams.set('state', state)
  authorizeUrl.searchParams.set('code_challenge', challenge)
  authorizeUrl.searchParams.set('code_challenge_method', 'S256')

  const issuerHost = new URL(ZITADEL_ISSUER).host

  const authRes = await fetch(authorizeUrl.toString(), {
    redirect: 'manual',
    headers: { Host: issuerHost }
  })

  const loc = authRes.headers.get('location')
  if (!loc || !loc.includes('authRequestID=')) {
    throw new Error('Failed to initialize sign-in session with identity provider.')
  }

  const match = loc.match(/authRequestID=([^&]+)/)
  if (!match) {
    throw new Error('Invalid authorization response from identity provider.')
  }
  const authRequestId = match[1]

  const extractCookies = (res: Response): string => {
    if (typeof (res.headers as any).getSetCookie === 'function') {
      return (res.headers as any).getSetCookie().map((c: string) => c.split(';')[0]).join('; ')
    }
    const raw = res.headers.get('set-cookie')
    return raw ? raw.split(';')[0] : ''
  }

  let cookies = extractCookies(authRes)

  // Fetch login form to retrieve CSRF token
  const getLoginRes = await fetch(`${ZITADEL_ISSUER}/ui/login/login?authRequestID=${authRequestId}`, {
    headers: { Host: issuerHost, Cookie: cookies }
  })

  const html = await getLoginRes.text()
  const csrfMatch = html.match(/name="gorilla\.csrf\.Token"\s+value="([^"]+)"/)
  if (!csrfMatch) {
    throw new Error('Could not retrieve identity provider CSRF token.')
  }
  const csrfToken = csrfMatch[1]
  const loginCookies = extractCookies(getLoginRes)
  if (loginCookies) cookies += `; ${loginCookies}`

  // Submit login name
  const postLoginNameRes = await fetch(`${ZITADEL_ISSUER}/ui/login/loginname`, {
    method: 'POST',
    redirect: 'manual',
    headers: {
      Host: issuerHost,
      Cookie: cookies,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      'gorilla.csrf.Token': csrfToken,
      authRequestID: authRequestId,
      loginName: email.trim().toLowerCase()
    })
  })

  const passHtml = await postLoginNameRes.text()
  const passFormMatch = passHtml.match(/<form[^>]+action="([^"]+)"/)
  if (!passFormMatch || !passFormMatch[1].includes('/password')) {
    throw new Error('Invalid email or password. Please check your credentials.')
  }

  const passCsrfMatch = passHtml.match(/name="gorilla\.csrf\.Token"\s+value="([^"]+)"/)
  if (!passCsrfMatch) {
    throw new Error('Could not retrieve identity provider password challenge.')
  }
  const passCsrf = passCsrfMatch[1]
  const passCookies = extractCookies(postLoginNameRes)
  if (passCookies) cookies += `; ${passCookies}`

  // Submit password
  let authFlowRes = await fetch(`${ZITADEL_ISSUER}/ui/login/password`, {
    method: 'POST',
    redirect: 'manual',
    headers: {
      Host: issuerHost,
      Cookie: cookies,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      'gorilla.csrf.Token': passCsrf,
      authRequestID: authRequestId,
      password
    })
  })
  let authFlowCookies = extractCookies(authFlowRes)
  if (authFlowCookies) cookies += `; ${authFlowCookies}`

  // A correct password doesn't always redirect straight to the callback: a user who
  // hasn't set up (or last skipped) a second factor within the org's mfaInitSkipLifetime
  // gets an optional "set up 2FA now?" prompt (200, not 302) first. Every account this
  // platform provisions is password-only by design, so skip it the same way a human
  // clicking through the hosted login UI would — Zitadel then issues the real callback
  // redirect. A genuinely wrong password 200s too, but to the password form again (no
  // mfa/prompt action), so this only ever fires for the correct-password-but-unprompted
  // case.
  if (authFlowRes.status === 200) {
    const promptHtml = await authFlowRes.text()
    const promptFormMatch = promptHtml.match(/<form[^>]+action="([^"]+)"/)
    if (promptFormMatch?.[1]?.includes('/mfa/prompt')) {
      const promptCsrfMatch = promptHtml.match(/name="gorilla\.csrf\.Token"\s+value="([^"]+)"/)
      if (!promptCsrfMatch) {
        throw new Error('Could not retrieve identity provider 2FA prompt token.')
      }
      authFlowRes = await fetch(`${ZITADEL_ISSUER}/ui/login/mfa/prompt`, {
        method: 'POST',
        redirect: 'manual',
        headers: {
          Host: issuerHost,
          Cookie: cookies,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          'gorilla.csrf.Token': promptCsrfMatch[1],
          authRequestID: authRequestId,
          skip: 'true'
        })
      })
      authFlowCookies = extractCookies(authFlowRes)
      if (authFlowCookies) cookies += `; ${authFlowCookies}`
    }
  }

  if (authFlowRes.status !== 302) {
    throw new Error('Invalid email or password. Please check your credentials.')
  }

  const callbackUrl = authFlowRes.headers.get('location')
  if (!callbackUrl) {
    throw new Error('Identity provider did not return authorization callback.')
  }

  // Follow callback to get authorization code
  const cbRes = await fetch(callbackUrl, {
    redirect: 'manual',
    headers: { Host: issuerHost, Cookie: cookies }
  })

  const finalLoc = cbRes.headers.get('location')
  if (!finalLoc) {
    throw new Error('Identity provider authorization failed.')
  }

  const finalUrl = new URL(finalLoc, origin)
  const code = finalUrl.searchParams.get('code')
  const oauthErr = finalUrl.searchParams.get('error')

  if (oauthErr || !code) {
    throw new Error(oauthErr || 'Failed to obtain authorization code.')
  }

  // Exchange code for tokens
  const tokenRes = await fetch(`${ZITADEL_ISSUER}/oauth/v2/token`, {
    method: 'POST',
    headers: {
      Host: issuerHost,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri,
      client_id: ZITADEL_CLIENT_ID,
      code_verifier: verifier
    })
  })

  if (!tokenRes.ok) {
    throw new Error(`Token exchange failed: ${tokenRes.status} ${await tokenRes.text()}`)
  }

  const tokens = await tokenRes.json()

  // Verify ID token
  const claims = await verifyZitadelIdToken(tokens.id_token)

  // Fetch userinfo
  let userinfo: { email?: string; name?: string } = {}
  try {
    const userinfoRes = await fetch(`${ZITADEL_ISSUER}/oidc/v1/userinfo`, {
      headers: { Host: issuerHost, Authorization: `Bearer ${tokens.access_token}` }
    })
    if (userinfoRes.ok) {
      userinfo = await userinfoRes.json()
    }
  } catch (err) {
    console.error('[croip-portal] Zitadel userinfo request failed:', err)
  }

  return { tokens, claims, userinfo }
}
