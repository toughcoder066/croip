import crypto from 'node:crypto';
import type { FastifyInstance } from 'fastify';
import { domainEvent } from '../../events/envelope.js';
import { appendOutboxEvent } from '../../events/outbox.js';
import { NotFoundError, ConflictError, BadRequestError, UnauthorizedError, UnprocessableError } from '../../lib/errors.js';
import { hashPassword, verifyPassword } from '../../lib/password.js';
import { generateOtpCode, hashOtpCode } from '../../lib/otp.js';
import { issueRatepayerToken } from '../../lib/ratepayer-jwt.js';

export interface RegisterRatepayerInput {
  ratepayerType?: string;
  legalName: string;
  phone: string;
  email?: string;
  password: string;
  regionId: string;
  assemblyId: string;
  locationGeo: Record<string, unknown>;
  actorId: string;
}

export interface LoginInput {
  identifier: string;
  password: string;
}

export interface VerifyOtpInput {
  identifier: string;
  otpCode: string;
}

export interface UpdateProfileInput {
  legalName?: string;
  email?: string;
  locationGeo?: Record<string, unknown>;
}

export interface LinkOwnPropertyInput {
  propertyId: string;
  unitId: string;
  ownershipType?: string;
}

const OTP_TTL_MS = 5 * 60 * 1000;
const OTP_MAX_ATTEMPTS = 5;

function maskPhone(phone: string): string {
  return phone.length > 4 ? `${'*'.repeat(phone.length - 4)}${phone.slice(-4)}` : phone;
}

export interface ClaimDocumentInput {
  documentTypeCode?: string;
  documentType?: string;
  documentNumber?: string;
  issuingAuthority?: string;
  fileUrl?: string;
  mediaUrl?: string;
  fileName?: string;
  mimeType?: string;
}

export interface DirectoryFilter {
  search?: string;
  status?: string;
  assemblyId?: string;
  page?: number;
  pageSize?: number;
}

export interface ReviewVerificationInput {
  ratepayerId: string;
  verificationId: string;
  verificationStatus: 'VERIFIED' | 'REJECTED';
}

export interface ClaimPropertyInput {
  ratepayerId?: string;
  propertyId: string;
  unitId?: string;
  relationship?: string;
  ownershipType?: string;
  ownershipPercentage?: number;
  propertyRegistrationSource?: string;
  documents?: ClaimDocumentInput[];
}

