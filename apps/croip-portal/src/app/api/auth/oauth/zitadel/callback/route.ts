import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

import { croipApi } from '@/lib/croip-api'
import { createTokenSession } from '@/lib/token-store'
import { verifyZitadelIdToken, ZITADEL_CLIENT_ID, ZITADEL_ISSUER } from '@/lib/zitadel'

export const dynamic = 'force-dynamic'

interface TokenResponse {
  access_token: string
  id_token: string
  expires_in: number
  refresh_token?: string
}

function loginError(request: Request, code: string) {
  return NextResponse.redirect(new URL(`/login?error=${encodeURIComponent(code)}`, request.url))
}

/**
 * Completes the Authorization Code + PKCE flow: exchanges the code, verifies the ID
 * token, cross-references Platform Governance for the officer's CROIP-specific profile
 * (employee code, role, department — Zitadel proves identity, governance still owns
 * authorization/profile data, the same split the 11 microservices already use), and
 * starts a real session.
 */
export async function GET(request: Request) {
  const url = new URL(request.url)
  const code = url.searchParams.get('code')
  const state = url.searchParams.get('state')
  const oauthError = url.searchParams.get('error')

  const cookieStore = await cookies()
  const pkceCookie = cookieStore.get('zitadel_pkce')

  cookieStore.delete('zitadel_pkce')

  if (oauthError) {
    return loginError(request, oauthError)
  }

  if (!code || !state || !pkceCookie?.value) {
    return loginError(request, 'invalid_request')
  }

  let pkce: { verifier: string; state: string }

  try {
    pkce = JSON.parse(pkceCookie.value)
  } catch {
    return loginError(request, 'invalid_request')
  }

  if (pkce.state !== state) {
    return loginError(request, 'state_mismatch')
  }

  const redirectUri = `${url.protocol}//${url.host}/api/auth/oauth/zitadel/callback`

  let tokens: TokenResponse

  try {
    const tokenRes = await fetch(`${ZITADEL_ISSUER}/oauth/v2/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri,
        client_id: ZITADEL_CLIENT_ID,
        code_verifier: pkce.verifier
      })
    })

    if (!tokenRes.ok) {
      console.error('[croip-portal] Zitadel token exchange failed:', await tokenRes.text())

      return loginError(request, 'token_exchange_failed')
    }

    tokens = await tokenRes.json()
  } catch (err) {
    console.error('[croip-portal] Zitadel token exchange request failed:', err)

    return loginError(request, 'token_exchange_failed')
  }

  let claims: Awaited<ReturnType<typeof verifyZitadelIdToken>>

  try {
    claims = await verifyZitadelIdToken(tokens.id_token)
  } catch (err) {
    console.error('[croip-portal] Zitadel ID token verification failed:', err)

    return loginError(request, 'invalid_id_token')
  }

  // The ID token only carries `sub` by default — Zitadel (like most OIDC providers)
  // delivers `profile`/`email` scope claims via the userinfo endpoint, not inlined into
  // the token itself, unless explicitly requested via the `claims` request parameter.
  let userinfo: { email?: string; name?: string } = {}

  try {
    const userinfoRes = await fetch(`${ZITADEL_ISSUER}/oidc/v1/userinfo`, {
      headers: { Authorization: `Bearer ${tokens.access_token}` }
    })

    if (userinfoRes.ok) {
      userinfo = await userinfoRes.json()
    } else {
      console.error('[croip-portal] Zitadel userinfo request failed:', userinfoRes.status, await userinfoRes.text())
    }
  } catch (err) {
    console.error('[croip-portal] Zitadel userinfo request failed:', err)
  }

  const email = String(userinfo.email || claims.email || '').toLowerCase()
  const name = String(userinfo.name || claims.name || email || 'CROIP Officer')

  let governanceUser: Awaited<ReturnType<typeof croipApi.governance.getUsers>>[number] | null = null

  try {
    // No `croip_session` cookie exists yet at this point in the flow — pass the
    // freshly-minted token explicitly instead of relying on the cookie lookup.
    const users = await croipApi.governance.getUsers({ accessToken: tokens.access_token })

    governanceUser = users.find(u => u.email?.toLowerCase() === email) || null
  } catch (err) {
    console.warn('[croip-portal] Could not look up Platform Governance profile for', email, err)
  }

  const role = governanceUser?.roles?.[0]?.code || 'UNASSIGNED'
  const roleName = governanceUser?.roles?.[0]?.name || 'Unassigned'

  // The access token alone can run 6-7KB once it carries the full project-role claim
  // set — far past the ~4KB a single cookie can hold. Keep the tokens server-side,
  // referenced from the cookie by a short session ID, rather than embedding them.
  const tokenSessionId = createTokenSession(tokens.access_token, tokens.id_token, tokens.expires_in)

  const sessionUser = {
    id: governanceUser?.id || String(claims.sub),
    code: governanceUser?.code || null,
    email: governanceUser?.email || email,
    fullName: governanceUser?.fullName || name,
    role,
    roleName,
    permissions: role === 'SUPER_ADMIN' ? ['*'] : [],
    phone: governanceUser?.phone,
    status: governanceUser?.status || 'ACTIVE',
    createdAt: governanceUser?.createdAt,
    loginAt: new Date().toISOString(),
    zitadelSub: claims.sub,
    tokenSessionId
  }

  const response = NextResponse.redirect(new URL('/dashboard', request.url))

  response.cookies.set('croip_session', JSON.stringify(sessionUser), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7 // 7 days
  })

  return response
}
