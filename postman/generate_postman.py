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
    return {"name": name, "request": req, "response": []}

def folder(name, items, description=""):
    return {"name": name, "description": description, "item": items}

REGION = "{{sample_region_id}}"
ASSEMBLY = "{{sample_assembly_id}}"

collection = {
    "info": {
        "_postman_id": str(uuid.uuid4()),
        "name": "CROIP Central Platform API",
        "description": "Central Revenue Oversight & Integration Platform — all 11 microservice APIs, organized by WHO calls them rather than which service owns them:\n\n- **1. Ratepayer** — citizen self-service: register, log in (password + OTP), complete profile, self-service property registration, own bills/disputes, receipt verification.\n- **2. Concession** — revenue-collection partner field staff: property registration/verification in the field, billing and payment collection, event reporting, reference-data lookups.\n- **3. CROIP Admin** — central platform/oversight staff: user & RBAC management, concession onboarding, reconciliation, audit, boundary/reference-data management, review/approval steps.\n- **Platform Health Checks** — infra liveness/readiness, not tied to any persona.\n\nSome endpoints are genuinely cross-cutting (e.g. a property verification is *submitted* by Concession staff but *reviewed* by CROIP Admin) — each lives under the persona who actually calls that specific endpoint, with a note where the split matters.\n\n**Auth model**\n- Ratepayer: no auth for register/claims/receipt-verification; phone/email + password + OTP issues `{{ratepayer_access_token}}` (HS256, ratepayer-service). Running 'Verify OTP' auto-saves it.\n- Concession & CROIP Admin: both use the same real Zitadel-issued `{{staff_access_token}}` (RBAC permissions decide what each officer can actually do) — there's no API-only login by design; sign into the portal (http://localhost:3050) as a real officer and copy the access token (see README).",
        "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
    },
    "variable": [],
    "item": []
}

# ======================================================================
# 1. RATEPAYER
# ======================================================================
rp_register_item = item("Register (public)", "POST", "ratepayer_url", "/v1/ratepayers", body={
    "legalName": "{{ratepayer_name}}", "phone": "{{ratepayer_phone}}", "email": "{{ratepayer_email}}",
    "password": "{{ratepayer_password}}", "regionId": REGION, "assemblyId": ASSEMBLY,
    "locationGeo": {"type": "Point", "coordinates": [-0.2351, 5.5551]}
})
rp_register_item["event"] = [{"listen": "test", "script": {"exec": [
    "if (pm.response.code === 201) { pm.environment.set('sample_ratepayer_id', pm.response.json().id); }"
], "type": "text/javascript"}}]

rp_login_item = item("Login step 1: password → OTP", "POST", "ratepayer_url", "/v1/auth/login", body={
    "identifier": "{{ratepayer_phone}}", "password": "{{ratepayer_password}}"
}, description="devOtpCode is only present because no SMS provider is configured in this dev environment — a production deployment sends it by SMS instead and drops the field.")
rp_login_item["event"] = [{"listen": "test", "script": {"exec": [
    "if (pm.response.code === 200) { const j = pm.response.json(); if (j.devOtpCode) pm.environment.set('ratepayer_otp_code', j.devOtpCode); }"
], "type": "text/javascript"}}]

rp_verify_item = item("Login step 2: verify OTP → session token", "POST", "ratepayer_url", "/v1/auth/verify-otp", body={
    "identifier": "{{ratepayer_phone}}", "otpCode": "{{ratepayer_otp_code}}"
})
rp_verify_item["event"] = [{"listen": "test", "script": {"exec": [
    "if (pm.response.code === 200) { pm.environment.set('ratepayer_access_token', pm.response.json().accessToken); }"
], "type": "text/javascript"}}]

