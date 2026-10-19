import type { FastifyInstance } from 'fastify';
import { domainEvent } from '../../events/envelope.js';
import { appendOutboxEvent } from '../../events/outbox.js';
import { NotFoundError, BadRequestError, ForbiddenError, ConflictError, ServiceUnavailableError } from '../../lib/errors.js';
import { getServiceAccessToken } from '../../lib/zitadel-client.js';

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
  code: string;
  accountNumber?: string;
  propertyName?: string;
  propertyClass?: string;
  buildingStatus?: string;
  propertyStatus?: string;
  propertyUse?: string;
  tenureType?: string;
  structureType?: string;
  polygonGeoJson: Record<string, unknown>;
  registrationSource?: 'CONCESSION' | 'RATEPAYER';
  createdByRatepayerId?: string;
  documents?: PropertyDocumentInput[];
  concessionId: string;
  assemblyId: string;
  actorId: string;
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

// Zone-membership guard: a property's footprint must fall inside exactly one drawn MMDA
// boundary before it can be registered, so two assemblies can never end up disputing the
// same parcel and no property is silently orphaned outside every known MMDA. Calls Shared
// Services (the owner of boundary geometry) synchronously rather than keeping a local copy —
// simplest to reason about, at the cost of property registration depending on Shared Services
// being up.
async function assertZoneMembership(
  app: FastifyInstance,
  polygonGeoJson: Record<string, unknown>,
  claimedAssemblyId: string
): Promise<void> {
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

  if (result.status === 'NO_MATCH') {
    throw new BadRequestError(
      'This property boundary does not fall within any registered MMDA boundary. Draw the MMDA boundary in Zones & Boundaries before registering properties inside it.'
    );
  }

  if (result.status === 'CONFLICT') {
    throw new ConflictError(
      `This property boundary overlaps more than one MMDA: ${result.matchedAssemblies.map((a) => `${a.name} (${a.code})`).join(', ')}. Fix the overlapping MMDA boundaries in Zones & Boundaries, or correct the property's footprint, before registering it.`,
      { matchedAssemblies: result.matchedAssemblies }
    );
  }

  // MATCHED, but to an assembly other than the one the caller is registering under — the
  // property sits in a different MMDA's territory than claimed. This is the same "zone
  // conflict" case as above, just caught against the caller's own context rather than
  // against another drawn boundary.
  if (result.assembly && result.assembly.id !== claimedAssemblyId) {
    throw new ConflictError(
      `This property boundary falls within ${result.assembly.name} (${result.assembly.code}), not the assembly you're registering it under. Register it under the correct MMDA, or draw/fix the MMDA boundaries in Zones & Boundaries if this is wrong.`,
      { matchedAssembly: result.assembly, claimedAssemblyId }
    );
  }
}

export function propertyService(app: FastifyInstance) {
  return {
    async createProperty(input: CreatePropertyInput) {
      await assertZoneMembership(app, input.polygonGeoJson, input.assemblyId);

      const isRatepayerCreation = input.registrationSource === 'RATEPAYER' || Boolean(input.createdByRatepayerId);

      // Business Rule: Ownership verification documents are MANDATORY when property is created from ratepayer's end
      if (isRatepayerCreation) {
        if (!input.documents || input.documents.length === 0) {
          throw new BadRequestError(
            `Ownership verification documents are required to register a property from the ratepayer's end. Please attach at least one proof of ownership (e.g. Land Title Certificate, Indenture, Building Permit, or Purchase Agreement).`
          );
        }
      }

      return app.prisma.$transaction(async (tx) => {
        const property = await tx.property.create({
          data: {
            code: input.code,
            accountNumber: input.accountNumber ?? null,
            propertyName: input.propertyName ?? null,
            assemblyId: input.assemblyId,
            propertyClass: input.propertyClass ?? 'RESIDENTIAL_CLASS_1',
            buildingStatus: input.buildingStatus ?? 'COMPLETED',
            propertyStatus: input.propertyStatus ?? 'ASSESSED',
            propertyUse: input.propertyUse ?? 'RESIDENTIAL',
            tenureType: input.tenureType ?? 'FREEHOLD',
            structureType: input.structureType ?? 'CONCRETE',
            registrationSource: isRatepayerCreation ? 'RATEPAYER' : 'CONCESSION',
            registeredByConcessionId: isRatepayerCreation ? null : input.concessionId,
            createdByRatepayerId: input.createdByRatepayerId ?? null,
            verificationStatus: 'PENDING',
            polygonGeoJson: input.polygonGeoJson as any
          }
        });

        // Default unit
        await tx.propertyUnit.create({
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
                ratepayerId: input.createdByRatepayerId ?? null,
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
          assemblyId: input.assemblyId,
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

        return property;
      });
    },

    async listProperties(assemblyId: string) {
      return app.prisma.property.findMany({
        where: { assemblyId },
        include: { documents: true },
        orderBy: { createdAt: 'desc' },
        take: 50
      });
    },

    async getProperty(id: string, assemblyId: string) {
      const prop = await app.prisma.property.findFirst({
        where: { id, assemblyId },
        include: {
          units: true,
          documents: true,
          valuations: { where: { isCurrent: true } }
        }
      });
      if (!prop) throw new NotFoundError('Property not found');
      return prop;
    },

    async addUnit(propertyId: string, unitIdentifier: string, unitType: string, floorLevel: number, assemblyId: string) {
      const prop = await app.prisma.property.findFirst({ where: { id: propertyId, assemblyId } });
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
      const property = await app.prisma.property.findFirst({
        where: { id: input.propertyId, assemblyId: input.assemblyId }
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
      const property = await app.prisma.property.findFirst({ where: { id: propertyId, assemblyId } });
      if (!property) throw new NotFoundError('Property not found');

      return app.prisma.propertyVerification.findMany({
        where: { propertyId },
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
    }
  };
}
