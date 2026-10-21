'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import {
  SearchIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  XIcon,
  CheckCircle2Icon,
  ClockIcon,
  XCircleIcon,
  EyeIcon,
  Building2Icon,
  UserIcon,
  LandmarkIcon,
  MapPinIcon
} from 'lucide-react'

import { toast } from 'sonner'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { Spinner } from '@/components/ui/spinner'
import { BatchActionBar } from '@/components/data-table/batch-action-bar'
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

export interface PropertyRecord {
  id: string
  code: string
  version?: number
  accountNumber?: string | null
  propertyName?: string | null
  ghanaPostGps?: string | null
  createdBy?: string | null
  verifiedBy?: string | null
  verifiedAt?: string | null
  assemblyId: string
  propertyClass: string
  buildingStatus?: string
  propertyStatus?: string
  propertyUse?: string
  tenureType?: string
  structureType?: string
  registrationSource?: string
  verificationStatus: string
  createdAt: string
}

export interface AssemblyLookup {
  id: string
  code: string
  name: string
}

interface PropertiesDataTableProps {
  data: PropertyRecord[]
  assemblies?: AssemblyLookup[]
  loading?: boolean
  onRefresh?: () => void
}

const humanize = (value?: string | null) =>
  (value ?? 'UNSPECIFIED')
    .toLowerCase()
    .split('_')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')

function VerificationBadge({ status }: { status: string }) {
  const s = (status || 'PENDING').toUpperCase()
  if (s === 'VERIFIED') {
    return (
      <Badge
        variant="outline"
        className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20 text-[10px] font-medium"
      >
        <CheckCircle2Icon className="size-2.5 mr-1" />
        Verified
      </Badge>
    )
  }
  if (s === 'REJECTED') {
    return (
      <Badge
        variant="outline"
        className="bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/20 text-[10px] font-medium"
      >
        <XCircleIcon className="size-2.5 mr-1" />
        Rejected
      </Badge>
    )
  }
  return (
    <Badge
      variant="outline"
      className="bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20 text-[10px] font-medium"
    >
      <ClockIcon className="size-2.5 mr-1" />
      Pending
    </Badge>
  )
}

function RegistrationSourceBadge({ source }: { source?: string }) {
  const s = (source || 'CONCESSION').toUpperCase()
  if (s === 'RATEPAYER') {
    return (
      <Badge
        variant="outline"
        className="bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20 text-[10px] font-medium"
      >
        <UserIcon className="size-2.5 mr-1" />
        Ratepayer
      </Badge>
    )
  }
  return (
    <Badge
      variant="outline"
      className="bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/20 text-[10px] font-medium"
    >
      <Building2Icon className="size-2.5 mr-1" />
      Concession
    </Badge>
  )
}

