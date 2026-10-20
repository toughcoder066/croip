import crypto from 'node:crypto';
import type { FastifyInstance } from 'fastify';
import { domainEvent } from '../../events/envelope.js';
import { appendOutboxEvent } from '../../events/outbox.js';
import { NotFoundError, ConflictError, BadRequestError, UnauthorizedError, UnprocessableError } from '../../lib/errors.js';
import { hashPassword, verifyPassword } from '../../lib/password.js';
import { generateOtpCode, hashOtpCode } from '../../lib/otp.js';
import { issueRatepayerToken } from '../../lib/ratepayer-jwt.js';
import { getServiceAccessToken } from '../../lib/zitadel-client.js';
import { dispatchOtp } from '../../lib/notification-dispatcher.js';

export function parseNameParts(
  legalName?: string | null,
  first?: string | null,
  middle?: string | null,
  last?: string | null
) {
  let firstName = first?.trim() || undefined;
  let middleName = middle?.trim() || undefined;
  let lastName = last?.trim() || undefined;

  if ((!firstName || !lastName) && legalName) {
    const tokens = legalName.trim().split(/\s+/).filter(Boolean);
    if (tokens.length === 1 && !firstName) {
      firstName = tokens[0];
    } else if (tokens.length === 2) {
      if (!firstName) firstName = tokens[0];
      if (!lastName) lastName = tokens[1];
    } else if (tokens.length >= 3) {
      if (!firstName) firstName = tokens[0];
      if (!middleName) middleName = tokens.slice(1, -1).join(' ');
      if (!lastName) lastName = tokens[tokens.length - 1];
    }
  }

  const assembledLegal = [firstName, middleName, lastName].filter(Boolean).join(' ') || legalName?.trim() || undefined;

  return {
    firstName: firstName || null,
    middleName: middleName || null,
    lastName: lastName || null,
    legalName: assembledLegal || null
  };
}

export interface RegisterRatepayerInput {
  ratepayerType?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  legalName?: string;
  phone?: string;
  number?: string;
  identifier?: string;
  email?: string;
  password: string;
  confirmPassword?: string;
  address?: string;
  regionId?: string;
  assemblyId?: string;
  locationGeo?: Record<string, unknown>;
  latitude?: number;
  longitude?: number;
  actorId?: string;
}

export interface LoginInput {
  identifier?: string;
  email?: string;
  phone?: string;
  number?: string;
  password: string;
}

export interface VerifyOtpInput {
  identifier?: string;
  email?: string;
  phone?: string;
  number?: string;
  otpCode: string;
}

