-- AlterTable: legal identity (ties a concession to a real registered entity) and a named
-- accountable contact (not just an inbox) — captured at onboarding time going forward.
ALTER TABLE "concessions" ADD COLUMN "business_registration_number" VARCHAR(50) NOT NULL;
ALTER TABLE "concessions" ADD COLUMN "tin" VARCHAR(50) NOT NULL;
ALTER TABLE "concessions" ADD COLUMN "contact_name" VARCHAR(150) NOT NULL;
ALTER TABLE "concessions" ADD COLUMN "contact_phone" VARCHAR(30) NOT NULL;
