'use client'

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable
} from '@tanstack/react-table'
import Link from 'next/link'
import React from 'react'
import { IoAddCircleOutline } from 'react-icons/io5'

import { DataTablePagination } from '@/components/common/DataTable/Pagenation'
import { DataTableViewOptions } from '@/components/common/DataTable/ViewOptions'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

interface AdminDataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function AdminDataTable<TData, TValue>({ columns, data }: AdminDataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      rowSelection
    }
  })

  return (
    <div className="rounded-md border-none">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-x-2">
          <Select>
            <SelectTrigger className="h-8 w-[180px]">
              <SelectValue placeholder="삭제" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="delete">삭제</SelectItem>
            </SelectContent>
          </Select>

          <Button asChild className="h-8 px-3">
            <Link href="#">적용</Link>
          </Button>
        </div>

        <div className="flex gap-x-2">
          <Button asChild className="h-8 px-3">
            <Link href="#">
              <IoAddCircleOutline size={20} />
              &nbsp;Create
            </Link>
          </Button>
          <DataTableViewOptions table={table} />
        </div>
      </div>

      <Table className="my-5">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'} className="hover:bg-inherit">
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="h-8 p-1">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <DataTablePagination table={table} />
    </div>
  )
}
