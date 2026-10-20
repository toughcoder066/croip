/**
 * CROIP API Client
 * Strict internal client for communicating EXCLUSIVELY with the 9 CROIP microservices.
 * All frontend portals and apps must ingest ONLY APIs exposed by this platform.
 */

import { cookies } from 'next/headers'

import { touchTokenSession } from './token-store'

export const CROIP_SERVICES = {
  REPORTING_GATEWAY: process.env.REPORTING_GATEWAY_API_URL || 'http://localhost:3001',
  EVENT_PROCESSING: process.env.EVENT_PROCESSING_API_URL || 'http://localhost:3002',
  INDEPENDENT_EVIDENCE: process.env.INDEPENDENT_EVIDENCE_API_URL || 'http://localhost:3003',
  SHARED_SERVICES: process.env.SHARED_SERVICES_API_URL || 'http://localhost:3004',
  OVERSIGHT_RECONCILIATION: process.env.OVERSIGHT_RECONCILIATION_API_URL || 'http://localhost:3005',
  AUDIT_ASSURANCE: process.env.AUDIT_ASSURANCE_API_URL || 'http://localhost:3006',
  BILLING_PAYMENTS: process.env.BILLING_PAYMENTS_API_URL || 'http://localhost:3007',
  DISPUTE: process.env.DISPUTE_API_URL || 'http://localhost:3008',
  PLATFORM_GOVERNANCE: process.env.PLATFORM_GOVERNANCE_API_URL || 'http://localhost:3010',
  PROPERTY_REGISTRY: process.env.PROPERTY_REGISTRY_API_URL || 'http://localhost:3020',
  RATEPAYER_CORE: process.env.RATEPAYER_CORE_API_URL || 'http://localhost:3030',
  PORTAL_WORKBENCH: process.env.PORTAL_PROXY_URL || 'http://localhost:4000'
} as const

export interface RequestOptions extends RequestInit {
  /**
   * Explicit bearer token to send instead of resolving one from the session cookie —
   * needed only where no `croip_session` cookie exists yet (the Zitadel OIDC callback
   * has a freshly-minted token in hand before the session is created).
   */
  accessToken?: string
}

/**
 * Resolves the current request's real Zitadel access token from the session cookie.
 * Every call here counts as activity (see touchTokenSession) — an officer who keeps
 * using the portal stays silently signed in via the refresh token; one who stops gets
 * logged out after 5 idle minutes regardless of the access token's own lifetime.
 */
async function resolveSessionAccessToken(): Promise<string | null> {
  try {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get('croip_session')

    if (!sessionCookie?.value) return null

    const session = JSON.parse(sessionCookie.value)
    const tokens = await touchTokenSession(session.tokenSessionId)

    return tokens?.accessToken ?? null
  } catch {
    return null
  }
}

/**
 * Standard HTTP fetcher to our internal CROIP microservices
 */
export async function fetchCroipService<T>(
  baseUrl: string,
  path: string,
  options: RequestOptions = {}
): Promise<T> {
  const { accessToken, headers = {}, ...rest } = options

  const url = `${baseUrl.replace(/\/$/, '')}/${path.replace(/^\//, '')}`

  const requestHeaders = new Headers(headers)

  if (rest.body) {
    requestHeaders.set('Content-Type', 'application/json')
  }

  const token = accessToken ?? (await resolveSessionAccessToken())

  if (token) {
    requestHeaders.set('Authorization', `Bearer ${token}`)
  }

  const response = await fetch(url, {
    headers: requestHeaders,
    ...rest
  })

  if (!response.ok) {
    let errorDetail = response.statusText

    try {
      const errJson = await response.json()

      errorDetail = errJson.message || errJson.title || errJson.error || JSON.stringify(errJson)
    } catch {
      // ignore
    }

    throw new Error(`[CROIP API ${response.status}] ${errorDetail}`)
  }

  return response.json() as Promise<T>
}

/**
 * Probe a microservice's readiness endpoint (which also verifies its own Postgres connection)
 * and measure the real round-trip latency.
 */
export async function probeServiceHealth(baseUrl: string): Promise<{ ready: boolean; database: boolean; latencyMs: number }> {
  const started = Date.now()

  try {
    const res = await fetch(`${baseUrl.replace(/\/$/, '')}/health/ready`, { cache: 'no-store', signal: AbortSignal.timeout(3000) })
    const body = (await res.json().catch(() => ({}))) as { checks?: { database?: string } }

    return { ready: res.ok, database: body.checks?.database === 'ok', latencyMs: Date.now() - started }
  } catch {
    return { ready: false, database: false, latencyMs: Date.now() - started }
  }
}

