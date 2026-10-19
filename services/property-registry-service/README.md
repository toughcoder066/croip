# CROIP Property Registry Service

The **Property Registry Service** maintains the authoritative landed property parcel cadastre, boundary coordinates, structural sub-units, photos, field verifications, and statutory Land Valuation Division (LVD) valuation roll assessments.

## Service Charter
- **Business Capability:** Authoritative national property cadastre and valuation roll records.
- **Owned Database:** `property_registry`
- **Default Port:** `3020`
- **Authentication:** ZITADEL JWT + Tenant Context claim
- **Required RBAC Permissions:** `properties:read`, `properties:manage`, `properties:verify` (concessionaire agent), `properties:verify:review` (concessionaire officer)
- **Messaging:** RabbitMQ Outbox/Inbox

## Key Capabilities
- Register a landed property parcel into the national cadastre
- Search/list properties within the caller's assembly context
- Retrieve property parcel details, units, and valuation roll status
- Declare a sectional sub-unit within a property (apartment, shop, suite)
- Concession staff upload ownership verification documents for a ratepayer while on field premises
- List all ownership/verification documents attached to a property
- Concessionaire agent submits a field verification of a property
- Concessionaire officer approves or rejects a field verification

### Zone-membership validation at registration

Before a property is created, this service calls `shared-services` (`:3004`) synchronously to check the property's boundary polygon against the real MMDA dataset, and **rejects the registration** if:
- the boundary falls inside **no** registered MMDA (`400` — draw the MMDA boundary in Zones & Boundaries first), or
- the boundary overlaps **more than one** MMDA (`409 Conflict`), or
- the boundary matches an MMDA **other than** the one it's being registered under (`409 Conflict`).

This prevents a property from ever being silently mis-attributed to the wrong MMDA, or disputed between two. See `SHARED_SERVICES_URL` in `.env.example`; if `shared-services` is unreachable, registration fails closed with `503` rather than skipping the check.

## Standard Endpoints
- **Liveness:** `http://localhost:3020/health/live`
- **Readiness:** `http://localhost:3020/health/ready`
- **Metrics:** `http://localhost:3020/metrics`
- **Swagger / OpenAPI Documentation:** `http://localhost:3020/docs`

## Local Development
```bash
cp .env.example .env
npm install
npm run prisma:generate
docker compose up -d postgres rabbitmq shared-services   # from the repo root — zone validation needs shared-services
npm run prisma:deploy
npm test
npm run dev
```

Or, from the repo root, run the whole stack in Docker: `docker compose up -d --build property-registry-service`.
