#!/usr/bin/env python3
"""Generates the CROIP Postman collection + environment, organized by API consumer
(Ratepayer / Concession / CROIP Admin) rather than by backend service."""
import json
import os
import uuid

def item(name, method, url_var, path, body=None, auth=None, description="", query=None):
    url = {
        "raw": "{{" + url_var + "}}" + path + (("?" + "&".join(f"{k}={v}" for k, v in query.items())) if query else ""),
        "host": ["{{" + url_var + "}}"],
        "path": [p for p in path.lstrip("/").split("/") if p]
    }
    if query:
        url["query"] = [{"key": k, "value": v} for k, v in query.items()]
    req = {
        "method": method,
        "header": [{"key": "Content-Type", "value": "application/json"}] if body else [],
        "url": url,
        "description": description
    }
    if body is not None:
        req["body"] = {"mode": "raw", "raw": json.dumps(body, indent=2), "options": {"raw": {"language": "json"}}}
    if auth == "staff":
        req["auth"] = {"type": "bearer", "bearer": [{"key": "token", "value": "{{staff_access_token}}", "type": "string"}]}
    elif auth == "ratepayer":
        req["auth"] = {"type": "bearer", "bearer": [{"key": "token", "value": "{{ratepayer_access_token}}", "type": "string"}]}
    elif auth == "machine":
        req["auth"] = {"type": "bearer", "bearer": [{"key": "token", "value": "{{machine_access_token}}", "type": "string"}]}
    elif auth == "concession":
        req["auth"] = {"type": "bearer", "bearer": [{"key": "token", "value": "{{concession_access_token}}", "type": "string"}]}
    return {"name": name, "request": req, "response": []}

def folder(name, items, description=""):
    return {"name": name, "description": description, "item": items}

REGION = "{{region_id}}"
ASSEMBLY = "{{assembly_id}}"

collection = {
    "info": {
        "_postman_id": "07427078-6693-4b1f-9c5d-414bf49ec021",
        "name": "CROIP Central Platform API",
        "description": "Central Revenue Oversight & Integration Platform — all 11 microservice APIs, organized by WHO calls them rather than which service owns them:\n\n- **1. Ratepayer** — citizen self-service: self-register a profile directly through a concession's own app (identified by that concession's public, non-secret code — never its real API credential), log in (password + OTP), read/update own profile, claim an existing unclaimed property, own bills/disputes, receipt verification. A concession's staff can also register/update a ratepayer on their behalf, walk-in style — that path is concession-scoped (see below). Once a profile exists (either way), login, profile read/update, and claims all work unscoped, across any concession — a ratepayer with property in two different MMDAs only ever needs one account.\n- **2. Concession** — revenue-collection partner field staff: walk-in ratepayer registration/update/delete, property registration/verification in the field, billing and payment collection, event reporting, reference-data lookups.\n- **3. CROIP Admin** — central platform/oversight staff: user & RBAC management, concession onboarding, reconciliation, audit, boundary/reference-data management, review/approval steps.\n- **Platform Health Checks** — infra liveness/readiness, not tied to any persona.\n\nSome endpoints are genuinely cross-cutting (e.g. a property verification is *submitted* by Concession staff but *reviewed* by CROIP Admin) — each lives under the persona who actually calls that specific endpoint, with a note where the split matters.\n\n**Auth model**\n- Ratepayer: no auth for self-register/login/claims/receipt-verification; phone/email + password + OTP issues `{{ratepayer_access_token}}` (HS256, ratepayer-service) for login, own-profile read/update, and claims — it is not accepted for a walk-in staff registration/update, or any property-registry-service endpoint.\n- Concession & CROIP Admin: both use the same real Zitadel-issued `{{staff_access_token}}` (RBAC permissions, plus a concession-ownership check on walk-in ratepayer update/delete, decide what each officer can actually do) — there's no API-only login by design; sign into the portal (http://localhost:3050) as a real officer and copy the access token (see README).",
        "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
    },
    "variable": [],
    "item": []
}

# ======================================================================
# 1. RATEPAYER
# ======================================================================
rp_lookup_concession_item = item("Look up a concession by its public code", "GET", "platform_governance_url", "/v1/concessions/by-code/{{concession_code}}", description="No auth — a concession's own public ratepayer-facing app calls this with its plain, non-secret code (never its real API client credential) to find the concessionId to pass to self-registration. Returns only {id, code, name, status}.")

rp_self_register_item = item("Self-register my own profile", "POST", "ratepayer_url", "/v1/ratepayers/self-register", body={
    "firstName": "{{ratepayer_first_name}}", "lastName": "{{ratepayer_last_name}}",
    "email": "{{ratepayer_email}}", "password": "{{ratepayer_password}}", "confirmPassword": "{{ratepayer_password}}",
    "concessionCode": "{{concession_code}}"
}, description="No auth — a ratepayer creates their own profile directly through a concession's public app, instead of needing to walk into an MMDA office. concessionCode identifies which concession this profile belongs to (resolved via the by-code lookup above). Once created, login works across every concession's app, same as a staff-registered profile. Registering with an email sends a real OTP to Mailpit (http://localhost:8025) — check there and paste the code into ratepayer_otp_code; it's no longer echoed in the response. Use a phone number instead of email (no email field) to get devOtpCode back automatically, since SMS has no real provider wired up yet. The email is white-labeled as the concession (its name as the sender/subject/header) — a ratepayer never sees any CROIP branding; falls back to a neutral 'Ratepayer Services' label only if no concession is on file. Also accepts an optional idempotencyKey — see '2. Concession > Register a ratepayer (walk-in)' for what it's for.")
rp_self_register_item["event"] = [{"listen": "test", "script": {"exec": [
    "if (pm.response.code === 201) { const j = pm.response.json(); pm.environment.set('ratepayer_id', j.id); if (j.otp && j.otp.devOtpCode) pm.environment.set('ratepayer_otp_code', j.otp.devOtpCode); }"
], "type": "text/javascript"}}]

rp_login_item = item("Login step 1: password → OTP", "POST", "ratepayer_url", "/v1/auth/login", body={
    "identifier": "{{ratepayer_email}}", "password": "{{ratepayer_password}}"
}, description="Email OTPs are dispatched to a real inbox in Mailpit (http://localhost:8025) and are deliberately NOT echoed back in the response — copy the code from there into ratepayer_otp_code. Phone OTPs still come back as devOtpCode (auto-saved by this request's test script) since there's no real SMS provider wired up yet. White-labeled as the ratepayer's own concession, never CROIP.")
rp_login_item["event"] = [{"listen": "test", "script": {"exec": [
    "if (pm.response.code === 200) { const j = pm.response.json(); if (j.devOtpCode) pm.environment.set('ratepayer_otp_code', j.devOtpCode); }"
], "type": "text/javascript"}}]

rp_verify_item = item("Login step 2: verify OTP → session token", "POST", "ratepayer_url", "/v1/auth/verify-otp", body={
    "identifier": "{{ratepayer_email}}", "otpCode": "{{ratepayer_otp_code}}"
})
rp_verify_item["event"] = [{"listen": "test", "script": {"exec": [
    "if (pm.response.code === 200) { pm.environment.set('ratepayer_access_token', pm.response.json().accessToken); }"
], "type": "text/javascript"}}]

