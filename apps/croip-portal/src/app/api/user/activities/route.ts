import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { croipApi } from '@/lib/croip-api'
import type { UserActivityItem } from '@/types/pages/user-profile-types'

function formatRelativeTime(dateString: string): string {
  try {
    const then = new Date(dateString).getTime()
    const now = Date.now()
    const diffSeconds = Math.max(0, Math.floor((now - then) / 1000))

    if (diffSeconds < 60) return 'Just now'
    const diffMinutes = Math.floor(diffSeconds / 60)
    if (diffMinutes < 60) return `${diffMinutes} min ago`
    const diffHours = Math.floor(diffMinutes / 60)
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`
    const diffDays = Math.floor(diffHours / 24)
    if (diffDays === 1) return 'Yesterday'
    return `${diffDays} days ago`
  } catch {
    return 'Recent'
  }
}

export async function GET() {
  try {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get('croip_session')

    let user = {
      id: '0b18250a-a9fc-44c0-b26b-bf63b08ec310',
      code: 'USR-SUPERADMIN',
      email: 'superuser@croip.com',
      fullName: 'CROIP Super Administrator',
      role: 'SUPER_ADMIN',
      roleName: 'Super Administrator'
    }

    if (sessionCookie?.value) {
      try {
        const parsed = JSON.parse(sessionCookie.value)
        user = { ...user, ...parsed }
      } catch {
        // use default user
      }
    }

    // 1. Fetch live audit records from CROIP Audit & Assurance Service (:3006)
    let liveRecords: any[] = []
    try {
      liveRecords = await croipApi.audit.getLogs()
    } catch (err) {
      console.warn('[croip-portal] Could not fetch records from audit-assurance-service:', err)
    }

    // 2. Filter records where this user was the actor
    const userRecords = Array.isArray(liveRecords)
      ? liveRecords.filter(
          r =>
            r.actorId === user.id ||
            r.actorId === user.code ||
            r.actorId === user.email ||
            r.actorId === 'local-developer' ||
            r.actorId === 'superuser@croip.com'
        )
      : []

    // 3. Map live records into Timeline items
    const mappedActivities: UserActivityItem[] = userRecords.map(r => {
      const actionName = (r.action || 'PLATFORM_ACTION').replaceAll('_', ' ').toLowerCase()
      const resource = r.resourceType ? ` on ${r.resourceType.toLowerCase()}` : ''

      return {
        id: r.id || `live-${Math.random()}`,
        description: `${user.fullName} performed ${actionName}${resource}`,
        timestamp: formatRelativeTime(r.occurredAt || new Date().toISOString()),
        detail: r.recordHash
          ? `Cryptographic signature: ${r.recordHash.slice(0, 16)}... (Outcome: ${r.outcome || 'SUCCESS'})`
          : `Outcome: ${r.outcome || 'SUCCESS'}`,
        attachment: {
          name: `audit_record_${(r.id || 'entry').slice(0, 8)}.pdf`,
          fileType: 'pdf'
        }
      }
    })

    // 4. Genuine account lifecycle events for this user. Both timestamps come from the
    // session cookie set at login time (real loginAt / the officer's real createdAt from
    // Platform Governance) — never fabricated, so they're omitted entirely if the cookie
    // doesn't carry them (e.g. no session yet) rather than showing a fake date.
    const accountEvents: UserActivityItem[] = []
    const loginAt = (user as any).loginAt as string | undefined
    const createdAt = (user as any).createdAt as string | undefined

    if (loginAt) {
      accountEvents.push({
        id: `login-${user.id || 'curr'}`,
        description: `${user.fullName} signed in to Central Platform`,
        timestamp: formatRelativeTime(loginAt),
        detail: `Session authenticated with officer credentials for code ${user.code}.`
      })
    }

    if (createdAt) {
      accountEvents.push({
        id: `created-${user.id || 'init'}`,
        description: 'Account provisioned in Platform Governance',
        timestamp: formatRelativeTime(createdAt),
        detail: `Officer ${user.code} registered with Super Administrator privileges.`
      })
    }

    // Only combine real audit records with genuine account events, limited to the most recent 4
    const combined = [...mappedActivities, ...accountEvents]
    const limitedActivities = combined.slice(0, 4)

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        code: user.code,
        fullName: user.fullName
      },
      activities: limitedActivities
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to retrieve user activities' },
      { status: 500 }
    )
  }
}
