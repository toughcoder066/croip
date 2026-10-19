# CROIP API Reference

Complete endpoint reference for all 11 CROIP microservices, generated from each service's live OpenAPI 3.1 schema (`GET /docs/json` on each service) plus the RBAC permission each route requires (read from its route definition). This file is the single place to look up a request/response shape without opening Swagger UI on 11 different ports.

## Conventions

- **Base URL**: `http://localhost:<port>` in local development (see the table below for each service's port); behind Docker Compose, services reach each other by container name instead.
- **All request/response bodies are JSON** (`application/json`), except error bodies, which are `application/problem+json`.
- Fields in schemas below are listed flattened: a nested object field is shown as `parent.child`, and an array-of-objects field's own fields are shown as `parent[].child`.

## Authentication

Every endpoint below (except `/health/*` and `/metrics`) requires authentication, enforced by each service's **Required Permission** (shown per endpoint) via RBAC.

**Production (`AUTH_MODE=zitadel`, the default — `AUTH_MODE=disabled` is refused outright when `NODE_ENV=production`):**

| Header | Value |
|---|---|
| `Authorization` | `Bearer <Zitadel-issued JWT>` — must carry the required permission in its roles claim |

**Local development (`AUTH_MODE=disabled`)** — every service trusts these headers directly instead of verifying a JWT:

| Header | Purpose | Default if omitted |
|---|---|---|
| `x-dev-subject` | Caller identity (user/service id) | `local-developer` |
| `x-dev-permissions` | Space-separated permission scopes the caller has | `example:read example:write` |
| `x-dev-concession-id` | Concession context (UUID) | a real seeded concession — see root `README.md` |
| `x-dev-assembly-id` | MMDA/assembly context (UUID) | a real seeded assembly — see root `README.md` |

The CROIP portal (`apps/croip-portal`) sends these automatically on every request — see `src/lib/croip-api.ts`.

## Standard Error Response

Every endpoint can return this shape (`application/problem+json`) for any non-2xx status:

| Field | Type | Required | Notes |
|---|---|---|---|
| `type` | string | yes | A URI identifying the problem type |
| `title` | string | yes | Short human-readable summary |
| `status` | integer | yes | HTTP status code, repeated in the body |
| `code` | string | yes | Machine-readable error code, e.g. `VALIDATION_ERROR`, `NOT_FOUND`, `CONFLICT` |
| `requestId` | string | yes | Correlates with service logs |
| `details` | any | no | Extra structured context (varies by error) |

## Services

| # | Service | Port | Database |
|---|---|---|---|
| 1 | [Reporting Gateway Service](#1-reporting-gateway-service) | `3001` | `reporting_gateway` |
| 2 | [Event Processing Service](#2-event-processing-service) | `3002` | `event_processing` |
| 3 | [Independent Evidence Service](#3-independent-evidence-service) | `3003` | `independent_evidence` |
| 4 | [Shared Services](#4-shared-services) | `3004` | `shared_services` |
| 5 | [Oversight & Reconciliation Service](#5-oversight-reconciliation-service) | `3005` | `oversight_reconciliation` |
| 6 | [Audit Assurance Service](#6-audit-assurance-service) | `3006` | `audit_assurance` |
| 7 | [Billing & Payments Service](#7-billing-payments-service) | `3007` | `billing_payments` |
| 8 | [Dispute Service](#8-dispute-service) | `3008` | `disputes` |
| 9 | [Platform Governance Service](#9-platform-governance-service) | `3010` | `platform_governance` |
| 10 | [Property Registry Service](#10-property-registry-service) | `3020` | `property_registry` |
| 11 | [Ratepayer Service](#11-ratepayer-service) | `3030` | `ratepayer_core` |


---

## 1. Reporting Gateway Service

**Base URL:** `http://localhost:3001`  
**Database:** `reporting_gateway`  
**Interactive docs:** `http://localhost:3001/docs`


### `POST /v1/event-batches`

Submit a bounded batch of canonical CloudEvents

**Required permission:** `gateway:ingest`

**Request body** (required):

| Field | Type | Required | Notes |
|---|---|---|---|
| `events` | array<object> | yes |  |
| `events[].specversion` | string | yes | enum: 1.0 |
| `events[].id` | string | yes | length 1- |
| `events[].source` | string | yes | length 1- |
| `events[].type` | string | yes | length 1- |
| `events[].time` | string | yes |  |
| `events[].subject` | string |  |  |
| `events[].dataschema` | string |  |  |
| `events[].datacontenttype` | string |  |  |
| `events[].data` | object | yes |  |

**Response `202`:**

| Field | Type | Required | Notes |
|---|---|---|---|
| `batchCount` | integer | yes |  |
| `acceptedCount` | integer | yes |  |
| `results` | array<object> | yes |  |
| `results[].ingestionId` | string | yes | format: uuid |
| `results[].status` | string | yes |  |
| `results[].eventId` | string | yes |  |
| `results[].receivedAt` | string | yes | format: date-time |
| `results[].statusUrl` | string | yes |  |

**Error responses:** `400`, `401`, `403` — Standard error body (`application/problem+json`) for every non-2xx response: `type`, `title`, `status`, `code`, `requestId`, optional `details`. See **Standard Error Response** above.


### `POST /v1/events`

Submit a single canonical CloudEvent for durable ingestion

**Required permission:** `gateway:ingest`

**Request body** (required):

| Field | Type | Required | Notes |
|---|---|---|---|
| `specversion` | string | yes | enum: 1.0 |
| `id` | string | yes | length 1- |
| `source` | string | yes | length 1- |
| `type` | string | yes | length 1- |
| `time` | string | yes |  |
| `subject` | string |  |  |
| `dataschema` | string |  |  |
| `datacontenttype` | string |  |  |
| `data` | object | yes |  |

**Response `202`:**

| Field | Type | Required | Notes |
|---|---|---|---|
| `ingestionId` | string | yes | format: uuid |
| `status` | string | yes |  |
| `eventId` | string | yes |  |
| `receivedAt` | string | yes | format: date-time |
| `statusUrl` | string | yes |  |

**Error responses:** `400`, `401`, `403` — Standard error body (`application/problem+json`) for every non-2xx response: `type`, `title`, `status`, `code`, `requestId`, optional `details`. See **Standard Error Response** above.


### `GET /v1/ingestions/{id}`

Check status of durable event ingestion

**Required permission:** `gateway:read`

**Path parameters:**

| Name | Type | Required | Notes |
|---|---|---|---|
| `id` | string | yes | format: uuid |

**Response `200`:**

| Field | Type | Required | Notes |
|---|---|---|---|
| `ingestionId` | string | yes | format: uuid |
| `status` | string | yes |  |
| `eventId` | string | yes |  |
| `receivedAt` | string | yes | format: date-time |
| `statusUrl` | string | yes |  |

**Error responses:** `401`, `403`, `404` — Standard error body (`application/problem+json`) for every non-2xx response: `type`, `title`, `status`, `code`, `requestId`, optional `details`. See **Standard Error Response** above.


---

## 2. Event Processing Service

**Base URL:** `http://localhost:3002`  
**Database:** `event_processing`  
**Interactive docs:** `http://localhost:3002/docs`


### `GET /v1/operational-view/{aggregateType}/{aggregateId}`

Retrieve current operational projection of an aggregate

**Required permission:** `events:process`

**Path parameters:**

| Name | Type | Required | Notes |
|---|---|---|---|
| `aggregateType` | string | yes |  |
| `aggregateId` | string | yes |  |

**Response `200`:**

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | string | yes | format: uuid |
| `aggregateType` | string | yes |  |
| `aggregateId` | string | yes |  |
| `concessionId` | string |  | format: uuid |
| `assemblyId` | string |  | format: uuid |
| `currentVersion` | integer | yes |  |
| `lastEventId` | string |  |  |
| `state` | object | yes |  |
| `updatedAt` | string | yes | format: date-time |

**Error responses:** `401`, `403`, `404` — Standard error body (`application/problem+json`) for every non-2xx response: `type`, `title`, `status`, `code`, `requestId`, optional `details`. See **Standard Error Response** above.


### `GET /v1/quarantine`

List quarantined events pending investigation

**Required permission:** `quarantine:manage`

**Response `200`:**

Array of:

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | string | yes | format: uuid |
| `concessionId` | string |  | format: uuid |
| `assemblyId` | string |  | format: uuid |
| `eventId` | string | yes |  |
| `eventType` | string | yes |  |
| `reason` | string | yes |  |
| `status` | string | yes |  |
| `payload` | object |  |  |
| `resolvedBy` | string |  | nullable |
| `resolutionNotes` | string |  | nullable |
| `createdAt` | string | yes | format: date-time |
| `resolvedAt` | string |  | nullable; format: date-time |

**Error responses:** `401`, `403` — Standard error body (`application/problem+json`) for every non-2xx response: `type`, `title`, `status`, `code`, `requestId`, optional `details`. See **Standard Error Response** above.


### `GET /v1/quarantine/{id}`

Get details of a quarantined event

**Required permission:** `quarantine:manage`

**Path parameters:**

| Name | Type | Required | Notes |
|---|---|---|---|
| `id` | string | yes | format: uuid |

**Response `200`:**

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | string | yes | format: uuid |
| `concessionId` | string |  | format: uuid |
| `assemblyId` | string |  | format: uuid |
| `eventId` | string | yes |  |
| `eventType` | string | yes |  |
| `reason` | string | yes |  |
| `status` | string | yes |  |
| `payload` | object |  |  |
| `resolvedBy` | string |  | nullable |
| `resolutionNotes` | string |  | nullable |
| `createdAt` | string | yes | format: date-time |
| `resolvedAt` | string |  | nullable; format: date-time |

**Error responses:** `401`, `403`, `404` — Standard error body (`application/problem+json`) for every non-2xx response: `type`, `title`, `status`, `code`, `requestId`, optional `details`. See **Standard Error Response** above.


### `POST /v1/quarantine/{id}/resolve`

Resolve a quarantined event with investigation notes

**Required permission:** `quarantine:manage`

**Path parameters:**

| Name | Type | Required | Notes |
|---|---|---|---|
| `id` | string | yes | format: uuid |

**Request body** (required):

| Field | Type | Required | Notes |
|---|---|---|---|
| `resolutionNotes` | string | yes | length 3-500 |

**Response `200`:**

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | string | yes | format: uuid |
| `concessionId` | string |  | format: uuid |
| `assemblyId` | string |  | format: uuid |
| `eventId` | string | yes |  |
| `eventType` | string | yes |  |
| `reason` | string | yes |  |
| `status` | string | yes |  |
| `payload` | object |  |  |
| `resolvedBy` | string |  | nullable |
| `resolutionNotes` | string |  | nullable |
| `createdAt` | string | yes | format: date-time |
| `resolvedAt` | string |  | nullable; format: date-time |

**Error responses:** `400`, `401`, `403`, `404` — Standard error body (`application/problem+json`) for every non-2xx response: `type`, `title`, `status`, `code`, `requestId`, optional `details`. See **Standard Error Response** above.


---

## 3. Independent Evidence Service

**Base URL:** `http://localhost:3003`  
**Database:** `independent_evidence`  
**Interactive docs:** `http://localhost:3003/docs`


### `POST /v1/control-totals`

Submit batch control totals for independent financial reconciliation

**Required permission:** `control-totals:submit`

**Request body** (required):

| Field | Type | Required | Notes |
|---|---|---|---|
| `authorityCode` | string | yes | length 2- |
| `periodStart` | string | yes | format: date-time |
| `periodEnd` | string | yes | format: date-time |
| `transactionCount` | integer | yes | min: 0 |
| `totalAmountMinor` | integer | yes | min: 0 |
| `manifestRef` | string | yes | length 1- |

**Response `201`:**

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | string | yes | format: uuid |
| `concessionId` | string | yes | format: uuid |
| `authorityCode` | string | yes |  |
| `periodStart` | string | yes | format: date-time |
| `periodEnd` | string | yes | format: date-time |
| `transactionCount` | integer | yes |  |
| `totalAmountMinor` | integer | yes |  |
| `manifestRef` | string | yes |  |
| `status` | string | yes |  |
| `createdAt` | string | yes | format: date-time |

**Error responses:** `400`, `401`, `403` — Standard error body (`application/problem+json`) for every non-2xx response: `type`, `title`, `status`, `code`, `requestId`, optional `details`. See **Standard Error Response** above.


### `POST /v1/provider-evidence`

Ingest authenticated independent financial feed item (PSP, MoMo, Bank)

**Required permission:** `evidence:submit`

**Request body** (required):

| Field | Type | Required | Notes |
|---|---|---|---|
| `providerId` | string | yes | length 2- |
| `providerRef` | string | yes | length 2- |
| `channel` | string | yes | enum: MOMO, BANK_TRANSFER, CARD, TREASURY |
| `currency` | string |  | default: "GHS" |
| `grossMinor` | integer | yes | min: 0 |
| `feeMinor` | integer |  | min: 0 |
| `netMinor` | integer | yes | min: 0 |
| `paymentTime` | string | yes | format: date-time |
| `declaredOutcome` | string |  | enum: CONFIRMED, FAILED, REVERSED |
| `accountRef` | string |  |  |
| `rawFeed` | object | yes |  |

**Response `201`:**

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | string | yes | format: uuid |
| `providerId` | string | yes |  |
| `providerRef` | string | yes |  |
| `channel` | string | yes |  |
| `grossMinor` | integer | yes |  |
| `declaredOutcome` | string | yes |  |
| `createdAt` | string | yes | format: date-time |

**Error responses:** `400`, `401`, `403` — Standard error body (`application/problem+json`) for every non-2xx response: `type`, `title`, `status`, `code`, `requestId`, optional `details`. See **Standard Error Response** above.


### `GET /v1/provider-evidence/{id}`

Retrieve an independent evidence record

**Required permission:** `evidence:read`

**Path parameters:**

| Name | Type | Required | Notes |
|---|---|---|---|
| `id` | string | yes | format: uuid |

**Response `200`:**

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | string | yes | format: uuid |
| `providerId` | string | yes |  |
| `providerRef` | string | yes |  |
| `channel` | string | yes |  |
| `grossMinor` | integer | yes |  |
| `declaredOutcome` | string | yes |  |
| `createdAt` | string | yes | format: date-time |

**Error responses:** `401`, `403`, `404` — Standard error body (`application/problem+json`) for every non-2xx response: `type`, `title`, `status`, `code`, `requestId`, optional `details`. See **Standard Error Response** above.


---

## 4. Shared Services

**Base URL:** `http://localhost:3004`  
**Database:** `shared_services`  
**Interactive docs:** `http://localhost:3004/docs`


### `GET /v1/assemblies`

List municipal assemblies (MMDAs), optionally filtered by region

**Required permission:** `reference:read`

**Query parameters:**

| Name | Type | Required | Notes |
|---|---|---|---|
| `regionId` | string |  | format: uuid |

**Response `200`:**

Array of:

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | string | yes | format: uuid |
| `regionId` | string | yes | format: uuid |
| `code` | string | yes |  |
| `name` | string | yes |  |
| `category` | string | yes |  |
| `polygonGeoJson` | any |  |  |
| `createdAt` | string | yes | format: date-time |
| `updatedAt` | string |  | format: date-time |

**Error responses:** `401`, `403` — Standard error body (`application/problem+json`) for every non-2xx response: `type`, `title`, `status`, `code`, `requestId`, optional `details`. See **Standard Error Response** above.


### `POST /v1/assemblies`

Create a municipal assembly (MMDA)

**Required permission:** `reference:manage`

**Request body** (required):

| Field | Type | Required | Notes |
|---|---|---|---|
| `regionId` | string | yes | format: uuid |
| `code` | string | yes | length 1-50 |
| `name` | string | yes | length 1-150 |
| `category` | string |  | enum: METROPOLITAN, MUNICIPAL, DISTRICT; default: "DISTRICT" |
| `polygonGeoJson` | object |  |  |

**Response `201`:**

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | string | yes | format: uuid |
| `regionId` | string | yes | format: uuid |
| `code` | string | yes |  |
| `name` | string | yes |  |
| `category` | string | yes |  |
| `polygonGeoJson` | any |  |  |
| `createdAt` | string | yes | format: date-time |
| `updatedAt` | string |  | format: date-time |

**Error responses:** `400`, `401`, `403` — Standard error body (`application/problem+json`) for every non-2xx response: `type`, `title`, `status`, `code`, `requestId`, optional `details`. See **Standard Error Response** above.


### `POST /v1/assemblies/detect-zone`

Point-in-polygon lookup: which MMDA (and region) a coordinate falls inside

**Required permission:** `reference:read`

**Request body** (required):

| Field | Type | Required | Notes |
|---|---|---|---|
| `latitude` | number | yes | min: -90; max: 90 |
| `longitude` | number | yes | min: -180; max: 180 |

**Response `200`:**

| Field | Type | Required | Notes |
|---|---|---|---|
| `matched` | boolean | yes |  |
| `assembly` | any |  |  |
| `region` | any |  |  |

**Error responses:** `400`, `401`, `403` — Standard error body (`application/problem+json`) for every non-2xx response: `type`, `title`, `status`, `code`, `requestId`, optional `details`. See **Standard Error Response** above.


### `POST /v1/assemblies/detect-zone-for-polygon`

Zone-membership check for a property's footprint polygon: which single MMDA it falls inside, or whether it matches none (no MMDA drawn there yet) or more than one (boundary conflict). Used by property-registry-service to validate a property before registering it.

**Required permission:** `reference:read`

**Request body** (required):

| Field | Type | Required | Notes |
|---|---|---|---|
| `polygonGeoJson` | object | yes |  |

**Response `200`:**

| Field | Type | Required | Notes |
|---|---|---|---|
| `status` | string | yes | enum: MATCHED, NO_MATCH, CONFLICT |
| `assembly` | any |  |  |
| `region` | any |  |  |
| `matchedAssemblies` | array<object> |  |  |

**Error responses:** `400`, `401`, `403` — Standard error body (`application/problem+json`) for every non-2xx response: `type`, `title`, `status`, `code`, `requestId`, optional `details`. See **Standard Error Response** above.


### `PATCH /v1/assemblies/{id}/boundary`

Draw or replace an MMDA's boundary polygon

**Required permission:** `reference:manage`

**Path parameters:**

| Name | Type | Required | Notes |
|---|---|---|---|
| `id` | string | yes | format: uuid |

**Request body** (required):

| Field | Type | Required | Notes |
|---|---|---|---|
| `polygonGeoJson` | object | yes |  |
| `polygonGeoJson.type` | string | yes | enum: Polygon, MultiPolygon |
| `polygonGeoJson.coordinates` | array<object> | yes |  |

**Response `200`:**

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | string | yes | format: uuid |
| `regionId` | string | yes | format: uuid |
| `code` | string | yes |  |
| `name` | string | yes |  |
| `category` | string | yes |  |
| `polygonGeoJson` | any |  |  |
| `createdAt` | string | yes | format: date-time |
| `updatedAt` | string |  | format: date-time |

**Error responses:** `400`, `401`, `403`, `404` — Standard error body (`application/problem+json`) for every non-2xx response: `type`, `title`, `status`, `code`, `requestId`, optional `details`. See **Standard Error Response** above.


### `GET /v1/concessions`

Retrieve active concession scopes and boundaries

**Required permission:** `concession:read`

**Response `200`:**

Array of:

**Error responses:** `401`, `403` — Standard error body (`application/problem+json`) for every non-2xx response: `type`, `title`, `status`, `code`, `requestId`, optional `details`. See **Standard Error Response** above.


### `POST /v1/messages`

Submit a shared notification request with idempotency

**Required permission:** `message:send`

**Request body** (required):

| Field | Type | Required | Notes |
|---|---|---|---|
| `recipientRef` | string | yes | length 3- |
| `channel` | string | yes | enum: SMS, EMAIL, PUSH |
| `templateVersion` | string | yes |  |
| `idempotencyKey` | string | yes | length 1- |

**Response `202`:**

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | string | yes | format: uuid |
| `recipientRef` | string | yes |  |
| `channel` | string | yes |  |
| `status` | string | yes |  |
| `deliveryProvider` | string |  | nullable |
| `createdAt` | string | yes | format: date-time |

**Error responses:** `400`, `401`, `403` — Standard error body (`application/problem+json`) for every non-2xx response: `type`, `title`, `status`, `code`, `requestId`, optional `details`. See **Standard Error Response** above.


### `GET /v1/messages/{id}`

Get delivery status of a notification message

**Required permission:** `message:send`

**Path parameters:**

| Name | Type | Required | Notes |
|---|---|---|---|
| `id` | string | yes | format: uuid |

**Response `200`:**

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | string | yes | format: uuid |
| `recipientRef` | string | yes |  |
| `channel` | string | yes |  |
| `status` | string | yes |  |
| `deliveryProvider` | string |  | nullable |
| `createdAt` | string | yes | format: date-time |

**Error responses:** `401`, `403`, `404` — Standard error body (`application/problem+json`) for every non-2xx response: `type`, `title`, `status`, `code`, `requestId`, optional `details`. See **Standard Error Response** above.


### `GET /v1/receipts/{id}/verification`

Public verification of digital payment receipt authenticity

**Required permission:** _none (public once authenticated)_

**Path parameters:**

| Name | Type | Required | Notes |
|---|---|---|---|
| `id` | string | yes |  |

**Response `200`:**

| Field | Type | Required | Notes |
|---|---|---|---|
| `receiptNumber` | string | yes |  |
| `billNumber` | string | yes |  |
| `amountPaidMinor` | integer | yes |  |
| `currency` | string | yes |  |
| `paidAt` | string | yes | format: date-time |
| `status` | string | yes |  |
| `verified` | boolean | yes |  |

**Error responses:** `404` — Standard error body (`application/problem+json`) for every non-2xx response: `type`, `title`, `status`, `code`, `requestId`, optional `details`. See **Standard Error Response** above.


### `GET /v1/reference-data`

Retrieve canonical reference data (authorities, revenue codes, jurisdictions)

**Required permission:** `reference:read`

**Query parameters:**

| Name | Type | Required | Notes |
|---|---|---|---|
| `category` | string |  |  |

**Error responses:** `401`, `403` — Standard error body (`application/problem+json`) for every non-2xx response: `type`, `title`, `status`, `code`, `requestId`, optional `details`. See **Standard Error Response** above.


### `POST /v1/reference-data`

Create or update canonical reference data item

**Required permission:** _none (public once authenticated)_

**Response `200`:**

_(no body / empty object)_


### `DELETE /v1/reference-data/{id}`

Delete canonical reference data item

**Required permission:** _none (public once authenticated)_

**Path parameters:**

| Name | Type | Required | Notes |
|---|---|---|---|
| `id` | string | yes | format: uuid |

**Response `200`:**

_(no body / empty object)_


### `GET /v1/regions`

List regions

**Required permission:** `reference:read`

**Response `200`:**

Array of:

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | string | yes | format: uuid |
| `code` | string | yes |  |
| `name` | string | yes |  |
| `polygonGeoJson` | any |  |  |
| `createdAt` | string | yes | format: date-time |
| `updatedAt` | string |  | format: date-time |

**Error responses:** `401`, `403` — Standard error body (`application/problem+json`) for every non-2xx response: `type`, `title`, `status`, `code`, `requestId`, optional `details`. See **Standard Error Response** above.


### `POST /v1/regions`

Create a region

**Required permission:** `reference:manage`

**Request body** (required):

| Field | Type | Required | Notes |
|---|---|---|---|
| `code` | string | yes | length 1-20 |
| `name` | string | yes | length 1-100 |
| `polygonGeoJson` | object |  |  |

**Response `201`:**

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | string | yes | format: uuid |
| `code` | string | yes |  |
| `name` | string | yes |  |
| `polygonGeoJson` | any |  |  |
| `createdAt` | string | yes | format: date-time |
| `updatedAt` | string |  | format: date-time |

**Error responses:** `400`, `401`, `403` — Standard error body (`application/problem+json`) for every non-2xx response: `type`, `title`, `status`, `code`, `requestId`, optional `details`. See **Standard Error Response** above.


### `PATCH /v1/regions/{id}/boundary`

Draw or replace a region's boundary polygon

**Required permission:** `reference:manage`

**Path parameters:**

| Name | Type | Required | Notes |
|---|---|---|---|
| `id` | string | yes | format: uuid |

**Request body** (required):

| Field | Type | Required | Notes |
|---|---|---|---|
| `polygonGeoJson` | object | yes |  |
| `polygonGeoJson.type` | string | yes | enum: Polygon, MultiPolygon |
| `polygonGeoJson.coordinates` | array<object> | yes |  |

**Response `200`:**

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | string | yes | format: uuid |
| `code` | string | yes |  |
| `name` | string | yes |  |
| `polygonGeoJson` | any |  |  |
| `createdAt` | string | yes | format: date-time |
| `updatedAt` | string |  | format: date-time |

**Error responses:** `400`, `401`, `403`, `404` — Standard error body (`application/problem+json`) for every non-2xx response: `type`, `title`, `status`, `code`, `requestId`, optional `details`. See **Standard Error Response** above.


---

## 5. Oversight & Reconciliation Service

**Base URL:** `http://localhost:3005`  
**Database:** `oversight_reconciliation`  
**Interactive docs:** `http://localhost:3005/docs`


### `GET /v1/exceptions`

Query open reconciliation variance exceptions

**Required permission:** `exceptions:manage`

**Response `200`:**

Array of:

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | string | yes | format: uuid |
| `runId` | string | yes | format: uuid |
| `concessionId` | string | yes | format: uuid |
| `severity` | string | yes |  |
| `status` | string | yes |  |
| `reportedRef` | string |  | nullable |
| `evidenceRef` | string |  | nullable |
| `varianceMinor` | integer | yes |  |
| `reasonCode` | string | yes |  |
| `createdAt` | string | yes | format: date-time |

**Error responses:** `401`, `403` — Standard error body (`application/problem+json`) for every non-2xx response: `type`, `title`, `status`, `code`, `requestId`, optional `details`. See **Standard Error Response** above.


### `POST /v1/exceptions/{id}/action`

Execute maker-checker resolution action on an open exception

**Required permission:** `exceptions:manage`

**Path parameters:**

| Name | Type | Required | Notes |
|---|---|---|---|
| `id` | string | yes | format: uuid |

**Request body** (required):

| Field | Type | Required | Notes |
|---|---|---|---|
| `action` | string | yes | enum: APPROVE, OVERRIDE, DISPUTE |
| `notes` | string | yes | length 3-500 |

**Response `200`:**

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | string | yes | format: uuid |
| `runId` | string | yes | format: uuid |
| `concessionId` | string | yes | format: uuid |
| `severity` | string | yes |  |
| `status` | string | yes |  |
| `reportedRef` | string |  | nullable |
| `evidenceRef` | string |  | nullable |
| `varianceMinor` | integer | yes |  |
| `reasonCode` | string | yes |  |
| `createdAt` | string | yes | format: date-time |

**Error responses:** `400`, `401`, `403`, `404` — Standard error body (`application/problem+json`) for every non-2xx response: `type`, `title`, `status`, `code`, `requestId`, optional `details`. See **Standard Error Response** above.


### `GET /v1/oversight/metrics`

National collection efficiency and consolidated financial KPIs

**Required permission:** `oversight:read`

**Response `200`:**

_(no body / empty object)_

**Error responses:** `401`, `403` — Standard error body (`application/problem+json`) for every non-2xx response: `type`, `title`, `status`, `code`, `requestId`, optional `details`. See **Standard Error Response** above.


### `POST /v1/reconciliation/run`

Initiate 3-way financial reconciliation run for a reporting period

**Required permission:** `reconciliation:run`

**Request body** (required):

| Field | Type | Required | Notes |
|---|---|---|---|
| `periodStart` | string | yes | format: date-time |
| `periodEnd` | string | yes | format: date-time |

**Response `201`:**

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | string | yes | format: uuid |
| `concessionId` | string | yes | format: uuid |
| `periodStart` | string | yes | format: date-time |
| `periodEnd` | string | yes | format: date-time |
| `status` | string | yes |  |
| `totalReportedMinor` | integer |  |  |
| `totalEvidenceMinor` | integer |  |  |
| `totalSettledMinor` | integer |  |  |
| `matchedCount` | integer | yes |  |
| `unmatchedCount` | integer | yes |  |
| `createdAt` | string | yes | format: date-time |

**Error responses:** `400`, `401`, `403` — Standard error body (`application/problem+json`) for every non-2xx response: `type`, `title`, `status`, `code`, `requestId`, optional `details`. See **Standard Error Response** above.


### `GET /v1/reconciliation/runs`

List historical reconciliation runs for this tenant

**Required permission:** `reconciliation:read`

**Response `200`:**

Array of:

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | string | yes | format: uuid |
| `concessionId` | string | yes | format: uuid |
| `periodStart` | string | yes | format: date-time |
| `periodEnd` | string | yes | format: date-time |
| `status` | string | yes |  |
| `totalReportedMinor` | integer |  |  |
| `totalEvidenceMinor` | integer |  |  |
| `totalSettledMinor` | integer |  |  |
| `matchedCount` | integer | yes |  |
| `unmatchedCount` | integer | yes |  |
| `createdAt` | string | yes | format: date-time |

**Error responses:** `401`, `403` — Standard error body (`application/problem+json`) for every non-2xx response: `type`, `title`, `status`, `code`, `requestId`, optional `details`. See **Standard Error Response** above.


---

## 6. Audit Assurance Service

**Base URL:** `http://localhost:3006`  
**Database:** `audit_assurance`  
**Interactive docs:** `http://localhost:3006/docs`


### `GET /v1/assurance/trace/{targetId}`

End-to-end auditor trace: follow national figure through applied events to independent evidence

**Required permission:** `audit:read`

**Path parameters:**

| Name | Type | Required | Notes |
|---|---|---|---|
| `targetId` | string | yes |  |

**Response `200`:**

| Field | Type | Required | Notes |
|---|---|---|---|
| `targetId` | string | yes |  |
| `tracedAt` | string | yes | format: date-time |
| `evidenceChain` | array<object> | yes |  |
| `integrityVerified` | boolean | yes |  |

**Error responses:** `401`, `403`, `404` — Standard error body (`application/problem+json`) for every non-2xx response: `type`, `title`, `status`, `code`, `requestId`, optional `details`. See **Standard Error Response** above.


### `POST /v1/assurance/verify`

Cryptographically verify an immutable event archive manifest

**Required permission:** `assurance:verify`

**Request body** (required):

| Field | Type | Required | Notes |
|---|---|---|---|
| `batchId` | string | yes |  |

**Response `200`:**

| Field | Type | Required | Notes |
|---|---|---|---|
| `batchId` | string | yes |  |
| `eventCount` | integer | yes |  |
| `merkleRoot` | string | yes |  |
| `status` | string | yes |  |
| `verified` | boolean | yes |  |
| `verifiedAt` | string | yes | format: date-time |

**Error responses:** `400`, `401`, `403`, `404` — Standard error body (`application/problem+json`) for every non-2xx response: `type`, `title`, `status`, `code`, `requestId`, optional `details`. See **Standard Error Response** above.


### `GET /v1/audit/records`

Query tamper-evident audit logs with cryptographic hash signatures

**Required permission:** `audit:read`

**Response `200`:**

Array of:

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | string | yes | format: uuid |
| `occurredAt` | string | yes | format: date-time |
| `actorId` | string | yes |  |
| `actorType` | string |  |  |
| `concessionId` | string |  | nullable; format: uuid |
| `assemblyId` | string |  | nullable; format: uuid |
| `action` | string | yes |  |
| `resourceType` | string | yes |  |
| `resourceId` | string |  | nullable |
| `requestId` | string |  |  |
| `outcome` | string | yes |  |
| `recordHash` | string | yes |  |

**Error responses:** `401`, `403` — Standard error body (`application/problem+json`) for every non-2xx response: `type`, `title`, `status`, `code`, `requestId`, optional `details`. See **Standard Error Response** above.


---

## 7. Billing & Payments Service

**Base URL:** `http://localhost:3007`  
**Database:** `billing_payments`  
**Interactive docs:** `http://localhost:3007/docs`


### `GET /v1/bills`

CROIP portal: paginated, searchable bill directory (oversight view across all ratepayers)

**Required permission:** `bills:read`

**Query parameters:**

| Name | Type | Required | Notes |
|---|---|---|---|
| `search` | string |  |  |
| `paymentStatus` | string |  | enum: UNPAID, PARTIALLY_PAID, PAID |
| `ratepayerId` | string |  | format: uuid |
| `propertyId` | string |  | format: uuid |
| `page` | integer |  | min: 1; default: 1 |
| `pageSize` | integer |  | min: 1; max: 100; default: 20 |

**Response `200`:**

| Field | Type | Required | Notes |
|---|---|---|---|
| `items` | array<object> | yes |  |
| `items[].id` | string | yes | format: uuid |
| `items[].billNumber` | string | yes |  |
| `items[].propertyId` | string | yes | format: uuid |
| `items[].ratepayerId` | string | yes | format: uuid |
| `items[].concessionId` | string |  | format: uuid |
| `items[].issuedByPersonnelId` | string |  | nullable |
| `items[].supersedesBillId` | string |  | nullable; format: uuid |
| `items[].billingPeriod` | string | yes |  |
| `items[].billType` | string |  |  |
| `items[].currency` | string |  |  |
| `items[].amountDue` | any | yes |  |
| `items[].amountPaid` | any | yes |  |
| `items[].paymentStatus` | string | yes |  |
| `items[].issuedAt` | string |  | format: date-time |
| `items[].dueDate` | string | yes |  |
| `items[].externalBillRef` | string |  |  |
| `items[].payments` | array<object> |  |  |
| `items[].payments[].id` | string | yes | format: uuid |
| `items[].payments[].billId` | string | yes | format: uuid |
| `items[].payments[].paymentLinkId` | string |  | nullable; format: uuid |
| `items[].payments[].paidByRatepayerId` | string |  | nullable; format: uuid |
| `items[].payments[].clientEventId` | string |  | format: uuid |
| `items[].payments[].externalPaymentRef` | string |  |  |
| `items[].payments[].paymentType` | string |  |  |
| `items[].payments[].amount` | any | yes |  |
| `items[].payments[].balanceAtPayment` | any | yes |  |
| `items[].payments[].status` | string | yes |  |
| `items[].payments[].paidAt` | string | yes | format: date-time |
| `items[].payments[].receivedAt` | string |  | format: date-time |
| `total` | integer | yes |  |
| `page` | integer | yes |  |
| `pageSize` | integer | yes |  |
| `totalPages` | integer | yes |  |

**Error responses:** `401`, `403` — Standard error body (`application/problem+json`) for every non-2xx response: `type`, `title`, `status`, `code`, `requestId`, optional `details`. See **Standard Error Response** above.


### `POST /v1/bills`

Issue a property bill for a billing period

**Required permission:** `bills:issue`

**Request body** (required):

| Field | Type | Required | Notes |
|---|---|---|---|
| `propertyId` | string | yes | format: uuid |
| `ratepayerId` | string | yes | format: uuid |
| `billingPeriod` | string | yes | length 1-20 |
| `amountDue` | number | yes | > 0 |
| `dueDate` | string | yes | format: date |
| `billType` | string |  | enum: ASSESSED, SUPPLEMENTARY, ADJUSTMENT; default: "ASSESSED" |
| `externalBillRef` | string | yes | length 1-100 |

**Response `201`:**

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | string | yes | format: uuid |
| `billNumber` | string | yes |  |
| `propertyId` | string | yes | format: uuid |
| `ratepayerId` | string | yes | format: uuid |
| `concessionId` | string |  | format: uuid |
| `issuedByPersonnelId` | string |  | nullable |
| `supersedesBillId` | string |  | nullable; format: uuid |
| `billingPeriod` | string | yes |  |
| `billType` | string |  |  |
| `currency` | string |  |  |
| `amountDue` | any | yes |  |
| `amountPaid` | any | yes |  |
| `paymentStatus` | string | yes |  |
| `issuedAt` | string |  | format: date-time |
| `dueDate` | string | yes |  |
| `externalBillRef` | string |  |  |
| `payments` | array<object> |  |  |
| `payments[].id` | string | yes | format: uuid |
| `payments[].billId` | string | yes | format: uuid |
| `payments[].paymentLinkId` | string |  | nullable; format: uuid |
| `payments[].paidByRatepayerId` | string |  | nullable; format: uuid |
| `payments[].clientEventId` | string |  | format: uuid |
| `payments[].externalPaymentRef` | string |  |  |
| `payments[].paymentType` | string |  |  |
| `payments[].amount` | any | yes |  |
| `payments[].balanceAtPayment` | any | yes |  |
| `payments[].status` | string | yes |  |
| `payments[].paidAt` | string | yes | format: date-time |
| `payments[].receivedAt` | string |  | format: date-time |

**Error responses:** `400`, `401`, `403` — Standard error body (`application/problem+json`) for every non-2xx response: `type`, `title`, `status`, `code`, `requestId`, optional `details`. See **Standard Error Response** above.


### `GET /v1/bills/{billNumber}`

Retrieve a bill and its payment history

**Required permission:** `bills:read`

**Path parameters:**

| Name | Type | Required | Notes |
|---|---|---|---|
| `billNumber` | string | yes |  |

**Response `200`:**

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | string | yes | format: uuid |
| `billNumber` | string | yes |  |
| `propertyId` | string | yes | format: uuid |
| `ratepayerId` | string | yes | format: uuid |
| `concessionId` | string |  | format: uuid |
| `issuedByPersonnelId` | string |  | nullable |
| `supersedesBillId` | string |  | nullable; format: uuid |
| `billingPeriod` | string | yes |  |
| `billType` | string |  |  |
| `currency` | string |  |  |
| `amountDue` | any | yes |  |
| `amountPaid` | any | yes |  |
| `paymentStatus` | string | yes |  |
| `issuedAt` | string |  | format: date-time |
| `dueDate` | string | yes |  |
| `externalBillRef` | string |  |  |
| `payments` | array<object> |  |  |
| `payments[].id` | string | yes | format: uuid |
| `payments[].billId` | string | yes | format: uuid |
| `payments[].paymentLinkId` | string |  | nullable; format: uuid |
| `payments[].paidByRatepayerId` | string |  | nullable; format: uuid |
| `payments[].clientEventId` | string |  | format: uuid |
| `payments[].externalPaymentRef` | string |  |  |
| `payments[].paymentType` | string |  |  |
| `payments[].amount` | any | yes |  |
| `payments[].balanceAtPayment` | any | yes |  |
| `payments[].status` | string | yes |  |
| `payments[].paidAt` | string | yes | format: date-time |
| `payments[].receivedAt` | string |  | format: date-time |

**Error responses:** `401`, `403`, `404` — Standard error body (`application/problem+json`) for every non-2xx response: `type`, `title`, `status`, `code`, `requestId`, optional `details`. See **Standard Error Response** above.


### `POST /v1/bills/{billNumber}/payments`

Record a full or partial payment against a bill (supports paying for another ratepayer)

**Required permission:** `payments:receive`

**Path parameters:**

| Name | Type | Required | Notes |
|---|---|---|---|
| `billNumber` | string | yes |  |

**Request body** (required):

| Field | Type | Required | Notes |
|---|---|---|---|
| `amount` | number | yes | > 0 |
| `paidByRatepayerId` | string |  | format: uuid |
| `externalPaymentRef` | string | yes | length 1-100 |
| `clientEventId` | string | yes | format: uuid |
| `paidAt` | string | yes | format: date-time |

**Response `200`:**

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | string | yes | format: uuid |
| `billId` | string | yes | format: uuid |
| `paymentLinkId` | string |  | nullable; format: uuid |
| `paidByRatepayerId` | string |  | nullable; format: uuid |
| `clientEventId` | string |  | format: uuid |
| `externalPaymentRef` | string |  |  |
| `paymentType` | string |  |  |
| `amount` | any | yes |  |
| `balanceAtPayment` | any | yes |  |
| `status` | string | yes |  |
| `paidAt` | string | yes | format: date-time |
| `receivedAt` | string |  | format: date-time |

**Response `201`:**

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | string | yes | format: uuid |
| `billId` | string | yes | format: uuid |
| `paymentLinkId` | string |  | nullable; format: uuid |
| `paidByRatepayerId` | string |  | nullable; format: uuid |
| `clientEventId` | string |  | format: uuid |
| `externalPaymentRef` | string |  |  |
| `paymentType` | string |  |  |
| `amount` | any | yes |  |
| `balanceAtPayment` | any | yes |  |
| `status` | string | yes |  |
| `paidAt` | string | yes | format: date-time |
| `receivedAt` | string |  | format: date-time |

**Error responses:** `400`, `401`, `403`, `404` — Standard error body (`application/problem+json`) for every non-2xx response: `type`, `title`, `status`, `code`, `requestId`, optional `details`. See **Standard Error Response** above.


### `GET /v1/me/bills`

List the caller's own bills, including bills they have paid on behalf of another ratepayer

**Required permission:** `bills:read`

**Response `200`:**

Array of:

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | string | yes | format: uuid |
| `billNumber` | string | yes |  |
| `propertyId` | string | yes | format: uuid |
| `ratepayerId` | string | yes | format: uuid |
| `concessionId` | string |  | format: uuid |
| `issuedByPersonnelId` | string |  | nullable |
| `supersedesBillId` | string |  | nullable; format: uuid |
| `billingPeriod` | string | yes |  |
| `billType` | string |  |  |
| `currency` | string |  |  |
| `amountDue` | any | yes |  |
| `amountPaid` | any | yes |  |
| `paymentStatus` | string | yes |  |
| `issuedAt` | string |  | format: date-time |
| `dueDate` | string | yes |  |
| `externalBillRef` | string |  |  |
| `payments` | array<object> |  |  |
| `payments[].id` | string | yes | format: uuid |
| `payments[].billId` | string | yes | format: uuid |
| `payments[].paymentLinkId` | string |  | nullable; format: uuid |
| `payments[].paidByRatepayerId` | string |  | nullable; format: uuid |
| `payments[].clientEventId` | string |  | format: uuid |
| `payments[].externalPaymentRef` | string |  |  |
| `payments[].paymentType` | string |  |  |
| `payments[].amount` | any | yes |  |
| `payments[].balanceAtPayment` | any | yes |  |
| `payments[].status` | string | yes |  |
| `payments[].paidAt` | string | yes | format: date-time |
| `payments[].receivedAt` | string |  | format: date-time |

**Error responses:** `401`, `403` — Standard error body (`application/problem+json`) for every non-2xx response: `type`, `title`, `status`, `code`, `requestId`, optional `details`. See **Standard Error Response** above.


### `POST /v1/payment-links`

Create a fixed-amount payment link for third-party gateway checkout

**Required permission:** `payments:receive`

**Request body** (required):

| Field | Type | Required | Notes |
|---|---|---|---|
| `billId` | string | yes | format: uuid |
| `amountFixed` | number | yes | > 0 |
| `expiresAt` | string | yes | format: date-time |
| `gatewayLinkRef` | string | yes | length 1-100 |

**Response `201`:**

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | string | yes | format: uuid |
| `billId` | string | yes | format: uuid |
| `amountFixed` | any | yes |  |
| `status` | string | yes |  |
| `expiresAt` | string | yes | format: date-time |
| `gatewayLinkRef` | string | yes |  |
| `createdAt` | string |  | format: date-time |

**Error responses:** `400`, `401`, `403`, `404` — Standard error body (`application/problem+json`) for every non-2xx response: `type`, `title`, `status`, `code`, `requestId`, optional `details`. See **Standard Error Response** above.


### `GET /v1/payments`

CROIP portal: paginated, searchable payment ledger across all bills and ratepayers

**Required permission:** `payments:receive`

**Query parameters:**

| Name | Type | Required | Notes |
|---|---|---|---|
| `search` | string |  |  |
| `status` | string |  |  |
| `paidByRatepayerId` | string |  | format: uuid |
| `page` | integer |  | min: 1; default: 1 |
| `pageSize` | integer |  | min: 1; max: 100; default: 20 |

**Response `200`:**

| Field | Type | Required | Notes |
|---|---|---|---|
| `items` | array<object> | yes |  |
| `items[].id` | string | yes | format: uuid |
| `items[].billId` | string | yes | format: uuid |
| `items[].paymentLinkId` | string |  | nullable; format: uuid |
| `items[].paidByRatepayerId` | string |  | nullable; format: uuid |
| `items[].clientEventId` | string |  | format: uuid |
| `items[].externalPaymentRef` | string |  |  |
| `items[].paymentType` | string |  |  |
| `items[].amount` | any | yes |  |
| `items[].balanceAtPayment` | any | yes |  |
| `items[].status` | string | yes |  |
| `items[].paidAt` | string | yes | format: date-time |
| `items[].receivedAt` | string |  | format: date-time |
| `items[].bill` | object |  |  |
| `items[].bill.id` | string |  | format: uuid |
| `items[].bill.billNumber` | string |  |  |
| `items[].bill.ratepayerId` | string |  | format: uuid |
| `items[].bill.propertyId` | string |  | format: uuid |
| `items[].bill.currency` | string |  |  |
| `total` | integer | yes |  |
| `page` | integer | yes |  |
| `pageSize` | integer | yes |  |
| `totalPages` | integer | yes |  |

**Error responses:** `401`, `403` — Standard error body (`application/problem+json`) for every non-2xx response: `type`, `title`, `status`, `code`, `requestId`, optional `details`. See **Standard Error Response** above.


---

## 8. Dispute Service

**Base URL:** `http://localhost:3008`  
**Database:** `disputes`  
**Interactive docs:** `http://localhost:3008/docs`


### `GET /v1/disputes`

Review queue: list disputes, optionally filtered by status or assignee

**Required permission:** `disputes:read`

**Query parameters:**

| Name | Type | Required | Notes |
|---|---|---|---|
| `status` | string |  | enum: OPEN, UNDER_REVIEW, RESOLVED, REJECTED |
| `assignedToPersonnelId` | string |  | format: uuid |

**Response `200`:**

Array of:

**Error responses:** `401`, `403` — Standard error body (`application/problem+json`) for every non-2xx response: `type`, `title`, `status`, `code`, `requestId`, optional `details`. See **Standard Error Response** above.


### `POST /v1/disputes`

Raise a billing, boundary, or valuation dispute

**Required permission:** `disputes:raise`

**Request body** (required):

| Field | Type | Required | Notes |
|---|---|---|---|
| `disputeType` | string | yes | enum: BILLING, BOUNDARY, VALUATION |
| `propertyId` | string |  | format: uuid |
| `billId` | string |  | format: uuid |
| `note` | string | yes | length 1-4000 |

**Response `201`:**

_(no body / empty object)_

**Error responses:** `400`, `401`, `403` — Standard error body (`application/problem+json`) for every non-2xx response: `type`, `title`, `status`, `code`, `requestId`, optional `details`. See **Standard Error Response** above.


### `GET /v1/disputes/{code}`

Retrieve a dispute with its evidence and comments

**Required permission:** `disputes:read`

**Path parameters:**

| Name | Type | Required | Notes |
|---|---|---|---|
| `code` | string | yes |  |

**Response `200`:**

_(no body / empty object)_

**Error responses:** `401`, `403`, `404` — Standard error body (`application/problem+json`) for every non-2xx response: `type`, `title`, `status`, `code`, `requestId`, optional `details`. See **Standard Error Response** above.


### `POST /v1/disputes/{code}/comments`

Add a comment to a dispute thread

**Required permission:** _none (public once authenticated)_

**Path parameters:**

| Name | Type | Required | Notes |
|---|---|---|---|
| `code` | string | yes |  |

**Request body** (required):

| Field | Type | Required | Notes |
|---|---|---|---|
| `body` | string | yes | length 1-4000 |

**Response `201`:**

_(no body / empty object)_

**Error responses:** `400`, `401`, `403`, `404` — Standard error body (`application/problem+json`) for every non-2xx response: `type`, `title`, `status`, `code`, `requestId`, optional `details`. See **Standard Error Response** above.


### `POST /v1/disputes/{code}/evidence`

Attach evidence media to a dispute

**Required permission:** _none (public once authenticated)_

**Path parameters:**

| Name | Type | Required | Notes |
|---|---|---|---|
| `code` | string | yes |  |

**Request body** (required):

| Field | Type | Required | Notes |
|---|---|---|---|
| `mediaUrl` | string | yes | length 1-500 |

**Response `201`:**

_(no body / empty object)_

**Error responses:** `400`, `401`, `403`, `404` — Standard error body (`application/problem+json`) for every non-2xx response: `type`, `title`, `status`, `code`, `requestId`, optional `details`. See **Standard Error Response** above.


### `PATCH /v1/disputes/{code}/status`

Officer transitions a dispute forward through review to resolution

**Required permission:** `disputes:review`

**Path parameters:**

| Name | Type | Required | Notes |
|---|---|---|---|
| `code` | string | yes |  |

**Request body** (required):

| Field | Type | Required | Notes |
|---|---|---|---|
| `status` | string | yes | enum: UNDER_REVIEW, RESOLVED, REJECTED |
| `resolution` | string |  | length -4000 |

**Response `200`:**

_(no body / empty object)_

**Error responses:** `400`, `401`, `403`, `404` — Standard error body (`application/problem+json`) for every non-2xx response: `type`, `title`, `status`, `code`, `requestId`, optional `details`. See **Standard Error Response** above.


### `GET /v1/me/disputes`

List the caller's own disputes

**Required permission:** `disputes:read`

**Response `200`:**

Array of:

**Error responses:** `401`, `403` — Standard error body (`application/problem+json`) for every non-2xx response: `type`, `title`, `status`, `code`, `requestId`, optional `details`. See **Standard Error Response** above.


---

## 9. Platform Governance Service

**Base URL:** `http://localhost:3010`  
**Database:** `platform_governance`  
**Interactive docs:** `http://localhost:3010/docs`


### `GET /v1/concessions`

List onboarded concessionaires

**Required permission:** `concessionaires:read`

**Response `200`:**

Array of:

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | string | yes | format: uuid |
| `code` | string | yes |  |
| `name` | string | yes |  |
| `contactEmail` | string | yes |  |
| `status` | string | yes |  |
| `createdAt` | string | yes | format: date-time |

**Error responses:** `401`, `403` — Standard error body (`application/problem+json`) for every non-2xx response: `type`, `title`, `status`, `code`, `requestId`, optional `details`. See **Standard Error Response** above.


### `POST /v1/concessions`

Onboard a partner revenue concessionaire company

**Required permission:** `concessionaires:manage`

**Request body** (required):

| Field | Type | Required | Notes |
|---|---|---|---|
| `code` | string | yes | length 2-50 |
| `name` | string | yes | length 2-150 |
| `contactEmail` | string | yes | format: email |

**Response `201`:**

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | string | yes | format: uuid |
| `code` | string | yes |  |
| `name` | string | yes |  |
| `contactEmail` | string | yes |  |
| `status` | string | yes |  |
| `createdAt` | string | yes | format: date-time |

**Error responses:** `400`, `401`, `403` — Standard error body (`application/problem+json`) for every non-2xx response: `type`, `title`, `status`, `code`, `requestId`, optional `details`. See **Standard Error Response** above.


### `GET /v1/concessions/{id}`

Get a single concessionaire

**Required permission:** `concessionaires:read`

**Path parameters:**

| Name | Type | Required | Notes |
|---|---|---|---|
| `id` | string | yes | format: uuid |

**Response `200`:**

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | string | yes | format: uuid |
| `code` | string | yes |  |
| `name` | string | yes |  |
| `contactEmail` | string | yes |  |
| `status` | string | yes |  |
| `createdAt` | string | yes | format: date-time |

**Error responses:** `401`, `403`, `404` — Standard error body (`application/problem+json`) for every non-2xx response: `type`, `title`, `status`, `code`, `requestId`, optional `details`. See **Standard Error Response** above.


### `GET /v1/concessions/{id}/api-clients`

List a concessionaire's API clients (never includes secrets — those are shown once, at provisioning time, in the provision response)

**Required permission:** `api_clients:manage`

**Path parameters:**

| Name | Type | Required | Notes |
|---|---|---|---|
| `id` | string | yes | format: uuid |

**Response `200`:**

Array of:

**Error responses:** `401`, `403` — Standard error body (`application/problem+json`) for every non-2xx response: `type`, `title`, `status`, `code`, `requestId`, optional `details`. See **Standard Error Response** above.


### `POST /v1/concessions/{id}/api-clients`

Provision machine-to-machine API credentials for a concessionaire backend

**Required permission:** `api_clients:manage`

**Path parameters:**

| Name | Type | Required | Notes |
|---|---|---|---|
| `id` | string | yes | format: uuid |

**Response `201`:**

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | string | yes | format: uuid |
| `concessionId` | string | yes | format: uuid |
| `clientId` | string | yes |  |
| `clientSecret` | string | yes |  |
| `status` | string | yes |  |
| `expiresAt` | string | yes | format: date-time |

**Error responses:** `401`, `403` — Standard error body (`application/problem+json`) for every non-2xx response: `type`, `title`, `status`, `code`, `requestId`, optional `details`. See **Standard Error Response** above.


### `GET /v1/concessions/{id}/assemblies`

List MMDAs assigned to a concessionaire

**Required permission:** `concessionaires:read`

**Path parameters:**

| Name | Type | Required | Notes |
|---|---|---|---|
| `id` | string | yes | format: uuid |

**Response `200`:**

Array of:

**Error responses:** `401`, `403` — Standard error body (`application/problem+json`) for every non-2xx response: `type`, `title`, `status`, `code`, `requestId`, optional `details`. See **Standard Error Response** above.


### `POST /v1/concessions/{id}/assemblies`

Assign an MMDA rating concession territory to a concessionaire

**Required permission:** `concessionaires:manage`

**Path parameters:**

| Name | Type | Required | Notes |
|---|---|---|---|
| `id` | string | yes | format: uuid |

**Request body** (required):

| Field | Type | Required | Notes |
|---|---|---|---|
| `assemblyId` | string | yes | format: uuid |
| `contractStart` | string | yes | format: date |
| `contractEnd` | string | yes | format: date |

**Response `201`:**

_(no body / empty object)_

**Error responses:** `400`, `401`, `403` — Standard error body (`application/problem+json`) for every non-2xx response: `type`, `title`, `status`, `code`, `requestId`, optional `details`. See **Standard Error Response** above.


### `POST /v1/concessions/{id}/deactivate`

Offboard a concessionaire (sets status to INACTIVE; does not delete history)

**Required permission:** `concessionaires:manage`

**Path parameters:**

| Name | Type | Required | Notes |
|---|---|---|---|
| `id` | string | yes | format: uuid |

**Response `200`:**

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | string | yes | format: uuid |
| `code` | string | yes |  |
| `name` | string | yes |  |
| `contactEmail` | string | yes |  |
| `status` | string | yes |  |
| `createdAt` | string | yes | format: date-time |

**Error responses:** `401`, `403`, `404` — Standard error body (`application/problem+json`) for every non-2xx response: `type`, `title`, `status`, `code`, `requestId`, optional `details`. See **Standard Error Response** above.


### `GET /v1/concessions/{id}/personnel`

List external field personnel for a concession

**Required permission:** `concessionaires:read`

**Path parameters:**

| Name | Type | Required | Notes |
|---|---|---|---|
| `id` | string | yes | format: uuid |

**Response `200`:**

Array of:

**Error responses:** `401`, `403` — Standard error body (`application/problem+json`) for every non-2xx response: `type`, `title`, `status`, `code`, `requestId`, optional `details`. See **Standard Error Response** above.


### `POST /v1/concessions/{id}/personnel`

Register external concession field personnel for audit verification trails

**Required permission:** `concessionaires:manage`

**Path parameters:**

| Name | Type | Required | Notes |
|---|---|---|---|
| `id` | string | yes | format: uuid |

**Request body** (required):

| Field | Type | Required | Notes |
|---|---|---|---|
| `externalStaffRef` | string | yes | length 2-100 |
| `fullName` | string | yes | length 2-150 |
| `phone` | string | yes | length 7-30 |

**Response `201`:**

_(no body / empty object)_

**Error responses:** `400`, `401`, `403` — Standard error body (`application/problem+json`) for every non-2xx response: `type`, `title`, `status`, `code`, `requestId`, optional `details`. See **Standard Error Response** above.


### `GET /v1/rbac/matrix`

Access matrix: roles × resources × actions with current grants

**Required permission:** `iam:roles_assign`

**Response `200`:**

_(no body / empty object)_

**Error responses:** `401`, `403` — Standard error body (`application/problem+json`) for every non-2xx response: `type`, `title`, `status`, `code`, `requestId`, optional `details`. See **Standard Error Response** above.


### `PUT /v1/rbac/roles/{roleId}/permissions/{permissionId}`

Grant a permission to a role

**Required permission:** `iam:roles_assign`

**Path parameters:**

| Name | Type | Required | Notes |
|---|---|---|---|
| `roleId` | string | yes | format: uuid |
| `permissionId` | string | yes | format: uuid |

**Response `200`:**

_(no body / empty object)_

**Error responses:** `401`, `403`, `404`, `409` — Standard error body (`application/problem+json`) for every non-2xx response: `type`, `title`, `status`, `code`, `requestId`, optional `details`. See **Standard Error Response** above.


### `DELETE /v1/rbac/roles/{roleId}/permissions/{permissionId}`

Revoke a permission from a role

**Required permission:** `iam:roles_assign`

**Path parameters:**

| Name | Type | Required | Notes |
|---|---|---|---|
| `roleId` | string | yes | format: uuid |
| `permissionId` | string | yes | format: uuid |

**Response `200`:**

_(no body / empty object)_

**Error responses:** `401`, `403`, `404`, `409` — Standard error body (`application/problem+json`) for every non-2xx response: `type`, `title`, `status`, `code`, `requestId`, optional `details`. See **Standard Error Response** above.


### `GET /v1/roles`

List active roles that can be assigned to users

**Required permission:** `iam:users_manage`

**Response `200`:**

Array of:

**Error responses:** `401`, `403` — Standard error body (`application/problem+json`) for every non-2xx response: `type`, `title`, `status`, `code`, `requestId`, optional `details`. See **Standard Error Response** above.


### `GET /v1/users`

List Central Platform oversight staff and officers

**Required permission:** `iam:users_manage`

**Response `200`:**

Array of:

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | string | yes | format: uuid |
| `code` | string | yes |  |
| `zitadelId` | string | yes |  |
| `countryId` | string |  | nullable; format: uuid |
| `email` | string | yes |  |
| `fullName` | string | yes |  |
| `phone` | string |  | nullable |
| `status` | string | yes |  |
| `invitedAt` | string |  | nullable; format: date-time |
| `invitedViaStub` | boolean |  |  |
| `realInviteSent` | boolean |  |  |
| `createdAt` | string | yes | format: date-time |
| `roles` | array<object> |  |  |
| `roles[].id` | string |  | format: uuid |
| `roles[].code` | string |  |  |
| `roles[].name` | string |  |  |
| `roles[].scopeLevel` | string |  |  |

**Error responses:** `401`, `403` — Standard error body (`application/problem+json`) for every non-2xx response: `type`, `title`, `status`, `code`, `requestId`, optional `details`. See **Standard Error Response** above.


### `POST /v1/users`

Register or invite a Central Platform government oversight officer

**Required permission:** `iam:users_manage`

**Request body** (required):

| Field | Type | Required | Notes |
|---|---|---|---|
| `code` | string | yes | length 3-50 |
| `countryId` | string |  | format: uuid |
| `email` | string | yes | format: email |
| `fullName` | string | yes | length 2-150 |
| `phone` | string |  | length -30 |
| `roleCode` | string |  | length -50 |

**Response `201`:**

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | string | yes | format: uuid |
| `code` | string | yes |  |
| `zitadelId` | string | yes |  |
| `countryId` | string |  | nullable; format: uuid |
| `email` | string | yes |  |
| `fullName` | string | yes |  |
| `phone` | string |  | nullable |
| `status` | string | yes |  |
| `invitedAt` | string |  | nullable; format: date-time |
| `invitedViaStub` | boolean |  |  |
| `realInviteSent` | boolean |  |  |
| `createdAt` | string | yes | format: date-time |
| `roles` | array<object> |  |  |
| `roles[].id` | string |  | format: uuid |
| `roles[].code` | string |  |  |
| `roles[].name` | string |  |  |
| `roles[].scopeLevel` | string |  |  |

**Error responses:** `400`, `401`, `403` — Standard error body (`application/problem+json`) for every non-2xx response: `type`, `title`, `status`, `code`, `requestId`, optional `details`. See **Standard Error Response** above.


### `GET /v1/users/me`

Retrieve authenticated oversight officer profile

**Required permission:** _none (public once authenticated)_

**Response `200`:**

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | string | yes | format: uuid |
| `code` | string | yes |  |
| `zitadelId` | string | yes |  |
| `countryId` | string |  | nullable; format: uuid |
| `email` | string | yes |  |
| `fullName` | string | yes |  |
| `phone` | string |  | nullable |
| `status` | string | yes |  |
| `invitedAt` | string |  | nullable; format: date-time |
| `invitedViaStub` | boolean |  |  |
| `realInviteSent` | boolean |  |  |
| `createdAt` | string | yes | format: date-time |
| `roles` | array<object> |  |  |
| `roles[].id` | string |  | format: uuid |
| `roles[].code` | string |  |  |
| `roles[].name` | string |  |  |
| `roles[].scopeLevel` | string |  |  |

**Error responses:** `401`, `404` — Standard error body (`application/problem+json`) for every non-2xx response: `type`, `title`, `status`, `code`, `requestId`, optional `details`. See **Standard Error Response** above.


### `GET /v1/users/{id}`

Retrieve a single oversight officer profile

**Required permission:** `iam:users_manage`

**Path parameters:**

| Name | Type | Required | Notes |
|---|---|---|---|
| `id` | string | yes | format: uuid |

**Response `200`:**

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | string | yes | format: uuid |
| `code` | string | yes |  |
| `zitadelId` | string | yes |  |
| `countryId` | string |  | nullable; format: uuid |
| `email` | string | yes |  |
| `fullName` | string | yes |  |
| `phone` | string |  | nullable |
| `status` | string | yes |  |
| `invitedAt` | string |  | nullable; format: date-time |
| `invitedViaStub` | boolean |  |  |
| `realInviteSent` | boolean |  |  |
| `createdAt` | string | yes | format: date-time |
| `roles` | array<object> |  |  |
| `roles[].id` | string |  | format: uuid |
| `roles[].code` | string |  |  |
| `roles[].name` | string |  |  |
| `roles[].scopeLevel` | string |  |  |

**Error responses:** `401`, `403`, `404` — Standard error body (`application/problem+json`) for every non-2xx response: `type`, `title`, `status`, `code`, `requestId`, optional `details`. See **Standard Error Response** above.


### `PATCH /v1/users/{id}`

Update officer profile, status or assigned role

**Required permission:** `iam:users_manage`

**Path parameters:**

| Name | Type | Required | Notes |
|---|---|---|---|
| `id` | string | yes | format: uuid |

**Request body** (required):

| Field | Type | Required | Notes |
|---|---|---|---|
| `fullName` | string |  | length 2-150 |
| `phone` | string |  | nullable; length -30 |
| `status` | string |  | enum: ACTIVE, SUSPENDED, INACTIVE |
| `roleCode` | string |  | length -50 |

**Response `200`:**

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | string | yes | format: uuid |
| `code` | string | yes |  |
| `zitadelId` | string | yes |  |
| `countryId` | string |  | nullable; format: uuid |
| `email` | string | yes |  |
| `fullName` | string | yes |  |
| `phone` | string |  | nullable |
| `status` | string | yes |  |
| `invitedAt` | string |  | nullable; format: date-time |
| `invitedViaStub` | boolean |  |  |
| `realInviteSent` | boolean |  |  |
| `createdAt` | string | yes | format: date-time |
| `roles` | array<object> |  |  |
| `roles[].id` | string |  | format: uuid |
| `roles[].code` | string |  |  |
| `roles[].name` | string |  |  |
| `roles[].scopeLevel` | string |  |  |

**Error responses:** `400`, `401`, `403`, `404` — Standard error body (`application/problem+json`) for every non-2xx response: `type`, `title`, `status`, `code`, `requestId`, optional `details`. See **Standard Error Response** above.


### `DELETE /v1/users/{id}`

Remove an officer account

**Required permission:** `iam:users_manage`

**Path parameters:**

| Name | Type | Required | Notes |
|---|---|---|---|
| `id` | string | yes | format: uuid |

**Response `200`:**

_(no body / empty object)_

**Error responses:** `401`, `403`, `404` — Standard error body (`application/problem+json`) for every non-2xx response: `type`, `title`, `status`, `code`, `requestId`, optional `details`. See **Standard Error Response** above.


### `POST /v1/users/{id}/resend-invite`

Re-trigger the Zitadel invite for a user still in PENDING_ACTIVATION

**Required permission:** `iam:users_manage`

**Path parameters:**

| Name | Type | Required | Notes |
|---|---|---|---|
| `id` | string | yes | format: uuid |

**Response `200`:**

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | string | yes | format: uuid |
| `code` | string | yes |  |
| `zitadelId` | string | yes |  |
| `countryId` | string |  | nullable; format: uuid |
| `email` | string | yes |  |
| `fullName` | string | yes |  |
| `phone` | string |  | nullable |
| `status` | string | yes |  |
| `invitedAt` | string |  | nullable; format: date-time |
| `invitedViaStub` | boolean |  |  |
| `realInviteSent` | boolean |  |  |
| `createdAt` | string | yes | format: date-time |
| `roles` | array<object> |  |  |
| `roles[].id` | string |  | format: uuid |
| `roles[].code` | string |  |  |
| `roles[].name` | string |  |  |
| `roles[].scopeLevel` | string |  |  |

**Error responses:** `401`, `403`, `404`, `409` — Standard error body (`application/problem+json`) for every non-2xx response: `type`, `title`, `status`, `code`, `requestId`, optional `details`. See **Standard Error Response** above.


---

## 10. Property Registry Service

**Base URL:** `http://localhost:3020`  
**Database:** `property_registry`  
**Interactive docs:** `http://localhost:3020/docs`


### `GET /v1/properties`

Search / list properties within caller assembly context

**Required permission:** `properties:read`

**Response `200`:**

Array of:

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | string | yes | format: uuid |
| `code` | string | yes |  |
| `accountNumber` | string |  | nullable |
| `propertyName` | string |  | nullable |
| `assemblyId` | string | yes | format: uuid |
| `propertyClass` | string |  |  |
| `buildingStatus` | string |  |  |
| `propertyStatus` | string |  |  |
| `propertyUse` | string |  |  |
| `tenureType` | string |  |  |
| `structureType` | string |  |  |
| `verificationStatus` | string | yes |  |
| `polygonGeoJson` | object |  |  |
| `createdAt` | string | yes | format: date-time |

**Error responses:** `401`, `403` — Standard error body (`application/problem+json`) for every non-2xx response: `type`, `title`, `status`, `code`, `requestId`, optional `details`. See **Standard Error Response** above.


### `POST /v1/properties`

Register landed property parcel into national cadastre

**Required permission:** `properties:manage`

**Request body** (required):

| Field | Type | Required | Notes |
|---|---|---|---|
| `code` | string | yes | length 3-50 |
| `accountNumber` | string |  | length -50 |
| `propertyName` | string |  | length -150 |
| `propertyClass` | string |  |  |
| `buildingStatus` | string |  |  |
| `propertyStatus` | string |  |  |
| `propertyUse` | string |  |  |
| `tenureType` | string |  |  |
| `structureType` | string |  |  |
| `registrationSource` | string |  | enum: CONCESSION, RATEPAYER; default: "CONCESSION" |
| `createdByRatepayerId` | string |  | format: uuid |
| `documents` | array<object> |  |  |
| `documents[].documentType` | string | yes | enum: LAND_TITLE_CERTIFICATE, INDENTURE, BUILDING_PERMIT, SITE_PLAN, PURCHASE_AGREEMENT, UTILITY_BILL, STATUTORY_DECLARATION, TENANCY_AGREEMENT |
| `documents[].documentNumber` | string |  | length -100 |
| `documents[].issuingAuthority` | string |  | length -150 |
| `documents[].issueDate` | string |  |  |
| `documents[].mediaUrl` | string | yes |  |
| `documents[].fileSizeBytes` | integer |  |  |
| `documents[].mimeType` | string |  |  |
| `polygonGeoJson` | object | yes |  |

**Response `201`:**

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | string | yes | format: uuid |
| `code` | string | yes |  |
| `accountNumber` | string |  | nullable |
| `propertyName` | string |  | nullable |
| `assemblyId` | string | yes | format: uuid |
| `propertyClass` | string |  |  |
| `buildingStatus` | string |  |  |
| `propertyStatus` | string |  |  |
| `propertyUse` | string |  |  |
| `tenureType` | string |  |  |
| `structureType` | string |  |  |
| `verificationStatus` | string | yes |  |
| `polygonGeoJson` | object |  |  |
| `createdAt` | string | yes | format: date-time |

**Error responses:** `400`, `401`, `403`, `409`, `503` — Standard error body (`application/problem+json`) for every non-2xx response: `type`, `title`, `status`, `code`, `requestId`, optional `details`. See **Standard Error Response** above.


### `GET /v1/properties/{code}/documents`

List all ownership and verification documents attached to a property

**Required permission:** `properties:read`

**Path parameters:**

| Name | Type | Required | Notes |
|---|---|---|---|
| `code` | string | yes |  |

**Response `200`:**

Array of:

**Error responses:** `401`, `403`, `404` — Standard error body (`application/problem+json`) for every non-2xx response: `type`, `title`, `status`, `code`, `requestId`, optional `details`. See **Standard Error Response** above.


### `POST /v1/properties/{code}/documents`

Concession staff uploads ownership verification documents for a ratepayer while on field premises

**Required permission:** `properties:manage`

**Path parameters:**

| Name | Type | Required | Notes |
|---|---|---|---|
| `code` | string | yes |  |

**Request body** (required):

| Field | Type | Required | Notes |
|---|---|---|---|
| `ratepayerId` | string |  | format: uuid |
| `documentType` | string | yes | enum: LAND_TITLE_CERTIFICATE, INDENTURE, BUILDING_PERMIT, SITE_PLAN, PURCHASE_AGREEMENT, UTILITY_BILL, STATUTORY_DECLARATION, TENANCY_AGREEMENT |
| `documentNumber` | string |  | length -100 |
| `issuingAuthority` | string |  | length -150 |
| `issueDate` | string |  |  |
| `mediaUrl` | string | yes |  |
| `staffRef` | string | yes | length 2-50 |
| `deviceId` | string | yes | length 2-50 |
| `premisesCoordinates` | object | yes |  |
| `premisesCoordinates.latitude` | number | yes | min: -90; max: 90 |
| `premisesCoordinates.longitude` | number | yes | min: -180; max: 180 |
| `premisesCoordinates.accuracyMeters` | number |  | min: 0 |

**Response `201`:**

_(no body / empty object)_

**Error responses:** `400`, `401`, `403`, `404` — Standard error body (`application/problem+json`) for every non-2xx response: `type`, `title`, `status`, `code`, `requestId`, optional `details`. See **Standard Error Response** above.


### `GET /v1/properties/{id}`

Retrieve property parcel details, units, and valuation roll status

**Required permission:** `properties:read`

**Path parameters:**

| Name | Type | Required | Notes |
|---|---|---|---|
| `id` | string | yes | format: uuid |

**Response `200`:**

_(no body / empty object)_

**Error responses:** `401`, `403`, `404` — Standard error body (`application/problem+json`) for every non-2xx response: `type`, `title`, `status`, `code`, `requestId`, optional `details`. See **Standard Error Response** above.


### `POST /v1/properties/{id}/units`

Declare sectional sub-unit within property (apartment, shop, suite)

**Required permission:** `properties:manage`

**Path parameters:**

| Name | Type | Required | Notes |
|---|---|---|---|
| `id` | string | yes | format: uuid |

**Request body** (required):

| Field | Type | Required | Notes |
|---|---|---|---|
| `unitIdentifier` | string | yes | length 1-50 |
| `unitType` | string |  | default: "WHOLE_BUILDING" |
| `floorLevel` | integer |  | default: 0 |

**Response `201`:**

_(no body / empty object)_

**Error responses:** `400`, `401`, `403` — Standard error body (`application/problem+json`) for every non-2xx response: `type`, `title`, `status`, `code`, `requestId`, optional `details`. See **Standard Error Response** above.


### `GET /v1/properties/{id}/verifications`

List field verifications submitted for a property

**Required permission:** `properties:read`

**Path parameters:**

| Name | Type | Required | Notes |
|---|---|---|---|
| `id` | string | yes | format: uuid |

**Response `200`:**

Array of:

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | string | yes | format: uuid |
| `propertyId` | string | yes | format: uuid |
| `verifiedByPersonnelId` | string |  | format: uuid |
| `isWithinPolygon` | boolean |  |  |
| `outcome` | string | yes |  |
| `notes` | string |  | nullable |
| `reviewStatus` | string | yes |  |
| `reviewedByPersonnelId` | string |  | nullable |
| `reviewedAt` | string |  | nullable; format: date-time |
| `reviewNotes` | string |  | nullable |
| `capturedAt` | string | yes | format: date-time |

**Error responses:** `401`, `403`, `404` — Standard error body (`application/problem+json`) for every non-2xx response: `type`, `title`, `status`, `code`, `requestId`, optional `details`. See **Standard Error Response** above.


### `POST /v1/properties/{id}/verifications`

Concessionaire agent submits a field verification of a property

**Required permission:** `properties:verify`

**Path parameters:**

| Name | Type | Required | Notes |
|---|---|---|---|
| `id` | string | yes | format: uuid |

**Request body** (required):

| Field | Type | Required | Notes |
|---|---|---|---|
| `verifiedByPersonnelId` | string | yes | format: uuid |
| `verifierCoordinates` | object | yes |  |
| `verifierCoordinates.latitude` | number | yes | min: -90; max: 90 |
| `verifierCoordinates.longitude` | number | yes | min: -180; max: 180 |
| `isWithinPolygon` | boolean | yes |  |
| `verifiedSnapshot` | object | yes |  |
| `capturedAt` | string | yes | format: date-time |
| `outcome` | string | yes | enum: VERIFIED, DISPUTED_LOCATION, NOT_FOUND, ACCESS_DENIED |
| `notes` | string |  | length -2000 |

**Response `201`:**

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | string | yes | format: uuid |
| `propertyId` | string | yes | format: uuid |
| `verifiedByPersonnelId` | string |  | format: uuid |
| `isWithinPolygon` | boolean |  |  |
| `outcome` | string | yes |  |
| `notes` | string |  | nullable |
| `reviewStatus` | string | yes |  |
| `reviewedByPersonnelId` | string |  | nullable |
| `reviewedAt` | string |  | nullable; format: date-time |
| `reviewNotes` | string |  | nullable |
| `capturedAt` | string | yes | format: date-time |

**Error responses:** `400`, `401`, `403`, `404` — Standard error body (`application/problem+json`) for every non-2xx response: `type`, `title`, `status`, `code`, `requestId`, optional `details`. See **Standard Error Response** above.


### `PATCH /v1/verifications/{id}/review`

Concessionaire officer approves or rejects a field verification

**Required permission:** `properties:verify:review`

**Path parameters:**

| Name | Type | Required | Notes |
|---|---|---|---|
| `id` | string | yes | format: uuid |

**Request body** (required):

| Field | Type | Required | Notes |
|---|---|---|---|
| `reviewStatus` | string | yes | enum: APPROVED, REJECTED |
| `reviewedByPersonnelId` | string | yes | format: uuid |
| `reviewNotes` | string |  | length -2000 |

**Response `200`:**

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | string | yes | format: uuid |
| `propertyId` | string | yes | format: uuid |
| `verifiedByPersonnelId` | string |  | format: uuid |
| `isWithinPolygon` | boolean |  |  |
| `outcome` | string | yes |  |
| `notes` | string |  | nullable |
| `reviewStatus` | string | yes |  |
| `reviewedByPersonnelId` | string |  | nullable |
| `reviewedAt` | string |  | nullable; format: date-time |
| `reviewNotes` | string |  | nullable |
| `capturedAt` | string | yes | format: date-time |

**Error responses:** `400`, `401`, `403`, `404` — Standard error body (`application/problem+json`) for every non-2xx response: `type`, `title`, `status`, `code`, `requestId`, optional `details`. See **Standard Error Response** above.


---

## 11. Ratepayer Service

**Base URL:** `http://localhost:3030`  
**Database:** `ratepayer_core`  
**Interactive docs:** `http://localhost:3030/docs`


### `POST /v1/properties/{code}/claims`

Ratepayer claims ownership of a concession-registered property by attaching ownership proof

**Required permission:** _none (public once authenticated)_

**Path parameters:**

| Name | Type | Required | Notes |
|---|---|---|---|
| `code` | string | yes |  |

**Request body** (required):

| Field | Type | Required | Notes |
|---|---|---|---|
| `ratepayerId` | string |  |  |
| `propertyId` | string |  |  |
| `unitId` | string |  |  |
| `relationship` | string |  |  |
| `ownershipType` | string |  |  |
| `ownershipPercentage` | number |  |  |
| `propertyRegistrationSource` | string |  |  |
| `documents` | array<object> |  |  |
| `documents[].documentTypeCode` | string |  |  |
| `documents[].documentType` | string |  |  |
| `documents[].documentNumber` | string |  |  |
| `documents[].issuingAuthority` | string |  |  |
| `documents[].fileUrl` | string |  |  |
| `documents[].mediaUrl` | string |  |  |
| `documents[].fileName` | string |  |  |
| `documents[].mimeType` | string |  |  |

**Response `201`:**

_(no body / empty object)_


### `GET /v1/ratepayers`

Get ratepayer summary metrics

**Required permission:** _none (public once authenticated)_

**Response `200`:**

_(no body / empty object)_


### `POST /v1/ratepayers`

Register citizen/corporate ratepayer profile for Web Portal or Mobile App

**Required permission:** _none (public once authenticated)_

**Request body** (required):

| Field | Type | Required | Notes |
|---|---|---|---|
| `ratepayerType` | string |  | enum: INDIVIDUAL, ORGANIZATION; default: "INDIVIDUAL" |
| `legalName` | string | yes | length 2-200 |
| `phone` | string | yes | length 9-30 |
| `email` | string |  | format: email |
| `regionId` | string | yes | format: uuid |
| `assemblyId` | string | yes | format: uuid |
| `locationGeo` | object | yes |  |

**Response `201`:**

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | string | yes | format: uuid |
| `code` | string | yes |  |
| `ratepayerType` | string | yes |  |
| `legalName` | string | yes |  |
| `phone` | string | yes |  |
| `email` | string |  | nullable |
| `regionId` | string | yes | format: uuid |
| `assemblyId` | string | yes | format: uuid |
| `status` | string |  |  |
| `createdAt` | string | yes | format: date-time |

**Error responses:** `400` — Standard error body (`application/problem+json`) for every non-2xx response: `type`, `title`, `status`, `code`, `requestId`, optional `details`. See **Standard Error Response** above.


### `POST /v1/ratepayers/claims`

Claim ownership or tenancy of a property unit in the Unified Ratepayer Portal

**Required permission:** _none (public once authenticated)_

**Request body** (required):

| Field | Type | Required | Notes |
|---|---|---|---|
| `ratepayerId` | string |  |  |
| `propertyId` | string |  |  |
| `unitId` | string |  |  |
| `relationship` | string |  |  |
| `ownershipType` | string |  |  |
| `ownershipPercentage` | number |  |  |
| `propertyRegistrationSource` | string |  |  |
| `documents` | array<object> |  |  |
| `documents[].documentTypeCode` | string |  |  |
| `documents[].documentType` | string |  |  |
| `documents[].documentNumber` | string |  |  |
| `documents[].issuingAuthority` | string |  |  |
| `documents[].fileUrl` | string |  |  |
| `documents[].mediaUrl` | string |  |  |
| `documents[].fileName` | string |  |  |
| `documents[].mimeType` | string |  |  |

**Response `201`:**

_(no body / empty object)_


### `GET /v1/ratepayers/directory`

CROIP portal: paginated, searchable ratepayer directory

**Required permission:** `ratepayers:read`

**Query parameters:**

| Name | Type | Required | Notes |
|---|---|---|---|
| `search` | string |  |  |
| `status` | string |  | enum: ACTIVE, SUSPENDED, DEACTIVATED |
| `assemblyId` | string |  | format: uuid |
| `page` | integer |  | min: 1; default: 1 |
| `pageSize` | integer |  | min: 1; max: 100; default: 20 |

**Response `200`:**

| Field | Type | Required | Notes |
|---|---|---|---|
| `items` | array<object> | yes |  |
| `items[].id` | string |  | format: uuid |
| `items[].code` | string |  |  |
| `items[].ratepayerType` | string |  |  |
| `items[].legalName` | string |  |  |
| `items[].phone` | string |  |  |
| `items[].email` | string |  | nullable |
| `items[].regionId` | string |  | format: uuid |
| `items[].assemblyId` | string |  | format: uuid |
| `items[].status` | string |  |  |
| `items[].createdAt` | string |  | format: date-time |
| `items[].verifications` | array<object> |  |  |
| `items[].verifications[].id` | string | yes | format: uuid |
| `items[].verifications[].ratepayerId` | string | yes | format: uuid |
| `items[].verifications[].provider` | string | yes |  |
| `items[].verifications[].providerReference` | string |  |  |
| `items[].verifications[].verificationStatus` | string | yes |  |
| `items[].verifications[].verifiedAt` | string |  | nullable; format: date-time |
| `items[].verifications[].createdAt` | string | yes | format: date-time |
| `total` | integer | yes |  |
| `page` | integer | yes |  |
| `pageSize` | integer | yes |  |
| `totalPages` | integer | yes |  |

**Error responses:** `401`, `403` — Standard error body (`application/problem+json`) for every non-2xx response: `type`, `title`, `status`, `code`, `requestId`, optional `details`. See **Standard Error Response** above.


### `GET /v1/ratepayers/{id}`

Get ratepayer KYC profile, verification status, and linked properties

**Required permission:** _none (public once authenticated)_

**Path parameters:**

| Name | Type | Required | Notes |
|---|---|---|---|
| `id` | string | yes | format: uuid |

**Response `200`:**

_(no body / empty object)_

**Error responses:** `404` — Standard error body (`application/problem+json`) for every non-2xx response: `type`, `title`, `status`, `code`, `requestId`, optional `details`. See **Standard Error Response** above.


### `GET /v1/ratepayers/{id}/properties`

List all properties linked to this ratepayer across any MMDA in Ghana

**Required permission:** _none (public once authenticated)_

**Path parameters:**

| Name | Type | Required | Notes |
|---|---|---|---|
| `id` | string | yes | format: uuid |

**Response `200`:**

Array of:


### `PATCH /v1/ratepayers/{id}/verifications/{verificationId}`

CROIP portal: oversight official approves or rejects a ratepayer KYC verification

**Required permission:** `ratepayers:manage`

**Path parameters:**

| Name | Type | Required | Notes |
|---|---|---|---|
| `id` | string | yes | format: uuid |
| `verificationId` | string | yes | format: uuid |

**Request body** (required):

| Field | Type | Required | Notes |
|---|---|---|---|
| `verificationStatus` | string | yes | enum: VERIFIED, REJECTED |

**Response `200`:**

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | string | yes | format: uuid |
| `ratepayerId` | string | yes | format: uuid |
| `provider` | string | yes |  |
| `providerReference` | string |  |  |
| `verificationStatus` | string | yes |  |
| `verifiedAt` | string |  | nullable; format: date-time |
| `createdAt` | string | yes | format: date-time |

**Error responses:** `400`, `401`, `403`, `404` — Standard error body (`application/problem+json`) for every non-2xx response: `type`, `title`, `status`, `code`, `requestId`, optional `details`. See **Standard Error Response** above.