rp_logout_item = item("Log out", "POST", "ratepayer_url", "/v1/auth/logout", auth="ratepayer", description="Revokes just this session token server-side (not every session this ratepayer has elsewhere) — every subsequent request with {{ratepayer_access_token}} now gets 401 Invalid or expired access token, same as a naturally-expired one. Run Login step 1+2 again to get a fresh token.")
rp_logout_item["event"] = [{"listen": "test", "script": {"exec": [
    "if (pm.response.code === 200) { pm.environment.set('ratepayer_access_token', ''); }"
], "type": "text/javascript"}}]

rp_forgot_password_item = item("Forgot password step 1: send reset OTP", "POST", "ratepayer_url", "/v1/auth/forgot-password", body={
    "identifier": "{{ratepayer_email}}"
}, description="No auth, no password required — this is the \"I forgot it\" flow. Always returns the same OTP_REQUIRED shape whether or not the identifier is registered; only a real account actually gets an OTP generated and dispatched. Email OTPs go to Mailpit (http://localhost:8025) and are not echoed back — check there; phone OTPs still come back as devOtpCode since there's no real SMS provider yet.")
rp_forgot_password_item["event"] = [{"listen": "test", "script": {"exec": [
    "if (pm.response.code === 200) { const j = pm.response.json(); if (j.devOtpCode) pm.environment.set('ratepayer_otp_code', j.devOtpCode); }"
], "type": "text/javascript"}}]

rp_reset_password_item = item("Forgot password step 2: verify OTP → set new password", "POST", "ratepayer_url", "/v1/auth/reset-password", body={
    "identifier": "{{ratepayer_email}}", "otpCode": "{{ratepayer_otp_code}}",
    "newPassword": "{{ratepayer_password}}", "confirmNewPassword": "{{ratepayer_password}}"
}, description="Confirms the PASSWORD_RESET OTP (a distinct purpose from login/registration OTPs — one can never be replayed as the other), sets the new password, and immediately issues a session token — same as a normal login, since this proves account ownership just as well.")
rp_reset_password_item["event"] = [{"listen": "test", "script": {"exec": [
    "if (pm.response.code === 200) { pm.environment.set('ratepayer_access_token', pm.response.json().accessToken); }"
], "type": "text/javascript"}}]

ratepayer_folder = folder("1. Ratepayer", [
    folder("Auth & Profile", [
        rp_lookup_concession_item,
        rp_self_register_item,
        rp_login_item,
        rp_verify_item,
        rp_logout_item,
        rp_forgot_password_item,
        rp_reset_password_item,
        item("Get my own profile", "GET", "ratepayer_url", "/v1/ratepayers/me", auth="ratepayer"),
        item("Update my own profile (self-service)", "PATCH", "ratepayer_url", "/v1/ratepayers/me", auth="ratepayer", body={
            "ratepayerType": "INDIVIDUAL", "firstName": "{{ratepayer_first_name}}", "middleName": "{{ratepayer_middle_name}}",
            "lastName": "{{ratepayer_last_name}}", "phone": "{{ratepayer_phone}}", "address": "45 Oxford Street, Osu",
            "latitude": 5.6037, "longitude": -0.1870
        }, description="Uses the ratepayer's own {{ratepayer_access_token}}, not a concession credential — unlike '2. Concession > Update a ratepayer profile', this is never rejected for cross-concession ownership. Extensive: every self-owned field can be changed (name, ratepayerType, phone, address, coordinates/MMDA, password) except email, the concession registered with, and other immutable fields (code, id, status) — sending any of those is rejected with 400, not silently ignored."),
        item("Get ratepayer profile by id (authenticated)", "GET", "ratepayer_url", "/v1/ratepayers/{{ratepayer_id}}", auth="ratepayer"),
        item("My own account activity", "GET", "ratepayer_url", "/v1/ratepayers/me/activity", auth="ratepayer", description="Every real action taken on my own account (registered, logged in, profile updated, KYC submitted, password reset, etc.), most recent first — the same chronological log CROIP staff see on my profile's Account Activity card, scoped to just me."),
        item("Verify KYC for own profile (Bearer token)", "POST", "ratepayer_url", "/v1/ratepayers/me/verifications", auth="ratepayer", body={"provider": "GHANA_CARD", "autoVerify": True}, description="Verify KYC on own signed-in account using Bearer token. Supported providers: GHANA_CARD, PASSPORT, DRIVERS_LICENSE. Choosing a new provider archives previous verifications for audit trail."),
        item("Verify KYC - 1. Ghana Card", "POST", "ratepayer_url", "/v1/ratepayers/{{ratepayer_id}}/verifications", auth="ratepayer", body={"provider": "GHANA_CARD", "autoVerify": True}, description="Verify ratepayer using Ghana Card (NIA). Format: GHA-XXXXXXXXX-X. Choosing a new provider archives any previous active verification."),
        item("Verify KYC - 2. Passport (archives previous)", "POST", "ratepayer_url", "/v1/ratepayers/{{ratepayer_id}}/verifications", auth="ratepayer", body={"provider": "PASSPORT", "autoVerify": True}, description="Verify ratepayer using Passport. Format: GXXXXXXXX. Archives previous Ghana Card verification for audit trail."),
        item("Verify KYC - 3. Driver's License (archives previous)", "POST", "ratepayer_url", "/v1/ratepayers/{{ratepayer_id}}/verifications", auth="ratepayer", body={"provider": "DRIVERS_LICENSE", "autoVerify": True}, description="Verify ratepayer using Driver's License (DVLA). Format: DL-XXXXXXXX-X. Archives previous Passport verification for audit trail."),
        item("Delete my own account", "DELETE", "ratepayer_url", "/v1/ratepayers/me", auth="ratepayer", description="Self-service account deletion — same business rule as the concession-mediated delete in '2. Concession > Ratepayers' (rejected with 400 if any properties are still linked; sever those first), just scoped to my own account via {{ratepayer_access_token}} instead of a concessionId."),
    ], "ratepayer-service — citizen login, self-registration, and own-profile read/update/delete, all unscoped across any concession once the profile exists. A concession's staff can also register or update a ratepayer on their behalf, walk-in style (see 2. Concession > Ratepayers) — that path stays concession-scoped."),
    folder("My Properties", [
        item("Claim an existing property (authenticated)", "POST", "ratepayer_url", "/v1/ratepayers/claims", auth="ratepayer", body={
            "ratepayerId": "{{ratepayer_id}}", "propertyId": "{{property_id}}",
            "ownershipType": "OWNER", "documents": [{"documentType": "INDENTURE", "mediaUrl": "https://storage.croip.gov.gh/claims/indenture.pdf"}]
        }),
        item("Claim a property by code (authenticated)", "POST", "ratepayer_url", "/v1/properties/{{property_code}}/claims", auth="ratepayer", body={
            "propertyId": "{{property_id}}",
            "documents": [{"documentType": "INDENTURE", "mediaUrl": "https://storage.croip.gov.gh/claims/indenture.pdf"}]
        }),
        item("List my linked properties (authenticated)", "GET", "ratepayer_url", "/v1/ratepayers/{{ratepayer_id}}/properties", auth="ratepayer"),
        item("Rename my property", "PATCH", "property_registry_url", "/v1/properties/{{property_id}}/name", auth="ratepayer", body={
            "propertyName": "My Family Home"
        }, description="The one property field a ratepayer can change directly, on property-registry-service itself rather than through ratepayer-service — a private label for a property they own (claimed, or — for legacy data — originally registered by them), never shown to the concession/MMDA managing it in any read. Rejected with 403 if the authenticated ratepayer doesn't actually own this property. Uses {{ratepayer_access_token}}, the same token ratepayer-service issues — property-registry-service verifies it directly with the shared signing secret rather than proxying through ratepayer-service."),
        item("Sever link to a property", "DELETE", "ratepayer_url", "/v1/ratepayers/{{ratepayer_id}}/properties/{{property_id}}", auth="ratepayer", description="Sever the ownership or tenancy link between a ratepayer and an individual property parcel without deleting the property."),
    ], "ratepayer-service — ratepayers cannot register or update most property fields (concession-only); they can claim an existing unclaimed property and rename one they own (the rename call itself goes directly to property-registry-service, not through ratepayer-service)."),
    folder("My Bills & Disputes", [
        item("My own bills", "GET", "billing_payments_url", "/v1/me/bills", auth="ratepayer"),
        item("Raise a dispute", "POST", "dispute_url", "/v1/disputes", auth="ratepayer", body={
            "disputeType": "BILLING", "billId": "{{bill_id}}", "description": "Billed amount does not match the posted rate for my property class."
        }),
        item("My own disputes", "GET", "dispute_url", "/v1/me/disputes", auth="ratepayer"),
        item("Attach evidence to my dispute", "POST", "dispute_url", "/v1/disputes/{{dispute_code}}/evidence", auth="ratepayer", body={"mediaUrl": "https://storage.croip.gov.gh/disputes/evidence-1.pdf", "description": "Previous year's bill for comparison"}, description="Also usable by the reviewing officer (CROIP Admin) — same endpoint, same permission check (raise-or-review)."),
        item("Add a comment to my dispute", "POST", "dispute_url", "/v1/disputes/{{dispute_code}}/comments", auth="ratepayer", body={"comment": "Following up on this — any update?"}, description="Also usable by the reviewing officer (CROIP Admin) — same endpoint, same permission check (raise-or-review)."),
    ], "billing-payments-service + dispute-service"),
    folder("Receipts", [
        item("Verify a digital payment receipt (public)", "GET", "shared_services_url", "/v1/receipts/{{receipt_id}}/verification"),
    ], "shared-services — lets a ratepayer (or anyone holding a receipt) confirm it's genuine."),
])
collection["item"].append(ratepayer_folder)

