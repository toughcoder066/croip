import { z } from "zod";

/**
 * Physical construction and structural condition of the building.
 * Dictates applicability of municipal property rate discounts or assessments.
 */
export const BuildingStatusEnum = z.enum([
  /** Fully completed structure with active occupancy or readiness. */
  "COMPLETED",
  /** Active construction ongoing with foundation or erected walls. */
  "UNDER_CONSTRUCTION",
  /** Shell or uncompleted structure lacking roofing or essential finishes. */
  "UNCOMPLETED_SHELL",
  /** Severely deteriorated or dilapidated structure requiring rehabilitation. */
  "DILAPIDATED",
]);
export type BuildingStatus = z.infer<typeof BuildingStatusEnum>;

/**
 * Sectional Titling Unit Type under Ghana Land Act, 2020 (Act 1043).
 * Enables independent ownership and rate billing for distinct units within a shared parcel.
 */
export const UnitTypeEnum = z.enum([
  /** Free-standing building or bungalow occupying the entire parcel. */
  "WHOLE_BUILDING",
  /** Residential apartment unit in a multi-storey or gated complex. */
  "APARTMENT",
  /** Residential flat in a subdivided compound or block. */
  "FLAT",
  /** Commercial retail shop or stall within a shopping center or street market. */
  "SHOP",
  /** Commercial office space or corporate suite. */
  "OFFICE",
  /** Storage, logistics, or industrial warehouse facility. */
  "WAREHOUSE",
]);
export type UnitType = z.infer<typeof UnitTypeEnum>;

/**
 * Relationship and legal title of the ratepayer to the property unit.
 */
export const OwnershipTypeEnum = z.enum([
  /** Legal title deed holder or freehold/leasehold owner. */
  "OWNER",
  /** Landlord leasing units to tenants, liable for municipal property rates. */
  "LANDLORD",
  /** Designated caretaker or property manager handling municipal affairs. */
  "CARETAKER",
  /** Occupant/tenant paying occupancy rates or business operating permits. */
  "TENANT",
]);
export type OwnershipType = z.infer<typeof OwnershipTypeEnum>;

/**
 * Verification state of an ownership or tenancy claim against an MMDA property.
 */
export const VerificationStatusEnum = z.enum([
  /** Claim submitted by ratepayer; awaiting municipal inspection or evidence review. */
  "PENDING",
  /** Validated by municipal taskforce, title document, or verified field inspection. */
  "VERIFIED",
  /** Under formal dispute due to competing co-ownership or boundary conflicts. */
  "DISPUTED",
]);
export type VerificationStatus = z.infer<typeof VerificationStatusEnum>;

/**
 * Cardinal perspective and contextual classification of property photographs.
 */
export const PhotoTypeEnum = z.enum([
  /** Front elevation facing the access street or gateway. */
  "FRONT_VIEW",
  /** Side flank or boundary boundary elevation. */
  "SIDE_VIEW",
  /** Roof aerial view for structural and solar assessments. */
  "ROOF_VIEW",
  /** Interior view of commercial units or shared amenities. */
  "INTERIOR",
]);
export type PhotoType = z.infer<typeof PhotoTypeEnum>;

/**
 * Regular expression validating the GhanaPost GPS digital address standard.
 * Format: 2-letter district prefix, hyphen, 3 or 4-digit code, hyphen, 4-digit postal code.
 * @example "GA-183-9024", "AK-039-5028", "WS-1234-5678"
 */
export const GhanaPostGpsRegex = /^[A-Z]{2}-\d{3,4}-\d{4}$/;

/**
 * Validates whether a provided string conforms to the official GhanaPost GPS digital address standard.
 * Automatically trims and standardizes casing to uppercase before validation.
 *
 * @param value - Candidate digital address string
 * @returns True if the string is a valid GhanaPost GPS address, false otherwise.
 * @example
 * ```ts
 * isValidGhanaPostGps("ga-183-9024"); // returns true
 * isValidGhanaPostGps("INVALID-GPS"); // returns false
 * ```
 */
