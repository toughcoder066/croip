-- ============================================================================
-- CROIP IAM Auth Credentials & OTP Verifications Migration
-- Version: 1.0.1
-- ============================================================================

-- 1. Add password hash column for local staff credentials
ALTER TABLE croip_iam.users 
ADD COLUMN IF NOT EXISTS password_hash VARCHAR(255);

-- 2. OTP Verification tracking for citizen phone login
CREATE TABLE IF NOT EXISTS croip_iam.otp_verifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    phone_number VARCHAR(20) NOT NULL,
    otp_code_hash VARCHAR(255) NOT NULL,
    purpose VARCHAR(30) NOT NULL DEFAULT 'RATEPAYER_LOGIN',
    expires_at TIMESTAMPTZ NOT NULL,
    verified_at TIMESTAMPTZ,
    attempts INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT clock_timestamp()
);

CREATE INDEX IF NOT EXISTS idx_otp_phone_purpose ON croip_iam.otp_verifications(phone_number, purpose, expires_at);

-- 3. Active Sessions & Refresh Tokens
CREATE TABLE IF NOT EXISTS croip_iam.user_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES croip_iam.users(id) ON DELETE CASCADE,
    refresh_token_hash VARCHAR(255) UNIQUE NOT NULL,
    ip_address INET,
    user_agent TEXT,
    expires_at TIMESTAMPTZ NOT NULL,
    revoked_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT clock_timestamp()
);

CREATE INDEX IF NOT EXISTS idx_sessions_user ON croip_iam.user_sessions(user_id);