# ======================================================================
# 2. CONCESSION (revenue-collection partner field staff)
# ======================================================================
concession_register_ratepayer_item = item("Register a ratepayer (walk-in)", "POST", "ratepayer_url", "/v1/ratepayers", auth="concession", body={
    "email": "{{ratepayer_email}}",
    "phone": "{{ratepayer_phone}}",
    "password": "{{ratepayer_password}}",
    "confirmPassword": "{{ratepayer_password}}",
    "firstName": "{{ratepayer_first_name}}",
    "middleName": "{{ratepayer_middle_name}}",
    "lastName": "{{ratepayer_last_name}}",
    "address": "14 Independence Avenue, Accra",
    "latitude": 5.6037,
    "longitude": -0.1870
}, description="Use {{concession_access_token}} — the ratepayer's concessionId is taken from the caller's own token's client_id, never from the request body. A staff token also technically works (CROIP Admin can register on a concession's behalf) but falls back to a shared default concessionId rather than a real one, so it doesn't actually demonstrate which concession owns this ratepayer — use the concession's own token to test that for real. Accepts all ratepayer profile fields; only email (or phone number) and password (with confirmPassword) are strictly required. Since both email and phone are set here, the OTP goes to email (Mailpit, http://localhost:8025, not echoed in the response) — clear the email field to test the phone/SMS path with devOtpCode auto-filled instead. Optional idempotencyKey makes this safe to retry — e.g. a field agent registering a ratepayer with no signal, whose app generates the key once offline and resends the same request (same key, same body) once connectivity returns: a retry replays the original 201 response instead of creating a duplicate; the same key with a different body is rejected with 409.")
concession_register_ratepayer_item["event"] = [{"listen": "test", "script": {"exec": [
    "if (pm.response.code === 201) {\n  const res = pm.response.json();\n  pm.environment.set('ratepayer_id', res.id);\n  if (res.otp && res.otp.devOtpCode) {\n    pm.environment.set('ratepayer_otp_code', res.otp.devOtpCode);\n  }\n  pm.expect(res).to.have.property('completion');\n  pm.expect(res.completion).to.have.property('completionPercentage');\n  pm.expect(res.completion).to.have.property('missingSections');\n}"
], "type": "text/javascript"}}]

concession_update_ratepayer_item = item("Update a ratepayer profile", "PATCH", "ratepayer_url", "/v1/ratepayers/{{ratepayer_id}}", auth="concession", body={
    "firstName": "{{ratepayer_first_name}}",
    "lastName": "{{ratepayer_last_name}}",
    "address": "14 Independence Avenue, Accra",
    "latitude": 5.6037,
    "longitude": -0.1870
}, description="Use {{concession_access_token}}. Rejected with 403 if this ratepayer was registered by a different concession than the caller's token. Used to complete missing profile sections or update any field; omitted/updated fields immediately update completion metrics.")
concession_update_ratepayer_item["event"] = [{"listen": "test", "script": {"exec": [
    "if (pm.response.code === 200) {\n  const j = pm.response.json();\n  pm.expect(j).to.have.property('completion');\n}"
], "type": "text/javascript"}}]

# Onboarding also provisions and emails the concessionaire's first API client in the same
# call — capture everything needed to self-service test as that concessionaire right away.
concession_onboard_item = item("Onboard a concessionaire", "POST", "platform_governance_url", "/v1/concessions", auth="staff", body={
    "name": "RevTech Solutions Ltd",
    "businessRegistrationNumber": "CS123456789",
    "tin": "C0012345678",
    "contactName": "Ama Boateng",
    "contactPhone": "+233241234567",
    "contactEmail": "ops@revtech.com"
}, description="Onboards a concessionaire and, in the same call, provisions and emails its first API client (viewable at http://localhost:8025 in dev). The secret is shown exactly once, here and in that email — store it now. `code` is optional — omit it (as here) to have the server auto-generate one (CONC-YYYY-XXXX-XXXX); pass it explicitly only to pin a specific code.")
concession_onboard_item["event"] = [{"listen": "test", "script": {"exec": [
    "if (pm.response.code === 201) {\n  const res = pm.response.json();\n  pm.environment.set('concession_id', res.id);\n  if (res.apiClient) {\n    pm.environment.set('concession_client_id', res.apiClient.clientId);\n    pm.environment.set('concession_client_secret', res.apiClient.clientSecret);\n  }\n}"
], "type": "text/javascript"}}]

concession_mint_token_item = item("Mint access token (client_credentials)", "POST", "zitadel_issuer", "/oauth/v2/token", description="Mints a bearer token as this concessionaire's own API client, for the self-service requests below. Grant type: client_credentials.")
concession_mint_token_item["request"]["body"] = {
    "mode": "urlencoded",
    "urlencoded": [
        {"key": "grant_type", "value": "client_credentials"},
        {"key": "scope", "value": "openid urn:zitadel:iam:org:project:id:{{zitadel_project_id}}:roles urn:zitadel:iam:org:project:id:{{zitadel_project_id}}:aud"}
    ]
}
concession_mint_token_item["request"]["auth"] = {
    "type": "basic",
    "basic": [
        {"key": "username", "value": "{{concession_client_id}}", "type": "string"},
        {"key": "password", "value": "{{concession_client_secret}}", "type": "string"}
    ]
}
concession_mint_token_item["event"] = [{"listen": "test", "script": {"exec": [
    "if (pm.response.code === 200) { pm.environment.set('concession_access_token', pm.response.json().access_token); }"
], "type": "text/javascript"}}]

