# CROIP Audit Assurance Service

Maintains the platform's tamper-evident audit trail. Every create/view/update/delete action taken on the platform — or through an external integration — lands here as an append-only, cryptographically hash-chained record, so no one (including a platform admin) can quietly alter history.

## Service Charter
- **Business Capability:** Tamper-evident audit logging, event archive assurance, auditor trace
- **Owned Database:** `audit_assurance`
- **Default Port:** `3006`
- **Authentication:** ZITADEL JWT (remote JWKS) + Tenant Context claim
- **Required RBAC Permissions:** `audit:read`, `assurance:verify`
- **Messaging:** RabbitMQ with Transactional Outbox and Idempotent Inbox

## Key Capabilities
- Query tamper-evident audit logs with cryptographic hash signatures
- Cryptographically verify an immutable event archive manifest
- End-to-end auditor trace: follow a national figure through applied events to independent evidence

## Standard Endpoints
- **Liveness:** `http://localhost:3006/health/live`
- **Readiness:** `http://localhost:3006/health/ready`
- **Metrics:** `http://localhost:3006/metrics`
- **Swagger / OpenAPI Documentation:** `http://localhost:3006/docs`

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

Or, from the repo root, run the whole stack in Docker: `docker compose up -d --build audit-assurance-service`.
