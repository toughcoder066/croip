# CROIP Dispute Service

Lets ratepayers raise billing, boundary, or valuation disputes against a property, and gives oversight officers a review queue to investigate and resolve them with a full evidence and comment trail.

## Service Charter
- **Business Capability:** Dispute lifecycle: raise, evidence, review, resolve
- **Owned Database:** `disputes`
- **Default Port:** `3008`
- **Authentication:** ZITADEL JWT (remote JWKS) + Tenant Context claim
- **Required RBAC Permissions:** `disputes:raise`, `disputes:read`, `disputes:review`
- **Messaging:** RabbitMQ with Transactional Outbox and Idempotent Inbox

## Key Capabilities
- Raise a billing, boundary, or valuation dispute
- Review queue: list disputes, optionally filtered by status or assignee
- Retrieve a dispute with its evidence and comments
- Officer transitions a dispute forward through review to resolution
- Attach evidence media to a dispute
- Add a comment to a dispute thread
- List the caller's own disputes

## Standard Endpoints
- **Liveness:** `http://localhost:3008/health/live`
- **Readiness:** `http://localhost:3008/health/ready`
- **Metrics:** `http://localhost:3008/metrics`
- **Swagger / OpenAPI Documentation:** `http://localhost:3008/docs`

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

Or, from the repo root, run the whole stack in Docker: `docker compose up -d --build dispute-service`.
