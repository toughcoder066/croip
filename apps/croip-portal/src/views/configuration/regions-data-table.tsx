'use client'

import { useState, useMemo, useEffect } from 'react'
import {
  SearchIcon,
  PencilIcon,
  Trash2Icon,
  EllipsisVerticalIcon,
  CopyIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  XIcon,
  CheckCircle2Icon,
  ClockIcon,
  XCircleIcon
} from 'lucide-react'
import { toast } from 'sonner'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'

export interface RegionDbRecord {
  id: string
  category: string
  code: string
  name: string
  version: number
  metadata?: {
    code?: string
    capital?: string
    mmdaCount?: number
    zone?: string
    status?: string
    country?: string
    countryCode?: string
    [key: string]: any
  }
  createdAt: string
}

interface RegionsDataTableProps {
  data: RegionDbRecord[]
  loading?: boolean
  onDelete?: (id: string, name: string) => Promise<void> | void
  onRefresh?: () => void

  /**
   * True when `data` comes from the authoritative GIS boundary dataset (Shared Services'
   * Region model, sourced from the real COD-AB import) rather than the legacy flat
   * ReferenceDataItem table this component's built-in Edit dialog PATCHes. Editing a
   * government-sourced region's name/code here would silently write nowhere (there's no
   * ReferenceDataItem row with that id), so in read-only mode Edit/Delete are hidden and only
   * inspection actions (copy UUID) remain — manage the boundary itself from Zones & Boundaries.
   */
  readOnly?: boolean
}

