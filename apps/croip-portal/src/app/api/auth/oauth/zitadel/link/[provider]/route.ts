import { NextResponse } from 'next/server'

import { ZITADEL_ISSUER } from '@/lib/zitadel'

export const dynamic = 'force-dynamic'

/**
 * "Connect" on the Connections tab opens this in a popup. Rather than reimplementing
 * Zitadel's own OAuth-dance-plus-account-linking logic, this sends the user straight to
 * Zitadel's own self-service "Identity Providers" page — completing the portal login
 * via Zitadel already leaves an active Zitadel browser session, so this lands the user
 * directly on their own account's IDP management screen, no re-auth needed. The
 * `provider` param isn't passed through: Zitadel's page lists every federated IDP
 * together and lets the user pick, and only providers an admin has actually configured
 * in Zitadel (Google/Microsoft/GitHub, once real credentials exist for them) show up.
 */
export async function GET() {
  return NextResponse.redirect(`${ZITADEL_ISSUER}/ui/console/users/me?id=idp`)
}
