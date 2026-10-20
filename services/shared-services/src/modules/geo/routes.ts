import type { FastifyPluginAsync } from 'fastify';
import { geoService, type CreateRegionInput, type CreateAssemblyInput } from './service.js';
import {
  problemSchema,
  regionResponseSchema,
  assemblyResponseSchema,
  createRegionBodySchema,
  updateRegionBodySchema,
  updateRegionBoundaryBodySchema,
  createAssemblyBodySchema,
  updateAssemblyBodySchema,
  updateAssemblyBoundaryBodySchema,
  detectZoneBodySchema,
  detectZoneResponseSchema,
  detectZoneForPolygonBodySchema,
  detectZoneForPolygonResponseSchema
} from './schemas.js';

export const geoRoutes: FastifyPluginAsync = async (app) => {
  const service = geoService(app);

  app.get('/regions', {
    preHandler: app.requirePermissions(['reference:read']),
    schema: {
      tags: ['Geography'],
      summary: 'List regions',
      response: { 200: { type: 'array', items: regionResponseSchema }, 401: problemSchema, 403: problemSchema }
    }
  }, async () => service.listRegions());

  app.post<{ Body: CreateRegionInput }>('/regions', {
    preHandler: app.requirePermissions(['reference:manage']),
    schema: {
      tags: ['Geography'],
      summary: 'Create a region',
      body: createRegionBodySchema,
      response: { 201: regionResponseSchema, 400: problemSchema, 401: problemSchema, 403: problemSchema }
    }
  }, async (request, reply) => {
    const region = await service.createRegion(request.body);
    return reply.code(201).send(region);
  });

  app.get<{ Params: { id: string } }>('/regions/:id', {
    preHandler: app.requirePermissions(['reference:read']),
    schema: {
      tags: ['Geography'],
      summary: 'Get a single region by ID',
      params: { type: 'object', required: ['id'], properties: { id: { type: 'string', format: 'uuid' } } },
      response: { 200: { type: 'object', additionalProperties: true }, 401: problemSchema, 403: problemSchema, 404: problemSchema }
    }
  }, async (request) => service.getRegion(request.params.id));

  app.patch<{ Params: { id: string }; Body: { code?: string; name?: string; polygonGeoJson?: Record<string, unknown> } }>('/regions/:id', {
    preHandler: app.requirePermissions(['reference:manage']),
    schema: {
      tags: ['Geography'],
      summary: 'Update region name, code, or boundary',
      params: { type: 'object', required: ['id'], properties: { id: { type: 'string', format: 'uuid' } } },
      body: updateRegionBodySchema,
      response: { 200: regionResponseSchema, 400: problemSchema, 401: problemSchema, 403: problemSchema, 404: problemSchema }
    }
  }, async (request) => service.updateRegion(request.params.id, request.body));

  app.patch<{ Params: { id: string }; Body: { polygonGeoJson: Record<string, unknown> } }>('/regions/:id/boundary', {
    preHandler: app.requirePermissions(['reference:manage']),
    schema: {
      tags: ['Geography'],
      summary: "Draw or replace a region's boundary polygon",
      params: { type: 'object', required: ['id'], properties: { id: { type: 'string', format: 'uuid' } } },
      body: updateRegionBoundaryBodySchema,
      response: { 200: regionResponseSchema, 400: problemSchema, 401: problemSchema, 403: problemSchema, 404: problemSchema }
    }
  }, async (request) => service.updateRegionBoundary(request.params.id, request.body));

  app.get<{ Querystring: { regionId?: string } }>('/assemblies', {
    preHandler: app.requirePermissions(['reference:read']),
    schema: {
      tags: ['Geography'],
      summary: 'List municipal assemblies (MMDAs), optionally filtered by region',
      querystring: { type: 'object', properties: { regionId: { type: 'string', format: 'uuid' } } },
      response: { 200: { type: 'array', items: assemblyResponseSchema }, 401: problemSchema, 403: problemSchema }
    }
  }, async (request) => service.listAssemblies(request.query?.regionId));

  app.get<{ Params: { id: string } }>('/assemblies/:id', {
    preHandler: app.requirePermissions(['reference:read']),
    schema: {
      tags: ['Geography'],
      summary: 'Get a single municipal assembly (MMDA) by ID',
      params: { type: 'object', required: ['id'], properties: { id: { type: 'string', format: 'uuid' } } },
      response: { 200: { type: 'object', additionalProperties: true }, 401: problemSchema, 403: problemSchema, 404: problemSchema }
    }
  }, async (request) => service.getAssembly(request.params.id));

  app.post<{ Body: CreateAssemblyInput }>('/assemblies', {
    preHandler: app.requirePermissions(['reference:manage']),
    schema: {
      tags: ['Geography'],
      summary: 'Create a municipal assembly (MMDA)',
      body: createAssemblyBodySchema,
      response: { 201: assemblyResponseSchema, 400: problemSchema, 401: problemSchema, 403: problemSchema }
    }
  }, async (request, reply) => {
    const assembly = await service.createAssembly(request.body);
    return reply.code(201).send(assembly);
  });

  app.patch<{ Params: { id: string }; Body: { regionId?: string; code?: string; name?: string; category?: string; polygonGeoJson?: Record<string, unknown> } }>('/assemblies/:id', {
    preHandler: app.requirePermissions(['reference:manage']),
    schema: {
      tags: ['Geography'],
      summary: 'Update municipal assembly name, code, region, category, or boundary',
      params: { type: 'object', required: ['id'], properties: { id: { type: 'string', format: 'uuid' } } },
      body: updateAssemblyBodySchema,
      response: { 200: assemblyResponseSchema, 400: problemSchema, 401: problemSchema, 403: problemSchema, 404: problemSchema }
    }
  }, async (request) => service.updateAssembly(request.params.id, request.body));

  app.patch<{ Params: { id: string }; Body: { polygonGeoJson: Record<string, unknown> } }>('/assemblies/:id/boundary', {
    preHandler: app.requirePermissions(['reference:manage']),
    schema: {
      tags: ['Geography'],
      summary: "Draw or replace an MMDA's boundary polygon",
      params: { type: 'object', required: ['id'], properties: { id: { type: 'string', format: 'uuid' } } },
      body: updateAssemblyBoundaryBodySchema,
      response: { 200: assemblyResponseSchema, 400: problemSchema, 401: problemSchema, 403: problemSchema, 404: problemSchema }
    }
  }, async (request) => service.updateAssemblyBoundary(request.params.id, request.body));

  app.post<{ Body: { latitude: number; longitude: number } }>('/assemblies/detect-zone', {
    preHandler: app.requirePermissions(['reference:read']),
    schema: {
      tags: ['Geography'],
      summary: 'Point-in-polygon lookup: which MMDA (and region) a coordinate falls inside',
      body: detectZoneBodySchema,
      response: { 200: detectZoneResponseSchema, 400: problemSchema, 401: problemSchema, 403: problemSchema }
    }
  }, async (request) => service.detectZone(request.body.longitude, request.body.latitude));

  app.post<{ Body: { polygonGeoJson: Record<string, unknown> } }>('/assemblies/detect-zone-for-polygon', {
    preHandler: app.requirePermissions(['reference:read']),
    schema: {
      tags: ['Geography'],
      summary:
        "Zone-membership check for a property's footprint polygon: which single MMDA it falls inside, " +
        'or whether it matches none (no MMDA drawn there yet) or more than one (boundary conflict). ' +
        'Used by property-registry-service to validate a property before registering it.',
      body: detectZoneForPolygonBodySchema,
      response: { 200: detectZoneForPolygonResponseSchema, 400: problemSchema, 401: problemSchema, 403: problemSchema }
    }
  }, async (request) => service.detectZoneForPolygon(request.body.polygonGeoJson));
};
