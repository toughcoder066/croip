'use client'

import { useEffect, useState, useMemo } from 'react'
import Link from 'next/link'
import {
  PlusIcon,
  Building2Icon,
  GlobeIcon,
  CheckCircle2Icon
} from 'lucide-react'
import { toast } from 'sonner'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PageLoader, Spinner } from '@/components/ui/spinner'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { RegionsDataTable, type RegionDbRecord } from '@/views/configuration/regions-data-table'

interface GisRegion {
  id: string
  code: string
  name: string
  polygonGeoJson: unknown
  createdAt: string
}

interface GisAssembly {
  id: string
  regionId: string
}

// Geographic belt per region, keyed by the official COD-AB P-code — the data table's own
// zone fallback only recognizes the old hand-picked abbreviation codes (GAR, ASH, ...), so
// without this every real region would default to "Northern Belt" regardless of where it
// actually sits.
const REGION_ZONE: Record<string, string> = {
  GH01: 'Middle Belt', // Ahafo
  GH02: 'Middle Belt', // Ashanti
  GH03: 'Middle Belt', // Bono
  GH04: 'Middle Belt', // Bono East
  GH05: 'Coastal Zone', // Central
  GH06: 'Middle Belt', // Eastern
  GH07: 'Coastal Zone', // Greater Accra
  GH08: 'Northern Belt', // Northern
  GH09: 'Northern Belt', // North East
  GH10: 'Middle Belt', // Oti
  GH11: 'Northern Belt', // Savannah
  GH12: 'Northern Belt', // Upper East
  GH13: 'Northern Belt', // Upper West
  GH14: 'Coastal Zone', // Volta
  GH15: 'Coastal Zone', // Western
  GH16: 'Coastal Zone' // Western North
}

