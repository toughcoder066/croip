type Position = [number, number];

interface GeoJsonPolygon {
  type: 'Polygon';
  coordinates: Position[][];
}

interface GeoJsonMultiPolygon {
  type: 'MultiPolygon';
  coordinates: Position[][][];
}

type GeoJsonPolygonish = GeoJsonPolygon | GeoJsonMultiPolygon;

function isPolygonish(value: unknown): value is GeoJsonPolygonish {
  if (!value || typeof value !== 'object') return false;
  const type = (value as { type?: unknown }).type;
  return type === 'Polygon' || type === 'MultiPolygon';
}

// Ray-casting point-in-polygon test against a single linear ring (the ring's first and
// last positions are not required to be equal; this treats it as implicitly closed).
function pointInRing(lng: number, lat: number, ring: Position[]): boolean {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i]!;
    const [xj, yj] = ring[j]!;
    const intersects = yi > lat !== yj > lat && lng < ((xj - xi) * (lat - yi)) / (yj - yi) + xi;
    if (intersects) inside = !inside;
  }
  return inside;
}

// A GeoJSON polygon's coordinates are [outerRing, ...holeRings]; a point counts as inside
// the polygon when it is inside the outer ring and not inside any hole.
function pointInPolygonRings(lng: number, lat: number, rings: Position[][]): boolean {
  const [outer, ...holes] = rings;
  if (!outer || !pointInRing(lng, lat, outer)) return false;
  return !holes.some((hole) => pointInRing(lng, lat, hole));
}

/**
 * True when (longitude, latitude) falls inside the given GeoJSON Polygon or MultiPolygon.
 * Returns false for any other/missing geometry rather than throwing, since boundaries are
 * optional on a Region/MunicipalAssembly until someone draws them.
 */
export function pointInGeometry(longitude: number, latitude: number, geometry: unknown): boolean {
  if (!isPolygonish(geometry)) return false;
  if (geometry.type === 'Polygon') {
    return pointInPolygonRings(longitude, latitude, geometry.coordinates);
  }
  return geometry.coordinates.some((rings) => pointInPolygonRings(longitude, latitude, rings));
}

/**
 * Every position on a geometry's exterior ring(s) — holes excluded, since a property's own
 * footprint never has a donut hole in practice and we only need a reasonable sample of the
 * outline to test MMDA membership, not an exact boundary trace.
 */
export function exteriorVertices(geometry: unknown): Position[] {
  if (!isPolygonish(geometry)) return [];
  if (geometry.type === 'Polygon') {
    return geometry.coordinates[0] ?? [];
  }
  return geometry.coordinates.flatMap((rings) => rings[0] ?? []);
}
