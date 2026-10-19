-- CreateTable
CREATE TABLE "property_verifications" (
    "id" UUID NOT NULL,
    "property_id" UUID NOT NULL,
    "verified_by_personnel_id" UUID NOT NULL,
    "verifier_latitude" DOUBLE PRECISION NOT NULL,
    "verifier_longitude" DOUBLE PRECISION NOT NULL,
    "is_within_polygon" BOOLEAN NOT NULL,
    "verified_snapshot" JSONB NOT NULL,
    "captured_at" TIMESTAMPTZ NOT NULL,
    "received_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "outcome" VARCHAR(20) NOT NULL,
    "notes" TEXT,
    "review_status" VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    "reviewed_by_personnel_id" UUID,
    "reviewed_at" TIMESTAMPTZ,
    "review_notes" TEXT,

    CONSTRAINT "property_verifications_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "property_verifications_property_id_idx" ON "property_verifications"("property_id");

-- CreateIndex
CREATE INDEX "property_verifications_review_status_idx" ON "property_verifications"("review_status");

-- AddForeignKey
ALTER TABLE "property_verifications" ADD CONSTRAINT "property_verifications_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "properties"("id") ON DELETE CASCADE ON UPDATE CASCADE;
