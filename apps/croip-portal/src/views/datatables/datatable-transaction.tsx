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

import { ChevronLeftIcon, ChevronRightIcon, EllipsisVerticalIcon } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem } from '@/components/ui/pagination'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

import { usePagination } from '@/hooks/use-pagination'

import { CediIcon } from '@/components/icons/CediIcon'

export type Item = {
  id: string
  avatar?: string
  avatarFallback: string
  name: string
  email: string
  amount: number
  status: 'pending' | 'processing' | 'paid' | 'failed'
  paidBy: 'mastercard' | 'visa' | 'momo' | 'telecel' | 'ghanapay'
}

export const columns: ColumnDef<Item>[] = [
  {
    accessorKey: 'name',
    header: 'Property',
    cell: ({ row }) => (
      <div className='flex items-center gap-2.5'>
        <Avatar className='size-9 border border-border/50'>
          {row.original.avatar && <AvatarImage src={row.original.avatar} alt={row.getValue('name')} />}
          <AvatarFallback className='text-xs font-semibold bg-primary/10 text-primary'>
            {row.original.avatarFallback}
          </AvatarFallback>
        </Avatar>
        <div className='flex flex-col text-sm'>
          <span className='text-card-foreground font-medium'>{row.getValue('name')}</span>
          <span className='text-muted-foreground text-xs font-mono'>{row.original.email}</span>
        </div>
      </div>
    )
  },
  {
    accessorKey: 'amount',
    header: 'Assessed Value',
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('amount'))

      const formatted = new Intl.NumberFormat('en-GH', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(amount)

      return (
        <span className='font-semibold inline-flex items-center gap-1 text-foreground'>
          <CediIcon className='size-3.5 text-primary shrink-0' />
          <span>{formatted}</span>
        </span>
      )
    }
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as Item['status']
      const statusMap = {
        paid: { label: 'Verified', className: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20' },
        processing: { label: 'Under Review', className: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20' },
        pending: { label: 'Pending', className: 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20' },
        failed: { label: 'Unverified', className: 'bg-muted text-muted-foreground border-border' }
      }
      const current = statusMap[status] || { label: status, className: 'bg-primary/10 text-primary' }

      return (
        <Badge variant='outline' className={`h-auto rounded-sm px-2 py-0.5 capitalize font-medium ${current.className}`}>
          {current.label}
        </Badge>
      )
    }
  },
  {
    accessorKey: 'paidBy',
    header: () => <span className='w-fit'>Reference / Channel</span>,
    cell: ({ row }) => {
      const paidBy = row.getValue('paidBy') as Item['paidBy']
      if (paidBy === 'momo') {
        return (
          <span className='inline-flex items-center gap-1 rounded bg-amber-500/10 px-2 py-0.5 text-xs font-semibold text-amber-700 dark:text-amber-400 border border-amber-500/20'>
            Mobile Money
          </span>
        )
      }
      if (paidBy === 'telecel') {
        return (
          <span className='inline-flex items-center gap-1 rounded bg-red-500/10 px-2 py-0.5 text-xs font-semibold text-red-700 dark:text-red-400 border border-red-500/20'>
            Telecel Cash
          </span>
        )
      }
      if (paidBy === 'ghanapay') {
        return (
          <span className='inline-flex items-center gap-1 rounded bg-teal-500/10 px-2 py-0.5 text-xs font-semibold text-teal-700 dark:text-teal-400 border border-teal-500/20'>
            Bank / GhanaPay
          </span>
        )
      }
      return (
        <img
          src={paidBy === 'mastercard' ? '/images/datatable/image-1.webp' : '/images/datatable/image-2.webp'}
          alt='Payment platform'
          className='w-10.5'
        />
      )
    }
  },
  {
    id: 'actions',
    header: () => 'Actions',
    cell: () => <RowActions />,
    size: 60,
    enableHiding: false
  }
]

const TransactionDatatable = ({ data }: { data: Item[] }) => {
  const pageSize = 5

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
                {headerGroup.headers.map(header => {
                  return (
                    <TableHead key={header.id} className='text-muted-foreground h-14 first:pl-4'>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id} className='first:pl-4'>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className='h-24 text-center'>
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className='flex items-center justify-between gap-3 px-6 py-4 max-sm:flex-col md:max-lg:flex-col'>
        <p className='text-muted-foreground text-sm whitespace-nowrap' aria-live='polite'>
          Showing{' '}
          <span>
            {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to{' '}
            {Math.min(
              Math.max(
                table.getState().pagination.pageIndex * table.getState().pagination.pageSize +
                  table.getState().pagination.pageSize,
                0
              ),
              table.getRowCount()
            )}
          </span>{' '}
          of <span>{table.getRowCount().toString()} entries</span>
        </p>

        <div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <Button
                  className='disabled:pointer-events-none disabled:opacity-50'
                  variant='ghost'
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                  aria-label='Go to previous page'
                >
                  <ChevronLeftIcon aria-hidden='true' />
                  Previous
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
                      className={`${!isActive && 'bg-primary/10 text-primary hover:bg-primary/20 focus-visible:ring-primary/20 dark:focus-visible:ring-primary/40'}`}
                      onClick={() => table.setPageIndex(page - 1)}
                      aria-current={isActive ? 'page' : undefined}
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
                  className='disabled:pointer-events-none disabled:opacity-50'
                  variant='ghost'
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                  aria-label='Go to next page'
                >
                  Next
                  <ChevronRightIcon aria-hidden='true' />
                </Button>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  )
}

export default TransactionDatatable

function RowActions() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button size='icon' variant='ghost' aria-label='Edit item' />}>
        <EllipsisVerticalIcon className='size-5' aria-hidden='true' />
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <span>Edit</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <span>Duplicate</span>
          </DropdownMenuItem>
          <DropdownMenuItem variant='destructive'>
            <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
