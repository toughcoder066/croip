import type { FastifyPluginAsync } from 'fastify';
import crypto from 'node:crypto';
import { z } from 'zod';
import {
  RegisterPropertyInputSchema,
  ClaimPropertyUnitInputSchema,
  BuildingStatusEnum,
  type RegisterPropertyInput,
  type ClaimPropertyUnitInput
} from '@croip/contracts';
import type { Prisma } from '../../generated/prisma-client/index.js';
import { BadRequestError, NotFoundError, ConflictError, ForbiddenError, UnauthorizedError } from '../../lib/errors.js';
import {
  RegisterPropertyBodySchema,
  ClaimUnitBodySchema,
  AdminPropertyQueryFastifySchema,
  PropertyIdParamSchema,
  ClaimUnitParamsSchema
} from './schemas.js';
import { domainEvent } from '../../events/envelope.js';
import { appendOutboxEvent } from '../../events/outbox.js';

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function generatePropertyCode(): string {
  const year = new Date().getFullYear();
  const rand = crypto.randomBytes(3).toString('hex').toUpperCase();
  return `CRP-${year}-${rand}`;
}

function hasAdminPropertyReadPermission(auth: { permissions: string[]; claims?: Record<string, unknown> }): boolean {
  const allowedPermissions = [
    'properties:read',
    'properties.read',
    'properties:view_all',
    'properties.view_all',
    'properties:manage',
    'properties.manage',
    'properties:search'
  ];
  const hasPerm = auth.permissions.some((p) => allowedPermissions.includes(p));
  const isStaffAccount = auth.claims?.['accountType'] === 'STAFF';
  return hasPerm || isStaffAccount;
}

const AdminPropertyQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  search: z.string().trim().optional(),
  buildingStatus: BuildingStatusEnum.optional()
});