concession_rotate_own_item = item("Rotate my API credential", "POST", "platform_governance_url", "/v1/concessions/me/api-clients/rotate", auth="concession", description="Revokes your current credential at Zitadel and issues/emails a new one. You can never have two active credentials at once, so do this as soon as you suspect the current one is compromised.")
concession_rotate_own_item["event"] = [{"listen": "test", "script": {"exec": [
    "if (pm.response.code === 201) {\n  const res = pm.response.json();\n  pm.environment.set('concession_client_id', res.clientId);\n  pm.environment.set('concession_client_secret', res.clientSecret);\n}"
], "type": "text/javascript"}}]

concession_folder = folder("2. Concession", [
    folder("Properties", [
        item("Register a property", "POST", "property_registry_url", "/v1/properties", auth="concession", body={
            "propertyClass": "COMMERCIAL_CLASS_1", "buildingStatus": "COMPLETED",
            "propertyStatus": "ASSESSED", "propertyUse": "COMMERCIAL",
            "tenureType": "FREEHOLD", "structureType": "CONCRETE",
            "polygonGeoJson": {"type": "Polygon", "coordinates": [[[-0.2355, 5.5545], [-0.2355, 5.5555], [-0.2345, 5.5555], [-0.2345, 5.5545], [-0.2355, 5.5545]]]},
            "staffRef": "REV-0045"
        }, description="Use {{concession_access_token}} — this is the token minted from your client_id/client_secret (see 'Mint access token' above). The concession is identified from that token, not the request body. Concessions can only register properties whose polygon falls strictly within their assigned MMDA territory (enforced via Shared Services and Platform Governance) — a concession can hold more than one assigned MMDA at once. Spatial non-overlap restriction: polygons cannot overlap or contain another property parcel when property uses and ownership percentage match. Core classification fields are required; documents are optional. There is no propertyName field — a property starts unnamed, and only the ratepayer who later owns it can name it (see '1. Ratepayer > Rename my property'); a concession could never see that name again anyway (it's the ratepayer's own private label, not cadastre data). Required staffRef is the concession's own reference for whoever actually did this (see ConcessionPersonnel.externalStaffRef) — CROIP never resolves it to an identity, it just records it so the property's update history is genuinely attributable. Optional idempotencyKey makes this safe to retry — e.g. a field agent registering a property with no signal, whose app generates the key once offline and resends the same request (same key, same body) once connectivity returns: a retry replays the original 201 response instead of creating a duplicate; the same key with a different body is rejected with 409."),
        item("Register batch properties", "POST", "property_registry_url", "/v1/properties/batch", auth="concession", body={
            "properties": [
                {
                    "propertyClass": "COMMERCIAL_CLASS_1", "buildingStatus": "COMPLETED",
                    "propertyStatus": "ASSESSED", "propertyUse": "COMMERCIAL",
                    "tenureType": "FREEHOLD", "structureType": "CONCRETE",
                    "polygonGeoJson": {"type": "Polygon", "coordinates": [[[-0.2355, 5.5545], [-0.2355, 5.5555], [-0.2345, 5.5555], [-0.2345, 5.5545], [-0.2355, 5.5545]]]}
                },
                {
                    "propertyClass": "COMMERCIAL_CLASS_1", "buildingStatus": "COMPLETED",
                    "propertyStatus": "ASSESSED", "propertyUse": "COMMERCIAL",
                    "tenureType": "FREEHOLD", "structureType": "CONCRETE",
                    "polygonGeoJson": {"type": "Polygon", "coordinates": [[[-0.2345, 5.5545], [-0.2345, 5.5555], [-0.2335, 5.5555], [-0.2335, 5.5545], [-0.2345, 5.5545]]]}
                }
            ],
            "staffRef": "REV-0045"
        }, description="Use {{concession_access_token}}. Batch registration (up to 500 properties). Every property must fall within one of the concession's assigned MMDAs (it can hold more than one). Core classification fields are required for each property; code is generated if omitted; documents are optional. No propertyName field — see 'Register a property' above. Required staffRef (one per batch, not per property) is the concession's own reference for whoever did the whole batch. Optional idempotencyKey (one key covers the whole batch) makes this safe to retry after a connectivity gap — a retry with the same key and body replays the original 201 response instead of creating duplicates; the same key with a different body is rejected with 409."),
        item("Search/list properties in own assembly", "GET", "property_registry_url", "/v1/properties", auth="concession", description="propertyName is never included for a concession's own token — it's the owning ratepayer's private label, not cadastre data (see '1. Ratepayer > Rename my property')."),
        item("Get property details", "GET", "property_registry_url", "/v1/properties/{{property_id}}", auth="concession", description="propertyName is never included for a concession's own token — see 'Search/list properties' above."),
        item("Update property - metadata only (preserves valuation & status)", "PATCH", "property_registry_url", "/v1/properties/{{property_id}}", auth="concession", body={
            "accountNumber": "GA-0145-2026", "staffRef": "REV-0045"
        }, description="Use {{concession_access_token}}. Non-structural updates preserve valuations and verification status. Required staffRef — see 'Register a property' above; every update writes a row to this property's own update-history trail (visible in Get property details) recording who and when. propertyName, verifiedBy, claimedByRatepayerId and createdByRatepayerId are intentionally not accepted here — naming only happens through the ratepayer-only rename endpoint, verification only through the dedicated submit/review-verification endpoints, and ownership/provenance only through the claim flow; a plain update can never silently grant any of them."),
        item("Update property - structural / usage change (resets to UNASSESSED, decouples valuation)", "PATCH", "property_registry_url", "/v1/properties/{{property_id}}", auth="concession", body={
            "numberOfFloors": 4, "propertyUse": "COMMERCIAL", "structuralType": "MULTI_STOREY", "staffRef": "REV-0045"
        }, description="Use {{concession_access_token}}. Updates physical structure or property use (e.g. building renovation, repurposing, adding floors). Automatically marks property UNASSESSED, resets verificationStatus to PENDING, and decouples active valuations pending re-assessment. If polygonGeoJson is included and moves the property into a different MMDA, that MMDA is re-detected and re-checked against the concession's assigned territory (same boundary enforcement as registering a new property) and assemblyId updates to match. Required staffRef — see 'Update property - metadata only' above."),
        item("Declare sectional sub-unit", "POST", "property_registry_url", "/v1/properties/{{property_id}}/units", auth="concession", body={"unitIdentifier": "SHOP-01", "unitType": "SHOP", "floorLevel": 0}),
        item("Upload ownership docs on-premises", "POST", "property_registry_url", "/v1/properties/{{property_code}}/documents", auth="concession", body={
            "documentType": "BUILDING_PERMIT", "mediaUrl": "https://storage.croip.gov.gh/docs/permit.pdf",
            "staffRef": "REV-0045", "deviceId": "TAB-001", "premisesCoordinates": {"latitude": 5.5551, "longitude": -0.2351}
        }),
        item("List property documents", "GET", "property_registry_url", "/v1/properties/{{property_code}}/documents", auth="concession"),
        item("Submit a field verification", "POST", "property_registry_url", "/v1/properties/{{property_id}}/verifications", auth="staff", body={
            "verifiedByPersonnelId": "{{personnel_id}}", "verifierCoordinates": {"latitude": 5.5551, "longitude": -0.2351},
            "isWithinPolygon": True, "verifiedSnapshot": {}, "capturedAt": "2026-10-19T12:00:00Z", "outcome": "VERIFIED"
        }, description="Needs 'properties:verify', which is NOT among a concession API client's granted permissions (by design — a concession can't self-verify its own registrations) — this one genuinely requires {{staff_access_token}}, unlike the rest of this folder. Reviewed/approved afterwards by CROIP Admin (see that folder's Property Oversight section)."),
        item("List field verifications", "GET", "property_registry_url", "/v1/properties/{{property_id}}/verifications", auth="concession"),
        item("Delete individual property parcel", "DELETE", "property_registry_url", "/v1/properties/{{property_id}}", auth="concession", description="Use {{concession_access_token}}. Strictly rejected with 400 Bad Request if any bills on this property have been paid (in which case only ratepayer links can be severed). If eligible for deletion, automatically severs all ratepayer links in ratepayer-service and cascades units, valuations, documents, and photos."),
    ], "property-registry-service — a concession's field agents registering and verifying properties in their assigned MMDAs. Uses {{concession_access_token}} throughout (mint it first under 'API Clients (self-service)'), except field verification itself which genuinely needs {{staff_access_token}}."),
    folder("Ratepayers", [
        item("List/search ratepayers", "GET", "ratepayer_url", "/v1/ratepayers/directory", auth="concession", query={"page": "1", "pageSize": "20"}, description="Use {{concession_access_token}}. Same directory endpoint CROIP staff use, granted to a concession's own API client via ratepayers:read (the same shape of grant properties:read already gives it for GET /properties) — not automatically scoped to only this concession's own ratepayers, matching how properties:read already works platform-wide rather than per-assembly."),
        concession_register_ratepayer_item,
        concession_update_ratepayer_item,
        item("Delete a ratepayer profile", "DELETE", "ratepayer_url", "/v1/ratepayers/{{ratepayer_id}}", auth="concession", description="Use {{concession_access_token}}. Rejected with 403 if this ratepayer was registered by a different concession than the caller's token, or 400 Bad Request if the ratepayer has linked properties. To delete a ratepayer, first sever all property links or delete unbilled properties."),
    ], "ratepayer-service — ratepayer registration, update, and delete are concession-mediated: use {{concession_access_token}} (minted from the concession's own client_id/client_secret, not {{staff_access_token}}), since which concession a ratepayer belongs to is read from that token, not the request body. Update/delete are rejected with 403 for a ratepayer not registered by this concession. Ratepayer login, own-profile read, and claims stay unscoped (see 1. Ratepayer)."),
    folder("API Clients (self-service)", [
        concession_mint_token_item,
        item("List my API clients", "GET", "platform_governance_url", "/v1/concessions/me/api-clients", auth="concession", description="Never includes secrets — those are shown once, at issuance time."),
        concession_rotate_own_item,
        item("Revoke my API credential", "POST", "platform_governance_url", "/v1/concessions/me/api-clients/revoke", auth="concession", description="Revokes your current credential without issuing a replacement — you will need CROIP staff to re-provision one if you have no other way to authenticate afterward."),
    ], "platform-governance-service — a concessionaire managing its OWN API credential with its own current Bearer token (concessionId comes from that token, never a URL param, so you can only ever touch your own credential). CROIP provisions the first one at onboarding (see 3. CROIP Admin > Concession Management); this is what you integrate into your own system afterward."),
    folder("Billing & Collection", [
        item("Issue a bill", "POST", "billing_payments_url", "/v1/bills", auth="staff", body={
            "propertyId": "{{property_id}}", "ratepayerId": "{{ratepayer_id}}", "billingPeriod": "2026-Q4",
            "billType": "PROPERTY_RATE", "currency": "GHS", "amountDue": "450.00", "dueDate": "2026-12-31"
        }),
        item("Get a bill", "GET", "billing_payments_url", "/v1/bills/{{bill_number}}", auth="staff"),
        item("Check property billing payment status", "GET", "billing_payments_url", "/v1/bills/property-payment-status/{{property_id}}", auth="staff", description="Check whether any bills on this property have recorded payments. Returns hasPaidBills, paidBillsCount, and totalAmountPaid."),
        item("Record a payment", "POST", "billing_payments_url", "/v1/bills/{{bill_number}}/payments", auth="staff", body={
            "amount": "450.00", "paymentType": "MOBILE_MONEY", "externalPaymentRef": "MM-20261019-0001", "paidByRatepayerId": "{{ratepayer_id}}"
        }),
        item("Create a payment link", "POST", "billing_payments_url", "/v1/payment-links", auth="staff", body={"billNumber": "{{bill_number}}", "amount": "450.00"}),
    ], "billing-payments-service — issuing bills and collecting payment on behalf of the MMDA."),
    folder("Reporting", [
        item("Ingest a single CloudEvent", "POST", "reporting_gateway_url", "/v1/events", auth="staff", body={
            "eventType": "revenue.bill.paid.v1", "eventVersion": 1, "producer": "external-psp",
            "aggregateType": "Bill", "aggregateId": "{{bill_id}}", "aggregateVersion": 1,
            "concessionId": "{{concession_id}}", "assemblyId": ASSEMBLY,
            "correlationId": "{{$guid}}", "data": {"note": "example payload — match the real CloudEvent envelope your producer uses"}
        }),
        item("Ingest a batch of CloudEvents", "POST", "reporting_gateway_url", "/v1/event-batches", auth="staff", body={"events": []}),
        item("Check ingestion status", "GET", "reporting_gateway_url", "/v1/ingestions/{{ingestion_id}}", auth="staff"),
    ], "reporting-gateway-service — a concession's own backend reporting its transaction activity into the platform."),
    folder("Reference Data Lookups", [
        item("List regions", "GET", "shared_services_url", "/v1/regions", auth="staff"),
        item("List MMDAs (assemblies)", "GET", "shared_services_url", "/v1/assemblies", auth="staff", query={"regionId": REGION}),
        item("Detect zone for a point", "POST", "shared_services_url", "/v1/assemblies/detect-zone", auth="staff", body={"latitude": 5.5551, "longitude": -0.2351}),
        item("Detect zone for a polygon", "POST", "shared_services_url", "/v1/assemblies/detect-zone-for-polygon", auth="staff", body={"polygonGeoJson": {"type": "Polygon", "coordinates": [[[-0.2355, 5.5545], [-0.2355, 5.5555], [-0.2345, 5.5555], [-0.2345, 5.5545], [-0.2355, 5.5545]]]}}),
        item("List reference data", "GET", "shared_services_url", "/v1/reference-data", auth="staff", query={"category": "country"}),
    ], "shared-services (read-only) — everyday lookups a field agent needs; boundary/reference-data management itself is CROIP Admin's job."),
])
collection["item"].append(concession_folder)

