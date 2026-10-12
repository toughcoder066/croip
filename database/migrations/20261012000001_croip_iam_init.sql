-- ============================================================================
-- CROIP (Central Revenue Oversight & Integration Platform)
-- Module: Identity, User Management, Scoped RBAC & Ratepayers
-- Version: 1.0.0
-- Dialect: PostgreSQL 15+ (Compatible with Supabase / Self-hosted PostgreSQL)
-- ============================================================================

-- Extensions required
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "citext";

-- Schema isolation for security & modularity
CREATE SCHEMA IF NOT EXISTS croip_iam;

-- ----------------------------------------------------------------------------
-- 1. ENUMS & DOMAINS
-- ----------------------------------------------------------------------------

-- Identity Provider source (supporting Supabase Auth, ZITADEL, local, etc.)
CREATE TYPE croip_iam.idp_provider_type AS ENUM (
    'LOCAL',
    'SUPABASE_AUTH',
    'ZITADEL',
    'OIDC_GOV',
    'MACHINE_CREDENTIALS'
);

-- User Persona Types
CREATE TYPE croip_iam.user_type AS ENUM (
    'CROIP_GOV_ADMIN',       -- Internal Ministry / Central Government / Regulators
    'CONCESSIONAIRE_USER',   -- External concessionaire operations / back-office
    'RATEPAYER',             -- Citizen / Business / Property Owner
    'FIELD_AGENT',           -- Concessionaire field/enforcement agent
    'SERVICE_ACCOUNT'        -- Machine-to-machine microservice (e.g., iDARMS gateway)
);

-- User account lifecycle state
CREATE TYPE croip_iam.account_status AS ENUM (
    'PENDING_ACTIVATION',
    'ACTIVE',
    'SUSPENDED',
    'DEACTIVATED',
    'LOCKED_OUT'
);

-- Verification levels for Ratepayers / Citizens
CREATE TYPE croip_iam.kyc_status AS ENUM (
    'UNVERIFIED',
    'PHONE_VERIFIED',
    'GHANA_CARD_SUBMITTED',
    'GHANA_CARD_VERIFIED',
    'ENTERPRISE_TIN_VERIFIED'
);

-- Scope levels for RBAC (National down to Municipal)
CREATE TYPE croip_iam.scope_level AS ENUM (
    'NATIONAL',              -- Whole country (Executive, Super Admin, National Auditor)
    'REGIONAL',              -- Administrative Region (e.g., Greater Accra, Ashanti)
    'CONCESSIONAIRE',        -- All concessions assigned to a specific Concessionaire
    'MUNICIPALITY'           -- Single District/Municipal/Metropolitan Assembly (MMDA)
);

-- ----------------------------------------------------------------------------
-- 2. CORE USERS & IDENTITIES
-- ----------------------------------------------------------------------------

-- Master identity record (decoupled from the specific auth provider)
CREATE TABLE croip_iam.users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Immutable internal reference code (e.g., USR-2026-00001)
    user_code VARCHAR(32) UNIQUE NOT NULL,
    
    -- Persona type
    user_type croip_iam.user_type NOT NULL,
    
    -- Status
    status croip_iam.account_status NOT NULL DEFAULT 'ACTIVE',
    
    -- Primary contact channels
    email CITEXT UNIQUE,
    phone_number VARCHAR(20) UNIQUE,
    
    -- Authentication federation (external IdP link)
    idp_provider croip_iam.idp_provider_type NOT NULL DEFAULT 'LOCAL',
    idp_subject_id VARCHAR(255) UNIQUE, -- Subject identifier from ZITADEL, Supabase Auth (auth.users.id), etc.
    
    -- Security flags
    is_mfa_enabled BOOLEAN NOT NULL DEFAULT FALSE,
    mfa_enforced BOOLEAN NOT NULL DEFAULT FALSE,
    failed_login_attempts INT NOT NULL DEFAULT 0,
    locked_until TIMESTAMPTZ,
    
    -- Metadata & Auditing
    metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
    last_login_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT clock_timestamp(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT clock_timestamp()
);

CREATE INDEX idx_users_type_status ON croip_iam.users(user_type, status);
CREATE INDEX idx_users_idp ON croip_iam.users(idp_provider, idp_subject_id);
CREATE INDEX idx_users_phone ON croip_iam.users(phone_number) WHERE phone_number IS NOT NULL;
CREATE INDEX idx_users_email ON croip_iam.users(email) WHERE email IS NOT NULL;


-- ----------------------------------------------------------------------------
-- 3. PERSONA PROFILES (Specialized 1-to-1 extension tables)
-- ----------------------------------------------------------------------------

