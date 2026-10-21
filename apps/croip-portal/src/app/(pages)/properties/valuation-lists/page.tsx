'use client'

import { useEffect, useState } from 'react'
import { toast } from 'sonner'

import { PageLoader } from '@/components/ui/spinner'
import { ValuationRollsTable, type ValuationRollRecord } from '@/views/properties/valuation-rolls-table'

export default function ValuationRollsPage() {
  const [rows, setRows] = useState<ValuationRollRecord[]>([])
  const [loading, setLoading] = useState(true)

  const fetchRolls = () => {
    setLoading(true)
    fetch('/api/properties/valuations')
      .then(res => res.json())
      .then(res => {
        if (res.success && Array.isArray(res.data)) {
          setRows(res.data)
        } else {
          toast.error(res.error || 'Failed to load valuation rolls')
        }
      })
      .catch(err => {
        console.error('Failed to load valuation rolls:', err)
        toast.error('Failed to load valuation rolls')
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchRolls()
  }, [])

  if (loading) {
    return <PageLoader />
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-border/40">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Valuation Rolls</h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Rateable values from the Land Valuation Division&apos;s valuation lists, attached to each property via
            property-registry-service (:3020).
          </p>
        </div>
      </div>

      <ValuationRollsTable data={rows} loading={loading} onRefresh={fetchRolls} />
    </div>
  )
}
