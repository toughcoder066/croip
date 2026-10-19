-- AlterTable: new users default to PENDING_ACTIVATION (invited, not yet logged in via Zitadel)
ALTER TABLE "users" ALTER COLUMN "status" SET DEFAULT 'PENDING_ACTIVATION';

-- AlterTable: track when/how the Zitadel invite was last sent
ALTER TABLE "users" ADD COLUMN "invited_at" TIMESTAMPTZ;
ALTER TABLE "users" ADD COLUMN "invited_via_stub" BOOLEAN NOT NULL DEFAULT false;
