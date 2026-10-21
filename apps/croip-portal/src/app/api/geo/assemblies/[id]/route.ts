import { NextResponse } from 'next/server'

import { croipApi } from '@/lib/croip-api'

export const dynamic = 'force-dynamic'

interface RouteProps {
  params: Promise<{ id: string }>
}

export async function GET(_request: Request, { params }: RouteProps) {
  try {
    const { id } = await params
    const assembly = await croipApi.geo.getAssembly(id)

    return NextResponse.json({ success: true, data: assembly })
  } catch (error: any) {
    console.error('Failed to get assembly from Shared Services:', error)

    const notFound = /404|not found/i.test(error.message || '')

    return NextResponse.json(
      { success: false, error: error.message || 'Failed to get assembly' },
      { status: notFound ? 404 : 500 }
    )
  }
}

export async function PATCH(request: Request, { params }: RouteProps) {
  try {
    const { id } = await params
    const body = await request.json()
    const { regionId, code, name, category, polygonGeoJson } = body

    const updated = await croipApi.geo.updateAssembly(id, {
      regionId,
      code,
      name,
      category,
      polygonGeoJson
    })

    return NextResponse.json({ success: true, data: updated })
  } catch (error: any) {
    console.error('Failed to update assembly in Shared Services:', error)

    const notFound = /404|not found/i.test(error.message || '')

    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update assembly' },
      { status: notFound ? 404 : 500 }
    )
  }
}

export async function DELETE(_request: Request, { params }: RouteProps) {
  try {
    const { id } = await params
    const result = await croipApi.geo.deleteAssembly(id)

    return NextResponse.json({ success: true, data: result })
  } catch (error: any) {
    console.error('Failed to delete assembly from Shared Services:', error)

    const notFound = /404|not found/i.test(error.message || '')
    const badRequest = /cannot delete|referenced|foreign key/i.test(error.message || '')

    return NextResponse.json(
      { success: false, error: error.message || 'Failed to delete assembly' },
      { status: notFound ? 404 : badRequest ? 400 : 500 }
    )
  }
}
