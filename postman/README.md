# CROIP Postman Collection

Covers all 11 CROIP microservices (157 requests), organized by **who calls the API** rather than which service owns it:

- **1. Ratepayer** — citizen self-service: self-register directly through a concession's app, log in (password + OTP), read/update/delete own profile, view own account activity, claim an existing unclaimed property, own bills/disputes, receipt verification. A concession's staff can also register/update/delete a ratepayer on their behalf, walk-in style — that path stays concession-scoped (see below). Ratepayers cannot register or update properties — that's concession-only.
- **2. Concession** — revenue-collection partner field staff: walk-in ratepayer registration/update/delete, searching/listing the ratepayers it's registered, property registration/verification in the field, billing and payment collection, event reporting, reference-data lookups.
- **3. CROIP Admin** — central platform/oversight staff: user & RBAC management, concession onboarding, reconciliation, audit, boundary/reference-data management, review/approval steps.
- **Platform Health Checks** — infra liveness/readiness, not tied to any persona.

Some endpoints are genuinely cross-cutting (e.g. a property verification is *submitted* by Concession staff but *reviewed* by CROIP Admin) — each lives under the persona who actually calls that specific endpoint, with a note on the request where the split matters.

## Import

1. Postman → Import → select both `CROIP.postman_collection.json` and `CROIP.postman_environment.json`.
2. Select the **CROIP Local Dev** environment in the top-right environment picker.
3. Make sure the stack is running (`docker compose up -d` from the repo root).

## Auth

Two separate bearer tokens, stored as environment variables:

- **`staff_access_token`** — used by both the Concession and CROIP Admin folders (every request tagged `auth: staff`); RBAC permissions, not the token itself, decide what each officer can actually do. This also covers walk-in ratepayer registration/update/delete — a concession's own staff registering or updating a ratepayer on their behalf. There's no API-only staff login by design — sign in through the portal's Zitadel OIDC flow in a browser. For Postman testing, log into `http://localhost:3050` as a real officer (e.g. `superuser@croip.com`), then copy the access token out of the portal's server-side token store and paste it into this variable. It expires — if staff requests start 401ing, get a fresh one.
- **`ratepayer_access_token`** — for the Ratepayer folder's authenticated endpoints (tagged `auth: ratepayer`): own-profile read/update and claims. Mintable from Postman itself, under **1. Ratepayer → Auth & Profile**, two ways:
  - **Self-service (no staff token needed):** run **"Look up a concession by its public code"** to confirm `concession_code`, then **"Self-register my own profile"** — a test script auto-saves the result to `ratepayer_id`.
  - **Walk-in, staff-mediated:** run **2. Concession → Ratepayers → "Register a ratepayer (walk-in)"** (with a valid `staff_access_token`) — a test script auto-saves the result to `ratepayer_id`.

  Either way, then:
  1. Run **"Login step 1: password → OTP"**. If the identifier is an **email**, the OTP is dispatched to a real inbox in Mailpit (`http://localhost:8025`) and is deliberately **not** echoed back in the response — open Mailpit, copy the code, and paste it into `ratepayer_otp_code` yourself. If it's a **phone number**, there's no real SMS provider wired up yet, so the response still includes `devOtpCode` and a test script auto-saves it to `ratepayer_otp_code` for you.
  2. Run **"Login step 2: verify OTP → session token"** — a test script auto-saves the resulting token to `ratepayer_access_token`.
  3. Every other `auth: ratepayer` request (own profile read/update/delete, own activity, claims, disputes, bills) now works.

Done testing? Run **"Log out"** — it revokes just that one token server-side (any other session the ratepayer has stays signed in), and a test script clears `ratepayer_access_token` locally; every `auth: ratepayer` request after that correctly 401s until you log in again.

Forgot your password? Run **"Forgot password step 1: send reset OTP"** (no token, same identifier as login — same Mailpit-vs-devOtpCode split as above), then **"Forgot password step 2: verify OTP → set new password"** — this uses a distinct OTP purpose from login/registration, so one can never be replayed as the other, and it issues a fresh `ratepayer_access_token` immediately on success.

A few endpoints are genuinely public — no token needed: concession-by-code lookup, ratepayer self-registration, login/OTP verification, forgot/reset password, receipt verification.

Those same public, unauthenticated ratepayer endpoints are per-IP rate-limited (self-register and forgot-password: 5 per 15 minutes; login, verify-otp, reset-password: 10 per 5 minutes) — run the collection repeatedly in quick succession and you'll eventually hit a `429 RATE_LIMITED`. That's expected; wait out the window or restart the service locally (its rate-limit store is in-memory and resets on restart). No other endpoint in this collection is rate-limited.

**Offline-safe registration:** both registration requests ("Self-register my own profile" and "Register a ratepayer (walk-in)") accept an optional `idempotencyKey`. It exists for a concession field agent registering a ratepayer with no signal — their app generates the key once, locally, the moment the ratepayer is captured, and resends the exact same request (same key, same body) whenever it gets a chance to sync; a retry replays the original response instead of creating a duplicate. Reusing the same key with a *different* body is rejected with `409 CONFLICT` — that's misuse detection, not a bug.

**`machine_access_token`** is for service-to-service testing (client_credentials grant) — see **3. CROIP Admin → Zitadel Dev Tools**. Default `machine_client_id` is `property-registry-service`; you'll need its client secret from `docker-compose.yml` or the Zitadel console.

**`concession_access_token`** — for a concessionaire managing its own API credential (see **2. Concession → API Clients (self-service)**). Onboarding a concessionaire (**3. CROIP Admin → Concession Management → "Onboard a concessionaire"**) provisions and emails its first credential, and a test script auto-saves `concession_client_id`/`concession_client_secret` from the response. Run **"Mint access token (client_credentials)"** in that same folder to turn those into `concession_access_token`. Rotating saves the new client id/secret over the old ones automatically.

## Resource ID variables

`region_id` / `assembly_id` are pre-filled with a real seeded MMDA (Ablekuma Central Municipal, Greater Accra) so geo-dependent requests (property creation, zone detection) work out of the box. Other resource-id variables (`concession_id`, `ratepayer_id`, `property_id`, `bill_id`, etc.) start empty — either fill them in from a prior response, or copy IDs from the portal/database as you go. Several requests (concession onboarding, ratepayer self-/walk-in registration, OTP login) auto-populate their own variables via Postman test scripts.

## Regenerating

The collection and environment are generated from `generate_postman.py` rather than hand-edited — when an endpoint changes, update the corresponding `item(...)` call in that script (grouped by persona folder) and re-run `python3 generate_postman.py` from this directory.
