# CROIP — Central Revenue Oversight & Integration Platform

> **Repository:** `Level10-Ghana/Central-Platform`
> **Architecture:** 11 independent Fastify microservices + a Next.js admin portal, orchestrated with Docker Compose and pnpm/Turborepo

## 1. Overview

**CROIP** (Central Revenue Oversight & Integration Platform) is Ghana's national platform for centralized oversight of municipal (MMDA) property-rate revenue. Concessionaires (private revenue-collection partners) register properties, issue bills, and receive payments against boundaries that CROIP itself defines and verifies; the platform independently reconciles what concessionaires report against independent payment evidence, and gives government oversight staff one place to audit the whole chain.

Each business capability — identity, properties, billing, disputes, reconciliation, audit — is owned by its **own microservice with its own Postgres database**, so services can be deployed, scaled, and changed independently. Services talk to each other only through published HTTP APIs and a RabbitMQ transactional outbox/inbox for domain events; nothing reaches into another service's database directly.

## 2. Repository Layout

```
Central-Platform/
├── apps/
│   └── croip-portal/        # Next.js 16 admin portal (government oversight UI)
├── services/                 # 11 independent Fastify + Prisma microservices (see table below)
├── packages/
│   ├── contracts/            # Shared Zod schemas / IAM role & permission constants
│   └── tsconfig/             # Shared strict TypeScript base configs
├── docker-compose.yml         # Postgres, RabbitMQ, and all 11 services + their migration jobs
├── docs/                     # Architecture docs, API reference, data dictionary
├── AGENTS.md                 # API-ingestion rule: all apps must consume only the 11 services below
└── package.json              # Root Turborepo scripts (build/dev/lint/typecheck, docker:*)
```

## 3. The 11 Microservices

| # | Service | Port | Database | Owns |
|---|---------|------|----------|------|
| 1 | `reporting-gateway-service` | `3001` | `reporting_gateway` | Generic CloudEvents ingestion from external/concessionaire systems |
| 2 | `event-processing-service` | `3002` | `event_processing` | Event quarantine, replay, and operational projections |
| 3 | `independent-evidence-service` | `3003` | `independent_evidence` | Independent PSP/MoMo/bank feed ingestion and control totals (used to cross-check concessionaire-reported payments) |
| 4 | `shared-services` | `3004` | `shared_services` | Reference data, **GIS regions & MMDA boundaries** (real COD-AB dataset), notifications, receipt verification |
| 5 | `oversight-reconciliation-service` | `3005` | `oversight_reconciliation` | 3-way reconciliation runs, variance exceptions, national KPIs |
| 6 | `audit-assurance-service` | `3006` | `audit_assurance` | Tamper-evident audit log, archive manifests, auditor trace |
| 7 | `billing-payments-service` | `3007` | `billing_payments` | Property bills, payments (full/partial, pay-for-another), payment links |
| 8 | `dispute-service` | `3008` | `disputes` | Billing/boundary/valuation disputes, evidence, review workflow |
| 9 | `platform-governance-service` | `3010` | `platform_governance` | Users, RBAC, concessionaire onboarding, MMDA concession assignment, API credentials |
| 10 | `property-registry-service` | `3020` | `property_registry` | Property cadastre, parcel boundaries, field verification, valuation rolls |
| 11 | `ratepayer-service` | `3030` | `ratepayer_core` | Ratepayer profiles, KYC, property claims |

Every service exposes `/health/live`, `/health/ready`, `/metrics`, and interactive OpenAPI docs at `/docs` (e.g. `http://localhost:3007/docs`).

## 4. Prerequisites

- **Node.js** 24+
- **pnpm** 9+ (`npm install -g pnpm`)
- **Docker Desktop** (for Postgres, RabbitMQ, and the 11 services)

## 5. Running Everything

### 5.1 Start the backend (all 11 services + Postgres + RabbitMQ)

```bash
cd Central-Platform
docker compose up -d --build
```

This builds and starts Postgres, RabbitMQ, each service's one-shot database-migration job, and then each service itself. First run takes a few minutes; subsequent runs are much faster. Check status with:

```bash
docker compose ps
docker compose logs -f <service-name>   # e.g. docker compose logs -f billing-payments-service
```

To rebuild a single service after changing its code (`docker compose up -d` alone does **not** pick up source changes):

```bash
docker compose up -d --build <service-name>
```

The same shortcuts are available via the root `package.json`:

