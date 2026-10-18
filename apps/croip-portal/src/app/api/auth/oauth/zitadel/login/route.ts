import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

import { generatePkce, generateState, ZITADEL_CLIENT_ID, ZITADEL_ISSUER } from '@/lib/zitadel'

export const dynamic = 'force-dynamic'

/**
 * Starts the real Authorization Code + PKCE login flow against the self-hosted Zitadel
 * instance. Replaces the old hardcoded superuser@croip.com/password check.
 */
export async function GET(request: Request) {
  const { verifier, challenge } = generatePkce()
  const state = generateState()

  const url = new URL(request.url)
  const redirectUri = `${url.protocol}//${url.host}/api/auth/oauth/zitadel/callback`

  const authorizeUrl = new URL(`${ZITADEL_ISSUER}/oauth/v2/authorize`)

  authorizeUrl.searchParams.set('client_id', ZITADEL_CLIENT_ID)
  authorizeUrl.searchParams.set('redirect_uri', redirectUri)
  authorizeUrl.searchParams.set('response_type', 'code')

  // `urn:zitadel:iam:org:project:id:zitadel:aud` adds Zitadel's own project to the
  // issued access token's audience — without it, Zitadel's own Auth API (used by the
  // Connections tab to read real linked-IDP status) rejects the token with 401
  // Errors.Token.Invalid, even though it's perfectly valid for calling our own backend.
  authorizeUrl.searchParams.set('scope', 'openid profile email urn:zitadel:iam:org:project:id:zitadel:aud')
  authorizeUrl.searchParams.set('state', state)
  authorizeUrl.searchParams.set('code_challenge', challenge)
  authorizeUrl.searchParams.set('code_challenge_method', 'S256')

  const cookieStore = await cookies()

  // Short-lived, cleared by the callback — only needs to survive the redirect round trip.
  cookieStore.set('zitadel_pkce', JSON.stringify({ verifier, state }), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 600
  })

  return NextResponse.redirect(authorizeUrl.toString())
}