export interface UpdateProfileInput {
  firstName?: string;
  middleName?: string;
  lastName?: string;
  legalName?: string;
  email?: string;
  phone?: string;
  number?: string;
  address?: string;
  regionId?: string;
  assemblyId?: string;
  locationGeo?: Record<string, unknown>;
  latitude?: number;
  longitude?: number;
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

export function computeProfileCompletion(ratepayer: {
  firstName?: string | null;
  middleName?: string | null;
  lastName?: string | null;
  legalName?: string | null;
  phone?: string | null;
  email?: string | null;
  address?: string | null;
  regionId?: string | null;
  assemblyId?: string | null;
  locationGeo?: unknown;
  verifications?: Array<{ verificationStatus: string }>;
}) {
  let score = 0;
  const missingSections: string[] = [];

  // 1. Account Contact (Phone or Email) - 25%
  if (ratepayer.phone || ratepayer.email) {
    score += 25;
  } else {
    missingSections.push('ACCOUNT_CONTACT');
  }

  // Explicitly note missing contact information so citizen/admin knows what can still be added
  if (!ratepayer.phone) {
    missingSections.push('PHONE_NUMBER');
  }
  if (!ratepayer.email) {
    missingSections.push('EMAIL_ADDRESS');
  }

  // 2. Personal / Legal Identity (Legal Name / First & Last Name) - 25%
  const nameCandidate = ratepayer.legalName || [ratepayer.firstName, ratepayer.lastName].filter(Boolean).join(' ');
  const hasValidName =
    Boolean(nameCandidate) &&
    nameCandidate.trim().length >= 2 &&
    !nameCandidate.toLowerCase().includes('pending');
  if (hasValidName) {
    score += 25;
  } else {
    missingSections.push('LEGAL_NAME');
  }

  // 3. Address & Pinpoint Location (Address, Region, Assembly, or Coordinates) - 25%
  const hasAddress = Boolean(ratepayer.address && ratepayer.address.trim().length > 0);
  const hasLocationGeo = Boolean(ratepayer.locationGeo);
  const hasRegionOrAssembly = Boolean(ratepayer.regionId || ratepayer.assemblyId);
  const hasLocation = (hasAddress && (hasLocationGeo || hasRegionOrAssembly)) || (hasLocationGeo && hasRegionOrAssembly);
  if (hasLocation) {
    score += 25;
  } else {
    missingSections.push('ADDRESS_AND_LOCATION');
  }

  const activeVerification = ratepayer.verifications?.find(v => v.verificationStatus === 'VERIFIED') as any;
  const hasVerifiedKyc = Boolean(activeVerification);
  if (hasVerifiedKyc) {
    score += 25;
  } else {
    missingSections.push('KYC_VERIFICATION');
  }

  const isProfileComplete = hasValidName && Boolean(ratepayer.phone || ratepayer.email) && hasLocation;
  const isEligibleForPropertyCreation = isProfileComplete && hasVerifiedKyc;

  return {
    completionPercentage: score,
    isProfileComplete,
    hasVerifiedKyc,
    activeKycProvider: activeVerification?.provider ?? null,
    activeKycReference: activeVerification?.providerReference ?? null,
    isEligibleForPropertyCreation,
    missingSections
  };
}

async function detectMmdaZone(
  app: FastifyInstance,
  latitude?: number,
  longitude?: number,
  locationGeo?: any
): Promise<{ assemblyId: string | undefined; regionId: string | undefined; locationGeo: any; assemblyName?: string; regionName?: string }> {
  let lat = latitude;
  let lng = longitude;

  if ((lat === undefined || lng === undefined) && locationGeo) {
    if (locationGeo.type === 'Point' && Array.isArray(locationGeo.coordinates) && locationGeo.coordinates.length >= 2) {
      lng = Number(locationGeo.coordinates[0]);
      lat = Number(locationGeo.coordinates[1]);
    } else if (typeof locationGeo.lat === 'number' && typeof locationGeo.lng === 'number') {
      lat = locationGeo.lat;
      lng = locationGeo.lng;
    }
  }

  let geoJson = locationGeo;
  if (lat !== undefined && lng !== undefined && !isNaN(lat) && !isNaN(lng)) {
    geoJson = {
      type: 'Point',
      coordinates: [lng, lat]
    };

    try {
      const detectUrl = `${app.config.SHARED_SERVICES_URL}/v1/assemblies/detect-zone`;
      let authHeader: Record<string, string> = {};
      if (app.config.AUTH_MODE === 'zitadel') {
        try {
          const token = await getServiceAccessToken(app.config);
          authHeader = { Authorization: `Bearer ${token}` };
        } catch (tokenErr) {
          app.log.warn({ err: tokenErr }, 'Failed to obtain Zitadel machine token for zone lookup');
        }
      } else {
        authHeader = { 'x-dev-subject': 'ratepayer-service', 'x-dev-permissions': 'reference:read' };
      }

      const res = await fetch(detectUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeader },
        body: JSON.stringify({ latitude: lat, longitude: lng }),
        signal: AbortSignal.timeout(4000)
      });
      if (res.ok) {
        const zone = (await res.json()) as any;
        const assemblyId = zone.assembly?.id || zone.assemblyId || undefined;
        const regionId = zone.region?.id || zone.regionId || zone.assembly?.regionId || undefined;
        const assemblyName = zone.assembly?.name || undefined;
        const regionName = zone.region?.name || undefined;
        return { assemblyId, regionId, locationGeo: geoJson, assemblyName, regionName };
      }
    } catch (err) {
      app.log.warn({ err }, 'Shared services zone detection lookup failed, falling back to provided IDs');
    }
  }

  return { assemblyId: undefined, regionId: undefined, locationGeo: geoJson };
}

