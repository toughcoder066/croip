'use client'

import { useEffect, useMemo } from 'react'
import L from 'leaflet'
import { GeoJSON, MapContainer, TileLayer, useMap } from 'react-leaflet'
import { MapPinIcon, LayersIcon, Maximize2Icon } from 'lucide-react'

import 'leaflet/dist/leaflet.css'

import markerIcon2xAsset from 'leaflet/dist/images/marker-icon-2x.png'
import markerIconAsset from 'leaflet/dist/images/marker-icon.png'
import markerShadowAsset from 'leaflet/dist/images/marker-shadow.png'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

type StaticImg = string | { src: string }
const assetUrl = (asset: StaticImg) => (typeof asset === 'string' ? asset : asset.src)

delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: assetUrl(markerIcon2xAsset as StaticImg),
  iconUrl: assetUrl(markerIconAsset as StaticImg),
  shadowUrl: assetUrl(markerShadowAsset as StaticImg)
})

const GHANA_CENTER: [number, number] = [7.9, -1.0]
const GHANA_ZOOM = 7

interface FitPolygonProps {
  polygonData: any
}

function FitPolygonBounds({ polygonData }: FitPolygonProps) {
  const map = useMap()

  useEffect(() => {
    if (!polygonData) return
    try {
      const geoLayer = L.geoJSON(polygonData)
      const bounds = geoLayer.getBounds()
      if (bounds.isValid()) {
        map.fitBounds(bounds, { padding: [45, 45], maxZoom: 18 })
      }
    } catch (err) {
      console.warn('Failed to fit bounds to polygon data:', err)
    }
  }, [map, polygonData])

  return null
}

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

export interface PropertyPolygonMapProps {
  polygonGeoJson?: any
  propertyName?: string | null
  propertyCode: string
  assemblyName?: string
  verificationStatus?: string
}

export default function PropertyPolygonMap({
  polygonGeoJson,
  propertyName,
  propertyCode,
  assemblyName,
  verificationStatus
}: PropertyPolygonMapProps) {
  const normalizedGeoJson = useMemo(() => {
    if (!polygonGeoJson) return null
    if (typeof polygonGeoJson === 'string') {
      try {
        return JSON.parse(polygonGeoJson)
      } catch {
        return null
      }
    }
    return polygonGeoJson
  }, [polygonGeoJson])

  const hasCoordinates = useMemo(() => {
    if (!normalizedGeoJson) return false
    const coords =
      normalizedGeoJson.coordinates ||
      normalizedGeoJson.geometry?.coordinates ||
      normalizedGeoJson.features?.[0]?.geometry?.coordinates
    return Array.isArray(coords) && coords.length > 0
  }, [normalizedGeoJson])

  const pointCount = useMemo(() => {
    if (!hasCoordinates) return 0
    try {
      const coords =
        normalizedGeoJson.coordinates ||
        normalizedGeoJson.geometry?.coordinates ||
        normalizedGeoJson.features?.[0]?.geometry?.coordinates
      if (Array.isArray(coords[0])) {
        return coords[0].length
      }
      return coords.length
    } catch {
      return 0
    }
  }, [hasCoordinates, normalizedGeoJson])

  if (!hasCoordinates) {
    return (
      <div className='flex flex-col items-center justify-center h-[340px] w-full bg-muted/15 border border-dashed rounded-lg p-6 text-center'>
        <div className='size-12 rounded-full bg-muted flex items-center justify-center text-muted-foreground mb-3'>
          <MapPinIcon className='size-6 opacity-60' />
        </div>
        <h4 className='text-sm font-semibold text-foreground mb-1'>No Boundary Polygon Mapped</h4>
        <p className='text-xs text-muted-foreground max-w-sm'>
          This property parcel does not have GIS boundary coordinates registered in the system yet.
        </p>
      </div>
    )
  }

  const popupContent = `
    <div style="font-family: inherit; font-size: 12px; line-height: 1.5; min-width: 170px; padding: 2px;">
      <div style="font-weight: 700; font-size: 13px; color: #0f172a;">${escapeHtml(propertyName || 'Property Parcel')}</div>
      <div style="font-family: monospace; font-size: 11px; color: #64748b; margin-top: 2px;">${escapeHtml(propertyCode)}</div>
      ${assemblyName ? `<div style="font-size: 11px; color: #334155; margin-top: 4px;"><strong>Jurisdiction:</strong> ${escapeHtml(assemblyName)}</div>` : ''}
      <div style="margin-top: 6px; display: inline-block; padding: 2px 6px; border-radius: 4px; font-size: 10px; font-weight: 600; background: #ecfdf5; color: #059669; border: 1px solid #a7f3d0;">
        ${escapeHtml(verificationStatus || 'Active')}
      </div>
    </div>
  `

  return (
    <div className='relative h-[420px] w-full rounded-lg overflow-hidden border bg-background'>
      {/* Top Overlay Stats Ribbon */}
      <div className='absolute top-3 left-3 z-[1000] flex items-center gap-2 pointer-events-none'>
        <Badge variant='outline' className='bg-background/90 backdrop-blur-xs shadow-xs text-xs font-medium border-border/80 text-foreground flex items-center gap-1.5 pointer-events-auto'>
          <LayersIcon className='size-3 text-primary' />
          {pointCount > 0 ? `${pointCount} Boundary Vertices` : 'Polygon Mapped'}
        </Badge>
        {assemblyName && (
          <Badge variant='outline' className='bg-background/90 backdrop-blur-xs shadow-xs text-xs font-medium border-border/80 text-muted-foreground pointer-events-auto max-w-[200px] truncate'>
            {assemblyName}
          </Badge>
        )}
      </div>

      <MapContainer
        center={GHANA_CENTER}
        zoom={GHANA_ZOOM}
        scrollWheelZoom
        className='h-full w-full z-0'
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />

        <FitPolygonBounds polygonData={normalizedGeoJson} />

        <GeoJSON
          key={JSON.stringify(normalizedGeoJson)}
          data={normalizedGeoJson}
          style={{
            color: '#10b981',
            weight: 3,
            fillColor: '#10b981',
            fillOpacity: 0.28
          }}
          onEachFeature={(_feature, layer) => {
            layer.bindPopup(popupContent)
            layer.bindTooltip(`${propertyCode} • Boundary`, { sticky: true })
          }}
        />
      </MapContainer>
    </div>
  )
}
