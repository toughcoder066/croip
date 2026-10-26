-- AlterTable: add concession_id to ratepayers (records which concession registered them)
ALTER TABLE "ratepayers" ADD COLUMN "concession_id" UUID;

CREATE INDEX "ratepayers_concession_id_idx" ON "ratepayers"("concession_id");
