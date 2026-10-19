# CROIP Ratepayer Service

Owns ratepayer identity: citizen/corporate profile registration, KYC verification, and property claims — letting a ratepayer link themselves to properties registered by a concession agent, or claim a property they registered themselves, across any MMDA in Ghana under one account.

## Service Charter
- **Business Capability:** Ratepayer profile, KYC, and cross-MMDA property-claim records.
- **Owned Database:** `ratepayer_core`
- **Default Port:** `3030`
- **Authentication:** ZITADEL JWT + Tenant Context claim
- **Required RBAC Permissions:** `ratepayers:read`, `ratepayers:manage`
- **Messaging:** RabbitMQ Outbox/Inbox

## Key Capabilities
- Register a citizen/corporate ratepayer profile for the web portal or mobile app
- Get a ratepayer's KYC profile, verification status, and linked properties
- Claim ownership or tenancy of a property unit
- Ratepayer claims ownership of a concession-registered property by attaching ownership proof
- List all properties linked to a ratepayer across any MMDA in Ghana
- Get ratepayer summary metrics
- Paginated, searchable ratepayer directory — powers the portal's **Ratepayers → Ratepayer Directory** screen
- Oversight official approves or rejects a ratepayer KYC verification

## Standard Endpoints
- **Liveness:** `http://localhost:3030/health/live`
- **Readiness:** `http://localhost:3030/health/ready`
- **Metrics:** `http://localhost:3030/metrics`
- **Swagger / OpenAPI Documentation:** `http://localhost:3030/docs`

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

Or, from the repo root, run the whole stack in Docker: `docker compose up -d --build ratepayer-service`.
