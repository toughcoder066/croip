'use client'

import { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'

import { PageLoader } from '@/components/ui/spinner'
import { PropertiesDataTable, type PropertyRecord, type AssemblyLookup } from '@/views/properties/properties-data-table'

export default function PropertiesRegistryPage() {
  const [properties, setProperties] = useState<PropertyRecord[]>([])
  const [assemblies, setAssemblies] = useState<AssemblyLookup[]>([])
  const [loading, setLoading] = useState(true)

  const fetchProperties = useCallback(() => {
    setLoading(true)

    Promise.all([
      fetch('/api/properties').then(res => res.json()),
      fetch('/api/geo/assemblies')
        .then(res => res.json())
        .catch(() => ({ success: false, data: [] }))
    ])
      .then(([propsRes, assembliesRes]) => {
        if (propsRes.success && Array.isArray(propsRes.data)) {
          setProperties(propsRes.data)
        } else {
          toast.error(propsRes.error || 'Failed to load properties')
        }
        if (assembliesRes.success && Array.isArray(assembliesRes.data)) {
          setAssemblies(assembliesRes.data)
        }
      })
      .catch(err => {
        console.error('Failed to load property registry:', err)
        toast.error('Failed to load property registry')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    fetchProperties()
  }, [fetchProperties])

  if (loading && properties.length === 0) {
    return <PageLoader />
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-border/40">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">All Registered Properties</h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            National cadastre of landed properties registered across all assemblies via property-registry-service (:3020).
          </p>
        </div>
      </div>

      <PropertiesDataTable
        data={properties}
        assemblies={assemblies}
        loading={loading}
        onRefresh={fetchProperties}
      />
    </div>
  )
}

