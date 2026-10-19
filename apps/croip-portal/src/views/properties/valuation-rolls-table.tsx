'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import {
  SearchIcon,
  XIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CheckCircle2Icon,
  HistoryIcon,
  ExternalLinkIcon
} from 'lucide-react'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { Spinner } from '@/components/ui/spinner'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

export interface ValuationRollRecord {
  id: string
  propertyId: string
  propertyCode: string
  propertyName?: string | null
  valuationListId: string
  lvdReference: string
  rateableValue: number | string
  isCurrent: boolean
  effectiveDate: string
  createdAt: string
}

interface ValuationRollsTableProps {
  data: ValuationRollRecord[]
  loading?: boolean
}

const currencyFormatter = new Intl.NumberFormat('en-GH', {
  style: 'currency',
  currency: 'GHS',
  minimumFractionDigits: 2
})

export function ValuationRollsTable({ data, loading = false }: ValuationRollsTableProps) {
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const rowsPerPage = 8

  const filteredData = useMemo(() => {
    const term = search.toLowerCase()
    return data.filter(row =>
      [row.propertyCode, row.propertyName, row.lvdReference, row.valuationListId]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
        .includes(term)
    )
  }, [data, search])

  const totalEntries = filteredData.length
  const totalRateable = filteredData.reduce((sum, row) => sum + Number(row.rateableValue || 0), 0)
  const totalPages = Math.ceil(totalEntries / rowsPerPage) || 1
  const validCurrentPage = Math.min(currentPage, totalPages)
  const startIndex = (validCurrentPage - 1) * rowsPerPage
  const paginatedData = filteredData.slice(startIndex, startIndex + rowsPerPage)
  const showingFrom = totalEntries === 0 ? 0 : startIndex + 1
  const showingTo = Math.min(startIndex + rowsPerPage, totalEntries)

  return (
    <Card className="shadow-2xs overflow-hidden py-0 gap-0">
      <div className="border-b p-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="flex w-full flex-col gap-2 sm:col-span-2">
            <Label htmlFor="search-valuation" className="text-sm font-medium">Search</Label>
            <InputGroup className="w-full">
              <InputGroupAddon align="inline-start">
                <SearchIcon className="size-4 text-muted-foreground" />
              </InputGroupAddon>
              <InputGroupInput
                id="search-valuation"
                placeholder="Search by property code, name, or LVD reference..."
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
            <Label className="text-sm font-medium">Total Rateable Value (filtered)</Label>
            <div className="flex h-9 items-center rounded-md border border-input bg-muted/30 px-3 text-sm font-semibold text-foreground">
              {currencyFormatter.format(totalRateable)}
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40 hover:bg-muted/40">
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground pl-6">
                Property
              </TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Valuation List / LVD Ref.
              </TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Rateable Value
              </TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Effective Date
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
                    <p className="text-xs text-muted-foreground">Loading valuation rolls...</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : paginatedData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-40 text-center text-sm text-muted-foreground">
                  No valuation records match your filters.
                </TableCell>
              </TableRow>
            ) : (
              paginatedData.map(row => (
                <TableRow key={row.id} className="hover:bg-muted/30 transition-colors">
                  <TableCell className="pl-6">
                    <div className="flex flex-col">
                      <span className="font-semibold text-xs text-foreground">
                        {row.propertyName || 'Unnamed Property'}
                      </span>
                      <span className="font-mono text-[11px] text-muted-foreground">{row.propertyCode}</span>
                    </div>
                  </TableCell>

                  <TableCell>
                    <span className="font-mono text-[11px] text-muted-foreground">{row.lvdReference}</span>
                  </TableCell>

                  <TableCell>
                    <span className="text-xs font-semibold text-foreground">
                      {currencyFormatter.format(Number(row.rateableValue || 0))}
                    </span>
                  </TableCell>

                  <TableCell>
                    <span className="text-xs text-muted-foreground">
                      {row.effectiveDate
                        ? new Date(row.effectiveDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
                        : '—'}
                    </span>
                  </TableCell>

                  <TableCell>
                    {row.isCurrent ? (
                      <Badge
                        variant="outline"
                        className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20 text-[10px] font-medium"
                      >
                        <CheckCircle2Icon className="size-2.5 mr-1" />
                        Current
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-muted text-muted-foreground text-[10px] font-medium">
                        <HistoryIcon className="size-2.5 mr-1" />
                        Superseded
                      </Badge>
                    )}
                  </TableCell>

                  <TableCell className="text-center pr-6">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8 text-muted-foreground hover:text-primary hover:bg-primary/10"
                      title="View property"
                      render={<Link href={`/properties/${row.propertyId}`} />}
                      nativeButton={false}
                    >
                      <ExternalLinkIcon className="size-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

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
