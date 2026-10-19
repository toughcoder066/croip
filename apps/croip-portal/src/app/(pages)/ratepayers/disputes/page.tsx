'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'

import { PageLoader } from '@/components/ui/spinner'
import { DisputesDataTable, type DisputeRecord } from '@/views/disputes/disputes-data-table'

export default function RatepayerDisputesPage() {
  const [items, setItems] = useState<DisputeRecord[]>([])
  const [initialLoading, setInitialLoading] = useState(true)
  const [loading, setLoading] = useState(true)

  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('all')

  const requestId = useRef(0)

  const fetchDisputes = useCallback(() => {
    const id = ++requestId.current
    setLoading(true)

    const params = new URLSearchParams()
    if (status && status !== 'all') params.set('status', status)

    fetch(`/api/disputes?${params.toString()}`)
      .then(res => res.json())
      .then(res => {
        if (id !== requestId.current) return
        if (res.success && Array.isArray(res.data)) {
          setItems(res.data)
        } else {
          toast.error(res.error || 'Failed to load dispute queue')
        }
      })
      .catch(err => {
        if (id !== requestId.current) return
        console.error('Failed to load dispute queue:', err)
        toast.error('Failed to load dispute queue')
      })
      .finally(() => {
        if (id !== requestId.current) return
        setLoading(false)
        setInitialLoading(false)
      })
  }, [status])

  useEffect(() => {
    fetchDisputes()
  }, [fetchDisputes])

  if (initialLoading) {
    return <PageLoader />
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-border/40">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Dispute Mediation</h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Billing, boundary, and valuation disputes raised by ratepayers via dispute-service (:3008).
          </p>
        </div>
      </div>

      <DisputesDataTable
        data={items}
        loading={loading}
        search={search}
        onSearchChange={setSearch}
        status={status}
        onStatusChange={setStatus}
        onChanged={fetchDisputes}
      />
    </div>
  )
}
