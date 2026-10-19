import { NextResponse } from 'next/server'
import { croipApi } from '@/lib/croip-api'

export const dynamic = 'force-dynamic'

/**
 * Payment ledger proxy. Thin pass-through to billing-payments-service (:3007)
 * GET /v1/payments - paginated, searchable payment list for the CROIP portal's oversight screens.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  try {
    const data = await croipApi.billing.getPaymentsDirectory({
      search: searchParams.get('search') || undefined,
      status: searchParams.get('status') || undefined,
      paidByRatepayerId: searchParams.get('paidByRatepayerId') || undefined,
      page: searchParams.get('page') ? Number(searchParams.get('page')) : undefined,
      pageSize: searchParams.get('pageSize') ? Number(searchParams.get('pageSize')) : undefined
    })
    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Failed to fetch payment ledger from Billing & Payments service:', error)
    const message = error instanceof Error ? error.message : 'Failed to fetch payment ledger'
    return NextResponse.json({ success: false, error: message }, { status: 500 })
  }
}
