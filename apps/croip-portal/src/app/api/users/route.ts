import { NextResponse } from 'next/server'
import { croipApi } from '@/lib/croip-api'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const users = await croipApi.governance.getUsers()
    return NextResponse.json({ success: true, data: users })
  } catch (error: any) {
    console.error('Failed to fetch users from platform governance:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch users from platform governance service' },
      { status: 500 }
    )
  }
}

// CROIP admins never set a password for a new oversight official — they only supply profile
// details here. platform-governance-service creates the real Zitadel account and sends the
// invite/password-set email itself (see services/platform-governance-service/src/lib/zitadel-management.ts);
// this route must NOT fabricate a zitadelId or accept one from the client.
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { code, fullName, email, phone, countryId, roleCode } = body

    if (!code || !fullName || !email) {
      return NextResponse.json(
        { success: false, error: 'Code, Full Name, and Email are required' },
        { status: 400 }
      )
    }

    const payload = {
      code: code.trim().toUpperCase().replace(/\s+/g, '_'),
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone ? phone.trim() : undefined,
      countryId: countryId || undefined,
      roleCode: roleCode || undefined
    }

    const createdUser = await croipApi.governance.createUser(payload)
    return NextResponse.json({ success: true, data: createdUser }, { status: 201 })
  } catch (error: any) {
    console.error('Failed to create user in platform governance:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to invite officer via platform governance service' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ success: false, error: 'User ID is required' }, { status: 400 })
    }

    await croipApi.governance.deleteUser(id)
    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Failed to delete user:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to delete user' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json()
    const { id, status, fullName, phone, roleCode } = body

    if (!id) {
      return NextResponse.json({ success: false, error: 'User ID is required' }, { status: 400 })
    }

    const updated = await croipApi.governance.updateUser(id, {
      status,
      fullName,
      phone,
      roleCode
    })

    return NextResponse.json({ success: true, data: updated })
  } catch (error: any) {
    console.error('Failed to update user:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update user' },
      { status: 500 }
    )
  }
}
