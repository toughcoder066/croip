import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

import { croipApi } from '@/lib/croip-api'
import { createTokenSession } from '@/lib/token-store'
import { loginWithZitadelCredentials } from '@/lib/zitadel'

export const dynamic = 'force-dynamic'

/**
 * Handles portal login via Zitadel's headless authentication flow.
 * Direct credentials entered in the custom login form are verified live by Zitadel.
 * Upon successful authentication, genuine Zitadel tokens (including project roles and
 * iDARMS context claims) are minted and stored, establishing the secure session cookie.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and password are required' },
        { status: 400 }
      )
    }

    const origin = new URL(request.url).origin
    const { tokens, claims, userinfo } = await loginWithZitadelCredentials(
      email,
      password,
      origin
    )

    const normalizedEmail = String(userinfo.email || claims.email || email).toLowerCase()
    const name = String(userinfo.name || claims.name || normalizedEmail || 'CROIP Officer')

    let governanceUser: Awaited<ReturnType<typeof croipApi.governance.getUsers>>[number] | null = null

    try {
      const users = await croipApi.governance.getUsers({ accessToken: tokens.access_token })
      governanceUser = users.find(u => u.email?.toLowerCase() === normalizedEmail) || null
    } catch (err) {
      console.warn('[croip-portal] Could not look up Platform Governance profile for', normalizedEmail, err)
    }

    const role = governanceUser?.roles?.[0]?.code || 'UNASSIGNED'
    const roleName = governanceUser?.roles?.[0]?.name || 'Unassigned'

    const tokenSessionId = createTokenSession(
      tokens.access_token,
      tokens.id_token,
      tokens.expires_in,
      tokens.refresh_token ?? null
    )

    const sessionUser = {
      id: governanceUser?.id || String(claims.sub),
      code: governanceUser?.code || null,
      email: governanceUser?.email || normalizedEmail,
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

    const response = NextResponse.json({
      success: true,
      user: {
        id: sessionUser.id,
        email: sessionUser.email,
        fullName: sessionUser.fullName,
        role: sessionUser.role,
        roleName: sessionUser.roleName
      },
      redirectUrl: '/dashboard'
    })

    // Also set on response for immediate header sync
    response.cookies.set('croip_session', JSON.stringify(sessionUser), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    })

    return response
  } catch (error: any) {
    const errorMsg = error?.message || 'Authentication failed'
    return NextResponse.json({ success: false, error: errorMsg }, { status: 401 })
  }
}