# ======================================================================
# 3. CROIP ADMIN (central platform / oversight staff)
# ======================================================================
admin_folder = folder("3. CROIP Admin", [
    folder("Users & RBAC", [
        item("RBAC matrix", "GET", "platform_governance_url", "/v1/rbac/matrix", auth="staff"),
        item("List assignable roles", "GET", "platform_governance_url", "/v1/roles", auth="staff"),
        item("Grant permission to role", "PUT", "platform_governance_url", "/v1/rbac/roles/{{role_id}}/permissions/{{permission_id}}", auth="staff"),
        item("Revoke permission from role", "DELETE", "platform_governance_url", "/v1/rbac/roles/{{role_id}}/permissions/{{permission_id}}", auth="staff"),
        item("Register/invite an officer", "POST", "platform_governance_url", "/v1/users", auth="staff", body={"code": "OFFICER-002", "email": "officer2@croip.gov.gh", "fullName": "Kojo Owusu", "roleCode": "OVERSIGHT_OFFICER"}),
        item("List staff/officers", "GET", "platform_governance_url", "/v1/users", auth="staff"),
        item("My own officer profile", "GET", "platform_governance_url", "/v1/users/me", auth="staff"),
        item("Get an officer", "GET", "platform_governance_url", "/v1/users/{{user_id}}", auth="staff"),
        item("Update an officer", "PATCH", "platform_governance_url", "/v1/users/{{user_id}}", auth="staff", body={"status": "ACTIVE"}),
        item("Resend Zitadel invite", "POST", "platform_governance_url", "/v1/users/{{user_id}}/resend-invite", auth="staff"),
        item("Remove an officer", "DELETE", "platform_governance_url", "/v1/users/{{user_id}}", auth="staff"),
    ], "platform-governance-service"),
    folder("Concession Management", [
        concession_onboard_item,
        item("List concessionaires", "GET", "platform_governance_url", "/v1/concessions", auth="staff"),
        item("Get a concessionaire", "GET", "platform_governance_url", "/v1/concessions/{{concession_id}}", auth="staff"),
        item("Offboard a concessionaire", "POST", "platform_governance_url", "/v1/concessions/{{concession_id}}/deactivate", auth="staff"),
        item("List a concessionaire's MMDAs", "GET", "platform_governance_url", "/v1/concessions/{{concession_id}}/assemblies", auth="staff"),
        item("Assign an MMDA to a concessionaire", "POST", "platform_governance_url", "/v1/concessions/{{concession_id}}/assemblies", auth="staff", body={"assemblyId": ASSEMBLY, "contractEnd": "2027-12-31"}, description="The contract always starts the moment this call is made (stamped server-side) — there's no contractStart to send."),
        item("List a concessionaire's API clients", "GET", "platform_governance_url", "/v1/concessions/{{concession_id}}/api-clients", auth="staff", description="Never includes secrets — those are shown once, at issuance time, in the onboard/rotate response."),
        item("Rotate a concessionaire's API credential (administrative)", "POST", "platform_governance_url", "/v1/concessions/{{concession_id}}/api-clients/rotate", auth="staff", description="CROIP-staff override, e.g. the concessionaire lost all access and contacted support. Revokes the current credential at Zitadel and issues/emails a new one. A concessionaire's own self-service equivalent is under '2. Concession > API Clients (self-service)'."),
        item("Revoke a concessionaire's API credential (administrative)", "POST", "platform_governance_url", "/v1/concessions/{{concession_id}}/api-clients/revoke", auth="staff", description="Revokes the current credential without issuing a replacement."),
        item("Register a concessionaire's field personnel", "POST", "platform_governance_url", "/v1/concessions/{{concession_id}}/personnel", auth="staff", body={"externalStaffRef": "REV-0045", "fullName": "Yaw Boateng", "phone": "+233244000333"}),
        item("List a concessionaire's field personnel", "GET", "platform_governance_url", "/v1/concessions/{{concession_id}}/personnel", auth="staff"),
    ], "platform-governance-service — CROIP onboards, scopes, and offboards the revenue-collection partner companies (the concessions in folder 2 operate within what's set up here)."),
    folder("Ratepayer Oversight", [
        item("Ratepayer directory (paginated & searchable)", "GET", "ratepayer_url", "/v1/ratepayers/directory", auth="staff", query={"page": "1", "pageSize": "20"}),
        item("Get a ratepayer profile", "GET", "ratepayer_url", "/v1/ratepayers/{{ratepayer_id}}", auth="staff"),
        item("Update ratepayer profile (administrative)", "PATCH", "ratepayer_url", "/v1/ratepayers/{{ratepayer_id}}", auth="staff", body={"address": "14 Independence Avenue, Accra"}, description="Administers granular updates to any individual field of a ratepayer profile without touching other fields."),
        item("Verify KYC (administrative verification: GHANA_CARD, PASSPORT, DRIVERS_LICENSE)", "POST", "ratepayer_url", "/v1/ratepayers/{{ratepayer_id}}/verifications", auth="staff", body={"provider": "GHANA_CARD", "autoVerify": True}, description="Administers ratepayer KYC verification. Exactly 3 allowed providers: GHANA_CARD, PASSPORT, DRIVERS_LICENSE. Setting a new provider archives previous verifications for audit trail."),
        item("Sever ratepayer link to a property", "DELETE", "ratepayer_url", "/v1/ratepayers/{{ratepayer_id}}/properties/{{property_id}}", auth="staff", description="Sever link between a ratepayer and an individual property."),
        item("Delete individual ratepayer profile", "DELETE", "ratepayer_url", "/v1/ratepayers/{{ratepayer_id}}", auth="staff", description="Delete ratepayer profile. Blocked with 400 Bad Request if linked properties exist."),
    ], "ratepayer-service — administrative oversight, directory search, KYC verification, link severing, and deletion of ratepayers."),
    folder("Property Oversight", [
        item("Update property parcel (administrative)", "PATCH", "property_registry_url", "/v1/properties/{{property_id}}", auth="staff", body={"numberOfFloors": 2, "propertyUse": "MIXED_USE", "staffRef": "CROIP-OVERSIGHT-001"}, description="Administrative update of a property parcel. Updating structural/usage fields decouples active valuations and resets property status to UNASSESSED and verification to PENDING. Required staffRef identifies whoever made this specific change — for a CROIP officer it can just be their own reference/username, same field a concession uses for its own personnel."),
        item("Review a field verification", "PATCH", "property_registry_url", "/v1/verifications/{{verification_id}}/review", auth="staff", body={"reviewStatus": "APPROVED", "reviewedByPersonnelId": "{{personnel_id}}"}),
        item("Delete individual property parcel", "DELETE", "property_registry_url", "/v1/properties/{{property_id}}", auth="staff", description="Administrative deletion of an individual property parcel. Blocked if paid bills exist; severs all ratepayer links if unbilled."),
    ], "property-registry-service — the approval step after a concession agent submits a field verification."),
    folder("Billing Oversight", [
        item("Bill directory (all concessions/ratepayers)", "GET", "billing_payments_url", "/v1/bills", auth="staff", query={"page": "1", "pageSize": "20"}),
        item("List bills by ratepayer", "GET", "billing_payments_url", "/v1/bills", auth="staff", query={"ratepayerId": "{{ratepayer_id}}", "page": "1", "pageSize": "20"}),
        item("Check property billing payment status", "GET", "billing_payments_url", "/v1/bills/property-payment-status/{{property_id}}", auth="staff", description="Check whether any bills on this property have recorded payments."),
        item("Payment ledger (all concessions/ratepayers)", "GET", "billing_payments_url", "/v1/payments", auth="staff", query={"page": "1", "pageSize": "20"}),
        item("List payments by ratepayer", "GET", "billing_payments_url", "/v1/payments", auth="staff", query={"paidByRatepayerId": "{{ratepayer_id}}", "page": "1", "pageSize": "20"}),
    ], "billing-payments-service — the platform-wide view, distinct from a single concession's own billing operations."),
    folder("Dispute Review", [
        item("Review queue", "GET", "dispute_url", "/v1/disputes", auth="staff", query={"status": "OPEN"}),
        item("List disputes by ratepayer", "GET", "dispute_url", "/v1/disputes", auth="staff", query={"raisedByRatepayerId": "{{ratepayer_id}}"}),
        item("Get a dispute", "GET", "dispute_url", "/v1/disputes/{{dispute_code}}", auth="staff"),
        item("Transition dispute status", "PATCH", "dispute_url", "/v1/disputes/{{dispute_code}}/status", auth="staff", body={"status": "RESOLVED", "resolution": "Bill amount corrected to match published rate."}),
    ], "dispute-service — an officer reviewing/resolving disputes a ratepayer raised (see Ratepayer folder for raising one)."),
    folder("Reconciliation & Oversight", [
        item("Initiate a reconciliation run", "POST", "oversight_reconciliation_url", "/v1/reconciliation/run", auth="staff", body={"periodStart": "2026-10-01T00:00:00Z", "periodEnd": "2026-10-19T23:59:59Z", "assemblyId": ASSEMBLY}),
        item("List reconciliation runs", "GET", "oversight_reconciliation_url", "/v1/reconciliation/runs", auth="staff"),
        item("Query open exceptions", "GET", "oversight_reconciliation_url", "/v1/exceptions", auth="staff"),
        item("Resolve an exception (maker-checker)", "POST", "oversight_reconciliation_url", "/v1/exceptions/{{exception_id}}/action", auth="staff", body={"action": "APPROVE", "notes": "Confirmed against independent MoMo evidence"}),
        item("National collection metrics", "GET", "oversight_reconciliation_url", "/v1/oversight/metrics", auth="staff"),
    ], "oversight-reconciliation-service"),
    folder("Audit Assurance", [
        item("Query audit log", "GET", "audit_assurance_url", "/v1/audit/records", auth="staff", query={"concessionId": "{{concession_id}}"}),
        item("Verify archive manifest integrity", "POST", "audit_assurance_url", "/v1/assurance/verify", auth="staff", body={"manifestId": "{{manifest_id}}"}),
        item("End-to-end auditor trace", "GET", "audit_assurance_url", "/v1/assurance/trace/{{target_id}}", auth="staff"),
    ], "audit-assurance-service"),
    folder("Independent Financial Evidence", [
        item("Ingest provider evidence (PSP/MoMo/Bank)", "POST", "independent_evidence_url", "/v1/provider-evidence", auth="staff", body={
            "provider": "MOMO", "providerReference": "MM-20261019-0001", "amount": "150.00", "currency": "GHS",
            "transactionDate": "2026-10-19T12:00:00Z", "payerMsisdn": "+233244000222", "rawPayload": {}
        }),
        item("Get an evidence record", "GET", "independent_evidence_url", "/v1/provider-evidence/{{evidence_id}}", auth="staff"),
        item("Submit control totals", "POST", "independent_evidence_url", "/v1/control-totals", auth="staff", body={
            "provider": "MOMO", "periodStart": "2026-10-01T00:00:00Z", "periodEnd": "2026-10-19T23:59:59Z",
            "totalCount": 120, "totalAmount": "18000.00", "currency": "GHS"
        }),
    ], "independent-evidence-service — financial institutions reporting independently of the concession, used to cross-check reconciliation."),
    folder("Event Processing", [
        item("List quarantined events", "GET", "event_processing_url", "/v1/quarantine", auth="staff"),
        item("Get a quarantined event", "GET", "event_processing_url", "/v1/quarantine/{{event_id}}", auth="staff"),
        item("Resolve a quarantined event", "POST", "event_processing_url", "/v1/quarantine/{{event_id}}/resolve", auth="staff", body={"resolutionNotes": "Reprocessed after fixing upstream schema mismatch", "action": "REPLAY"}),
        item("Get operational projection", "GET", "event_processing_url", "/v1/operational-view/{{aggregate_type}}/{{aggregate_id}}", auth="staff"),
    ], "event-processing-service"),
    folder("Boundary & Reference Data Management", [
        item("Create a region", "POST", "shared_services_url", "/v1/regions", auth="staff", body={"code": "GH-AH", "name": "Ashanti Region"}),
        item("Draw/replace a region boundary", "PATCH", "shared_services_url", "/v1/regions/{{region_id}}/boundary", auth="staff", body={"polygonGeoJson": {"type": "Polygon", "coordinates": [[[0, 0], [0, 1], [1, 1], [1, 0], [0, 0]]]}}),
        item("Create an MMDA", "POST", "shared_services_url", "/v1/assemblies", auth="staff", body={"regionId": REGION, "code": "GH0701", "name": "Ablekuma Central Municipal", "category": "MUNICIPAL"}),
        item("Draw/replace an MMDA boundary", "PATCH", "shared_services_url", "/v1/assemblies/{{assembly_id}}/boundary", auth="staff", body={"polygonGeoJson": {"type": "Polygon", "coordinates": [[[0, 0], [0, 1], [1, 1], [1, 0], [0, 0]]]}}),
        item("Create/update a reference data item", "POST", "shared_services_url", "/v1/reference-data", auth="staff", body={"category": "country", "code": "GH", "name": "Ghana", "metadata": {"flag": "🇬🇭"}}),
        item("Delete a reference data item", "DELETE", "shared_services_url", "/v1/reference-data/{{reference_data_id}}", auth="staff"),
        item("List active concession scopes", "GET", "shared_services_url", "/v1/concessions", auth="staff"),
        item("Submit a notification request", "POST", "shared_services_url", "/v1/messages", auth="staff", body={"channel": "SMS", "to": "+233244000222", "template": "OTP_LOGIN", "idempotencyKey": "{{$guid}}", "data": {"code": "123456"}}),
        item("Get notification delivery status", "GET", "shared_services_url", "/v1/messages/{{message_id}}", auth="staff"),
    ], "shared-services (write/management) — drawing official boundaries and maintaining canonical reference data; read-only lookups live under Concession."),
    folder("Ratepayer Oversight", [
        item("Ratepayer summary metrics (public)", "GET", "ratepayer_url", "/v1/ratepayers"),
        item("Ratepayer directory", "GET", "ratepayer_url", "/v1/ratepayers/directory", auth="staff", query={"page": "1", "pageSize": "20"}),
        item("Get a ratepayer profile", "GET", "ratepayer_url", "/v1/ratepayers/{{ratepayer_id}}", auth="staff"),
        item("List ratepayer linked properties", "GET", "ratepayer_url", "/v1/ratepayers/{{ratepayer_id}}/properties", auth="staff"),
        item("Update ratepayer account status", "PATCH", "ratepayer_url", "/v1/ratepayers/{{ratepayer_id}}/status", auth="staff", body={"status": "SUSPENDED"}, description="CROIP portal / oversight official updates a ratepayer's account status (ACTIVE, SUSPENDED, DEACTIVATED)."),
        item("Review a KYC verification", "PATCH", "ratepayer_url", "/v1/ratepayers/{{ratepayer_id}}/verifications/{{verification_id}}", auth="staff", body={"verificationStatus": "VERIFIED"}),
    ], "ratepayer-service — oversight-wide views, account status management, and the KYC approval step, distinct from a ratepayer's own self-service endpoints."),
    folder("Admin Purge Operations", [
        item("Purge all properties", "POST", "property_registry_url", "/v1/properties/purge", auth="staff", description="Admin purge all registered property parcels, units, valuations, photos, documents, and verifications across all assemblies. Ghana regions and MMDA boundaries remain completely untouched."),
        item("Purge all concessions", "POST", "platform_governance_url", "/v1/concessions/purge", auth="staff", description="Admin purge all partner concessionaires, assigned contracts, field personnel, and API clients. Strictly preserves the superuser account (superuser@croip.com) and SUPER_ADMIN RBAC role."),
        item("Purge all ratepayers", "POST", "ratepayer_url", "/v1/ratepayers/purge", auth="staff", description="Admin purge all citizen & corporate ratepayer profiles, verifications, OTPs, and property claims. MMDA boundaries remain completely untouched."),
        item("Purge all bills & payments", "POST", "billing_payments_url", "/v1/bills/purge", auth="staff", description="Admin purge all property bills, payment links, and payment transaction records."),
        item("Purge all disputes", "POST", "dispute_url", "/v1/disputes/purge", auth="staff", description="Admin purge all disputes, evidence files, and comments.")
    ], "High-privilege admin purge operations. Permanently erases domain data while strictly preserving regions, MMDA boundaries, and superuser accounts."),
    folder("Zitadel Dev Tools", [
        item("Machine-to-machine token (client_credentials)", "POST", "zitadel_issuer", "/oauth/v2/token", description="Grant type: client_credentials. Use for service accounts (e.g. property-registry-service's own machine user). Body is form-urlencoded — see Body tab."),
    ], "Minting a staff access token for Postman testing itself (not a platform API) — real officers sign in through the portal's browser-based Zitadel login."),
])
# fix the client_credentials request (form-urlencoded + basic auth + test script)
zitadel_req = admin_folder["item"][-1]["item"][0]
zitadel_req["request"]["body"] = {
    "mode": "urlencoded",
    "urlencoded": [
        {"key": "grant_type", "value": "client_credentials"},
        {"key": "scope", "value": "openid urn:zitadel:iam:org:project:id:{{zitadel_project_id}}:roles urn:zitadel:iam:org:project:id:{{zitadel_project_id}}:aud"}
    ]
}
zitadel_req["request"]["auth"] = {
    "type": "basic",
    "basic": [
        {"key": "username", "value": "{{machine_client_id}}", "type": "string"},
        {"key": "password", "value": "{{machine_client_secret}}", "type": "string"}
    ]
}
zitadel_req["event"] = [{"listen": "test", "script": {"exec": [
    "if (pm.response.code === 200) { pm.environment.set('machine_access_token', pm.response.json().access_token); }"
], "type": "text/javascript"}}]
collection["item"].append(admin_folder)

