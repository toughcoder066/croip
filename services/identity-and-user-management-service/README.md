# iDARMS Fastify Microservice Golden Template

This repository is the starting point for independently deployable iDARMS services. It deliberately works without Envoy so a developer can run and test one service directly. Envoy is added in the integrated environment.

## Included controls

- Fastify and TypeScript with strict compilation
- ZITADEL JWT verification using remote JWKS
- Concession and District Assembly context derived from trusted token claims
- Permission hooks with service-side authorization
- Prisma and a service-owned PostgreSQL database
- Transactional outbox, RabbitMQ publisher confirms and bounded retry
- Inbox and idempotency storage models
- Tamper-evident-friendly audit record structure
- OpenAPI 3.1 and Swagger UI
- RFC 9457-style problem responses
- Prometheus metrics, structured logging and correlation IDs
- Liveness, readiness and graceful shutdown
- Multi-stage non-root Docker image and local Docker Compose stack
- Node test runner smoke tests

## First run

```bash
cp .env.example .env
# For local-only development, set AUTH_MODE=disabled. This is rejected in production.
npm install
npm run prisma:generate
docker compose up -d postgres rabbitmq
npm run prisma:deploy
npm test
npm run dev
```

Or run the complete local stack:

```bash
cp .env.example .env
docker compose up --build
```

Endpoints:

- API: `http://localhost:3000/v1/example-resources`
- OpenAPI UI: `http://localhost:3000/docs`
- Liveness: `http://localhost:3000/health/live`
- Readiness: `http://localhost:3000/health/ready`
- Metrics: `http://localhost:3000/metrics`
- RabbitMQ management: `http://localhost:15672`

## Local request without ZITADEL

Development-only authentication still supplies a concession and Assembly context:

```bash
curl -X POST http://localhost:3000/v1/example-resources \
  -H 'content-type: application/json' \
  -H 'x-dev-subject: developer-1' \
  -H 'x-dev-concession-id: 11111111-1111-1111-1111-111111111111' \
  -H 'x-dev-assembly-id: 22222222-2222-2222-2222-222222222222' \
  -H 'x-dev-permissions: example:read example:write' \
  -d '{"name":"First resource"}'
```

## ZITADEL contract

The service validates issuer, audience, signature and token lifetime. The template expects an iDARMS context claim shaped as:

```json
{
  "urn:idarms:context": {
    "concessionId": "11111111-1111-1111-1111-111111111111",
    "assemblyId": "22222222-2222-2222-2222-222222222222"
  }
}
```

Configure the actual claim action or mapping in ZITADEL. Never accept concession or Assembly identity from an unverified client header in production.

## Mandatory service boundaries

1. The service owns its database schema and credentials.
2. Other services use its API or events; they do not query its tables.
3. Domain authorization remains in the service even when Envoy validates JWTs.
4. Financial and ownership changes use idempotent commands and append-only evidence.
5. Events are published only through the transactional outbox.
6. Consumers record the message ID in the inbox before committing a business effect.
7. Database migrations are forward-compatible and deployed before code that requires them.

## Outbox worker

Run the worker separately from the API:

```bash
npm run worker:outbox
```

The worker claims rows with `FOR UPDATE SKIP LOCKED`, publishes persistent messages through a durable topic exchange, waits for publisher confirmation and retries with bounded exponential backoff. Configure dead-letter escalation and an operational replay procedure for each real service.

Consumers should acknowledge a RabbitMQ message only after `processOnce` commits the inbox marker and business change in one database transaction. Duplicate event IDs then return `duplicate` without applying the business effect again.

## Template adoption

Copy the repository, rename the package and replace the example module. Do not remove the health, error, authentication, audit, observability or event reliability controls. Use [the adoption checklist](docs/ADOPTION_CHECKLIST.md) during architecture review.
