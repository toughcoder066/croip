# CROIP Portal

The government oversight admin portal for the **Central Revenue Oversight & Integration Platform (CROIP)** — Ghana's national platform for municipal property-rate revenue oversight. Built with Next.js 16 (App Router, Turbopack), shadcn/ui, and Tailwind CSS.

This is a UI shell only: every piece of data it shows comes from one of the **11 CROIP microservices** (see the root [`README.md`](../../README.md) and [`AGENTS.md`](../../AGENTS.md)) via thin Next.js API proxy routes under `src/app/api/`. The portal never talks to a database directly and never uses mock/fake data for anything CROIP-related.

## Running It

```bash
npm install
npm run dev
```

Opens on **http://localhost:3050**. The 11 backend services must already be running — see the root README's "Running Everything" section (`docker compose up -d --build` from the repo root).

## Signing In

| Field | Value |
|---|---|
| URL | `http://localhost:3050/login` |
| Email | `superuser@croip.com` |
| Password | `Password@1` |
| Role | `SUPER_ADMIN` (full access) |

This checks a real `ACTIVE` user row in `platform-governance-service` — see that service's README for how to recreate the account if its database is ever reset.

## What's In the Portal

- **Dashboard** — platform-wide KPIs
- **Concessions** — registry, contracts & agreements, personnel, API clients/keys, data sync batches
- **Properties** — national cadastre, **Bills** (issued against properties — not under Ratepayers, since properties are what get billed), valuation rolls, **Cadastral & Spatial Map** (real property + MMDA boundaries plotted together)
- **Ratepayers** — directory, KYC & ID verifications, dispute mediation; payments made by a ratepayer live inside their own profile, not as a standalone ledger page
- **Oversight & Reconciliation** — reconciliation runs, exceptions & discrepancies, independent evidence, compliance & recovery
- **Users & Access** — user directory, roles & permissions, active sessions
- **Audit Trail** — system audit logs, event outbox queue, security/access events, forensic exports
- **Configuration** — Assemblies (MMDAs) and Regions & Jurisdictions, read-only views of the real GIS dataset (260 MMDAs / 16 regions) with live-computed stats
- **Zones & Boundaries** — the GIS boundary editor: draw a region/MMDA boundary on the map, paste raw GeoJSON, or build it coordinate-by-coordinate in a form; point-in-polygon zone testing
- **Account & Tools** — officer profile, account settings, mailbox, calendar

## Architecture Notes

- **API client:** `src/lib/croip-api.ts` — the single place that knows every backend service's base URL (`CROIP_SERVICES`) and attaches the dev-mode auth headers (`x-dev-subject`, `x-dev-permissions`, `x-dev-concession-id`, `x-dev-assembly-id`) every request needs while `AUTH_MODE=disabled`. The default concession/assembly IDs here are real seeded rows, not placeholder UUIDs — every record created through the portal is attributable to an actual concession and MMDA.
- **API proxy routes:** `src/app/api/**` — thin pass-throughs to the microservices; the browser never calls a backend service directly.
- **GIS map views:** `src/views/configuration/zones/boundary-map.tsx` (editor) and `src/views/properties/cadastral-map.tsx` (read-only overview) — both built on Leaflet + react-leaflet, loaded via `next/dynamic` with `ssr:false` since `<MapContainer>` touches `window` at module scope.
- **Environment:** `.env.example` lists each service's base URL; every one defaults to `http://localhost:<port>`, so no `.env` file is required when running the backend via the root `docker compose up -d --build`.

## Scripts

```bash
npm run dev          # Next dev server, port 3050 (Turbopack)
npm run build         # production build
npm run start          # serve a production build
npm run lint            # ESLint
npm run check-types      # tsc --noEmit
```
