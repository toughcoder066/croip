import crypto from 'node:crypto';
import type { FastifyInstance } from 'fastify';
import { domainEvent } from '../../events/envelope.js';
import { appendOutboxEvent } from '../../events/outbox.js';
import { NotFoundError, ConflictError, BadRequestError, UnauthorizedError, UnprocessableError, ForbiddenError } from '../../lib/errors.js';
import { hashPassword, verifyPassword } from '../../lib/password.js';
import { generateOtpCode, hashOtpCode } from '../../lib/otp.js';
import { issueRatepayerToken } from '../../lib/ratepayer-jwt.js';
import { getServiceAccessToken } from '../../lib/zitadel-client.js';
import { dispatchOtp } from '../../lib/notification-dispatcher.js';
import { resolveConcessionName } from '../../lib/concession-lookup.js';

// Writes one entry to this ratepayer's account activity log — every real, user-facing
// action taken on the account (not reads), so the CROIP portal's "Account Activity" card
// can show genuine history instead of a hardcoded narrative. `client` is either
// `app.prisma` or a `$transaction` callback's `tx`, so a write can ride along with the
// state change it describes. `requestId` falls back to a fresh UUID — most call sites here
// are plain service functions without the originating Fastify request object in scope.
async function recordActivity(
  client: any,
  input: {
    actorId: string;
    actorType: string;
    action: string;
    resourceId: string;
    outcome?: string;
    metadata?: Record<string, unknown>;
  }
): Promise<void> {
  await client.auditRecord.create({
    data: {
      actorId: input.actorId,
      actorType: input.actorType,
      action: input.action,
      resourceType: 'Ratepayer',
      resourceId: input.resourceId,
      requestId: crypto.randomUUID(),
      outcome: input.outcome ?? 'SUCCESS',
      metadata: input.metadata ?? {}
    }
  });
}

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

