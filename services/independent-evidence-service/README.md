# CROIP Independent Evidence Service

Ingests financial evidence from sources **independent of the concessionaires** — PSP, mobile money, and bank feeds — so `oversight-reconciliation-service` has a trustworthy second source of truth to reconcile concessionaire-reported bills and payments against.

## Service Charter
- **Business Capability:** Independent financial evidence ingestion for 3-way reconciliation
- **Owned Database:** `independent_evidence`
- **Default Port:** `3003`
- **Authentication:** ZITADEL JWT (remote JWKS) + Tenant Context claim
- **Required RBAC Permissions:** `evidence:read`, `evidence:submit`, `control-totals:submit`
- **Messaging:** RabbitMQ with Transactional Outbox and Idempotent Inbox

## Key Capabilities
- Ingest an authenticated independent financial feed item (PSP, MoMo, Bank)
- Retrieve an independent evidence record
- Submit batch control totals for independent financial reconciliation

## Standard Endpoints
- **Liveness:** `http://localhost:3003/health/live`
- **Readiness:** `http://localhost:3003/health/ready`
- **Metrics:** `http://localhost:3003/metrics`
- **Swagger / OpenAPI Documentation:** `http://localhost:3003/docs`

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

Or, from the repo root, run the whole stack in Docker: `docker compose up -d --build independent-evidence-service`.
