'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  SearchIcon,
  XIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CheckCircle2Icon,
  ClockIcon,
  XCircleIcon,
  EyeIcon,
  UserIcon,
  Building2Icon
} from 'lucide-react'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { Spinner } from '@/components/ui/spinner'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

export interface RatepayerVerificationRecord {
  id: string
  ratepayerId: string
  provider: string
  providerReference: string
  verificationStatus: string
  verifiedAt: string | null
  createdAt: string
}

export interface RatepayerDirectoryRecord {
  id: string
  code: string
  ratepayerType: string
  firstName?: string | null
  middleName?: string | null
  lastName?: string | null
  legalName: string
  phone: string
  email?: string | null
  regionId: string
  assemblyId: string
  status: string
  createdAt: string
  verifications?: RatepayerVerificationRecord[]
}

interface RatepayersDataTableProps {
  data: RatepayerDirectoryRecord[]
  loading?: boolean
  search: string
  onSearchChange: (value: string) => void
  status: string
  onStatusChange: (value: string) => void
  page: number
  pageSize: number
  total: number
  totalPages: number
  onPageChange: (page: number) => void
}

function RatepayerTypeBadge({ type }: { type: string }) {
  const t = (type || 'INDIVIDUAL').toUpperCase()
  if (t === 'ORGANIZATION') {
    return (
      <Badge variant="outline" className="bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/20 text-[10px] font-medium">
        <Building2Icon className="size-2.5 mr-1" />
        Organization
      </Badge>
    )
  }
  return (
    <Badge variant="outline" className="bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20 text-[10px] font-medium">
      <UserIcon className="size-2.5 mr-1" />
      Individual
    </Badge>
  )
}

function RatepayerStatusBadge({ status }: { status: string }) {
  const s = (status || 'ACTIVE').toUpperCase()
  if (s === 'ACTIVE') {
    return (
      <Badge variant="outline" className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20 text-[10px] font-medium">
        <CheckCircle2Icon className="size-2.5 mr-1" />
        Active
      </Badge>
    )
  }
  if (s === 'SUSPENDED') {
    return (
      <Badge variant="outline" className="bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20 text-[10px] font-medium">
        <ClockIcon className="size-2.5 mr-1" />
        Suspended
      </Badge>
    )
  }
  return (
    <Badge variant="outline" className="bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/20 text-[10px] font-medium">
      <XCircleIcon className="size-2.5 mr-1" />
      Deactivated
    </Badge>
  )
}

// KYC verification status is derived from the ratepayer's nested `verifications` array rather
// than shown record-by-record here - the "Zero PII" posture for this directory table means we
// surface only the aggregate state, never raw provider/provider-reference values. Priority:
// any PENDING needs oversight attention first, then VERIFIED, then REJECTED, then none on file.
function KycStatusBadge({ verifications }: { verifications?: RatepayerVerificationRecord[] }) {
  const list = verifications ?? []
  if (list.length === 0) {
    return <span className="text-[11px] text-muted-foreground italic">No verification on file</span>
  }

  const hasPending = list.some(v => (v.verificationStatus || '').toUpperCase() === 'PENDING')
  const hasVerified = list.some(v => (v.verificationStatus || '').toUpperCase() === 'VERIFIED')

  if (hasPending) {
    return (
      <Badge variant="outline" className="bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20 text-[10px] font-medium">
        <ClockIcon className="size-2.5 mr-1" />
        Pending Review
      </Badge>
    )
  }
  if (hasVerified) {
    return (
      <Badge variant="outline" className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20 text-[10px] font-medium">
        <CheckCircle2Icon className="size-2.5 mr-1" />
        Verified
      </Badge>
    )
  }
  return (
    <Badge variant="outline" className="bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/20 text-[10px] font-medium">
      <XCircleIcon className="size-2.5 mr-1" />
      Rejected
    </Badge>
  )
}

