import { NextResponse } from 'next/server'
import { croipApi } from '@/lib/croip-api'

export async function GET() {
  try {
    const countries = await croipApi.shared.getCountries()
    return NextResponse.json({ countries })
  } catch (error) {
    console.error('Failed to retrieve database countries:', error)
    return NextResponse.json({ countries: [] }, { status: 200 })
  }
}
