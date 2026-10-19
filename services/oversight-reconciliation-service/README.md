# CROIP Oversight & Reconciliation Service

Independently verifies what concessionaires report by running 3-way reconciliation — concessionaire-reported bills/payments, `independent-evidence-service`'s external financial feeds, and the event stream — and surfaces any variance as an exception that must be resolved under maker-checker control.

## Service Charter
- **Business Capability:** 3-way financial reconciliation, variance exceptions, national revenue KPIs
- **Owned Database:** `oversight_reconciliation`
- **Default Port:** `3005`
- **Authentication:** ZITADEL JWT (remote JWKS) + Tenant Context claim
- **Required RBAC Permissions:** `reconciliation:run`, `reconciliation:read`, `exceptions:manage`, `oversight:read`
- **Messaging:** RabbitMQ with Transactional Outbox and Idempotent Inbox

## Key Capabilities
- Initiate a 3-way financial reconciliation run for a reporting period
- List historical reconciliation runs for the caller's tenant
- Query open reconciliation variance exceptions
- Execute a maker-checker resolution action on an open exception
- National collection efficiency and consolidated financial KPIs

## Standard Endpoints
- **Liveness:** `http://localhost:3005/health/live`
- **Readiness:** `http://localhost:3005/health/ready`
- **Metrics:** `http://localhost:3005/metrics`
- **Swagger / OpenAPI Documentation:** `http://localhost:3005/docs`

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

Or, from the repo root, run the whole stack in Docker: `docker compose up -d --build oversight-reconciliation-service`.
