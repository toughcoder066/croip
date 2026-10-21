import { NextResponse } from 'next/server'
import { croipApi } from '@/lib/croip-api'

export const dynamic = 'force-dynamic'

/**
 * Admin Purge Concessions API.
 * Calls platform-governance-service (:3010) POST /v1/concessions/purge.
 * Strictly preserves the superuser account and SUPER_ADMIN roles.
 * Never touches shared_services regions or municipal assemblies.
 */
export async function POST() {
  try {
    const result = await croipApi.governance.purgeConcessions()

    return NextResponse.json({
      success: true,
      message: 'All concessions, partner personnel, and API clients purged successfully. Superuser accounts preserved.',
      data: result
    })
  } catch (error: any) {
    console.error('Failed to purge concessions:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to purge concession data' },
      { status: 500 }
    )
  }
}
