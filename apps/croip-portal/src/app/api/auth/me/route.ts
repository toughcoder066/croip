import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { croipApi } from '@/lib/croip-api'

const DEFAULT_SUPERADMIN = {
  id: '0b18250a-a9fc-44c0-b26b-bf63b08ec310',
  code: 'USR-SUPERADMIN',
  email: 'superuser@croip.com',
  fullName: 'CROIP Super Administrator',
  phone: '+233 20 000 0000',
  role: 'SUPER_ADMIN',
  roleName: 'Super Administrator',
  department: 'Executive Oversight & Platform Governance',
  permissions: ['*'],
  status: 'ACTIVE',
  country: 'Ghana',
  languages: 'English, Twi',
  createdAt: '2026-10-10T00:00:00.000Z'
}

export async function GET() {
  try {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get('croip_session')

    if (sessionCookie?.value) {
      try {
        const user = JSON.parse(sessionCookie.value)
        return NextResponse.json({
          authenticated: true,
          user: {
            ...DEFAULT_SUPERADMIN,
            ...user
          }
        })
      } catch {
        // continue to fallback
      }
    }

    // Try fetching active officer from platform-governance-service
    try {
      const users = await croipApi.governance.getUsers()
      const admin = users.find(u => u.code === 'USR-SUPERADMIN' || u.email === 'superuser@croip.com') || users[0]
      if (admin) {
        return NextResponse.json({
          authenticated: false,
          user: {
            ...DEFAULT_SUPERADMIN,
            id: admin.id,
            code: admin.code,
            email: admin.email,
            fullName: admin.fullName,
            phone: (admin as any).phone ? `+${(admin as any).phone}` : DEFAULT_SUPERADMIN.phone,
            status: admin.status || DEFAULT_SUPERADMIN.status,
            createdAt: (admin as any).createdAt || DEFAULT_SUPERADMIN.createdAt
          }
        })
      }
    } catch {
      // ignore
    }

    return NextResponse.json({
      authenticated: false,
      user: DEFAULT_SUPERADMIN
    })
  } catch {
    return NextResponse.json({
      authenticated: false,
      user: DEFAULT_SUPERADMIN
    })
  }
}

