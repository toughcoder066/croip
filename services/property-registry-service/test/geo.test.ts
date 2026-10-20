import test from 'node:test';
import assert from 'node:assert/strict';
import { doPolygonsOverlap } from '../src/lib/geo.js';

test('doPolygonsOverlap correctly detects overlapping polygons', () => {
  const polyA = {
    type: 'Polygon',
    coordinates: [
      [
        [-0.18, 5.60],
        [-0.17, 5.60],
        [-0.17, 5.61],
        [-0.18, 5.61],
        [-0.18, 5.60]
      ]
    ]
  };

  // Case 1: Partially overlapping polygon
  const polyOverlap = {
    type: 'Polygon',
    coordinates: [
      [
        [-0.175, 5.605],
        [-0.165, 5.605],
        [-0.165, 5.615],
        [-0.175, 5.615],
        [-0.175, 5.605]
      ]
    ]
  };
  assert.equal(doPolygonsOverlap(polyA, polyOverlap), true);

  // Case 2: PolyInside strictly inside PolyA (e.g. house inside parcel)
  const polyInside = {
    type: 'Polygon',
    coordinates: [
      [
        [-0.178, 5.602],
        [-0.172, 5.602],
        [-0.172, 5.608],
        [-0.178, 5.608],
        [-0.178, 5.602]
      ]
    ]
  };
  assert.equal(doPolygonsOverlap(polyA, polyInside), true);
  assert.equal(doPolygonsOverlap(polyInside, polyA), true);

  // Case 3: Completely disjoint polygon
  const polyDisjoint = {
    type: 'Polygon',
    coordinates: [
      [
        [-0.15, 5.60],
        [-0.14, 5.60],
        [-0.14, 5.61],
        [-0.15, 5.61],
        [-0.15, 5.60]
      ]
    ]
  };
  assert.equal(doPolygonsOverlap(polyA, polyDisjoint), false);

  // Case 4: Adjacent polygon sharing an edge (x = -0.17)
  const polyAdjacent = {
    type: 'Polygon',
    coordinates: [
      [
        [-0.17, 5.60],
        [-0.16, 5.60],
        [-0.16, 5.61],
        [-0.17, 5.61],
        [-0.17, 5.60]
      ]
    ]
  };
  assert.equal(doPolygonsOverlap(polyA, polyAdjacent), false);
});
