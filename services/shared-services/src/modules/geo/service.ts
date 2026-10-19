import type { FastifyInstance } from 'fastify';
import { NotFoundError, BadRequestError } from '../../lib/errors.js';
import { pointInGeometry, exteriorVertices } from '../../lib/geo.js';

export interface CreateRegionInput {
  code: string;
  name: string;
  polygonGeoJson?: Record<string, unknown>;
}

export interface CreateAssemblyInput {
  regionId: string;
  code: string;
  name: string;
  category?: string;
  polygonGeoJson?: Record<string, unknown>;
}

export interface UpdateBoundaryInput {
  polygonGeoJson: Record<string, unknown>;
}

export function geoService(app: FastifyInstance) {
  return {
    async listRegions() {
      return app.prisma.region.findMany({ orderBy: { name: 'asc' } });
    },

    async createRegion(input: CreateRegionInput) {
      return app.prisma.region.create({
        data: { code: input.code, name: input.name, polygonGeoJson: (input.polygonGeoJson as any) ?? null }
      });
    },

    async updateRegionBoundary(id: string, input: UpdateBoundaryInput) {
      const region = await app.prisma.region.findUnique({ where: { id } });
      if (!region) throw new NotFoundError('Region not found');
      return app.prisma.region.update({ where: { id }, data: { polygonGeoJson: input.polygonGeoJson as any } });
    },

    async listAssemblies(regionId?: string) {
      return app.prisma.municipalAssembly.findMany({
        ...(regionId ? { where: { regionId } } : {}),
        orderBy: { name: 'asc' }
      });
    },

    async createAssembly(input: CreateAssemblyInput) {
      const region = await app.prisma.region.findUnique({ where: { id: input.regionId } });
      if (!region) throw new BadRequestError(`Region '${input.regionId}' does not exist`);

      return app.prisma.municipalAssembly.create({
        data: {
          regionId: input.regionId,
          code: input.code,
          name: input.name,
          category: input.category ?? 'DISTRICT',
          polygonGeoJson: (input.polygonGeoJson as any) ?? null
        }
      });
    },

    async updateAssemblyBoundary(id: string, input: UpdateBoundaryInput) {
      const assembly = await app.prisma.municipalAssembly.findUnique({ where: { id } });
      if (!assembly) throw new NotFoundError('Municipal assembly not found');
      return app.prisma.municipalAssembly.update({ where: { id }, data: { polygonGeoJson: input.polygonGeoJson as any } });
    },

    // Point-in-polygon zone detection: given a coordinate (e.g. where a field agent is
    // standing, or a property's centroid), find which MMDA boundary contains it, and that
    // MMDA's region. Returns matched:false rather than erroring when nothing contains the
    // point (most assemblies won't have a boundary drawn yet) — callers decide what to do
    // with an unmatched point (e.g. fall back to manual assembly selection).
    async detectZone(longitude: number, latitude: number) {
      // Ghana has 261 MMDAs total — small enough to scan in JS rather than push a JSON-null
      // filter down to Postgres, which is awkward to get right for a nullable Json column.
      const assemblies = await app.prisma.municipalAssembly.findMany({ include: { region: true } });

      for (const assembly of assemblies) {
        if (!assembly.polygonGeoJson) continue;
        if (pointInGeometry(longitude, latitude, assembly.polygonGeoJson)) {
          const { region, ...assemblyFields } = assembly;
          return { matched: true, assembly: assemblyFields, region };
        }
      }

      return { matched: false, assembly: null, region: null };
    },

    // Zone-membership check for a property's own footprint polygon, used by
    // property-registry-service at registration time so a property can't be registered
    // against the wrong MMDA, or one whose boundary hasn't been drawn yet, or (if drawn
    // boundaries overlap) two MMDAs at once.
    //
    // Approximation: every vertex of the property's exterior ring is tested against every
    // drawn assembly boundary; the set of assemblies containing at least one vertex decides
    // the outcome. This is a vertex sample, not a true polygon-intersection test (pathological
    // shapes could in principle fool it), but it's the same point-in-polygon primitive used
    // everywhere else here and is accurate for the convex/near-convex parcels this platform
    // actually deals with.
    async detectZoneForPolygon(geometry: unknown) {
      const vertices = exteriorVertices(geometry);
      if (!vertices.length) {
        return { status: 'NO_MATCH' as const, assembly: null, region: null, matchedAssemblies: [] };
      }

      const assemblies = await app.prisma.municipalAssembly.findMany({ include: { region: true } });
      const matchedIds = new Set<string>();

      for (const [lng, lat] of vertices) {
        for (const assembly of assemblies) {
          if (!assembly.polygonGeoJson) continue;
          if (pointInGeometry(lng, lat, assembly.polygonGeoJson)) {
            matchedIds.add(assembly.id);
          }
        }
      }

      if (matchedIds.size === 0) {
        return { status: 'NO_MATCH' as const, assembly: null, region: null, matchedAssemblies: [] };
      }

      const matched = assemblies.filter((a) => matchedIds.has(a.id));

      if (matched.length > 1) {
        return {
          status: 'CONFLICT' as const,
          assembly: null,
          region: null,
          matchedAssemblies: matched.map(({ region, ...fields }) => ({ ...fields, regionName: region.name }))
        };
      }

      const { region, ...assemblyFields } = matched[0]!;
      return { status: 'MATCHED' as const, assembly: assemblyFields, region, matchedAssemblies: [] };
    }
  };
}