/**
 * Specific typed API helpers
 */
export const croipApi = {
  governance: {
    getUsers: (options: RequestOptions = {}) =>
      fetchCroipService<
        Array<{
          id: string
          code: string
          email: string
          fullName: string
          status: string
          createdAt?: string
          phone?: string
          roles?: Array<{ code: string; name: string }>
        }>
      >(CROIP_SERVICES.PLATFORM_GOVERNANCE, '/v1/users', options),
    createUser: (data: any) =>
      fetchCroipService<any>(CROIP_SERVICES.PLATFORM_GOVERNANCE, '/v1/users', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    updateUser: (id: string, data: any) =>
      fetchCroipService<any>(CROIP_SERVICES.PLATFORM_GOVERNANCE, `/v1/users/${encodeURIComponent(id)}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
      }),
    deleteUser: (id: string) =>
      fetchCroipService<any>(CROIP_SERVICES.PLATFORM_GOVERNANCE, `/v1/users/${encodeURIComponent(id)}`, {
        method: 'DELETE',
      }),
    resendInvite: (id: string) =>
      fetchCroipService<any>(CROIP_SERVICES.PLATFORM_GOVERNANCE, `/v1/users/${encodeURIComponent(id)}/resend-invite`, {
        method: 'POST',
      }),
    getUser: (id: string) =>
      fetchCroipService<any>(CROIP_SERVICES.PLATFORM_GOVERNANCE, `/v1/users/${encodeURIComponent(id)}`),
    getRoles: () =>
      fetchCroipService<Array<{ id: string; code: string; name: string; scopeLevel: string }>>(
        CROIP_SERVICES.PLATFORM_GOVERNANCE,
        '/v1/roles'
      ),
    getRbacMatrix: () =>
      fetchCroipService<any>(CROIP_SERVICES.PLATFORM_GOVERNANCE, '/v1/rbac/matrix'),
    setRoleGrant: (roleId: string, permissionId: string, granted: boolean) =>
      fetchCroipService<any>(
        CROIP_SERVICES.PLATFORM_GOVERNANCE,
        `/v1/rbac/roles/${encodeURIComponent(roleId)}/permissions/${encodeURIComponent(permissionId)}`,
        { method: granted ? 'PUT' : 'DELETE' }
      ),
    getConcessions: () =>
      fetchCroipService<any[]>(CROIP_SERVICES.PLATFORM_GOVERNANCE, '/v1/concessions'),
    createConcession: (data: any) =>
      fetchCroipService<any>(CROIP_SERVICES.PLATFORM_GOVERNANCE, '/v1/concessions', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    assignAssembly: (concessionId: string, data: { assemblyId: string; contractStart: string; contractEnd: string }) =>
      fetchCroipService<any>(
        CROIP_SERVICES.PLATFORM_GOVERNANCE,
        `/v1/concessions/${encodeURIComponent(concessionId)}/assemblies`,
        {
          method: 'POST',
          body: JSON.stringify(data),
        }
      ),
    provisionApiClient: (concessionId: string) =>
      fetchCroipService<{ id: string; concessionId: string; clientId: string; clientSecret: string; status: string; expiresAt: string }>(
        CROIP_SERVICES.PLATFORM_GOVERNANCE,
        `/v1/concessions/${encodeURIComponent(concessionId)}/api-clients`,
        {
          method: 'POST',
        }
      ),
    registerPersonnel: (concessionId: string, data: { externalStaffRef: string; fullName: string; phone: string }) =>
      fetchCroipService<any>(
        CROIP_SERVICES.PLATFORM_GOVERNANCE,
        `/v1/concessions/${encodeURIComponent(concessionId)}/personnel`,
        {
          method: 'POST',
          body: JSON.stringify(data),
        }
      ),
    getPersonnel: (concessionId: string) =>
      fetchCroipService<any[]>(
        CROIP_SERVICES.PLATFORM_GOVERNANCE,
        `/v1/concessions/${encodeURIComponent(concessionId)}/personnel`
      ),
    getConcession: (id: string) =>
      fetchCroipService<any>(CROIP_SERVICES.PLATFORM_GOVERNANCE, `/v1/concessions/${encodeURIComponent(id)}`),
    getAssignedAssemblies: (concessionId: string) =>
      fetchCroipService<any[]>(
        CROIP_SERVICES.PLATFORM_GOVERNANCE,
        `/v1/concessions/${encodeURIComponent(concessionId)}/assemblies`
      ),
    getApiClients: (concessionId: string) =>
      fetchCroipService<any[]>(
        CROIP_SERVICES.PLATFORM_GOVERNANCE,
        `/v1/concessions/${encodeURIComponent(concessionId)}/api-clients`
      ),
    deactivateConcession: (id: string) =>
      fetchCroipService<any>(CROIP_SERVICES.PLATFORM_GOVERNANCE, `/v1/concessions/${encodeURIComponent(id)}/deactivate`, {
        method: 'POST',
      })
  },
  propertyRegistry: {
    getProperties: () =>
      fetchCroipService<any[]>(CROIP_SERVICES.PROPERTY_REGISTRY, '/v1/properties'),
    getProperty: (id: string) =>
      fetchCroipService<any>(CROIP_SERVICES.PROPERTY_REGISTRY, `/v1/properties/${id}`),
    createProperty: (data: any, options?: RequestOptions) =>
      fetchCroipService<any>(CROIP_SERVICES.PROPERTY_REGISTRY, '/v1/properties', {
        method: 'POST',
        body: JSON.stringify(data),
        ...options
      }),
    createPropertiesBatch: (properties: any[], options?: RequestOptions) =>
      fetchCroipService<any>(CROIP_SERVICES.PROPERTY_REGISTRY, '/v1/properties/batch', {
        method: 'POST',
        body: JSON.stringify({ properties }),
        ...options
      }),
    getPropertyDocuments: (code: string) =>
      fetchCroipService<any[]>(CROIP_SERVICES.PROPERTY_REGISTRY, `/v1/properties/${code}/documents`),
    listVerifications: (propertyId: string) =>
      fetchCroipService<any[]>(CROIP_SERVICES.PROPERTY_REGISTRY, `/v1/properties/${propertyId}/verifications`),
    reviewVerification: (
      verificationId: string,
      data: { reviewStatus: 'APPROVED' | 'REJECTED'; reviewedByPersonnelId: string; reviewNotes?: string }
    ) =>
      fetchCroipService<any>(CROIP_SERVICES.PROPERTY_REGISTRY, `/v1/verifications/${verificationId}/review`, {
        method: 'PATCH',
        body: JSON.stringify(data),
      }),

    // NOTE: property-registry-service does not expose a dedicated "list all valuations" endpoint.
    // Current valuations are only available nested under a single property's detail payload
    // (GET /v1/properties/:id -> { valuations: [...isCurrent] }). This helper fetches that detail
    // and returns just the valuations array for one property; the portal's Valuation Rolls screen
    // composes this across every property (see /api/properties/valuations) the same way
    // /api/dashboard/metrics already does for its rateable-value aggregates.
    getValuations: (propertyId: string) =>
      fetchCroipService<any>(CROIP_SERVICES.PROPERTY_REGISTRY, `/v1/properties/${propertyId}`).then((property: any) => (Array.isArray(property?.valuations) ? property.valuations : []))
  },
  ratepayers: {
    getSummary: () =>
      fetchCroipService<{ totalRatepayers: number; totalClaims: number; totalVerifications: number }>(
        CROIP_SERVICES.RATEPAYER_CORE,
        '/v1/ratepayers'
      ),
    getRatepayer: (id: string) =>
      fetchCroipService<any>(CROIP_SERVICES.RATEPAYER_CORE, `/v1/ratepayers/${id}`),
    registerRatepayer: (data: any) =>
      fetchCroipService<any>(CROIP_SERVICES.RATEPAYER_CORE, '/v1/ratepayers', {
        method: 'POST',
        body: JSON.stringify(data)
      }),
    claimProperty: (data: any) =>
      fetchCroipService<any>(CROIP_SERVICES.RATEPAYER_CORE, '/v1/ratepayers/claims', {
        method: 'POST',
        body: JSON.stringify(data)
      }),

    // CROIP portal: paginated, searchable ratepayer directory for the admin "Ratepayers" screens.
    // Thin pass-through to ratepayer-service (:3030) GET /v1/ratepayers/directory.
    getDirectory: (
      params: { search?: string; status?: string; assemblyId?: string; page?: number; pageSize?: number } = {}
    ) => {
      const query = new URLSearchParams()

      if (params.search) query.set('search', params.search)
      if (params.status) query.set('status', params.status)
      if (params.assemblyId) query.set('assemblyId', params.assemblyId)
      if (params.page) query.set('page', String(params.page))
      if (params.pageSize) query.set('pageSize', String(params.pageSize))
      const qs = query.toString()

      return fetchCroipService<{
        items: Array<{
          id: string
          code: string
          ratepayerType: string
          legalName: string
          phone: string
          email?: string | null
          regionId: string
          assemblyId: string
          status: string
          createdAt: string
          verifications: Array<{
            id: string
            ratepayerId: string
            provider: string
            providerReference: string
            verificationStatus: string
            verifiedAt: string | null
            createdAt: string
          }>
        }>
        total: number
        page: number
        pageSize: number
        totalPages: number
      }>(CROIP_SERVICES.RATEPAYER_CORE, `/v1/ratepayers/directory${qs ? `?${qs}` : ''}`)
    },

    // Linked properties across any MMDA for a single ratepayer.
    // Thin pass-through to ratepayer-service (:3030) GET /v1/ratepayers/:id/properties.
    getRatepayerProperties: (id: string) =>
      fetchCroipService<any[]>(CROIP_SERVICES.RATEPAYER_CORE, `/v1/ratepayers/${encodeURIComponent(id)}/properties`),

    // CROIP portal: oversight official approves or rejects a ratepayer's pending KYC verification.
    // Thin pass-through to ratepayer-service (:3030) PATCH /v1/ratepayers/:id/verifications/:verificationId.
    reviewVerification: (
      ratepayerId: string,
      verificationId: string,
      data: { verificationStatus: 'VERIFIED' | 'REJECTED' }
    ) =>
      fetchCroipService<any>(
        CROIP_SERVICES.RATEPAYER_CORE,
        `/v1/ratepayers/${encodeURIComponent(ratepayerId)}/verifications/${encodeURIComponent(verificationId)}`,
        {
          method: 'PATCH',
          body: JSON.stringify(data),
        }
      )
  },
  billing: {
    // CROIP portal: paginated, searchable bill directory (oversight view across all
    // ratepayers). Thin pass-through to billing-payments-service (:3007) GET /v1/bills.
    getDirectory: (
      params: { search?: string; paymentStatus?: string; ratepayerId?: string; propertyId?: string; page?: number; pageSize?: number } = {}
    ) => {
      const query = new URLSearchParams()

      if (params.search) query.set('search', params.search)
      if (params.paymentStatus) query.set('paymentStatus', params.paymentStatus)
      if (params.ratepayerId) query.set('ratepayerId', params.ratepayerId)
      if (params.propertyId) query.set('propertyId', params.propertyId)
      if (params.page) query.set('page', String(params.page))
      if (params.pageSize) query.set('pageSize', String(params.pageSize))
      const qs = query.toString()

      return fetchCroipService<{
        items: Array<{
          id: string
          billNumber: string
          propertyId: string
          ratepayerId: string
          billingPeriod: string
          billType: string
          currency: string
          amountDue: string
          amountPaid: string
          paymentStatus: string
          issuedAt: string
          dueDate: string
          externalBillRef: string
          payments: Array<{
            id: string
            amount: string
            balanceAtPayment: string
            status: string
            paidByRatepayerId: string | null
            paidAt: string
          }>
        }>
        total: number
        page: number
        pageSize: number
        totalPages: number
      }>(CROIP_SERVICES.BILLING_PAYMENTS, `/v1/bills${qs ? `?${qs}` : ''}`)
    },

    getBill: (billNumber: string) =>
      fetchCroipService<any>(CROIP_SERVICES.BILLING_PAYMENTS, `/v1/bills/${encodeURIComponent(billNumber)}`),

    // CROIP portal: paginated, searchable payment ledger across all bills and ratepayers.
    // Thin pass-through to billing-payments-service (:3007) GET /v1/payments.
    getPaymentsDirectory: (
      params: { search?: string; status?: string; paidByRatepayerId?: string; page?: number; pageSize?: number } = {}
    ) => {
      const query = new URLSearchParams()

      if (params.search) query.set('search', params.search)
      if (params.status) query.set('status', params.status)
      if (params.paidByRatepayerId) query.set('paidByRatepayerId', params.paidByRatepayerId)
      if (params.page) query.set('page', String(params.page))
      if (params.pageSize) query.set('pageSize', String(params.pageSize))
      const qs = query.toString()

      return fetchCroipService<{
        items: Array<{
          id: string
          billId: string
          paidByRatepayerId: string | null
          externalPaymentRef: string
          paymentType: string
          amount: string
          balanceAtPayment: string
          status: string
          paidAt: string
          receivedAt: string
          bill?: { id: string; billNumber: string; ratepayerId: string; propertyId: string; currency: string }
        }>
        total: number
        page: number
        pageSize: number
        totalPages: number
      }>(CROIP_SERVICES.BILLING_PAYMENTS, `/v1/payments${qs ? `?${qs}` : ''}`)
    }
  },
  disputes: {
    // CROIP portal: review queue for disputes raised by ratepayers (billing/boundary/valuation).
    // Thin pass-through to dispute-service (:3008) GET /v1/disputes.
    getQueue: (params: { status?: string; assignedToPersonnelId?: string } = {}) => {
      const query = new URLSearchParams()

      if (params.status) query.set('status', params.status)
      if (params.assignedToPersonnelId) query.set('assignedToPersonnelId', params.assignedToPersonnelId)
      const qs = query.toString()

      return fetchCroipService<
        Array<{
          id: string
          code: string
          disputeType: string
          propertyId: string | null
          billId: string | null
          raisedByRatepayerId: string
          status: string
          assignedToPersonnelId: string | null
          slaDueAt: string | null
          resolution: string | null
          resolvedAt: string | null
          createdAt: string
        }>
      >(CROIP_SERVICES.DISPUTE, `/v1/disputes${qs ? `?${qs}` : ''}`)
    },

    getDispute: (code: string) =>
      fetchCroipService<any>(CROIP_SERVICES.DISPUTE, `/v1/disputes/${encodeURIComponent(code)}`),

    updateStatus: (code: string, data: { status: 'UNDER_REVIEW' | 'RESOLVED' | 'REJECTED'; resolution?: string }) =>
      fetchCroipService<any>(CROIP_SERVICES.DISPUTE, `/v1/disputes/${encodeURIComponent(code)}/status`, {
        method: 'PATCH',
        body: JSON.stringify(data),
      })
  },
  reporting: {
    ingestEvent: (event: any) =>
      fetchCroipService<any>(CROIP_SERVICES.REPORTING_GATEWAY, '/v1/events', {
        method: 'POST',
        body: JSON.stringify(event),
      }),
    getIngestion: (id: string) =>
      fetchCroipService<any>(CROIP_SERVICES.REPORTING_GATEWAY, `/v1/ingestions/${id}`)
  },
  oversight: {
    getExceptions: () =>
      fetchCroipService<any[]>(CROIP_SERVICES.OVERSIGHT_RECONCILIATION, '/v1/exceptions'),
    getRuns: () =>
      fetchCroipService<any[]>(CROIP_SERVICES.OVERSIGHT_RECONCILIATION, '/v1/reconciliation/runs')
  },
  audit: {
    getLogs: (concessionId?: string) =>
      fetchCroipService<any[]>(
        CROIP_SERVICES.AUDIT_ASSURANCE,
        concessionId ? `/v1/audit/records?concessionId=${encodeURIComponent(concessionId)}` : '/v1/audit/records'
      )
  },
  shared: {
    getReferenceData: (category?: string) =>
      fetchCroipService<Array<{ id: string; category: string; code: string; name: string; metadata?: any }>>(
        CROIP_SERVICES.SHARED_SERVICES,
        category ? `/v1/reference-data?category=${encodeURIComponent(category)}` : '/v1/reference-data'
      ),
    createReferenceItem: (data: { category: string; code: string; name: string; metadata?: any }) =>
      fetchCroipService<any>(CROIP_SERVICES.SHARED_SERVICES, '/v1/reference-data', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    deleteReferenceItem: (id: string) =>
      fetchCroipService<any>(CROIP_SERVICES.SHARED_SERVICES, `/v1/reference-data/${id}`, {
        method: 'DELETE',
      }),
    getCountries: async () => {
      try {
        const data = await fetchCroipService<Array<{ id: string; category: string; code: string; name: string; metadata?: any }>>(
          CROIP_SERVICES.SHARED_SERVICES,
          '/v1/reference-data'
        )

        const countryItems = data.filter(item => item.category === 'country')

        return countryItems.map(c => ({
          id: c.id,
          value: c.name.toLowerCase(),
          label: c.name,
          code: c.code,
          flag: c.metadata?.flag || ''
        }))
      } catch (err) {
        console.warn('Failed to fetch countries from Shared Services microservice:', err)

        return []
      }
    }
  },
  geo: {
    listRegions: () =>
      fetchCroipService<
        Array<{
          id: string
          code: string
          name: string
          polygonGeoJson: Record<string, any> | null
          createdAt: string
          updatedAt?: string
        }>
      >(CROIP_SERVICES.SHARED_SERVICES, '/v1/regions'),
    getRegion: (id: string) =>
      fetchCroipService<{
        id: string
        code: string
        name: string
        polygonGeoJson: Record<string, any> | null
        createdAt: string
        updatedAt?: string
        assemblies?: Array<{ id: string; code: string; name: string; category: string }>
      }>(CROIP_SERVICES.SHARED_SERVICES, `/v1/regions/${encodeURIComponent(id)}`),
    createRegion: (data: { code: string; name: string; polygonGeoJson?: Record<string, any> }) =>
      fetchCroipService<any>(CROIP_SERVICES.SHARED_SERVICES, '/v1/regions', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    updateRegion: (id: string, data: { code?: string; name?: string; polygonGeoJson?: Record<string, any> | null }) =>
      fetchCroipService<any>(CROIP_SERVICES.SHARED_SERVICES, `/v1/regions/${encodeURIComponent(id)}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
      }),
    updateRegionBoundary: (id: string, polygonGeoJson: Record<string, any>) =>
      fetchCroipService<any>(CROIP_SERVICES.SHARED_SERVICES, `/v1/regions/${encodeURIComponent(id)}/boundary`, {
        method: 'PATCH',
        body: JSON.stringify({ polygonGeoJson }),
      }),
    listAssemblies: (regionId?: string) =>
      fetchCroipService<
        Array<{
          id: string
          regionId: string
          code: string
          name: string
          category: 'METROPOLITAN' | 'MUNICIPAL' | 'DISTRICT'
          polygonGeoJson: Record<string, any> | null
          createdAt: string
          updatedAt?: string
        }>
      >(
        CROIP_SERVICES.SHARED_SERVICES,
        regionId ? `/v1/assemblies?regionId=${encodeURIComponent(regionId)}` : '/v1/assemblies'
      ),
    getAssembly: (id: string) =>
      fetchCroipService<{
        id: string
        regionId: string
        code: string
        name: string
        category: 'METROPOLITAN' | 'MUNICIPAL' | 'DISTRICT'
        polygonGeoJson: Record<string, any> | null
        createdAt: string
        updatedAt?: string
        region?: { id: string; code: string; name: string }
      }>(CROIP_SERVICES.SHARED_SERVICES, `/v1/assemblies/${encodeURIComponent(id)}`),
    createAssembly: (data: {
      regionId: string
      code: string
      name: string
      category?: 'METROPOLITAN' | 'MUNICIPAL' | 'DISTRICT'
      polygonGeoJson?: Record<string, any>
    }) =>
      fetchCroipService<any>(CROIP_SERVICES.SHARED_SERVICES, '/v1/assemblies', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    updateAssembly: (
      id: string,
      data: {
        regionId?: string
        code?: string
        name?: string
        category?: 'METROPOLITAN' | 'MUNICIPAL' | 'DISTRICT'
        polygonGeoJson?: Record<string, any> | null
      }
    ) =>
      fetchCroipService<any>(CROIP_SERVICES.SHARED_SERVICES, `/v1/assemblies/${encodeURIComponent(id)}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
      }),
    updateAssemblyBoundary: (id: string, polygonGeoJson: Record<string, any>) =>
      fetchCroipService<any>(CROIP_SERVICES.SHARED_SERVICES, `/v1/assemblies/${encodeURIComponent(id)}/boundary`, {
        method: 'PATCH',
        body: JSON.stringify({ polygonGeoJson }),
      }),
    detectZone: (latitude: number, longitude: number) =>
      fetchCroipService<{
        matched: boolean
        assembly: { id: string; code: string; name: string; category: string; regionId: string } | null
        region: { id: string; code: string; name: string } | null
      }>(CROIP_SERVICES.SHARED_SERVICES, '/v1/assemblies/detect-zone', {
        method: 'POST',
        body: JSON.stringify({ latitude, longitude }),
      })
  }
}