export default function RegionsConfigPage() {
  const [regions, setRegions] = useState<GisRegion[]>([])
  const [assemblies, setAssemblies] = useState<GisAssembly[]>([])
  const [loading, setLoading] = useState(true)

  // Add Region Modal State
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [addCode, setAddCode] = useState('')
  const [addName, setAddName] = useState('')
  const [savingAdd, setSavingAdd] = useState(false)

  const fetchRegions = async () => {
    setLoading(true)
    try {
      const [regionsRes, assembliesRes] = await Promise.all([
        fetch('/api/geo/regions').then(r => r.json()),
        fetch('/api/geo/assemblies').then(r => r.json()).catch(() => ({ success: false, data: [] }))
      ])

      if (regionsRes.success && Array.isArray(regionsRes.data)) {
        setRegions(regionsRes.data)
      } else {
        toast.error(regionsRes.error || 'Failed to load regions')
      }
      if (assembliesRes.success && Array.isArray(assembliesRes.data)) {
        setAssemblies(assembliesRes.data)
      }
    } catch (err) {
      console.error('Failed to load regions from Shared Services:', err)
      toast.error('Failed to load regions from Shared Services')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRegions()
  }, [])

  const handleSaveAdd = async () => {
    if (!addCode.trim()) {
      toast.error('Region code is required')
      return
    }
    if (!addName.trim()) {
      toast.error('Region name is required')
      return
    }

    setSavingAdd(true)
    try {
      const res = await fetch('/api/geo/regions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: addCode.trim().toUpperCase(), name: addName.trim() })
      })

      const json = await res.json()
      if (json.success) {
        toast.success(`Region "${addName}" added. Draw its boundary in Zones & Boundaries.`)
        setIsAddOpen(false)
        setAddCode('')
        setAddName('')
        fetchRegions()
      } else {
        toast.error(json.error || 'Failed to add region')
      }
    } catch {
      toast.error('Network error adding region')
    } finally {
      setSavingAdd(false)
    }
  }

  const totalRegionsCount = regions.length

  // Every region in the GIS dataset is live/operational by definition — there's no separate
  // Active/Inactive status field on Shared Services' Region model (unlike the old flat
  // reference-data rows, which carried a free-text metadata.status).
  const activeRegionsCount = totalRegionsCount

  const totalMmdas = assemblies.length

  // Exact FK match now that both datasets share real region ids, instead of the old
  // fragile string-matching on a free-text region name/code in metadata.
  const assemblyCountByRegion = useMemo(() => {
    const map: Record<string, number> = {}
    assemblies.forEach(a => {
      map[a.regionId] = (map[a.regionId] || 0) + 1
    })
    return map
  }, [assemblies])

  // Map the authoritative GIS dataset (real COD-AB import) into the shape the existing
  // RegionsDataTable already renders.
  const regionsWithDerivedMmdas: RegionDbRecord[] = useMemo(
    () =>
      regions.map(r => ({
        id: r.id,
        category: 'region',
        code: r.code,
        name: r.name,
        version: 1,
        metadata: {
          status: 'Active',
          mmdaCount: assemblyCountByRegion[r.id] || 0,
          country: 'Ghana',
          zone: REGION_ZONE[r.code] || 'Middle Belt'
        },
        createdAt: r.createdAt
      })),
    [regions, assemblyCountByRegion]
  )

  const coverageRate = totalRegionsCount === 0 ? 0 : 100

  if (loading) {
    return <PageLoader />
  }

  return (
    <div className='flex flex-col gap-6'>
      {/* Header */}
      <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-border/40'>
        <div>
          <h1 className='text-2xl font-bold tracking-tight text-foreground'>Regions &amp; Jurisdictions</h1>
          <p className='text-xs text-muted-foreground mt-0.5'>
            The {totalRegionsCount} administrative regions registered in Shared Services (:3004), sourced from the
            official COD-AB boundary dataset. Draw or edit a boundary from{' '}
            <Link href='/configuration/zones' className='text-primary hover:underline'>
              Zones &amp; Boundaries
            </Link>
            .
          </p>
        </div>

        <div className='flex items-center gap-2 self-stretch sm:self-auto'>
          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <Button size='sm' className='text-xs' onClick={() => setIsAddOpen(true)}>
              <PlusIcon className='size-3.5 mr-1.5' />
              Add Region
            </Button>
            <DialogContent className='sm:max-w-md'>
              <DialogHeader>
                <DialogTitle className='text-base font-semibold'>Add New Region</DialogTitle>
                <DialogDescription className='text-xs text-muted-foreground'>
                  Registers a new administrative region into the GIS boundary dataset. Its boundary polygon can be
                  drawn afterward from Zones &amp; Boundaries.
                </DialogDescription>
              </DialogHeader>

              <div className='grid gap-3.5 py-2 text-xs'>
                <div className='grid gap-1.5'>
                  <Label htmlFor='add-region-code' className='text-xs font-medium'>
                    Region Code
                  </Label>
                  <Input
                    id='add-region-code'
                    value={addCode}
                    onChange={e => setAddCode(e.target.value.toUpperCase())}
                    placeholder='e.g. WER'
                    className='font-mono text-xs uppercase'
                    maxLength={20}
                  />
                </div>

                <div className='grid gap-1.5'>
                  <Label htmlFor='add-region-name' className='text-xs font-medium'>
                    Region Name
                  </Label>
                  <Input
                    id='add-region-name'
                    value={addName}
                    onChange={e => setAddName(e.target.value)}
                    placeholder='e.g. Western North Region'
                    className='text-xs'
                  />
                </div>
              </div>

              <DialogFooter className='gap-3 sm:gap-3'>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => setIsAddOpen(false)}
                  className='text-xs'
                  disabled={savingAdd}
                >
                  Cancel
                </Button>
                <Button
                  size='sm'
                  onClick={handleSaveAdd}
                  disabled={savingAdd}
                  className='text-xs'
                >
                  {savingAdd ? <Spinner className='size-3 mr-1.5' /> : null}
                  Add Region
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Summary KPI Strip - Loaded 100% from Shared Services Database */}
      <div className='grid gap-4 sm:grid-cols-3'>
        <Card className='p-4 shadow-2xs'>
          <div className='flex items-center gap-3'>
            <div className='size-10 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0'>
              <GlobeIcon className='size-5' />
            </div>
            <div>
              <p className='text-xs text-muted-foreground'>Administrative Regions</p>
              <p className='text-xl font-bold text-foreground'>{totalRegionsCount} Regions</p>
              <p className='text-[11px] text-muted-foreground mt-0.5'>
                {activeRegionsCount} Active in Database
              </p>
            </div>
          </div>
        </Card>

        <Card className='p-4 shadow-2xs'>
          <div className='flex items-center gap-3'>
            <div className='size-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0'>
              <Building2Icon className='size-5' />
            </div>
            <div>
              <p className='text-xs text-muted-foreground'>Configured MMDAs</p>
              <p className='text-xl font-bold text-foreground'>{totalMmdas} Assemblies</p>
              <p className='text-[11px] text-muted-foreground mt-0.5'>
                Actual records in database
              </p>
            </div>
          </div>
        </Card>

        <Card className='p-4 shadow-2xs'>
          <div className='flex items-center gap-3'>
            <div className='size-10 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center shrink-0'>
              <CheckCircle2Icon className='size-5' />
            </div>
            <div>
              <p className='text-xs text-muted-foreground'>Active Regional Coverage</p>
              <p className='text-xl font-bold text-foreground'>{coverageRate}% Active</p>
              <p className='text-[11px] text-muted-foreground mt-0.5'>
                {activeRegionsCount} of {totalRegionsCount} Regions Operational
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* UI Component: Data Table with Filters matching Screenshot & DB Headers */}
      <RegionsDataTable data={regionsWithDerivedMmdas} loading={loading} onRefresh={fetchRegions} readOnly />
    </div>
  )
}
