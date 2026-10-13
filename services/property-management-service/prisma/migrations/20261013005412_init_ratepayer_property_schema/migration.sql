-- CreateEnum
CREATE TYPE "BuildingStatus" AS ENUM ('COMPLETED', 'UNDER_CONSTRUCTION', 'UNCOMPLETED_SHELL', 'DILAPIDATED');

-- CreateEnum
CREATE TYPE "UnitType" AS ENUM ('WHOLE_BUILDING', 'APARTMENT', 'FLAT', 'SHOP', 'OFFICE', 'WAREHOUSE');

-- CreateEnum
CREATE TYPE "OwnershipType" AS ENUM ('OWNER', 'LANDLORD', 'CARETAKER', 'TENANT');

-- CreateEnum
CREATE TYPE "VerificationStatus" AS ENUM ('PENDING', 'VERIFIED', 'DISPUTED');

-- CreateEnum
CREATE TYPE "PhotoType" AS ENUM ('FRONT_VIEW', 'SIDE_VIEW', 'ROOF_VIEW', 'INTERIOR');

-- CreateTable
CREATE TABLE "properties" (
    "id" UUID NOT NULL,
    "system_property_code" VARCHAR(32) NOT NULL,
    "property_name" VARCHAR(255) NOT NULL,
    "polygon_coordinates" TEXT NOT NULL,
    "centroid_ghanapost_gps" VARCHAR(16) NOT NULL,
    "street_name" VARCHAR(255),
    "house_number" VARCHAR(64),
    "number_of_floors" INTEGER NOT NULL DEFAULT 1,
    "building_status" "BuildingStatus" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "properties_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "property_units" (
    "id" UUID NOT NULL,
    "property_id" UUID NOT NULL,
    "unit_identifier" VARCHAR(64) NOT NULL,
    "unit_type" "UnitType" NOT NULL DEFAULT 'WHOLE_BUILDING',
    "floor_level" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "property_units_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "property_ratepayer_links" (
    "id" UUID NOT NULL,
    "unit_id" UUID NOT NULL,
    "ratepayer_id" UUID NOT NULL,
    "ownership_type" "OwnershipType" NOT NULL DEFAULT 'OWNER',
    "ownership_percentage" DECIMAL(5,2) NOT NULL DEFAULT 100.00,
    "is_primary_billing_contact" BOOLEAN NOT NULL DEFAULT true,
    "verification_status" "VerificationStatus" NOT NULL DEFAULT 'PENDING',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "property_ratepayer_links_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "property_photos" (
    "id" UUID NOT NULL,
    "property_id" UUID NOT NULL,
    "photo_type" "PhotoType" NOT NULL,
    "media_url" VARCHAR(1024) NOT NULL,
    "uploaded_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "property_photos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "outbox_events" (
    "id" UUID NOT NULL,
    "event_type" TEXT NOT NULL,
    "event_version" INTEGER NOT NULL,
    "aggregate_type" TEXT NOT NULL,
    "aggregate_id" TEXT NOT NULL,
    "aggregate_version" INTEGER NOT NULL,
    "routing_key" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "headers" JSONB NOT NULL,
    "published_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "outbox_events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inbox_events" (
    "id" TEXT NOT NULL,
    "producer" TEXT NOT NULL,
    "event_type" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "processed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "inbox_events_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "properties_system_property_code_key" ON "properties"("system_property_code");

-- CreateIndex
CREATE INDEX "properties_centroid_ghanapost_gps_idx" ON "properties"("centroid_ghanapost_gps");

-- CreateIndex
CREATE INDEX "property_units_property_id_idx" ON "property_units"("property_id");

-- CreateIndex
CREATE UNIQUE INDEX "property_units_property_id_unit_identifier_key" ON "property_units"("property_id", "unit_identifier");

-- CreateIndex
CREATE INDEX "property_ratepayer_links_ratepayer_id_idx" ON "property_ratepayer_links"("ratepayer_id");

-- CreateIndex
CREATE INDEX "property_ratepayer_links_unit_id_idx" ON "property_ratepayer_links"("unit_id");

-- CreateIndex
CREATE UNIQUE INDEX "property_ratepayer_links_unit_id_ratepayer_id_key" ON "property_ratepayer_links"("unit_id", "ratepayer_id");

-- CreateIndex
CREATE INDEX "property_photos_property_id_idx" ON "property_photos"("property_id");

-- CreateIndex
CREATE INDEX "outbox_events_published_at_created_at_idx" ON "outbox_events"("published_at", "created_at");

-- AddForeignKey
ALTER TABLE "property_units" ADD CONSTRAINT "property_units_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "properties"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "property_ratepayer_links" ADD CONSTRAINT "property_ratepayer_links_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "property_units"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "property_photos" ADD CONSTRAINT "property_photos_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "properties"("id") ON DELETE CASCADE ON UPDATE CASCADE;
