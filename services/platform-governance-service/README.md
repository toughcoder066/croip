# CROIP Platform Governance Service

Owns identity and access for the Central Platform itself: oversight officer accounts, RBAC roles/permissions, and the full concessionaire lifecycle — onboarding, MMDA territory assignment, personnel, and machine-to-machine API credentials.

## Service Charter
- **Business Capability:** IAM (users, RBAC), concessionaire onboarding & MMDA assignment, API client provisioning
- **Owned Database:** `platform_governance`
- **Default Port:** `3010`
- **Authentication:** ZITADEL JWT (remote JWKS) + Tenant Context claim
- **Required RBAC Permissions:** `iam:users_manage`, `iam:roles_assign`, `concessionaires:read`, `concessionaires:manage`, `api_clients:manage`
- **Messaging:** RabbitMQ with Transactional Outbox and Idempotent Inbox

## Key Capabilities

**Identity & Access**
- Access matrix: roles × resources × actions with current grants
- List active roles that can be assigned to users
- Grant/revoke a permission on a role
- Register or invite a Central Platform government oversight officer (via Zitadel Management API when configured; otherwise a safe local stub — see below)
- List/retrieve oversight staff profiles, update profile/status/role, re-send a pending invite, remove an account

**Concessionaires**
- Onboard a partner revenue concessionaire company; list/retrieve/offboard concessionaires
- List and assign MMDA rating-concession territories to a concessionaire
- Provision machine-to-machine API credentials for a concessionaire backend (secret shown once, at provisioning time)
- Register and list external field personnel for a concession (used for audit verification trails)

### The super admin account

The portal's login (`superuser@croip.com` / `Password@1`) checks a real row in this service's `users` table with an `ACTIVE` status — it is not a hardcoded bypass. If this service's database is ever reset, recreate it:

```bash
curl -X POST http://localhost:3010/v1/users \
  -H "Content-Type: application/json" \
  -H "x-dev-subject: local-developer" -H "x-dev-permissions: iam:users_manage" \
  -d '{"code":"SUPERUSER-001","email":"superuser@croip.com","fullName":"CROIP Super Administrator","roleCode":"SUPER_ADMIN"}'

curl -X PATCH http://localhost:3010/v1/users/<id-from-the-response-above> \
  -H "Content-Type: application/json" \
  -H "x-dev-subject: local-developer" -H "x-dev-permissions: iam:users_manage" \
  -d '{"status":"ACTIVE"}'
```

### Zitadel Management API (optional)

Inviting a new oversight officer calls the real Zitadel Management API only when `ZITADEL_MANAGEMENT_URL`, `ZITADEL_MANAGEMENT_PAT`, and `ZITADEL_ORGANIZATION_ID` are set (see `src/lib/zitadel-management.ts`). Leave them unset in local development — users are still created with status `PENDING_ACTIVATION`, just without a real invite email being sent.

## Standard Endpoints
- **Liveness:** `http://localhost:3010/health/live`
- **Readiness:** `http://localhost:3010/health/ready`
- **Metrics:** `http://localhost:3010/metrics`
- **Swagger / OpenAPI Documentation:** `http://localhost:3010/docs`

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

Or, from the repo root, run the whole stack in Docker: `docker compose up -d --build platform-governance-service`.