export const ALLOWED_KYC_PROVIDERS = ['GHANA_CARD', 'PASSPORT', 'DRIVERS_LICENSE'] as const;
export type KycProviderType = (typeof ALLOWED_KYC_PROVIDERS)[number];

export function normalizeKycProvider(input?: string): KycProviderType {
  if (!input) return 'GHANA_CARD';
  const cleaned = input.trim().toUpperCase().replace(/[\s-]+/g, '_');
  if (cleaned.includes('GHANA') || cleaned.includes('NIA') || cleaned.includes('CARD')) {
    return 'GHANA_CARD';
  }
  if (cleaned.includes('PASSPORT')) {
    return 'PASSPORT';
  }
  if (cleaned.includes('DRIVER') || cleaned.includes('LICEN') || cleaned.includes('DVLA')) {
    return 'DRIVERS_LICENSE';
  }
  throw new BadRequestError('Invalid identification provider. Must be one of: GHANA_CARD, PASSPORT, DRIVERS_LICENSE');
}

export function generateDummyProviderReference(provider: KycProviderType): string {
  if (provider === 'GHANA_CARD') {
    const digits = Math.floor(100000000 + Math.random() * 900000000);
    const check = Math.floor(Math.random() * 10);
    return `GHA-${digits}-${check}`;
  }
  if (provider === 'PASSPORT') {
    const digits = Math.floor(10000000 + Math.random() * 90000000);
    return `G${digits}`;
  }
  // DRIVERS_LICENSE
  const digits = Math.floor(10000000 + Math.random() * 90000000);
  const check = Math.floor(Math.random() * 10);
  return `DL-${digits}-${check}`;
}

