import { NextResponse } from 'next/server'

import { croipApi } from '@/lib/croip-api'

export const dynamic = 'force-dynamic'

interface RouteProps {
  params: Promise<{ id: string }>
}

export async function GET(_request: Request, { params }: RouteProps) {
  try {
    const { id } = await params
    const assemblies = await croipApi.governance.getAssignedAssemblies(id)

    return NextResponse.json({ success: true, data: assemblies })
  } catch (error: any) {
    console.error('Failed to fetch assigned assemblies:', error)

    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch assigned MMDAs' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request, { params }: RouteProps) {
  try {
    const { id } = await params
    const body = await request.json()
    const { assemblyId, contractStart, contractEnd } = body

    if (!assemblyId || !contractStart || !contractEnd) {
      return NextResponse.json(
        { success: false, error: 'Assembly, contract start date, and contract end date are required' },
        { status: 400 }
      )
    }

    const assignment = await croipApi.governance.assignAssembly(id, { assemblyId, contractStart, contractEnd })

    return NextResponse.json({ success: true, data: assignment }, { status: 201 })
  } catch (error: any) {
    console.error('Failed to assign assembly to concession:', error)

    return NextResponse.json(
      { success: false, error: error.message || 'Failed to assign MMDA to concession' },
      { status: 500 }
    )
  }
}
