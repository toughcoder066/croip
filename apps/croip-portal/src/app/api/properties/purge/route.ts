import { NextResponse } from 'next/server'
import { croipApi } from '@/lib/croip-api'

export const dynamic = 'force-dynamic'

/**
 * Admin Purge Properties API.
 * Calls property-registry-service (:3020) POST /v1/properties/purge.
 * Also cleans dependent bills and disputes.
 * Protected by Central Platform internal routing and authentication.
 */
export async function POST() {
  try {
    const [propertyRes, billRes, disputeRes] = await Promise.allSettled([
      croipApi.propertyRegistry.purgeProperties(),
      croipApi.billing.purgeBills().catch(e => {
        console.warn('Bill purge notice:', e.message)
        return null
      }),
      croipApi.disputes.purgeDisputes().catch(e => {
        console.warn('Dispute purge notice:', e.message)
        return null
      })
    ])

    if (propertyRes.status === 'rejected') {
      console.error('Failed to purge properties:', propertyRes.reason)
      return NextResponse.json(
        { success: false, error: propertyRes.reason?.message || 'Failed to purge property registry data' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'All properties, units, valuations, and verification records purged successfully.',
      data: {
        properties: propertyRes.value,
        bills: billRes.status === 'fulfilled' ? billRes.value : null,
        disputes: disputeRes.status === 'fulfilled' ? disputeRes.value : null
      }
    })
  } catch (error: any) {
    console.error('Failed to purge properties:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to purge properties' },
      { status: 500 }
    )
  }
}