export const propertyRoutes: FastifyPluginAsync = async (app) => {
  /**
   * ==========================================
   * CROIP ADMIN & STAFF PROPERTY OVERSIGHT
   * ==========================================
   */

  /**
   * GET /admin/properties
   * Allows CROIP Administrators and staff oversight to view all properties across Ghana.
   * Supports pagination, full text search, and building status filtering.
   */
  app.get(
    '/admin/properties',
    {
      preHandler: [app.authenticate],
      schema: {
        summary: 'Nationwide Property Directory (CROIP Admin)',
        description: 'Administrative oversight: retrieve all registered properties nationwide with search, pagination, and building status filtering.',
        tags: ['Admin Property Management'],
        security: [{ bearerAuth: [] }],
        querystring: AdminPropertyQueryFastifySchema
      }
    },
    async (request) => {
      if (!hasAdminPropertyReadPermission(request.auth)) {
        throw new ForbiddenError('Requires CROIP Admin or Staff property oversight permission (properties:read)');
      }

      const parseResult = AdminPropertyQuerySchema.safeParse(request.query);
      if (!parseResult.success) {
        throw new BadRequestError('Invalid query parameters', parseResult.error.flatten());
      }

      const { page, limit, search, buildingStatus } = parseResult.data;
      const skip = (page - 1) * limit;

      const where: Prisma.PropertyWhereInput = {};

      if (buildingStatus) {
        where.buildingStatus = buildingStatus;
      }

      if (search) {
        where.OR = [
          { propertyName: { contains: search, mode: 'insensitive' } },
          { systemPropertyCode: { contains: search, mode: 'insensitive' } },
          { centroidGhanapostGps: { contains: search, mode: 'insensitive' } },
          { streetName: { contains: search, mode: 'insensitive' } },
          { houseNumber: { contains: search, mode: 'insensitive' } }
        ];
      }

      const [total, properties] = await Promise.all([
        app.prisma.property.count({ where }),
        app.prisma.property.findMany({
          where,
          skip,
          take: limit,
          include: {
            units: {
              include: {
                ratepayerLinks: true
              }
            },
            photos: true
          },
          orderBy: {
            createdAt: 'desc'
          }
        })
      ]);

      const totalPages = Math.ceil(total / limit);

      return {
        success: true,
        meta: {
          total,
          page,
          limit,
          totalPages
        },
        data: properties
      };
    }
  );

  /**
   * GET /admin/properties/:id
   * CROIP Admin view of any property details nationwide.
   */
  app.get(
    '/admin/properties/:id',
    {
      preHandler: [app.authenticate],
      schema: {
        summary: 'Inspect Property by ID (CROIP Admin)',
        description: 'Administrative oversight: view complete structural and ownership details of any property nationwide.',
        tags: ['Admin Property Management'],
        security: [{ bearerAuth: [] }],
        params: PropertyIdParamSchema
      }
    },
    async (request) => {
      if (!hasAdminPropertyReadPermission(request.auth)) {
        throw new ForbiddenError('Requires CROIP Admin or Staff property oversight permission (properties:read)');
      }

      const { id } = request.params as { id: string };

      const property = await app.prisma.property.findUnique({
        where: { id },
        include: {
          units: {
            include: {
              ratepayerLinks: true
            }
          },
          photos: true
        }
      });

      if (!property) {
        throw new NotFoundError('Property not found');
      }

      return {
        success: true,
        data: property
      };
    }
  );

  /**
   * ==========================================
   * RATEPAYER SELF-SERVICE ENDPOINTS
   * ==========================================
   */

  /**
   * POST /ratepayer/properties
   * Authenticated ratepayer registers a property, default sectional unit, and ownership link.
   */
  app.post(
    '/ratepayer/properties',
    {
      preHandler: [app.authenticate],
      schema: {
        summary: 'Register Property & Sectional Units',
        description: 'Registers a new property with bounding polygon coordinates (min 4 pairs), centroid GhanaPost GPS, building status, optional street/house numbers, primary sectional unit (Act 1043), and photographs.',
        tags: ['Ratepayer Property Management'],
        security: [{ bearerAuth: [] }],
        body: RegisterPropertyBodySchema
      }
    },
    async (request, reply) => {
      const parseResult = RegisterPropertyInputSchema.safeParse(request.body);
      if (!parseResult.success) {
        throw new BadRequestError('Invalid property registration payload', parseResult.error.flatten());
      }

      const input = parseResult.data;
      const ratepayerId = request.auth.subject;
      if (!UUID_REGEX.test(ratepayerId)) {
        throw new UnauthorizedError('Invalid caller identity. Ratepayer ID must be a valid UUID.');
      }
      const systemPropertyCode = generatePropertyCode();

      const createdProperty = await app.prisma.$transaction(async (tx) => {
        // 1. Create mother parcel / building
        const property = await tx.property.create({
          data: {
            systemPropertyCode,
            propertyName: input.propertyName,
            polygonCoordinates: input.polygonCoordinates,
            centroidGhanapostGps: input.centroidGhanapostGps,
            streetName: input.streetName ?? null,
            houseNumber: input.houseNumber ?? null,
            numberOfFloors: input.numberOfFloors,
            buildingStatus: input.buildingStatus
          }
        });

        // 2. Create primary sectional unit
        const unitData = input.unit ?? {
          unitIdentifier: 'Main Building',
          unitType: 'WHOLE_BUILDING',
          floorLevel: 0,
          ownershipType: 'OWNER',
          ownershipPercentage: 100.0,
          isPrimaryBillingContact: true
        };

        const unit = await tx.propertyUnit.create({
          data: {
            propertyId: property.id,
            unitIdentifier: unitData.unitIdentifier,
            unitType: unitData.unitType,
            floorLevel: unitData.floorLevel
          }
        });

        // 3. Link ratepayer to unit
        await tx.propertyRatepayerLink.create({
          data: {
            unitId: unit.id,
            ratepayerId,
            ownershipType: unitData.ownershipType,
            ownershipPercentage: unitData.ownershipPercentage,
            isPrimaryBillingContact: unitData.isPrimaryBillingContact,
            verificationStatus: 'PENDING'
          }
        });

        // 4. Attach photos if provided
        if (input.photos && input.photos.length > 0) {
          await tx.propertyPhoto.createMany({
            data: input.photos.map((p) => ({
              propertyId: property.id,
              photoType: p.photoType,
              mediaUrl: p.mediaUrl
            }))
          });
        }

        // 5. Emit domain event via outbox
        const event = domainEvent({
          eventType: 'property.registered.v1',
          eventVersion: 1,
          producer: 'property-management-service',
          aggregateType: 'Property',
          aggregateId: property.id,
          aggregateVersion: 1,
          concessionId: request.auth.concessionId,
          assemblyId: request.auth.assemblyId,
          correlationId: request.id,
          data: {
            propertyId: property.id,
            systemPropertyCode: property.systemPropertyCode,
            ratepayerId,
            unitId: unit.id,
            centroidGhanapostGps: property.centroidGhanapostGps,
            buildingStatus: property.buildingStatus
          }
        });

        await appendOutboxEvent(tx, 'property.registered.v1', event);

        return property;
      });

      // Fetch complete record with relations
      const result = await app.prisma.property.findUnique({
        where: { id: createdProperty.id },
        include: {
          units: {
            include: {
              ratepayerLinks: true
            }
          },
          photos: true
        }
      });

      return reply.code(201).send({
        success: true,
        data: result
      });
    }
  );

  /**
   * GET /ratepayer/properties
   * List all properties where the authenticated ratepayer holds an ownership/occupancy link.
   */
  app.get(
    '/ratepayer/properties',
    {
      preHandler: [app.authenticate],
      schema: {
        summary: 'List Ratepayer Properties',
        description: 'Retrieves all properties and sectional units where the authenticated ratepayer holds an ownership or occupancy link.',
        tags: ['Ratepayer Property Management'],
        security: [{ bearerAuth: [] }]
      }
    },
    async (request) => {
      const ratepayerId = request.auth.subject;
      if (!UUID_REGEX.test(ratepayerId)) {
        throw new UnauthorizedError('Invalid caller identity. Ratepayer ID must be a valid UUID.');
      }

      const properties = await app.prisma.property.findMany({
        where: {
          units: {
            some: {
              ratepayerLinks: {
                some: {
                  ratepayerId
                }
              }
            }
          }
        },
        include: {
          units: {
            where: {
              ratepayerLinks: {
                some: {
                  ratepayerId
                }
              }
            },
            include: {
              ratepayerLinks: {
                where: {
                  ratepayerId
                }
              }
            }
          },
          photos: true
        },
        orderBy: {
          createdAt: 'desc'
        }
      });

      return {
        success: true,
        data: properties
      };
    }
  );

  /**
   * GET /ratepayer/properties/:id
   * Get full details of a specific property for the authenticated ratepayer.
   * Also accessible by CROIP Admin / Staff oversight.
   */
  app.get(
    '/ratepayer/properties/:id',
    {
      preHandler: [app.authenticate],
      schema: {
        summary: 'Get Ratepayer Property Details',
        description: 'Retrieves complete structural and unit details of a specific property owned by the authenticated ratepayer.',
        tags: ['Ratepayer Property Management'],
        security: [{ bearerAuth: [] }],
        params: PropertyIdParamSchema
      }
    },
    async (request) => {
      const { id } = request.params as { id: string };
      const ratepayerId = request.auth.subject;

      const property = await app.prisma.property.findUnique({
        where: { id },
        include: {
          units: {
            include: {
              ratepayerLinks: true
            }
          },
          photos: true
        }
      });

      if (!property) {
        throw new NotFoundError('Property not found');
      }

      // Check if user is linked to at least one unit of this property
      const isLinked = property.units.some((u) =>
        u.ratepayerLinks.some((l) => l.ratepayerId === ratepayerId)
      );

      // Check if user is CROIP Admin / Staff with oversight permission
      const isAdminOrStaff = hasAdminPropertyReadPermission(request.auth);

      if (!isLinked && !isAdminOrStaff) {
        throw new ForbiddenError('You do not have access to view this property');
      }

      return {
        success: true,
        data: property
      };
    }
  );

  /**
   * POST /ratepayer/properties/:id/units/:unitId/claim
   * Claim or link to an existing sectional unit within a property.
   */
  app.post(
    '/ratepayer/properties/:id/units/:unitId/claim',
    {
      preHandler: [app.authenticate],
      schema: {
        summary: 'Claim Sectional Unit in Property',
        description: 'Submit an ownership or occupancy claim (Owner, Landlord, Caretaker, Tenant) for an individual sectional unit within a property complex.',
        tags: ['Ratepayer Property Management'],
        security: [{ bearerAuth: [] }],
        params: ClaimUnitParamsSchema,
        body: ClaimUnitBodySchema
      }
    },
    async (request, reply) => {
      const { id: propertyId, unitId } = request.params as { id: string; unitId: string };
      const ratepayerId = request.auth.subject;

      const parseResult = ClaimPropertyUnitInputSchema.safeParse({
        unitId,
        ...(request.body as object || {})
      });

      if (!parseResult.success) {
        throw new BadRequestError('Invalid claim unit payload', parseResult.error.flatten());
      }

      const input = parseResult.data;

      const unit = await app.prisma.propertyUnit.findFirst({
        where: {
          id: unitId,
          propertyId
        }
      });

      if (!unit) {
        throw new NotFoundError('Property unit not found');
      }

      const existingLink = await app.prisma.propertyRatepayerLink.findUnique({
        where: {
          unitId_ratepayerId: {
            unitId,
            ratepayerId
          }
        }
      });

      if (existingLink) {
        throw new ConflictError('You already have an active claim or link to this unit');
      }

      const link = await app.prisma.$transaction(async (tx) => {
        const createdLink = await tx.propertyRatepayerLink.create({
          data: {
            unitId,
            ratepayerId,
            ownershipType: input.ownershipType,
            ownershipPercentage: input.ownershipPercentage,
            isPrimaryBillingContact: input.isPrimaryBillingContact,
            verificationStatus: 'PENDING'
          }
        });

        const event = domainEvent({
          eventType: 'property.unit.claimed.v1',
          eventVersion: 1,
          producer: 'property-management-service',
          aggregateType: 'PropertyUnit',
          aggregateId: unitId,
          aggregateVersion: 1,
          concessionId: request.auth.concessionId,
          assemblyId: request.auth.assemblyId,
          correlationId: request.id,
          data: {
            propertyId,
            unitId,
            ratepayerId,
            linkId: createdLink.id,
            ownershipType: createdLink.ownershipType,
            ownershipPercentage: createdLink.ownershipPercentage
          }
        });

        await appendOutboxEvent(tx, 'property.unit.claimed.v1', event);

        return createdLink;
      });

      return reply.code(201).send({
        success: true,
        data: link
      });
    }
  );
};
