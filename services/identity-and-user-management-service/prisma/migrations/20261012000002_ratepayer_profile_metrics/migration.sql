-- AlterTable
ALTER TABLE "ratepayer_profiles" ADD COLUMN "firstName" TEXT;
ALTER TABLE "ratepayer_profiles" ADD COLUMN "lastName" TEXT;
ALTER TABLE "ratepayer_profiles" ADD COLUMN "digitalAddress" TEXT;
ALTER TABLE "ratepayer_profiles" ADD COLUMN "kycStatus" TEXT NOT NULL DEFAULT 'TIER_1_UNVERIFIED';
