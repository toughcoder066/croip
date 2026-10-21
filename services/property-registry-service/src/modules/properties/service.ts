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
  propertyName?: string;
  propertyClass?: string;
  buildingStatus?: string;
  propertyStatus?: string;
  propertyUse?: string;
  tenureType?: string;
  structureType?: string;
  numberOfFloors?: number;
  ownershipType?: string;
  ownershipPercentage?: number;
  polygonGeoJson: Record<string, unknown>;
  registrationSource?: 'CONCESSION' | 'RATEPAYER';
  createdByRatepayerId?: string;
  documents?: PropertyDocumentInput[];
  concessionId: string;
  assemblyId?: string;
  actorId: string;
  actorType?: 'RATEPAYER' | 'CONCESSION' | 'USER' | 'SERVICE';
}

export interface CreateBatchPropertyInput {
  properties: Array<Omit<CreatePropertyInput, 'concessionId' | 'assemblyId' | 'actorId' | 'actorType'>>;
  concessionId: string;
  actorId: string;
  actorType?: 'RATEPAYER' | 'CONCESSION' | 'USER' | 'SERVICE';
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
  assemblyId: string;
}

export interface ReviewVerificationInput {
  verificationId: string;
  reviewStatus: 'APPROVED' | 'REJECTED';
  reviewedByPersonnelId: string;
  reviewNotes?: string;
  concessionId: string;
  assemblyId: string;
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
  assemblyId: string;
  actorId: string;
}

export interface UpdatePropertyInput {
  propertyName?: string;
  accountNumber?: string;
  propertyUse?: string;
  structureType?: string;
  buildingStatus?: string;
  propertyClass?: string;
  tenureType?: string;
  numberOfFloors?: number;
  landAreaSqm?: number;
  leaseDurationYears?: number;
  polygonGeoJson?: Record<string, unknown>;
  claimedByRatepayerId?: string;
  createdByRatepayerId?: string;
}

const assignedAssembliesCache = new Map<string, { assemblies: string[]; expiresAt: number }>();

/**
 * Fetches the active MMDAs assigned to a concession from Platform Governance Service (:3010).
 * Results are cached in-memory with a short TTL to keep boundary enforcement fast.
 */
export async function getConcessionAssignedAssemblies(
  app: FastifyInstance,
  concessionId: string,
  fallbackAssemblyId?: string
): Promise<string[]> {
  const cached = assignedAssembliesCache.get(concessionId);
  if (cached && Date.now() < cached.expiresAt) {
    return cached.assemblies;
  }

  const assemblies = new Set<string>();
  if (fallbackAssemblyId && fallbackAssemblyId !== '00000000-0000-0000-0000-000000000000') {
    assemblies.add(fallbackAssemblyId);
  }

  try {
    const headers: Record<string, string> =
      app.config.AUTH_MODE === 'zitadel'
        ? { Authorization: `Bearer ${await getServiceAccessToken(app.config)}` }
        : { 'x-dev-subject': 'property-registry-service', 'x-dev-permissions': 'concessionaires:read' };

    const response = await fetch(`${app.config.PLATFORM_GOVERNANCE_URL}/v1/concessions/${concessionId}/assemblies`, {
      method: 'GET',
      headers,
      signal: AbortSignal.timeout(3000)
    });

    if (response.ok) {
      const list = (await response.json()) as Array<{ assemblyId: string; status?: string }>;
      for (const item of list) {
        if (!item.status || item.status === 'ACTIVE') {
          assemblies.add(item.assemblyId);
        }
      }
    }
  } catch (err) {
    app.log.warn({ err, concessionId }, 'Could not fetch assigned assemblies from Platform Governance Service');
  }

  const result = Array.from(assemblies);
  if (result.length > 0) {
    assignedAssembliesCache.set(concessionId, {
      assemblies: result,
      expiresAt: Date.now() + 60_000
    });
  }
  return result;
}

interface ZoneValidationOptions {
  isRatepayer: boolean;
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

  // Concessions cannot create properties outside of their assigned MMDA
  if (!options.isRatepayer) {
    const allowed = options.allowedAssemblyIds ?? [];
    if (allowed.length > 0 && !allowed.includes(result.assembly.id)) {
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
      propertyName: true,
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
        const propDesc = existing.propertyName
          ? `"${existing.propertyName}" (${existing.code})`
          : `property ${existing.code}`;

        throw new ConflictError(
          `Property boundary conflict: The specified polygon overlaps with or is within the boundary of existing registered ${propDesc} with matching use "${existing.propertyUse}". Properties of matching use cannot share or overlap the same parcel footprint.`
        );
      }
    }
  }
}

