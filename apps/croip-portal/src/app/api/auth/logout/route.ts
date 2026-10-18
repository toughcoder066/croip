import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

import { ZITADEL_CLIENT_ID, ZITADEL_ISSUER } from '@/lib/zitadel'

export async function POST(request: Request) {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get('croip_session')

  let idToken: string | undefined

  if (sessionCookie?.value) {
    try {
      idToken = JSON.parse(sessionCookie.value).zitadelIdToken
    } catch {
      // ignore
    }
  }

  cookieStore.delete('croip_session')

  // Also end the Zitadel-side browser session (RP-initiated logout) — otherwise "Sign
  // in with CROIP ID" would silently re-authenticate without a login prompt, since
  // Zitadel's own cookie would still be active.
  const url = new URL(request.url)
  const postLogoutRedirectUri = `${url.protocol}//${url.host}/login`
  const endSessionUrl = new URL(`${ZITADEL_ISSUER}/oidc/v1/end_session`)

  endSessionUrl.searchParams.set('client_id', ZITADEL_CLIENT_ID)
  endSessionUrl.searchParams.set('post_logout_redirect_uri', postLogoutRedirectUri)

  if (idToken) {
    endSessionUrl.searchParams.set('id_token_hint', idToken)
  }

  return NextResponse.json({
    success: true,
    message: 'Logged out successfully',
    redirectUrl: endSessionUrl.toString()
  })
}
