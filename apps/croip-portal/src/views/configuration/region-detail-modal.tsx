'use client'

import { useEffect, useState, useMemo } from 'react'
import dynamic from 'next/dynamic'
import {
  GlobeIcon,
  MapPinIcon,
  SaveIcon,
  PlusIcon,
  Trash2Icon,
  CheckCircle2Icon,
  Building2Icon,
  LayersIcon,
  RefreshCwIcon
} from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Spinner } from '@/components/ui/spinner'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import type { GeoJsonGeometry } from '@/views/configuration/zones/boundary-map'

const BoundaryMap = dynamic(() => import('@/views/configuration/zones/boundary-map'), {
  ssr: false,
  loading: () => (
    <div className='flex h-[400px] w-full items-center justify-center bg-muted/20 rounded-lg border'>
      <div className='flex flex-col items-center gap-2 text-muted-foreground'>
        <Spinner className='size-6 text-primary' />
        <span className='text-xs'>Loading boundary map...</span>
      </div>
    </div>
  )
})

export interface RegionDetailData {
  id: string
  code: string
  name: string
  polygonGeoJson?: any
  createdAt?: string
  metadata?: {
    capital?: string
    zone?: string
    mmdaCount?: number
    country?: string
    status?: string
    [key: string]: any
  }
  assemblies?: Array<{ id: string; code: string; name: string; category?: string }>
}

interface RegionDetailModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  region: RegionDetailData | null
  onSaved?: () => void
}

function extractRingPoints(geometry: any): { lat: number; lng: number }[] {
  if (!geometry) return []
  let ring: [number, number][] = []

  if (geometry.type === 'Polygon' && Array.isArray(geometry.coordinates?.[0])) {
    ring = geometry.coordinates[0]
  } else if (geometry.type === 'MultiPolygon' && Array.isArray(geometry.coordinates?.[0]?.[0])) {
    ring = geometry.coordinates[0][0]
  }

  if (!ring.length) return []

  // Strip closing point if identical to first
  const isClosed =
    ring.length > 2 &&
    ring[0][0] === ring[ring.length - 1][0] &&
    ring[0][1] === ring[ring.length - 1][1]

  const editingRing = isClosed ? ring.slice(0, -1) : ring

  return editingRing.map(([lng, lat]) => ({
    lat: Number(Number(lat).toFixed(6)),
    lng: Number(Number(lng).toFixed(6))
  }))
}

function pointsToPolygon(points: { lat: number; lng: number }[]): GeoJsonGeometry | null {
  if (points.length < 3) return null

  const coords = points.map(p => [Number(p.lng), Number(p.lat)])
  const first = coords[0]
  const last = coords[coords.length - 1]

  if (first[0] !== last[0] || first[1] !== last[1]) {
    coords.push([first[0], first[1]])
  }

  return {
    type: 'Polygon',
    coordinates: [coords]
  }
}

