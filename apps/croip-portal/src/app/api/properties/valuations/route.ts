import { NextResponse } from 'next/server'
import { croipApi } from '@/lib/croip-api'

export const dynamic = 'force-dynamic'

/**
 * Valuation Rolls proxy.
 *
 * property-registry-service does not expose a dedicated "list all valuations" endpoint -
 * PropertyValuation rows only come back nested under a single property's detail payload
 * (GET /v1/properties/:id -> { valuations: [...isCurrent] }). This route composes the roll
 * the same way /api/dashboard/metrics already aggregates rateable values: fetch every
 * property, then fetch each property's detail in parallel and flatten its (real, live)
 * valuations into one list. No fabricated figures - a property with no PropertyValuation
 * row simply contributes nothing to the roll.
 */
export async function GET() {
  try {
    const properties = await croipApi.propertyRegistry.getProperties()

    const details = await Promise.all(
      properties.map(async (p: any) => {
        try {
          return await croipApi.propertyRegistry.getProperty(p.id)
        } catch (err) {
          console.warn(`[properties/valuations] property ${p.code} unavailable:`, err instanceof Error ? err.message : err)
          return null
        }
      })
    )

    const rows = properties.flatMap((p: any, i: number) => {
      const detail = details[i]
      const valuations = Array.isArray(detail?.valuations) ? detail.valuations : []

      return valuations.map((v: any) => ({
        id: v.id,
        propertyId: p.id,
        propertyCode: p.code,
        propertyName: p.propertyName ?? null,
        valuationListId: v.valuationListId,
        lvdReference: v.lvdReference,
        rateableValue: v.rateableValue,
        isCurrent: v.isCurrent,
        effectiveDate: v.effectiveDate,
        createdAt: v.createdAt
      }))
    })

    return NextResponse.json({ success: true, data: rows })
  } catch (error) {
    console.error('Failed to build valuation roll from Property Registry service:', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch valuation rolls' }, { status: 500 })
  }
}