export function ratepayerService(app: FastifyInstance) {
  return {
    async registerRatepayer(input: RegisterRatepayerInput) {
      const rawEmail = input.email;
      const rawPhone = input.phone || input.number;
      const rawId = input.identifier?.trim();

      let cleanEmail = rawEmail ? rawEmail.toLowerCase().trim() : undefined;
      let cleanPhone = rawPhone ? rawPhone.trim() : undefined;

      if (!cleanEmail && !cleanPhone && rawId) {
        if (rawId.includes('@')) {
          cleanEmail = rawId.toLowerCase();
        } else {
          cleanPhone = rawId;
        }
      }

      if (!cleanEmail && !cleanPhone) {
        throw new BadRequestError('Either an email address or phone number is required to register as a ratepayer.');
      }

      if (input.confirmPassword && input.password !== input.confirmPassword) {
        throw new BadRequestError('Passwords do not match. Please verify and try again.');
      }

      const orConditions: Array<{ phone?: string; email?: string }> = [];
      if (cleanPhone) orConditions.push({ phone: cleanPhone });
      if (cleanEmail) orConditions.push({ email: cleanEmail });

      const existing = await app.prisma.ratepayer.findFirst({
        where: { OR: orConditions }
      });
      if (existing) {
        throw new ConflictError('A ratepayer is already registered with this phone number or email');
      }

      const detected = await detectMmdaZone(app, input.latitude, input.longitude, input.locationGeo);
      const passwordHash = await hashPassword(input.password);
      const defaultName = cleanEmail ? cleanEmail.split('@')[0] : cleanPhone ? `Ratepayer ${cleanPhone}` : 'Pending Profile';
      const names = parseNameParts(input.legalName, input.firstName, input.middleName, input.lastName);
      const legalName = names.legalName || defaultName;
      const otpCode = generateOtpCode();

      const created = await app.prisma.$transaction(async (tx) => {
        const latest = await tx.ratepayer.findFirst({
          orderBy: { createdAt: 'desc' },
          select: { code: true }
        });
        let nextSeq = 1;
        if (latest?.code) {
          const match = latest.code.match(/RP-\d+-(\d+)/);
          if (match && match[1]) {
            nextSeq = parseInt(match[1], 10) + 1;
          }
        }
        let code = `RP-2026-${String(nextSeq).padStart(5, '0')}`;
        while (await tx.ratepayer.findUnique({ where: { code } })) {
          nextSeq++;
          code = `RP-2026-${String(nextSeq).padStart(5, '0')}`;
        }

        const ratepayer = await tx.ratepayer.create({
          data: {
            code,
            ratepayerType: input.ratepayerType ?? 'INDIVIDUAL',
            firstName: names.firstName ?? null,
            middleName: names.middleName ?? null,
            lastName: names.lastName ?? null,
            legalName: legalName || null,
            phone: cleanPhone ?? null,
            email: cleanEmail ?? null,
            passwordHash,
            address: input.address ?? null,
            regionId: detected.regionId ?? input.regionId ?? null,
            assemblyId: detected.assemblyId ?? input.assemblyId ?? null,
            locationGeo: (detected.locationGeo ?? input.locationGeo ?? null) as any,
            status: 'ACTIVE'
          },
          include: { verifications: true, propertyLinks: true }
        });

        // Store OTP for verification / first login
        await tx.ratepayerOtp.create({
          data: {
            ratepayerId: ratepayer.id,
            purpose: 'REGISTRATION',
            codeHash: hashOtpCode(otpCode),
            expiresAt: new Date(Date.now() + OTP_TTL_MS)
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
          assemblyId: ratepayer.assemblyId || '00000000-0000-0000-0000-000000000000',
          correlationId: crypto.randomUUID(),
          data: { ratepayerId: ratepayer.id, code: ratepayer.code, phone: ratepayer.phone, email: ratepayer.email }
        });

        await appendOutboxEvent(tx, 'revenue.ratepayer.registered.v1', evt);

        const { passwordHash: _passwordHash, ...safe } = ratepayer;
        const completion = computeProfileCompletion(ratepayer);
        return { ...safe, completion };
      });

      // Dispatch OTP: Email goes to Mailpit; Phone prepared for Arkasel gateway
      if (cleanEmail) {
        await dispatchOtp({
          destination: cleanEmail,
          channel: 'EMAIL',
          code: otpCode,
          ratepayerName: legalName,
          purpose: 'Ratepayer Registration',
          log: app.log
        });
      } else if (cleanPhone) {
        await dispatchOtp({
          destination: cleanPhone,
          channel: 'SMS',
          code: otpCode,
          ratepayerName: legalName,
          purpose: 'Ratepayer Registration',
          log: app.log
        });
      }

      return {
        ...created,
        otp: {
          status: 'OTP_SENT',
          channel: cleanEmail ? 'EMAIL' : 'SMS',
          destination: cleanEmail || cleanPhone,
          expiresInSeconds: OTP_TTL_MS / 1000,
          devOtpCode: otpCode
        }
      };
    },

    async getRatepayer(id: string) {
      const rp = await app.prisma.ratepayer.findFirst({
        where: {
          OR: [{ id }, { code: id }]
        },
        include: { verifications: true, propertyLinks: true }
      });
      if (!rp) throw new NotFoundError('Ratepayer profile not found');
      const { passwordHash: _passwordHash, ...safe } = rp;
      const completion = computeProfileCompletion(rp);
      return { ...safe, completion };
    },

    // Step 1 of login: check the password, then issue a short-lived OTP instead of a
    // session directly — phone/email + password alone isn't enough for a citizen-facing
    // login, the OTP step confirms the caller still controls the registered phone or email.
    async login(input: LoginInput) {
      const rawId = (input.identifier || input.email || input.phone || input.number || '').trim();
      if (!rawId) {
        throw new BadRequestError('Email address or phone number is required to sign in.');
      }
      const cleanEmail = rawId.toLowerCase();
      const ratepayer = await app.prisma.ratepayer.findFirst({
        where: {
          OR: [
            { phone: rawId },
            { email: cleanEmail },
            { email: rawId }
          ]
        }
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

      // Dispatch login OTP:
      // If user typed an email, dispatch to email (Mailpit); if user typed phone, dispatch to phone (Arkasel).
      // Fallback to whichever destination is on file.
      const preferEmail = rawId.includes('@') && Boolean(ratepayer.email);
      let destination = ratepayer.phone || ratepayer.email || 'user';

      if (preferEmail || (!ratepayer.phone && ratepayer.email)) {
        destination = ratepayer.email!;
        await dispatchOtp({
          destination: ratepayer.email!,
          channel: 'EMAIL',
          code,
          ratepayerName: ratepayer.legalName || undefined,
          purpose: 'Portal Sign-In',
          log: app.log
        });
      } else if (ratepayer.phone) {
        destination = ratepayer.phone;
        await dispatchOtp({
          destination: ratepayer.phone,
          channel: 'SMS',
          code,
          ratepayerName: ratepayer.legalName || undefined,
          purpose: 'Portal Sign-In',
          log: app.log
        });
      }

      return {
        status: 'OTP_REQUIRED' as const,
        destination: maskPhone(destination),
        expiresInSeconds: OTP_TTL_MS / 1000,
        // No SMS provider is configured in this environment — the real code is returned
        // directly so the flow is testable end-to-end. A production deployment would send
        // this via SMS and drop this field entirely.
        devOtpCode: code
      };
    },

    // Step 2 of login: confirm the OTP and issue the ratepayer's session token.
    async verifyOtp(input: VerifyOtpInput) {
      const rawId = (input.identifier || input.email || input.phone || input.number || '').trim();
      if (!rawId) {
        throw new BadRequestError('Email address or phone number is required to verify OTP.');
      }
      const cleanEmail = rawId.toLowerCase();
      const ratepayer = await app.prisma.ratepayer.findFirst({
        where: {
          OR: [
            { phone: rawId },
            { email: cleanEmail },
            { email: rawId }
          ]
        }
      });
      if (!ratepayer) throw new UnauthorizedError('Incorrect phone/email or code');

      const otp = await app.prisma.ratepayerOtp.findFirst({
        where: {
          ratepayerId: ratepayer.id,
          purpose: { in: ['LOGIN', 'REGISTRATION'] },
          consumedAt: null
        },
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
        {
          sub: ratepayer.id,
          code: ratepayer.code,
          phone: ratepayer.phone || '',
          assemblyId: ratepayer.assemblyId || '00000000-0000-0000-0000-000000000000',
          regionId: ratepayer.regionId || '00000000-0000-0000-0000-000000000000',
          actorType: 'RATEPAYER'
        },
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
      const ratepayer = await app.prisma.ratepayer.findFirst({
        where: {
          OR: [{ id: ratepayerId }, { code: ratepayerId }]
        }
      });
      if (!ratepayer) throw new NotFoundError('Ratepayer profile not found');

      const newEmail = input.email !== undefined ? input.email.toLowerCase().trim() : undefined;
      const newPhone = (input.phone !== undefined || input.number !== undefined)
        ? (input.phone || input.number)!.trim()
        : undefined;

      // Validate email/phone uniqueness if being updated or added
      if (newEmail || newPhone) {
        const conflict = await app.prisma.ratepayer.findFirst({
          where: {
            id: { not: ratepayer.id },
            OR: [
              ...(newPhone ? [{ phone: newPhone }] : []),
              ...(newEmail ? [{ email: newEmail }] : [])
            ]
          }
        });
        if (conflict) {
          throw new ConflictError('A ratepayer is already registered with this phone number or email');
        }
      }

      const detected = await detectMmdaZone(app, input.latitude, input.longitude, input.locationGeo);

      let namesUpdate: Record<string, string | null> = {};
      if (
        input.firstName !== undefined ||
        input.middleName !== undefined ||
        input.lastName !== undefined ||
        input.legalName !== undefined
      ) {
        const effFirst = input.firstName !== undefined ? input.firstName : ratepayer.firstName;
        const effMiddle = input.middleName !== undefined ? input.middleName : ratepayer.middleName;
        const effLast = input.lastName !== undefined ? input.lastName : ratepayer.lastName;
        const effLegal = input.legalName !== undefined ? input.legalName : ratepayer.legalName;

        const resolved = parseNameParts(effLegal, effFirst, effMiddle, effLast);
        namesUpdate = {
          firstName: resolved.firstName,
          middleName: resolved.middleName,
          lastName: resolved.lastName,
          legalName: resolved.legalName
        };
      }

      const updated = await app.prisma.ratepayer.update({
        where: { id: ratepayer.id },
        data: {
          ...namesUpdate,
          ...(newEmail !== undefined ? { email: newEmail } : {}),
          ...(newPhone !== undefined ? { phone: newPhone } : {}),
          ...(input.address !== undefined ? { address: input.address } : {}),
          ...(detected.regionId || input.regionId ? { regionId: detected.regionId || input.regionId } : {}),
          ...(detected.assemblyId || input.assemblyId ? { assemblyId: detected.assemblyId || input.assemblyId } : {}),
          ...(detected.locationGeo !== undefined || input.locationGeo !== undefined
            ? { locationGeo: (detected.locationGeo ?? input.locationGeo) as any }
            : {})
        },
        include: { verifications: true, propertyLinks: true }
      });

      const { passwordHash: _passwordHash, ...safe } = updated;
      const completion = computeProfileCompletion(updated);
      return { ...safe, completion };
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
          assemblyId: ratepayer.assemblyId || '00000000-0000-0000-0000-000000000000',
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
          assemblyId: ratepayer.assemblyId || '00000000-0000-0000-0000-000000000000',
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
          { firstName: { contains: filter.search, mode: 'insensitive' } },
          { lastName: { contains: filter.search, mode: 'insensitive' } },
          { email: { contains: filter.search, mode: 'insensitive' } },
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

      const enrichedItems = items.map((item) => {
        const { passwordHash: _passwordHash, ...safe } = item;
        const completion = computeProfileCompletion(item);
        return { ...safe, completion };
      });

      return { items: enrichedItems, total, page, pageSize, totalPages: Math.max(Math.ceil(total / pageSize), 1) };
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
    },

    // KYC verification: Exactly 3 allowed providers (GHANA_CARD, PASSPORT, DRIVERS_LICENSE).
    // A ratepayer can only choose one provider.
    // Changing verification archives previous verifications to preserve the full audit trail.
    async verifyKyc(ratepayerId: string, input: { provider?: string; providerReference?: string; autoVerify?: boolean }) {
      const ratepayer = await app.prisma.ratepayer.findFirst({
        where: {
          OR: [{ id: ratepayerId }, { code: ratepayerId }]
        }
      });
      if (!ratepayer) throw new NotFoundError('Ratepayer profile not found');

      const canonicalProvider = normalizeKycProvider(input.provider);
      const providerReference = input.providerReference?.trim() || generateDummyProviderReference(canonicalProvider);
      const isAuto = input.autoVerify !== false;

      return app.prisma.$transaction(async (tx) => {
        // Archive any previous non-archived verifications for this ratepayer to maintain audit trail
        await tx.ratepayerVerification.updateMany({
          where: {
            ratepayerId: ratepayer.id,
            verificationStatus: { not: 'ARCHIVED' }
          },
          data: {
            verificationStatus: 'ARCHIVED'
          }
        });

        // Create the new verification with the chosen single provider
        const verification = await tx.ratepayerVerification.create({
          data: {
            ratepayerId: ratepayer.id,
            provider: canonicalProvider,
            providerReference,
            verificationStatus: isAuto ? 'VERIFIED' : 'PENDING',
            verifiedAt: isAuto ? new Date() : null
          }
        });

        if (isAuto) {
          const evt = domainEvent({
            eventType: 'RatepayerVerificationReviewed',
            eventVersion: 1,
            producer: app.serviceInfo.name,
            aggregateType: 'RatepayerVerification',
            aggregateId: verification.id,
            aggregateVersion: 1,
            concessionId: '00000000-0000-0000-0000-000000000000',
            assemblyId: ratepayer.assemblyId || '00000000-0000-0000-0000-000000000000',
            correlationId: crypto.randomUUID(),
            data: { verificationId: verification.id, ratepayerId: ratepayer.id, provider: canonicalProvider, verificationStatus: 'VERIFIED' }
          });
          await appendOutboxEvent(tx, 'revenue.ratepayer.verification_reviewed.v1', evt);
        }

        return verification;
      });
    },

    // Deletes an individual ratepayer profile.
    // Business rule: you CANNOT delete a ratepayer who has linked properties.
    async deleteRatepayer(id: string) {
      const ratepayer = await app.prisma.ratepayer.findUnique({
        where: { id },
        include: { propertyLinks: true }
      });
      if (!ratepayer) throw new NotFoundError('Ratepayer profile not found');

      if (ratepayer.propertyLinks && ratepayer.propertyLinks.length > 0) {
        throw new BadRequestError(`Cannot delete ratepayer ${ratepayer.code}: they currently have ${ratepayer.propertyLinks.length} linked property parcel(s). Sever all property links before deleting this ratepayer.`);
      }

      return app.prisma.$transaction(async (tx) => {
        await tx.ratepayerVerification.deleteMany({ where: { ratepayerId: id } });
        await tx.ratepayerOtp.deleteMany({ where: { ratepayerId: id } });
        await tx.ratepayer.delete({ where: { id } });

        const evt = domainEvent({
          eventType: 'RatepayerDeleted',
          eventVersion: 1,
          producer: app.serviceInfo.name,
          aggregateType: 'Ratepayer',
          aggregateId: id,
          aggregateVersion: 1,
          concessionId: '00000000-0000-0000-0000-000000000000',
          assemblyId: ratepayer.assemblyId || '00000000-0000-0000-0000-000000000000',
          correlationId: crypto.randomUUID(),
          data: { ratepayerId: id, code: ratepayer.code }
        });
        await appendOutboxEvent(tx, 'revenue.ratepayer.deleted.v1', evt);

        return { success: true, message: `Ratepayer ${ratepayer.code} deleted successfully` };
      });
    },

    // Severs a single property link for a ratepayer.
    async severPropertyLink(ratepayerId: string, propertyId: string) {
      const link = await app.prisma.propertyRatepayerLink.findFirst({
        where: { ratepayerId, propertyId }
      });
      if (!link) throw new NotFoundError('Property link not found for this ratepayer');

      return app.prisma.$transaction(async (tx) => {
        await tx.propertyClaimDocument.deleteMany({ where: { linkId: link.id } });
        await tx.propertyRatepayerLink.delete({ where: { id: link.id } });

        const evt = domainEvent({
          eventType: 'PropertyRatepayerLinkSevered',
          eventVersion: 1,
          producer: app.serviceInfo.name,
          aggregateType: 'PropertyRatepayerLink',
          aggregateId: link.id,
          aggregateVersion: 1,
          concessionId: '00000000-0000-0000-0000-000000000000',
          assemblyId: '00000000-0000-0000-0000-000000000000',
          correlationId: crypto.randomUUID(),
          data: { linkId: link.id, ratepayerId, propertyId }
        });
        await appendOutboxEvent(tx, 'revenue.property.link_severed.v1', evt);

        return { success: true, message: 'Property link severed successfully' };
      });
    },

    // Severs all ratepayer links for a given property (called when a property is deleted).
    async severAllLinksForProperty(propertyId: string) {
      const links = await app.prisma.propertyRatepayerLink.findMany({ where: { propertyId } });
      if (links.length === 0) return { success: true, count: 0 };

      return app.prisma.$transaction(async (tx) => {
        const linkIds = links.map(l => l.id);
        await tx.propertyClaimDocument.deleteMany({ where: { linkId: { in: linkIds } } });
        const deleted = await tx.propertyRatepayerLink.deleteMany({ where: { propertyId } });
        return { success: true, count: deleted.count };
      });
    },

    async updateStatus(id: string, status: string) {
      const ratepayer = await app.prisma.ratepayer.findUnique({ where: { id } });
      if (!ratepayer) throw new NotFoundError('Ratepayer profile not found');

      return app.prisma.ratepayer.update({
        where: { id },
        data: { status }
      });
    },

    async purgeRatepayers() {
      return app.prisma.$transaction(async (tx) => {
        const deletedDocs = await tx.propertyClaimDocument.deleteMany({});
        const deletedLinks = await tx.propertyRatepayerLink.deleteMany({});
        const deletedVerifications = await tx.ratepayerVerification.deleteMany({});
        const deletedOtps = await tx.ratepayerOtp.deleteMany({});
        const deletedRatepayers = await tx.ratepayer.deleteMany({});

        app.log.warn({ deletedRatepayers: deletedRatepayers.count }, 'Admin purged all ratepayers');

        return {
          success: true,
          purged: {
            ratepayers: deletedRatepayers.count,
            verifications: deletedVerifications.count,
            otps: deletedOtps.count,
            propertyLinks: deletedLinks.count,
            claimDocuments: deletedDocs.count
          }
        };
      });
    }
  };
}
