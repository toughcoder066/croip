-- Drop the fake locally-hashed secret: Zitadel is now the only holder of the real secret
-- after the one-time provisioning response. Any existing rows predate real credentials
-- and are not usable against any service's real auth anyway.
ALTER TABLE "api_clients" DROP COLUMN "client_secret_hash";

ALTER TABLE "api_clients" ADD COLUMN "zitadel_user_id" VARCHAR(100);
ALTER TABLE "api_clients" ADD COLUMN "issued_via" VARCHAR(20) NOT NULL DEFAULT 'stub';
ALTER TABLE "api_clients" ADD COLUMN "revoked_at" TIMESTAMPTZ;
ALTER TABLE "api_clients" ADD COLUMN "rotated_from_id" UUID;
ALTER TABLE "api_clients" ADD COLUMN "delivered_at" TIMESTAMPTZ;
ALTER TABLE "api_clients" ADD COLUMN "delivery_error" VARCHAR(500);

CREATE UNIQUE INDEX "api_clients_zitadel_user_id_key" ON "api_clients"("zitadel_user_id");

-- A concession can never have two ACTIVE credentials at once — enforced in the database,
-- not just in application code, since that's the invariant the whole rotate/revoke flow
-- depends on.
CREATE UNIQUE INDEX "api_clients_one_active_per_concession" ON "api_clients"("concession_id") WHERE status = 'ACTIVE';
