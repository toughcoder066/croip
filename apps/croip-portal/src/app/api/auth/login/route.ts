import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { croipApi } from '@/lib/croip-api'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    const normalizedEmail = String(email).trim().toLowerCase()

    // 1. Ingest CROIP platform-governance-service (:3010) to verify user profile exists in database
    let platformUsers: Array<{ id: string; code: string; email: string; fullName: string; status: string }> = []
    try {
      platformUsers = await croipApi.governance.getUsers()
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err)
      console.error('[croip-portal] Failed to query platform-governance-service:', msg)
      return NextResponse.json(
        { error: `CROIP Platform Governance service unreachable: ${msg}` },
        { status: 503 }
      )
    }

    const platformUser = platformUsers.find(
      u => u.email.toLowerCase() === normalizedEmail && u.status === 'ACTIVE'
    )

    if (!platformUser) {
      return NextResponse.json(
        { error: 'No active user found in CROIP Platform Governance for this email address.' },
        { status: 401 }
      )
    }

    // 2. Verify credentials
    if (normalizedEmail === 'superuser@croip.com' && password === 'Password@1') {
      const user = {
        id: platformUser.id,
        code: platformUser.code,
        email: platformUser.email,
        fullName: platformUser.fullName,
        role: 'SUPER_ADMIN',
        roleName: 'Super Administrator',
        department: 'Executive Oversight & Platform Governance',
        permissions: ['*'],
        status: platformUser.status
      }

      const cookieStore = await cookies()
      cookieStore.set('croip_session', JSON.stringify(user), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7 // 7 days
      })

      return NextResponse.json({
        success: true,
        user,
        message: 'Welcome back, Super Administrator'
      })
    }

    return NextResponse.json(
      { error: 'Invalid password. Please check your credentials.' },
      { status: 401 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: 'An unexpected error occurred during authentication' },
      { status: 500 }
    )
  }
}