export function PropertiesDataTable({
  data,
  assemblies = [],
  loading = false,
  onRefresh
}: PropertiesDataTableProps) {
  // Row selection
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [isDeletingBatch, setIsDeletingBatch] = useState(false)

  // Filters
  const [filterClass, setFilterClass] = useState<string>('all')
  const [filterVerification, setFilterVerification] = useState<string>('all')
  const [search, setSearch] = useState<string>('')

  // Pagination
  const [currentPage, setCurrentPage] = useState<number>(1)
  const rowsPerPage = 8

  const assemblyMap = useMemo(() => {
    const map = new Map<string, AssemblyLookup>()
    assemblies.forEach(a => map.set(a.id, a))
    return map
  }, [assemblies])

  const availableClasses = useMemo(() => {
    const set = new Set<string>()
    data.forEach(p => set.add(p.propertyClass || 'UNSPECIFIED'))
    return Array.from(set).sort()
  }, [data])

  const filteredData = useMemo(() => {
    return data.filter(item => {
      const assembly = assemblyMap.get(item.assemblyId)
      const haystack = [
        item.code,
        item.propertyName,
        item.accountNumber,
        item.ghanaPostGps,
        item.createdBy,
        item.verifiedBy,
        assembly?.name,
        assembly?.code,
        item.propertyClass
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()

      const matchesSearch = haystack.includes(search.toLowerCase())
      const matchesClass = filterClass === 'all' || item.propertyClass === filterClass
      const matchesVerification =
        filterVerification === 'all' || (item.verificationStatus || 'PENDING').toUpperCase() === filterVerification

      return matchesSearch && matchesClass && matchesVerification
    })
  }, [data, search, filterClass, filterVerification, assemblyMap])

  const totalEntries = filteredData.length
  const totalPages = Math.ceil(totalEntries / rowsPerPage) || 1
  const validCurrentPage = Math.min(currentPage, totalPages)
  const startIndex = (validCurrentPage - 1) * rowsPerPage
  const paginatedData = filteredData.slice(startIndex, startIndex + rowsPerPage)
  const showingFrom = totalEntries === 0 ? 0 : startIndex + 1
  const showingTo = Math.min(startIndex + rowsPerPage, totalEntries)

  const allCurrentPageSelected =
    paginatedData.length > 0 && paginatedData.every(r => selectedIds.has(r.id))

  const toggleSelectAll = () => {
    const next = new Set(selectedIds)
    if (allCurrentPageSelected) {
      paginatedData.forEach(r => next.delete(r.id))
    } else {
      paginatedData.forEach(r => next.add(r.id))
    }
    setSelectedIds(next)
  }

  const toggleSelectRow = (id: string) => {
    const next = new Set(selectedIds)
    if (next.has(id)) {
      next.delete(id)
    } else {
      next.add(id)
    }
    setSelectedIds(next)
  }

  const handleBatchDelete = async () => {
    if (selectedIds.size === 0) return
    if (!confirm(`Are you sure you want to delete ${selectedIds.size} selected property/properties? Any property that cannot be deleted (e.g. has paid bills or active liens) will be skipped.`)) {
      return
    }

    setIsDeletingBatch(true)
    let deletedCount = 0
    let skippedCount = 0

    for (const id of Array.from(selectedIds)) {
      try {
        const res = await fetch(`/api/properties/${id}`, { method: 'DELETE' })
        const json = await res.json().catch(() => ({}))
        if (res.ok && json.success) {
          deletedCount++
        } else {
          skippedCount++
        }
      } catch {
        skippedCount++
      }
    }

    setIsDeletingBatch(false)
    setSelectedIds(new Set())

    if (deletedCount > 0 && skippedCount === 0) {
      toast.success(`Successfully deleted ${deletedCount} property record${deletedCount > 1 ? 's' : ''}.`)
    } else if (deletedCount > 0 && skippedCount > 0) {
      toast.warning(`Deleted ${deletedCount} property record${deletedCount > 1 ? 's' : ''}. ${skippedCount} record${skippedCount > 1 ? 's' : ''} could not be deleted and were skipped.`)
    } else if (deletedCount === 0 && skippedCount > 0) {
      toast.error(`Could not delete selected properties (${skippedCount} skipped due to paid bills or constraints).`)
    }

    onRefresh?.()
  }

  return (
    <Card className="shadow-2xs overflow-hidden py-0 gap-0">
      {/* Top Filters: Search, Property Class, Verification Status */}
      <div className="border-b p-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="flex w-full flex-col gap-2">
            <Label htmlFor="search-property" className="text-sm font-medium">Search</Label>
            <InputGroup className="w-full">
              <InputGroupAddon align="inline-start">
                <SearchIcon className="size-4 text-muted-foreground" />
              </InputGroupAddon>
              <InputGroupInput
                id="search-property"
                placeholder="Search by code, name, account, or assembly..."
                value={search}
                onChange={e => {
                  setSearch(e.target.value)
                  setCurrentPage(1)
                }}
                className="text-sm"
              />
              {search && (
                <InputGroupAddon align="inline-end">
                  <button
                    type="button"
                    onClick={() => {
                      setSearch('')
                      setCurrentPage(1)
                    }}
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
            <Label htmlFor="filter-class" className="text-sm font-medium">Property Class</Label>
            <Select
              value={filterClass}
              onValueChange={(val: string | null) => {
                if (val) {
                  setFilterClass(val)
                  setCurrentPage(1)
                }
              }}
            >
              <SelectTrigger id="filter-class" className="w-full">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">All</SelectItem>
                  {availableClasses.map(cls => (
                    <SelectItem key={cls} value={cls}>
                      {humanize(cls)}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex w-full flex-col gap-2">
            <Label htmlFor="filter-verification" className="text-sm font-medium">Verification Status</Label>
            <Select
              value={filterVerification}
              onValueChange={(val: string | null) => {
                if (val) {
                  setFilterVerification(val)
                  setCurrentPage(1)
                }
              }}
            >
              <SelectTrigger id="filter-verification" className="w-full">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="VERIFIED">Verified</SelectItem>
                  <SelectItem value="REJECTED">Rejected</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Batch Action Bar */}
      <BatchActionBar
        selectedCount={selectedIds.size}
        onDelete={handleBatchDelete}
        onClear={() => setSelectedIds(new Set())}
        isDeleting={isDeletingBatch}
        entityName="property"
      />

      {/* The Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40 hover:bg-muted/40">
              <TableHead className="w-12 pl-6">
                <Checkbox
                  checked={allCurrentPageSelected}
                  onCheckedChange={toggleSelectAll}
                  aria-label="Select all properties on current page"
                />
              </TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Property
              </TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Assembly
              </TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Class
              </TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Verification
              </TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Source
              </TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Registered
              </TableHead>
              <TableHead className="text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground pr-6">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={8} className="h-48 text-center">
                  <div className="flex flex-col items-center justify-center gap-3">
                    <Spinner className="size-6 text-primary" />
                    <p className="text-xs text-muted-foreground">Loading properties...</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : paginatedData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="h-40 text-center text-sm text-muted-foreground">
                  No properties match your filters.
                </TableCell>
              </TableRow>
            ) : (
              paginatedData.map(row => {
                const isSelected = selectedIds.has(row.id)
                const assembly = assemblyMap.get(row.assemblyId)
                return (
                  <TableRow
                    key={row.id}
                    data-state={isSelected ? 'selected' : undefined}
                    className="hover:bg-muted/30 transition-colors"
                  >
                    <TableCell className="pl-6">
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={() => toggleSelectRow(row.id)}
                        aria-label={`Select ${row.propertyName || row.code}`}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-0.5">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="font-semibold text-xs text-foreground">
                            {row.propertyName || 'Unnamed Property'}
                          </span>
                          <Badge
                            variant="outline"
                            className="text-[10px] font-mono px-1.5 py-0 h-4 border-muted-foreground/30 bg-muted/40 text-muted-foreground"
                          >
                            v{row.version ?? 1}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-1.5 flex-wrap font-mono text-[11px] text-muted-foreground">
                          <span>
                            {row.code}
                            {row.accountNumber ? ` • A/C ${row.accountNumber}` : ''}
                          </span>
                          {row.ghanaPostGps && (
                            <span className="inline-flex items-center gap-1 text-[10px] text-primary bg-primary/10 px-1.5 py-0.5 rounded border border-primary/20">
                              <MapPinIcon className="size-2.5" />
                              {row.ghanaPostGps}
                            </span>
                          )}
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <LandmarkIcon className="size-3.5 text-primary" />
                        <span>{assembly ? `${assembly.name}` : 'Local Assembly'}</span>
                      </div>
                    </TableCell>

                    <TableCell>
                      <Badge variant="outline" className="text-[10px] font-medium bg-muted text-muted-foreground">
                        {humanize(row.propertyClass)}
                      </Badge>
                    </TableCell>

                    <TableCell>
                      <div className="flex flex-col gap-0.5">
                        <VerificationBadge status={row.verificationStatus} />
                        {row.verifiedBy && (
                          <span className="text-[10px] text-muted-foreground truncate max-w-[120px]" title={row.verifiedBy}>
                            by {row.verifiedBy}
                          </span>
                        )}
                      </div>
                    </TableCell>

                    <TableCell>
                      <RegistrationSourceBadge source={row.registrationSource} />
                    </TableCell>

                    <TableCell>
                      <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground">
                          {row.createdAt ? new Date(row.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '—'}
                        </span>
                        {row.createdBy && (
                          <span className="text-[10px] text-muted-foreground/80 truncate max-w-[120px]" title={row.createdBy}>
                            by {row.createdBy}
                          </span>
                        )}
                      </div>
                    </TableCell>

                    <TableCell className="text-center pr-6">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-8 text-muted-foreground hover:text-primary hover:bg-primary/10"
                        title="View property"
                        render={<Link href={`/properties/${row.id}`} />}
                        nativeButton={false}
                      >
                        <EyeIcon className="size-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </div>

      {/* Footer: Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 border-t bg-muted/10 text-sm">
        <p className="text-muted-foreground text-xs sm:text-sm">
          Showing <span className="font-semibold text-foreground">{showingFrom}</span> to{' '}
          <span className="font-semibold text-foreground">{showingTo}</span> of{' '}
          <span className="font-semibold text-foreground">{totalEntries}</span> entries
        </p>

        <div className="flex items-center gap-1.5">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
            disabled={validCurrentPage <= 1}
            className="gap-1 text-xs h-8"
          >
            <ChevronLeftIcon className="size-4" />
            Previous
          </Button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => {
            const isActive = page === validCurrentPage
            return (
              <Button
                key={page}
                variant={isActive ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setCurrentPage(page)}
                className={`size-8 p-0 text-xs ${
                  isActive ? 'font-bold' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {page}
              </Button>
            )
          })}

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
            disabled={validCurrentPage >= totalPages}
            className="gap-1 text-xs h-8"
          >
            Next
            <ChevronRightIcon className="size-4" />
          </Button>
        </div>
      </div>
    </Card>
  )
}