/**
 * Generates the next sequential property code for an MMDA:
 * - Ratepayer: ${assemblyCode}-SELF-XXXX (e.g. GH0701-SELF-0004)
 * - Concession: ${assemblyCode}-XXXX (e.g. GH0701-0003)
 */
async function generatePropertyCode(
  tx: any,
  assemblyCode: string,
  isRatepayer: boolean,
  reservedCodes?: Set<string>
): Promise<string> {
  const prefix = isRatepayer ? `${assemblyCode}-SELF-` : `${assemblyCode}-`;

  const existingProperties = await tx.property.findMany({
    where: {
      code: {
        startsWith: prefix
      }
    },
    select: {
      code: true
    }
  });

  let maxSeq = 0;
  for (const p of existingProperties) {
    if (!isRatepayer && p.code.startsWith(`${assemblyCode}-SELF-`)) {
      continue;
    }
    const suffix = p.code.slice(prefix.length);
    if (/^\d{4}$/.test(suffix)) {
      const num = parseInt(suffix, 10);
      if (num > maxSeq) {
        maxSeq = num;
      }
    }
  }

  let candidateSeq = maxSeq + 1;
  while (true) {
    const candidateCode = `${prefix}${String(candidateSeq).padStart(4, '0')}`;
    if (reservedCodes && reservedCodes.has(candidateCode)) {
      candidateSeq++;
      continue;
    }

    const existing = await tx.property.findUnique({
      where: { code: candidateCode },
      select: { id: true }
    });
    if (!existing) {
      if (reservedCodes) {
        reservedCodes.add(candidateCode);
      }
      return candidateCode;
    }
    candidateSeq++;
  }
}

