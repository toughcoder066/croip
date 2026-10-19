import { NextResponse } from 'next/server'

import { croipApi } from '@/lib/croip-api'

export const dynamic = 'force-dynamic'

interface RouteProps {
  params: Promise<{ id: string }>
}

export async function GET(_request: Request, { params }: RouteProps) {
  try {
    const { id } = await params
    const personnel = await croipApi.governance.getPersonnel(id)

    return NextResponse.json({ success: true, data: personnel })
  } catch (error: any) {
    console.error('Failed to fetch concession personnel:', error)

    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch concession personnel' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request, { params }: RouteProps) {
  try {
    const { id } = await params
    const body = await request.json()
    const { externalStaffRef, fullName, phone } = body

    if (!externalStaffRef || !fullName || !phone) {
      return NextResponse.json(
        { success: false, error: 'Staff reference, full name, and phone are required' },
        { status: 400 }
      )
    }

    const personnel = await croipApi.governance.registerPersonnel(id, { externalStaffRef, fullName, phone })

    return NextResponse.json({ success: true, data: personnel }, { status: 201 })
  } catch (error: any) {
    console.error('Failed to register concession personnel:', error)

    return NextResponse.json(
      { success: false, error: error.message || 'Failed to register field personnel' },
      { status: 500 }
    )
  }
}
