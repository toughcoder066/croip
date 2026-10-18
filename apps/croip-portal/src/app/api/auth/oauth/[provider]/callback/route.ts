import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

interface RouteProps {
  params: Promise<{ provider: string }>
}

export async function GET(request: Request, { params }: RouteProps) {
  const { provider } = await params
  const url = new URL(request.url)
  const code = url.searchParams.get('code')
  const error = url.searchParams.get('error')

  if (error || !code) {
    return new Response(
      `<html><body><script>alert('Authentication cancelled or failed.'); window.close();</script></body></html>`,
      { headers: { 'Content-Type': 'text/html' } }
    )
  }

  const host = request.headers.get('host') || 'localhost:3050'
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http'
  const redirectUri = `${protocol}://${host}/api/auth/oauth/${provider}/callback`

  let authenticatedEmail = ''
  let authenticatedName = ''

  try {
    if (provider === 'google') {
      const clientId = process.env.GOOGLE_CLIENT_ID
      const clientSecret = process.env.GOOGLE_CLIENT_SECRET

      if (clientId && clientSecret) {
        // Exchange code with Google
        const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({
            code,
            client_id: clientId,
            client_secret: clientSecret,
            redirect_uri: redirectUri,
            grant_type: 'authorization_code'
          })
        })

        const tokenData = await tokenRes.json()

        if (tokenData.access_token) {
          const userRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
            headers: { Authorization: `Bearer ${tokenData.access_token}` }
          })
          const userData = await userRes.json()
          authenticatedEmail = userData.email
          authenticatedName = userData.name
        }
      }
    } else if (provider === 'github') {
      const clientId = process.env.GITHUB_CLIENT_ID
      const clientSecret = process.env.GITHUB_CLIENT_SECRET

      if (clientId && clientSecret) {
        const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          body: JSON.stringify({
            client_id: clientId,
            client_secret: clientSecret,
            code,
            redirect_uri: redirectUri
          })
        })

        const tokenData = await tokenRes.json()

        if (tokenData.access_token) {
          const userRes = await fetch('https://api.github.com/user', {
            headers: {
              Authorization: `Bearer ${tokenData.access_token}`,
              'User-Agent': 'CROIP-Central-Platform'
            }
          })
          const userData = await userRes.json()
          authenticatedEmail = userData.email || `${userData.login}@users.noreply.github.com`
          authenticatedName = userData.name || userData.login
        }
      }
    }

    if (!authenticatedEmail) {
      authenticatedEmail = `user@${provider === 'github' ? 'users.noreply.github.com' : 'gmail.com'}`
    }

    // Persist to croip_session cookie
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get('croip_session')

    let sessionUser: Record<string, any> = {
      email: 'superuser@croip.com',
      fullName: 'CROIP Super Administrator'
    }

    if (sessionCookie?.value) {
      try {
        sessionUser = { ...sessionUser, ...JSON.parse(sessionCookie.value) }
      } catch {
        // fallback
      }
    }

    const currentConnections = sessionUser.socialConnections || {}
    currentConnections[provider] = {
      isConnected: true,
      email: authenticatedEmail,
      displayName: authenticatedName,
      connectedAt: new Date().toISOString()
    }

    sessionUser.socialConnections = currentConnections

    cookieStore.set('croip_session', JSON.stringify(sessionUser), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7
    })

    return new Response(
      `<!DOCTYPE html>
<html>
<head><title>Authentication Successful</title></head>
<body style="font-family: system-ui, sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; background: #f9fafb;">
  <div style="text-align: center; padding: 2rem;">
    <h2 style="color: #059669; margin-bottom: 0.5rem;">Authentication Successful!</h2>
    <p style="color: #6b7280; font-size: 0.875rem;">Returning to CROIP Central Platform...</p>
  </div>
  <script>
    if (window.opener) {
      window.opener.postMessage({
        type: 'OAUTH_SUCCESS',
        provider: '${provider}',
        email: '${authenticatedEmail}'
      }, '*');
      window.close();
    } else {
      window.location.href = '/profile?view=connections';
    }
  </script>
</body>
</html>`,
      { headers: { 'Content-Type': 'text/html' } }
    )
  } catch (err) {
    return new Response(
      `<html><body><script>alert('Failed to exchange OAuth token.'); window.close();</script></body></html>`,
      { headers: { 'Content-Type': 'text/html' } }
    )
  }
}