export function propertyService(app: FastifyInstance) {
  return {
    async createProperty(input: CreatePropertyInput) {
      const isRatepayerCreation =
        input.actorType === 'RATEPAYER' ||
        input.registrationSource === 'RATEPAYER' ||
        Boolean(input.createdByRatepayerId);

      if (isRatepayerCreation) {
        // Business Rule: For authenticated ratepayer registration, exactly these 4 fields are required:
        // 1. propertyName
        // 2. polygonGeoJson
        // 3. propertyUse
        // 4. ownershipType ('FULL' or 'PART')
        if (!input.propertyName || !input.propertyName.trim()) {
          throw new BadRequestError('Property name is required when registering a property as a ratepayer.');
        }

        if (!input.polygonGeoJson || typeof input.polygonGeoJson !== 'object') {
          throw new BadRequestError('A valid polygon GeoJSON boundary is required to register a property.');
        }

        if (!input.propertyUse || !input.propertyUse.trim()) {
          throw new BadRequestError('Property use (e.g. RESIDENTIAL, COMMERCIAL, INDUSTRIAL, MIXED_USE) is required when registering a property.');
        }

        if (!input.ownershipType || !input.ownershipType.trim()) {
          throw new BadRequestError('Ownership type is required when registering a property (either FULL or PART).');
        }

        const normalizedOwnership = input.ownershipType.trim().toUpperCase();
        if (!['FULL', 'PART', 'PARTIAL', 'OWNER', 'CO_OWNER'].includes(normalizedOwnership)) {
          throw new BadRequestError('Ownership type must be either FULL or PART.');
        }
      } else {
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
      }

      let allowedAssemblyIds: string[] = [];
      if (!isRatepayerCreation) {
        allowedAssemblyIds = await getConcessionAssignedAssemblies(app, input.concessionId, input.assemblyId);
      }

      const matchedAssembly = await assertZoneMembership(app, input.polygonGeoJson, {
        isRatepayer: isRatepayerCreation,
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

          const code = input.code?.trim() || (await generatePropertyCode(tx, matchedAssembly.code, isRatepayerCreation));
          const effectivePropertyStatus = isRatepayerCreation ? 'UNASSESSED' : (input.propertyStatus || 'UNASSESSED');

          const property = await tx.property.create({
            data: {
              code,
              accountNumber: input.accountNumber ?? null,
              propertyName: input.propertyName ?? null,
              assemblyId: effectiveAssemblyId,
              propertyClass: input.propertyClass ?? null,
              buildingStatus: input.buildingStatus ?? null,
              propertyStatus: effectivePropertyStatus,
              propertyUse: input.propertyUse!,
              tenureType: input.tenureType ?? null,
              structureType: input.structureType ?? null,
              numberOfFloors: input.numberOfFloors ?? null,
              registrationSource: isRatepayerCreation ? 'RATEPAYER' : 'CONCESSION',
              registeredByConcessionId: isRatepayerCreation ? null : input.concessionId,
              createdByRatepayerId: isRatepayerCreation ? (input.createdByRatepayerId ?? input.actorId) : null,
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
                  uploadedByActorType: isRatepayerCreation ? 'RATEPAYER' : 'CONCESSION_STAFF',
                  uploadedByActorId: input.actorId,
                  ratepayerId: isRatepayerCreation ? (input.createdByRatepayerId ?? input.actorId) : null,
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

          // defaultUnitId isn't part of the public response schema (fast-json-stringify
          // strips anything not declared there) — it's only consumed internally, by the
          // route, to link a self-registered property back to the ratepayer in
          // ratepayer-service right after this transaction commits.
          return { ...property, defaultUnitId: defaultUnit.id };
        });
      } catch (err: any) {
        if (err?.code === 'P2002') {
          throw new ConflictError(`Property with code "${input.code}" already exists.`);
        }
        throw err;
      }
    },

    async createBatchProperties(input: CreateBatchPropertyInput) {
      if (input.actorType === 'RATEPAYER') {
        throw new ForbiddenError('Batch property registration is only available to concessionaires. Ratepayers can register individual properties.');
      }
      if (!input.properties || input.properties.length === 0) {
        throw new BadRequestError('At least one property must be provided in the batch');
      }
      if (input.properties.length > 500) {
        throw new BadRequestError('Batch size exceeds maximum limit of 500 properties');
      }

      const allowedAssemblyIds = await getConcessionAssignedAssemblies(app, input.concessionId);

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
          isRatepayer: false,
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

            const code = item.code?.trim() || (await generatePropertyCode(tx, assembly.code, false, reservedCodes));

            const property = await tx.property.create({
              data: {
                code,
                accountNumber: item.accountNumber ?? null,
                propertyName: item.propertyName ?? null,
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

            createdList.push({ ...property, defaultUnitId: defaultUnit.id });
          }

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
    async listProperties(assemblyId?: string) {
      return app.prisma.property.findMany({
        where: assemblyId && assemblyId !== '*' ? { assemblyId } : {},
        include: { documents: true },
        orderBy: { createdAt: 'desc' },
        take: 50
      });
    },

    async getProperty(id: string, assemblyId?: string) {
      const prop = await app.prisma.property.findFirst({
        where: assemblyId && assemblyId !== '*' ? { id, assemblyId } : { id },
        include: {
          units: true,
          documents: true,
          valuations: { where: { isCurrent: true } }
        }
      });
      if (!prop) throw new NotFoundError('Property not found');
      return prop;
    },

    async updateProperty(
      idOrCode: string,
      input: UpdatePropertyInput,
      actor: { subject: string; actorType: string; concessionId?: string; assemblyId?: string }
    ) {
      const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(idOrCode);
      const existing = await app.prisma.property.findFirst({
        where: isUuid ? { OR: [{ id: idOrCode }, { code: idOrCode }] } : { code: idOrCode },
        include: { valuations: true }
      });
      if (!existing) throw new NotFoundError(`Property '${idOrCode}' not found`);

      // Authorization verification
      if (actor.actorType === 'RATEPAYER') {
        const isOwner =
          existing.createdByRatepayerId === actor.subject ||
          existing.claimedByRatepayerId === actor.subject;
        if (!isOwner) {
          throw new ForbiddenError('You are only authorized to update properties that belong to your ratepayer profile.');
        }
      } else if (actor.actorType === 'CONCESSION') {
        if (actor.assemblyId && actor.assemblyId !== '*' && existing.assemblyId !== actor.assemblyId) {
          throw new ForbiddenError(
            `Concessionaire cannot update property outside its assigned assembly scope (${existing.assemblyId} vs ${actor.assemblyId})`
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
        'polygonGeoJson',
        'claimedByRatepayerId',
        'createdByRatepayerId'
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

      const isStructuralChange = changedStructuralFields.length > 0;

      // If polygon changed, validate boundaries
      if (input.polygonGeoJson && changedStructuralFields.includes('polygonGeoJson')) {
        await assertNoConflictingOverlap(app.prisma, input.polygonGeoJson, {
          propertyUse: input.propertyUse || existing.propertyUse,
          assemblyId: existing.assemblyId,
          propertyCode: existing.code,
          excludePropertyId: existing.id
        });
      }

      return app.prisma.$transaction(async (tx) => {
        const updateData: any = {
          ...(input.propertyName !== undefined ? { propertyName: input.propertyName } : {}),
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
          ...(input.claimedByRatepayerId !== undefined ? { claimedByRatepayerId: input.claimedByRatepayerId } : {}),
          ...(input.createdByRatepayerId !== undefined ? { createdByRatepayerId: input.createdByRatepayerId } : {})
        };

        let decoupledValuationsCount = 0;

        if (isStructuralChange) {
          // Requirement: When a ratepayer's property is updated (actual property characteristics,
          // not trivial metadata like name or documents), the property should be assigned UNASSESSED
          // and PENDING verification, and all active valuations must be decoupled.
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

        // Audit Record
        await tx.auditRecord.create({
          data: {
            actorId: actor.subject,
            actorType: actor.actorType,
            concessionId: existing.registeredByConcessionId ?? (actor.concessionId && actor.concessionId !== '00000000-0000-0000-0000-000000000000' ? actor.concessionId : null),
            assemblyId: existing.assemblyId,
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
              newVerificationStatus: updated.verificationStatus
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
          assemblyId: existing.assemblyId,
          correlationId: crypto.randomUUID(),
          data: {
            propertyId: existing.id,
            code: existing.code,
            changedFields: isStructuralChange ? changedStructuralFields : Object.keys(input),
            isStructuralChange,
            previousPropertyStatus: existing.propertyStatus,
            newPropertyStatus: updated.propertyStatus,
            previousVerificationStatus: existing.verificationStatus,
            newVerificationStatus: updated.verificationStatus,
            decoupledValuationsCount,
            updatedByActorId: actor.subject,
            updatedByActorType: actor.actorType
          }
        });

        await appendOutboxEvent(
          tx,
          isStructuralChange ? 'revenue.property.valuation_decoupled.v1' : 'revenue.property.updated.v1',
          evt
        );

        return updated;
      });
    },

    async addUnit(propertyId: string, unitIdentifier: string, unitType: string, floorLevel: number, assemblyId: string) {
      const isScoped = assemblyId && assemblyId !== '*';
      const prop = await app.prisma.property.findFirst({
        where: isScoped ? { id: propertyId, assemblyId } : { id: propertyId }
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
      if (input.assemblyId && input.assemblyId !== '*' && property.assemblyId !== input.assemblyId) {
        throw new ForbiddenError(
          `Concession cannot upload documents outside its assigned assembly scope (${property.assemblyId} vs ${input.assemblyId})`
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
      const isScoped = input.assemblyId && input.assemblyId !== '*';
      const property = await app.prisma.property.findFirst({
        where: isScoped ? { id: input.propertyId, assemblyId: input.assemblyId } : { id: input.propertyId }
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
      if (input.assemblyId !== '*' && verification.property.assemblyId !== input.assemblyId) {
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
            data: { verificationStatus: 'VERIFIED' }
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

    async listVerifications(propertyId: string, assemblyId: string) {
      const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(propertyId);
      const isScoped = assemblyId && assemblyId !== '*';
      const whereClause: Record<string, unknown> = isUuid
        ? { OR: [{ id: propertyId }, { code: propertyId }] }
        : { code: propertyId };

      if (isScoped) {
        whereClause.assemblyId = assemblyId;
      }

      const property = await app.prisma.property.findFirst({ where: whereClause });
      if (!property) throw new NotFoundError('Property not found');

      return app.prisma.propertyVerification.findMany({
        where: { propertyId: property.id },
        orderBy: { capturedAt: 'desc' }
      });
    },

    async getPropertyDocuments(propertyCode: string, assemblyId: string) {
      const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(propertyCode);
      const whereClause: Record<string, unknown> = isUuid
        ? { OR: [{ code: propertyCode }, { id: propertyCode }] }
        : { code: propertyCode };

      if (assemblyId && assemblyId !== '*') {
        whereClause.assemblyId = assemblyId;
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
    async deleteProperty(propertyId: string, actorId: string) {
      const property = await app.prisma.property.findUnique({
        where: { id: propertyId }
      });
      if (!property) throw new NotFoundError('Property record not found');

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
