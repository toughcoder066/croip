'use client'

import { useEffect, useMemo, useState } from 'react'

import dynamic from 'next/dynamic'
import { CodeIcon, ListPlusIcon, PlusIcon, SaveIcon, Trash2Icon } from 'lucide-react'
import { toast } from 'sonner'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { PageLoader, Spinner } from '@/components/ui/spinner'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'

import type { GeoJsonGeometry, ReferenceZone } from '@/views/configuration/zones/boundary-map'

// react-leaflet's <MapContainer> touches `window` at module scope, which breaks Next.js'
// server-side prerendering of this page. Loading it via next/dynamic with ssr:false keeps
// it out of the server bundle entirely — it only ever mounts in the browser.
const BoundaryMap = dynamic(() => import('@/views/configuration/zones/boundary-map'), {
  ssr: false,
  loading: () => (
    <div className='flex h-full w-full items-center justify-center'>
      <Spinner className='size-6 text-primary' />
    </div>
  )
})

interface RegionRecord {
  id: string
  code: string
  name: string
  polygonGeoJson: GeoJsonGeometry | null
  createdAt: string
  updatedAt?: string
}

interface AssemblyRecord {
  id: string
  regionId: string
  code: string
  name: string
  category: 'METROPOLITAN' | 'MUNICIPAL' | 'DISTRICT'
  polygonGeoJson: GeoJsonGeometry | null
  createdAt: string
  updatedAt?: string
}

type SelectionMode = 'region' | 'assembly'

// Pulls the exterior ring out of a simple Polygon for the vertex-form tab, dropping the
// closing point if the ring already repeats its first vertex at the end — the form always
// re-derives that closing point itself. Returns null for anything that isn't a plain
// Polygon (no MultiPolygon support in the form — use the Text tab for those).
function exteriorRingVertices(geometry: GeoJsonGeometry | null | undefined): [number, number][] | null {
  if (!geometry || geometry.type !== 'Polygon') return null
  const ring = geometry.coordinates?.[0]
  if (!Array.isArray(ring) || ring.length < 3) return []
  const [firstLng, firstLat] = ring[0]
  const [lastLng, lastLat] = ring[ring.length - 1]
  const isClosed = firstLng === lastLng && firstLat === lastLat
  return isClosed ? ring.slice(0, -1) : ring
}

/**
 * GIS boundary editor for Ghana's regions and MMDAs.
 *
 * This is a SEPARATE, map-based system from the legacy flat
 * Configuration > Assemblies / Configuration > Regions screens (which manage
 * name/code/region-label metadata with no polygon support via the generic
 * `/v1/reference-data` endpoint). Here, regions and assemblies are their own dataset in
 * Shared Services that additionally carries a `polygonGeoJson` boundary — so this
 * dropdown intentionally starts empty until boundaries are created/drawn here.
 */
