# CROIP Postman Collection

Covers all 11 CROIP microservices (113 requests), organized by **who calls the API** rather than which service owns it:

- **1. Ratepayer** — citizen self-service: register, log in (password + OTP), complete profile, self-service property registration, own bills/disputes, receipt verification.
- **2. Concession** — revenue-collection partner field staff: property registration/verification in the field, billing and payment collection, event reporting, reference-data lookups.
- **3. CROIP Admin** — central platform/oversight staff: user & RBAC management, concession onboarding, reconciliation, audit, boundary/reference-data management, review/approval steps.
- **Platform Health Checks** — infra liveness/readiness, not tied to any persona.

Some endpoints are genuinely cross-cutting (e.g. a property verification is *submitted* by Concession staff but *reviewed* by CROIP Admin) — each lives under the persona who actually calls that specific endpoint, with a note on the request where the split matters.

## Import

1. Postman → Import → select both `CROIP.postman_collection.json` and `CROIP.postman_environment.json`.
2. Select the **CROIP Local Dev** environment in the top-right environment picker.
3. Make sure the stack is running (`docker compose up -d` from the repo root).

## Auth

Two separate bearer tokens, stored as environment variables:

- **`staff_access_token`** — used by both the Concession and CROIP Admin folders (every request tagged `auth: staff`); RBAC permissions, not the token itself, decide what each officer can actually do. There's no API-only staff login by design — sign in through the portal's Zitadel OIDC flow in a browser. For Postman testing, log into `http://localhost:3050` as a real officer (e.g. `superuser@croip.com`), then copy the access token out of the portal's server-side token store and paste it into this variable. It expires — if staff requests start 401ing, get a fresh one.
- **`ratepayer_access_token`** — for the Ratepayer folder's authenticated endpoints (tagged `auth: ratepayer`). Fully mintable from Postman itself, under **1. Ratepayer → Auth & Profile**:
  1. Run **"Register (public)"** (or skip if already registered).
  2. Run **"Login step 1: password → OTP"** — since no SMS provider is configured in dev, the response includes `devOtpCode` directly; a test script auto-saves it to `ratepayer_otp_code`.
  3. Run **"Login step 2: verify OTP → session token"** — a test script auto-saves the resulting token to `ratepayer_access_token`.
  4. Every other `auth: ratepayer` request (profile, self-service property creation, disputes, bills) now works.

A few endpoints are genuinely public — no token needed: ratepayer registration, property claims, receipt verification.

**`machine_access_token`** is for service-to-service testing (client_credentials grant) — see **3. CROIP Admin → Zitadel Dev Tools**. Default `machine_client_id` is `property-registry-service`; you'll need its client secret from `docker-compose.yml` or the Zitadel console.

## Sample IDs

`sample_region_id` / `sample_assembly_id` are pre-filled with a real seeded MMDA (Ablekuma Central Municipal, Greater Accra) so geo-dependent requests (property creation, zone detection) work out of the box. Other `sample_*` variables start empty — either fill them in from a prior response, or copy IDs from the portal/database as you go. Several requests (ratepayer registration, OTP login) auto-populate their own variables via Postman test scripts.

## Regenerating

The collection and environment are generated from `generate_postman.py` rather than hand-edited — when an endpoint changes, update the corresponding `item(...)` call in that script (grouped by persona folder) and re-run `python3 generate_postman.py` from this directory.