export function RegionDetailModal({
  open,
  onOpenChange,
  region,
  onSaved
}: RegionDetailModalProps) {
  const [code, setCode] = useState('')
  const [name, setName] = useState('')
  const [draftPolygon, setDraftPolygon] = useState<GeoJsonGeometry | null>(null)
  const [points, setPoints] = useState<{ lat: number; lng: number }[]>([])
  const [applyToken, setApplyToken] = useState(0)
  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState<'map' | 'points'>('map')

  // When region changes, initialize state
  useEffect(() => {
    if (region) {
      setCode(region.code || '')
      setName(region.name || '')
      const initialPoly = region.polygonGeoJson || null
      setDraftPolygon(initialPoly)
      setPoints(extractRingPoints(initialPoly))
    }
  }, [region])

  const handleMapDraftChange = (newGeoJson: GeoJsonGeometry | null) => {
    setDraftPolygon(newGeoJson)
    setPoints(extractRingPoints(newGeoJson))
  }

  const handlePointChange = (index: number, field: 'lat' | 'lng', val: string) => {
    const num = parseFloat(val)
    const next = [...points]
    next[index] = { ...next[index], [field]: isNaN(num) ? 0 : num }
    setPoints(next)
  }

  const handleAddPoint = () => {
    const last = points[points.length - 1] || { lat: 7.9, lng: -1.0 }
    setPoints([...points, { lat: Number((last.lat + 0.01).toFixed(6)), lng: Number((last.lng + 0.01).toFixed(6)) }])
  }

  const handleDeletePoint = (index: number) => {
    if (points.length <= 3) {
      toast.error('A boundary polygon must have at least 3 points')
      return
    }
    const next = points.filter((_, i) => i !== index)
    setPoints(next)
    const updatedPoly = pointsToPolygon(next)
    setDraftPolygon(updatedPoly)
    setApplyToken(t => t + 1)
  }

  const handleApplyPointsToMap = () => {
    if (points.length < 3) {
      toast.error('At least 3 valid coordinate points are required to form a polygon')
      return
    }
    const updatedPoly = pointsToPolygon(points)
    setDraftPolygon(updatedPoly)
    setApplyToken(t => t + 1)
    setActiveTab('map')
    toast.success('Applied points to map boundary')
  }

  const handleSave = async () => {
    if (!region) return
    if (!code.trim()) {
      toast.error('Region code cannot be empty')
      return
    }
    if (!name.trim()) {
      toast.error('Region name cannot be empty')
      return
    }

    setSaving(true)
    try {
      const res = await fetch(`/api/geo/regions/${encodeURIComponent(region.id)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: code.trim().toUpperCase(),
          name: name.trim(),
          polygonGeoJson: draftPolygon
        })
      })

      const json = await res.json()
      if (json.success) {
        toast.success(`Region "${name.trim()}" and boundary points saved successfully`)
        onOpenChange(false)
        onSaved?.()
      } else {
        toast.error(json.error || 'Failed to update region')
      }
    } catch (err: any) {
      toast.error(err.message || 'Network error updating region')
    } finally {
      setSaving(false)
    }
  }

  if (!region) return null

  const mmdaCount = region.metadata?.mmdaCount ?? region.assemblies?.length ?? 0
  const zone = region.metadata?.zone || 'National'

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-4xl lg:max-w-5xl max-h-[92vh] flex flex-col p-0 overflow-hidden'>
        {/* Header */}
        <div className='p-5 border-b bg-muted/20'>
          <DialogHeader>
            <div className='flex items-center justify-between gap-4'>
              <div className='flex items-center gap-2.5'>
                <div className='size-9 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0'>
                  <GlobeIcon className='size-5' />
                </div>
                <div>
                  <DialogTitle className='text-lg font-bold text-foreground flex items-center gap-2'>
                    {name || region.name}
                    <Badge variant='outline' className='font-mono text-xs uppercase'>
                      {code || region.code}
                    </Badge>
                  </DialogTitle>
                  <DialogDescription className='text-xs text-muted-foreground mt-0.5'>
                    View and update regional metadata and modify boundary coordinate points directly on the GIS map.
                  </DialogDescription>
                </div>
              </div>
              <div className='flex items-center gap-2'>
                <Badge variant='outline' className='bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20 text-xs font-medium'>
                  <CheckCircle2Icon className='size-3 mr-1' />
                  Operational
                </Badge>
              </div>
            </div>
          </DialogHeader>
        </div>

        {/* Content Body */}
        <div className='flex-1 overflow-y-auto p-5 grid grid-cols-1 lg:grid-cols-12 gap-5'>
          {/* Left Column: Properties and Coordinates */}
          <div className='lg:col-span-5 flex flex-col gap-4'>
            {/* General Info Card */}
            <div className='p-4 rounded-lg border bg-card/60 shadow-2xs space-y-3.5'>
              <h3 className='text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5'>
                <Building2Icon className='size-3.5 text-primary' />
                Region Details
              </h3>

              <div className='grid gap-3 text-xs'>
                <div className='grid gap-1.5'>
                  <Label htmlFor='region-code' className='text-xs font-medium'>
                    Region Code
                  </Label>
                  <Input
                    id='region-code'
                    value={code}
                    onChange={e => setCode(e.target.value.toUpperCase())}
                    className='font-mono text-xs uppercase'
                    placeholder='e.g. WER'
                    maxLength={20}
                  />
                </div>

                <div className='grid gap-1.5'>
                  <Label htmlFor='region-name' className='text-xs font-medium'>
                    Region Name
                  </Label>
                  <Input
                    id='region-name'
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className='text-xs'
                    placeholder='e.g. Western Region'
                  />
                </div>

                <div className='grid grid-cols-2 gap-2 pt-1'>
                  <div className='p-2.5 rounded-md bg-muted/30 border text-[11px]'>
                    <span className='text-muted-foreground block'>Constituent MMDAs</span>
                    <span className='font-bold text-sm text-foreground'>{mmdaCount} Assemblies</span>
                  </div>
                  <div className='p-2.5 rounded-md bg-muted/30 border text-[11px]'>
                    <span className='text-muted-foreground block'>Geographic Belt</span>
                    <span className='font-bold text-sm text-foreground truncate'>{zone}</span>
                  </div>
                </div>

                <div className='text-[11px] text-muted-foreground pt-1 flex items-center justify-between border-t'>
                  <span>Database ID:</span>
                  <span className='font-mono text-[10px]'>{region.id.slice(0, 8)}...{region.id.slice(-4)}</span>
                </div>
              </div>
            </div>

            {/* Boundary Vertices / Point Editor Card */}
            <div className='p-4 rounded-lg border bg-card/60 shadow-2xs flex-1 flex flex-col'>
              <div className='flex items-center justify-between mb-2.5'>
                <h3 className='text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5'>
                  <LayersIcon className='size-3.5 text-primary' />
                  Boundary Points ({points.length})
                </h3>
                <Button size='sm' variant='outline' className='h-7 text-xs px-2' onClick={handleAddPoint}>
                  <PlusIcon className='size-3 mr-1' />
                  Add Point
                </Button>
              </div>

              <p className='text-[11px] text-muted-foreground mb-3'>
                Drag vertex handles on the map to modify points, or adjust coordinate numbers below:
              </p>

              <div className='flex-1 overflow-y-auto max-h-[220px] rounded border bg-background/50 divide-y'>
                {points.length === 0 ? (
                  <div className='p-4 text-center text-xs text-muted-foreground'>
                    No boundary points drawn yet. Use the polygon tool on the map to draw.
                  </div>
                ) : (
                  points.map((pt, idx) => (
                    <div key={idx} className='p-2 flex items-center gap-2 text-xs hover:bg-muted/30 transition-colors'>
                      <span className='size-5 rounded-full bg-primary/10 text-primary font-mono text-[10px] flex items-center justify-center shrink-0'>
                        {idx + 1}
                      </span>
                      <div className='grid grid-cols-2 gap-1.5 flex-1 min-w-0'>
                        <div className='flex items-center gap-1'>
                          <span className='text-[10px] text-muted-foreground font-mono'>Lat:</span>
                          <Input
                            type='number'
                            step='any'
                            value={pt.lat}
                            onChange={e => handlePointChange(idx, 'lat', e.target.value)}
                            className='h-6.5 text-[11px] font-mono p-1'
                          />
                        </div>
                        <div className='flex items-center gap-1'>
                          <span className='text-[10px] text-muted-foreground font-mono'>Lng:</span>
                          <Input
                            type='number'
                            step='any'
                            value={pt.lng}
                            onChange={e => handlePointChange(idx, 'lng', e.target.value)}
                            className='h-6.5 text-[11px] font-mono p-1'
                          />
                        </div>
                      </div>
                      <Button
                        size='icon'
                        variant='ghost'
                        className='size-6 text-muted-foreground hover:text-destructive shrink-0'
                        onClick={() => handleDeletePoint(idx)}
                        title='Delete Point'
                      >
                        <Trash2Icon className='size-3' />
                      </Button>
                    </div>
                  ))
                )}
              </div>

              {points.length > 0 && (
                <Button
                  size='sm'
                  variant='secondary'
                  className='mt-2.5 text-xs h-7.5 w-full'
                  onClick={handleApplyPointsToMap}
                >
                  <RefreshCwIcon className='size-3 mr-1.5' />
                  Apply Points to Map
                </Button>
              )}
            </div>
          </div>

          {/* Right Column: Interactive Map */}
          <div className='lg:col-span-7 flex flex-col h-[460px] lg:h-auto rounded-lg border overflow-hidden relative shadow-inner'>
            <div className='p-2.5 bg-muted/40 border-b flex items-center justify-between text-xs z-10'>
              <span className='font-medium text-foreground flex items-center gap-1.5'>
                <MapPinIcon className='size-3.5 text-primary' />
                Interactive GIS Boundary Map
              </span>
              <span className='text-[11px] text-muted-foreground font-mono'>
                {points.length} Vertices • Leaflet Draw Active
              </span>
            </div>

            <div className='flex-1 w-full h-full relative'>
              <BoundaryMap
                entityKey={`modal-region-${region.id}`}
                polygon={draftPolygon}
                onDraftChange={handleMapDraftChange}
                applyGeometry={draftPolygon}
                applyToken={applyToken}
              />
            </div>

            <div className='p-2 bg-muted/30 border-t text-[11px] text-muted-foreground flex items-center justify-between px-3'>
              <span>Tip: Click & drag vertices to edit points, click line to add vertex.</span>
              <Badge variant='outline' className='text-[10px]'>
                EPSG:4326 (WGS84)
              </Badge>
            </div>
          </div>
        </div>

        {/* Footer */}
        <DialogFooter className='p-4 border-t bg-muted/10 gap-2 sm:gap-2'>
          <Button
            type='button'
            variant='outline'
            size='sm'
            onClick={() => onOpenChange(false)}
            disabled={saving}
            className='text-xs'
          >
            Cancel
          </Button>
          <Button
            type='button'
            size='sm'
            onClick={handleSave}
            disabled={saving}
            className='text-xs font-medium'
          >
            {saving ? <Spinner className='size-3 mr-1.5' /> : <SaveIcon className='size-3.5 mr-1.5' />}
            Save Region &amp; Boundary
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
