import { NextResponse } from 'next/server'

import { croipApi } from '@/lib/croip-api'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const concessions = await croipApi.governance.getConcessions()

    return NextResponse.json({ success: true, data: concessions })
  } catch (error: any) {
    console.error('Failed to fetch concessions from platform governance:', error)

    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch concessions from platform governance service' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { code, name, contactEmail } = body

    if (!code || !name || !contactEmail) {
      return NextResponse.json(
        { success: false, error: 'Code, name, and contact email are required' },
        { status: 400 }
      )
    }

    const payload = {
      code: String(code).trim().toUpperCase(),
      name: String(name).trim(),
      contactEmail: String(contactEmail).trim().toLowerCase()
    }

    const created = await croipApi.governance.createConcession(payload)

    return NextResponse.json({ success: true, data: created }, { status: 201 })
  } catch (error: any) {
    console.error('Failed to onboard concession in platform governance:', error)

    return NextResponse.json(
      { success: false, error: error.message || 'Failed to onboard concession in platform governance service' },
      { status: 500 }
    )
  }
}