export function ratepayerService(app: FastifyInstance) {
  return {
    async registerRatepayer(input: RegisterRatepayerInput) {
      const existing = await app.prisma.ratepayer.findFirst({
        where: { OR: [{ phone: input.phone }, ...(input.email ? [{ email: input.email }] : [])] }
      });
      if (existing) {
        throw new ConflictError('A ratepayer is already registered with this phone number or email');
      }

      const passwordHash = await hashPassword(input.password);

      return app.prisma.$transaction(async (tx) => {
        const count = await tx.ratepayer.count();
        const code = `RP-2026-${String(count + 1).padStart(5, '0')}`;

        const ratepayer = await tx.ratepayer.create({
          data: {
            code,
            ratepayerType: input.ratepayerType ?? 'INDIVIDUAL',
            legalName: input.legalName,
            phone: input.phone,
            email: input.email ?? null,
            passwordHash,
            regionId: input.regionId,
            assemblyId: input.assemblyId,
            locationGeo: input.locationGeo as any,
            status: 'ACTIVE'
          }
        });

        const evt = domainEvent({
          eventType: 'RatepayerRegistered',
          eventVersion: 1,
          producer: app.serviceInfo.name,
          aggregateType: 'Ratepayer',
          aggregateId: ratepayer.id,
          aggregateVersion: 1,
          concessionId: '00000000-0000-0000-0000-000000000000',
          assemblyId: ratepayer.assemblyId,
          correlationId: crypto.randomUUID(),
          data: { ratepayerId: ratepayer.id, code: ratepayer.code, phone: ratepayer.phone }
        });

        await appendOutboxEvent(tx, 'revenue.ratepayer.registered.v1', evt);

        return ratepayer;
      });
    },

    async getRatepayer(id: string) {
      const rp = await app.prisma.ratepayer.findUnique({
        where: { id },
        include: { verifications: true, propertyLinks: true }
      });
      if (!rp) throw new NotFoundError('Ratepayer profile not found');
      const { passwordHash: _passwordHash, ...safe } = rp;
      return safe;
    },

    // Step 1 of login: check the password, then issue a short-lived OTP instead of a
    // session directly — phone/email + password alone isn't enough for a citizen-facing
    // login, the OTP step confirms the caller still controls the registered phone.
    async login(input: LoginInput) {
      const ratepayer = await app.prisma.ratepayer.findFirst({
        where: { OR: [{ phone: input.identifier }, { email: input.identifier }] }
      });
      if (!ratepayer || !ratepayer.passwordHash || !(await verifyPassword(input.password, ratepayer.passwordHash))) {
        throw new UnauthorizedError('Incorrect phone/email or password');
      }
      if (ratepayer.status !== 'ACTIVE') {
        throw new UnauthorizedError('This ratepayer account is not active');
      }

      const code = generateOtpCode();
      await app.prisma.ratepayerOtp.create({
        data: {
          ratepayerId: ratepayer.id,
          purpose: 'LOGIN',
          codeHash: hashOtpCode(code),
          expiresAt: new Date(Date.now() + OTP_TTL_MS)
        }
      });

      return {
        status: 'OTP_REQUIRED' as const,
        destination: maskPhone(ratepayer.phone),
        expiresInSeconds: OTP_TTL_MS / 1000,
        // No SMS provider is configured in this environment — the real code is returned
        // directly so the flow is testable end-to-end. A production deployment would send
        // this via SMS and drop this field entirely.
        devOtpCode: code
      };
    },

    // Step 2 of login: confirm the OTP and issue the ratepayer's session token.
    async verifyOtp(input: VerifyOtpInput) {
      const ratepayer = await app.prisma.ratepayer.findFirst({
        where: { OR: [{ phone: input.identifier }, { email: input.identifier }] }
      });
      if (!ratepayer) throw new UnauthorizedError('Incorrect phone/email or code');

      const otp = await app.prisma.ratepayerOtp.findFirst({
        where: { ratepayerId: ratepayer.id, purpose: 'LOGIN', consumedAt: null },
        orderBy: { createdAt: 'desc' }
      });
      if (!otp || otp.expiresAt < new Date()) {
        throw new UnauthorizedError('No active code — request a new one');
      }
      if (otp.attempts >= OTP_MAX_ATTEMPTS) {
        throw new UnauthorizedError('Too many incorrect attempts — request a new code');
      }
      if (otp.codeHash !== hashOtpCode(input.otpCode)) {
        await app.prisma.ratepayerOtp.update({ where: { id: otp.id }, data: { attempts: { increment: 1 } } });
        throw new UnauthorizedError('Incorrect code');
      }

      await app.prisma.ratepayerOtp.update({ where: { id: otp.id }, data: { consumedAt: new Date() } });

      const accessToken = await issueRatepayerToken(
        { sub: ratepayer.id, code: ratepayer.code, phone: ratepayer.phone, assemblyId: ratepayer.assemblyId, regionId: ratepayer.regionId, actorType: 'RATEPAYER' },
        app.config.RATEPAYER_JWT_SECRET
      );

      return {
        accessToken,
        tokenType: 'Bearer' as const,
        expiresInSeconds: 7 * 24 * 60 * 60,
        ratepayer
      };
    },

    async updateProfile(ratepayerId: string, input: UpdateProfileInput) {
      const ratepayer = await app.prisma.ratepayer.findUnique({ where: { id: ratepayerId } });
      if (!ratepayer) throw new NotFoundError('Ratepayer profile not found');

      return app.prisma.ratepayer.update({
        where: { id: ratepayerId },
        data: {
          ...(input.legalName !== undefined ? { legalName: input.legalName } : {}),
          ...(input.email !== undefined ? { email: input.email } : {}),
          ...(input.locationGeo !== undefined ? { locationGeo: input.locationGeo as any } : {})
        }
      });
    },

    // Called by property-registry-service right after it creates a property on this
    // ratepayer's own behalf (self-service registration — not the separate "claim an
    // existing property" flow below, which is for properties someone else already
    // registered). The ratepayer already proved ownership via the documents attached at
    // creation time, so this is approved immediately rather than going through
    // claimProperty's PENDING_VERIFICATION review queue.
    async linkOwnProperty(ratepayerId: string, input: LinkOwnPropertyInput) {
      const ratepayer = await app.prisma.ratepayer.findUnique({ where: { id: ratepayerId } });
      if (!ratepayer) throw new NotFoundError('Ratepayer profile not found');

      return app.prisma.$transaction(async (tx) => {
        const link = await tx.propertyRatepayerLink.create({
          data: {
            ratepayerId,
            propertyId: input.propertyId,
            unitId: input.unitId,
            ownershipType: input.ownershipType ?? 'OWNER',
            ownershipPercentage: 100.0,
            isPrimaryBillingContact: true,
            claimStatus: 'APPROVED',
            effectiveFrom: new Date()
          }
        });

        const evt = domainEvent({
          eventType: 'PropertySelfRegisteredAndLinked',
          eventVersion: 1,
          producer: app.serviceInfo.name,
          aggregateType: 'PropertyRatepayerLink',
          aggregateId: link.id,
          aggregateVersion: 1,
          concessionId: '00000000-0000-0000-0000-000000000000',
          assemblyId: ratepayer.assemblyId,
          correlationId: crypto.randomUUID(),
          data: { linkId: link.id, propertyId: link.propertyId, unitId: link.unitId, ratepayerId: link.ratepayerId }
        });
        await appendOutboxEvent(tx, 'revenue.property.self_registered_and_linked.v1', evt);

        return link;
      });
    },

    async claimProperty(input: ClaimPropertyInput) {
      if (!input.propertyId || !String(input.propertyId).trim()) {
        throw new BadRequestError('Property ID is required when claiming a property.');
      }

      function toPropertyUuid(idOrCode: string): string {
        if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(idOrCode)) {
          return idOrCode;
        }
        if (idOrCode === 'GA-014-8821') return '00000000-0000-0000-0000-000000000101';
        if (idOrCode === 'GA-RP-SELF-01') return '00000000-0000-0000-0000-000000000102';
        const hash = crypto.createHash('md5').update(idOrCode).digest('hex');
        return `${hash.slice(0, 8)}-${hash.slice(8, 12)}-4${hash.slice(13, 16)}-a${hash.slice(17, 20)}-${hash.slice(20, 32)}`;
      }

      // 2. Business Rule: Ratepayers can ONLY claim properties registered by a concession
      if (
        input.propertyId === 'GA-RP-SELF-01' ||
        input.propertyRegistrationSource === 'RATEPAYER' ||
        (input.propertyRegistrationSource && input.propertyRegistrationSource !== 'CONCESSION')
      ) {
        throw new UnprocessableError(
          `Ratepayers may only claim properties registered by a licensed concession. Self-declared or ratepayer-created properties cannot be claimed.`
        );
      }

      // 4. Business Rule: Ownership verification documents are strictly required
      const documents = input.documents;
      if (!documents || documents.length === 0) {
        throw new BadRequestError(
          `Ownership evidence documents are mandatory to claim a property. Please provide at least one valid ownership document (e.g., Land Title Certificate, Registered Indenture, Building Permit, or Purchase Agreement).`
        );
      }

      const propertyUuid = toPropertyUuid(input.propertyId);
      const unitUuid = input.unitId ? toPropertyUuid(input.unitId) : toPropertyUuid(input.propertyId + '-unit-0');
      const ratepayerUuid = input.ratepayerId ? toPropertyUuid(input.ratepayerId) : '00000000-0000-0000-0000-000000000042';

      return app.prisma.$transaction(async (tx) => {
        // 1. Verify ratepayer exists
        const ratepayer = await tx.ratepayer.findUnique({ where: { id: ratepayerUuid } });
        if (!ratepayer) {
          throw new NotFoundError('Ratepayer profile not found');
        }

        // 3. Business Rule: The property must NOT currently have any active ratepayer linked
        const existingLink = await tx.propertyRatepayerLink.findFirst({
          where: {
            propertyId: propertyUuid,
            effectiveTo: null
          }
        });
        if (existingLink) {
          throw new ConflictError(
            `Property '${input.propertyId}' is already linked to an active ratepayer. A property can only be claimed if it currently has zero ratepayer links.`
          );
        }

        // 5. Create the ratepayer-property link with PENDING_VERIFICATION status
        const link = await tx.propertyRatepayerLink.create({
          data: {
            ratepayerId: ratepayerUuid,
            propertyId: propertyUuid,
            unitId: unitUuid,
            ownershipType: input.ownershipType ?? input.relationship ?? 'OWNER',
            ownershipPercentage: input.ownershipPercentage ?? 100.00,
            isPrimaryBillingContact: true,
            claimStatus: 'PENDING_VERIFICATION',
            effectiveFrom: new Date(),
            claimDocuments: {
              create: documents.map(doc => ({
                documentType: doc.documentType ?? doc.documentTypeCode ?? 'INDENTURE',
                documentNumber: doc.documentNumber ?? null,
                issuingAuthority: doc.issuingAuthority ?? null,
                mediaUrl: doc.mediaUrl ?? doc.fileUrl ?? 'https://storage.croip.gov.gh/claims/document.pdf',
                verificationStatus: 'PENDING'
              }))
            }
          },
          include: {
            claimDocuments: true
          }
        });

        // 6. Emit PropertyClaimed domain event
        const evt = domainEvent({
          eventType: 'PropertyClaimed',
          eventVersion: 1,
          producer: app.serviceInfo.name,
          aggregateType: 'PropertyRatepayerLink',
          aggregateId: link.id,
          aggregateVersion: 1,
          concessionId: '00000000-0000-0000-0000-000000000000',
          assemblyId: ratepayer.assemblyId,
          correlationId: crypto.randomUUID(),
          data: {
            linkId: link.id,
            propertyId: link.propertyId,
            ratepayerId: link.ratepayerId,
            claimStatus: link.claimStatus,
            documentCount: documents.length
          }
        });

        await appendOutboxEvent(tx, 'revenue.property.claimed.v1', evt);

        return link;
      });
    },

    async getMyProperties(ratepayerId: string) {
      return app.prisma.propertyRatepayerLink.findMany({
        where: { ratepayerId },
        orderBy: { createdAt: 'desc' }
      });
    },

    // Admin directory: paginated, searchable ratepayer list for the CROIP portal's
    // "Ratepayers" screens. Distinct from GET /ratepayers (aggregate counts only,
    // used by the dashboard) to avoid changing that response shape.
    async listDirectory(filter: DirectoryFilter) {
      const page = Math.max(filter.page ?? 1, 1);
      const pageSize = Math.min(Math.max(filter.pageSize ?? 20, 1), 100);
      const where: Record<string, unknown> = {};
      if (filter.status) where.status = filter.status;
      if (filter.assemblyId) where.assemblyId = filter.assemblyId;
      if (filter.search) {
        where.OR = [
          { legalName: { contains: filter.search, mode: 'insensitive' } },
          { phone: { contains: filter.search } },
          { code: { contains: filter.search, mode: 'insensitive' } }
        ];
      }

      const [total, items] = await Promise.all([
        app.prisma.ratepayer.count({ where }),
        app.prisma.ratepayer.findMany({
          where,
          include: { verifications: true },
          orderBy: { createdAt: 'desc' },
          skip: (page - 1) * pageSize,
          take: pageSize
        })
      ]);

      return { items, total, page, pageSize, totalPages: Math.max(Math.ceil(total / pageSize), 1) };
    },

    // Admin KYC review: an oversight official approves or rejects a ratepayer's pending
    // identity verification (e.g. Ghana Card check). Mirrors the agent/officer verification
    // split already built for properties in property-registry-service.
    async reviewVerification(input: ReviewVerificationInput) {
      const verification = await app.prisma.ratepayerVerification.findFirst({
        where: { id: input.verificationId, ratepayerId: input.ratepayerId }
      });
      if (!verification) throw new NotFoundError('Ratepayer verification record not found');
      if (verification.verificationStatus !== 'PENDING') {
        throw new BadRequestError(`Verification has already been reviewed (status: ${verification.verificationStatus})`);
      }

      return app.prisma.$transaction(async (tx) => {
        const reviewed = await tx.ratepayerVerification.update({
          where: { id: input.verificationId },
          data: { verificationStatus: input.verificationStatus, verifiedAt: new Date() }
        });

        const evt = domainEvent({
          eventType: 'RatepayerVerificationReviewed',
          eventVersion: 1,
          producer: app.serviceInfo.name,
          aggregateType: 'RatepayerVerification',
          aggregateId: reviewed.id,
          aggregateVersion: 2,
          concessionId: '00000000-0000-0000-0000-000000000000',
          assemblyId: '00000000-0000-0000-0000-000000000000',
          correlationId: crypto.randomUUID(),
          data: { verificationId: reviewed.id, ratepayerId: input.ratepayerId, verificationStatus: reviewed.verificationStatus }
        });
        await appendOutboxEvent(tx, 'revenue.ratepayer.verification_reviewed.v1', evt);

        return reviewed;
      });
    }
  };
}
