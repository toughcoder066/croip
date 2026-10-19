import { NextResponse } from 'next/server'
import { croipApi } from '@/lib/croip-api'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const matrix = await croipApi.governance.getRbacMatrix()
    return NextResponse.json({ success: true, data: matrix })
  } catch (error: any) {
    console.error('Failed to fetch RBAC matrix:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch RBAC matrix from Platform Governance' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { roleId, permissionId, granted } = body

    if (!roleId || !permissionId || typeof granted !== 'boolean') {
      return NextResponse.json(
        { success: false, error: 'roleId, permissionId, and granted (boolean) are required' },
        { status: 400 }
      )
    }

    const result = await croipApi.governance.setRoleGrant(roleId, permissionId, granted)
    return NextResponse.json({ success: true, data: result })
  } catch (error: any) {
    console.error('Failed to update role permission grant:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update role permission grant' },
      { status: 500 }
    )
  }
}
