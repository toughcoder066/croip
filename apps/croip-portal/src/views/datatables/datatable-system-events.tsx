'use client'

import { useState } from 'react'

import type { ColumnDef, PaginationState } from '@tanstack/react-table'
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'

import { ChevronLeftIcon, ChevronRightIcon, ServerIcon, CheckCircle2Icon, AlertCircleIcon, ActivityIcon } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem } from '@/components/ui/pagination'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

import { usePagination } from '@/hooks/use-pagination'

export type SystemEventItem = {
  id: string
  traceId: string
  serviceName: string
  servicePort: string
  operation: string
  assemblyName: string
  status: 'SUCCESS' | 'DELIVERED' | 'PROCESSED' | 'AUDITED' | 'QUEUED'
  latencyMs: number
  timestamp: string
}

export const columns: ColumnDef<SystemEventItem>[] = [
  {
    accessorKey: 'traceId',
    header: 'Trace / Event ID',
    cell: ({ row }) => (
      <div className='flex items-center gap-2.5'>
        <div className='size-8 rounded-sm bg-primary/10 text-primary flex items-center justify-center shrink-0'>
          <ServerIcon className='size-4' />
        </div>
        <div className='flex flex-col'>
          <span className='font-mono font-semibold text-xs text-foreground'>{row.getValue('traceId')}</span>
          <span className='text-[11px] text-muted-foreground'>{row.original.timestamp}</span>
        </div>
      </div>
    )
  },
  {
    accessorKey: 'serviceName',
    header: 'Microservice Origin',
    cell: ({ row }) => (
      <div className='flex flex-col text-sm'>
        <span className='font-medium text-foreground'>{row.getValue('serviceName')}</span>
        <span className='text-xs font-mono text-muted-foreground'>Port {row.original.servicePort}</span>
      </div>
    )
  },
  {
    accessorKey: 'operation',
    header: 'Operation / Action',
    cell: ({ row }) => (
      <div className='flex flex-col text-xs'>
        <span className='font-semibold text-foreground font-mono'>{row.getValue('operation')}</span>
        <span className='text-muted-foreground'>{row.original.assemblyName}</span>
      </div>
    )
  },
  {
    accessorKey: 'latencyMs',
    header: 'Latency',
    cell: ({ row }) => (
      <div className='flex items-center gap-1.5 text-xs font-mono'>
        <ActivityIcon className='size-3 text-emerald-600' />
        <span>{row.original.latencyMs}ms</span>
      </div>
    )
  },
  {
    accessorKey: 'status',
    header: 'Pipeline Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as SystemEventItem['status']
      const statusConfig = {
        SUCCESS: { label: 'Healthy', className: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20' },
        DELIVERED: { label: 'Delivered', className: 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20' },
        PROCESSED: { label: 'Processed', className: 'bg-primary/10 text-primary border-primary/20' },
        AUDITED: { label: 'Audited', className: 'bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/20' },
        QUEUED: { label: 'Queued', className: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20' }
      }
      const current = statusConfig[status] || { label: status, className: 'bg-muted text-muted-foreground' }

      return (
        <Badge variant='outline' className={`h-auto rounded-sm px-2 py-0.5 text-xs font-medium ${current.className}`}>
          <CheckCircle2Icon className='size-3 mr-1' />
          {current.label}
        </Badge>
      )
    }
  }
]

export const SystemEventsDatatable = ({ data }: { data: SystemEventItem[] }) => {
  const pageSize = 6

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: pageSize
  })

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination
    }
  })

  const { pages, showLeftEllipsis, showRightEllipsis } = usePagination({
    currentPage: table.getState().pagination.pageIndex + 1,
    totalPages: table.getPageCount(),
    paginationItemsToDisplay: 2
  })

  return (
    <div className='w-full'>
      <div className='border-b'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <TableHead key={header.id} className='text-muted-foreground h-12 first:pl-4'>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id} className='first:pl-4 py-3'>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className='h-24 text-center'>
                  No system events recorded.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className='flex items-center justify-between gap-3 px-6 py-3.5 max-sm:flex-col md:max-lg:flex-col'>
        <p className='text-muted-foreground text-xs whitespace-nowrap'>
          Showing{' '}
          <span>
            {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to{' '}
            {Math.min(
              (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
              table.getRowCount()
            )}
          </span>{' '}
          of <span>{table.getRowCount()} system traces</span>
        </p>

        <div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <Button
                  className='disabled:pointer-events-none disabled:opacity-50 h-8 text-xs'
                  variant='ghost'
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  <ChevronLeftIcon className='size-3.5 mr-1' />
                  Prev
                </Button>
              </PaginationItem>

              {showLeftEllipsis && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}

              {pages.map(page => {
                const isActive = page === table.getState().pagination.pageIndex + 1

                return (
                  <PaginationItem key={page}>
                    <Button
                      size='icon'
                      className={`size-7 text-xs ${!isActive && 'bg-primary/10 text-primary hover:bg-primary/20'}`}
                      onClick={() => table.setPageIndex(page - 1)}
                    >
                      {page}
                    </Button>
                  </PaginationItem>
                )
              })}

              {showRightEllipsis && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}

              <PaginationItem>
                <Button
                  className='disabled:pointer-events-none disabled:opacity-50 h-8 text-xs'
                  variant='ghost'
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  Next
                  <ChevronRightIcon className='size-3.5 ml-1' />
                </Button>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  )
}

export default SystemEventsDatatable
