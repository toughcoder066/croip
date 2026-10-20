'use client'

import { useEffect, useMemo, useState } from 'react'

import { useRouter } from 'next/navigation'
import {
  SearchIcon,
  EyeIcon,
  Trash2Icon,
  EllipsisVerticalIcon,
  CopyIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  XIcon,
  MailIcon,
  CheckCircle2Icon,
  PauseCircleIcon,
  XCircleIcon,
  Building2Icon
} from 'lucide-react'
import { toast } from 'sonner'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { Label } from '@/components/ui/label'
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

export interface ConcessionRecord {
  id: string
  code: string
  name: string
  contactEmail: string
  status: string
  createdAt: string
}

interface ConcessionsDataTableProps {
  data: ConcessionRecord[]
  loading?: boolean
}

export function ConcessionsDataTable({ data, loading = false }: ConcessionsDataTableProps) {
  const router = useRouter()

  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const rowsPerPage = 5

  const [assignedCounts, setAssignedCounts] = useState<Record<string, number>>({})

  useEffect(() => {
    Promise.all(
      data.map(c =>
        fetch(`/api/concessions/${c.id}/assemblies`)
          .then(res => res.json())
          .then(res => [c.id, res.success && Array.isArray(res.data) ? res.data.length : 0] as const)
          .catch(() => [c.id, 0] as const)
      )
    ).then(entries => setAssignedCounts(Object.fromEntries(entries)))
  }, [data])

  const filteredData = useMemo(() => {
    return data.filter(item => {
      const matchesSearch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.code.toLowerCase().includes(search.toLowerCase()) ||
        item.contactEmail.toLowerCase().includes(search.toLowerCase()) ||
        item.id.toLowerCase().includes(search.toLowerCase())

      const matchesStatus = filterStatus === 'all' || item.status.toLowerCase() === filterStatus.toLowerCase()

      return matchesSearch && matchesStatus
    })
  }, [data, search, filterStatus])

  const totalEntries = filteredData.length
  const totalPages = Math.ceil(totalEntries / rowsPerPage) || 1
  const validCurrentPage = Math.min(currentPage, totalPages)
  const startIndex = (validCurrentPage - 1) * rowsPerPage
  const paginatedData = filteredData.slice(startIndex, startIndex + rowsPerPage)
  const showingFrom = totalEntries === 0 ? 0 : startIndex + 1
  const showingTo = Math.min(startIndex + rowsPerPage, totalEntries)

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    toast.success(`${label} copied to clipboard`)
  }

  const handleDelete = (item: ConcessionRecord) => {
    if (confirm(`Offboard concessionaire "${item.name}"?`)) {
      // Platform Governance does not expose a DELETE /v1/concessions/:id endpoint —
      // offboarding a concessionaire is not yet supported by the backend.
      toast.error('Offboarding concessionaires is not yet supported by the Platform Governance API.')
    }
  }

  const renderStatusBadge = (status: string) => {
    const s = status.toUpperCase()

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
          <PauseCircleIcon className="size-2.5 mr-1" />
          Suspended
        </Badge>
      )
    }

    return (
      <Badge variant="outline" className="bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/20 text-[10px] font-medium">
        <XCircleIcon className="size-2.5 mr-1" />
        {status}
      </Badge>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-xl font-bold tracking-tight text-foreground">Data table with Filters</h2>
      </div>

      <Card className="shadow-2xs overflow-hidden py-0 gap-0">
        {/* Top Filters */}
        <div className="border-b p-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="flex w-full flex-col gap-2 sm:col-span-2">
              <Label htmlFor="search-concession" className="text-sm font-medium">Search</Label>
              <InputGroup className="w-full">
                <InputGroupAddon align="inline-start">
                  <SearchIcon className="size-4 text-muted-foreground" />
                </InputGroupAddon>
                <InputGroupInput
                  id="search-concession"
                  placeholder="Search by code, name, or contact email..."
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
              <Label htmlFor="filter-status" className="text-sm font-medium">Status</Label>
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
                    <SelectItem value="ACTIVE">Active</SelectItem>
                    <SelectItem value="SUSPENDED">Suspended</SelectItem>
                    <SelectItem value="OFFBOARDED">Offboarded</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40 hover:bg-muted/40">
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground pl-6">
                  Concessionaire
                </TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Contact Email
                </TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Status
                </TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Assigned MMDAs
                </TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Onboarded
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
                      <p className="text-xs text-muted-foreground">Loading concessions...</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : paginatedData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-40 text-center text-sm text-muted-foreground">
                    No concessions match your filters.
                  </TableCell>
                </TableRow>
              ) : (
                paginatedData.map(row => (
                  <TableRow key={row.id} className="hover:bg-muted/30 transition-colors">
                    <TableCell className="pl-6">
                      <div className="flex items-center gap-2.5">
                        <div className="flex size-8 items-center justify-center rounded-md bg-primary/10 text-primary">
                          <Building2Icon className="size-4" />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-semibold text-xs text-foreground">{row.name}</span>
                          <span className="font-mono text-[11px] text-muted-foreground">
                            {row.code} • Concession Operator
                          </span>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <MailIcon className="size-3.5 text-primary" />
                        <span>{row.contactEmail}</span>
                      </div>
                    </TableCell>

                    <TableCell>{renderStatusBadge(row.status)}</TableCell>

                    <TableCell>
                      <span className="text-xs font-medium text-foreground" title="Assignments made through this console — Platform Governance does not expose a listing endpoint for assigned assemblies.">
                        {assignedCounts[row.id] ?? 0}
                      </span>
                    </TableCell>

                    <TableCell>
                      <span className="text-xs text-muted-foreground">
                        {new Date(row.createdAt).toLocaleDateString('en-GH', { year: 'numeric', month: 'short', day: 'numeric' })}
                      </span>
                    </TableCell>

                    <TableCell className="text-center pr-6">
                      <div className="flex items-center justify-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => router.push(`/concessions/${row.id}`)}
                          className="size-8 text-muted-foreground hover:text-primary hover:bg-primary/10"
                          title="View Details"
                        >
                          <EyeIcon className="size-4" />
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
                            <DropdownMenuItem onClick={() => router.push(`/concessions/${row.id}`)}>
                              <EyeIcon className="size-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => copyToClipboard(row.code, 'Code')}>
                              <CopyIcon className="size-4 mr-2" />
                              Copy Concession Code
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => handleDelete(row)}
                              className="text-destructive focus:text-destructive focus:bg-destructive/10"
                            >
                              <Trash2Icon className="size-4 mr-2" />
                              Offboard Concessionaire
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
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
                  className={`size-8 p-0 text-xs ${isActive ? 'font-bold' : 'text-muted-foreground hover:text-foreground'}`}
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
    </div>
  )
}
