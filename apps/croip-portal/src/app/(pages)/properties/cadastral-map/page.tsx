'use client'

import { useEffect, useMemo, useState } from 'react'

import dynamic from 'next/dynamic'
import { CheckCircle2Icon, ClockIcon, LandmarkIcon, MapPinnedIcon, XCircleIcon } from 'lucide-react'
import { toast } from 'sonner'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PageLoader, Spinner } from '@/components/ui/spinner'

import type { CadastralAssembly, CadastralProperty } from '@/views/properties/cadastral-map'

// react-leaflet's <MapContainer> touches `window` at module scope, which breaks Next.js'
// server-side prerendering of this page. Loading it via next/dynamic with ssr:false keeps
// it out of the server bundle entirely - it only ever mounts in the browser.
const CadastralMap = dynamic(() => import('@/views/properties/cadastral-map'), {
  ssr: false,
  loading: () => (
    <div className='flex h-full w-full items-center justify-center'>
      <Spinner className='size-6 text-primary' />
    </div>
  )
})

export default function CadastralSpatialMapPage() {
  const [assemblies, setAssemblies] = useState<CadastralAssembly[]>([])
  const [properties, setProperties] = useState<CadastralProperty[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    setLoading(true)

    Promise.all([
      fetch('/api/geo/assemblies').then(res => res.json()),
      fetch('/api/properties').then(res => res.json())
    ])
      .then(([assembliesRes, propertiesRes]) => {
        if (cancelled) return
        if (assembliesRes.success && Array.isArray(assembliesRes.data)) {
          setAssemblies(assembliesRes.data)
        } else {
          toast.error(assembliesRes.error || 'Failed to load assembly boundaries')
        }
        if (propertiesRes.success && Array.isArray(propertiesRes.data)) {
          setProperties(propertiesRes.data)
        } else {
          toast.error(propertiesRes.error || 'Failed to load properties')
        }
      })
      .catch(err => {
        if (cancelled) return
        console.error('Failed to load cadastral map data:', err)
        toast.error('Failed to load cadastral map data')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  const assemblyNameById = useMemo(() => {
    const map = new Map<string, string>()
    assemblies.forEach(a => map.set(a.id, a.name))
    return map
  }, [assemblies])

  const propertiesWithGeometry = useMemo(() => properties.filter(p => p.polygonGeoJson), [properties])
  const assembliesWithGeometry = useMemo(() => assemblies.filter(a => a.polygonGeoJson), [assemblies])

  const statusCounts = useMemo(() => {
    const counts = { VERIFIED: 0, PENDING: 0, REJECTED: 0 }
    propertiesWithGeometry.forEach(p => {
      const status = (p.verificationStatus || 'PENDING').toUpperCase() as keyof typeof counts
      if (status in counts) counts[status] += 1
    })
    return counts
  }, [propertiesWithGeometry])

  if (loading) {
    return <PageLoader />
  }

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-border/40'>
        <div>
          <h1 className='text-2xl font-bold tracking-tight text-foreground'>Cadastral &amp; Spatial Map</h1>
          <p className='text-xs text-muted-foreground mt-0.5'>
            Registered property boundaries plotted against MMDA boundaries, sourced live from
            property-registry-service (:3020) and shared-services (:3004).
          </p>
        </div>
      </div>

      <div className='grid grid-cols-2 gap-4 sm:grid-cols-4'>
        <Card className='shadow-2xs'>
          <CardContent className='flex items-center gap-3 py-4'>
            <LandmarkIcon className='size-5 text-primary' />
            <div>
              <p className='text-lg font-bold text-foreground'>{assembliesWithGeometry.length}</p>
              <p className='text-[11px] text-muted-foreground'>Assembly Boundaries</p>
            </div>
          </CardContent>
        </Card>
        <Card className='shadow-2xs'>
          <CardContent className='flex items-center gap-3 py-4'>
            <CheckCircle2Icon className='size-5 text-emerald-500' />
            <div>
              <p className='text-lg font-bold text-foreground'>{statusCounts.VERIFIED}</p>
              <p className='text-[11px] text-muted-foreground'>Verified Properties</p>
            </div>
          </CardContent>
        </Card>
        <Card className='shadow-2xs'>
          <CardContent className='flex items-center gap-3 py-4'>
            <ClockIcon className='size-5 text-amber-500' />
            <div>
              <p className='text-lg font-bold text-foreground'>{statusCounts.PENDING}</p>
              <p className='text-[11px] text-muted-foreground'>Pending Properties</p>
            </div>
          </CardContent>
        </Card>
        <Card className='shadow-2xs'>
          <CardContent className='flex items-center gap-3 py-4'>
            <XCircleIcon className='size-5 text-rose-500' />
            <div>
              <p className='text-lg font-bold text-foreground'>{statusCounts.REJECTED}</p>
              <p className='text-[11px] text-muted-foreground'>Rejected Properties</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className='shadow-2xs overflow-hidden py-0 gap-0'>
        <CardHeader className='border-b py-4'>
          <CardTitle className='text-sm font-semibold flex items-center gap-2'>
            <MapPinnedIcon className='size-4 text-primary' />
            Spatial View
          </CardTitle>
          <div className='flex items-center gap-4 pt-1'>
            <Badge variant='outline' className='text-[10px] font-medium bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20'>
              Property Boundary
            </Badge>
            <Badge variant='outline' className='text-[10px] font-medium bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20'>
              Assembly Boundary
            </Badge>
          </div>
        </CardHeader>
        <div className='h-[600px] w-full'>
          <CadastralMap assemblies={assemblies} properties={properties} assemblyNameById={assemblyNameById} />
        </div>
      </Card>

      {propertiesWithGeometry.length === 0 && (
        <p className='text-xs text-muted-foreground text-center'>
          No properties have recorded boundary geometry yet. Properties appear here once registered with a
          polygon footprint.
        </p>
      )}
    </div>
  )
}
