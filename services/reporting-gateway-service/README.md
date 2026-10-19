# CROIP Reporting Gateway Service

The entry point for durable, idempotent event ingestion from external and concessionaire systems. Accepts canonical CloudEvents one at a time or in batches and hands them off for processing — it does not interpret or act on event content itself.

## Service Charter
- **Business Capability:** Generic CloudEvents ingestion gateway for external/concessionaire systems
- **Owned Database:** `reporting_gateway`
- **Default Port:** `3001`
- **Authentication:** ZITADEL JWT (remote JWKS) + Tenant Context claim
- **Required RBAC Permissions:** `gateway:ingest`, `gateway:read`
- **Messaging:** RabbitMQ with Transactional Outbox and Idempotent Inbox

## Key Capabilities
- Submit a single canonical CloudEvent for durable ingestion
- Submit a bounded batch of canonical CloudEvents
- Check the status of a durable event ingestion

> Bills and payments do **not** flow through this service — see `billing-payments-service` (`:3007`).

## Standard Endpoints
- **Liveness:** `http://localhost:3001/health/live`
- **Readiness:** `http://localhost:3001/health/ready`
- **Metrics:** `http://localhost:3001/metrics`
- **Swagger / OpenAPI Documentation:** `http://localhost:3001/docs`

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

Or, from the repo root, run the whole stack in Docker: `docker compose up -d --build reporting-gateway-service`.
