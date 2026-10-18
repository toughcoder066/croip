import { NextResponse } from 'next/server'

interface RouteProps {
  params: Promise<{ provider: string }>
}

export async function GET(request: Request, { params }: RouteProps) {
  const { provider } = await params
  const url = new URL(request.url)
  const host = request.headers.get('host') || 'localhost:3050'
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http'
  const redirectUri = `${protocol}://${host}/api/auth/oauth/${provider}/callback`

  if (provider === 'google') {
    const clientId = process.env.GOOGLE_CLIENT_ID

    if (!clientId) {
      // If no Google Client ID is configured yet, send to the OAuth portal screen explaining how to enter it
      return NextResponse.redirect(new URL(`/oauth/google?prompt=setup`, request.url))
    }

    const googleAuthUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth')
    googleAuthUrl.searchParams.set('client_id', clientId)
    googleAuthUrl.searchParams.set('redirect_uri', redirectUri)
    googleAuthUrl.searchParams.set('response_type', 'code')
    googleAuthUrl.searchParams.set('scope', 'openid profile email')
    googleAuthUrl.searchParams.set('access_type', 'offline')
    googleAuthUrl.searchParams.set('prompt', 'select_account')

    return NextResponse.redirect(googleAuthUrl.toString())
  }

  if (provider === 'github') {
    const clientId = process.env.GITHUB_CLIENT_ID

    if (!clientId) {
      return NextResponse.redirect(new URL(`/oauth/github?prompt=setup`, request.url))
    }

    const githubAuthUrl = new URL('https://github.com/login/oauth/authorize')
    githubAuthUrl.searchParams.set('client_id', clientId)
    githubAuthUrl.searchParams.set('redirect_uri', redirectUri)
    githubAuthUrl.searchParams.set('scope', 'read:user user:email')

    return NextResponse.redirect(githubAuthUrl.toString())
  }

  if (provider === 'microsoft') {
    const clientId = process.env.MICROSOFT_CLIENT_ID

    if (!clientId) {
      return NextResponse.redirect(new URL(`/oauth/microsoft?prompt=setup`, request.url))
    }

    const msAuthUrl = new URL('https://login.microsoftonline.com/common/oauth2/v2.0/authorize')
    msAuthUrl.searchParams.set('client_id', clientId)
    msAuthUrl.searchParams.set('redirect_uri', redirectUri)
    msAuthUrl.searchParams.set('response_type', 'code')
    msAuthUrl.searchParams.set('scope', 'openid profile email')

    return NextResponse.redirect(msAuthUrl.toString())
  }

  // Fallback
  return NextResponse.redirect(new URL(`/oauth/${provider}`, request.url))
}
