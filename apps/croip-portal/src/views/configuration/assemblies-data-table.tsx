'use client'

import { useState, useMemo } from 'react'
import {
  SearchIcon,
  PencilIcon,
  Trash2Icon,
  EllipsisVerticalIcon,
  CopyIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  XIcon,
  MapPinIcon,
  CheckCircle2Icon,
  ClockIcon,
  XCircleIcon,
  Building2Icon
} from 'lucide-react'
import { toast } from 'sonner'
import { AssemblyDetailModal } from './assembly-detail-modal'

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

export interface AssemblyDbRecord {
  id: string
  regionId?: string
  code: string
  name: string
  category?: 'METROPOLITAN' | 'MUNICIPAL' | 'DISTRICT'
  polygonGeoJson?: any
  metadata?: {
    region?: string
    regionCode?: string
    category?: 'Metropolitan' | 'Municipal' | 'District'
    status?: string
    propertiesCount?: number
    ratepayersCount?: number
  }
}

interface AssembliesDataTableProps {
  data: AssemblyDbRecord[]
  regions?: Array<{ id: string; code: string; name: string }>
  loading?: boolean
  onDelete?: (id: string, name: string) => Promise<void>
  onRefresh?: () => void
  readOnly?: boolean
}

export function AssembliesDataTable({
  data,
  regions = [],
  loading = false,
  onDelete,
  onRefresh,
  readOnly = false
}: AssembliesDataTableProps) {
  // Row selection
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())

  // Detail & Map Modal
  const [detailModalOpen, setDetailModalOpen] = useState(false)
  const [selectedAssemblyForDetail, setSelectedAssemblyForDetail] = useState<AssemblyDbRecord | null>(null)

  const handleOpenDetail = (row: AssemblyDbRecord) => {
    setSelectedAssemblyForDetail(row)
    setDetailModalOpen(true)
  }

  // Filters
  const [filterRegion, setFilterRegion] = useState<string>('all')
  const [filterCategory, setFilterCategory] = useState<string>('all')
  const [search, setSearch] = useState<string>('')

  // Pagination
  const [currentPage, setCurrentPage] = useState<number>(1)
  const rowsPerPage = 50

  // Edit Modal State
  const [editRecord, setEditRecord] = useState<AssemblyDbRecord | null>(null)
  const [editName, setEditName] = useState('')
  const [editRegion, setEditRegion] = useState('Greater Accra')
  const [editCategory, setEditCategory] = useState<'Metropolitan' | 'Municipal' | 'District'>('Municipal')
  const [editStatus, setEditStatus] = useState('Active')
  const [savingEdit, setSavingEdit] = useState(false)

  // Dynamic regions list from dataset
  const availableRegions = useMemo(() => {
    const set = new Set<string>()
    data.forEach(a => {
      if (a.metadata?.region) set.add(a.metadata.region)
    })
    return Array.from(set).sort()
  }, [data])

  const handleStartEdit = (row: AssemblyDbRecord) => {
    setEditRecord(row)
    setEditName(row.name)
    setEditRegion(row.metadata?.region || 'Greater Accra')
    setEditCategory((row.metadata?.category as any) || 'Municipal')
    setEditStatus(row.metadata?.status || 'Active')
  }

  const handleSaveEdit = async () => {
    if (!editRecord) return
    if (!editName.trim()) {
      toast.error('Assembly name cannot be empty')
      return
    }

    setSavingEdit(true)
    try {
      const res = await fetch('/api/configuration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: 'assembly',
          code: editRecord.code,
          name: editName.trim(),
          metadata: {
            ...(editRecord.metadata || {}),
            region: editRegion,
            category: editCategory,
            status: editStatus
          }
        })
      })

      const json = await res.json()
      if (json.success) {
        toast.success(`Assembly "${editName}" updated successfully`)
        setEditRecord(null)
        onRefresh?.()
      } else {
        toast.error(json.error || 'Failed to update assembly')
      }
    } catch {
      toast.error('Network error updating assembly')
    } finally {
      setSavingEdit(false)
    }
  }

  // Filtered dataset
  const filteredData = useMemo(() => {
    return data.filter(item => {
      const region = item.metadata?.region || 'National'
      const category = item.metadata?.category || 'District'

      const matchesSearch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.code.toLowerCase().includes(search.toLowerCase()) ||
        region.toLowerCase().includes(search.toLowerCase()) ||
        item.id.toLowerCase().includes(search.toLowerCase())

      const matchesRegion = filterRegion === 'all' || region === filterRegion
      const matchesCategory = filterCategory === 'all' || category.toLowerCase() === filterCategory.toLowerCase()

      return matchesSearch && matchesRegion && matchesCategory
    })
  }, [data, search, filterRegion, filterCategory])

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

  const handleDelete = async (item: AssemblyDbRecord) => {
    if (confirm(`Delete database record for assembly: "${item.name}"?`)) {
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
        {/* Top Filters: Search, Select Region, Select Tier */}
        <div className="border-b p-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {/* Control 1: Search */}
            <div className="flex w-full flex-col gap-2">
              <Label htmlFor="search-assembly" className="text-sm font-medium">Search</Label>
              <InputGroup className="w-full">
                <InputGroupAddon align="inline-start">
                  <SearchIcon className="size-4 text-muted-foreground" />
                </InputGroupAddon>
                <InputGroupInput
                  id="search-assembly"
                  placeholder="Search by code, name, or region..."
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

            {/* Control 2: Select Region */}
            <div className="flex w-full flex-col gap-2">
              <Label htmlFor="filter-region" className="text-sm font-medium">Select Region</Label>
              <Select
                value={filterRegion}
                onValueChange={(val: string | null) => {
                  if (val) {
                    setFilterRegion(val)
                    setCurrentPage(1)
                  }
                }}
              >
                <SelectTrigger id="filter-region" className="w-full">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="all">All</SelectItem>
                    {availableRegions.map(reg => (
                      <SelectItem key={reg} value={reg}>
                        {reg}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Control 3: Select Governance Tier */}
            <div className="flex w-full flex-col gap-2">
              <Label htmlFor="filter-category" className="text-sm font-medium">Select Tier</Label>
              <Select
                value={filterCategory}
                onValueChange={(val: string | null) => {
                  if (val) {
                    setFilterCategory(val)
                    setCurrentPage(1)
                  }
                }}
              >
                <SelectTrigger id="filter-category" className="w-full">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="Metropolitan">Metropolitan</SelectItem>
                    <SelectItem value="Municipal">Municipal</SelectItem>
                    <SelectItem value="District">District</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* The Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40 hover:bg-muted/40">
                {/* Multi-select header */}
                <TableHead className="w-12 pl-6">
                  <Checkbox
                    checked={allCurrentPageSelected}
                    onCheckedChange={toggleSelectAll}
                    aria-label="Select all rows on current page"
                  />
                </TableHead>

                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Assembly
                </TableHead>

                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Administrative Region
                </TableHead>

                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Tier / Category
                </TableHead>

                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Status
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
                      <p className="text-xs text-muted-foreground">Loading assemblies...</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : paginatedData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-40 text-center text-sm text-muted-foreground">
                    No assemblies match your filters.
                  </TableCell>
                </TableRow>
              ) : (
                paginatedData.map(row => {
                  const isSelected = selectedIds.has(row.id)
                  const category = row.metadata?.category || 'District'
                  const region = row.metadata?.region || 'National'
                  const status = row.metadata?.status || 'Active'

                  return (
                    <TableRow
                      key={row.id}
                      data-state={isSelected ? 'selected' : undefined}
                      className="hover:bg-muted/30 transition-colors"
                    >
                      {/* Checkbox */}
                      <TableCell className="pl-6">
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={() => toggleSelectRow(row.id)}
                          aria-label={`Select ${row.name}`}
                        />
                      </TableCell>

                      {/* Assembly Name & Code */}
                      <TableCell>
                        <div
                          className="flex flex-col cursor-pointer group"
                          onClick={() => handleOpenDetail(row)}
                          title="Click to view & edit details and boundary map"
                        >
                          <span className="font-semibold text-xs text-foreground group-hover:text-primary transition-colors flex items-center gap-1.5">
                            {row.name}
                            <MapPinIcon className="size-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                          </span>
                          <span className="font-mono text-[11px] text-muted-foreground">
                            {row.code} • UUID: {row.id.slice(0, 8)}...
                          </span>
                        </div>
                      </TableCell>

                      {/* Region */}
                      <TableCell>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <MapPinIcon className="size-3.5 text-primary" />
                          <span>{region}</span>
                        </div>
                      </TableCell>

                      {/* Tier / Category */}
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`text-[10px] font-medium ${
                            category === 'Metropolitan'
                              ? 'bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/20'
                              : category === 'Municipal'
                              ? 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20'
                              : 'bg-muted text-muted-foreground'
                          }`}
                        >
                          {category}
                        </Badge>
                      </TableCell>

                      {/* Status */}
                      <TableCell>
                        {(() => {
                          const s = (status || 'Active').toLowerCase()
                          if (s === 'active') {
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
                          if (s === 'pending') {
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
                        })()}
                      </TableCell>

                      {/* Actions */}
                      <TableCell className="text-center pr-6">
                        <div className="flex items-center justify-center gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleOpenDetail(row)}
                            className="size-8 text-muted-foreground hover:text-primary hover:bg-primary/10"
                            title="View & Edit Assembly Details and Boundary Map"
                          >
                            <PencilIcon className="size-4" />
                          </Button>

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
                            <DropdownMenuContent align="end" className="w-52">
                              <DropdownMenuItem onClick={() => handleOpenDetail(row)}>
                                <MapPinIcon className="size-4 mr-2" />
                                View Details &amp; Map
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleOpenDetail(row)}>
                                <PencilIcon className="size-4 mr-2" />
                                Edit Boundary Points
                              </DropdownMenuItem>
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

      {/* Edit Modal Dialog */}
      <Dialog open={!!editRecord} onOpenChange={open => !open && setEditRecord(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-base font-semibold">Edit Assembly</DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Modify the administrative boundaries and governance tier in Shared Services (:3004).
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-3.5 py-2 text-xs">
            <div className="grid gap-1.5">
              <Label htmlFor="assembly-code" className="text-xs font-medium">
                Assembly Code
              </Label>
              <Input
                id="assembly-code"
                value={editRecord?.code || ''}
                disabled
                className="font-mono text-xs bg-muted/40 cursor-not-allowed"
              />
            </div>

            <div className="grid gap-1.5">
              <Label htmlFor="assembly-name" className="text-xs font-medium">
                Official MMDA Name
              </Label>
              <Input
                id="assembly-name"
                value={editName}
                onChange={e => setEditName(e.target.value)}
                placeholder="e.g. Accra Metropolitan Assembly"
                className="text-xs"
              />
            </div>

            <div className="grid gap-1.5">
              <Label htmlFor="assembly-region" className="text-xs font-medium">
                Administrative Region
              </Label>
              <Select
                value={editRegion}
                onValueChange={(val: string | null) => {
                  if (val) setEditRegion(val)
                }}
              >
                <SelectTrigger id="assembly-region" className="w-full text-xs">
                  <SelectValue placeholder="Select Region" />
                </SelectTrigger>
                <SelectContent className="max-h-60">
                  <SelectGroup>
                    {availableRegions.map(reg => (
                      <SelectItem key={reg} value={reg}>
                        {reg}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-1.5">
              <Label htmlFor="assembly-tier" className="text-xs font-medium">
                Governance Tier
              </Label>
              <Select
                value={editCategory}
                onValueChange={(val: string | null) => {
                  if (val) setEditCategory(val as any)
                }}
              >
                <SelectTrigger id="assembly-tier" className="w-full text-xs">
                  <SelectValue placeholder="Select Tier" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Metropolitan">Metropolitan (Pop. 250,000+)</SelectItem>
                  <SelectItem value="Municipal">Municipal (Pop. 95,000+)</SelectItem>
                  <SelectItem value="District">District (Pop. 75,000+)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-1.5">
              <Label htmlFor="assembly-status" className="text-xs font-medium">
                Status
              </Label>
              <Select
                value={editStatus}
                onValueChange={(val: string | null) => {
                  if (val) setEditStatus(val)
                }}
              >
                <SelectTrigger id="assembly-status" className="w-full text-xs">
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
              variant="outline"
              size="sm"
              onClick={() => setEditRecord(null)}
              className="text-xs"
              disabled={savingEdit}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={handleSaveEdit}
              disabled={savingEdit}
              className="text-xs"
            >
              {savingEdit ? <Spinner className="size-3 mr-1.5" /> : null}
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Full GIS Assembly Detail & Boundary Points Editor Modal */}
      <AssemblyDetailModal
        open={detailModalOpen}
        onOpenChange={setDetailModalOpen}
        assembly={selectedAssemblyForDetail as any}
        regions={regions}
        onSaved={onRefresh}
      />
    </div>
  )
}
