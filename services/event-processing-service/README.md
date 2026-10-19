# CROIP Event Processing Service

Consumes the domain events every other service publishes to the shared RabbitMQ exchange, builds operational projections from them, and quarantines any event that fails to process cleanly so it can be investigated and reprocessed instead of silently dropped.

## Service Charter
- **Business Capability:** Domain event processing, projection building, and quarantine/replay
- **Owned Database:** `event_processing`
- **Default Port:** `3002`
- **Authentication:** ZITADEL JWT (remote JWKS) + Tenant Context claim
- **Required RBAC Permissions:** `events:process`, `quarantine:manage`
- **Messaging:** RabbitMQ with Transactional Outbox and Idempotent Inbox

## Key Capabilities
- List quarantined events pending investigation
- Get details of a quarantined event
- Resolve a quarantined event with investigation notes
- Retrieve the current operational projection of an aggregate

## Standard Endpoints
- **Liveness:** `http://localhost:3002/health/live`
- **Readiness:** `http://localhost:3002/health/ready`
- **Metrics:** `http://localhost:3002/metrics`
- **Swagger / OpenAPI Documentation:** `http://localhost:3002/docs`

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

Or, from the repo root, run the whole stack in Docker: `docker compose up -d --build event-processing-service`.
