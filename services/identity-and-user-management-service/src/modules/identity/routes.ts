import type { FastifyPluginAsync } from 'fastify';
import {
  RegisterRatepayerSchema,
  RatepayerLoginStep1Schema,
  RatepayerVerifyOtpSchema,
  StaffLoginSchema,
  OnboardStaffSchema,
  UpdateUserStatusSchema,
  AssignRoleSchema,
  calculateRatepayerCompletion
} from './schemas.js';
import {
  hashPassword,
  verifyPassword,
  generateOtp,
  hashOtp,
  generateSessionToken
} from './auth-utils.js';
import { BadRequestError, UnauthorizedError, NotFoundError, ConflictError } from '../../lib/errors.js';
import { appendOutboxEvent } from '../../events/outbox.js';
import { domainEvent } from '../../events/envelope.js';

export const identityRoutes: FastifyPluginAsync = async (app) => {
  // =========================================================================
  // 1. RATEPAYER SECTION (Citizen Identity & Self-Service)
  // =========================================================================

  app.post('/ratepayers/register', {
    config: { public: true },
    schema: {
      tags: ['Ratepayer'],
      summary: 'Register Ratepayer Account',
      description: 'Creates a new citizen ratepayer account with matching password & confirmation, requiring either phone or email.',
      body: {
        type: 'object',
        required: ['firstName', 'lastName', 'password', 'confirmPassword'],
        properties: {
          firstName: { type: 'string', minLength: 2, example: 'Kwame' },
          lastName: { type: 'string', minLength: 2, example: 'Mensah' },
          phone: { type: 'string', minLength: 9, example: '233241234567' },
          email: { type: 'string', format: 'email', example: 'kwame.mensah@example.com' },
          password: { type: 'string', minLength: 8, example: 'Password123!' },
          confirmPassword: { type: 'string', minLength: 8, example: 'Password123!' },
          preferredChannels: {
            type: 'array',
            items: { type: 'string' },
            default: ['SMS'],
            example: ['SMS']
          }
        }
      },
      response: {
        201: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            data: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                phone: { type: 'string', nullable: true },
                email: { type: 'string', nullable: true },
                firstName: { type: 'string', nullable: true },
                lastName: { type: 'string', nullable: true },
                fullName: { type: 'string' },
                accountType: { type: 'string' },
                status: { type: 'string' },
                completion: {
                  type: 'object',
                  properties: {
                    percentage: { type: 'number' },
                    kycLevel: { type: 'string' },
                    isComplete: { type: 'boolean' },
                    checklist: {
                      type: 'object',
                      properties: {
                        phoneProvided: { type: 'boolean' },
                        emailProvided: { type: 'boolean' },
                        nameProvided: { type: 'boolean' },
                        ghanaCardProvided: { type: 'boolean' },
                        digitalAddressProvided: { type: 'boolean' },
                        tinProvided: { type: 'boolean' }
                      }
                    },
                    missingFields: { type: 'array', items: { type: 'string' } },
                    nextSteps: { type: 'array', items: { type: 'string' } }
                  }
                }
              }
            }
          }
        }
      }
    }
  }, async (request, reply) => {
    const parseResult = RegisterRatepayerSchema.safeParse(request.body);
    if (!parseResult.success) {
      throw new BadRequestError('Validation failed', parseResult.error.format());
    }
    const data = parseResult.data;

    const existing = await app.prisma.user.findFirst({
      where: {
        OR: [
          ...(data.phone ? [{ phone: data.phone }] : []),
          ...(data.email ? [{ email: data.email }] : [])
        ]
      }
    });
    if (existing) {
      throw new ConflictError('A ratepayer with this phone number or email already exists');
    }

    const passwordHash = hashPassword(data.password);
    const fullName = `${data.firstName} ${data.lastName}`.trim();

    const user = await app.prisma.$transaction(async (tx) => {
      const newUser = await tx.user.create({
        data: {
          email: data.email ?? null,
          phone: data.phone ?? null,
          accountType: 'RATEPAYER',
          status: 'ACTIVE',
          credential: {
            create: { passwordHash }
          },
          ratepayerProfile: {
            create: {
              firstName: data.firstName,
              lastName: data.lastName,
              fullName,
              preferredChannels: data.preferredChannels ?? ['SMS'],
              kycStatus: 'TIER_1_UNVERIFIED'
            }
          }
        },
        include: { ratepayerProfile: true }
      });

      const ratepayerRole = await tx.role.findUnique({
        where: { code: 'RATEPAYER' }
      });

      if (ratepayerRole) {
        await tx.userRoleAssignment.create({
          data: {
            userId: newUser.id,
            roleId: ratepayerRole.id
          }
        });
      }

      await appendOutboxEvent(
        tx,
        'identity.ratepayer.registered.v1',
        domainEvent({
          eventType: 'identity.ratepayer.registered.v1',
          eventVersion: 1,
          producer: app.serviceInfo.name,
          aggregateType: 'Ratepayer',
          aggregateId: newUser.id,
          aggregateVersion: 1,
          concessionId: '00000000-0000-0000-0000-000000000000',
          assemblyId: '00000000-0000-0000-0000-000000000000',
          correlationId: request.id,
          data: {
            userId: newUser.id,
            fullName,
            phone: data.phone ?? null,
            email: data.email ?? null
          }
        })
      );

      return newUser;
    });

    const completion = calculateRatepayerCompletion({
      firstName: data.firstName,
      lastName: data.lastName,
      fullName,
      phone: user.phone,
      email: user.email,
      kycStatus: user.ratepayerProfile?.kycStatus
    });

    return reply.code(201).send({
      success: true,
      data: {
        id: user.id,
        phone: user.phone,
        email: user.email,
        firstName: user.ratepayerProfile?.firstName,
        lastName: user.ratepayerProfile?.lastName,
        fullName: user.ratepayerProfile?.fullName,
        accountType: user.accountType,
        status: user.status,
        completion
      }
    });
  });

  app.post('/ratepayers/login', {
    config: { public: true },
    schema: {
      tags: ['Ratepayer'],
      summary: 'Ratepayer Login (Step 1: Password)',
      description: 'Step 1 of Ratepayer login: Verifies password and triggers 6-digit OTP issuance.',
      body: {
        type: 'object',
        required: ['phone', 'password'],
        properties: {
          phone: { type: 'string', example: '233241234567' },
          password: { type: 'string', example: 'Password123!' }
        }
      },
      response: {
        200: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            message: { type: 'string' },
            data: {
              type: 'object',
              properties: {
                phone: { type: 'string' },
                expiresInSeconds: { type: 'number' },
                devOtp: { type: 'string' }
              }
            }
          }
        }
      }
    }
  }, async (request, reply) => {
    const parseResult = RatepayerLoginStep1Schema.safeParse(request.body);
    if (!parseResult.success) {
      throw new BadRequestError('Phone and password are required');
    }
    const data = parseResult.data;
    const identifier = (data.identifier || data.phone || data.email)!;

    const user = await app.prisma.user.findFirst({
      where: {
        accountType: 'RATEPAYER',
        OR: [
          { phone: identifier },
          { email: identifier }
        ]
      },
      include: { credential: true, ratepayerProfile: true }
    });

    if (!user || !user.credential || !verifyPassword(data.password, user.credential.passwordHash)) {
      throw new UnauthorizedError('Invalid phone number or password');
    }

    if (user.status !== 'ACTIVE') {
      throw new UnauthorizedError('Account is not active');
    }

    const otp = generateOtp();
    const otpHashValue = hashOtp(otp);
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
    const destination = user.phone || user.email || identifier;

    await app.prisma.$transaction(async (tx) => {
      await tx.otpVerification.create({
        data: {
          phone: destination!,
          otpHash: otpHashValue,
          expiresAt
        }
      });

      await appendOutboxEvent(
        tx,
        'identity.otp.dispatched.v1',
        domainEvent({
          eventType: 'identity.otp.dispatched.v1',
          eventVersion: 1,
          producer: app.serviceInfo.name,
          aggregateType: 'OtpVerification',
          aggregateId: destination!,
          aggregateVersion: 1,
          concessionId: '00000000-0000-0000-0000-000000000000',
          assemblyId: '00000000-0000-0000-0000-000000000000',
          correlationId: request.id,
          data: { destination, otp, expiresAt: expiresAt.toISOString() }
        })
      );
    });

    return reply.send({
      success: true,
      message: 'OTP dispatched successfully',
      data: {
        destination,
        phone: user.phone,
        email: user.email,
        expiresInSeconds: 600,
        devOtp: otp
      }
    });
  });

  app.post('/ratepayers/verify-otp', {
    config: { public: true },
    schema: {
      tags: ['Ratepayer'],
      summary: 'Ratepayer Login (Step 2: Verify OTP)',
      description: 'Step 2 of Ratepayer login: Validates 6-digit OTP and issues authenticated session token.',
      body: {
        type: 'object',
        required: ['otp'],
        properties: {
          phone: { type: 'string', example: '233241234567' },
          identifier: { type: 'string', example: '233241234567' },
          otp: { type: 'string', example: '123456' }
        }
      },
      response: {
        200: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            data: {
              type: 'object',
              properties: {
                token: { type: 'string' },
                expiresAt: { type: 'string' },
                user: {
                  type: 'object',
                  properties: {
                    id: { type: 'string' },
                    phone: { type: 'string', nullable: true },
                    email: { type: 'string', nullable: true },
                    accountType: { type: 'string' },
                    fullName: { type: 'string' }
                  }
                },
                completion: {
                  type: 'object',
                  properties: {
                    percentage: { type: 'number' },
                    kycLevel: { type: 'string' },
                    isComplete: { type: 'boolean' }
                  }
                }
              }
            }
          }
        }
      }
    }
  }, async (request, reply) => {
    const parseResult = RatepayerVerifyOtpSchema.safeParse(request.body);
    if (!parseResult.success) {
      throw new BadRequestError('Identifier and 6-digit OTP are required');
    }
    const data = parseResult.data;
    const identifier = (data.identifier || data.phone)!;

    const user = await app.prisma.user.findFirst({
      where: {
        accountType: 'RATEPAYER',
        OR: [
          { phone: identifier },
          { email: identifier }
        ]
      },
      include: { ratepayerProfile: true }
    });

    if (!user) {
      throw new NotFoundError('Ratepayer user not found');
    }

    const destination = (user.phone || user.email || identifier)!;

    const otpRecord = await app.prisma.otpVerification.findFirst({
      where: {
        phone: destination,
        verifiedAt: null,
        expiresAt: { gt: new Date() }
      },
      orderBy: { createdAt: 'desc' }
    });

    if (!otpRecord) {
      throw new UnauthorizedError('OTP is invalid or has expired');
    }

    const candidateHash = hashOtp(data.otp);
    if (candidateHash !== otpRecord.otpHash) {
      await app.prisma.otpVerification.update({
        where: { id: otpRecord.id },
        data: { attempts: { increment: 1 } }
      });
      throw new UnauthorizedError('Incorrect verification code');
    }

    const token = generateSessionToken();
    const tokenHash = hashOtp(token);
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

    await app.prisma.$transaction(async (tx) => {
      await tx.otpVerification.update({
        where: { id: otpRecord.id },
        data: { verifiedAt: new Date() }
      });

      await tx.userSession.create({
        data: {
          userId: user.id,
          tokenHash,
          expiresAt
        }
      });
    });

    const completion = calculateRatepayerCompletion({
      firstName: user.ratepayerProfile?.firstName,
      lastName: user.ratepayerProfile?.lastName,
      fullName: user.ratepayerProfile?.fullName,
      phone: user.phone,
      email: user.email,
      ghanaCardNumber: user.ratepayerProfile?.ghanaCardNumber,
      digitalAddress: user.ratepayerProfile?.digitalAddress,
      tin: user.ratepayerProfile?.tin,
      kycStatus: user.ratepayerProfile?.kycStatus
    });

    return reply.send({
      success: true,
      data: {
        token,
        expiresAt: expiresAt.toISOString(),
        user: {
          id: user.id,
          phone: user.phone,
          email: user.email,
          accountType: user.accountType,
          fullName: user.ratepayerProfile?.fullName ?? ""
        },
        completion
      }
    });
  });

  app.get('/ratepayers', {
    preHandler: [app.authenticate],
    schema: {
      tags: ['Ratepayer'],
      security: [{ bearerAuth: [] }],
      summary: 'List Ratepayers',
      description: 'Returns a paginated list of all registered citizens / ratepayers.',
      querystring: {
        type: 'object',
        properties: {
          limit: { type: 'number', default: 20, example: 20 },
          offset: { type: 'number', default: 0, example: 0 }
        }
      }
    }
  }, async (request, reply) => {
    const query = request.query as { limit?: string; offset?: string };
    const limit = Math.min(Math.max(Number(query.limit ?? 20), 1), 100);
    const offset = Math.max(Number(query.offset ?? 0), 0);

    const [ratepayers, total] = await Promise.all([
      app.prisma.user.findMany({
        where: { accountType: 'RATEPAYER' },
        take: limit,
        skip: offset,
        include: { ratepayerProfile: true },
        orderBy: { createdAt: 'desc' }
      }),
      app.prisma.user.count({ where: { accountType: 'RATEPAYER' } })
    ]);

    return reply.send({
      success: true,
      data: ratepayers.map((r) => ({
        id: r.id,
        phone: r.phone,
        email: r.email,
        fullName: r.ratepayerProfile?.fullName,
        tin: r.ratepayerProfile?.tin,
        ghanaCardNumber: r.ratepayerProfile?.ghanaCardNumber,
        preferredChannels: r.ratepayerProfile?.preferredChannels,
        status: r.status,
        createdAt: r.createdAt
      })),
      pagination: { total, limit, offset }
    });
  });

  app.patch('/ratepayers/profile', {
    preHandler: [app.authenticate],
    schema: {
      tags: ['Ratepayer'],
      security: [{ bearerAuth: [] }],
      summary: 'Update Ratepayer Profile (Progressive KYC)',
      description: 'Allows an authenticated ratepayer to enrich their profile with Ghana Card, digital address, or TIN, increasing their profile completion percentage.',
      body: {
        type: 'object',
        properties: {
          ghanaCardNumber: { type: 'string', example: 'GHA-123456789-0' },
          digitalAddress: { type: 'string', example: 'AK-039-5028' },
          tin: { type: 'string', example: 'P0012345678' },
          preferredChannels: { type: 'array', items: { type: 'string' } }
        }
      }
    }
  }, async (request, reply) => {
    const callerId = request.auth?.subject;
    const user = await app.prisma.user.findFirst({
      where: {
        OR: [{ id: callerId }, { email: callerId }, { phone: callerId }]
      },
      include: { ratepayerProfile: true }
    });

    if (!user || user.accountType !== 'RATEPAYER' || !user.ratepayerProfile) {
      throw new BadRequestError('Only registered ratepayers can update citizen profiles');
    }

    const body = request.body as Record<string, any>;
    const updatedProfile = await app.prisma.ratepayerProfile.update({
      where: { id: user.ratepayerProfile.id },
      data: {
        ...(body.ghanaCardNumber ? { ghanaCardNumber: body.ghanaCardNumber } : {}),
        ...(body.digitalAddress ? { digitalAddress: body.digitalAddress } : {}),
        ...(body.tin ? { tin: body.tin } : {}),
        ...(body.preferredChannels ? { preferredChannels: body.preferredChannels } : {})
      }
    });

    const completion = calculateRatepayerCompletion({
      firstName: updatedProfile.firstName,
      lastName: updatedProfile.lastName,
      fullName: updatedProfile.fullName,
      phone: user.phone,
      email: user.email,
      ghanaCardNumber: updatedProfile.ghanaCardNumber,
      digitalAddress: updatedProfile.digitalAddress,
      tin: updatedProfile.tin,
      kycStatus: updatedProfile.kycStatus
    });

    return reply.send({
      success: true,
      message: 'Profile updated successfully',
      data: {
        profile: updatedProfile,
        completion
      }
    });
  });

  // =========================================================================
  // 2. STAFF & GOVERNMENT OVERSIGHT SECTION
  // =========================================================================

  app.post('/staff/login', {
    config: { public: true },
    schema: {
      tags: ['Staff & Government Oversight'],
      summary: 'Staff Member Login',
      description: 'Direct password login for government oversight, MMDA officers, verifiers, and admin staff.',
      body: {
        type: 'object',
        required: ['identifier', 'password'],
        properties: {
          identifier: { type: 'string', example: 'admin@croip.gov.gh' },
          password: { type: 'string', example: 'AdminPassword123!' }
        }
      },
      response: {
        200: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            data: {
              type: 'object',
              properties: {
                token: { type: 'string' },
                expiresAt: { type: 'string' },
                user: {
                  type: 'object',
                  properties: {
                    id: { type: 'string' },
                    email: { type: 'string' },
                    fullName: { type: 'string' },
                    department: { type: 'string' },
                    roles: { type: 'array', items: { type: 'object' } }
                  }
                }
              }
            }
          }
        }
      }
    }
  }, async (request, reply) => {
    const parseResult = StaffLoginSchema.safeParse(request.body);
    if (!parseResult.success) {
      throw new BadRequestError('Identifier and password required');
    }
    const { identifier, password } = parseResult.data;

    const user = await app.prisma.user.findFirst({
      where: {
        accountType: 'STAFF',
        OR: [{ email: identifier }, { phone: identifier }]
      },
      include: {
        credential: true,
        staffProfile: true,
        roleAssignments: { include: { role: true } }
      }
    });

    if (!user || !user.credential || !verifyPassword(password, user.credential.passwordHash)) {
      throw new UnauthorizedError('Invalid credentials');
    }

    if (user.status !== 'ACTIVE') {
      throw new UnauthorizedError('Staff account is not active');
    }

    const token = generateSessionToken();
    const tokenHash = hashOtp(token);
    const expiresAt = new Date(Date.now() + 12 * 60 * 60 * 1000);

    await app.prisma.userSession.create({
      data: {
        userId: user.id,
        tokenHash,
        expiresAt
      }
    });

    return reply.send({
      success: true,
      data: {
        token,
        expiresAt: expiresAt.toISOString(),
        user: {
          id: user.id,
          email: user.email,
          fullName: user.staffProfile?.fullName,
          department: user.staffProfile?.department,
          roles: user.roleAssignments.map((ra) => ({
            code: ra.role.code,
            name: ra.role.name,
            concessionId: ra.concessionId,
            assemblyId: ra.assemblyId
          }))
        }
      }
    });
  });

  app.post('/staff/onboard', {
    preHandler: [app.authenticate],
    schema: {
      tags: ['Staff & Government Oversight'],
      security: [{ bearerAuth: [] }],
      summary: 'Onboard Staff Member (Admin)',
      description: 'Onboards a new government or concession oversight staff member with scoped roles.',
      body: {
        type: 'object',
        required: ['fullName', 'email', 'phone', 'password', 'roleCode'],
        properties: {
          fullName: { type: 'string', example: 'Esi Nyarko' },
          email: { type: 'string', format: 'email', example: 'esi.nyarko@croip.gov.gh' },
          phone: { type: 'string', example: '233209876543' },
          password: { type: 'string', minLength: 8, example: 'TempPassword123!' },
          department: { type: 'string', example: 'Finance & Reconciliation' },
          staffIdNumber: { type: 'string', example: 'STAFF-ACC-0042' },
          roleCode: { type: 'string', example: 'RATE_CARD_VERIFIER' },
          concessionId: { type: 'string', format: 'uuid' },
          assemblyId: { type: 'string', format: 'uuid' }
        }
      }
    }
  }, async (request, reply) => {
    const parseResult = OnboardStaffSchema.safeParse(request.body);
    if (!parseResult.success) {
      throw new BadRequestError('Validation failed', parseResult.error.format());
    }
    const data = parseResult.data;

    const existing = await app.prisma.user.findFirst({
      where: {
        OR: [{ email: data.email }, { phone: data.phone }]
      }
    });
    if (existing) {
      throw new ConflictError('A staff member with this email or phone already exists');
    }

    const role = await app.prisma.role.findUnique({
      where: { code: data.roleCode }
    });
    if (!role) {
      throw new NotFoundError(`Role '${data.roleCode}' does not exist`);
    }

    const passwordHash = hashPassword(data.password);

    const newUser = await app.prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email: data.email,
          phone: data.phone,
          accountType: 'STAFF',
          status: 'ACTIVE',
          credential: {
            create: { passwordHash }
          },
          staffProfile: {
            create: {
              fullName: data.fullName,
              department: data.department ?? null,
              staffIdNumber: data.staffIdNumber ?? null
            }
          },
          roleAssignments: {
            create: {
              roleId: role.id,
              concessionId: data.concessionId ?? null,
              assemblyId: data.assemblyId ?? null
            }
          }
        },
        include: { staffProfile: true, roleAssignments: { include: { role: true } } }
      });

      await appendOutboxEvent(
        tx,
        'identity.staff.onboarded.v1',
        domainEvent({
          eventType: 'identity.staff.onboarded.v1',
          eventVersion: 1,
          producer: app.serviceInfo.name,
          aggregateType: 'Staff',
          aggregateId: user.id,
          aggregateVersion: 1,
          concessionId: data.concessionId ?? '00000000-0000-0000-0000-000000000000',
          assemblyId: data.assemblyId ?? '00000000-0000-0000-0000-000000000000',
          correlationId: request.id,
          data: {
            userId: user.id,
            email: user.email,
            fullName: data.fullName,
            roleCode: data.roleCode,
            concessionId: data.concessionId,
            assemblyId: data.assemblyId
          }
        })
      );

      return user;
    });

    return reply.code(201).send({
      success: true,
      data: {
        id: newUser.id,
        email: newUser.email,
        phone: newUser.phone,
        fullName: newUser.staffProfile?.fullName,
        department: newUser.staffProfile?.department,
        roles: newUser.roleAssignments.map((ra) => ({
          code: ra.role.code,
          name: ra.role.name,
          concessionId: ra.concessionId,
          assemblyId: ra.assemblyId
        }))
      }
    });
  });

  app.get('/staff', {
    preHandler: [app.authenticate],
    schema: {
      tags: ['Staff & Government Oversight'],
      security: [{ bearerAuth: [] }],
      summary: 'List Staff Members',
      description: 'Returns a paginated list of all staff members and their scoped assignments.',
      querystring: {
        type: 'object',
        properties: {
          limit: { type: 'number', default: 20, example: 20 },
          offset: { type: 'number', default: 0, example: 0 }
        }
      }
    }
  }, async (request, reply) => {
    const query = request.query as { limit?: string; offset?: string };
    const limit = Math.min(Math.max(Number(query.limit ?? 20), 1), 100);
    const offset = Math.max(Number(query.offset ?? 0), 0);

    const [staff, total] = await Promise.all([
      app.prisma.user.findMany({
        where: { accountType: 'STAFF' },
        take: limit,
        skip: offset,
        include: {
          staffProfile: true,
          roleAssignments: { include: { role: true } }
        },
        orderBy: { createdAt: 'desc' }
      }),
      app.prisma.user.count({ where: { accountType: 'STAFF' } })
    ]);

    return reply.send({
      success: true,
      data: staff.map((s) => ({
        id: s.id,
        email: s.email,
        phone: s.phone,
        fullName: s.staffProfile?.fullName,
        department: s.staffProfile?.department,
        staffIdNumber: s.staffProfile?.staffIdNumber,
        status: s.status,
        roles: s.roleAssignments.map((ra) => ({
          code: ra.role.code,
          name: ra.role.name,
          concessionId: ra.concessionId,
          assemblyId: ra.assemblyId
        })),
        createdAt: s.createdAt
      })),
      pagination: { total, limit, offset }
    });
  });

  // =========================================================================
  // 3. ACCESS CONTROL & RBAC SECTION
  // =========================================================================

  app.get('/users', {
    preHandler: [app.authenticate],
    schema: {
      tags: ['Access Control & RBAC'],
      security: [{ bearerAuth: [] }],
      summary: 'List All Platform Users',
      description: 'Query users segregated by account type (RATEPAYER or STAFF) with pagination.',
      querystring: {
        type: 'object',
        properties: {
          accountType: {
            type: 'string',
            enum: ['RATEPAYER', 'STAFF'],
            description: 'Filter users by type'
          },
          status: {
            type: 'string',
            enum: ['ACTIVE', 'SUSPENDED', 'PENDING'],
            description: 'Filter by account status'
          },
          limit: { type: 'number', default: 20, example: 20 },
          offset: { type: 'number', default: 0, example: 0 }
        }
      }
    }
  }, async (request, reply) => {
    const query = request.query as { limit?: string; offset?: string; accountType?: string; status?: string };
    const limit = Math.min(Math.max(Number(query.limit ?? 20), 1), 100);
    const offset = Math.max(Number(query.offset ?? 0), 0);

    const where = {
      ...(query.accountType ? { accountType: query.accountType as any } : {}),
      ...(query.status ? { status: query.status as any } : {})
    };

    const [users, total] = await Promise.all([
      app.prisma.user.findMany({
        where,
        take: limit,
        skip: offset,
        include: {
          ratepayerProfile: true,
          staffProfile: true,
          roleAssignments: { include: { role: true } }
        },
        orderBy: { createdAt: 'desc' }
      }),
      app.prisma.user.count({ where })
    ]);

    return reply.send({
      success: true,
      data: users.map((u) => ({
        id: u.id,
        email: u.email,
        phone: u.phone,
        accountType: u.accountType,
        status: u.status,
        fullName: u.ratepayerProfile?.fullName ?? u.staffProfile?.fullName,
        roles: u.roleAssignments.map((ra) => ra.role.code),
        createdAt: u.createdAt
      })),
      pagination: { total, limit, offset }
    });
  });

  app.patch('/users/:id/status', {
    preHandler: [app.authenticate],
    schema: {
      tags: ['Access Control & RBAC'],
      security: [{ bearerAuth: [] }],
      summary: 'Update User Account Status',
      description: 'Activate, suspend, or pend any platform account.',
      params: {
        type: 'object',
        required: ['id'],
        properties: { id: { type: 'string', format: 'uuid' } }
      },
      body: {
        type: 'object',
        required: ['status'],
        properties: {
          status: { type: 'string', enum: ['ACTIVE', 'SUSPENDED', 'PENDING'], example: 'SUSPENDED' }
        }
      }
    }
  }, async (request, reply) => {
    const params = request.params as { id: string };
    const parseResult = UpdateUserStatusSchema.safeParse(request.body);
    if (!parseResult.success) {
      throw new BadRequestError('Valid status is required');
    }

    const user = await app.prisma.user.findUnique({
      where: { id: params.id }
    });
    if (!user) {
      throw new NotFoundError('User not found');
    }

    const updated = await app.prisma.user.update({
      where: { id: params.id },
      data: { status: parseResult.data.status }
    });

    return reply.send({
      success: true,
      data: { id: updated.id, status: updated.status }
    });
  });

  app.post('/users/:id/roles', {
    preHandler: [app.authenticate],
    schema: {
      tags: ['Access Control & RBAC'],
      security: [{ bearerAuth: [] }],
      summary: 'Assign Scoped Role to User',
      description: 'Grants a role to a user scoped to an optional concession and district assembly.',
      params: {
        type: 'object',
        required: ['id'],
        properties: { id: { type: 'string', format: 'uuid' } }
      },
      body: {
        type: 'object',
        required: ['roleCode'],
        properties: {
          roleCode: { type: 'string', example: 'RATE_CARD_VERIFIER' },
          concessionId: { type: 'string', format: 'uuid' },
          assemblyId: { type: 'string', format: 'uuid' }
        }
      }
    }
  }, async (request, reply) => {
    const params = request.params as { id: string };
    const parseResult = AssignRoleSchema.safeParse(request.body);
    if (!parseResult.success) {
      throw new BadRequestError('Valid roleCode is required');
    }
    const { roleCode, concessionId, assemblyId } = parseResult.data;

    const [user, role] = await Promise.all([
      app.prisma.user.findUnique({ where: { id: params.id } }),
      app.prisma.role.findUnique({ where: { code: roleCode } })
    ]);

    if (!user) throw new NotFoundError('User not found');
    if (!role) throw new NotFoundError(`Role '${roleCode}' not found`);

    const assignment = await app.prisma.userRoleAssignment.create({
      data: {
        userId: user.id,
        roleId: role.id,
        concessionId: concessionId ?? null,
        assemblyId: assemblyId ?? null
      },
      include: { role: true }
    });

    return reply.code(201).send({
      success: true,
      data: {
        assignmentId: assignment.id,
        userId: user.id,
        roleCode: assignment.role.code,
        concessionId: assignment.concessionId,
        assemblyId: assignment.assemblyId
      }
    });
  });

  app.get('/users/:id', {
    preHandler: [app.authenticate],
    schema: {
      tags: ['Access Control & RBAC'],
      security: [{ bearerAuth: [] }],
      summary: 'Get User By ID',
      description: 'Fetches details of a specific user including their profile and role assignments.',
      params: {
        type: 'object',
        required: ['id'],
        properties: { id: { type: 'string', format: 'uuid' } }
      }
    }
  }, async (request, reply) => {
    const { id } = request.params as { id: string };
    const user = await app.prisma.user.findUnique({
      where: { id },
      include: {
        ratepayerProfile: true,
        staffProfile: true,
        roleAssignments: { include: { role: true } }
      }
    });

    if (!user) {
      throw new NotFoundError('User not found');
    }

    let completion = undefined;
    if (user.accountType === 'RATEPAYER' && user.ratepayerProfile) {
      completion = calculateRatepayerCompletion({
        firstName: user.ratepayerProfile.firstName,
        lastName: user.ratepayerProfile.lastName,
        fullName: user.ratepayerProfile.fullName,
        phone: user.phone,
        email: user.email,
        ghanaCardNumber: user.ratepayerProfile.ghanaCardNumber,
        digitalAddress: user.ratepayerProfile.digitalAddress,
        tin: user.ratepayerProfile.tin,
        kycStatus: user.ratepayerProfile.kycStatus
      });
    }

    return reply.send({
      success: true,
      data: {
        id: user.id,
        email: user.email,
        phone: user.phone,
        accountType: user.accountType,
        status: user.status,
        fullName: user.ratepayerProfile?.fullName ?? user.staffProfile?.fullName,
        ratepayerProfile: user.ratepayerProfile,
        staffProfile: user.staffProfile,
        roles: user.roleAssignments.map((ra) => ({
          roleId: ra.roleId,
          code: ra.role.code,
          name: ra.role.name,
          concessionId: ra.concessionId,
          assemblyId: ra.assemblyId
        })),
        createdAt: user.createdAt,
        ...(completion ? { completion } : {})
      }
    });
  });

  app.delete('/users/:id/roles/:roleId', {
    preHandler: [app.authenticate],
    schema: {
      tags: ['Access Control & RBAC'],
      security: [{ bearerAuth: [] }],
      summary: 'Revoke Scoped Role from User',
      description: 'Removes a role assignment from a specific user.',
      params: {
        type: 'object',
        required: ['id', 'roleId'],
        properties: {
          id: { type: 'string', format: 'uuid' },
          roleId: { type: 'string', format: 'uuid' }
        }
      }
    }
  }, async (request, reply) => {
    const { id, roleId } = request.params as { id: string; roleId: string };
    const assignment = await app.prisma.userRoleAssignment.findFirst({
      where: {
        userId: id,
        OR: [
          { roleId },
          { role: { code: roleId } }
        ]
      }
    });

    if (!assignment) {
      throw new NotFoundError('Role assignment not found for this user');
    }

    await app.prisma.userRoleAssignment.delete({
      where: { id: assignment.id }
    });

    return reply.send({
      success: true,
      message: 'Role assignment revoked successfully'
    });
  });

  app.get('/roles', {
    preHandler: [app.authenticate],
    schema: {
      tags: ['Access Control & RBAC'],
      security: [{ bearerAuth: [] }],
      summary: 'List All Roles',
      description: 'Returns the catalog of all system roles and their assigned permissions.'
    }
  }, async (_request, reply) => {
    const roles = await app.prisma.role.findMany({
      include: { permissions: { include: { permission: true } } },
      orderBy: { code: 'asc' }
    });

    return reply.send({
      success: true,
      data: roles.map((r) => ({
        id: r.id,
        code: r.code,
        name: r.name,
        description: r.description,
        permissions: r.permissions.map((p) => p.permission.code)
      }))
    });
  });

  app.get('/permissions', {
    preHandler: [app.authenticate],
    schema: {
      tags: ['Access Control & RBAC'],
      security: [{ bearerAuth: [] }],
      summary: 'List All Permissions',
      description: 'Returns the complete catalog of atomic platform permissions.'
    }
  }, async (_request, reply) => {
    const permissions = await app.prisma.permission.findMany({
      orderBy: { code: 'asc' }
    });

    return reply.send({
      success: true,
      data: permissions
    });
  });

  // =========================================================================
  // 4. SESSION & PROFILE INTROSPECTION
  // =========================================================================

  app.get('/auth/me', {
    preHandler: [app.authenticate],
    schema: {
      tags: ['Session & Profile'],
      security: [{ bearerAuth: [] }],
      summary: 'Active Session Profile',
      description: 'Returns profile details and active permissions for the currently authenticated caller.'
    }
  }, async (request, reply) => {
    const callerId = request.auth?.subject;
    if (!callerId) {
      throw new UnauthorizedError('Authentication token or caller context required');
    }

    const user = await app.prisma.user.findFirst({
      where: {
        OR: [
          { id: callerId },
          { email: callerId },
          { phone: callerId }
        ]
      },
      include: {
        ratepayerProfile: true,
        staffProfile: true,
        roleAssignments: { include: { role: true } }
      }
    });

    if (!user) {
      throw new NotFoundError('User profile not found');
    }

    let completion = undefined;
    if (user.accountType === 'RATEPAYER' && user.ratepayerProfile) {
      completion = calculateRatepayerCompletion({
        firstName: user.ratepayerProfile.firstName,
        lastName: user.ratepayerProfile.lastName,
        fullName: user.ratepayerProfile.fullName,
        phone: user.phone,
        email: user.email,
        ghanaCardNumber: user.ratepayerProfile.ghanaCardNumber,
        digitalAddress: user.ratepayerProfile.digitalAddress,
        tin: user.ratepayerProfile.tin,
        kycStatus: user.ratepayerProfile.kycStatus
      });
    }

    return reply.send({
      success: true,
      data: {
        id: user.id,
        email: user.email,
        phone: user.phone,
        accountType: user.accountType,
        status: user.status,
        ratepayerProfile: user.ratepayerProfile,
        staffProfile: user.staffProfile,
        roles: user.roleAssignments.map((ra) => ({
          roleId: ra.roleId,
          code: ra.role.code,
          name: ra.role.name,
          concessionId: ra.concessionId,
          assemblyId: ra.assemblyId
        })),
        ...(completion ? { completion } : {})
      }
    });
  });
};