export default function ZonesBoundaryEditorPage() {
  const [regions, setRegions] = useState<RegionRecord[]>([])
  const [assemblies, setAssemblies] = useState<AssemblyRecord[]>([])
  const [loadingRegions, setLoadingRegions] = useState(true)
  const [loadingAssemblies, setLoadingAssemblies] = useState(false)

  const [selectedRegionId, setSelectedRegionId] = useState('')
  const [selectedAssemblyId, setSelectedAssemblyId] = useState('')
  const [mode, setMode] = useState<SelectionMode>('region')

  const [draft, setDraft] = useState<GeoJsonGeometry | null>(null)
  const [saving, setSaving] = useState(false)

  // Create-region dialog
  const [regionDialogOpen, setRegionDialogOpen] = useState(false)
  const [newRegionCode, setNewRegionCode] = useState('')
  const [newRegionName, setNewRegionName] = useState('')
  const [creatingRegion, setCreatingRegion] = useState(false)

  // Create-assembly dialog
  const [assemblyDialogOpen, setAssemblyDialogOpen] = useState(false)
  const [newAssemblyCode, setNewAssemblyCode] = useState('')
  const [newAssemblyName, setNewAssemblyName] = useState('')
  const [newAssemblyCategory, setNewAssemblyCategory] = useState<'METROPOLITAN' | 'MUNICIPAL' | 'DISTRICT'>('DISTRICT')
  const [creatingAssembly, setCreatingAssembly] = useState(false)

  // Raw-coordinates panel: lets a user paste/type a GeoJSON Polygon/MultiPolygon geometry
  // directly (e.g. from a surveyor's coordinate list) instead of drawing freehand, and shows
  // the currently drawn boundary's coordinates as text. applyToken increments on every
  // "Apply to Map" click to tell the map a new geometry should be loaded even if its value
  // happens to match what's already drawn.
  const [coordsMode, setCoordsMode] = useState<'text' | 'form'>('text')
  const [coordsText, setCoordsText] = useState('')
  const [applyGeometry, setApplyGeometry] = useState<GeoJsonGeometry | null>(null)
  const [applyToken, setApplyToken] = useState(0)

  // Vertex-by-vertex form: one row per coordinate, in ring order. The first row doubles as
  // the closing point — applying the form appends a copy of row 1 to the end of the ring
  // automatically, so the polygon is always closed without the user re-entering it.
  const [vertexRows, setVertexRows] = useState<{ lng: string; lat: string }[]>([{ lng: '', lat: '' }])

  const fetchRegions = async () => {
    setLoadingRegions(true)

    try {
      const res = await fetch('/api/geo/regions')
      const json = await res.json()

      if (json.success) {
        setRegions(json.data)
      } else {
        toast.error(json.error || 'Failed to load regions')
      }
    } catch {
      toast.error('Network error loading regions')
    } finally {
      setLoadingRegions(false)
    }
  }

  const fetchAssemblies = async (regionId: string) => {
    setLoadingAssemblies(true)

    try {
      const res = await fetch(`/api/geo/assemblies?regionId=${encodeURIComponent(regionId)}`)
      const json = await res.json()

      if (json.success) {
        setAssemblies(json.data)
      } else {
        toast.error(json.error || 'Failed to load assemblies')
      }
    } catch {
      toast.error('Network error loading assemblies')
    } finally {
      setLoadingAssemblies(false)
    }
  }

  useEffect(() => {
    fetchRegions()
  }, [])

  useEffect(() => {
    setDraft(null)
    setSelectedAssemblyId('')

    if (selectedRegionId) {
      fetchAssemblies(selectedRegionId)
    } else {
      setAssemblies([])
    }
     
  }, [selectedRegionId])

  useEffect(() => {
    setDraft(null)
  }, [selectedAssemblyId, mode])

  const selectedRegion = useMemo(() => regions.find(r => r.id === selectedRegionId) || null, [regions, selectedRegionId])

  const selectedAssembly = useMemo(
    () => assemblies.find(a => a.id === selectedAssemblyId) || null,
    [assemblies, selectedAssemblyId]
  )

  const activeEntity = mode === 'assembly' ? selectedAssembly : selectedRegion
  const activeEntityLabel = mode === 'assembly' ? 'Assembly' : 'Region'
  const activeEntityId = mode === 'assembly' ? selectedAssemblyId : selectedRegionId

  // Keep the coordinates textarea in sync with whatever's on the map — the drawn draft if
  // there's an in-progress edit, otherwise the active entity's already-saved boundary — so it
  // always reflects what's shown rather than going stale or sitting empty on first load.
  useEffect(() => {
    const geometry = draft ?? activeEntity?.polygonGeoJson ?? null
    setCoordsText(geometry ? JSON.stringify(geometry, null, 2) : '')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draft, activeEntity])

  // Pre-fill the vertex form from the active entity's already-saved boundary, same as the
  // Text tab. Keyed only on the entity id (not on every draft edit) so typing into a row
  // never gets clobbered by a re-sync mid-keystroke.
  useEffect(() => {
    const vertices = exteriorRingVertices(activeEntity?.polygonGeoJson ?? null)
    setVertexRows(
      vertices && vertices.length
        ? vertices.map(([lng, lat]) => ({ lng: String(lng), lat: String(lat) }))
        : [{ lng: '', lat: '' }]
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeEntityId])

  const handleAddVertexRow = () => setVertexRows(rows => [...rows, { lng: '', lat: '' }])

  const handleRemoveVertexRow = (index: number) =>
    setVertexRows(rows => (rows.length <= 1 ? rows : rows.filter((_, i) => i !== index)))

  const handleVertexFieldChange = (index: number, field: 'lng' | 'lat', value: string) =>
    setVertexRows(rows => rows.map((row, i) => (i === index ? { ...row, [field]: value } : row)))

  // Read-only reference layers for the map: every OTHER already-drawn zone at the current
  // level, so you can see what exists around the one you're editing. Regions while editing a
  // region; assemblies within the selected region while editing an assembly.
  const referenceZones: ReferenceZone[] = useMemo(() => {
    if (mode === 'assembly') {
      return assemblies.filter(a => a.id !== selectedAssemblyId)
    }
    return regions.filter(r => r.id !== selectedRegionId)
  }, [mode, assemblies, selectedAssemblyId, regions, selectedRegionId])

  const handleSave = async () => {
    if (!activeEntity) {
      toast.error(`Select a ${activeEntityLabel.toLowerCase()} first`)

      return
    }

    if (!draft) {
      toast.error('Draw or edit a boundary on the map before saving')

      return
    }

    setSaving(true)

    try {
      const endpoint =
        mode === 'assembly'
          ? `/api/geo/assemblies/${activeEntity.id}/boundary`
          : `/api/geo/regions/${activeEntity.id}/boundary`

      const res = await fetch(endpoint, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ polygonGeoJson: draft })
      })

      const json = await res.json()

      if (json.success) {
        toast.success(`Boundary saved for ${activeEntity.name}`)

        if (mode === 'assembly') {
          await fetchAssemblies(selectedRegionId)
        } else {
          await fetchRegions()
        }
      } else {
        toast.error(json.error || 'Failed to save boundary')
      }
    } catch {
      toast.error('Network error saving boundary')
    } finally {
      setSaving(false)
    }
  }

  const handleCreateRegion = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!newRegionCode.trim() || !newRegionName.trim()) {
      toast.error('Code and name are required')

      return
    }

    setCreatingRegion(true)

    try {
      const res = await fetch('/api/geo/regions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: newRegionCode.trim().toUpperCase(), name: newRegionName.trim() })
      })

      const json = await res.json()

      if (json.success) {
        toast.success(`Region "${json.data.name}" created`)
        setRegionDialogOpen(false)
        setNewRegionCode('')
        setNewRegionName('')
        await fetchRegions()
        setMode('region')
        setSelectedRegionId(json.data.id)
      } else {
        toast.error(json.error || 'Failed to create region')
      }
    } catch {
      toast.error('Network error creating region')
    } finally {
      setCreatingRegion(false)
    }
  }

  const handleCreateAssembly = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedRegionId) {
      toast.error('Select a region first')

      return
    }

    if (!newAssemblyCode.trim() || !newAssemblyName.trim()) {
      toast.error('Code and name are required')

      return
    }

    setCreatingAssembly(true)

    try {
      const res = await fetch('/api/geo/assemblies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          regionId: selectedRegionId,
          code: newAssemblyCode.trim().toUpperCase(),
          name: newAssemblyName.trim(),
          category: newAssemblyCategory
        })
      })

      const json = await res.json()

      if (json.success) {
        toast.success(`Assembly "${json.data.name}" created`)
        setAssemblyDialogOpen(false)
        setNewAssemblyCode('')
        setNewAssemblyName('')
        await fetchAssemblies(selectedRegionId)
        setMode('assembly')
        setSelectedAssemblyId(json.data.id)
      } else {
        toast.error(json.error || 'Failed to create assembly')
      }
    } catch {
      toast.error('Network error creating assembly')
    } finally {
      setCreatingAssembly(false)
    }
  }

  const handleApplyCoords = () => {
    if (!activeEntity) {
      toast.error(`Select a ${activeEntityLabel.toLowerCase()} first`)

      return
    }

    let parsed: unknown

    try {
      parsed = JSON.parse(coordsText)
    } catch {
      toast.error('Not valid JSON — paste a GeoJSON Polygon or MultiPolygon geometry')

      return
    }

    const geometry = parsed as Partial<GeoJsonGeometry>

    if (!geometry || (geometry.type !== 'Polygon' && geometry.type !== 'MultiPolygon') || !Array.isArray(geometry.coordinates)) {
      toast.error('Must be a GeoJSON geometry with "type": "Polygon" or "MultiPolygon" and a "coordinates" array')

      return
    }

    setApplyGeometry(geometry as GeoJsonGeometry)
    setApplyToken(t => t + 1)
    toast.success('Coordinates applied to the map — review the shape, then Save Boundary')
  }

  const validVertexCount = vertexRows.filter(
    row => row.lng.trim() !== '' && row.lat.trim() !== '' && Number.isFinite(parseFloat(row.lng)) && Number.isFinite(parseFloat(row.lat))
  ).length

  const handleApplyVertexForm = () => {
    if (!activeEntity) {
      toast.error(`Select a ${activeEntityLabel.toLowerCase()} first`)

      return
    }

    const points = vertexRows
      .map(row => ({ lng: parseFloat(row.lng), lat: parseFloat(row.lat) }))
      .filter(p => Number.isFinite(p.lng) && Number.isFinite(p.lat))

    if (points.length < 3) {
      toast.error('Add at least 3 coordinates to form a closed polygon')

      return
    }

    // Row 1 is both the start and, implicitly, the close — repeat it at the end of the ring
    // so the caller never has to enter it twice.
    const ring = [...points.map(p => [p.lng, p.lat]), [points[0]!.lng, points[0]!.lat]]

    setApplyGeometry({ type: 'Polygon', coordinates: [ring] })
    setApplyToken(t => t + 1)
    toast.success('Coordinates applied to the map — review the shape, then Save Boundary')
  }

  const handleApplyActiveCoords = coordsMode === 'text' ? handleApplyCoords : handleApplyVertexForm
  const canApplyCoords = Boolean(activeEntity) && (coordsMode === 'text' ? coordsText.trim().length > 0 : validVertexCount >= 3)

  if (loadingRegions) {
    return <PageLoader />
  }

  const mapPolygon = activeEntity?.polygonGeoJson ?? null

  return (
    <div className='flex flex-col gap-6'>
      {/* Header */}
      <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-border/40'>
        <div>
          <h1 className='text-2xl font-bold tracking-tight text-foreground'>Zones & Boundaries</h1>
          <p className='text-xs text-muted-foreground mt-0.5'>
            Draw and edit GIS boundary polygons for regions and MMDAs, backed by Shared Services (:3004).
          </p>
        </div>
      </div>

      <div className='grid grid-cols-1 items-start lg:grid-cols-[320px_1fr] gap-6'>
        {/* Left sidebar: selection + create + test panel */}
        <div className='flex flex-col gap-4'>
          <Card>
            <CardHeader>
              <CardTitle className='text-sm font-semibold'>Select Zone</CardTitle>
              <CardDescription className='text-xs'>Pick a region, then optionally an assembly within it.</CardDescription>
            </CardHeader>
            <CardContent className='flex flex-col gap-4'>
              <div className='flex flex-col gap-1.5'>
                <div className='flex items-center justify-between'>
                  <Label className='text-xs font-medium'>Region</Label>
                  <Button
                    type='button'
                    variant='ghost'
                    size='sm'
                    className='h-6 px-1.5 text-[11px]'
                    onClick={() => setRegionDialogOpen(true)}
                  >
                    <PlusIcon className='size-3 mr-1' />
                    New
                  </Button>
                </div>
                <Select
                  value={selectedRegionId || null}
                  onValueChange={(val: string | null) => setSelectedRegionId(val || '')}
                >
                  <SelectTrigger className='w-full text-xs'>
                    <SelectValue placeholder={regions.length ? 'Select a region' : 'No regions yet — create one'}>
                      {(val: string | null) => {
                        const r = regions.find(x => x.id === val)

                        if (!r) return regions.length ? 'Select a region' : 'No regions yet — create one'

                        return `${r.name} (${r.code})${r.polygonGeoJson ? ' • boundary drawn' : ''}`
                      }}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent className='max-h-64'>
                    <SelectGroup>
                      {regions.map(r => (
                        <SelectItem key={r.id} value={r.id}>
                          {r.name} ({r.code}){r.polygonGeoJson ? ' • boundary drawn' : ''}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className='flex flex-col gap-1.5'>
                <div className='flex items-center justify-between'>
                  <Label className='text-xs font-medium'>Assembly (MMDA)</Label>
                  <Button
                    type='button'
                    variant='ghost'
                    size='sm'
                    className='h-6 px-1.5 text-[11px]'
                    disabled={!selectedRegionId}
                    onClick={() => setAssemblyDialogOpen(true)}
                  >
                    <PlusIcon className='size-3 mr-1' />
                    New
                  </Button>
                </div>
                <Select
                  value={selectedAssemblyId || null}
                  onValueChange={(val: string | null) => {
                    setSelectedAssemblyId(val || '')
                    setMode(val ? 'assembly' : 'region')
                  }}
                  disabled={!selectedRegionId || loadingAssemblies}
                >
                  <SelectTrigger className='w-full text-xs'>
                    <SelectValue
                      placeholder={
                        !selectedRegionId
                          ? 'Select a region first'
                          : loadingAssemblies
                            ? 'Loading assemblies...'
                            : assemblies.length
                              ? 'Edit the region, or pick an assembly'
                              : 'No assemblies yet — create one'
                      }
                    >
                      {(val: string | null) => {
                        const a = assemblies.find(x => x.id === val)

                        if (!a) {
                          return !selectedRegionId
                            ? 'Select a region first'
                            : loadingAssemblies
                              ? 'Loading assemblies...'
                              : assemblies.length
                                ? 'Edit the region, or pick an assembly'
                                : 'No assemblies yet — create one'
                        }

                        return `${a.name} (${a.code})${a.polygonGeoJson ? ' • boundary drawn' : ''}`
                      }}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent className='max-h-64'>
                    <SelectGroup>
                      {assemblies.map(a => (
                        <SelectItem key={a.id} value={a.id}>
                          {a.name} ({a.code}){a.polygonGeoJson ? ' • boundary drawn' : ''}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {selectedAssemblyId ? (
                  <Button
                    type='button'
                    variant='link'
                    size='sm'
                    className='h-auto p-0 text-[11px] self-start'
                    onClick={() => {
                      setSelectedAssemblyId('')
                      setMode('region')
                    }}
                  >
                    Back to editing the region boundary
                  </Button>
                ) : null}
              </div>

              {activeEntity ? (
                <div className='rounded-md border bg-muted/30 p-3 text-xs'>
                  <div className='flex items-center justify-between'>
                    <span className='font-semibold text-foreground'>{activeEntity.name}</span>
                    <Badge variant='outline' className='text-[10px]'>
                      {activeEntityLabel}
                    </Badge>
                  </div>
                  <p className='text-muted-foreground mt-1'>
                    Code: <span className='font-mono'>{activeEntity.code}</span>
                  </p>
                  <p className='text-muted-foreground mt-0.5'>
                    Boundary: {activeEntity.polygonGeoJson ? 'Drawn' : 'Not drawn yet'}
                  </p>
                </div>
              ) : (
                <p className='text-xs text-muted-foreground'>Select a region (or create one) to begin drawing boundaries.</p>
              )}
            </CardContent>
          </Card>

          {/* Raw coordinates */}
          <Card>
            <CardHeader>
              <CardTitle className='text-sm font-semibold flex items-center gap-1.5'>
                <CodeIcon className='size-4 text-primary' />
                Coordinates
              </CardTitle>
              <CardDescription className='text-xs'>
                Paste GeoJSON directly, or build the boundary point by point.
              </CardDescription>
            </CardHeader>
            <CardContent className='flex flex-col gap-3'>
              <Tabs value={coordsMode} onValueChange={val => val && setCoordsMode(val as 'text' | 'form')}>
                <TabsList className='w-full'>
                  <TabsTrigger value='text' className='flex-1 text-xs'>
                    Text
                  </TabsTrigger>
                  <TabsTrigger value='form' className='flex-1 text-xs'>
                    Form
                  </TabsTrigger>
                </TabsList>

                <TabsContent value='text' className='mt-3'>
                  <Textarea
                    value={coordsText}
                    onChange={e => setCoordsText(e.target.value)}
                    placeholder={'{\n  "type": "Polygon",\n  "coordinates": [[[lng, lat], ...]]\n}'}
                    // Real boundary geometry can pretty-print to thousands of lines; without
                    // capping this, the Textarea's default field-sizing-content behavior grows
                    // the box (and the whole page) to fit all of it, pushing the map far down
                    // the page. Fixed height + internal scroll keeps the layout stable instead.
                    className='field-sizing-fixed h-48 resize-y overflow-y-auto font-mono text-[11px]'
                    disabled={!activeEntity}
                  />
                </TabsContent>

                <TabsContent value='form' className='mt-3'>
                  <div className='flex flex-col gap-2'>
                    <p className='text-[11px] text-muted-foreground'>
                      Coordinate 1 is the start point — it's used again to close the polygon automatically, so you
                      don't need to re-enter it at the end.
                    </p>

                    <div className='flex flex-col gap-2 max-h-80 overflow-y-auto pr-1'>
                      {vertexRows.map((row, index) => (
                        <div key={index} className='flex items-end gap-2'>
                          <span className='self-end flex h-8 w-9 shrink-0 items-center justify-center text-base font-bold text-foreground'>
                            #{index + 1}
                          </span>
                          <div className='flex flex-col gap-1 flex-1'>
                            <Label className='text-[10px] text-muted-foreground'>Longitude</Label>
                            <Input
                              className='text-xs h-8'
                              placeholder='-1.8700'
                              inputMode='decimal'
                              disabled={!activeEntity}
                              value={row.lng}
                              onChange={e => handleVertexFieldChange(index, 'lng', e.target.value)}
                            />
                          </div>
                          <div className='flex flex-col gap-1 flex-1'>
                            <Label className='text-[10px] text-muted-foreground'>Latitude</Label>
                            <Input
                              className='text-xs h-8'
                              placeholder='5.6037'
                              inputMode='decimal'
                              disabled={!activeEntity}
                              value={row.lat}
                              onChange={e => handleVertexFieldChange(index, 'lat', e.target.value)}
                            />
                          </div>
                          <Button
                            type='button'
                            variant='ghost'
                            size='icon'
                            className='size-8 shrink-0 text-muted-foreground hover:text-destructive'
                            disabled={!activeEntity || vertexRows.length <= 1}
                            onClick={() => handleRemoveVertexRow(index)}
                            title='Remove coordinate'
                          >
                            <Trash2Icon className='size-3.5' />
                          </Button>
                        </div>
                      ))}
                    </div>

                    <Button
                      type='button'
                      variant='outline'
                      size='sm'
                      className='text-xs self-start'
                      disabled={!activeEntity}
                      onClick={handleAddVertexRow}
                    >
                      <ListPlusIcon className='size-3.5 mr-1.5' />
                      Add Coordinate
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>

              <Button
                type='button'
                variant='outline'
                size='sm'
                className='text-xs self-start'
                onClick={handleApplyActiveCoords}
                disabled={!canApplyCoords}
              >
                Apply to Map
              </Button>
            </CardContent>
          </Card>

        </div>

        {/* The map */}
        {/* `isolate` scopes Leaflet's internal pane/control z-indexes (up to ~1000) to this
            subtree, so they can never paint above the Dialog/Select portals (z-50) that
            render elsewhere in the DOM when a dialog overlaps the map on screen. */}
        <Card className='overflow-hidden isolate'>
          <CardHeader className='flex flex-row items-center justify-between gap-2 border-b pb-4'>
            <div>
              <CardTitle className='text-sm font-semibold'>{activeEntity ? `Boundary — ${activeEntity.name}` : 'Boundary Map'}</CardTitle>
              <CardDescription className='text-xs'>
                Use the polygon tool (top-right of the map) to draw a new boundary, or edit/delete the existing one.
              </CardDescription>
            </div>
            <Button size='sm' className='text-xs shrink-0' onClick={handleSave} disabled={!activeEntity || !draft || saving}>
              {saving ? <Spinner className='size-3 mr-1.5' /> : <SaveIcon className='size-3.5 mr-1.5' />}
              Save Boundary
            </Button>
          </CardHeader>
          <CardContent className='p-0'>
            <div className='h-[560px] w-full'>
              <BoundaryMap
                entityKey={activeEntityId || 'none'}
                polygon={mapPolygon}
                onDraftChange={setDraft}
                referenceZones={referenceZones}
                applyGeometry={applyGeometry}
                applyToken={applyToken}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Create Region Dialog */}
      <Dialog open={regionDialogOpen} onOpenChange={setRegionDialogOpen}>
        <DialogContent className='sm:max-w-md'>
          <form onSubmit={handleCreateRegion}>
            <DialogHeader>
              <DialogTitle className='text-base font-semibold'>Create New Region</DialogTitle>
              <DialogDescription className='text-xs text-muted-foreground'>
                Adds a region to the GIS boundary dataset in Shared Services — separate from the legacy
                Configuration &gt; Regions list.
              </DialogDescription>
            </DialogHeader>
            <div className='grid gap-3.5 py-4 text-xs'>
              <div className='grid gap-1.5'>
                <Label className='text-xs font-medium'>Region Code</Label>
                <Input
                  placeholder='e.g. GAR'
                  value={newRegionCode}
                  onChange={e => setNewRegionCode(e.target.value.toUpperCase())}
                  className='font-mono text-xs uppercase'
                  required
                />
              </div>
              <div className='grid gap-1.5'>
                <Label className='text-xs font-medium'>Region Name</Label>
                <Input
                  placeholder='e.g. Greater Accra Region'
                  value={newRegionName}
                  onChange={e => setNewRegionName(e.target.value)}
                  className='text-xs'
                  required
                />
              </div>
            </div>
            <DialogFooter className='gap-3 sm:gap-3'>
              <Button type='button' variant='outline' size='sm' className='text-xs' onClick={() => setRegionDialogOpen(false)}>
                Cancel
              </Button>
              <Button type='submit' size='sm' className='text-xs' disabled={creatingRegion}>
                {creatingRegion ? <Spinner className='size-3 mr-1.5' /> : null}
                Create Region
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Create Assembly Dialog */}
      <Dialog open={assemblyDialogOpen} onOpenChange={setAssemblyDialogOpen}>
        <DialogContent className='sm:max-w-md'>
          <form onSubmit={handleCreateAssembly}>
            <DialogHeader>
              <DialogTitle className='text-base font-semibold'>Create New Assembly (MMDA)</DialogTitle>
              <DialogDescription className='text-xs text-muted-foreground'>
                Adds an MMDA under {selectedRegion?.name ?? 'the selected region'} to the GIS boundary dataset.
              </DialogDescription>
            </DialogHeader>
            <div className='grid gap-3.5 py-4 text-xs'>
              <div className='grid gap-1.5'>
                <Label className='text-xs font-medium'>Assembly Code</Label>
                <Input
                  placeholder='e.g. AMA, KMA'
                  value={newAssemblyCode}
                  onChange={e => setNewAssemblyCode(e.target.value.toUpperCase())}
                  className='font-mono text-xs uppercase'
                  required
                />
              </div>
              <div className='grid gap-1.5'>
                <Label className='text-xs font-medium'>Official Name</Label>
                <Input
                  placeholder='e.g. Accra Metropolitan Assembly'
                  value={newAssemblyName}
                  onChange={e => setNewAssemblyName(e.target.value)}
                  className='text-xs'
                  required
                />
              </div>
              <div className='grid gap-1.5'>
                <Label className='text-xs font-medium'>Governance Tier</Label>
                <Select value={newAssemblyCategory} onValueChange={(val: string | null) => val && setNewAssemblyCategory(val as 'METROPOLITAN' | 'MUNICIPAL' | 'DISTRICT')}>
                  <SelectTrigger className='w-full text-xs'>
                    <SelectValue placeholder='Select Tier'>
                      {(val: string | null) => {
                        const labels: Record<string, string> = {
                          METROPOLITAN: 'Metropolitan',
                          MUNICIPAL: 'Municipal',
                          DISTRICT: 'District'
                        }

                        return val ? labels[val] ?? val : 'Select Tier'
                      }}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='METROPOLITAN'>Metropolitan</SelectItem>
                    <SelectItem value='MUNICIPAL'>Municipal</SelectItem>
                    <SelectItem value='DISTRICT'>District</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter className='gap-3 sm:gap-3'>
              <Button type='button' variant='outline' size='sm' className='text-xs' onClick={() => setAssemblyDialogOpen(false)}>
                Cancel
              </Button>
              <Button type='submit' size='sm' className='text-xs' disabled={creatingAssembly}>
                {creatingAssembly ? <Spinner className='size-3 mr-1.5' /> : null}
                Create Assembly
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
