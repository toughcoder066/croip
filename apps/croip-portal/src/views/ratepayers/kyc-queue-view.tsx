'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { toast } from 'sonner'
import { CheckCircle2Icon, ClockIcon, XCircleIcon, EyeIcon, ShieldCheckIcon } from 'lucide-react'

import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Spinner, PageLoader } from '@/components/ui/spinner'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import type { RatepayerDirectoryRecord } from '@/views/ratepayers/ratepayers-data-table'

interface QueueRow {
  verificationId: string
  provider: string
  providerReference: string
  verificationStatus: string
  verifiedAt: string | null
  createdAt: string
  ratepayerId: string
  ratepayerCode: string
  ratepayerLegalName: string
}

const humanize = (value?: string | null) =>
  (value ?? 'UNSPECIFIED')
    .toLowerCase()
    .split('_')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')

const formatDate = (value?: string | null) =>
  value ? new Date(value).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '—'

function StatusBadge({ status }: { status: string }) {
  const s = (status || 'PENDING').toUpperCase()
  if (s === 'VERIFIED') {
    return (
      <Badge variant="outline" className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20 text-[10px] font-medium">
        <CheckCircle2Icon className="size-2.5 mr-1" />
        Verified
      </Badge>
    )
  }
  if (s === 'REJECTED') {
    return (
      <Badge variant="outline" className="bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/20 text-[10px] font-medium">
        <XCircleIcon className="size-2.5 mr-1" />
        Rejected
      </Badge>
    )
  }
  return (
    <Badge variant="outline" className="bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20 text-[10px] font-medium">
      <ClockIcon className="size-2.5 mr-1" />
      Pending
    </Badge>
  )
}

const MAX_PAGES = 20
const PAGE_SIZE = 100

/**
 * Cross-ratepayer KYC queue. ratepayer-service does not expose a dedicated "all pending
 * verifications" endpoint, so this composes the admin directory endpoint (paged, capped at
 * MAX_PAGES * PAGE_SIZE records to stay bounded) and flattens every nested verification record
 * into one reviewable queue - the same Approve/Reject action as the ratepayer detail screen.
 */
