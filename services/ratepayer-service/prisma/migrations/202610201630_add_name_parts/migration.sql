-- AlterTable: add first_name, middle_name, last_name to ratepayers
ALTER TABLE "ratepayers" ADD COLUMN "first_name" VARCHAR(100);
ALTER TABLE "ratepayers" ADD COLUMN "middle_name" VARCHAR(100);
ALTER TABLE "ratepayers" ADD COLUMN "last_name" VARCHAR(100);

-- Backfill existing legal_name into first_name and last_name if present
UPDATE "ratepayers"
SET
  "first_name" = CASE
    WHEN "legal_name" IS NOT NULL AND position(' ' in trim("legal_name")) > 0
    THEN split_part(trim("legal_name"), ' ', 1)
    ELSE trim("legal_name")
  END,
  "last_name" = CASE
    WHEN "legal_name" IS NOT NULL AND position(' ' in trim("legal_name")) > 0
    THEN substring(trim("legal_name") from position(' ' in trim("legal_name")) + 1)
    ELSE NULL
  END
WHERE "first_name" IS NULL AND "legal_name" IS NOT NULL;

CREATE INDEX "ratepayers_last_name_first_name_idx" ON "ratepayers"("last_name", "first_name");
