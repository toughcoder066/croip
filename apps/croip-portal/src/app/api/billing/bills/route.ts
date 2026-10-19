import { NextResponse } from 'next/server'
import { croipApi } from '@/lib/croip-api'

export const dynamic = 'force-dynamic'

/**
 * Bill directory proxy. Thin pass-through to billing-payments-service (:3007)
 * GET /v1/bills - paginated, searchable bill list for the CROIP portal's oversight screens.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  try {
    const data = await croipApi.billing.getDirectory({
      search: searchParams.get('search') || undefined,
      paymentStatus: searchParams.get('paymentStatus') || undefined,
      ratepayerId: searchParams.get('ratepayerId') || undefined,
      propertyId: searchParams.get('propertyId') || undefined,
      page: searchParams.get('page') ? Number(searchParams.get('page')) : undefined,
      pageSize: searchParams.get('pageSize') ? Number(searchParams.get('pageSize')) : undefined
    })
    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Failed to fetch bill directory from Billing & Payments service:', error)
    const message = error instanceof Error ? error.message : 'Failed to fetch bill directory'
    return NextResponse.json({ success: false, error: message }, { status: 500 })
  }
}