```bash
pnpm docker:up       # docker compose up --build -d
pnpm docker:down     # docker compose down
pnpm docker:logs     # docker compose logs -f
pnpm docker:ps       # docker compose ps
pnpm docker:infra    # start only postgres + rabbitmq
```

### 5.2 Start the admin portal

The portal is a plain Next.js dev server — run it directly with npm, not Docker:

```bash
cd apps/croip-portal
npm install
npm run dev
```

The portal starts on **http://localhost:3050** and proxies all data through the 11 services above (see `apps/croip-portal/src/lib/croip-api.ts`); it never talks to a database directly.

### 5.3 Sign in

| Field | Value |
|---|---|
| URL | `http://localhost:3050/login` |
| Email | `superuser@croip.com` |
| Password | `Password@1` |
| Role | `SUPER_ADMIN` (full access) |

This account is a row in `platform-governance-service`'s `users` table, not a hardcoded bypass — if you reset that service's database, recreate it:

```bash
curl -X POST http://localhost:3010/v1/users \
  -H "Content-Type: application/json" \
  -H "x-dev-subject: local-developer" -H "x-dev-permissions: iam:users_manage" \
  -d '{"code":"SUPERUSER-001","email":"superuser@croip.com","fullName":"CROIP Super Administrator","roleCode":"SUPER_ADMIN"}'

# then activate it (new users start PENDING_ACTIVATION):
curl -X PATCH http://localhost:3010/v1/users/<id-from-the-response-above> \
  -H "Content-Type: application/json" \
  -H "x-dev-subject: local-developer" -H "x-dev-permissions: iam:users_manage" \
  -d '{"status":"ACTIVE"}'
```

## 6. Authentication in Local Development

Every service runs with `AUTH_MODE=disabled` in `docker-compose.yml`. In this mode, instead of verifying a Zitadel JWT, each service trusts plain `x-dev-subject` / `x-dev-permissions` / `x-dev-concession-id` / `x-dev-assembly-id` headers — so you can curl any endpoint directly without a token, e.g.:

```bash
curl http://localhost:3020/v1/properties \
  -H "x-dev-subject: local-developer" \
  -H "x-dev-permissions: properties:read"
```

The portal sends these headers on every request automatically (see `fetchCroipService` in `apps/croip-portal/src/lib/croip-api.ts`), stamped with a real seeded concession and MMDA — not a placeholder UUID — so every record created through the portal is attributable to an actual `Concession` and `MunicipalAssembly` row. `AUTH_MODE=disabled` is refused outright in `NODE_ENV=production`.

## 7. GIS Boundary Data

`shared-services` ships with Ghana's real administrative boundaries — 16 regions and 260 MMDAs (districts/municipalities/metros) — imported from the UN OCHA / Ghana Statistical Service **COD-AB** dataset (CC BY-IGO, [data.humdata.org/dataset/cod-ab-gha](https://data.humdata.org/dataset/cod-ab-gha)). Boundaries can be viewed and redrawn in the portal under **Administration → Zones & Boundaries**. Property registration validates a property's footprint against these boundaries and rejects it if it falls outside every drawn MMDA or straddles more than one.

## 8. Development Scripts (Turborepo)

Run from the repo root:

```bash
pnpm dev         # turbo run dev — all workspace apps/services in watch mode (prefer docker compose for services)
pnpm build       # turbo run build
pnpm lint        # turbo run lint
pnpm typecheck   # turbo run typecheck
pnpm --filter <workspace-name> <script>   # run a script in one workspace
```

Per-service commands (run inside a `services/<name>` directory, or via Docker as above):

```bash
cp .env.example .env
npm install
npm run prisma:generate
npm run prisma:deploy    # applies migrations to DATABASE_URL
npm test
npm run dev
```

## 9. API Ingestion Rule

All frontend apps and portals in this repository must consume **only** the 11 published microservice APIs above — no mock data, no third-party placeholder APIs, no direct database access. See `AGENTS.md` for the full rule and the current endpoint inventory.

## 10. Security & Compliance

- Audit trails (`audit-assurance-service`) are append-only and cryptographically hash-chained.
- Maker-checker separation of duties on reconciliation exception resolution and oversight approvals.
- Built in accordance with Ghana's Data Protection Act, 2012 (Act 843).
- Secrets and real credentials are never committed — `.env.example` files show required variables only.

---
*Maintained by Level 10 Ghana Engineering Team.*