export function RatepayersDataTable({
  data,
  loading = false,
  search,
  onSearchChange,
  status,
  onStatusChange,
  page,
  pageSize,
  total,
  totalPages,
  onPageChange
}: RatepayersDataTableProps) {
  // Local echo of the search box so every keystroke feels immediate, debounced before it is
  // pushed up to the parent page (which re-queries the server-side directory endpoint).
  const [searchInput, setSearchInput] = useState(search)

  useEffect(() => {
    setSearchInput(search)
  }, [search])

  useEffect(() => {
    const handle = setTimeout(() => {
      if (searchInput !== search) {
        onPageChange(1)
        onSearchChange(searchInput)
      }
    }, 400)
    return () => clearTimeout(handle)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput])

  const showingFrom = total === 0 ? 0 : (page - 1) * pageSize + 1
  const showingTo = Math.min(page * pageSize, total)

  // Windowed page buttons - avoids rendering hundreds of buttons for a large directory.
  const pageButtons: number[] = []
  const windowSize = 5
  let start = Math.max(1, page - Math.floor(windowSize / 2))
  let end = Math.min(totalPages, start + windowSize - 1)
  start = Math.max(1, end - windowSize + 1)
  for (let p = start; p <= end; p++) pageButtons.push(p)

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-xl font-bold tracking-tight text-foreground">Ratepayer Directory</h2>
      </div>

      <Card className="shadow-2xs overflow-hidden py-0 gap-0">
        {/* Filters */}
        <div className="border-b p-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="flex w-full flex-col gap-2 sm:col-span-2">
              <Label htmlFor="search-ratepayer" className="text-sm font-medium">Search</Label>
              <InputGroup className="w-full">
                <InputGroupAddon align="inline-start">
                  <SearchIcon className="size-4 text-muted-foreground" />
                </InputGroupAddon>
                <InputGroupInput
                  id="search-ratepayer"
                  placeholder="Search by code, legal name, or phone..."
                  value={searchInput}
                  onChange={e => setSearchInput(e.target.value)}
                  className="text-sm"
                />
                {searchInput && (
                  <InputGroupAddon align="inline-end">
                    <button
                      type="button"
                      onClick={() => setSearchInput('')}
                      className="text-muted-foreground hover:text-foreground p-0.5 rounded-full transition-colors cursor-pointer"
                      title="Clear search"
                    >
                      <XIcon className="size-3.5" />
                    </button>
                  </InputGroupAddon>
                )}
              </InputGroup>
            </div>

            <div className="flex w-full flex-col gap-2">
              <Label htmlFor="filter-status" className="text-sm font-medium">Status</Label>
              <Select
                value={status}
                onValueChange={(val: string | null) => {
                  if (val) {
                    onPageChange(1)
                    onStatusChange(val)
                  }
                }}
              >
                <SelectTrigger id="filter-status" className="w-full">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="ACTIVE">Active</SelectItem>
                    <SelectItem value="SUSPENDED">Suspended</SelectItem>
                    <SelectItem value="DEACTIVATED">Deactivated</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40 hover:bg-muted/40">
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground pl-6">
                  Ratepayer
                </TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Phone
                </TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Type
                </TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Status
                </TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  KYC Verification
                </TableHead>
                <TableHead className="text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground pr-6">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-48 text-center">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <Spinner className="size-6 text-primary" />
                      <p className="text-xs text-muted-foreground">Loading ratepayers...</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-40 text-center text-sm text-muted-foreground">
                    No ratepayers match your filters.
                  </TableCell>
                </TableRow>
              ) : (
                data.map(row => (
                  <TableRow key={row.id} className="hover:bg-muted/30 transition-colors">
                    <TableCell className="pl-6">
                      <div className="flex flex-col">
                        <span className="font-semibold text-xs text-foreground">{row.legalName}</span>
                        <span className="font-mono text-[11px] text-muted-foreground">{row.code}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground font-mono">{row.phone}</TableCell>
                    <TableCell>
                      <RatepayerTypeBadge type={row.ratepayerType} />
                    </TableCell>
                    <TableCell>
                      <RatepayerStatusBadge status={row.status} />
                    </TableCell>
                    <TableCell>
                      <KycStatusBadge verifications={row.verifications} />
                    </TableCell>
                    <TableCell className="text-center pr-6">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 text-[11px] gap-1"
                        render={<Link href={`/ratepayers/${row.id}`} />}
                        nativeButton={false}
                      >
                        <EyeIcon className="size-3.5" />
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination (server-side) */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 border-t bg-muted/10 text-sm">
          <p className="text-muted-foreground text-xs sm:text-sm">
            Showing <span className="font-semibold text-foreground">{showingFrom}</span> to{' '}
            <span className="font-semibold text-foreground">{showingTo}</span> of{' '}
            <span className="font-semibold text-foreground">{total}</span> entries
          </p>

          <div className="flex items-center gap-1.5">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onPageChange(Math.max(page - 1, 1))}
              disabled={page <= 1 || loading}
              className="gap-1 text-xs h-8"
            >
              <ChevronLeftIcon className="size-4" />
              Previous
            </Button>

            {pageButtons.map(p => {
              const isActive = p === page
              return (
                <Button
                  key={p}
                  variant={isActive ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => onPageChange(p)}
                  disabled={loading}
                  className={`size-8 p-0 text-xs ${isActive ? 'font-bold' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  {p}
                </Button>
              )
            })}

            <Button
              variant="ghost"
              size="sm"
              onClick={() => onPageChange(Math.min(page + 1, totalPages))}
              disabled={page >= totalPages || loading}
              className="gap-1 text-xs h-8"
            >
              Next
              <ChevronRightIcon className="size-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
