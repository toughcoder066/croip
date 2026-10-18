# CROIP Billing & Payments Service

Owns the full bill/payment lifecycle: issuing property bills, receiving full or partial payments, letting one ratepayer pay another ratepayer's bill, and payment links for third-party gateway checkout.

## Service Charter
- **Business Capability:** CROIP Billing & Payments Service
- **Owned Database:** `billing_payments`
- **Default Port:** `3007`
- **Authentication:** ZITADEL JWT (remote JWKS) + Tenant Context claim
- **Required RBAC Permissions:** `bills:issue`, `bills:read`, `payments:receive`
- **Messaging:** RabbitMQ with Transactional Outbox and Idempotent Inbox

## Key Capabilities
- Issue a property bill for a billing period, attributed to the concession and the specific personnel who issued it
- Paginated, searchable bill directory (oversight view across all ratepayers) — powers the portal's **Properties → Bills** screen
- Retrieve a bill and its full payment history
- Record a full or partial payment against a bill, including paying on behalf of another ratepayer
- Paginated, searchable payment ledger across all bills and ratepayers — surfaced inside each ratepayer's own profile, not as a standalone screen
- Create a fixed-amount payment link for third-party gateway checkout
- List the caller's own bills, including bills they've paid on behalf of another ratepayer

## Standard Endpoints
- **Liveness:** `http://localhost:3007/health/live`
- **Readiness:** `http://localhost:3007/health/ready`
- **Metrics:** `http://localhost:3007/metrics`
- **Swagger / OpenAPI Documentation:** `http://localhost:3007/docs`

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

Or, from the repo root, run the whole stack in Docker: `docker compose up -d --build billing-payments-service`.
