'use client'

import { useEffect, useRef } from 'react'

import L from 'leaflet'
import { GeoJSON, MapContainer, TileLayer, useMap } from 'react-leaflet'

// Leaflet + leaflet-draw ship their own stylesheets; these must be imported once
// somewhere in the client bundle for the map tiles and draw toolbar to render correctly.
import 'leaflet/dist/leaflet.css'
import 'leaflet-draw/dist/leaflet.draw.css'
import './boundary-map-overrides.css'

// Side-effect import: attaches L.Control.Draw / L.Draw.* onto the shared Leaflet module.
import 'leaflet-draw'

// By default, clicking an existing vertex handle in Edit mode deletes that point
// (`L.Edit.Poly.prototype._onMarkerClick`) — a one-click, no-confirmation way to lose a point
// on a real administrative boundary, and easy to trigger by accident while aiming for a
// nearby bit of line. Disabled platform-wide: points are only removed deliberately, via the
// toolbar's "Delete layers" tool.
;(L as unknown as { Edit: { Poly: { prototype: Record<string, unknown> } } }).Edit.Poly.prototype._onMarkerClick = function noop() {}

// --- Fix default marker icon paths -----------------------------------------------------
// Well-known Leaflet + webpack/Next.js bundler gotcha: Leaflet's default marker icon
// resolves image URLs relative to its own source, which breaks once bundled. The fix is
// to delete the broken resolver and re-point the icon URLs at the bundler-resolved assets.
import markerIcon2xAsset from 'leaflet/dist/images/marker-icon-2x.png'
import markerIconAsset from 'leaflet/dist/images/marker-icon.png'
import markerShadowAsset from 'leaflet/dist/images/marker-shadow.png'

type StaticImg = string | { src: string }
const assetUrl = (asset: StaticImg) => (typeof asset === 'string' ? asset : asset.src)

delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: assetUrl(markerIcon2xAsset as StaticImg),
  iconUrl: assetUrl(markerIconAsset as StaticImg),
  shadowUrl: assetUrl(markerShadowAsset as StaticImg)
})

// -----------------------------------------------------------------------------------------

export type GeoJsonGeometry = {
  type: 'Polygon' | 'MultiPolygon'
  coordinates: any
}

export const GHANA_CENTER: [number, number] = [7.9, -1.0]
export const GHANA_ZOOM = 7

export interface ReferenceZone {
  id: string
  name: string
  code: string
  polygonGeoJson: GeoJsonGeometry | null
}

// Every already-drawn zone that ISN'T the one being edited renders in this one muted gray —
// they're context, not the subject — so the active boundary (drawn in blue by DrawControl)
// is unambiguously the thing your eye goes to. Hovering a grayed-out shape still names it.
const REFERENCE_ZONE_COLOR = '#6b7280'

// Perpendicular projection of point `p` onto the segment `a`→`b`, clamped to the segment
// (not the infinite line) — used to find where along a specific edge a click landed closest.
function closestPointOnSegment(p: L.Point, a: L.Point, b: L.Point): { point: L.Point; distSq: number } {
  const abx = b.x - a.x
  const aby = b.y - a.y
  const lengthSq = abx * abx + aby * aby
  let t = lengthSq === 0 ? 0 : ((p.x - a.x) * abx + (p.y - a.y) * aby) / lengthSq

  t = Math.max(0, Math.min(1, t))

  const point = L.point(a.x + abx * t, a.y + aby * t)
  const dx = p.x - point.x
  const dy = p.y - point.y

  return { point, distSq: dx * dx + dy * dy }
}

// How close (in screen pixels) a click needs to land to the boundary outline before it counts
// as "clicking the line" and inserts a point there — keeps clicks deep inside the shape's
// fill (selecting/inspecting it) from unexpectedly adding a point far from the cursor.
const ADD_POINT_CLICK_TOLERANCE_PX = 30

