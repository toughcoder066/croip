export type Position = [number, number]; // [longitude, latitude]

export interface BoundingBox {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
}

interface GeoJsonPolygon {
  type: 'Polygon';
  coordinates: Position[][];
}

interface GeoJsonMultiPolygon {
  type: 'MultiPolygon';
  coordinates: Position[][][];
}

interface GeoJsonFeature {
  type: 'Feature';
  geometry: GeoJsonPolygon | GeoJsonMultiPolygon;
}

export function isPolygonGeometry(value: unknown): value is GeoJsonPolygon | GeoJsonMultiPolygon {
  if (!value || typeof value !== 'object') return false;
  const obj = value as Record<string, unknown>;
  if (obj.type === 'Feature' && obj.geometry) {
    return isPolygonGeometry(obj.geometry);
  }
  return (obj.type === 'Polygon' || obj.type === 'MultiPolygon') && Array.isArray(obj.coordinates);
}

/**
 * Extracts all outer rings and all rings from a Polygon or MultiPolygon geometry.
 */
export function extractPolygonRings(geometry: unknown): Position[][][] {
  if (!geometry || typeof geometry !== 'object') return [];
  const obj = (geometry as Record<string, unknown>).type === 'Feature'
    ? ((geometry as GeoJsonFeature).geometry as unknown as Record<string, unknown>)
    : (geometry as Record<string, unknown>);

  if (obj.type === 'Polygon' && Array.isArray(obj.coordinates)) {
    return [obj.coordinates as Position[][]];
  }
  if (obj.type === 'MultiPolygon' && Array.isArray(obj.coordinates)) {
    return obj.coordinates as Position[][][];
  }
  return [];
}

/**
 * Ray-casting point-in-ring algorithm.
 */
export function pointInRing(lng: number, lat: number, ring: Position[]): boolean {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const p1 = ring[i];
    const p2 = ring[j];
    if (!p1 || !p2) continue;
    const [xi, yi] = p1;
    const [xj, yj] = p2;
    const intersects = yi > lat !== yj > lat && lng < ((xj - xi) * (lat - yi)) / (yj - yi) + xi;
    if (intersects) inside = !inside;
  }
  return inside;
}

/**
 * Distance in degrees from a point to a line segment.
 */
export function distancePointToSegment(px: number, py: number, p1: Position, p2: Position): number {
  const x1 = p1[0];
  const y1 = p1[1];
  const x2 = p2[0];
  const y2 = p2[1];
  const dx = x2 - x1;
  const dy = y2 - y1;
  if (dx === 0 && dy === 0) {
    return Math.hypot(px - x1, py - y1);
  }
  const t = Math.max(0, Math.min(1, ((px - x1) * dx + (py - y1) * dy) / (dx * dx + dy * dy)));
  const projX = x1 + t * dx;
  const projY = y1 + t * dy;
  return Math.hypot(px - projX, py - projY);
}

/**
 * Checks if a point is strictly inside the polygon (not simply lying on its boundary edge).
 */
export function pointStrictlyInsidePolygon(lng: number, lat: number, geometry: unknown, boundaryTolerance = 1e-6): boolean {
  const polygons = extractPolygonRings(geometry);
  if (!polygons.length) return false;

  for (const rings of polygons) {
    const [outer, ...holes] = rings;
    if (!outer || outer.length < 3) continue;

    // Check if on outer boundary edge
    let onBoundary = false;
    for (let i = 0, j = outer.length - 1; i < outer.length; j = i++) {
      const p1 = outer[i]!;
      const p2 = outer[j]!;
      if (distancePointToSegment(lng, lat, p1, p2) < boundaryTolerance) {
        onBoundary = true;
        break;
      }
    }
    if (onBoundary) continue;

    if (pointInRing(lng, lat, outer)) {
      const inHole = holes.some(hole => pointInRing(lng, lat, hole));
      if (!inHole) return true;
    }
  }

  return false;
}

/**
 * Counter-clockwise orientation test for 3 points.
 */
function ccw(p1: Position, p2: Position, p3: Position): number {
  return (p2[0] - p1[0]) * (p3[1] - p1[1]) - (p2[1] - p1[1]) * (p3[0] - p1[0]);
}

/**
 * Strict segment intersection: returns true if two segments cross each other's interior.
 * Touching only at an endpoint returns false.
 */
