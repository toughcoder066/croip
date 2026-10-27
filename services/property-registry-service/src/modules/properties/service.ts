import crypto from 'node:crypto';
import type { FastifyInstance } from 'fastify';
import { domainEvent } from '../../events/envelope.js';
import { appendOutboxEvent } from '../../events/outbox.js';
import { NotFoundError, BadRequestError, ForbiddenError, ConflictError, ServiceUnavailableError } from '../../lib/errors.js';
import { getServiceAccessToken } from '../../lib/zitadel-client.js';
import { doPolygonsOverlap } from '../../lib/geo.js';

interface DetectZoneForPolygonResult {
  status: 'MATCHED' | 'NO_MATCH' | 'CONFLICT';
  assembly: { id: string; name: string; code: string } | null;
  matchedAssemblies: { id: string; name: string; code: string }[];
}

export interface PropertyDocumentInput {
  documentType: string;
  documentNumber?: string;
  issuingAuthority?: string;
  issueDate?: string;
  mediaUrl: string;
  fileSizeBytes?: number;
  mimeType?: string;
}

export interface CreatePropertyInput {
  code?: string;
  accountNumber?: string;
  // No propertyName here — a property starts unnamed. Only the ratepayer who later owns
  // it (claims or self-registers) can give it one, via renamePropertyAsRatepayer; a
  // concession could never see it again afterward anyway (hidePropertyNameFromConcession),
  // so letting one be set at registration would just be a write nobody can read back.
  propertyClass?: string;
  buildingStatus?: string;
  propertyStatus?: string;
  propertyUse?: string;
  tenureType?: string;
  structureType?: string;
  numberOfFloors?: number;
  ghanaPostGps?: string;
  createdBy?: string;
  polygonGeoJson: Record<string, unknown>;
  documents?: PropertyDocumentInput[];
  concessionId: string;
  // The concession's own real, currently-assigned MMDAs (from the caller's auth context) —
  // not a single value, since a concession can be contracted to more than one at once.
  allowedAssemblyIds?: string[];
  actorId: string;
  actorType?: 'CONCESSION' | 'USER' | 'SERVICE';
  // Opaque reference to the concession's own staff member who did this (see
  // ConcessionPersonnel.externalStaffRef in platform-governance-service) — this service
  // never needs to know who that is, only that a specific, identifiable person did it.
  // Required so every row in PropertyUpdateHistory is genuinely attributable.
  staffRef: string;
}

export interface CreateBatchPropertyInput {
  properties: Array<Omit<CreatePropertyInput, 'concessionId' | 'allowedAssemblyIds' | 'actorId' | 'actorType' | 'staffRef'>>;
  concessionId: string;
  allowedAssemblyIds: string[];
  actorId: string;
  actorType?: 'CONCESSION' | 'USER' | 'SERVICE';
  staffRef: string;
}

export interface SubmitVerificationInput {
  propertyId: string;
  verifiedByPersonnelId: string;
  verifierCoordinates: { latitude: number; longitude: number };
  isWithinPolygon: boolean;
  verifiedSnapshot: Record<string, unknown>;
  capturedAt: string;
  outcome: 'VERIFIED' | 'DISPUTED_LOCATION' | 'NOT_FOUND' | 'ACCESS_DENIED';
  notes?: string;
  concessionId: string;
  assemblyIds: string[];
}

export interface ReviewVerificationInput {
  verificationId: string;
  reviewStatus: 'APPROVED' | 'REJECTED';
  reviewedByPersonnelId: string;
  reviewNotes?: string;
  concessionId: string;
  assemblyIds: string[];
}

export interface UploadPremisesDocumentInput {
  propertyCode: string;
  ratepayerId?: string;
  documentType: string;
  documentNumber?: string;
  issuingAuthority?: string;
  issueDate?: string;
  mediaUrl: string;
  staffRef: string;
  deviceId: string;
  premisesCoordinates: {
    latitude: number;
    longitude: number;
    accuracyMeters?: number;
  };
  concessionId: string;
  assemblyIds: string[];
  actorId: string;
}

export interface UpdatePropertyInput {
  // propertyName is deliberately NOT here — only the owning ratepayer can rename a
  // property (see renamePropertyAsRatepayer), never a concession or staff via this
  // generic update. A property's name is also never shown back to a concession/SERVICE
  // actor in any response (see hidePropertyNameFromConcession) — it's the ratepayer's own
  // private label, not cadastre data the MMDA needs.
  accountNumber?: string;
  propertyUse?: string;
  structureType?: string;
  buildingStatus?: string;
  propertyClass?: string;
  tenureType?: string;
  numberOfFloors?: number;
  landAreaSqm?: number;
  leaseDurationYears?: number;
  ghanaPostGps?: string;
  polygonGeoJson?: Record<string, unknown>;
  // Required — see CreatePropertyInput.staffRef. verifiedBy/verifiedAt are deliberately
  // not here: verification only ever changes through submitVerification/reviewVerification,
  // never a plain property edit. claimedByRatepayerId/createdByRatepayerId aren't here
  // either — ownership/provenance changes only through the (separately tracked) claim flow.
  staffRef: string;
}

interface ZoneValidationOptions {
  // Whether to enforce that the detected MMDA is one of allowedAssemblyIds. true for a
  // concession actor (bound to its own assigned territory); false for staff (who can
  // register/move a property into any registered MMDA, same as the existing admin-override
  // behavior elsewhere in this service).
  requireAssemblyAuthorization: boolean;
  concessionId?: string | undefined;
  allowedAssemblyIds?: string[] | undefined;
  propertyCode?: string | undefined;
}

/**
 * Zone-membership guard:
 * 1. Checks that the property's polygon footprint falls inside exactly one registered MMDA boundary.
 * 2. For concession registrations, enforces that the detected MMDA is strictly within the concession's
 *    assigned territorial boundaries.
 */