ratepayer_folder = folder("1. Ratepayer", [
    folder("Auth & Profile", [
        rp_register_item,
        rp_login_item,
        rp_verify_item,
        item("Get my own profile", "GET", "ratepayer_url", "/v1/ratepayers/me", auth="ratepayer"),
        item("Complete / update my profile", "PATCH", "ratepayer_url", "/v1/ratepayers/me", auth="ratepayer", body={"legalName": "{{ratepayer_name}} Jr.", "email": "{{ratepayer_email}}"}),
        item("Get a ratepayer profile by id (public)", "GET", "ratepayer_url", "/v1/ratepayers/{{sample_ratepayer_id}}"),
    ], "ratepayer-service — the only API-level login flow in the platform; everything below needs ratepayer_access_token from 'Login step 2'."),
    folder("My Properties", [
        item("Register a property (self-service)", "POST", "property_registry_url", "/v1/properties", auth="ratepayer", body={
            "code": "GH0701-SELF-{{$randomInt}}", "propertyName": "My Residence", "propertyUse": "RESIDENTIAL",
            "documents": [{"documentType": "LAND_TITLE_CERTIFICATE", "documentNumber": "LTC-00982", "mediaUrl": "https://storage.croip.gov.gh/claims/ltc-00982.pdf"}],
            "polygonGeoJson": {"type": "Polygon", "coordinates": [[[-0.2355, 5.5545], [-0.2355, 5.5555], [-0.2345, 5.5555], [-0.2345, 5.5545], [-0.2355, 5.5545]]]}
        }, description="Strictly requires ratepayer Bearer session token (HS256). Property is attributed to the logged-in ratepayer (createdByRatepayerId) and automatically linked in ratepayer-service. Ownership documents are mandatory. Spatial restriction: polygons cannot overlap or contain another property parcel if property uses and ownership match (prevents duplicate residential house registrations)."),
        item("Claim an existing property (public)", "POST", "ratepayer_url", "/v1/ratepayers/claims", body={
            "ratepayerId": "{{sample_ratepayer_id}}", "propertyId": "{{sample_property_id}}",
            "ownershipType": "OWNER", "documents": [{"documentType": "INDENTURE", "mediaUrl": "https://storage.croip.gov.gh/claims/indenture.pdf"}]
        }),
        item("Claim a property by code (public)", "POST", "ratepayer_url", "/v1/properties/{{sample_property_code}}/claims", body={
            "propertyId": "{{sample_property_id}}",
            "documents": [{"documentType": "INDENTURE", "mediaUrl": "https://storage.croip.gov.gh/claims/indenture.pdf"}]
        }),
        item("List my linked properties (public)", "GET", "ratepayer_url", "/v1/ratepayers/{{sample_ratepayer_id}}/properties"),
    ], "property-registry-service + ratepayer-service — a property a ratepayer registers directly, or claims from one a concession already registered."),
    folder("My Bills & Disputes", [
        item("My own bills", "GET", "billing_payments_url", "/v1/me/bills", auth="ratepayer"),
        item("Raise a dispute", "POST", "dispute_url", "/v1/disputes", auth="ratepayer", body={
            "disputeType": "BILLING", "billId": "{{sample_bill_id}}", "description": "Billed amount does not match the posted rate for my property class."
        }),
        item("My own disputes", "GET", "dispute_url", "/v1/me/disputes", auth="ratepayer"),
        item("Attach evidence to my dispute", "POST", "dispute_url", "/v1/disputes/{{sample_dispute_code}}/evidence", auth="ratepayer", body={"mediaUrl": "https://storage.croip.gov.gh/disputes/evidence-1.pdf", "description": "Previous year's bill for comparison"}, description="Also usable by the reviewing officer (CROIP Admin) — same endpoint, same permission check (raise-or-review)."),
        item("Add a comment to my dispute", "POST", "dispute_url", "/v1/disputes/{{sample_dispute_code}}/comments", auth="ratepayer", body={"comment": "Following up on this — any update?"}, description="Also usable by the reviewing officer (CROIP Admin) — same endpoint, same permission check (raise-or-review)."),
    ], "billing-payments-service + dispute-service"),
    folder("Receipts", [
        item("Verify a digital payment receipt (public)", "GET", "shared_services_url", "/v1/receipts/{{sample_receipt_id}}/verification"),
    ], "shared-services — lets a ratepayer (or anyone holding a receipt) confirm it's genuine."),
])
collection["item"].append(ratepayer_folder)

