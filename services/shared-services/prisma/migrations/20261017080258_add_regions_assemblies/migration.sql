-- CreateTable
CREATE TABLE "regions" (
    "id" UUID NOT NULL,
    "code" VARCHAR(20) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "polygon_geojson" JSONB,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "regions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "municipal_assemblies" (
    "id" UUID NOT NULL,
    "region_id" UUID NOT NULL,
    "code" VARCHAR(50) NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "category" VARCHAR(20) NOT NULL DEFAULT 'DISTRICT',
    "polygon_geojson" JSONB,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "municipal_assemblies_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "regions_code_key" ON "regions"("code");

-- CreateIndex
CREATE UNIQUE INDEX "municipal_assemblies_code_key" ON "municipal_assemblies"("code");

-- CreateIndex
CREATE INDEX "municipal_assemblies_region_id_idx" ON "municipal_assemblies"("region_id");

-- AddForeignKey
ALTER TABLE "municipal_assemblies" ADD CONSTRAINT "municipal_assemblies_region_id_fkey" FOREIGN KEY ("region_id") REFERENCES "regions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