interface DrawControlProps {
  existingPolygon: GeoJsonGeometry | null
  onDraftChange: (geojson: GeoJsonGeometry | null) => void

  /**
   * A geometry typed/pasted into the coordinates textarea, paired with a nonce that
   * increments on every "Apply to Map" click — bumping the nonce is how the parent tells
   * this effect "load this geometry now," since the geometry object itself may be identical
   * to what's already drawn (e.g. re-applying after a tweak-then-revert).
   */
  applyGeometry?: GeoJsonGeometry | null
  applyToken?: number
}

/**
 * Wires vanilla leaflet-draw controls (the polygon draw / edit-vertices / delete toolbar)
 * onto the underlying Leaflet map instance.
 *
 * react-leaflet has no first-class leaflet-draw bindings for v4/v5 (the old
 * `react-leaflet-draw` package only supports react-leaflet v2), so this talks directly to
 * the L.Map via `useMap()` and plain leaflet-draw APIs — the same pattern used by most
 * current react-leaflet + leaflet-draw integrations.
 *
 * The parent remounts this component (via a `key` keyed on the selected region/assembly
 * id) whenever the selection changes, so the mount effect below only needs to run once per
 * mount/unmount cycle rather than diff the existing polygon prop itself.
 */
function DrawControl({ existingPolygon, onDraftChange, applyGeometry, applyToken = 0 }: DrawControlProps) {
  const map = useMap()
  const onDraftChangeRef = useRef(onDraftChange)
  const drawnItemsRef = useRef<L.FeatureGroup | null>(null)
  const loadGeometryRef = useRef<(geometry: GeoJsonGeometry | null) => void>(() => {})
  const lastAppliedTokenRef = useRef(applyToken)

  useEffect(() => {
    onDraftChangeRef.current = onDraftChange
  }, [onDraftChange])

  useEffect(() => {
    const drawnItems = new L.FeatureGroup()

    drawnItemsRef.current = drawnItems
    map.addLayer(drawnItems)

    const emitDraft = () => {
      const collection = drawnItems.toGeoJSON() as GeoJSON.FeatureCollection

      if (!collection.features.length) {
        onDraftChangeRef.current(null)

        return
      }

      if (collection.features.length === 1) {
        onDraftChangeRef.current(collection.features[0].geometry as GeoJsonGeometry)

        return
      }

      // Multiple drawn shapes: combine into a single MultiPolygon so the backend's
      // Polygon|MultiPolygon schema still accepts it.
      onDraftChangeRef.current({
        type: 'MultiPolygon',
        coordinates: collection.features.map(f => (f.geometry as GeoJSON.Polygon).coordinates)
      })
    }

    // Shared by the initial "load the saved boundary" below and by the applyToken effect
    // (loading a geometry typed into the coordinates textarea) — replaces whatever's
    // currently drawn, fits the map to it, and notifies the parent as if it were drawn by hand.
    const loadGeometry = (geometry: GeoJsonGeometry | null) => {
      drawnItems.clearLayers()

      if (geometry) {
        try {
          const geoJsonLayer = L.geoJSON(geometry as GeoJSON.Geometry)

          geoJsonLayer.eachLayer(layer => drawnItems.addLayer(layer))
          const bounds = geoJsonLayer.getBounds()

          if (bounds.isValid()) {
            map.fitBounds(bounds, { padding: [24, 24] })
          }
        } catch (err) {
          console.warn('Failed to render boundary polygon on the map:', err)
        }
      }

      emitDraft()
    }

    loadGeometryRef.current = loadGeometry

    // Seed the map with whatever's already saved, without treating it as a fresh "draft"
    // edit (no need to emit it back to the parent — it's already what the parent has).
    if (existingPolygon) {
      try {
        const geoJsonLayer = L.geoJSON(existingPolygon as GeoJSON.Geometry)

        geoJsonLayer.eachLayer(layer => drawnItems.addLayer(layer))
        const bounds = geoJsonLayer.getBounds()

        if (bounds.isValid()) {
          map.fitBounds(bounds, { padding: [24, 24] })
        }
      } catch (err) {
        console.warn('Failed to render existing boundary polygon on the map:', err)
      }
    }

    const drawControl = new L.Control.Draw({
      position: 'topright',
      edit: {
        featureGroup: drawnItems,
        remove: true
      },
      draw: {
        polygon: {
          allowIntersection: false,
          showArea: true,
          shapeOptions: { color: '#2563eb' }
        },
        polyline: false,
        rectangle: false,
        circle: false,
        circlemarker: false,
        marker: false
      }
    })

    map.addControl(drawControl)

    const handleCreated = (e: L.DrawEvents.Created) => {
      drawnItems.addLayer(e.layer)
      emitDraft()
    }

    const handleEdited = () => emitDraft()
    const handleDeleted = () => emitDraft()

    // Click directly on the boundary outline (not on a vertex or midpoint handle — those are
    // leaflet-draw's own markers, a separate layer group that receives the click instead of
    // this one) to insert a new point at that spot, while the shape is in Edit mode. Each
    // `L.Polygon` gets an `editing` controller attached automatically (leaflet-draw's
    // addInitHook); `.enabled()` on it is true only while its vertex handles are currently
    // shown, which is exactly when "click the line to add a point" should be live.
    const handleLineClick = (e: L.LeafletMouseEvent) => {
      // `drawnItems` is a FeatureGroup: it re-fires its children's events on itself so this
      // listener can catch them, but Leaflet's own `fire()` always overwrites `target` to be
      // the re-firing object (the FeatureGroup) on a propagated event — the *actual* layer
      // that was clicked is carried separately as `e.layer` (see `_propagateEvent` in
      // Leaflet's Evented mixin). Reading `e.target` here is the one-letter bug that made this
      // silently no-op: it was always the FeatureGroup, never `instanceof L.Polygon`.
      const layer = (e as L.LeafletMouseEvent & { layer?: L.Layer }).layer as L.Polygon | undefined

      if (!layer || !(layer instanceof L.Polygon)) return

      const editing = (layer as unknown as { editing?: { enabled: () => boolean; updateMarkers: () => void } }).editing

      if (!editing || !editing.enabled()) return

      const rawLatLngs = layer.getLatLngs()
      const isFlat = (L.Polyline as unknown as { _flat: (latlngs: unknown) => boolean })._flat(rawLatLngs)
      const ring = (isFlat ? rawLatLngs : (rawLatLngs as unknown[])[0]) as L.LatLng[]

      if (!Array.isArray(ring) || ring.length < 3) return

      let bestIndex = -1
      let bestDistSq = Infinity
      let bestPoint: L.Point | null = null

      for (let i = 0; i < ring.length; i++) {
        const a = map.latLngToLayerPoint(ring[i]!)
        const b = map.latLngToLayerPoint(ring[(i + 1) % ring.length]!)
        const { point, distSq } = closestPointOnSegment(e.layerPoint, a, b)

        if (distSq < bestDistSq) {
          bestDistSq = distSq
          bestIndex = i
          bestPoint = point
        }
      }

      if (bestIndex === -1 || !bestPoint || Math.sqrt(bestDistSq) > ADD_POINT_CLICK_TOLERANCE_PX) return

      const newLatLng = map.layerPointToLatLng(bestPoint)

      // Mutate the ring array IN PLACE rather than calling `layer.setLatLngs(...)` with a new
      // array. `getLatLngs()` returns the *live* `_latlngs` reference (not a copy), and
      // leaflet-draw's edit handler (`L.Edit.Poly`) caches that same reference once, at
      // `editing` setup time, as `this.latlngs` — it never re-reads `layer._latlngs` after
      // that. `setLatLngs()` replaces `_latlngs` with a brand-new array (`_convertLatLngs`),
      // which breaks that cached reference: the polygon's own data model gets the new point,
      // but leaflet-draw keeps building vertex markers from the old, now-orphaned array, so
      // nothing visibly changes. Splicing the shared array directly keeps both in sync.
      ring.splice(bestIndex + 1, 0, newLatLng)

      // `redraw()` re-projects and re-renders the path from the now-updated `_latlngs` —
      // needed because the splice above doesn't go through `setLatLngs()`, which is what
      // normally triggers it.
      layer.redraw()

      // Rebuild leaflet-draw's vertex/midpoint handles from the (now-updated, same-reference)
      // ring so the new point gets a draggable handle too.
      editing.updateMarkers()
      emitDraft()
    }

    map.on(L.Draw.Event.CREATED, handleCreated as L.LeafletEventHandlerFn)
    map.on(L.Draw.Event.EDITED, handleEdited)
    map.on(L.Draw.Event.DELETED, handleDeleted)
    drawnItems.on('click', handleLineClick as L.LeafletEventHandlerFn)

    return () => {
      map.off(L.Draw.Event.CREATED, handleCreated as L.LeafletEventHandlerFn)
      map.off(L.Draw.Event.EDITED, handleEdited)
      map.off(L.Draw.Event.DELETED, handleDeleted)
      drawnItems.off('click', handleLineClick as L.LeafletEventHandlerFn)
      map.removeControl(drawControl)
      map.removeLayer(drawnItems)
      drawnItemsRef.current = null
    }

    // Deliberately runs once per mount: the parent remounts this whole component (via
    // `key`) when the selected region/assembly changes, which is the reset point we want.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map])

  // Fires only when the parent bumps `applyToken` (the "Apply to Map" button), not on every
  // render or on the initial mount — the mount effect above already handles the first load.
  useEffect(() => {
    if (applyToken === lastAppliedTokenRef.current) return
    lastAppliedTokenRef.current = applyToken
    loadGeometryRef.current(applyGeometry ?? null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [applyToken])

  return null
}

interface BoundaryMapProps {

  /** Remount key — pass the selected region/assembly id so switching selection resets the draw layer. */
  entityKey: string
  polygon: GeoJsonGeometry | null
  onDraftChange: (geojson: GeoJsonGeometry | null) => void

  /**
   * Every OTHER already-drawn zone at the current level (other regions while editing a
   * region, or other assemblies in the selected region while editing an assembly) — rendered
   * read-only, each in its own color from ZONE_PALETTE, with its name on hover. Lets you see
   * at a glance which boundaries already exist and where the one you're drawing sits next to
   * them, without being able to accidentally edit them.
   */
  referenceZones?: ReferenceZone[]

  /** Geometry typed/pasted into the coordinates textarea, applied when `applyToken` bumps. */
  applyGeometry?: GeoJsonGeometry | null
  applyToken?: number
}

export default function BoundaryMap({
  entityKey,
  polygon,
  onDraftChange,
  referenceZones = [],
  applyGeometry,
  applyToken
}: BoundaryMapProps) {
  const drawnZones = referenceZones.filter(z => z.polygonGeoJson)

  return (
    <MapContainer center={GHANA_CENTER} zoom={GHANA_ZOOM} scrollWheelZoom className='h-full w-full'>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />

      {drawnZones.map(zone => (
        <GeoJSON
          key={`reference-${zone.id}`}
          data={zone.polygonGeoJson as GeoJSON.Geometry}
          style={{ color: REFERENCE_ZONE_COLOR, weight: 1, fillOpacity: 0.08 }}
          onEachFeature={(_feature, layer) => {
            layer.bindTooltip(`${zone.name} (${zone.code})`, { sticky: true })
          }}
        />
      ))}

      <DrawControl
        key={entityKey}
        existingPolygon={polygon}
        onDraftChange={onDraftChange}
        applyGeometry={applyGeometry}
        applyToken={applyToken}
      />
    </MapContainer>
  )
}