# ======================================================================
# 2. CONCESSION (revenue-collection partner field staff)
# ======================================================================
concession_folder = folder("2. Concession", [
    folder("Properties", [
        item("Register a property", "POST", "property_registry_url", "/v1/properties", auth="staff", body={
            "code": "GH0701-{{$randomInt}}", "propertyName": "Sample Commercial Block",
            "propertyClass": "COMMERCIAL_CLASS_1", "buildingStatus": "COMPLETED",
            "propertyStatus": "ASSESSED", "propertyUse": "COMMERCIAL",
            "tenureType": "FREEHOLD", "structureType": "CONCRETE",
            "polygonGeoJson": {"type": "Polygon", "coordinates": [[[-0.2355, 5.5545], [-0.2355, 5.5555], [-0.2345, 5.5555], [-0.2345, 5.5545], [-0.2355, 5.5545]]]}
        }, description="Requires staff/concessionaire Bearer token. Concessions can only register properties whose polygon falls strictly within their assigned MMDA territory (enforced via Shared Services and Platform Governance). Spatial non-overlap restriction: polygons cannot overlap or contain another property parcel when property uses and ownership percentage match. Core classification fields are required; propertyName and documents are optional."),
        item("Register batch properties", "POST", "property_registry_url", "/v1/properties/batch", auth="staff", body={
            "properties": [
                {
                    "code": "GH0701-B1-{{$randomInt}}", "propertyName": "Sample Commercial Block A",
                    "propertyClass": "COMMERCIAL_CLASS_1", "buildingStatus": "COMPLETED",
                    "propertyStatus": "ASSESSED", "propertyUse": "COMMERCIAL",
                    "tenureType": "FREEHOLD", "structureType": "CONCRETE",
                    "polygonGeoJson": {"type": "Polygon", "coordinates": [[[-0.2355, 5.5545], [-0.2355, 5.5555], [-0.2345, 5.5555], [-0.2345, 5.5545], [-0.2355, 5.5545]]]}
                },
                {
                    "code": "GH0701-B2-{{$randomInt}}", "propertyName": "Sample Commercial Block B",
                    "propertyClass": "COMMERCIAL_CLASS_1", "buildingStatus": "COMPLETED",
                    "propertyStatus": "ASSESSED", "propertyUse": "COMMERCIAL",
                    "tenureType": "FREEHOLD", "structureType": "CONCRETE",
                    "polygonGeoJson": {"type": "Polygon", "coordinates": [[[-0.2345, 5.5545], [-0.2345, 5.5555], [-0.2335, 5.5555], [-0.2335, 5.5545], [-0.2345, 5.5545]]]}
                }
            ]
        }, description="Concession batch registration (up to 500 properties). All properties must fall within the concession's assigned MMDA boundary. Core classification fields are required for each property; code is generated if omitted; propertyName and documents are optional."),
        item("Search/list properties in own assembly", "GET", "property_registry_url", "/v1/properties", auth="staff"),
        item("Get property details", "GET", "property_registry_url", "/v1/properties/{{sample_property_id}}", auth="staff"),
        item("Declare sectional sub-unit", "POST", "property_registry_url", "/v1/properties/{{sample_property_id}}/units", auth="staff", body={"unitIdentifier": "SHOP-01", "unitType": "SHOP", "floorLevel": 0}),
        item("Upload ownership docs on-premises", "POST", "property_registry_url", "/v1/properties/{{sample_property_code}}/documents", auth="staff", body={
            "documentType": "BUILDING_PERMIT", "mediaUrl": "https://storage.croip.gov.gh/docs/permit.pdf",
            "staffRef": "REV-0045", "deviceId": "TAB-001", "premisesCoordinates": {"latitude": 5.5551, "longitude": -0.2351}
        }),
        item("List property documents", "GET", "property_registry_url", "/v1/properties/{{sample_property_code}}/documents", auth="staff"),
        item("Submit a field verification", "POST", "property_registry_url", "/v1/properties/{{sample_property_id}}/verifications", auth="staff", body={
            "verifiedByPersonnelId": "{{sample_personnel_id}}", "verifierCoordinates": {"latitude": 5.5551, "longitude": -0.2351},
            "isWithinPolygon": True, "verifiedSnapshot": {}, "capturedAt": "2026-10-19T12:00:00Z", "outcome": "VERIFIED"
        }, description="Reviewed/approved afterwards by CROIP Admin (see that folder's Property Oversight section)."),
        item("List field verifications", "GET", "property_registry_url", "/v1/properties/{{sample_property_id}}/verifications", auth="staff"),
    ], "property-registry-service — a concession's field agents registering and verifying properties in their assigned MMDAs."),
    folder("Billing & Collection", [
        item("Issue a bill", "POST", "billing_payments_url", "/v1/bills", auth="staff", body={
            "propertyId": "{{sample_property_id}}", "ratepayerId": "{{sample_ratepayer_id}}", "billingPeriod": "2026-Q4",
            "billType": "PROPERTY_RATE", "currency": "GHS", "amountDue": "450.00", "dueDate": "2026-12-31"
        }),
        item("Get a bill", "GET", "billing_payments_url", "/v1/bills/{{sample_bill_number}}", auth="staff"),
        item("Record a payment", "POST", "billing_payments_url", "/v1/bills/{{sample_bill_number}}/payments", auth="staff", body={
            "amount": "450.00", "paymentType": "MOBILE_MONEY", "externalPaymentRef": "MM-20261019-0001", "paidByRatepayerId": "{{sample_ratepayer_id}}"
        }),
        item("Create a payment link", "POST", "billing_payments_url", "/v1/payment-links", auth="staff", body={"billNumber": "{{sample_bill_number}}", "amount": "450.00"}),
    ], "billing-payments-service — issuing bills and collecting payment on behalf of the MMDA."),
    folder("Reporting", [
        item("Ingest a single CloudEvent", "POST", "reporting_gateway_url", "/v1/events", auth="staff", body={
            "eventType": "revenue.bill.paid.v1", "eventVersion": 1, "producer": "external-psp",
            "aggregateType": "Bill", "aggregateId": "{{sample_bill_id}}", "aggregateVersion": 1,
            "concessionId": "{{sample_concession_id}}", "assemblyId": ASSEMBLY,
            "correlationId": "{{$guid}}", "data": {"note": "example payload — match the real CloudEvent envelope your producer uses"}
        }),
        item("Ingest a batch of CloudEvents", "POST", "reporting_gateway_url", "/v1/event-batches", auth="staff", body={"events": []}),
        item("Check ingestion status", "GET", "reporting_gateway_url", "/v1/ingestions/{{sample_ingestion_id}}", auth="staff"),
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
        item("Grant permission to role", "PUT", "platform_governance_url", "/v1/rbac/roles/{{sample_role_id}}/permissions/{{sample_permission_id}}", auth="staff"),
        item("Revoke permission from role", "DELETE", "platform_governance_url", "/v1/rbac/roles/{{sample_role_id}}/permissions/{{sample_permission_id}}", auth="staff"),
        item("Register/invite an officer", "POST", "platform_governance_url", "/v1/users", auth="staff", body={"code": "OFFICER-002", "email": "officer2@croip.gov.gh", "fullName": "Kojo Owusu", "roleCode": "OVERSIGHT_OFFICER"}),
        item("List staff/officers", "GET", "platform_governance_url", "/v1/users", auth="staff"),
        item("My own officer profile", "GET", "platform_governance_url", "/v1/users/me", auth="staff"),
        item("Get an officer", "GET", "platform_governance_url", "/v1/users/{{sample_user_id}}", auth="staff"),
        item("Update an officer", "PATCH", "platform_governance_url", "/v1/users/{{sample_user_id}}", auth="staff", body={"status": "ACTIVE"}),
        item("Resend Zitadel invite", "POST", "platform_governance_url", "/v1/users/{{sample_user_id}}/resend-invite", auth="staff"),
        item("Remove an officer", "DELETE", "platform_governance_url", "/v1/users/{{sample_user_id}}", auth="staff"),
    ], "platform-governance-service"),
    folder("Concession Management", [
        item("Onboard a concessionaire", "POST", "platform_governance_url", "/v1/concessions", auth="staff", body={"code": "REVTECH", "name": "RevTech Solutions Ltd", "contactEmail": "ops@revtech.com"}),
        item("List concessionaires", "GET", "platform_governance_url", "/v1/concessions", auth="staff"),
        item("Get a concessionaire", "GET", "platform_governance_url", "/v1/concessions/{{sample_concession_id}}", auth="staff"),
        item("Offboard a concessionaire", "POST", "platform_governance_url", "/v1/concessions/{{sample_concession_id}}/deactivate", auth="staff"),
        item("List a concessionaire's MMDAs", "GET", "platform_governance_url", "/v1/concessions/{{sample_concession_id}}/assemblies", auth="staff"),
        item("Assign an MMDA to a concessionaire", "POST", "platform_governance_url", "/v1/concessions/{{sample_concession_id}}/assemblies", auth="staff", body={"assemblyId": ASSEMBLY, "contractStart": "2026-01-01", "contractEnd": "2027-12-31"}),
        item("List a concessionaire's API clients", "GET", "platform_governance_url", "/v1/concessions/{{sample_concession_id}}/api-clients", auth="staff"),
        item("Provision M2M credentials for a concessionaire", "POST", "platform_governance_url", "/v1/concessions/{{sample_concession_id}}/api-clients", auth="staff"),
        item("Register a concessionaire's field personnel", "POST", "platform_governance_url", "/v1/concessions/{{sample_concession_id}}/personnel", auth="staff", body={"externalStaffRef": "REV-0045", "fullName": "Yaw Boateng", "phone": "+233244000333"}),
        item("List a concessionaire's field personnel", "GET", "platform_governance_url", "/v1/concessions/{{sample_concession_id}}/personnel", auth="staff"),
    ], "platform-governance-service — CROIP onboards, scopes, and offboards the revenue-collection partner companies (the concessions in folder 2 operate within what's set up here)."),
    folder("Property Oversight", [
        item("Review a field verification", "PATCH", "property_registry_url", "/v1/verifications/{{sample_verification_id}}/review", auth="staff", body={"reviewStatus": "APPROVED", "reviewedByPersonnelId": "{{sample_personnel_id}}"}),
    ], "property-registry-service — the approval step after a concession agent submits a field verification."),
    folder("Billing Oversight", [
        item("Bill directory (all concessions/ratepayers)", "GET", "billing_payments_url", "/v1/bills", auth="staff", query={"page": "1", "pageSize": "20"}),
        item("List bills by ratepayer", "GET", "billing_payments_url", "/v1/bills", auth="staff", query={"ratepayerId": "{{sample_ratepayer_id}}", "page": "1", "pageSize": "20"}),
        item("Payment ledger (all concessions/ratepayers)", "GET", "billing_payments_url", "/v1/payments", auth="staff", query={"page": "1", "pageSize": "20"}),
        item("List payments by ratepayer", "GET", "billing_payments_url", "/v1/payments", auth="staff", query={"paidByRatepayerId": "{{sample_ratepayer_id}}", "page": "1", "pageSize": "20"}),
    ], "billing-payments-service — the platform-wide view, distinct from a single concession's own billing operations."),
    folder("Dispute Review", [
        item("Review queue", "GET", "dispute_url", "/v1/disputes", auth="staff", query={"status": "OPEN"}),
        item("List disputes by ratepayer", "GET", "dispute_url", "/v1/disputes", auth="staff", query={"raisedByRatepayerId": "{{sample_ratepayer_id}}"}),
        item("Get a dispute", "GET", "dispute_url", "/v1/disputes/{{sample_dispute_code}}", auth="staff"),
        item("Transition dispute status", "PATCH", "dispute_url", "/v1/disputes/{{sample_dispute_code}}/status", auth="staff", body={"status": "RESOLVED", "resolution": "Bill amount corrected to match published rate."}),
    ], "dispute-service — an officer reviewing/resolving disputes a ratepayer raised (see Ratepayer folder for raising one)."),
    folder("Reconciliation & Oversight", [
        item("Initiate a reconciliation run", "POST", "oversight_reconciliation_url", "/v1/reconciliation/run", auth="staff", body={"periodStart": "2026-10-01T00:00:00Z", "periodEnd": "2026-10-19T23:59:59Z", "assemblyId": ASSEMBLY}),
        item("List reconciliation runs", "GET", "oversight_reconciliation_url", "/v1/reconciliation/runs", auth="staff"),
        item("Query open exceptions", "GET", "oversight_reconciliation_url", "/v1/exceptions", auth="staff"),
        item("Resolve an exception (maker-checker)", "POST", "oversight_reconciliation_url", "/v1/exceptions/{{sample_exception_id}}/action", auth="staff", body={"action": "APPROVE", "notes": "Confirmed against independent MoMo evidence"}),
        item("National collection metrics", "GET", "oversight_reconciliation_url", "/v1/oversight/metrics", auth="staff"),
    ], "oversight-reconciliation-service"),
    folder("Audit Assurance", [
        item("Query audit log", "GET", "audit_assurance_url", "/v1/audit/records", auth="staff", query={"concessionId": "{{sample_concession_id}}"}),
        item("Verify archive manifest integrity", "POST", "audit_assurance_url", "/v1/assurance/verify", auth="staff", body={"manifestId": "{{sample_manifest_id}}"}),
        item("End-to-end auditor trace", "GET", "audit_assurance_url", "/v1/assurance/trace/{{sample_target_id}}", auth="staff"),
    ], "audit-assurance-service"),
    folder("Independent Financial Evidence", [
        item("Ingest provider evidence (PSP/MoMo/Bank)", "POST", "independent_evidence_url", "/v1/provider-evidence", auth="staff", body={
            "provider": "MOMO", "providerReference": "MM-20261019-0001", "amount": "150.00", "currency": "GHS",
            "transactionDate": "2026-10-19T12:00:00Z", "payerMsisdn": "+233244000222", "rawPayload": {}
        }),
        item("Get an evidence record", "GET", "independent_evidence_url", "/v1/provider-evidence/{{sample_evidence_id}}", auth="staff"),
        item("Submit control totals", "POST", "independent_evidence_url", "/v1/control-totals", auth="staff", body={
            "provider": "MOMO", "periodStart": "2026-10-01T00:00:00Z", "periodEnd": "2026-10-19T23:59:59Z",
            "totalCount": 120, "totalAmount": "18000.00", "currency": "GHS"
        }),
    ], "independent-evidence-service — financial institutions reporting independently of the concession, used to cross-check reconciliation."),
    folder("Event Processing", [
        item("List quarantined events", "GET", "event_processing_url", "/v1/quarantine", auth="staff"),
        item("Get a quarantined event", "GET", "event_processing_url", "/v1/quarantine/{{sample_event_id}}", auth="staff"),
        item("Resolve a quarantined event", "POST", "event_processing_url", "/v1/quarantine/{{sample_event_id}}/resolve", auth="staff", body={"resolutionNotes": "Reprocessed after fixing upstream schema mismatch", "action": "REPLAY"}),
        item("Get operational projection", "GET", "event_processing_url", "/v1/operational-view/{{sample_aggregate_type}}/{{sample_aggregate_id}}", auth="staff"),
    ], "event-processing-service"),
    folder("Boundary & Reference Data Management", [
        item("Create a region", "POST", "shared_services_url", "/v1/regions", auth="staff", body={"code": "GH-AH", "name": "Ashanti Region"}),
        item("Draw/replace a region boundary", "PATCH", "shared_services_url", "/v1/regions/{{sample_region_id}}/boundary", auth="staff", body={"polygonGeoJson": {"type": "Polygon", "coordinates": [[[0, 0], [0, 1], [1, 1], [1, 0], [0, 0]]]}}),
        item("Create an MMDA", "POST", "shared_services_url", "/v1/assemblies", auth="staff", body={"regionId": REGION, "code": "GH0701", "name": "Ablekuma Central Municipal", "category": "MUNICIPAL"}),
        item("Draw/replace an MMDA boundary", "PATCH", "shared_services_url", "/v1/assemblies/{{sample_assembly_id}}/boundary", auth="staff", body={"polygonGeoJson": {"type": "Polygon", "coordinates": [[[0, 0], [0, 1], [1, 1], [1, 0], [0, 0]]]}}),
        item("Create/update a reference data item", "POST", "shared_services_url", "/v1/reference-data", auth="staff", body={"category": "country", "code": "GH", "name": "Ghana", "metadata": {"flag": "🇬🇭"}}),
        item("Delete a reference data item", "DELETE", "shared_services_url", "/v1/reference-data/{{sample_reference_data_id}}", auth="staff"),
        item("List active concession scopes", "GET", "shared_services_url", "/v1/concessions", auth="staff"),
        item("Submit a notification request", "POST", "shared_services_url", "/v1/messages", auth="staff", body={"channel": "SMS", "to": "+233244000222", "template": "OTP_LOGIN", "idempotencyKey": "{{$guid}}", "data": {"code": "123456"}}),
        item("Get notification delivery status", "GET", "shared_services_url", "/v1/messages/{{sample_message_id}}", auth="staff"),
    ], "shared-services (write/management) — drawing official boundaries and maintaining canonical reference data; read-only lookups live under Concession."),
    folder("Ratepayer Oversight", [
        item("Ratepayer summary metrics (public)", "GET", "ratepayer_url", "/v1/ratepayers"),
        item("Ratepayer directory", "GET", "ratepayer_url", "/v1/ratepayers/directory", auth="staff", query={"page": "1", "pageSize": "20"}),
        item("Get a ratepayer profile", "GET", "ratepayer_url", "/v1/ratepayers/{{sample_ratepayer_id}}", auth="staff"),
        item("List ratepayer linked properties", "GET", "ratepayer_url", "/v1/ratepayers/{{sample_ratepayer_id}}/properties", auth="staff"),
        item("Update ratepayer account status", "PATCH", "ratepayer_url", "/v1/ratepayers/{{sample_ratepayer_id}}/status", auth="staff", body={"status": "SUSPENDED"}, description="CROIP portal / oversight official updates a ratepayer's account status (ACTIVE, SUSPENDED, DEACTIVATED)."),
        item("Review a KYC verification", "PATCH", "ratepayer_url", "/v1/ratepayers/{{sample_ratepayer_id}}/verifications/{{sample_verification_id}}", auth="staff", body={"verificationStatus": "VERIFIED"}),
    ], "ratepayer-service — oversight-wide views, account status management, and the KYC approval step, distinct from a ratepayer's own self-service endpoints."),
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
    "id": str(uuid.uuid4()),
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
        var("zitadel_project_id", "395706197476376592"),
        var("portal_url", "http://localhost:3050"),
        var("staff_access_token", "", secret=True),
        var("machine_client_id", "property-registry-service"),
        var("machine_client_secret", "", secret=True),
        var("machine_access_token", "", secret=True),
        var("ratepayer_name", "Ama Serwaa"),
        var("ratepayer_phone", "+233244000222"),
        var("ratepayer_email", "ama.serwaa@example.com"),
        var("ratepayer_password", "SuperSecret123!", secret=True),
        var("ratepayer_otp_code", "", secret=True),
        var("ratepayer_access_token", "", secret=True),
        var("sample_region_id", "37ff22e8-5da9-4a62-982c-03b1fa355170"),
        var("sample_assembly_id", "4b755a60-ec63-424b-bfa8-9519f3334c0c"),
        var("sample_concession_id", ""),
        var("sample_ratepayer_id", ""),
        var("sample_property_id", ""),
        var("sample_property_code", "GH0701-SELF-0001"),
        var("sample_bill_id", ""),
        var("sample_bill_number", ""),
        var("sample_dispute_code", ""),
        var("sample_user_id", ""),
        var("sample_role_id", ""),
        var("sample_permission_id", ""),
        var("sample_personnel_id", ""),
        var("sample_verification_id", ""),
        var("sample_event_id", ""),
        var("sample_aggregate_type", "Bill"),
        var("sample_aggregate_id", ""),
        var("sample_evidence_id", ""),
        var("sample_exception_id", ""),
        var("sample_manifest_id", ""),
        var("sample_target_id", ""),
        var("sample_reference_data_id", ""),
        var("sample_message_id", ""),
        var("sample_receipt_id", ""),
        var("sample_ingestion_id", "")
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
