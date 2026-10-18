'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'

import { PageLoader } from '@/components/ui/spinner'
import { BillsDataTable, type BillDirectoryRecord } from '@/views/billing/bills-data-table'

const PAGE_SIZE = 10

export default function PropertyBillsPage() {
  const [items, setItems] = useState<BillDirectoryRecord[]>([])
  const [initialLoading, setInitialLoading] = useState(true)
  const [loading, setLoading] = useState(true)

  const [search, setSearch] = useState('')
  const [paymentStatus, setPaymentStatus] = useState('all')
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [totalPages, setTotalPages] = useState(1)

  const requestId = useRef(0)

  const fetchBills = useCallback(() => {
    const id = ++requestId.current
    setLoading(true)

    const params = new URLSearchParams()
    if (search) params.set('search', search)
    if (paymentStatus && paymentStatus !== 'all') params.set('paymentStatus', paymentStatus)
    params.set('page', String(page))
    params.set('pageSize', String(PAGE_SIZE))

    fetch(`/api/billing/bills?${params.toString()}`)
      .then(res => res.json())
      .then(res => {
        if (id !== requestId.current) return
        if (res.success && res.data) {
          setItems(res.data.items ?? [])
          setTotal(res.data.total ?? 0)
          setTotalPages(res.data.totalPages ?? 1)
        } else {
          toast.error(res.error || 'Failed to load bill directory')
        }
      })
      .catch(err => {
        if (id !== requestId.current) return
        console.error('Failed to load bill directory:', err)
        toast.error('Failed to load bill directory')
      })
      .finally(() => {
        if (id !== requestId.current) return
        setLoading(false)
        setInitialLoading(false)
      })
  }, [search, paymentStatus, page])

  useEffect(() => {
    fetchBills()
  }, [fetchBills])

  if (initialLoading) {
    return <PageLoader />
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-border/40">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Bills</h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Every bill issued against a property via billing-payments-service (:3007).
          </p>
        </div>
      </div>

      <BillsDataTable
        data={items}
        loading={loading}
        search={search}
        onSearchChange={setSearch}
        paymentStatus={paymentStatus}
        onPaymentStatusChange={setPaymentStatus}
        page={page}
        pageSize={PAGE_SIZE}
        total={total}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  )
}