# ======================================================================
# Health checks (infra, not persona-specific)
# ======================================================================
health_items = []
for svc_var in ["reporting_gateway_url", "event_processing_url", "independent_evidence_url", "shared_services_url",
                "oversight_reconciliation_url", "audit_assurance_url", "billing_payments_url", "dispute_url",
                "platform_governance_url", "property_registry_url", "ratepayer_url"]:
    label = svc_var.replace("_url", "").replace("_", " ").title()
    health_items.append(item(f"{label} — liveness", "GET", svc_var, "/health/live"))
    health_items.append(item(f"{label} — readiness", "GET", svc_var, "/health/ready"))
collection["item"].append(folder("Platform Health Checks", health_items, "All 11 services — not tied to any persona."))
OUTPUT_DIR = os.path.dirname(os.path.abspath(__file__))
collection_path = os.path.join(OUTPUT_DIR, "CROIP.postman_collection.json")
with open(collection_path, "w") as f:
    json.dump(collection, f, indent=2)
print("Saved collection to:", collection_path)

if os.path.isdir("/tmp/croip-branding"):
    with open("/tmp/croip-branding/CROIP.postman_collection.json", "w") as f:
        json.dump(collection, f, indent=2)

def count_items(items):
    total = 0
    for it in items:
        if "item" in it:
            total += count_items(it["item"])
        else:
            total += 1
    return total