export function isValidGhanaPostGps(value: string): boolean {
  return GhanaPostGpsRegex.test(value.trim().toUpperCase());
}

/**
 * Parses and validates an arbitrary polygon coordinates string into an array of latitude/longitude points.
 * A valid property boundary polygon requires a minimum of 4 coordinate pairs to establish a closed geometric boundary.
 *
 * Supported delimiters: semicolons (`;`), newlines (`\n`), and carriage returns.
 *
 * @param raw - Semicolon or newline-delimited coordinate string
 * @returns Array of valid `{ lat, lng }` coordinates within standard WGS-84 ranges.
 * @example
 * ```ts
 * parsePolygonCoordinates("5.6037,-0.1870; 5.6040,-0.1865; 5.6035,-0.1860; 5.6030,-0.1868");
 * // returns [{ lat: 5.6037, lng: -0.187 }, ...]
 * ```
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

/**
 * Zod validator ensuring coordinate strings define at least 4 valid lat/long coordinate pairs.
 */
export const PolygonCoordinatesSchema = z
  .string()
  .min(10, "Polygon coordinates must be provided")
  .refine(
    (val) => parsePolygonCoordinates(val).length >= 4,
    {
      message: "Polygon coordinates must contain at least 4 valid lat,lng pairs (e.g. '5.6037,-0.1870; 5.6040,-0.1865; 5.6035,-0.1860; 5.6030,-0.1868')",
    }
  );

/**
 * Zod validator ensuring digital addresses conform to the GhanaPost GPS standard.
 */
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

/**
 * Input schema for attaching photographic media to a property registration.
 */
export const RegisterPropertyPhotoInputSchema = z.object({
  photoType: PhotoTypeEnum,
  mediaUrl: z.string().url("Must be a valid URL"),
});
export type RegisterPropertyPhotoInput = z.infer<typeof RegisterPropertyPhotoInputSchema>;

/**
 * Input schema for registering an initial sectional unit (Act 1043) with a mother property.
 */
export const RegisterPropertyUnitInputSchema = z.object({
  unitIdentifier: z.string().min(1).max(64).default("Main Building"),
  unitType: UnitTypeEnum.default("WHOLE_BUILDING"),
  floorLevel: z.number().int().min(-5).max(150).default(0),
  ownershipType: OwnershipTypeEnum.default("OWNER"),
  ownershipPercentage: z.number().min(0.01).max(100).default(100.0),
  isPrimaryBillingContact: z.boolean().default(true),
});
export type RegisterPropertyUnitInput = z.infer<typeof RegisterPropertyUnitInputSchema>;

/**
 * Input schema for citizen ratepayer property registration.
 * Allows arbitrary bounding polygons, digital addresses, and optional street/house names.
 */
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

/**
 * Input schema for claiming an existing sectional unit within an onboarded property.
 */
export const ClaimPropertyUnitInputSchema = z.object({
  unitId: z.string().uuid("Invalid unit ID"),
  ownershipType: OwnershipTypeEnum.default("OWNER"),
  ownershipPercentage: z.number().min(0.01).max(100.0).default(100.0),
  isPrimaryBillingContact: z.boolean().default(true),
});
export type ClaimPropertyUnitInput = z.infer<typeof ClaimPropertyUnitInputSchema>;

/**
 * Response schema representing a normalized property photograph record.
 */
export const PropertyPhotoSchema = z.object({
  id: z.string().uuid(),
  propertyId: z.string().uuid(),
  photoType: PhotoTypeEnum,
  mediaUrl: z.string(),
  uploadedAt: z.string().datetime(),
});
export type PropertyPhoto = z.infer<typeof PropertyPhotoSchema>;

/**
 * Response schema for an M:N link associating a citizen ratepayer with a sectional unit.
 */
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

/**
 * Response schema representing an individual sectional unit under Ghana Land Act 1043.
 */
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

/**
 * Full response schema representing a mother property parcel/structure and its nested units and photos.
 */
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
