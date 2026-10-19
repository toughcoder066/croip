# CROIP Engineering & Agent Instructions

## API Consumption Ingestion Rule
All applications and web portals created in this repository (under `apps/`, `services/`, or client packages) **MUST EXCLUSIVELY ingest APIs created and exposed by the 11 CROIP microservices**.

### Permitted Microservices & Ports:
1. **Reporting Gateway Service** (`:3001`) — `/v1/events`, `/v1/event-batches`, `/v1/ingestions/:id` (generic CloudEvents ingestion only; bills and payments live in Billing & Payments Service)
2. **Event Processing Service** (`:3002`) — `/v1/admin/outbox`
3. **Independent Evidence Service** (`:3003`)
4. **Shared Services** (`:3004`) — `/v1/reference-data`, `/v1/countries`, `/v1/regions`, `/v1/assemblies`, `/v1/lookups`
5. **Oversight & Reconciliation Service** (`:3005`) — `/v1/exceptions`, `/v1/reconciliation-runs`, `/v1/dashboards`
6. **Audit Assurance Service** (`:3006`) — `/v1/audit-log`
7. **Billing & Payments Service** (`:3007`) — `/v1/bills`, `/v1/bills/:billNumber/payments`, `/v1/bills/:billNumber/payments:pay-for-other`, `/v1/payment-links`, `/v1/me/bills`
8. **Dispute Service** (`:3008`) — `/v1/disputes`, `/v1/me/disputes`, `/v1/disputes/:code/evidence`, `/v1/disputes/:code/comments`
9. **Platform Governance Service** (`:3010`) — `/v1/users`, `/v1/concessions`, `/v1/concessions/:code/contracts`, `/v1/concessions/:code/personnel`, `/v1/concessions/:code/api-clients`
10. **Property Registry Service** (`:3020`) — `/v1/properties`, `/v1/properties/:id/verifications`, `/v1/verifications/:id/review`, `/v1/properties/:code/documents`, `/v1/properties/:code/photos`, `/v1/valuation-lists`
11. **Ratepayer Core Service** (`:3030`) — `/v1/ratepayers`, `/v1/properties/:code/claims`, `/v1/ratepayers/:code/id-verifications`, `/v1/me/properties`, `/v1/me/bills`

### Constraints:
- **No external mock services or third-party placeholder APIs** may be introduced into UI apps or portals.
- All frontend apps must use `@/lib/croip-api` (or direct backend proxies) to interact with the backend services.
- Data fetching must connect to live Postgres databases or through internal service endpoints.
