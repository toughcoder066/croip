'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { PlusIcon } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PageLoader, Spinner } from '@/components/ui/spinner'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  AssembliesDataTable,
  type AssemblyDbRecord
} from '@/views/configuration/assemblies-data-table'

interface GisRegion {
  id: string
  code: string
  name: string
}

interface GisAssembly {
  id: string
  regionId: string
  code: string
  name: string
  category: 'METROPOLITAN' | 'MUNICIPAL' | 'DISTRICT'
  polygonGeoJson: unknown
  createdAt: string
}

const CATEGORY_LABEL: Record<GisAssembly['category'], 'Metropolitan' | 'Municipal' | 'District'> = {
  METROPOLITAN: 'Metropolitan',
  MUNICIPAL: 'Municipal',
  DISTRICT: 'District'
}

export default function AssembliesConfigPage() {
  const [assemblies, setAssemblies] = useState<GisAssembly[]>([])
  const [regions, setRegions] = useState<GisRegion[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Form state
  const [formCode, setFormCode] = useState('')
  const [formName, setFormName] = useState('')
  const [formRegionId, setFormRegionId] = useState('')
  const [formCategory, setFormCategory] = useState<'METROPOLITAN' | 'MUNICIPAL' | 'DISTRICT'>('MUNICIPAL')
  const [submitting, setSubmitting] = useState(false)

  const fetchAll = () => {
    setLoading(true)
    Promise.all([
      fetch('/api/geo/assemblies').then(res => res.json()),
      fetch('/api/geo/regions').then(res => res.json())
    ])
      .then(([assembliesRes, regionsRes]) => {
        if (assembliesRes.success && Array.isArray(assembliesRes.data)) {
          setAssemblies(assembliesRes.data)
        } else {
          toast.error(assembliesRes.error || 'Failed to load assemblies')
        }
        if (regionsRes.success && Array.isArray(regionsRes.data)) {
          setRegions(regionsRes.data)
          if (regionsRes.data.length > 0) setFormRegionId((prev: string) => prev || regionsRes.data[0].id)
        }
      })
      .catch(err => {
        console.error('Failed to load assemblies/regions from Shared Services:', err)
        toast.error('Failed to load assemblies from Shared Services')
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchAll()
  }, [])

  const regionById = useMemo(() => {
    const map = new Map<string, GisRegion>()
    regions.forEach(r => map.set(r.id, r))
    return map
  }, [regions])

  // Map the authoritative GIS dataset (real COD-AB import) into the shape the existing
  // AssembliesDataTable already renders.
  const tableData: AssemblyDbRecord[] = useMemo(
    () =>
      assemblies.map(a => ({
        id: a.id,
        regionId: a.regionId,
        code: a.code,
        name: a.name,
        category: a.category,
        polygonGeoJson: a.polygonGeoJson,
        metadata: {
          region: regionById.get(a.regionId)?.name,
          regionCode: regionById.get(a.regionId)?.code,
          category: CATEGORY_LABEL[a.category],
          status: 'Active'
        }
      })),
    [assemblies, regionById]
  )

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formCode || !formName || !formRegionId) {
      toast.error('Code, Name, and Region are required')
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch('/api/geo/assemblies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          regionId: formRegionId,
          code: formCode.toUpperCase().trim(),
          name: formName.trim(),
          category: formCategory
        })
      })

      const data = await res.json()
      if (data.success) {
        toast.success(`Assembly ${formCode.toUpperCase()} created. Draw its boundary in Zones & Boundaries.`)
        setIsDialogOpen(false)
        setFormCode('')
        setFormName('')
        fetchAll()
      } else {
        toast.error(data.error || 'Failed to create assembly')
      }
    } catch {
      toast.error('Error connecting to Shared Services')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return <PageLoader />
  }

  return (
    <div className='flex flex-col gap-6'>
      {/* Header with Navigation */}
      <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-border/40'>
        <div>
          <h1 className='text-2xl font-bold tracking-tight text-foreground'>Assemblies (MMDAs)</h1>
          <p className='text-xs text-muted-foreground mt-0.5'>
            The {assemblies.length} Metropolitan, Municipal, and District Assemblies registered in Shared Services
            (:3004), sourced from the official COD-AB boundary dataset. Draw or edit a boundary from{' '}
            <Link href='/configuration/zones' className='text-primary hover:underline'>
              Zones &amp; Boundaries
            </Link>
            .
          </p>
        </div>

        <div className='flex items-center gap-2 self-stretch sm:self-auto'>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <Button size='sm' className='text-xs' onClick={() => setIsDialogOpen(true)}>
              <PlusIcon className='size-3.5 mr-1.5' />
              Add Assembly
            </Button>
            <DialogContent className='sm:max-w-md'>
              <form onSubmit={handleCreate}>
                <DialogHeader>
                  <DialogTitle className='text-base font-semibold'>Register New Assembly</DialogTitle>
                  <DialogDescription className='text-xs text-muted-foreground'>
                    Adds an MMDA to the GIS boundary dataset. Its boundary polygon can be drawn afterward from
                    Zones &amp; Boundaries.
                  </DialogDescription>
                </DialogHeader>
                <div className='grid gap-3.5 py-4 text-xs'>
                  <div className='grid gap-1.5'>
                    <label className='text-xs font-medium text-foreground'>Assembly Code</label>
                    <Input
                      placeholder='e.g. AMA, KMA, GEMA'
                      value={formCode}
                      onChange={e => setFormCode(e.target.value.toUpperCase())}
                      className='font-mono text-xs uppercase'
                      required
                    />
                  </div>
                  <div className='grid gap-1.5'>
                    <label className='text-xs font-medium text-foreground'>Official Name</label>
                    <Input
                      placeholder='e.g. Accra Metropolitan Assembly'
                      value={formName}
                      onChange={e => setFormName(e.target.value)}
                      className='text-xs'
                      required
                    />
                  </div>
                  <div className='grid gap-1.5'>
                    <label className='text-xs font-medium text-foreground'>Region</label>
                    {(() => {
                      const selectedFormRegion = regions.find(r => r.id === formRegionId)
                      return (
                        <Select value={formRegionId || null} onValueChange={(val: string | null) => val && setFormRegionId(val)}>
                          <SelectTrigger className='w-full text-xs'>
                            <SelectValue placeholder={regions.length ? 'Select a region' : 'No regions in database'}>
                              {selectedFormRegion ? `${selectedFormRegion.name} (${selectedFormRegion.code})` : undefined}
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent className='max-h-60'>
                            <SelectGroup>
                              {regions.map(r => (
                                <SelectItem key={r.id} value={r.id}>
                                  {r.name} ({r.code})
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      )
                    })()}
                  </div>
                  <div className='grid gap-1.5'>
                    <label className='text-xs font-medium text-foreground'>Governance Tier</label>
                    <select
                      className='h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-xs shadow-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring'
                      value={formCategory}
                      onChange={e => setFormCategory(e.target.value as 'METROPOLITAN' | 'MUNICIPAL' | 'DISTRICT')}
                    >
                      <option value='METROPOLITAN'>Metropolitan (Pop. 250,000+)</option>
                      <option value='MUNICIPAL'>Municipal (Pop. 95,000+)</option>
                      <option value='DISTRICT'>District (Pop. 75,000+)</option>
                    </select>
                  </div>
                </div>
                <DialogFooter className='gap-3 sm:gap-3'>
                  <Button type='button' variant='outline' size='sm' onClick={() => setIsDialogOpen(false)} className='text-xs'>
                    Cancel
                  </Button>
                  <Button type='submit' size='sm' disabled={submitting} className='text-xs'>
                    {submitting ? <Spinner className='size-3 mr-1.5' /> : null}
                    Save Assembly
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Assemblies Data Table */}
      <AssembliesDataTable data={tableData} regions={regions} loading={loading} onRefresh={fetchAll} />
    </div>
  )
}
