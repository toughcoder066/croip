import { z } from "zod";

/**
 * Operational status of a partner revenue concessionaire.
 */
export const ConcessionaireStatusEnum = z.enum(["ACTIVE", "SUSPENDED", "OFFBOARDED"]);
export type ConcessionaireStatus = z.infer<typeof ConcessionaireStatusEnum>;

/**
 * Operational status of a territorial concession contract assignment.
 */
export const AssignmentStatusEnum = z.enum(["ACTIVE", "EXPIRED", "TERMINATED"]);
export type AssignmentStatus = z.infer<typeof AssignmentStatusEnum>;

/**
 * Operational status of machine-to-machine API client credentials.
 */
export const ApiClientStatusEnum = z.enum(["ACTIVE", "REVOKED"]);
export type ApiClientStatus = z.infer<typeof ApiClientStatusEnum>;

/**
 * Validation schema for onboarding a new partner revenue concessionaire.
 */
export const CreateConcessionaireSchema = z.object({
  name: z.string().min(2, "Company name must be at least 2 characters").max(100),
  registrationNumber: z.string().min(3, "Business registration number is required").max(50),
  contactEmail: z.string().email("Valid contact email is required"),
  contactPhone: z.string().min(9, "Valid contact telephone is required").max(20),
});
export type CreateConcessionaireInput = z.infer<typeof CreateConcessionaireSchema>;

/**
 * Validation schema for updating concessionaire lifecycle status.
 */
export const UpdateConcessionaireStatusSchema = z.object({
  status: ConcessionaireStatusEnum,
});
export type UpdateConcessionaireStatusInput = z.infer<typeof UpdateConcessionaireStatusSchema>;

/**
 * Validation schema for registering a Metropolitan, Municipal, or District Assembly (MMDA).
 */
export const CreateMunicipalAssemblySchema = z.object({
  code: z.string().min(2, "Assembly code is required (e.g. AMA, KMA)").max(20).toUpperCase(),
  name: z.string().min(2, "Assembly name is required").max(100),
  region: z.string().min(2, "Region is required (e.g. Greater Accra, Ashanti)").max(50),
});
export type CreateMunicipalAssemblyInput = z.infer<typeof CreateMunicipalAssemblySchema>;

/**
 * Validation schema for assigning an MMDA concession territory to a concessionaire.
 *
 * Enforces:
 * - Valid UUID for `assemblyId`.
 * - Valid ISO date strings for contract duration.
 * - End date must be chronologically after start date.
 */
export const AssignConcessionSchema = z.object({
  assemblyId: z.string().uuid("Valid MMDA assembly UUID is required"),
  contractStartDate: z.string().datetime({ message: "Valid ISO datetime required for contract start date" }),
  contractEndDate: z.string().datetime({ message: "Valid ISO datetime required for contract end date" }),
}).refine(
  (data) => new Date(data.contractEndDate).getTime() > new Date(data.contractStartDate).getTime(),
  {
    message: "Contract end date must be after contract start date",
    path: ["contractEndDate"],
  }
);
export type AssignConcessionInput = z.infer<typeof AssignConcessionSchema>;

/**
 * Validation schema for provisioning machine-to-machine API client credentials.
 */
export const CreateApiClientSchema = z.object({
  name: z.string().min(2, "Application name must be at least 2 characters").max(100),
  allowedIps: z.array(z.string().min(7)).default([]).optional(),
  rateLimitPerMinute: z.number().int().min(10).max(10000).default(600).optional(),
});
export type CreateApiClientInput = z.infer<typeof CreateApiClientSchema>;

/**
 * Full Concessionaire entity representation.
 */
export interface ConcessionaireDto {
  id: string;
  name: string;
  registrationNumber: string;
  contactEmail: string;
  contactPhone: string;
  status: ConcessionaireStatus;
  createdAt: string;
  updatedAt: string;
}

/**
 * Municipal Assembly entity representation.
 */
export interface MunicipalAssemblyDto {
  id: string;
  code: string;
  name: string;
  region: string;
  isActive: boolean;
  activeConcessionaire?: {
    id: string;
    name: string;
    assignmentId: string;
    contractStartDate: string;
    contractEndDate: string;
  } | null;
  createdAt: string;
  updatedAt: string;
}

/**
 * Territorial Concession Assignment entity representation.
 */
export interface ConcessionAssignmentDto {
  id: string;
  concessionaireId: string;
  assemblyId: string;
  contractStartDate: string;
  contractEndDate: string;
  status: AssignmentStatus;
  createdAt: string;
  updatedAt: string;
}

/**
 * Concessionaire API Client representation (excluding secrets).
 */
export interface ConcessionaireApiClientDto {
  id: string;
  concessionaireId: string;
  clientId: string;
  name: string;
  allowedIps: string[];
  rateLimitPerMinute: number;
  status: ApiClientStatus;
  lastUsedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

/**
 * Provisioned API Client credentials containing unhashed secret revealed once upon creation or rotation.
 */
export interface ProvisionedApiClientDto extends ConcessionaireApiClientDto {
  clientSecret: string;
}