export function segmentsCross(a1: Position, a2: Position, b1: Position, b2: Position): boolean {
  const eps = 1e-7;
  // If they share an endpoint, they don't cross through each other's interior
  if (
    (Math.abs(a1[0] - b1[0]) < eps && Math.abs(a1[1] - b1[1]) < eps) ||
    (Math.abs(a1[0] - b2[0]) < eps && Math.abs(a1[1] - b2[1]) < eps) ||
    (Math.abs(a2[0] - b1[0]) < eps && Math.abs(a2[1] - b1[1]) < eps) ||
    (Math.abs(a2[0] - b2[0]) < eps && Math.abs(a2[1] - b2[1]) < eps)
  ) {
    return false;
  }

  const d1 = ccw(b1, b2, a1);
  const d2 = ccw(b1, b2, a2);
  const d3 = ccw(a1, a2, b1);
  const d4 = ccw(a1, a2, b2);

  if (
    ((d1 > 1e-9 && d2 < -1e-9) || (d1 < -1e-9 && d2 > 1e-9)) &&
    ((d3 > 1e-9 && d4 < -1e-9) || (d3 < -1e-9 && d4 > 1e-9))
  ) {
    return true;
  }

  return false;
}

export function polygonCentroid(ring: Position[]): Position {
  let cx = 0;
  let cy = 0;
  const count = ring.length;
  if (!count) return [0, 0];
  for (const [x, y] of ring) {
    cx += x;
    cy += y;
  }
  return [cx / count, cy / count];
}

export function computeBoundingBox(rings: Position[][][]): BoundingBox | null {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  let found = false;

  for (const poly of rings) {
    for (const ring of poly) {
      for (const [x, y] of ring) {
        if (x < minX) minX = x;
        if (y < minY) minY = y;
        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;
        found = true;
      }
    }
  }

  return found ? { minX, minY, maxX, maxY } : null;
}

export function boundingBoxesOverlap(b1: BoundingBox, b2: BoundingBox, margin = 1e-6): boolean {
  return !(
    b1.maxX < b2.minX - margin ||
    b1.minX > b2.maxX + margin ||
    b1.maxY < b2.minY - margin ||
    b1.minY > b2.maxY + margin
  );
}

/**
 * Returns true if geometry A and geometry B spatially overlap:
 * - Polygon A contains or is within Polygon B (concentric or contained)
 * - Edges cross each other
 * - Interior points / vertices of one fall strictly inside the other
 */
export function doPolygonsOverlap(geoA: unknown, geoB: unknown): boolean {
  if (!isPolygonGeometry(geoA) || !isPolygonGeometry(geoB)) return false;

  const ringsA = extractPolygonRings(geoA);
  const ringsB = extractPolygonRings(geoB);
  if (!ringsA.length || !ringsB.length) return false;

  const bboxA = computeBoundingBox(ringsA);
  const bboxB = computeBoundingBox(ringsB);
  if (!bboxA || !bboxB) return false;

  // Fast bounding-box rejection
  if (!boundingBoxesOverlap(bboxA, bboxB)) {
    return false;
  }

  // 1. Check if any exterior vertex of A is strictly inside B
  for (const polyA of ringsA) {
    const outerA = polyA[0];
    if (!outerA) continue;
    for (const [x, y] of outerA) {
      if (pointStrictlyInsidePolygon(x, y, geoB)) {
        return true;
      }
    }
    // Also test centroid of A inside B (handles small A contained in B)
    const centroidA = polygonCentroid(outerA);
    if (pointStrictlyInsidePolygon(centroidA[0], centroidA[1], geoB)) {
      return true;
    }
  }

  // 2. Check if any exterior vertex of B is strictly inside A
  for (const polyB of ringsB) {
    const outerB = polyB[0];
    if (!outerB) continue;
    for (const [x, y] of outerB) {
      if (pointStrictlyInsidePolygon(x, y, geoA)) {
        return true;
      }
    }
    // Also test centroid of B inside A (handles small B contained in A)
    const centroidB = polygonCentroid(outerB);
    if (pointStrictlyInsidePolygon(centroidB[0], centroidB[1], geoA)) {
      return true;
    }
  }

  // 3. Check if any edge of A crosses any edge of B
  for (const polyA of ringsA) {
    const outerA = polyA[0];
    if (!outerA) continue;
    for (let i = 0, j = outerA.length - 1; i < outerA.length; j = i++) {
      const a1 = outerA[i]!;
      const a2 = outerA[j]!;

      for (const polyB of ringsB) {
        const outerB = polyB[0];
        if (!outerB) continue;
        for (let k = 0, l = outerB.length - 1; k < outerB.length; l = k++) {
          const b1 = outerB[k]!;
          const b2 = outerB[l]!;
          if (segmentsCross(a1, a2, b1, b2)) {
            return true;
          }
        }
      }
    }
  }

  return false;
}
