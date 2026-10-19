# CROIP Shared Services

Cross-cutting reference data used by every other service: canonical lookups, countries, notification dispatch, receipt verification, and — most importantly — the **GIS boundary dataset**: Ghana's 16 regions and 260 MMDAs (districts/municipalities/metros), including their real geographic boundaries.

## Service Charter
- **Business Capability:** Reference data, GIS region/MMDA boundaries, notifications, receipt verification
- **Owned Database:** `shared_services`
- **Default Port:** `3004`
- **Authentication:** ZITADEL JWT (remote JWKS) + Tenant Context claim
- **Required RBAC Permissions:** `reference:read`, `reference:manage`, `concession:read`, `message:send`
- **Messaging:** RabbitMQ with Transactional Outbox and Idempotent Inbox

## Key Capabilities
- Retrieve/create/delete canonical reference data (authorities, revenue codes, jurisdictions)
- Retrieve active concession scopes and boundaries
- Submit a shared notification request with idempotency; check delivery status
- Public verification of digital payment receipt authenticity
- **GIS boundaries:** list/create regions and MMDAs, draw or replace a region's or MMDA's boundary polygon
- **Point-in-polygon lookup:** given a coordinate, find which MMDA (and region) contains it
- **Polygon zone-membership check:** given a property's own footprint polygon, determine whether it falls inside exactly one MMDA, no MMDA, or overlaps more than one (used by `property-registry-service` to reject zone-conflicted property registrations)

### GIS boundary data

The `Region` and `MunicipalAssembly` tables are seeded from the real **COD-AB** administrative boundary dataset (OCHA / Ghana Statistical Service, CC BY-IGO — [data.humdata.org/dataset/cod-ab-gha](https://data.humdata.org/dataset/cod-ab-gha)), not placeholder shapes. Each region/MMDA carries its official P-code as `code` (e.g. `GH07`, `GH0704`) and a `polygonGeoJson` boundary. These are edited from the portal's **Zones & Boundaries** screen, or directly:

```bash
curl http://localhost:3004/v1/regions -H "x-dev-subject: local-developer" -H "x-dev-permissions: reference:read"
curl http://localhost:3004/v1/assemblies -H "x-dev-subject: local-developer" -H "x-dev-permissions: reference:read"
```

This is a **separate dataset** from the legacy flat `/v1/reference-data?category=region|assembly` lookup table — the latter has no polygon support and should not be used for anything geography-related.

## Standard Endpoints
- **Liveness:** `http://localhost:3004/health/live`
- **Readiness:** `http://localhost:3004/health/ready`
- **Metrics:** `http://localhost:3004/metrics`
- **Swagger / OpenAPI Documentation:** `http://localhost:3004/docs`

## Local Development
```bash
cp .env.example .env
npm install
npm run prisma:generate
docker compose up -d postgres rabbitmq   # from the repo root
npm run prisma:deploy
npm test
npm run dev
```

Or, from the repo root, run the whole stack in Docker: `docker compose up -d --build shared-services`.
