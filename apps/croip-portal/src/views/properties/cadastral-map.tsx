'use client'

import { useMemo } from 'react'

import L from 'leaflet'
import { GeoJSON, MapContainer, TileLayer } from 'react-leaflet'

// Leaflet ships its own stylesheet; must be imported once in the client bundle for tiles
// and shapes to render with correct sizing/positioning.
import 'leaflet/dist/leaflet.css'

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

export const GHANA_CENTER: [number, number] = [7.9, -1.0]
export const GHANA_ZOOM = 7

export interface CadastralAssembly {
  id: string
  name: string
  code: string
  polygonGeoJson: GeoJSON.Geometry | null
}

export interface CadastralProperty {
  id: string
  code: string
  propertyName?: string | null
  assemblyId: string
  verificationStatus: string
  polygonGeoJson: GeoJSON.Geometry | null
}

const PROPERTY_BOUNDARY_COLOR = '#10b981'

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, char => {
    switch (char) {
      case '&':
        return '&amp;'
      case '<':
        return '&lt;'
      case '>':
        return '&gt;'
      case '"':
        return '&quot;'
      default:
        return '&#39;'
    }
  })
}

interface CadastralMapProps {
  assemblies: CadastralAssembly[]
  properties: CadastralProperty[]
  assemblyNameById: Map<string, string>
}

export default function CadastralMap({ assemblies, properties, assemblyNameById }: CadastralMapProps) {
  const assemblyFeatures = useMemo(() => assemblies.filter(a => a.polygonGeoJson), [assemblies])
  const propertyFeatures = useMemo(() => properties.filter(p => p.polygonGeoJson), [properties])

  return (
    <MapContainer center={GHANA_CENTER} zoom={GHANA_ZOOM} scrollWheelZoom className='h-full w-full'>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />

      {assemblyFeatures.map(assembly => (
        <GeoJSON
          key={`assembly-${assembly.id}`}
          data={assembly.polygonGeoJson as GeoJSON.Geometry}
          style={{ color: '#2563eb', weight: 1.5, fillOpacity: 0.03, dashArray: '4 3' }}
          onEachFeature={(_feature, layer) => {
            layer.bindTooltip(`${assembly.name} (${assembly.code})`, { sticky: true })
          }}
        />
      ))}

      {propertyFeatures.map(property => {
        const assemblyName = assemblyNameById.get(property.assemblyId) || 'Unassigned Assembly'
        const status = (property.verificationStatus || 'PENDING').toUpperCase()
        const popupHtml = `
          <div style="font-size:12px;line-height:1.5;min-width:160px">
            <strong>${escapeHtml(property.propertyName || 'Unnamed Property')}</strong><br/>
            <span style="font-family:monospace">${escapeHtml(property.code)}</span><br/>
            <span>${escapeHtml(assemblyName)}</span><br/>
            <span>${escapeHtml(status)}</span><br/>
            <a href="/properties/${property.id}" style="color:#2563eb;text-decoration:underline">View Property &rarr;</a>
          </div>
        `

        return (
          <GeoJSON
            key={`property-${property.id}`}
            data={property.polygonGeoJson as GeoJSON.Geometry}
            style={{
              color: PROPERTY_BOUNDARY_COLOR,
              weight: 2,
              fillOpacity: 0.25
            }}
            onEachFeature={(_feature, layer) => {
              layer.bindPopup(popupHtml)
            }}
          />
        )
      })}
    </MapContainer>
  )
}
