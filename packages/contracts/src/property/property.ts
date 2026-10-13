import { z } from "zod";

export const BuildingStatusEnum = z.enum([
  "COMPLETED",
  "UNDER_CONSTRUCTION",
  "UNCOMPLETED_SHELL",
  "DILAPIDATED",
]);
export type BuildingStatus = z.infer<typeof BuildingStatusEnum>;

export const UnitTypeEnum = z.enum([
  "WHOLE_BUILDING",
  "APARTMENT",
  "FLAT",
  "SHOP",
  "OFFICE",
  "WAREHOUSE",
]);
export type UnitType = z.infer<typeof UnitTypeEnum>;

export const OwnershipTypeEnum = z.enum([
  "OWNER",
  "LANDLORD",
  "CARETAKER",
  "TENANT",
]);
export type OwnershipType = z.infer<typeof OwnershipTypeEnum>;

export const VerificationStatusEnum = z.enum([
  "PENDING",
  "VERIFIED",
  "DISPUTED",
]);
export type VerificationStatus = z.infer<typeof VerificationStatusEnum>;

export const PhotoTypeEnum = z.enum([
  "FRONT_VIEW",
  "SIDE_VIEW",
  "ROOF_VIEW",
  "INTERIOR",
]);
export type PhotoType = z.infer<typeof PhotoTypeEnum>;

/**
 * Validates GhanaPost GPS digital address (e.g. GA-183-9024 or AK-039-5028)
 */
export const GhanaPostGpsRegex = /^[A-Z]{2}-\d{3,4}-\d{4}$/;

export function isValidGhanaPostGps(value: string): boolean {
  return GhanaPostGpsRegex.test(value.trim().toUpperCase());
}

/**
 * Helper to parse and validate polygon coordinates string.
 * Minimum 4 coordinate pairs required to form a closed polygon boundary.
 */
export function parsePolygonCoordinates(raw: string): Array<{ lat: number; lng: number }> {
  if (!raw || typeof raw !== "string") return [];
  const segments = raw
    .split(/;|\n|\r/)
    .map((s) => s.trim())
    .filter(Boolean);

  const coords: Array<{ lat: number; lng: number }> = [];
  for (const seg of segments) {
    const parts = seg.split(/,|\s+/).map((p) => p.trim()).filter(Boolean);
    if (parts.length >= 2 && parts[0] !== undefined && parts[1] !== undefined) {
      const lat = parseFloat(parts[0]);
      const lng = parseFloat(parts[1]);
      if (!Number.isNaN(lat) && !Number.isNaN(lng) && lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
        coords.push({ lat, lng });
      }
    }
  }
  return coords;
}

export const PolygonCoordinatesSchema = z
  .string()
  .min(10, "Polygon coordinates must be provided")
  .refine(
    (val) => parsePolygonCoordinates(val).length >= 4,
    {
      message: "Polygon coordinates must contain at least 4 valid lat,lng pairs (e.g. 5.6037,-0.1870; 5.6040,-0.1865; 5.6035,-0.1860; 5.6030,-0.1868)",
    }
  );

export const GhanaPostGpsSchema = z
  .string()
  .trim()
  .transform((val) => val.toUpperCase())
  .refine(
    (val) => GhanaPostGpsRegex.test(val),
    {
      message: "Centroid GhanaPost GPS must match format XX-000-0000 or XX-0000-0000 (e.g. GA-183-9024)",
    }
  );

export const RegisterPropertyPhotoInputSchema = z.object({
  photoType: PhotoTypeEnum,
  mediaUrl: z.string().url("Must be a valid URL"),
});
export type RegisterPropertyPhotoInput = z.infer<typeof RegisterPropertyPhotoInputSchema>;

export const RegisterPropertyUnitInputSchema = z.object({
  unitIdentifier: z.string().min(1).max(64).default("Main Building"),
  unitType: UnitTypeEnum.default("WHOLE_BUILDING"),
  floorLevel: z.number().int().min(-5).max(150).default(0),
  ownershipType: OwnershipTypeEnum.default("OWNER"),
  ownershipPercentage: z.number().min(0.01).max(100).default(100.0),
  isPrimaryBillingContact: z.boolean().default(true),
});
export type RegisterPropertyUnitInput = z.infer<typeof RegisterPropertyUnitInputSchema>;

export const RegisterPropertyInputSchema = z.object({
  propertyName: z.string().min(2, "Property name must have at least 2 characters").max(255),
  polygonCoordinates: PolygonCoordinatesSchema,
  centroidGhanapostGps: GhanaPostGpsSchema,
  streetName: z.string().trim().max(255).optional().nullable(),
  houseNumber: z.string().trim().max(64).optional().nullable(),
  numberOfFloors: z.number().int().min(1, "Number of floors must be at least 1").default(1),
  buildingStatus: BuildingStatusEnum,
  unit: RegisterPropertyUnitInputSchema.optional(),
  photos: z.array(RegisterPropertyPhotoInputSchema).optional().default([]),
});
export type RegisterPropertyInput = z.infer<typeof RegisterPropertyInputSchema>;

export const ClaimPropertyUnitInputSchema = z.object({
  unitId: z.string().uuid("Invalid unit ID"),
  ownershipType: OwnershipTypeEnum.default("OWNER"),
  ownershipPercentage: z.number().min(0.01).max(100.0).default(100.0),
  isPrimaryBillingContact: z.boolean().default(true),
});
export type ClaimPropertyUnitInput = z.infer<typeof ClaimPropertyUnitInputSchema>;

export const PropertyPhotoSchema = z.object({
  id: z.string().uuid(),
  propertyId: z.string().uuid(),
  photoType: PhotoTypeEnum,
  mediaUrl: z.string(),
  uploadedAt: z.string().datetime(),
});
export type PropertyPhoto = z.infer<typeof PropertyPhotoSchema>;

export const PropertyRatepayerLinkSchema = z.object({
  id: z.string().uuid(),
  unitId: z.string().uuid(),
  ratepayerId: z.string().uuid(),
  ownershipType: OwnershipTypeEnum,
  ownershipPercentage: z.number(),
  isPrimaryBillingContact: z.boolean(),
  verificationStatus: VerificationStatusEnum,
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});
export type PropertyRatepayerLink = z.infer<typeof PropertyRatepayerLinkSchema>;

export const PropertyUnitSchema = z.object({
  id: z.string().uuid(),
  propertyId: z.string().uuid(),
  unitIdentifier: z.string(),
  unitType: UnitTypeEnum,
  floorLevel: z.number().int(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  ratepayerLinks: z.array(PropertyRatepayerLinkSchema).optional(),
});
export type PropertyUnit = z.infer<typeof PropertyUnitSchema>;

export const PropertySchema = z.object({
  id: z.string().uuid(),
  systemPropertyCode: z.string(),
  propertyName: z.string(),
  polygonCoordinates: z.string(),
  centroidGhanapostGps: z.string(),
  streetName: z.string().nullable(),
  houseNumber: z.string().nullable(),
  numberOfFloors: z.number().int(),
  buildingStatus: BuildingStatusEnum,
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  units: z.array(PropertyUnitSchema).optional(),
  photos: z.array(PropertyPhotoSchema).optional(),
});
export type Property = z.infer<typeof PropertySchema>;
