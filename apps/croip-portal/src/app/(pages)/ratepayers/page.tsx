'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'

import { PageLoader } from '@/components/ui/spinner'
import { PurgeConfirmDialog } from '@/components/admin/purge-confirm-dialog'
import { RatepayersDataTable, type RatepayerDirectoryRecord } from '@/views/ratepayers/ratepayers-data-table'

const PAGE_SIZE = 10

export default function RatepayersDirectoryPage() {
  const [items, setItems] = useState<RatepayerDirectoryRecord[]>([])
  const [initialLoading, setInitialLoading] = useState(true)
  const [loading, setLoading] = useState(true)

  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('all')
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [totalPages, setTotalPages] = useState(1)

  const requestId = useRef(0)

  const fetchDirectory = useCallback(() => {
    const id = ++requestId.current
    setLoading(true)

    const params = new URLSearchParams()
    if (search) params.set('search', search)
    if (status && status !== 'all') params.set('status', status)
    params.set('page', String(page))
    params.set('pageSize', String(PAGE_SIZE))

    fetch(`/api/ratepayers/directory?${params.toString()}`)
      .then(res => res.json())
      .then(res => {
        if (id !== requestId.current) return
        if (res.success && res.data) {
          setItems(res.data.items ?? [])
          setTotal(res.data.total ?? 0)
          setTotalPages(res.data.totalPages ?? 1)
        } else {
          toast.error(res.error || 'Failed to load ratepayer directory')
        }
      })
      .catch(err => {
        if (id !== requestId.current) return
        console.error('Failed to load ratepayer directory:', err)
        toast.error('Failed to load ratepayer directory')
      })
      .finally(() => {
        if (id !== requestId.current) return
        setLoading(false)
        setInitialLoading(false)
      })
  }, [search, status, page])

  useEffect(() => {
    fetchDirectory()
  }, [fetchDirectory])

  if (initialLoading) {
    return <PageLoader />
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-border/40">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Ratepayers</h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Citizen and corporate ratepayer profiles registered across all assemblies via ratepayer-service (:3030).
          </p>
        </div>
        <div className="flex items-center gap-2">
          <PurgeConfirmDialog
            target="ratepayers"
            onSuccess={fetchDirectory}
          />
        </div>
      </div>

      <RatepayersDataTable
        data={items}
        loading={loading}
        search={search}
        onSearchChange={setSearch}
        status={status}
        onStatusChange={setStatus}
        page={page}
        pageSize={PAGE_SIZE}
        total={total}
        totalPages={totalPages}
        onPageChange={setPage}
        onRefresh={fetchDirectory}
      />
    </div>
  )
}

