// This file is used to fetch the nav-apps from the JSON and validate them. It should be removed when the nav-apps API is removed.

// Next Imports
import { NextResponse } from 'next/server'

const NAV_APPS_URL = 'https://cdn.shadcnstudio.com/ss-assets/template/admincn/nav-apps.json'

export async function GET() {
  return NextResponse.json([])
}
