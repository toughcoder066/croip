import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET() {
  try {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get('croip_session')

    if (!sessionCookie?.value) {
      return NextResponse.json({
        user: {
          fullName: 'CROIP Super Administrator',
          email: 'superuser@croip.com',
          phone: '+233 20 000 0000',
          role: 'SUPER_ADMIN',
          roleName: 'Super Administrator',
          department: 'Executive Oversight & Platform Governance',
          country: 'Ghana',
          status: 'ACTIVE'
        }
      })
    }

    const user = JSON.parse(sessionCookie.value)
    return NextResponse.json({ user })
  } catch {
    return NextResponse.json({ error: 'Failed to fetch user profile' }, { status: 500 })
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json()
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get('croip_session')

    let currentUser = {
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
      imageUrl: '/images/avatars/avatar-1.webp'
    }

    if (sessionCookie?.value) {
      try {
        const parsed = JSON.parse(sessionCookie.value)
        currentUser = { ...currentUser, ...parsed }
      } catch {
        // fallback
      }
    }

    const isSuperAdmin =
      currentUser.role === 'SUPER_ADMIN' ||
      currentUser.code === 'USR-SUPERADMIN' ||
      currentUser.email === 'superuser@croip.com'

    // Extract allowed fields
    const { firstName, lastName, fullName, phone, country, imageUrl } = body

    let resolvedFullName = currentUser.fullName
    if (fullName) {
      resolvedFullName = String(fullName).trim()
    } else if (firstName !== undefined || lastName !== undefined) {
      const f = firstName !== undefined ? String(firstName).trim() : currentUser.fullName.split(' ')[0]
      const l = lastName !== undefined ? String(lastName).trim() : currentUser.fullName.split(' ').slice(1).join(' ')
      resolvedFullName = `${f} ${l}`.trim()
    }

    // Protect superadmin from role & email modifications
    let resolvedEmail = currentUser.email
    let resolvedRole = currentUser.role
    let resolvedRoleName = currentUser.roleName

    if (!isSuperAdmin) {
      if (body.email) resolvedEmail = String(body.email).trim().toLowerCase()
      if (body.role) {
        resolvedRole = body.role
        resolvedRoleName = body.roleName || body.role
      }
    }

    const updatedUser = {
      ...currentUser,
      fullName: resolvedFullName || currentUser.fullName,
      phone: phone !== undefined ? String(phone).trim() : currentUser.phone,
      country: country !== undefined ? String(country).trim() : currentUser.country,
      imageUrl: imageUrl !== undefined ? imageUrl : currentUser.imageUrl,
      email: resolvedEmail,
      role: resolvedRole,
      roleName: resolvedRoleName
    }

    // Persist updated session
    cookieStore.set('croip_session', JSON.stringify(updatedUser), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    })

    return NextResponse.json({
      success: true,
      message: 'User profile updated successfully',
      user: updatedUser
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'An error occurred while updating the profile' },
      { status: 500 }
    )
  }
}

export async function DELETE() {
  try {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get('croip_session')

    let currentUser = {
      role: 'SUPER_ADMIN',
      code: 'USR-SUPERADMIN',
      email: 'superuser@croip.com'
    }

    if (sessionCookie?.value) {
      try {
        currentUser = { ...currentUser, ...JSON.parse(sessionCookie.value) }
      } catch {
        // fallback
      }
    }

    const isSuperAdmin =
      currentUser.role === 'SUPER_ADMIN' ||
      currentUser.code === 'USR-SUPERADMIN' ||
      currentUser.email === 'superuser@croip.com'

    if (isSuperAdmin) {
      return NextResponse.json(
        {
          error: 'Action Forbidden: Super Administrator account is root protected and cannot be deleted.'
        },
        { status: 403 }
      )
    }

    // Delete session for non-superadmin
    cookieStore.delete('croip_session')
    return NextResponse.json({ success: true, message: 'Account successfully removed' })
  } catch {
    return NextResponse.json({ error: 'Failed to process account deletion' }, { status: 500 })
  }
}