print("Total requests:", count_items(collection["item"]))
print("Top-level folders:", [f["name"] for f in collection["item"]])

# ======================================================================
# Environment (unchanged from before)
# ======================================================================
def var(key, value, secret=False):
    return {"key": key, "value": value, "type": "secret" if secret else "default", "enabled": True}

environment = {
    "id": "93fc3540-e998-4a99-9d51-b60a9b237a74",
    "name": "CROIP Local Dev",
    "values": [
        var("reporting_gateway_url", "http://localhost:3001"),
        var("event_processing_url", "http://localhost:3002"),
        var("independent_evidence_url", "http://localhost:3003"),
        var("shared_services_url", "http://localhost:3004"),
        var("oversight_reconciliation_url", "http://localhost:3005"),
        var("audit_assurance_url", "http://localhost:3006"),
        var("billing_payments_url", "http://localhost:3007"),
        var("dispute_url", "http://localhost:3008"),
        var("platform_governance_url", "http://localhost:3010"),
        var("property_registry_url", "http://localhost:3020"),
        var("ratepayer_url", "http://localhost:3030"),
        var("zitadel_issuer", "http://localhost:8080"),
        var("zitadel_project_id", "396579532015927301"),
        var("portal_url", "http://localhost:3050"),
        var("staff_access_token", "", secret=True),
        var("machine_client_id", "property-registry-service"),
        var("machine_client_secret", "", secret=True),
        var("machine_access_token", "", secret=True),
        var("concession_client_id", "", secret=True),
        var("concession_client_secret", "", secret=True),
        var("concession_access_token", "", secret=True),
        var("ratepayer_first_name", "Ama"),
        var("ratepayer_middle_name", ""),
        var("ratepayer_last_name", "Serwaa"),
        var("ratepayer_name", "Ama Serwaa"),
        var("ratepayer_phone", "+233244000222"),
        var("ratepayer_email", "ama.serwaa@example.com"),
        var("ratepayer_password", "SuperSecret123!", secret=True),
        var("ratepayer_otp_code", "", secret=True),
        var("ratepayer_access_token", "", secret=True),
        var("region_id", "37ff22e8-5da9-4a62-982c-03b1fa355170"),
        var("assembly_id", "4b755a60-ec63-424b-bfa8-9519f3334c0c"),
        var("concession_id", ""),
        var("concession_code", ""),
        var("ratepayer_id", ""),
        var("property_id", ""),
        var("property_code", "GH0701-SELF-0001"),
        var("bill_id", ""),
        var("bill_number", ""),
        var("dispute_code", ""),
        var("user_id", ""),
        var("role_id", ""),
        var("permission_id", ""),
        var("personnel_id", ""),
        var("verification_id", ""),
        var("event_id", ""),
        var("aggregate_type", "Bill"),
        var("aggregate_id", ""),
        var("evidence_id", ""),
        var("exception_id", ""),
        var("manifest_id", ""),
        var("target_id", ""),
        var("reference_data_id", ""),
        var("message_id", ""),
        var("receipt_id", ""),
        var("ingestion_id", "")
    ],
    "_postman_variable_scope": "environment"
}

env_path = os.path.join(OUTPUT_DIR, "CROIP.postman_environment.json")
with open(env_path, "w") as f:
    json.dump(environment, f, indent=2)
print("Saved environment to:", env_path)

if os.path.isdir("/tmp/croip-branding"):
    with open("/tmp/croip-branding/CROIP.postman_environment.json", "w") as f:
        json.dump(environment, f, indent=2)

print("Environment variables:", len(environment["values"]))