-- Profile 1: Government & Internal CROIP Staff
CREATE TABLE croip_iam.gov_staff_profiles (
    user_id UUID PRIMARY KEY REFERENCES croip_iam.users(id) ON DELETE CASCADE,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    designation VARCHAR(150),                     -- e.g. "Director of Oversight", "Rate Card Verification Officer"
    department VARCHAR(150) NOT NULL,              -- e.g. "Ministry of Local Government", "CROIP Operations Unit"
    employee_id VARCHAR(50),
    official_phone VARCHAR(20),
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT clock_timestamp(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT clock_timestamp()
);

-- Profile 2: Concessionaire Staff & Operators
CREATE TABLE croip_iam.concessionaire_user_profiles (
    user_id UUID PRIMARY KEY REFERENCES croip_iam.users(id) ON DELETE CASCADE,
    concessionaire_id UUID NOT NULL,               -- Foreign key to master concessionaires table
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    staff_id VARCHAR(50),
    department VARCHAR(100),                       -- e.g., "Valuation & GIS", "Billing", "Collections"
    created_at TIMESTAMPTZ NOT NULL DEFAULT clock_timestamp(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT clock_timestamp()
);
CREATE INDEX idx_concessionaire_profiles_company ON croip_iam.concessionaire_user_profiles(concessionaire_id);

-- Profile 3: Ratepayer (Citizen, Business owner, Property owner)
CREATE TABLE croip_iam.ratepayer_profiles (
    user_id UUID PRIMARY KEY REFERENCES croip_iam.users(id) ON DELETE CASCADE,
    ratepayer_type VARCHAR(20) NOT NULL DEFAULT 'INDIVIDUAL' CHECK (ratepayer_type IN ('INDIVIDUAL', 'ORGANIZATION')),
    
    -- Name details
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    company_name VARCHAR(255),
    
    -- National ID & Tax identification
    ghana_card_number VARCHAR(30) UNIQUE,          -- Encrypted or hash-indexed in production (e.g., GHA-123456789-0)
    ghana_card_hash VARCHAR(64) UNIQUE,            -- SHA-256 for lookup without decrypting
    tin_number VARCHAR(30),                        -- GRA Tax Identification Number
    
    -- KYC Level
    kyc_status croip_iam.kyc_status NOT NULL DEFAULT 'PHONE_VERIFIED',
    kyc_verified_at TIMESTAMPTZ,
    kyc_verified_by UUID REFERENCES croip_iam.users(id),
    
    -- Contact & Communication Preferences
    primary_email CITEXT,
    primary_phone VARCHAR(20) NOT NULL,
    preferred_channel VARCHAR(20) NOT NULL DEFAULT 'SMS' CHECK (preferred_channel IN ('SMS', 'EMAIL', 'WHATSAPP', 'APP_PUSH')),
    preferred_language VARCHAR(10) NOT NULL DEFAULT 'en',
    
    -- National billing delivery address
    postal_address TEXT,
    digital_address_ghpost VARCHAR(20),            -- e.g., AK-039-5028
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT clock_timestamp(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT clock_timestamp()
);
CREATE INDEX idx_ratepayers_ghana_card_hash ON croip_iam.ratepayer_profiles(ghana_card_hash) WHERE ghana_card_hash IS NOT NULL;
CREATE INDEX idx_ratepayers_phone ON croip_iam.ratepayer_profiles(primary_phone);

-- Profile 4: Field Agents (POS handhelds, field valuation, cashless payment assistance)
CREATE TABLE croip_iam.field_agent_profiles (
    user_id UUID PRIMARY KEY REFERENCES croip_iam.users(id) ON DELETE CASCADE,
    concessionaire_id UUID NOT NULL,
    agent_badge_id VARCHAR(50) UNIQUE NOT NULL,
    supervisor_user_id UUID REFERENCES croip_iam.users(id),
    device_imei_whitelist VARCHAR(100)[],
    is_cashless_assisted_pay_allowed BOOLEAN NOT NULL DEFAULT TRUE,
    daily_collection_limit_pesewas BIGINT DEFAULT 10000000, -- e.g. GHc 100,000 safety threshold
    created_at TIMESTAMPTZ NOT NULL DEFAULT clock_timestamp(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT clock_timestamp()
);
CREATE INDEX idx_agents_concessionaire ON croip_iam.field_agent_profiles(concessionaire_id);


-- ----------------------------------------------------------------------------
-- 4. MACHINE IDENTITIES (API Clients for Concessionaire Microservices)
-- ----------------------------------------------------------------------------

-- Connects microservices like iDARMS, Valuation Systems, Bank Gateways
CREATE TABLE croip_iam.api_clients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    concessionaire_id UUID,                        -- NULL for system integrations (e.g. Bank/Arkesel)
    client_name VARCHAR(150) NOT NULL,             -- e.g. "iDARMS Production Connector", "GhanaPostGPS Adapter"
    client_id VARCHAR(64) UNIQUE NOT NULL,         -- Public OAuth2 Client ID
    client_secret_hash VARCHAR(255) NOT NULL,      -- Argon2 / bcrypt hash of secret
    
    -- Scopes and allowances
    allowed_scopes TEXT[] NOT NULL DEFAULT ARRAY['events:write', 'bills:submit'],
    allowed_ip_cidr INET[],                        -- Optional IP Whitelist restriction
    
    -- Status and rotation
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    expires_at TIMESTAMPTZ,
    last_used_at TIMESTAMPTZ,
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT clock_timestamp(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT clock_timestamp()
);
CREATE INDEX idx_api_clients_id ON croip_iam.api_clients(client_id);


-- ----------------------------------------------------------------------------
-- 5. FINE-GRAINED ROLE-BASED ACCESS CONTROL (RBAC) & SCOPES
-- ----------------------------------------------------------------------------

-- 5.1 Atomic Permissions Catalogue
CREATE TABLE croip_iam.permissions (
    id VARCHAR(100) PRIMARY KEY,                   -- e.g. 'rate_cards:verify', 'disbursements:approve', 'properties:read'
    category VARCHAR(50) NOT NULL,                 -- e.g. 'RATING', 'FINANCE', 'AUDIT', 'REGISTER', 'SYSTEM'
    display_name VARCHAR(150) NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT clock_timestamp()
);

-- 5.2 Roles (Standard bundles of permissions)
CREATE TABLE croip_iam.roles (
    id VARCHAR(50) PRIMARY KEY,                    -- e.g. 'SUPER_ADMIN', 'RATE_CARD_VERIFIER', 'FINANCE_APPROVER'
    role_type croip_iam.user_type NOT NULL,        -- Target audience
    name VARCHAR(100) NOT NULL,
    description TEXT,
    is_system_role BOOLEAN NOT NULL DEFAULT TRUE,  -- Built-in vs custom created
    created_at TIMESTAMPTZ NOT NULL DEFAULT clock_timestamp()
);

-- 5.3 Role Permission Mappings
CREATE TABLE croip_iam.role_permissions (
    role_id VARCHAR(50) NOT NULL REFERENCES croip_iam.roles(id) ON DELETE CASCADE,
    permission_id VARCHAR(100) NOT NULL REFERENCES croip_iam.permissions(id) ON DELETE CASCADE,
    PRIMARY KEY (role_id, permission_id)
);

-- 5.4 User Role Assignments WITH HIERARCHICAL SCOPING
-- A user can have different roles with different scopes (e.g. Auditor for District A, Verifier for Region B)
CREATE TABLE croip_iam.user_role_assignments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES croip_iam.users(id) ON DELETE CASCADE,
    role_id VARCHAR(50) NOT NULL REFERENCES croip_iam.roles(id) ON DELETE CASCADE,
    
    -- Scope boundaries
    scope_level croip_iam.scope_level NOT NULL DEFAULT 'NATIONAL',
    region_id VARCHAR(50),                         -- e.g. 'GREATER_ACCRA'
    concessionaire_id UUID,                        -- Restricts to specific concessionaire
    municipality_id VARCHAR(50),                   -- Restricts to specific District Assembly (e.g. 'MMA-AMA')
    
    -- Maker-checker audit on role grants
    assigned_by UUID REFERENCES croip_iam.users(id),
    expires_at TIMESTAMPTZ,                        -- Time-bound access elevation
    created_at TIMESTAMPTZ NOT NULL DEFAULT clock_timestamp(),
    
    -- Prevent duplicate overlapping assignment
    CONSTRAINT uq_user_role_scope UNIQUE NULLS NOT DISTINCT (
        user_id, role_id, scope_level, region_id, concessionaire_id, municipality_id
    )
);
CREATE INDEX idx_user_roles_user ON croip_iam.user_role_assignments(user_id);
CREATE INDEX idx_user_roles_municipality ON croip_iam.user_role_assignments(municipality_id) WHERE municipality_id IS NOT NULL;


-- ----------------------------------------------------------------------------
-- 6. IMMUTABLE SECURITY & AUDIT TRAIL
-- ----------------------------------------------------------------------------

CREATE TABLE croip_iam.audit_logs (
    id BIGSERIAL PRIMARY KEY,
    occurred_at TIMESTAMPTZ NOT NULL DEFAULT clock_timestamp(),
    
    -- Actor information
    actor_user_id UUID REFERENCES croip_iam.users(id) ON DELETE SET NULL,
    actor_user_type croip_iam.user_type,
    actor_ip_address INET,
    user_agent TEXT,
    
    -- Action details
    action VARCHAR(100) NOT NULL,                  -- e.g. 'AUTH.LOGIN_SUCCESS', 'ROLE.ASSIGNED', 'RATE_CARD.VERIFIED'
    entity_type VARCHAR(100) NOT NULL,              -- e.g. 'USER', 'RATE_CARD', 'DISBURSEMENT_BATCH'
    entity_id VARCHAR(100) NOT NULL,
    
    -- Context & Diff
    diff_payload JSONB,                            -- Changes before/after
    status_code VARCHAR(30) NOT NULL DEFAULT 'SUCCESS',
    failure_reason TEXT
);

-- Optimization: Partition by month or append-only write strategy in high-throughput setups
CREATE INDEX idx_audit_actor ON croip_iam.audit_logs(actor_user_id, occurred_at DESC);
CREATE INDEX idx_audit_entity ON croip_iam.audit_logs(entity_type, entity_id, occurred_at DESC);
CREATE INDEX idx_audit_action ON croip_iam.audit_logs(action, occurred_at DESC);

-- Trigger to disallow UPDATE or DELETE on audit logs
CREATE OR REPLACE FUNCTION croip_iam.fn_prevent_audit_tampering()
RETURNS TRIGGER AS $$
BEGIN
    RAISE EXCEPTION 'Audit records are append-only and cannot be updated or deleted.';
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_protect_audit_logs
BEFORE UPDATE OR DELETE ON croip_iam.audit_logs
FOR EACH ROW EXECUTE FUNCTION croip_iam.fn_prevent_audit_tampering();


-- ----------------------------------------------------------------------------
-- 7. SEED DATA: STANDARD ROLES & PERMISSIONS
-- ----------------------------------------------------------------------------

-- Standard permissions
INSERT INTO croip_iam.permissions (id, category, display_name, description) VALUES
    -- Oversight & Policy
    ('dashboards:view_national', 'OVERSIGHT', 'View National Dashboards', 'Access consolidated national revenue and KPIs'),
    ('policy:approve', 'OVERSIGHT', 'Approve Policy Rules', 'Authorise changes to split percentages and rules'),
    
    -- Concession Management
    ('concessionaires:manage', 'CONCESSIONS', 'Manage Concessionaires', 'Onboard, modify or offboard concessionaires'),
    ('api_clients:manage', 'SECURITY', 'Manage API Clients', 'Create, rotate and revoke machine credentials'),
    
    -- Rate Cards & Valuation
    ('rate_cards:submit', 'RATING', 'Submit Rate Cards', 'Submit municipal rate card schedules'),
    ('rate_cards:verify', 'RATING', 'Verify Rate Cards', 'Approve or reject municipal rate cards'),
    ('bills:submit', 'BILLING', 'Submit Bills', 'Concessionaire microservice submitting bills'),
    ('bills:review', 'BILLING', 'Review Bills', 'Review flagged or non-matching bill calculations'),
    
    -- Payments & Disbursements
    ('payments:view', 'FINANCE', 'View Payments', 'View transaction ledgers and payment receipts'),
    ('disbursements:prepare', 'FINANCE', 'Prepare Disbursement Batches', 'Generate daily split & disbursement runs'),
    ('disbursements:approve', 'FINANCE', 'Approve Disbursement Batches', 'Checker authorisation for settlement transfer'),
    ('reconciliation:manage', 'FINANCE', 'Manage Reconciliation', 'Review bank statements vs gateway records'),
    
    -- System & IAM
    ('iam:users_manage', 'IAM', 'Manage Platform Users', 'Invite, suspend, and configure internal staff accounts'),
    ('iam:roles_assign', 'IAM', 'Assign User Roles', 'Grant or revoke roles and scopes to users'),
    ('audit:read', 'AUDIT', 'View Audit Logs', 'Read system audit and forensic trails'),
    ('disputes:manage', 'SUPPORT', 'Manage Ratepayer Disputes', 'Review and resolve ratepayer billing disputes')
ON CONFLICT (id) DO NOTHING;

-- Standard Core Roles
INSERT INTO croip_iam.roles (id, role_type, name, description) VALUES
    ('EXECUTIVE_OVERSIGHT', 'CROIP_GOV_ADMIN', 'Executive Oversight', 'Ministerial and Leadership view of national performance and policy approvals'),
    ('SUPER_ADMIN', 'CROIP_GOV_ADMIN', 'Platform Super Administrator', 'Central administration, user management and platform configurations'),
    ('CONCESSIONAIRE_MANAGER', 'CROIP_GOV_ADMIN', 'Concessionaire Manager', 'Manages district assembly boundaries, concession assignments and credentials'),
    ('RATE_CARD_VERIFIER', 'CROIP_GOV_ADMIN', 'Rate Card Verification Officer', 'Checks and signs off municipal rate cards prior to billing activation'),
    ('FINANCE_OFFICER', 'CROIP_GOV_ADMIN', 'Finance & Reconciliation Officer', 'Performs daily reconciliation and prepares disbursement batches'),
    ('FINANCE_APPROVER', 'CROIP_GOV_ADMIN', 'Finance Approver (Checker)', 'Second-signatory authorizing bank disbursements and split changes'),
    ('AUDITOR', 'CROIP_GOV_ADMIN', 'National Auditor', 'Read-only access across all records, ledgers, and tamper-proof logs'),
    ('SUPPORT_OFFICER', 'CROIP_GOV_ADMIN', 'Disputes & Support Officer', 'Handles citizen inquiries, missing receipts and disputes'),
    ('CONCESSIONAIRE_ADMIN', 'CONCESSIONAIRE_USER', 'Concessionaire Administrator', 'Administrative lead for a concessionaire system'),
    ('CONCESSIONAIRE_BILLING', 'CONCESSIONAIRE_USER', 'Concessionaire Billing Officer', 'Submits property valuations, roll registers, and bill batches')
ON CONFLICT (id) DO NOTHING;

-- Link standard permissions to roles
INSERT INTO croip_iam.role_permissions (role_id, permission_id) VALUES
    -- Executive
    ('EXECUTIVE_OVERSIGHT', 'dashboards:view_national'),
    ('EXECUTIVE_OVERSIGHT', 'policy:approve'),
    ('EXECUTIVE_OVERSIGHT', 'audit:read'),
    
    -- Super Admin
    ('SUPER_ADMIN', 'iam:users_manage'),
    ('SUPER_ADMIN', 'iam:roles_assign'),
    ('SUPER_ADMIN', 'concessionaires:manage'),
    ('SUPER_ADMIN', 'api_clients:manage'),
    ('SUPER_ADMIN', 'audit:read'),
    
    -- Rate Card Verifier
    ('RATE_CARD_VERIFIER', 'rate_cards:verify'),
    ('RATE_CARD_VERIFIER', 'bills:review'),
    
    -- Finance Separation of Duties
    ('FINANCE_OFFICER', 'payments:view'),
    ('FINANCE_OFFICER', 'reconciliation:manage'),
    ('FINANCE_OFFICER', 'disbursements:prepare'),
    ('FINANCE_APPROVER', 'payments:view'),
    ('FINANCE_APPROVER', 'disbursements:approve'),
    
    -- Auditor
    ('AUDITOR', 'dashboards:view_national'),
    ('AUDITOR', 'payments:view'),
    ('AUDITOR', 'audit:read')
ON CONFLICT DO NOTHING;

-- ----------------------------------------------------------------------------
-- 8. HELPER SECURITY FUNCTIONS (For RLS & JWT Auth Token Inspection)
-- ----------------------------------------------------------------------------

-- Function to check if a user has a specific permission within an applicable scope
CREATE OR REPLACE FUNCTION croip_iam.has_permission(
    p_user_id UUID,
    p_permission_id VARCHAR,
    p_municipality_id VARCHAR DEFAULT NULL,
    p_concessionaire_id UUID DEFAULT NULL
)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1
        FROM croip_iam.user_role_assignments ura
        JOIN croip_iam.role_permissions rp ON rp.role_id = ura.role_id
        WHERE ura.user_id = p_user_id
          AND rp.permission_id = p_permission_id
          AND (ura.expires_at IS NULL OR ura.expires_at > clock_timestamp())
          AND (
              -- National scope grants permission across everything
              ura.scope_level = 'NATIONAL'
              -- Concessionaire scope match
              OR (ura.scope_level = 'CONCESSIONAIRE' AND (p_concessionaire_id IS NULL OR ura.concessionaire_id = p_concessionaire_id))
              -- Municipal scope match
              OR (ura.scope_level = 'MUNICIPALITY' AND (p_municipality_id IS NULL OR ura.municipality_id = p_municipality_id))
          )
    );
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER;
