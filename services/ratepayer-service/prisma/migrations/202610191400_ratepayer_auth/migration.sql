-- Ratepayer self-service auth: password + OTP login
ALTER TABLE "ratepayers" ADD COLUMN "password_hash" VARCHAR(255);

CREATE TABLE "ratepayer_otps" (
    "id" UUID NOT NULL,
    "ratepayer_id" UUID NOT NULL,
    "purpose" VARCHAR(30) NOT NULL,
    "code_hash" VARCHAR(255) NOT NULL,
    "expires_at" TIMESTAMPTZ NOT NULL,
    "consumed_at" TIMESTAMPTZ,
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ratepayer_otps_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "ratepayer_otps_ratepayer_id_purpose_consumed_at_idx" ON "ratepayer_otps"("ratepayer_id", "purpose", "consumed_at");

ALTER TABLE "ratepayer_otps" ADD CONSTRAINT "ratepayer_otps_ratepayer_id_fkey" FOREIGN KEY ("ratepayer_id") REFERENCES "ratepayers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