export function KycQueueView() {
  const [rows, setRows] = useState<QueueRow[]>([])
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState('PENDING')

  const [reviewTarget, setReviewTarget] = useState<QueueRow | null>(null)
  const [reviewDecision, setReviewDecision] = useState<'VERIFIED' | 'REJECTED' | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const fetchQueue = useCallback(() => {
    setLoading(true)

    const loadAllPages = async () => {
      const collected: QueueRow[] = []
      let page = 1
      let totalPages = 1

      while (page <= totalPages && page <= MAX_PAGES) {
        const res = await fetch(`/api/ratepayers/directory?page=${page}&pageSize=${PAGE_SIZE}`).then(r => r.json())
        if (!res.success || !res.data) {
          throw new Error(res.error || 'Failed to load ratepayer directory')
        }
        totalPages = res.data.totalPages ?? 1
        const items: RatepayerDirectoryRecord[] = res.data.items ?? []
        items.forEach(rp => {
          ;(rp.verifications ?? []).forEach(v => {
            collected.push({
              verificationId: v.id,
              provider: v.provider,
              providerReference: v.providerReference,
              verificationStatus: v.verificationStatus,
              verifiedAt: v.verifiedAt,
              createdAt: v.createdAt,
              ratepayerId: rp.id,
              ratepayerCode: rp.code,
              ratepayerLegalName: rp.legalName
            })
          })
        })
        page += 1
      }

      return collected
    }

    loadAllPages()
      .then(rows => {
        rows.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        setRows(rows)
      })
      .catch(err => {
        console.error('Failed to load KYC queue:', err)
        toast.error('Failed to load KYC verification queue')
      })
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    fetchQueue()
  }, [fetchQueue])

  const openReview = (row: QueueRow, decision: 'VERIFIED' | 'REJECTED') => {
    setReviewTarget(row)
    setReviewDecision(decision)
  }

  const closeReview = () => {
    setReviewTarget(null)
    setReviewDecision(null)
  }

  const handleSubmitReview = async () => {
    if (!reviewTarget || !reviewDecision) return

    setSubmitting(true)
    try {
      const res = await fetch(`/api/ratepayers/${reviewTarget.ratepayerId}/verifications/${reviewTarget.verificationId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ verificationStatus: reviewDecision })
      })
      const json = await res.json()

      if (json.success) {
        toast.success(reviewDecision === 'VERIFIED' ? 'KYC verification approved' : 'KYC verification rejected')
        closeReview()
        fetchQueue()
      } else {
        toast.error(json.error || 'Failed to submit review')
      }
    } catch {
      toast.error('Network error submitting review')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return <PageLoader />
  }

  const pendingRows = rows.filter(r => (r.verificationStatus || 'PENDING').toUpperCase() === 'PENDING')
  const verifiedRows = rows.filter(r => (r.verificationStatus || '').toUpperCase() === 'VERIFIED')
  const rejectedRows = rows.filter(r => (r.verificationStatus || '').toUpperCase() === 'REJECTED')

  const visibleRows = tab === 'PENDING' ? pendingRows : tab === 'VERIFIED' ? verifiedRows : tab === 'REJECTED' ? rejectedRows : rows

  const isApprove = reviewDecision === 'VERIFIED'

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-border/40">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">KYC & ID Verifications</h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Oversight queue for ratepayer identity checks across all assemblies, served by ratepayer-service (:3030).
          </p>
        </div>
      </div>

      <Card className="shadow-2xs overflow-hidden py-0 gap-0">
        <CardHeader className="border-b py-4">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <ShieldCheckIcon className="size-4 text-primary" />
            Verification Queue
          </CardTitle>
        </CardHeader>

        <Tabs value={tab} onValueChange={val => val && setTab(val)} className="gap-0">
          <div className="overflow-x-auto border-b px-4 pt-2">
            <TabsList className="w-max min-w-full **:group-data-[orientation=horizontal]/tabs:after:h-0">
              <TabsTrigger value="PENDING">
                Pending
                {pendingRows.length > 0 && (
                  <Badge variant="outline" className="ml-1.5 bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20 text-[9px] px-1.5">
                    {pendingRows.length}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="VERIFIED">Verified</TabsTrigger>
              <TabsTrigger value="REJECTED">Rejected</TabsTrigger>
              <TabsTrigger value="ALL">All</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value={tab} className="m-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/40 hover:bg-muted/40">
                    <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground pl-6">
                      Ratepayer
                    </TableHead>
                    <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Provider
                    </TableHead>
                    <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Reference
                    </TableHead>
                    <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Status
                    </TableHead>
                    <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Submitted
                    </TableHead>
                    <TableHead className="text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground pr-6">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {visibleRows.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="h-40 text-center text-sm text-muted-foreground">
                        No verification records in this queue.
                      </TableCell>
                    </TableRow>
                  ) : (
                    visibleRows.map(row => {
                      const isPending = (row.verificationStatus || 'PENDING').toUpperCase() === 'PENDING'
                      return (
                        <TableRow key={row.verificationId} className="hover:bg-muted/30 transition-colors">
                          <TableCell className="pl-6">
                            <div className="flex flex-col">
                              <span className="font-semibold text-xs text-foreground">{row.ratepayerLegalName}</span>
                              <span className="font-mono text-[11px] text-muted-foreground">{row.ratepayerCode}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-xs text-foreground">{humanize(row.provider)}</TableCell>
                          <TableCell className="font-mono text-[11px] text-muted-foreground">{row.providerReference}</TableCell>
                          <TableCell>
                            <StatusBadge status={row.verificationStatus} />
                          </TableCell>
                          <TableCell className="text-xs text-muted-foreground">{formatDate(row.createdAt)}</TableCell>
                          <TableCell className="text-center pr-6">
                            <div className="flex items-center justify-center gap-1.5">
                              {isPending && (
                                <>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-7 text-[11px] text-emerald-700 dark:text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/10"
                                    onClick={() => openReview(row, 'VERIFIED')}
                                  >
                                    <CheckCircle2Icon className="size-3 mr-1" />
                                    Approve
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-7 text-[11px] text-rose-700 dark:text-rose-400 border-rose-500/30 hover:bg-rose-500/10"
                                    onClick={() => openReview(row, 'REJECTED')}
                                  >
                                    <XCircleIcon className="size-3 mr-1" />
                                    Reject
                                  </Button>
                                </>
                              )}
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 text-[11px] gap-1"
                                render={<Link href={`/ratepayers/${row.ratepayerId}`} />}
                                nativeButton={false}
                              >
                                <EyeIcon className="size-3.5" />
                                View
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      )
                    })
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </Card>

      <Dialog open={Boolean(reviewTarget && reviewDecision)} onOpenChange={open => !open && closeReview()}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-base font-semibold">
              {isApprove ? (
                <CheckCircle2Icon className="size-4 text-emerald-600" />
              ) : (
                <XCircleIcon className="size-4 text-rose-600" />
              )}
              {isApprove ? 'Approve KYC Verification' : 'Reject KYC Verification'}
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              {reviewTarget && (
                <>
                  {reviewTarget.ratepayerLegalName} ({reviewTarget.ratepayerCode}) — {humanize(reviewTarget.provider)} verification,
                  reference <span className="font-mono">{reviewTarget.providerReference}</span>.{' '}
                </>
              )}
              {isApprove
                ? 'Approving marks this identity check as VERIFIED for the ratepayer.'
                : 'Rejecting marks this identity check as REJECTED. The ratepayer may be asked to resubmit.'}
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="gap-3 sm:gap-3">
            <Button variant="outline" size="sm" onClick={closeReview} className="text-xs" disabled={submitting}>
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={handleSubmitReview}
              disabled={submitting}
              className="text-xs"
              variant={isApprove ? 'default' : 'destructive'}
            >
              {submitting ? <Spinner className="size-3 mr-1.5" /> : null}
              {isApprove ? 'Approve Verification' : 'Reject Verification'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
