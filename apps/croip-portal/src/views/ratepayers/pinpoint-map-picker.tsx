'use client'

import { useEffect, useMemo, useState } from 'react'
import L from 'leaflet'
import { MapContainer, Marker, TileLayer, useMapEvents, useMap } from 'react-leaflet'

import 'leaflet/dist/leaflet.css'

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

interface PinpointMapPickerProps {
  initialLat?: number
  initialLng?: number
  onLocationSelect: (lat: number, lng: number) => void
}

function LocationMarker({
  position,
  onPositionChange
}: {
  position: [number, number] | null
  onPositionChange: (pos: [number, number]) => void
}) {
  const map = useMapEvents({
    click(e) {
      onPositionChange([e.latlng.lat, e.latlng.lng])
    }
  })

  useEffect(() => {
    if (position) {
      map.panTo(position, { animate: true })
    }
  }, [position, map])

  const eventHandlers = useMemo(
    () => ({
      dragend(e: any) {
        const marker = e.target
        if (marker != null) {
          const latlng = marker.getLatLng()
          onPositionChange([latlng.lat, latlng.lng])
        }
      }
    }),
    [onPositionChange]
  )

  if (!position) return null

  return (
    <Marker
      position={position}
      draggable={true}
      eventHandlers={eventHandlers}
    />
  )
}

export default function PinpointMapPicker({
  initialLat = 5.6037,
  initialLng = -0.1870,
  onLocationSelect
}: PinpointMapPickerProps) {
  const [position, setPosition] = useState<[number, number]>([initialLat, initialLng])

  const handlePositionChange = (pos: [number, number]) => {
    setPosition(pos)
    onLocationSelect(pos[0], pos[1])
  }

  return (
    <div className="relative w-full h-[280px] rounded-lg overflow-hidden border border-border shadow-xs">
      <MapContainer
        center={[initialLat, initialLng]}
        zoom={13}
        scrollWheelZoom={true}
        className="w-full h-full z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker position={position} onPositionChange={handlePositionChange} />
      </MapContainer>
      <div className="absolute bottom-2 left-2 z-10 bg-background/90 backdrop-blur-xs px-2.5 py-1 rounded text-[11px] font-mono border border-border/60 shadow-xs pointer-events-none">
        Lat: {position[0].toFixed(5)}, Lng: {position[1].toFixed(5)}
      </div>
      <div className="absolute top-2 right-2 z-10 bg-background/90 backdrop-blur-xs px-2 py-0.5 rounded text-[10px] text-muted-foreground border border-border/60 shadow-xs pointer-events-none">
        Click or drag pin to position
      </div>
    </div>
  )
}
