import { NextResponse } from 'next/server'
import { croipApi } from '@/lib/croip-api'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category') || undefined

    const items = await croipApi.shared.getReferenceData(category)
    return NextResponse.json({ success: true, data: items })
  } catch (error) {
    console.error('Failed to fetch reference configuration data:', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch configuration data' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { category, code, name, metadata } = body

    if (!category || !code || !name) {
      return NextResponse.json({ success: false, error: 'Category, code, and name are required' }, { status: 400 })
    }

    const created = await croipApi.shared.createReferenceItem({ category, code, name, metadata })
    return NextResponse.json({ success: true, data: created }, { status: 201 })
  } catch (error) {
    console.error('Failed to save configuration item:', error)
    return NextResponse.json({ success: false, error: 'Failed to save configuration item' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ success: false, error: 'ID is required' }, { status: 400 })
    }

    await croipApi.shared.deleteReferenceItem(id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to delete configuration item:', error)
    return NextResponse.json({ success: false, error: 'Failed to delete configuration item' }, { status: 500 })
  }
}