export function RegionsDataTable({
  data,
  loading = false,
  onDelete,
  onRefresh,
  readOnly = false
}: RegionsDataTableProps) {
  // Selection
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())

  // Filters (shadcn Select dropdowns, "Select Plan" removed per user request)
  const [filterZone, setFilterZone] = useState<string>('all')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [search, setSearch] = useState<string>('')

  // Pagination (5 rows per page matching screenshot)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const rowsPerPage = 5

  // Country options from Shared Services (loaded dynamically from DB only)
  const [countries, setCountries] = useState<Array<{ code: string; label: string }>>([])

  useEffect(() => {
    fetch('/api/reference/countries')
      .then(res => res.json())
      .then(data => {
        if (data.countries && Array.isArray(data.countries)) {
          setCountries(data.countries)
        }
      })
      .catch(() => {})
  }, [])

  // Edit Modal State
  const [editRecord, setEditRecord] = useState<RegionDbRecord | null>(null)
  const [editName, setEditName] = useState('')
  const [editCapital, setEditCapital] = useState('')
  const [editCountry, setEditCountry] = useState('')
  const [editZone, setEditZone] = useState('Coastal Zone')
  const [editStatus, setEditStatus] = useState('Active')
  const [savingEdit, setSavingEdit] = useState(false)

  // Derive zones from metadata or canonical Ghanaian geography
  const getRegionZone = (code: string, metaZone?: string): string => {
    if (metaZone) return metaZone
    if (['GAR', 'WR', 'CR', 'VR'].includes(code)) return 'Coastal Zone'
    if (['ASH', 'ER', 'WN', 'BA', 'BE', 'OT'].includes(code)) return 'Middle Belt'
    return 'Northern Belt'
  }

  const handleStartEdit = (row: RegionDbRecord) => {
    setEditRecord(row)
    setEditName(row.name)
    setEditCapital(row.metadata?.capital || '')
    setEditCountry(row.metadata?.country || '')
    setEditZone(row.metadata?.zone || getRegionZone(row.code))
    setEditStatus(row.metadata?.status || 'Active')
  }

  const handleSaveEdit = async () => {
    if (!editRecord) return
    if (!editName.trim()) {
      toast.error('Region name cannot be empty')
      return
    }

    const selectedCountry = countries.find(c => c.label.toLowerCase() === editCountry.toLowerCase())
    const countryData = selectedCountry
      ? { country: selectedCountry.label, countryCode: selectedCountry.code }
      : editCountry
      ? { country: editCountry }
      : {}

    const { mmdaCount: _, ...cleanMetadata } = editRecord.metadata || {}

    setSavingEdit(true)
    try {
      const res = await fetch('/api/configuration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: 'region',
          code: editRecord.code,
          name: editName.trim(),
          metadata: {
            ...cleanMetadata,
            capital: editCapital.trim(),
            zone: editZone,
            status: editStatus,
            ...countryData
          }
        })
      })

      const json = await res.json()
      if (json.success) {
        toast.success(`Region "${editName}" updated successfully`)
        setEditRecord(null)
        onRefresh?.()
      } else {
        toast.error(json.error || 'Failed to update region')
      }
    } catch {
      toast.error('Network error updating region')
    } finally {
      setSavingEdit(false)
    }
  }

  const zoneOptions = ['all', 'Coastal Zone', 'Middle Belt', 'Northern Belt']
  const statusOptions = ['all', 'Active', 'Pending', 'Inactive']

  // Filtered dataset
  const filteredData = useMemo(() => {
    return data.filter(item => {
      const zone = getRegionZone(item.code, item.metadata?.zone)
      const status = item.metadata?.status || 'Active'

      const matchesSearch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.code.toLowerCase().includes(search.toLowerCase()) ||
        (item.metadata?.capital || '').toLowerCase().includes(search.toLowerCase()) ||
        item.id.toLowerCase().includes(search.toLowerCase())

      const matchesZone = filterZone === 'all' || zone === filterZone
      const matchesStatus = filterStatus === 'all' || status.toLowerCase() === filterStatus.toLowerCase()

      return matchesSearch && matchesZone && matchesStatus
    })
  }, [data, search, filterZone, filterStatus])

  // Pagination calculation
  const totalEntries = filteredData.length
  const totalPages = Math.ceil(totalEntries / rowsPerPage) || 1
  const validCurrentPage = Math.min(currentPage, totalPages)
  const startIndex = (validCurrentPage - 1) * rowsPerPage
  const paginatedData = filteredData.slice(startIndex, startIndex + rowsPerPage)
  const showingFrom = totalEntries === 0 ? 0 : startIndex + 1
  const showingTo = Math.min(startIndex + rowsPerPage, totalEntries)

  // Select all on current page
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

  const handleDelete = async (item: RegionDbRecord) => {
    if (confirm(`Delete database record for region: "${item.name}"?`)) {
      if (onDelete) {
        await onDelete(item.id, item.name)
      } else {
        toast.info(`Deleted ${item.name}`)
      }
    }
  }

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    toast.success(`${label} copied to clipboard`)
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Table Section Title */}
      <div>
        <h2 className="text-xl font-bold tracking-tight text-foreground">Data table with Filters</h2>
      </div>

      <Card className="shadow-2xs overflow-hidden py-0 gap-0">
        {/* Top Filters: Search, Select Zone, Select Status */}
        <div className="border-b p-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {/* Control 1: Search */}
            <div className="flex w-full flex-col gap-2">
              <Label htmlFor="search-region" className="text-sm font-medium">Search</Label>
              <InputGroup className="w-full">
                <InputGroupAddon align="inline-start">
                  <SearchIcon className="size-4 text-muted-foreground" />
                </InputGroupAddon>
                <InputGroupInput
                  id="search-region"
                  placeholder="Search by name, capital, or id..."
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

            {/* Control 2: Select Zone */}
            <div className="flex w-full flex-col gap-2">
              <Label htmlFor="filter-zone" className="text-sm font-medium">Select Zone</Label>
              <Select
                value={filterZone}
                onValueChange={(val: string | null) => {
                  if (val) {
                    setFilterZone(val)
                    setCurrentPage(1)
                  }
                }}
              >
                <SelectTrigger id="filter-zone" className="w-full">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="all">All</SelectItem>
                    {zoneOptions.filter(z => z !== 'all').map(zone => (
                      <SelectItem key={zone} value={zone}>
                        {zone}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Control 3: Select Status */}
            <div className="flex w-full flex-col gap-2">
              <Label htmlFor="filter-status" className="text-sm font-medium">Select Status</Label>
              <Select
                value={filterStatus}
                onValueChange={(val: string | null) => {
                  if (val) {
                    setFilterStatus(val)
                    setCurrentPage(1)
                  }
                }}
              >
                <SelectTrigger id="filter-status" className="w-full">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="all">All</SelectItem>
                    {statusOptions.filter(s => s !== 'all').map(st => (
                      <SelectItem key={st} value={st}>
                        {st}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>


        {/* Table with Database Headers (code, category, createdAt, version excluded per user request) */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="h-12 border-b bg-muted/40 font-mono text-xs uppercase text-muted-foreground">
                {/* Selection Checkbox */}
                <TableHead className="w-12 pl-4">
                  <Checkbox
                    checked={allCurrentPageSelected}
                    onCheckedChange={toggleSelectAll}
                    aria-label="Select all"
                  />
                </TableHead>

                {/* Database headers */}
                <TableHead className="min-w-[240px]">name</TableHead>
                <TableHead className="min-w-[240px]">metadata</TableHead>
                <TableHead className="min-w-[120px]">status</TableHead>
                <TableHead className="w-[120px] text-center">actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-40 text-center">
                    <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
                      <Spinner className="size-6 text-primary" />
                      <span className="text-xs">Loading database records...</span>
                    </div>
                  </TableCell>
                </TableRow>
              ) : paginatedData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-32 text-center text-muted-foreground">
                    No matching region records found in database.
                  </TableCell>
                </TableRow>
              ) : (
                paginatedData.map(row => {
                  const isSelected = selectedIds.has(row.id)
                  const capital = row.metadata?.capital || '—'
                  const mmdaCount = row.metadata?.mmdaCount || 0
                  const status = row.metadata?.status || 'Active'
                  const zone = getRegionZone(row.code, row.metadata?.zone)

                  // Status badge helper
                  const renderStatusBadge = (s: string) => {
                    const st = s.toLowerCase()
                    if (st === 'active') {
                      return (
                        <Badge
                          variant="outline"
                          className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20 text-[10px] font-medium"
                        >
                          <CheckCircle2Icon className="size-2.5 mr-1" />
                          Active
                        </Badge>
                      )
                    }
                    if (st === 'pending') {
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
                    return (
                      <Badge
                        variant="outline"
                        className="bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/20 text-[10px] font-medium"
                      >
                        <XCircleIcon className="size-2.5 mr-1" />
                        Inactive
                      </Badge>
                    )
                  }

                  return (
                    <TableRow
                      key={row.id}
                      data-state={isSelected ? 'selected' : undefined}
                      className="h-16 hover:bg-muted/30 transition-colors"
                    >
                      {/* Checkbox */}
                      <TableCell className="pl-4">
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={() => toggleSelectRow(row.id)}
                          aria-label={`Select ${row.name}`}
                        />
                      </TableCell>

                      {/* name (formatted with circle avatar + bold name + subtext) */}
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="size-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center font-bold text-xs text-primary shrink-0">
                            {row.name.slice(0, 2).toUpperCase()}
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="font-semibold text-sm text-foreground truncate">
                              {row.name}
                            </span>
                            <span className="text-xs text-muted-foreground font-mono truncate">
                              {row.id.slice(0, 8)}...{row.id.slice(-4)}
                            </span>
                          </div>
                        </div>
                      </TableCell>

                      {/* metadata */}
                      <TableCell>
                        <div className="flex flex-col text-xs space-y-0.5">
                          <span className="font-medium text-foreground">
                            Capital: {capital} {row.metadata?.country ? `• ${row.metadata.country}` : ''}
                          </span>
                          <span className="text-muted-foreground">
                            {mmdaCount} MMDAs • {zone}
                          </span>
                        </div>
                      </TableCell>

                      {/* status */}
                      <TableCell>
                        {renderStatusBadge(status)}
                      </TableCell>

                      {/* actions (Edit, 3-dots) */}
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-1">
                          {!readOnly && (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleStartEdit(row)}
                              className="size-8 text-muted-foreground hover:text-primary hover:bg-primary/10"
                              title="Edit Region"
                            >
                              <PencilIcon className="size-4" />
                            </Button>
                          )}

                          {/* Three Dots Menu */}
                          <DropdownMenu>
                            <DropdownMenuTrigger
                              render={
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="size-8 text-muted-foreground hover:text-foreground"
                                  title="More options"
                                />
                              }
                            >
                              <EllipsisVerticalIcon className="size-4" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48">
                              {!readOnly && (
                                <DropdownMenuItem onClick={() => handleStartEdit(row)}>
                                  <PencilIcon className="size-4 mr-2" />
                                  Edit Region
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem onClick={() => copyToClipboard(row.id, 'UUID')}>
                                <CopyIcon className="size-4 mr-2" />
                                Copy Database UUID
                              </DropdownMenuItem>
                              {!readOnly && (
                                <>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem
                                    onClick={() => handleDelete(row)}
                                    className="text-destructive focus:text-destructive focus:bg-destructive/10"
                                  >
                                    <Trash2Icon className="size-4 mr-2" />
                                    Delete Record
                                  </DropdownMenuItem>
                                </>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })
              )}
            </TableBody>
          </Table>
        </div>

        {/* Footer: Pagination matching screenshot */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 border-t bg-muted/10 text-sm">
          <p className="text-muted-foreground text-xs sm:text-sm">
            Showing <span className="font-semibold text-foreground">{showingFrom}</span> to{' '}
            <span className="font-semibold text-foreground">{showingTo}</span> of{' '}
            <span className="font-semibold text-foreground">{totalEntries}</span> entries
          </p>

          <div className="flex items-center gap-1.5">
            {/* Previous */}
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

            {/* Page number buttons */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => {
              const isActive = page === validCurrentPage
              return (
                <Button
                  key={page}
                  variant={isActive ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className={`size-8 text-xs font-semibold ${
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted text-muted-foreground'
                  }`}
                >
                  {page}
                </Button>
              )
            })}

            {/* Next */}
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

      {/* Edit Region Dialog */}
      <Dialog open={!!editRecord} onOpenChange={open => !open && setEditRecord(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <PencilIcon className="size-5 text-primary" />
              Edit Region: {editRecord?.name}
            </DialogTitle>
            <DialogDescription>
              Update administrative metadata and status for this statutory region in Shared Services (:3004).
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-3.5 py-2 text-xs">
            <div className="grid gap-1.5">
              <Label htmlFor="region-code" className="text-xs font-medium">
                Region Code
              </Label>
              <Input
                id="region-code"
                value={editRecord?.code || ''}
                disabled
                className="font-mono text-xs bg-muted/40 cursor-not-allowed"
              />
            </div>

            <div className="grid gap-1.5">
              <Label htmlFor="region-name" className="text-xs font-medium">
                Region Name
              </Label>
              <Input
                id="region-name"
                value={editName}
                onChange={e => setEditName(e.target.value)}
                placeholder="e.g. Greater Accra"
                className="text-xs"
              />
            </div>

            <div className="grid gap-1.5">
              <Label htmlFor="region-capital" className="text-xs font-medium">
                Regional Capital
              </Label>
              <Input
                id="region-capital"
                value={editCapital}
                onChange={e => setEditCapital(e.target.value)}
                placeholder="e.g. Accra"
                className="text-xs"
              />
            </div>

            <div className="grid gap-1.5">
              <Label htmlFor="region-country" className="text-xs font-medium">
                Country
              </Label>
              <Select
                value={editCountry}
                onValueChange={(val: string | null) => {
                  if (val) setEditCountry(val)
                }}
              >
                <SelectTrigger id="region-country" className="w-full text-xs">
                  <SelectValue placeholder="Select Country" />
                </SelectTrigger>
                <SelectContent className="max-h-60">
                  <SelectGroup>
                    {countries.length === 0 ? (
                      <SelectItem value="__none" disabled>
                        No countries in database
                      </SelectItem>
                    ) : (
                      countries.map(c => (
                        <SelectItem key={c.code || c.label} value={c.label}>
                          {c.label} ({c.code})
                        </SelectItem>
                      ))
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="region-mmda-count" className="text-xs font-medium">
                  MMDAs
                </Label>
                <span className="text-[10px] text-muted-foreground">Derived from Assemblies</span>
              </div>
              <Input
                id="region-mmda-count"
                value={`${editRecord?.metadata?.mmdaCount ?? 0} Assemblies`}
                disabled
                className="font-mono text-xs bg-muted/40 cursor-not-allowed"
              />
            </div>

            <div className="grid gap-1.5">
              <Label htmlFor="region-zone" className="text-xs font-medium">
                Zone
              </Label>
              <Select
                value={editZone}
                onValueChange={(val: string | null) => {
                  if (val) setEditZone(val)
                }}
              >
                <SelectTrigger id="region-zone" className="w-full text-xs">
                  <SelectValue placeholder="Select Zone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Coastal Zone">Coastal Zone</SelectItem>
                  <SelectItem value="Middle Belt">Middle Belt</SelectItem>
                  <SelectItem value="Northern Belt">Northern Belt</SelectItem>
                  <SelectItem value="Southern Zone">Southern Zone</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-1.5">
              <Label htmlFor="region-status" className="text-xs font-medium">
                Status
              </Label>
              <Select
                value={editStatus}
                onValueChange={(val: string | null) => {
                  if (val) setEditStatus(val)
                }}
              >
                <SelectTrigger id="region-status" className="w-full text-xs">
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter className="gap-3 sm:gap-3">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setEditRecord(null)}
              disabled={savingEdit}
            >
              Cancel
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={handleSaveEdit}
              disabled={savingEdit}
              className="gap-1.5"
            >
              {savingEdit && <Spinner className="size-3.5" />}
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
