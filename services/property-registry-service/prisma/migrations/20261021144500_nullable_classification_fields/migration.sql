-- AlterTable
ALTER TABLE "properties" ALTER COLUMN "property_class" DROP NOT NULL,
ALTER COLUMN "property_class" DROP DEFAULT,
ALTER COLUMN "building_status" DROP NOT NULL,
ALTER COLUMN "building_status" DROP DEFAULT,
ALTER COLUMN "property_status" SET DEFAULT 'UNASSESSED',
ALTER COLUMN "property_use" DROP DEFAULT,
ALTER COLUMN "tenure_type" DROP NOT NULL,
ALTER COLUMN "tenure_type" DROP DEFAULT,
ALTER COLUMN "structure_type" DROP NOT NULL,
ALTER COLUMN "structure_type" DROP DEFAULT,
ALTER COLUMN "number_of_floors" DROP NOT NULL,
ALTER COLUMN "number_of_floors" DROP DEFAULT;
