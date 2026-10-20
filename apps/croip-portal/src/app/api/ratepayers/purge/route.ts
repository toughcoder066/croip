import { NextResponse } from 'next/server'
import { croipApi } from '@/lib/croip-api'

export const dynamic = 'force-dynamic'

/**
 * Admin Purge Ratepayers API.
 * Calls ratepayer-service (:3030) POST /v1/ratepayers/purge.
 * Also cleans dependent bills and disputes.
 * Never touches shared_services regions or municipal assemblies.
 */
export async function POST() {
  try {
    const [ratepayerRes, billRes, disputeRes] = await Promise.allSettled([
      croipApi.ratepayers.purgeRatepayers(),
      croipApi.billing.purgeBills().catch(e => {
        console.warn('Bill purge notice:', e.message)
        return null
      }),
      croipApi.disputes.purgeDisputes().catch(e => {
        console.warn('Dispute purge notice:', e.message)
        return null
      })
    ])

    if (ratepayerRes.status === 'rejected') {
      console.error('Failed to purge ratepayers:', ratepayerRes.reason)
      return NextResponse.json(
        { success: false, error: ratepayerRes.reason?.message || 'Failed to purge ratepayer directory data' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'All ratepayer profiles, verifications, OTPs, and property claims purged successfully.',
      data: {
        ratepayers: ratepayerRes.value,
        bills: billRes.status === 'fulfilled' ? billRes.value : null,
        disputes: disputeRes.status === 'fulfilled' ? disputeRes.value : null
      }
    })
  } catch (error: any) {
    console.error('Failed to purge ratepayers:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to purge ratepayers' },
      { status: 500 }
    )
  }
}