// Who performed an action, for the account activity log — RATEPAYER (the ratepayer acting
// on their own account), SERVICE (a concession's own API client, acting on a ratepayer it
// manages), or USER (a CROIP staff/oversight officer).
export interface ActorInfo {
  id: string;
  type: 'RATEPAYER' | 'SERVICE' | 'USER';
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
  password?: string;
  confirmPassword?: string;
  address?: string;
  regionId?: string;
  assemblyId?: string;
  locationGeo?: Record<string, unknown>;
  latitude?: number;
  longitude?: number;
  actorId?: string;
  actorType?: ActorInfo['type'];
  concessionId?: string;
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

export interface ForgotPasswordInput {
  identifier?: string;
  email?: string;
  phone?: string;
  number?: string;
}

export interface ResetPasswordInput {
  identifier?: string;
  email?: string;
  phone?: string;
  number?: string;
  otpCode: string;
  newPassword: string;
  confirmNewPassword?: string;
}

export interface UpdateProfileInput {
  ratepayerType?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  legalName?: string;
  email?: string;
  phone?: string;
  number?: string;
  password?: string;
  confirmPassword?: string;
  address?: string;
  regionId?: string;
  assemblyId?: string;
  locationGeo?: Record<string, unknown>;
  latitude?: number;
  longitude?: number;
}

// Self-service (PATCH /ratepayers/me) is the same shape minus `email` — the account's
// email is immutable from the self-service side; see selfUpdateProfileBodySchema for why.
export type SelfUpdateProfileInput = Omit<UpdateProfileInput, 'email'>;

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

export function hasCoordinatesPoint(locationGeo: unknown): boolean {
  if (!locationGeo || typeof locationGeo !== 'object') return false;
  const geo = locationGeo as Record<string, unknown>;
  if (geo.type === 'Point' && Array.isArray(geo.coordinates) && geo.coordinates.length >= 2) {
    const lng = Number(geo.coordinates[0]);
    const lat = Number(geo.coordinates[1]);
    return !isNaN(lng) && !isNaN(lat) && (lng !== 0 || lat !== 0);
  }
  if (typeof geo.latitude === 'number' && typeof geo.longitude === 'number') {
    return !isNaN(geo.latitude) && !isNaN(geo.longitude);
  }
  if (typeof geo.lat === 'number' && typeof geo.lng === 'number') {
    return !isNaN(geo.lat) && !isNaN(geo.lng);
  }
  return false;
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
  verifications?: Array<{ verificationStatus: string; provider?: string; providerReference?: string }>;
}) {
  let score = 0;
  const missingSections: string[] = [];

  // 1. First Name (15%)
  const hasFirstName = Boolean(ratepayer.firstName && ratepayer.firstName.trim().length > 0);
  if (hasFirstName) {
    score += 15;
  } else {
    missingSections.push('FIRST_NAME');
  }

  // 2. Last Name (15%)
  const hasLastName = Boolean(ratepayer.lastName && ratepayer.lastName.trim().length > 0);
  if (hasLastName) {
    score += 15;
  } else {
    missingSections.push('LAST_NAME');
  }

  // 3. Physical Address (15%)
  const hasAddress = Boolean(ratepayer.address && ratepayer.address.trim().length > 0);
  if (hasAddress) {
    score += 15;
  } else {
    missingSections.push('ADDRESS');
  }

  // 4. Coordinates Point (15%)
  const hasCoordinates = hasCoordinatesPoint(ratepayer.locationGeo);
  if (hasCoordinates) {
    score += 15;
  } else {
    missingSections.push('COORDINATES_POINT');
  }

  // 5. Account Contact: Email (10%) & Phone (10%) = 20%
  const hasPhone = Boolean(ratepayer.phone && ratepayer.phone.trim().length > 0);
  const hasEmail = Boolean(ratepayer.email && ratepayer.email.trim().length > 0);
  if (hasPhone) {
    score += 10;
  } else {
    missingSections.push('PHONE_NUMBER');
  }
  if (hasEmail) {
    score += 10;
  } else {
    missingSections.push('EMAIL_ADDRESS');
  }

  // 6. KYC Verification (20%)
  const activeVerification = ratepayer.verifications?.find(v => v.verificationStatus === 'VERIFIED');
  const hasVerifiedKyc = Boolean(activeVerification);
  if (hasVerifiedKyc) {
    score += 20;
  } else {
    missingSections.push('KYC_VERIFICATION');
  }

  const isProfileComplete = hasFirstName && hasLastName && hasAddress && hasCoordinates && (hasPhone || hasEmail);
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

      if (!input.password) {
        throw new BadRequestError('Password is required to register as a ratepayer.');
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
      const passwordHash = input.password ? await hashPassword(input.password) : null;
      const defaultName = cleanEmail ? cleanEmail.split('@')[0] : cleanPhone ? `Ratepayer ${cleanPhone}` : 'Pending Profile';
      const names = parseNameParts(input.legalName, input.firstName, input.middleName, input.lastName);
      const legalName = names.legalName || defaultName;
      const otpCode = generateOtpCode();

      const created = await app.prisma.$transaction(async (tx) => {
        const year = new Date().getFullYear();
        let id = crypto.randomUUID();
        let code = `RP-${year}-${id.slice(0, 4).toUpperCase()}-${id.slice(-4).toUpperCase()}`;
        while (await tx.ratepayer.findUnique({ where: { code } })) {
          id = crypto.randomUUID();
          code = `RP-${year}-${id.slice(0, 4).toUpperCase()}-${id.slice(-4).toUpperCase()}`;
        }

        const ratepayer = await tx.ratepayer.create({
          data: {
            id,
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
            status: 'ACTIVE',
            concessionId: input.concessionId ?? null
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

        await recordActivity(tx, {
          actorId: input.actorId ?? 'self-service',
          actorType: input.actorType ?? 'RATEPAYER',
          action: 'ratepayer.registered',
          resourceId: ratepayer.id,
          metadata: {
            via: input.actorType === 'SERVICE' ? 'concession' : input.actorType === 'USER' ? 'staff' : 'self-service',
            code: ratepayer.code
          }
        });

        const { passwordHash: _passwordHash, ...safe } = ratepayer;
        const completion = computeProfileCompletion(ratepayer);
        return { ...safe, completion };
      });

      // Dispatch OTP: Email goes to Mailpit; Phone prepared for Arkasel gateway. White-label
      // as the concession, never CROIP — see lib/notification-dispatcher.ts.
      const issuerName = (await resolveConcessionName(app, input.concessionId)) ?? undefined;
      if (cleanEmail) {
        await dispatchOtp({
          destination: cleanEmail,
          channel: 'EMAIL',
          code: otpCode,
          ratepayerName: legalName,
          purpose: 'Ratepayer Registration',
          issuerName,
          log: app.log
        });
      } else if (cleanPhone) {
        await dispatchOtp({
          destination: cleanPhone,
          channel: 'SMS',
          code: otpCode,
          ratepayerName: legalName,
          purpose: 'Ratepayer Registration',
          issuerName,
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
          // Email OTPs are delivered through Mailpit (http://localhost:8025) — a real inbox
          // the caller can check, so there's no need to also echo the code back, and doing
          // so would mask whether the email path actually works. SMS has no running
          // provider yet (Arkasel is stubbed), so returning it here is the only way to test
          // that path until it's wired up for real.
          ...(cleanEmail ? {} : { devOtpCode: otpCode })
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

    // Every real action taken on this ratepayer's account, most recent first — registered,
    // logged in, profile updated (self/concession/staff), KYC submitted/reviewed, status
    // changed, property claimed/unlinked, password reset. Drives the CROIP portal's
    // "Account Activity" card; deliberately not a synthetic/hardcoded narrative.
    async getActivity(ratepayerId: string) {
      const rp = await app.prisma.ratepayer.findFirst({
        where: { OR: [{ id: ratepayerId }, { code: ratepayerId }] },
        select: { id: true }
      });
      if (!rp) throw new NotFoundError('Ratepayer profile not found');

      const records = await app.prisma.auditRecord.findMany({
        where: { resourceType: 'Ratepayer', resourceId: rp.id },
        orderBy: { occurredAt: 'desc' },
        take: 100
      });

      return records.map((r) => ({
        id: r.id,
        occurredAt: r.occurredAt.toISOString(),
        actorId: r.actorId,
        actorType: r.actorType,
        action: r.action,
        outcome: r.outcome,
        metadata: r.metadata
      }));
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
      // Fallback to whichever destination is on file. White-label as the concession this
      // ratepayer belongs to, never CROIP — see lib/notification-dispatcher.ts.
      const preferEmail = rawId.includes('@') && Boolean(ratepayer.email);
      let destination = ratepayer.phone || ratepayer.email || 'user';
      let usedChannel: 'EMAIL' | 'SMS' | undefined;
      const issuerName = (await resolveConcessionName(app, ratepayer.concessionId)) ?? undefined;

      if (preferEmail || (!ratepayer.phone && ratepayer.email)) {
        destination = ratepayer.email!;
        usedChannel = 'EMAIL';
        await dispatchOtp({
          destination: ratepayer.email!,
          channel: 'EMAIL',
          code,
          ratepayerName: ratepayer.legalName || undefined,
          purpose: 'Sign-In',
          issuerName,
          log: app.log
        });
      } else if (ratepayer.phone) {
        destination = ratepayer.phone;
        usedChannel = 'SMS';
        await dispatchOtp({
          destination: ratepayer.phone,
          channel: 'SMS',
          code,
          ratepayerName: ratepayer.legalName || undefined,
          purpose: 'Sign-In',
          issuerName,
          log: app.log
        });
      }

      return {
        status: 'OTP_REQUIRED' as const,
        destination: maskPhone(destination),
        expiresInSeconds: OTP_TTL_MS / 1000,
        // Email OTPs land in a real, checkable inbox (Mailpit, http://localhost:8025), so
        // echoing the code back here would just mask whether email delivery actually works.
        // SMS has no provider wired up yet (Arkasel is stubbed) — until it is, this is the
        // only way to test that path.
        ...(usedChannel === 'SMS' ? { devOtpCode: code } : {})
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

      await recordActivity(app.prisma, {
        actorId: ratepayer.id,
        actorType: 'RATEPAYER',
        action: 'ratepayer.login',
        resourceId: ratepayer.id,
        metadata: { otpPurpose: otp.purpose }
      });

      return {
        accessToken,
        tokenType: 'Bearer' as const,
        expiresInSeconds: 7 * 24 * 60 * 60,
        ratepayer
      };
    },

    // Step 1 of password reset: same identifier lookup as login, but no password check —
    // that's the whole point — and a distinct OTP purpose (PASSWORD_RESET) so a leftover
    // login/registration code can never be replayed to reset a password, or vice versa.
    // Deliberately returns the same OTP_REQUIRED shape whether or not the identifier is
    // registered, so this endpoint can't be used to probe which phone numbers/emails have
    // an account — only an existing account actually gets an OTP generated and dispatched.
    async forgotPassword(input: ForgotPasswordInput) {
      const rawId = (input.identifier || input.email || input.phone || input.number || '').trim();
      if (!rawId) {
        throw new BadRequestError('Email address or phone number is required to reset your password.');
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

      const genericDestination = maskPhone(rawId);
      if (!ratepayer || ratepayer.status !== 'ACTIVE') {
        return {
          status: 'OTP_REQUIRED' as const,
          destination: genericDestination,
          expiresInSeconds: OTP_TTL_MS / 1000
        };
      }

      const code = generateOtpCode();
      await app.prisma.ratepayerOtp.create({
        data: {
          ratepayerId: ratepayer.id,
          purpose: 'PASSWORD_RESET',
          codeHash: hashOtpCode(code),
          expiresAt: new Date(Date.now() + OTP_TTL_MS)
        }
      });

      const preferEmail = rawId.includes('@') && Boolean(ratepayer.email);
      let destination = ratepayer.phone || ratepayer.email || 'user';
      let usedChannel: 'EMAIL' | 'SMS' | undefined;
      // White-label as the concession this ratepayer belongs to, never CROIP — see
      // lib/notification-dispatcher.ts.
      const issuerName = (await resolveConcessionName(app, ratepayer.concessionId)) ?? undefined;

      if (preferEmail || (!ratepayer.phone && ratepayer.email)) {
        destination = ratepayer.email!;
        usedChannel = 'EMAIL';
        await dispatchOtp({
          destination: ratepayer.email!,
          channel: 'EMAIL',
          code,
          ratepayerName: ratepayer.legalName || undefined,
          purpose: 'Password Reset',
          issuerName,
          log: app.log
        });
      } else if (ratepayer.phone) {
        destination = ratepayer.phone;
        usedChannel = 'SMS';
        await dispatchOtp({
          destination: ratepayer.phone,
          channel: 'SMS',
          code,
          ratepayerName: ratepayer.legalName || undefined,
          purpose: 'Password Reset',
          issuerName,
          log: app.log
        });
      }

      await recordActivity(app.prisma, {
        actorId: ratepayer.id,
        actorType: 'RATEPAYER',
        action: 'ratepayer.password_reset_requested',
        resourceId: ratepayer.id,
        metadata: {}
      });

      return {
        status: 'OTP_REQUIRED' as const,
        destination: maskPhone(destination),
        expiresInSeconds: OTP_TTL_MS / 1000,
        // Email OTPs land in a real, checkable inbox (Mailpit) — no need to echo the code
        // back. SMS has no provider wired up yet, so this is the only way to test that path
        // until it is.
        ...(usedChannel === 'SMS' ? { devOtpCode: code } : {})
      };
    },

    // Step 2 of password reset: confirm the PASSWORD_RESET OTP and set the new password.
    // Issues a fresh session token immediately — successfully completing this proves
    // ownership of the account just as surely as a normal login OTP does.
    async resetPassword(input: ResetPasswordInput) {
      const rawId = (input.identifier || input.email || input.phone || input.number || '').trim();
      if (!rawId) {
        throw new BadRequestError('Email address or phone number is required to reset your password.');
      }
      if (input.confirmNewPassword && input.newPassword !== input.confirmNewPassword) {
        throw new BadRequestError('Passwords do not match. Please verify and try again.');
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
          purpose: 'PASSWORD_RESET',
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

      const passwordHash = await hashPassword(input.newPassword);
      const updated = await app.prisma.$transaction(async (tx) => {
        await tx.ratepayerOtp.update({ where: { id: otp.id }, data: { consumedAt: new Date() } });
        const result = await tx.ratepayer.update({ where: { id: ratepayer.id }, data: { passwordHash } });
        await recordActivity(tx, {
          actorId: ratepayer.id,
          actorType: 'RATEPAYER',
          action: 'ratepayer.password_reset_completed',
          resourceId: ratepayer.id,
          metadata: {}
        });
        return result;
      });

      const accessToken = await issueRatepayerToken(
        {
          sub: updated.id,
          code: updated.code,
          phone: updated.phone || '',
          assemblyId: updated.assemblyId || '00000000-0000-0000-0000-000000000000',
          regionId: updated.regionId || '00000000-0000-0000-0000-000000000000',
          actorType: 'RATEPAYER'
        },
        app.config.RATEPAYER_JWT_SECRET
      );

      return {
        accessToken,
        tokenType: 'Bearer' as const,
        expiresInSeconds: 7 * 24 * 60 * 60,
        ratepayer: updated
      };
    },

    // Revokes just the one session token presented, not every token this ratepayer has —
    // "log out this device", not "log out everywhere". The row is kept only until the
    // token would have expired naturally anyway (claims.exp), so authenticateRatepayer's
    // revocation check never has to scan an unbounded, ever-growing table.
    async logout(claims: { sub: string; jti: string; exp: number }) {
      // Idempotent — a retried or double-fired logout request for an already-revoked jti
      // should still report success, not error.
      await app.prisma.ratepayerRevokedToken.upsert({
        where: { jti: claims.jti },
        create: {
          jti: claims.jti,
          ratepayerId: claims.sub,
          expiresAt: new Date(claims.exp * 1000)
        },
        update: {}
      });

      await recordActivity(app.prisma, {
        actorId: claims.sub,
        actorType: 'RATEPAYER',
        action: 'ratepayer.logout',
        resourceId: claims.sub,
        metadata: {}
      });

      return { success: true, message: 'Signed out successfully' };
    },

    async updateProfile(ratepayerId: string, input: UpdateProfileInput, requireConcessionId?: string, actor?: ActorInfo) {
      const ratepayer = await app.prisma.ratepayer.findFirst({
        where: {
          OR: [{ id: ratepayerId }, { code: ratepayerId }]
        }
      });
      if (!ratepayer) throw new NotFoundError('Ratepayer profile not found');
      if (requireConcessionId && ratepayer.concessionId !== requireConcessionId) {
        throw new ForbiddenError('Ratepayer was not registered by this concession');
      }

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

      let passwordHashUpdate: { passwordHash?: string } = {};
      if (input.password) {
        if (input.confirmPassword && input.password !== input.confirmPassword) {
          throw new BadRequestError('Passwords do not match. Please verify and try again.');
        }
        passwordHashUpdate = { passwordHash: await hashPassword(input.password) };
      }

      const updated = await app.prisma.ratepayer.update({
        where: { id: ratepayer.id },
        data: {
          ...namesUpdate,
          ...passwordHashUpdate,
          ...(input.ratepayerType !== undefined ? { ratepayerType: input.ratepayerType } : {}),
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

      await recordActivity(app.prisma, {
        actorId: actor?.id ?? ratepayer.id,
        actorType: actor?.type ?? 'RATEPAYER',
        action: 'ratepayer.profile_updated',
        resourceId: ratepayer.id,
        metadata: {
          via: actor?.type === 'SERVICE' ? 'concession' : actor?.type === 'USER' ? 'staff' : 'self-service',
          updatedFields: Object.keys(input)
        }
      });

      const { passwordHash: _passwordHash, ...safe } = updated;
      const completion = computeProfileCompletion(updated);
      return { ...safe, completion };
    },

    // Self-service entry point for PATCH /ratepayers/me. Takes the raw request body
    // (before it's narrowed to SelfUpdateProfileInput) specifically so it can check for
    // immutable fields the client might have sent and reject them with a clear error —
    // selfUpdateProfileBodySchema deliberately has no `additionalProperties: false`,
    // because Fastify's AJV defaults would silently strip those fields instead of
    // rejecting the request, which would let a caller believe an email or concession
    // change went through when it was quietly dropped.
    async updateOwnProfile(ratepayerId: string, rawInput: Record<string, unknown>) {
      const immutableKeys = ['email', 'concessionId', 'code', 'id', 'status', 'createdAt', 'updatedAt', 'passwordHash'];
      const attempted = immutableKeys.filter((key) => key in rawInput);
      if (attempted.length > 0) {
        throw new BadRequestError(
          `Cannot change ${attempted.join(', ')} through self-service profile update — your email, the concession you registered with, and other account/registration fields are immutable here.`
        );
      }
      return this.updateProfile(ratepayerId, rawInput as SelfUpdateProfileInput, undefined, { id: ratepayerId, type: 'RATEPAYER' });
    },

    async claimProperty(input: ClaimPropertyInput, actor?: ActorInfo) {
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

        await recordActivity(tx, {
          actorId: actor?.id ?? ratepayerUuid,
          actorType: actor?.type ?? 'RATEPAYER',
          action: 'ratepayer.property_claimed',
          resourceId: ratepayerUuid,
          metadata: { linkId: link.id, propertyId: link.propertyId, ownershipType: link.ownershipType }
        });

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
    async reviewVerification(input: ReviewVerificationInput, actor?: ActorInfo) {
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

        await recordActivity(tx, {
          actorId: actor?.id ?? 'staff',
          actorType: actor?.type ?? 'USER',
          action: 'ratepayer.kyc_reviewed',
          resourceId: input.ratepayerId,
          metadata: { verificationId: reviewed.id, provider: reviewed.provider, verificationStatus: reviewed.verificationStatus }
        });

        return reviewed;
      });
    },

    // KYC verification: Exactly 3 allowed providers (GHANA_CARD, PASSPORT, DRIVERS_LICENSE).
    // A ratepayer can only choose one provider.
    // Changing verification archives previous verifications to preserve the full audit trail.
    async verifyKyc(ratepayerId: string, input: { provider?: string; providerReference?: string; autoVerify?: boolean }, actor?: ActorInfo) {
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

        await recordActivity(tx, {
          actorId: actor?.id ?? ratepayer.id,
          actorType: actor?.type ?? 'RATEPAYER',
          action: 'ratepayer.kyc_submitted',
          resourceId: ratepayer.id,
          metadata: { provider: canonicalProvider, verificationStatus: verification.verificationStatus, autoVerified: isAuto }
        });

        return verification;
      });
    },

    // Deletes an individual ratepayer profile.
    // Business rule: you CANNOT delete a ratepayer who has linked properties.
    async deleteRatepayer(id: string, requireConcessionId?: string, actor?: ActorInfo) {
      const ratepayer = await app.prisma.ratepayer.findUnique({
        where: { id },
        include: { propertyLinks: true }
      });
      if (!ratepayer) throw new NotFoundError('Ratepayer profile not found');
      if (requireConcessionId && ratepayer.concessionId !== requireConcessionId) {
        throw new ForbiddenError('Ratepayer was not registered by this concession');
      }

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

        await recordActivity(tx, {
          actorId: actor?.id ?? (requireConcessionId ?? 'staff'),
          actorType: actor?.type ?? (requireConcessionId ? 'SERVICE' : 'USER'),
          action: 'ratepayer.deleted',
          resourceId: id,
          metadata: { code: ratepayer.code }
        });

        return { success: true, message: `Ratepayer ${ratepayer.code} deleted successfully` };
      });
    },

    // Severs a single property link for a ratepayer.
    async severPropertyLink(ratepayerId: string, propertyId: string, actor?: ActorInfo) {
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

        await recordActivity(tx, {
          actorId: actor?.id ?? ratepayerId,
          actorType: actor?.type ?? 'RATEPAYER',
          action: 'ratepayer.property_link_severed',
          resourceId: ratepayerId,
          metadata: { linkId: link.id, propertyId }
        });

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

    async updateStatus(id: string, status: string, actor?: ActorInfo) {
      const ratepayer = await app.prisma.ratepayer.findUnique({ where: { id } });
      if (!ratepayer) throw new NotFoundError('Ratepayer profile not found');

      const updated = await app.prisma.ratepayer.update({
        where: { id },
        data: { status }
      });

      await recordActivity(app.prisma, {
        actorId: actor?.id ?? 'staff',
        actorType: actor?.type ?? 'USER',
        action: 'ratepayer.status_changed',
        resourceId: id,
        metadata: { from: ratepayer.status, to: status }
      });

      return updated;
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
