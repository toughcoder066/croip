import { NextResponse } from 'next/server'
import { croipApi } from '@/lib/croip-api'

export const dynamic = 'force-dynamic'

interface RouteProps {
  params: Promise<{ billNumber: string }>
}

export async function GET(_request: Request, { params }: RouteProps) {
  try {
    const { billNumber } = await params
    const bill = await croipApi.billing.getBill(billNumber)
    return NextResponse.json({ success: true, data: bill })
  } catch (error) {
    console.error('Failed to fetch bill from Billing & Payments service:', error)
    const message = error instanceof Error ? error.message : 'Failed to fetch bill'
    const notFound = /404|not found/i.test(message)
    return NextResponse.json({ success: false, error: message }, { status: notFound ? 404 : 500 })
  }
}