async function assertZoneMembership(
  app: FastifyInstance,
  polygonGeoJson: Record<string, unknown>,
  options: ZoneValidationOptions
): Promise<{ id: string; name: string; code: string }> {
  let result: DetectZoneForPolygonResult;

  try {
    const headers: Record<string, string> =
      app.config.AUTH_MODE === 'zitadel'
        ? { Authorization: `Bearer ${await getServiceAccessToken(app.config)}` }
        : { 'x-dev-subject': 'property-registry-service', 'x-dev-permissions': 'reference:read' };

    const response = await fetch(`${app.config.SHARED_SERVICES_URL}/v1/assemblies/detect-zone-for-polygon`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...headers },
      body: JSON.stringify({ polygonGeoJson }),
      signal: AbortSignal.timeout(5000)
    });

    if (!response.ok) {
      throw new Error(`Shared Services responded ${response.status}`);
    }

    result = (await response.json()) as DetectZoneForPolygonResult;
  } catch (err) {
    app.log.error({ err }, 'Zone-membership check against Shared Services failed');
    throw new ServiceUnavailableError(
      'Could not verify the property boundary against MMDA zones (Shared Services unavailable) — try again shortly.'
    );
  }

  const prefix = options.propertyCode ? `Property "${options.propertyCode}": ` : '';

  if (result.status === 'NO_MATCH' || !result.assembly) {
    throw new BadRequestError(
      `${prefix}This property boundary does not fall within any registered MMDA boundary. Draw the MMDA boundary in Zones & Boundaries before registering properties inside it.`
    );
  }

  if (result.status === 'CONFLICT') {
    throw new ConflictError(
      `${prefix}This property boundary overlaps more than one MMDA: ${result.matchedAssemblies.map((a) => `${a.name} (${a.code})`).join(', ')}. Fix the overlapping MMDA boundaries in Zones & Boundaries, or correct the property's footprint, before registering it.`,
      { matchedAssemblies: result.matchedAssemblies }
    );
  }

  // Concessions cannot create or move properties outside their assigned MMDA(s). An empty
  // allowed list (no active MMDA assignment at all) must reject everything too — it must
  // never be read as "unscoped", or a never-assigned concession could register anywhere.
  if (options.requireAssemblyAuthorization) {
    const allowed = options.allowedAssemblyIds ?? [];
    if (!allowed.includes(result.assembly.id)) {
      throw new ForbiddenError(
        `${prefix}Concession is not authorized to register properties outside of its assigned MMDA. This property falls within ${result.assembly.name} (${result.assembly.code}), which is not assigned to concession ${options.concessionId ?? ''}.`
      );
    }
  }

  return result.assembly;
}

/**
 * Asserts that the candidate property polygon does not spatially overlap or nest within an
 * existing property's boundary when the property uses are matching or when either property is
 * a residential house / whole parcel.
 */
async function assertNoConflictingOverlap(
  tx: any,
  polygonGeoJson: Record<string, unknown>,
  details: {
    propertyUse?: string | undefined;
    assemblyId: string;
    propertyCode?: string | undefined;
    excludePropertyId?: string | undefined;
  }
) {
  const existingProperties = await tx.property.findMany({
    where: {
      assemblyId: details.assemblyId,
      ...(details.excludePropertyId ? { id: { not: details.excludePropertyId } } : {})
    },
    select: {
      id: true,
      code: true,
      propertyUse: true,
      propertyClass: true,
      polygonGeoJson: true
    }
  });

  const candidateUse = (details.propertyUse || 'RESIDENTIAL').toUpperCase();

  for (const existing of existingProperties) {
    if (!existing.polygonGeoJson) continue;

    if (doPolygonsOverlap(polygonGeoJson, existing.polygonGeoJson)) {
      const existingUse = (existing.propertyUse || 'RESIDENTIAL').toUpperCase();
      const hasMatchingUse = candidateUse === existingUse;
      const isResidentialConflict = candidateUse === 'RESIDENTIAL' || existingUse === 'RESIDENTIAL';

      if (hasMatchingUse || isResidentialConflict) {
        // Deliberately never includes propertyName here — this message can surface to a
        // concession registering an unrelated property, and propertyName is the owning
        // ratepayer's private label, not something to leak through an error string.
        throw new ConflictError(
          `Property boundary conflict: The specified polygon overlaps with or is within the boundary of existing registered property ${existing.code} with matching use "${existing.propertyUse}". Properties of matching use cannot share or overlap the same parcel footprint.`
        );
      }
    }
  }
}

/**
/**
 * Auto-generates property ID (UUID) and canonical property code in the format:
 * PROP-[year of addition]-[first 4 chars of UUID]-[last 4 chars of UUID]
 * e.g. PROP-2026-B3D4-9A2F
 */
async function generatePropertyIdAndCode(
  tx: any,
  reservedCodes?: Set<string>
): Promise<{ id: string; code: string }> {
  const year = new Date().getFullYear();
  while (true) {
    const id = crypto.randomUUID();
    const first4 = id.slice(0, 4).toUpperCase();
    const last4 = id.slice(-4).toUpperCase();
    const code = `PROP-${year}-${first4}-${last4}`;

    if (reservedCodes && reservedCodes.has(code)) {
      continue;
    }

    const existing = await tx.property.findUnique({
      where: { code },
      select: { id: true }
    });

    if (!existing) {
      if (reservedCodes) {
        reservedCodes.add(code);
      }
      return { id, code };
    }
  }
}

// A concession's own API client resolves to actorType CONCESSION via authenticateConcession
// but to SERVICE via the generic authenticate()/requirePermissions() — same underlying
// identity, two different decorators (see auth.ts). Both must be treated the same for this
// rule, or a concession could read propertyName just by hitting a requirePermissions-gated
// route (e.g. GET /properties) instead of an authenticateConcession-gated one.
const CONCESSION_FACING_ACTOR_TYPES = new Set(['CONCESSION', 'SERVICE']);

// propertyName is the ratepayer's own private label for a property they own — never a
// concession or CROIP-oversight-managed field, and never shown back to the concession/MMDA
// side regardless of who set it or when. CROIP staff (actorType USER) still see it; the
// boundary here is specifically ratepayer-vs-concession, not ratepayer-vs-everyone.
function hidePropertyNameFromConcession<T extends { propertyName?: string | null }>(property: T, actorType: string): T {
  if (!CONCESSION_FACING_ACTOR_TYPES.has(actorType)) return property;
  return { ...property, propertyName: null };
}

export function propertyService(app: FastifyInstance) {
  return {
    async createProperty(input: CreatePropertyInput) {
      // Business Rule: Concession registration requires all core classification fields
      const missingFields: string[] = [];
      if (!input.propertyClass?.trim()) missingFields.push('propertyClass');
      if (!input.buildingStatus?.trim()) missingFields.push('buildingStatus');
      if (!input.propertyStatus?.trim()) missingFields.push('propertyStatus');
      if (!input.propertyUse?.trim()) missingFields.push('propertyUse');
      if (!input.tenureType?.trim()) missingFields.push('tenureType');
      if (!input.structureType?.trim()) missingFields.push('structureType');

      if (missingFields.length > 0) {
        throw new BadRequestError(
          `The following fields are required for concession property registration: ${missingFields.join(', ')}`
        );
      }

      const allowedAssemblyIds = input.allowedAssemblyIds ?? [];

      const matchedAssembly = await assertZoneMembership(app, input.polygonGeoJson, {
        requireAssemblyAuthorization: true,
        concessionId: input.concessionId,
        allowedAssemblyIds,
        propertyCode: input.code
      });

      const effectiveAssemblyId = matchedAssembly.id;

      try {
        return await app.prisma.$transaction(async (tx) => {
          // Spatial constraint: verify candidate polygon does not overlap any existing property of matching use
          await assertNoConflictingOverlap(tx, input.polygonGeoJson, {
            propertyUse: input.propertyUse,
            assemblyId: effectiveAssemblyId,
            propertyCode: input.code
          });

          const { id, code } = input.code?.trim()
            ? { id: crypto.randomUUID(), code: input.code.trim() }
            : await generatePropertyIdAndCode(tx);

          const property = await tx.property.create({
            data: {
              id,
              code,
              version: 1,
              ghanaPostGps: input.ghanaPostGps?.trim() || null,
              createdBy: input.createdBy || (input.actorId ?? 'CONCESSION_STAFF'),
              accountNumber: input.accountNumber ?? null,
              propertyName: null,
              assemblyId: effectiveAssemblyId,
              propertyClass: input.propertyClass ?? null,
              buildingStatus: input.buildingStatus ?? null,
              propertyStatus: input.propertyStatus || 'UNASSESSED',
              propertyUse: input.propertyUse!,
              tenureType: input.tenureType ?? null,
              structureType: input.structureType ?? null,
              numberOfFloors: input.numberOfFloors ?? null,
              registrationSource: 'CONCESSION',
              registeredByConcessionId: input.concessionId,
              createdByRatepayerId: null,
              verificationStatus: 'PENDING',
              polygonGeoJson: input.polygonGeoJson as any
            }
          });

          // Default unit
          const defaultUnit = await tx.propertyUnit.create({
            data: {
              propertyId: property.id,
              unitIdentifier: 'WHOLE_BUILDING',
              unitType: 'WHOLE_BUILDING',
              floorLevel: 0
            }
          });

          // Save documents if provided
          if (input.documents && input.documents.length > 0) {
            for (const doc of input.documents) {
              await tx.propertyDocument.create({
                data: {
                  propertyId: property.id,
                  documentType: doc.documentType,
                  documentNumber: doc.documentNumber ?? null,
                  issuingAuthority: doc.issuingAuthority ?? null,
                  issueDate: doc.issueDate ? new Date(doc.issueDate) : null,
                  mediaUrl: doc.mediaUrl,
                  fileSizeBytes: doc.fileSizeBytes ?? null,
                  mimeType: doc.mimeType ?? 'application/pdf',
                  uploadedByActorType: 'CONCESSION_STAFF',
                  uploadedByActorId: input.actorId,
                  ratepayerId: null,
                  verificationStatus: 'PENDING'
                }
              });
            }
          }

          await tx.auditRecord.create({
            data: {
              actorId: input.actorId,
              actorType: input.actorType ?? 'CONCESSION',
              concessionId: input.concessionId,
              assemblyId: effectiveAssemblyId,
              action: 'PROPERTY_REGISTERED',
              resourceType: 'Property',
              resourceId: property.id,
              requestId: crypto.randomUUID(),
              outcome: 'SUCCESS',
              metadata: {
                propertyCode: property.code,
                documentCount: input.documents?.length ?? 0
              }
            }
          });

          await tx.propertyUpdateHistory.create({
            data: {
              propertyId: property.id,
              performedByRef: input.staffRef,
              action: 'CREATED'
            }
          });

          const evt = domainEvent({
            eventType: 'PropertyCreated',
            eventVersion: 1,
            producer: app.serviceInfo.name,
            aggregateType: 'Property',
            aggregateId: property.id,
            aggregateVersion: 1,
            concessionId: input.concessionId,
            assemblyId: effectiveAssemblyId,
            correlationId: crypto.randomUUID(),
            data: {
              propertyId: property.id,
              code: property.code,
              assemblyId: property.assemblyId,
              registrationSource: property.registrationSource,
              documentCount: input.documents?.length ?? 0
            }
          });

          await appendOutboxEvent(tx, 'revenue.property.created.v1', evt);

          return hidePropertyNameFromConcession({ ...property, defaultUnitId: defaultUnit.id }, input.actorType ?? 'CONCESSION');
        });
      } catch (err: any) {
        if (err?.code === 'P2002') {
          throw new ConflictError(`Property with code "${input.code}" already exists.`);
        }
        throw err;
      }
    },

    async createBatchProperties(input: CreateBatchPropertyInput) {
      if (!input.properties || input.properties.length === 0) {
        throw new BadRequestError('At least one property must be provided in the batch');
      }
      if (input.properties.length > 500) {
        throw new BadRequestError('Batch size exceeds maximum limit of 500 properties');
      }

      const allowedAssemblyIds = input.allowedAssemblyIds;

      // Pre-validate all items in the batch to ensure all boundaries fall inside assigned MMDA
      const validatedList: Array<{
        property: (typeof input.properties)[number];
        assembly: { id: string; name: string; code: string };
      }> = [];

      for (const [i, item] of input.properties.entries()) {
        if (!item.polygonGeoJson) {
          throw new BadRequestError(`Property ${item.code ? `"${item.code}"` : `at index ${i}`} is missing required polygonGeoJson boundary`);
        }

        const missingFields: string[] = [];
        if (!item.propertyClass?.trim()) missingFields.push('propertyClass');
        if (!item.buildingStatus?.trim()) missingFields.push('buildingStatus');
        if (!item.propertyStatus?.trim()) missingFields.push('propertyStatus');
        if (!item.propertyUse?.trim()) missingFields.push('propertyUse');
        if (!item.tenureType?.trim()) missingFields.push('tenureType');
        if (!item.structureType?.trim()) missingFields.push('structureType');

        if (missingFields.length > 0) {
          throw new BadRequestError(
            `Property ${item.code ? `"${item.code}"` : `at index ${i}`} is missing required concession fields: ${missingFields.join(', ')}`
          );
        }

        const matched = await assertZoneMembership(app, item.polygonGeoJson, {
          requireAssemblyAuthorization: true,
          concessionId: input.concessionId,
          allowedAssemblyIds,
          propertyCode: item.code
        });

        validatedList.push({
          property: item,
          assembly: matched
        });
      }

      try {
        return await app.prisma.$transaction(async (tx) => {
          const createdList = [];
          const reservedCodes = new Set<string>();

          for (const { property: item, assembly } of validatedList) {
            // Spatial constraint: check against existing database properties in this MMDA
            await assertNoConflictingOverlap(tx, item.polygonGeoJson, {
              propertyUse: item.propertyUse,
              assemblyId: assembly.id,
              propertyCode: item.code
            });

            // Check against previously created properties in the same batch
            for (const prev of createdList) {
              if (doPolygonsOverlap(item.polygonGeoJson, prev.polygonGeoJson)) {
                const prevUse = (prev.propertyUse || 'RESIDENTIAL').toUpperCase();
                const currUse = (item.propertyUse || 'RESIDENTIAL').toUpperCase();
                if (currUse === prevUse || currUse === 'RESIDENTIAL' || prevUse === 'RESIDENTIAL') {
                  throw new ConflictError(
                    `Batch boundary conflict: Property "${item.code || 'item'}" overlaps with another property in this batch ("${prev.code}") with matching use "${prev.propertyUse}".`
                  );
                }
              }
            }

            const { id, code } = item.code?.trim()
              ? { id: crypto.randomUUID(), code: item.code.trim() }
              : await generatePropertyIdAndCode(tx, reservedCodes);

            const property = await tx.property.create({
              data: {
                id,
                code,
                version: 1,
                ghanaPostGps: item.ghanaPostGps?.trim() || null,
                createdBy: item.createdBy || input.actorId || 'CONCESSION_STAFF',
                accountNumber: item.accountNumber ?? null,
                propertyName: null,
                assemblyId: assembly.id,
                propertyClass: item.propertyClass!,
                buildingStatus: item.buildingStatus!,
                propertyStatus: item.propertyStatus!,
                propertyUse: item.propertyUse!,
                tenureType: item.tenureType!,
                structureType: item.structureType!,
                registrationSource: 'CONCESSION',
                registeredByConcessionId: input.concessionId,
                createdByRatepayerId: null,
                verificationStatus: 'PENDING',
                polygonGeoJson: item.polygonGeoJson as any
              }
            });

            const defaultUnit = await tx.propertyUnit.create({
              data: {
                propertyId: property.id,
                unitIdentifier: 'WHOLE_BUILDING',
                unitType: 'WHOLE_BUILDING',
                floorLevel: 0
              }
            });

            if (item.documents && item.documents.length > 0) {
              for (const doc of item.documents) {
                await tx.propertyDocument.create({
                  data: {
                    propertyId: property.id,
                    documentType: doc.documentType,
                    documentNumber: doc.documentNumber ?? null,
                    issuingAuthority: doc.issuingAuthority ?? null,
                    issueDate: doc.issueDate ? new Date(doc.issueDate) : null,
                    mediaUrl: doc.mediaUrl,
                    fileSizeBytes: doc.fileSizeBytes ?? null,
                    mimeType: doc.mimeType ?? 'application/pdf',
                    uploadedByActorType: 'CONCESSION_STAFF',
                    uploadedByActorId: input.actorId,
                    verificationStatus: 'PENDING'
                  }
                });
              }
            }

            const evt = domainEvent({
              eventType: 'PropertyCreated',
              eventVersion: 1,
              producer: app.serviceInfo.name,
              aggregateType: 'Property',
              aggregateId: property.id,
              aggregateVersion: 1,
              concessionId: input.concessionId,
              assemblyId: assembly.id,
              correlationId: crypto.randomUUID(),
              data: {
                propertyId: property.id,
                code: property.code,
                assemblyId: property.assemblyId,
                registrationSource: property.registrationSource,
                documentCount: item.documents?.length ?? 0
              }
            });

            await appendOutboxEvent(tx, 'revenue.property.created.v1', evt);

            await tx.propertyUpdateHistory.create({
              data: {
                propertyId: property.id,
                performedByRef: input.staffRef,
                action: 'CREATED'
              }
            });

            createdList.push(hidePropertyNameFromConcession({ ...property, defaultUnitId: defaultUnit.id }, input.actorType ?? 'CONCESSION'));
          }

          await tx.auditRecord.create({
            data: {
              actorId: input.actorId,
              actorType: input.actorType ?? 'CONCESSION',
              concessionId: input.concessionId,
              assemblyId: null,
              action: 'PROPERTY_BATCH_REGISTERED',
              resourceType: 'Property',
              resourceId: input.concessionId,
              requestId: crypto.randomUUID(),
              outcome: 'SUCCESS',
              metadata: {
                count: createdList.length,
                propertyCodes: createdList.map((p) => p.code)
              }
            }
          });

          return createdList;
        });
      } catch (err: any) {
        if (err?.code === 'P2002') {
          throw new ConflictError('One or more properties in the batch already exist (duplicate code constraint violation).');
        }
        throw err;
      }
    },

    // Platform-wide by default — matches the other oversight list/get endpoints
    // (ratepayer directory, bill lookup by number), which were never scoped to a single
    // assembly either. assemblyId narrows the search when the caller wants one MMDA's
    // view. Deliberately NOT using the idarms:context claim here at all: that claim is a
    // single hardcoded value shared by every officer today (there's no per-officer
    // assembly assignment in the data model yet) and several OTHER services hard-filter
    // on it as a real UUID with no wildcard support — changing what it contains would
    // silently break those, so this fix stays local to how these two routes query.
    async listProperties(actorType: string, assemblyId?: string) {
      const properties = await app.prisma.property.findMany({
        where: assemblyId && assemblyId !== '*' ? { assemblyId } : {},
        include: {
          documents: true,
          // Just the most recent edit, not the full trail — a list response showing
          // every property's complete history would get expensive fast. getProperty
          // returns the full history for a single property's detail view.
          updateHistory: { orderBy: { performedAt: 'desc' }, take: 1 }
        },
        orderBy: { createdAt: 'desc' },
        take: 50
      });
      return properties.map((p) => hidePropertyNameFromConcession(p, actorType));
    },

    async getProperty(id: string, actorType: string, assemblyId?: string) {
      const prop = await app.prisma.property.findFirst({
        where: assemblyId && assemblyId !== '*' ? { id, assemblyId } : { id },
        include: {
          units: true,
          documents: true,
          valuations: { where: { isCurrent: true } },
          updateHistory: { orderBy: { performedAt: 'desc' } }
        }
      });
      if (!prop) throw new NotFoundError('Property not found');
      return hidePropertyNameFromConcession(prop, actorType);
    },

    async updateProperty(
      idOrCode: string,
      input: UpdatePropertyInput,
      actor: { subject: string; actorType: string; concessionId?: string; assemblyIds?: string[] }
    ) {
      const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(idOrCode);
      const existing = await app.prisma.property.findFirst({
        where: isUuid ? { OR: [{ id: idOrCode }, { code: idOrCode }] } : { code: idOrCode },
        include: { valuations: true }
      });
      if (!existing) throw new NotFoundError(`Property '${idOrCode}' not found`);

      // Authorization verification — concession actors are bound to their own assigned
      // MMDA(s); staff (USER) have no scope restriction here, same as every other
      // concession-vs-staff split in this service.
      if (actor.actorType === 'CONCESSION') {
        const allowed = actor.assemblyIds ?? [];
        if (!allowed.includes('*') && !allowed.includes(existing.assemblyId)) {
          throw new ForbiddenError(
            `Concessionaire cannot update property outside its assigned assembly scope (${existing.assemblyId} vs ${allowed.join(', ')})`
          );
        }
      }

      // Check which fields are modified
      const structuralFields = [
        'propertyUse',
        'structureType',
        'buildingStatus',
        'propertyClass',
        'tenureType',
        'numberOfFloors',
        'landAreaSqm',
        'leaseDurationYears',
        'polygonGeoJson'
      ] as const;

      const changedStructuralFields: string[] = [];
      for (const field of structuralFields) {
        if (input[field] !== undefined) {
          if (field === 'polygonGeoJson') {
            if (JSON.stringify(input[field]) !== JSON.stringify(existing.polygonGeoJson)) {
              changedStructuralFields.push(field);
            }
          } else if ((input as any)[field] !== (existing as any)[field]) {
            changedStructuralFields.push(field);
          }
        }
      }

      // Same idea, but for the handful of fields that are recognized and actually applied
      // without triggering the structural-change/revaluation path. Deliberately NOT
      // Object.keys(input) — the request body can carry fields this endpoint no longer
      // recognizes (e.g. a stale client still sending verifiedBy), and those must never
      // show up in a property's own history as something that was "changed".
      const metadataFields = ['accountNumber', 'ghanaPostGps'] as const;
      const changedMetadataFields: string[] = [];
      for (const field of metadataFields) {
        if (input[field] !== undefined && input[field] !== (existing as any)[field]) {
          changedMetadataFields.push(field);
        }
      }

      const isStructuralChange = changedStructuralFields.length > 0;
      const polygonChanged = Boolean(input.polygonGeoJson) && changedStructuralFields.includes('polygonGeoJson');

      // If the polygon moved, re-derive which MMDA it now falls within — the property's
      // assemblyId must never go stale relative to its own boundary, and a concession
      // moving a polygon is held to the exact same territorial authorization as
      // registering a brand-new one.
      let effectiveAssemblyId = existing.assemblyId;
      if (polygonChanged) {
        const matchedAssembly = await assertZoneMembership(app, input.polygonGeoJson!, {
          requireAssemblyAuthorization: actor.actorType === 'CONCESSION',
          concessionId: actor.concessionId,
          allowedAssemblyIds: actor.assemblyIds,
          propertyCode: existing.code
        });
        effectiveAssemblyId = matchedAssembly.id;

        await assertNoConflictingOverlap(app.prisma, input.polygonGeoJson!, {
          propertyUse: input.propertyUse || existing.propertyUse,
          assemblyId: effectiveAssemblyId,
          propertyCode: existing.code,
          excludePropertyId: existing.id
        });
      }

      return app.prisma.$transaction(async (tx) => {
        const updateData: any = {
          version: { increment: 1 },
          ...(input.accountNumber !== undefined ? { accountNumber: input.accountNumber } : {}),
          ...(input.propertyUse !== undefined ? { propertyUse: input.propertyUse } : {}),
          ...(input.structureType !== undefined ? { structureType: input.structureType } : {}),
          ...(input.buildingStatus !== undefined ? { buildingStatus: input.buildingStatus } : {}),
          ...(input.propertyClass !== undefined ? { propertyClass: input.propertyClass } : {}),
          ...(input.tenureType !== undefined ? { tenureType: input.tenureType } : {}),
          ...(input.numberOfFloors !== undefined ? { numberOfFloors: input.numberOfFloors } : {}),
          ...(input.landAreaSqm !== undefined ? { landAreaSqm: input.landAreaSqm } : {}),
          ...(input.leaseDurationYears !== undefined ? { leaseDurationYears: input.leaseDurationYears } : {}),
          ...(input.polygonGeoJson !== undefined ? { polygonGeoJson: input.polygonGeoJson } : {}),
          ...(polygonChanged ? { assemblyId: effectiveAssemblyId } : {}),
          ...(input.ghanaPostGps !== undefined ? { ghanaPostGps: input.ghanaPostGps?.trim() || null } : {})
        };

        let decoupledValuationsCount = 0;

        if (isStructuralChange) {
          // Requirement: When a property's actual characteristics change (not trivial
          // metadata like name or documents), it should be reassessed UNASSESSED and
          // PENDING verification, and all active valuations must be decoupled.
          updateData.propertyStatus = 'UNASSESSED';
          updateData.verificationStatus = 'PENDING';

          const valResult = await tx.propertyValuation.updateMany({
            where: { propertyId: existing.id, isCurrent: true },
            data: { isCurrent: false }
          });
          decoupledValuationsCount = valResult.count;
        }

        const updated = await tx.property.update({
          where: { id: existing.id },
          data: updateData,
          include: {
            units: true,
            documents: true,
            valuations: { where: { isCurrent: true } }
          }
        });

        await tx.propertyUpdateHistory.create({
          data: {
            propertyId: existing.id,
            performedByRef: input.staffRef,
            action: isStructuralChange ? 'STRUCTURAL_UPDATE' : 'METADATA_UPDATE',
            changedFields: isStructuralChange ? changedStructuralFields : changedMetadataFields
          }
        });

        // Audit Record
        await tx.auditRecord.create({
          data: {
            actorId: actor.subject,
            actorType: actor.actorType,
            concessionId: existing.registeredByConcessionId ?? (actor.concessionId && actor.concessionId !== '00000000-0000-0000-0000-000000000000' ? actor.concessionId : null),
            assemblyId: effectiveAssemblyId,
            action: isStructuralChange ? 'PROPERTY_STRUCTURAL_UPDATE_VALUATION_DECOUPLED' : 'PROPERTY_METADATA_UPDATE',
            resourceType: 'Property',
            resourceId: existing.id,
            requestId: crypto.randomUUID(),
            outcome: 'SUCCESS',
            metadata: {
              propertyCode: existing.code,
              changedStructuralFields,
              isStructuralChange,
              decoupledValuationsCount,
              newPropertyStatus: updated.propertyStatus,
              newVerificationStatus: updated.verificationStatus,
              performedByRef: input.staffRef
            }
          }
        });

        // Outbox Domain Event
        const evt = domainEvent({
          eventType: isStructuralChange ? 'PropertyUpdatedAndValuationDecoupled' : 'PropertyMetadataUpdated',
          eventVersion: 1,
          producer: app.serviceInfo.name,
          aggregateType: 'Property',
          aggregateId: existing.id,
          aggregateVersion: 2,
          concessionId: existing.registeredByConcessionId || actor.concessionId || '00000000-0000-0000-0000-000000000000',
          assemblyId: effectiveAssemblyId,
          correlationId: crypto.randomUUID(),
          data: {
            propertyId: existing.id,
            code: existing.code,
            changedFields: isStructuralChange ? changedStructuralFields : changedMetadataFields,
            isStructuralChange,
            previousAssemblyId: existing.assemblyId,
            newAssemblyId: effectiveAssemblyId,
            previousPropertyStatus: existing.propertyStatus,
            newPropertyStatus: updated.propertyStatus,
            previousVerificationStatus: existing.verificationStatus,
            newVerificationStatus: updated.verificationStatus,
            decoupledValuationsCount,
            updatedByActorId: actor.subject,
            updatedByActorType: actor.actorType,
            updatedByStaffRef: input.staffRef
          }
        });

        await appendOutboxEvent(
          tx,
          isStructuralChange ? 'revenue.property.valuation_decoupled.v1' : 'revenue.property.updated.v1',
          evt
        );

        return hidePropertyNameFromConcession(updated, actor.actorType);
      });
    },

    // The one ratepayer-facing write this service exposes directly (see
    // authenticateRatepayer in plugins/auth.ts) — scoped to exactly one field, gated by
    // real ownership (claimed or, for any legacy/seed data, created), never routed through
    // updateProperty's concession-facing path at all.
    async renamePropertyAsRatepayer(idOrCode: string, propertyName: string, ratepayerId: string) {
      const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(idOrCode);
      const existing = await app.prisma.property.findFirst({
        where: isUuid ? { OR: [{ id: idOrCode }, { code: idOrCode }] } : { code: idOrCode }
      });
      if (!existing) throw new NotFoundError(`Property '${idOrCode}' not found`);

      const isOwner = existing.claimedByRatepayerId === ratepayerId || existing.createdByRatepayerId === ratepayerId;
      if (!isOwner) {
        throw new ForbiddenError('You can only rename a property you own.');
      }

      return app.prisma.$transaction(async (tx) => {
        const updated = await tx.property.update({
          where: { id: existing.id },
          data: { propertyName, version: { increment: 1 } }
        });

        await tx.propertyUpdateHistory.create({
          data: {
            propertyId: existing.id,
            performedByRef: ratepayerId,
            action: 'METADATA_UPDATE',
            changedFields: ['propertyName']
          }
        });

        await tx.auditRecord.create({
          data: {
            actorId: ratepayerId,
            actorType: 'RATEPAYER',
            concessionId: existing.registeredByConcessionId,
            assemblyId: existing.assemblyId,
            action: 'PROPERTY_RENAMED',
            resourceType: 'Property',
            resourceId: existing.id,
            requestId: crypto.randomUUID(),
            outcome: 'SUCCESS',
            metadata: {
              propertyCode: existing.code,
              propertyAssemblyId: existing.assemblyId,
              registeredByConcessionId: existing.registeredByConcessionId,
              performedByRef: ratepayerId
            }
          }
        });

        // No hidePropertyNameFromConcession here — the actor is the ratepayer who just
        // set it, not a concession reading it back.
        return updated;
      });
    },

    async addUnit(propertyId: string, unitIdentifier: string, unitType: string, floorLevel: number, assemblyIds: string[]) {
      const isScoped = !assemblyIds.includes('*');
      const prop = await app.prisma.property.findFirst({
        where: isScoped ? { id: propertyId, assemblyId: { in: assemblyIds } } : { id: propertyId }
      });
      if (!prop) throw new NotFoundError('Property not found');

      return app.prisma.propertyUnit.create({
        data: {
          propertyId,
          unitIdentifier,
          unitType,
          floorLevel
        }
      });
    },

    // Concession staff uploads ownership documents for ratepayer on field premises
    async uploadPremisesDocument(input: UploadPremisesDocumentInput) {
      const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(input.propertyCode);
      const property = await app.prisma.property.findFirst({
        where: isUuid
          ? { OR: [{ code: input.propertyCode }, { id: input.propertyCode }] }
          : { code: input.propertyCode }
      });
      if (!property) {
        throw new NotFoundError(`Property '${input.propertyCode}' not found`);
      }

      // Check concession assembly boundary
      if (!input.assemblyIds.includes('*') && !input.assemblyIds.includes(property.assemblyId)) {
        throw new ForbiddenError(
          `Concession cannot upload documents outside its assigned assembly scope (${property.assemblyId} vs ${input.assemblyIds.join(', ')})`
        );
      }

      return app.prisma.$transaction(async (tx) => {
        const doc = await tx.propertyDocument.create({
          data: {
            propertyId: property.id,
            documentType: input.documentType,
            documentNumber: input.documentNumber ?? null,
            issuingAuthority: input.issuingAuthority ?? null,
            issueDate: input.issueDate ? new Date(input.issueDate) : null,
            mediaUrl: input.mediaUrl,
            uploadedByActorType: 'CONCESSION_STAFF',
            uploadedByActorId: input.staffRef,
            ratepayerId: input.ratepayerId ?? property.claimedByRatepayerId ?? null,
            verificationStatus: 'PENDING',
            isCapturedOnPremises: true,
            premisesLatitude: input.premisesCoordinates.latitude,
            premisesLongitude: input.premisesCoordinates.longitude,
            premisesGpsAccuracy: input.premisesCoordinates.accuracyMeters ?? null,
            deviceId: input.deviceId,
            staffRef: input.staffRef,
            capturedAt: new Date()
          }
        });

        const evt = domainEvent({
          eventType: 'PropertyDocumentUploadedOnPremises',
          eventVersion: 1,
          producer: app.serviceInfo.name,
          aggregateType: 'PropertyDocument',
          aggregateId: doc.id,
          aggregateVersion: 1,
          concessionId: input.concessionId,
          assemblyId: property.assemblyId,
          correlationId: crypto.randomUUID(),
          data: {
            documentId: doc.id,
            propertyId: property.id,
            propertyCode: property.code,
            documentType: doc.documentType,
            staffRef: input.staffRef,
            deviceId: input.deviceId,
            isCapturedOnPremises: true,
            coordinates: input.premisesCoordinates
          }
        });

        await appendOutboxEvent(tx, 'revenue.property.document_uploaded.v1', evt);

        return doc;
      });
    },

    // Concessionaire agent submits a field verification; it does not move the property's
    // cached verificationStatus until a concessionaire officer reviews it (see reviewVerification).
    async submitVerification(input: SubmitVerificationInput) {
      const isScoped = !input.assemblyIds.includes('*');
      const property = await app.prisma.property.findFirst({
        where: isScoped ? { id: input.propertyId, assemblyId: { in: input.assemblyIds } } : { id: input.propertyId }
      });
      if (!property) throw new NotFoundError('Property not found');

      return app.prisma.$transaction(async (tx) => {
        const verification = await tx.propertyVerification.create({
          data: {
            propertyId: property.id,
            verifiedByPersonnelId: input.verifiedByPersonnelId,
            verifierLatitude: input.verifierCoordinates.latitude,
            verifierLongitude: input.verifierCoordinates.longitude,
            isWithinPolygon: input.isWithinPolygon,
            verifiedSnapshot: input.verifiedSnapshot as any,
            capturedAt: new Date(input.capturedAt),
            outcome: input.outcome,
            notes: input.notes ?? null,
            reviewStatus: 'PENDING'
          }
        });

        const evt = domainEvent({
          eventType: 'PropertyVerificationSubmitted',
          eventVersion: 1,
          producer: app.serviceInfo.name,
          aggregateType: 'PropertyVerification',
          aggregateId: verification.id,
          aggregateVersion: 1,
          concessionId: input.concessionId,
          assemblyId: property.assemblyId,
          correlationId: crypto.randomUUID(),
          data: {
            verificationId: verification.id,
            propertyId: property.id,
            propertyCode: property.code,
            outcome: verification.outcome,
            verifiedByPersonnelId: input.verifiedByPersonnelId
          }
        });
        await appendOutboxEvent(tx, 'revenue.property.verification_submitted.v1', evt);

        return verification;
      });
    },

    // Concessionaire officer approves or rejects a field verification. Only on approval does
    // the property's cached verificationStatus move — the agent's own outcome is never final.
    async reviewVerification(input: ReviewVerificationInput) {
      const verification = await app.prisma.propertyVerification.findUnique({
        where: { id: input.verificationId },
        include: { property: true }
      });
      if (!verification) throw new NotFoundError('Verification not found');
      if (!input.assemblyIds.includes('*') && !input.assemblyIds.includes(verification.property.assemblyId)) {
        throw new ForbiddenError('Concession cannot review verifications outside its assigned assembly scope');
      }
      if (verification.reviewStatus !== 'PENDING') {
        throw new BadRequestError(`Verification has already been reviewed (status: ${verification.reviewStatus})`);
      }

      return app.prisma.$transaction(async (tx) => {
        const reviewed = await tx.propertyVerification.update({
          where: { id: input.verificationId },
          data: {
            reviewStatus: input.reviewStatus,
            reviewedByPersonnelId: input.reviewedByPersonnelId,
            reviewedAt: new Date(),
            reviewNotes: input.reviewNotes ?? null
          }
        });

        if (input.reviewStatus === 'APPROVED') {
          await tx.property.update({
            where: { id: verification.propertyId },
            data: {
              verificationStatus: 'VERIFIED',
              verifiedBy: input.reviewedByPersonnelId,
              verifiedAt: new Date()
            }
          });
        }

        const evt = domainEvent({
          eventType: 'PropertyVerificationReviewed',
          eventVersion: 1,
          producer: app.serviceInfo.name,
          aggregateType: 'PropertyVerification',
          aggregateId: reviewed.id,
          aggregateVersion: 2,
          concessionId: input.concessionId,
          assemblyId: verification.property.assemblyId,
          correlationId: crypto.randomUUID(),
          data: {
            verificationId: reviewed.id,
            propertyId: verification.propertyId,
            reviewStatus: reviewed.reviewStatus,
            reviewedByPersonnelId: input.reviewedByPersonnelId
          }
        });
        await appendOutboxEvent(tx, 'revenue.property.verification_reviewed.v1', evt);

        return reviewed;
      });
    },

    async listVerifications(propertyId: string, assemblyIds: string[]) {
      const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(propertyId);
      const isScoped = !assemblyIds.includes('*');
      const whereClause: Record<string, unknown> = isUuid
        ? { OR: [{ id: propertyId }, { code: propertyId }] }
        : { code: propertyId };

      if (isScoped) {
        whereClause.assemblyId = { in: assemblyIds };
      }

      const property = await app.prisma.property.findFirst({ where: whereClause });
      if (!property) throw new NotFoundError('Property not found');

      return app.prisma.propertyVerification.findMany({
        where: { propertyId: property.id },
        orderBy: { capturedAt: 'desc' }
      });
    },

    async getPropertyDocuments(propertyCode: string, assemblyIds: string[]) {
      const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(propertyCode);
      const whereClause: Record<string, unknown> = isUuid
        ? { OR: [{ code: propertyCode }, { id: propertyCode }] }
        : { code: propertyCode };

      if (!assemblyIds.includes('*')) {
        whereClause.assemblyId = { in: assemblyIds };
      }

      const property = await app.prisma.property.findFirst({
        where: whereClause
      });
      if (!property) throw new NotFoundError(`Property '${propertyCode}' not found`);

      return app.prisma.propertyDocument.findMany({
        where: { propertyId: property.id },
        orderBy: { createdAt: 'desc' }
      });
    },

    // Deletes an individual property parcel and severs all links to ratepayers.
    // Business rule: if that ratepayer (or any ratepayer) has paid bills on that property,
    // you CANNOT delete that property; you can only sever the link.
    async deleteProperty(
      propertyId: string,
      actorId: string,
      actorType: string = 'USER',
      staffRef?: string,
      assemblyIds: string[] = []
    ) {
      const property = await app.prisma.property.findUnique({
        where: { id: propertyId }
      });
      if (!property) throw new NotFoundError('Property record not found');

      // Was missing entirely — a concession's own token could delete ANY property
      // platform-wide, not just ones within its own assigned MMDA(s). Same scoping rule
      // updateProperty already enforces for CONCESSION actors; staff (USER) remain
      // unrestricted, consistent with every other concession-vs-staff split in this service.
      if (actorType === 'CONCESSION') {
        if (!assemblyIds.includes('*') && !assemblyIds.includes(property.assemblyId)) {
          throw new ForbiddenError(
            `Concessionaire cannot delete property outside its assigned assembly scope (${property.assemblyId} vs ${assemblyIds.join(', ')})`
          );
        }
        // A concession's own API credential is shared across all its field/admin staff, so
        // unlike a staff officer's own Zitadel login (actorId already uniquely identifies
        // them), there's no other way to know which individual actually did this —
        // staffRef is how the concession's own app supplies that.
        if (!staffRef?.trim()) {
          throw new BadRequestError('staffRef is required when a concession deletes a property.');
        }
      }

      // Check with billing service if any bills have been paid on this property
      let hasPaidBills = false;
      try {
        const checkRes = await fetch(`${app.config.BILLING_SERVICE_URL}/v1/bills/property-payment-status/${propertyId}`, {
          headers: { 'Content-Type': 'application/json' },
          signal: AbortSignal.timeout(5000)
        });
        if (checkRes.ok) {
          const data = await checkRes.json() as { hasPaidBills: boolean; totalAmountPaid?: string };
          hasPaidBills = data.hasPaidBills;
        }
      } catch (err) {
        app.log.warn({ err, propertyId }, 'Could not contact billing-payments-service to verify paid bills; proceeding with caution');
      }

      if (hasPaidBills) {
        throw new BadRequestError('Cannot delete property with paid bills. You can only sever the link to the ratepayer.');
      }

      // Sever all ratepayer links for this property in ratepayer-service
      try {
        await fetch(`${app.config.RATEPAYER_SERVICE_URL}/v1/properties/${propertyId}/links`, {
          method: 'DELETE',
          signal: AbortSignal.timeout(5000)
        });
      } catch (err) {
        app.log.warn({ err, propertyId }, 'Failed to notify ratepayer-service to sever links for property');
      }

      // Delete the property and its associated records
      return app.prisma.$transaction(async (tx) => {
        await tx.propertyVerification.deleteMany({ where: { propertyId } });
        await tx.propertyValuation.deleteMany({ where: { propertyId } });
        await tx.propertyPhoto.deleteMany({ where: { propertyId } });
        await tx.propertyDocument.deleteMany({ where: { propertyId } });
        await tx.propertyUnit.deleteMany({ where: { propertyId } });
        await tx.property.delete({ where: { id: propertyId } });

        const evt = domainEvent({
          eventType: 'PropertyDeleted',
          eventVersion: 1,
          producer: app.serviceInfo.name,
          aggregateType: 'Property',
          aggregateId: propertyId,
          aggregateVersion: 1,
          concessionId: property.registeredByConcessionId || '00000000-0000-0000-0000-000000000000',
          assemblyId: property.assemblyId,
          correlationId: crypto.randomUUID(),
          data: { propertyId, code: property.code, actorId }
        });
        await appendOutboxEvent(tx, 'revenue.property.deleted.v1', evt);

        // Durable "who deleted this" record — deliberately AuditRecord, not
        // PropertyUpdateHistory: that table FK-cascades away the instant the property row
        // it's created in the same transaction gets deleted below, so it could never
        // actually answer "who deleted X" after the fact. AuditRecord.resourceId is a
        // loose reference (no FK to Property), so it's exactly the record that survives.
        await tx.auditRecord.create({
          data: {
            actorId,
            actorType,
            concessionId: property.registeredByConcessionId,
            assemblyId: property.assemblyId,
            action: 'PROPERTY_DELETED',
            resourceType: 'Property',
            resourceId: propertyId,
            requestId: crypto.randomUUID(),
            outcome: 'SUCCESS',
            metadata: {
              propertyCode: property.code,
              propertyAssemblyId: property.assemblyId,
              registeredByConcessionId: property.registeredByConcessionId,
              // staffRef when a concession deleted it (required above); otherwise the
              // staff officer's own id already uniquely identifies them.
              performedByRef: staffRef?.trim() || actorId
            }
          }
        });

        app.log.info({ propertyId, code: property.code, actorId }, 'Property deleted and ratepayer links severed');

        return {
          success: true,
          message: `Property ${property.code} deleted and all ratepayer links severed successfully`
        };
      });
    },

    async purgeProperties(actorId: string) {
      return app.prisma.$transaction(async (tx) => {
        const deletedVerifications = await tx.propertyVerification.deleteMany({});
        const deletedValuations = await tx.propertyValuation.deleteMany({});
        const deletedPhotos = await tx.propertyPhoto.deleteMany({});
        const deletedDocs = await tx.propertyDocument.deleteMany({});
        const deletedUnits = await tx.propertyUnit.deleteMany({});
        const deletedProperties = await tx.property.deleteMany({});
        const deletedValuationLists = await tx.valuationList.deleteMany({});

        app.log.warn({ actorId, deletedProperties: deletedProperties.count }, 'Admin purged all properties');

        return {
          success: true,
          purged: {
            properties: deletedProperties.count,
            units: deletedUnits.count,
            documents: deletedDocs.count,
            photos: deletedPhotos.count,
            valuations: deletedValuations.count,
            verifications: deletedVerifications.count,
            valuationLists: deletedValuationLists.count
          }
        };
      });
    }
  };
}
