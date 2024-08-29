'use client'

import { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal } from 'lucide-react'
import React from 'react'

import { DataTableColumnHeader } from '@/components/common/DataTable/ColumnHeader'
import rowSelect from '@/components/common/DataTable/Columns/RowSelect'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Study } from '@/types'

interface EditableCellProps {
  children: React.ReactNode
  row: {
    original: Study
  }
}

const EditableCell: React.FC<EditableCellProps> = ({ children, row }) => {
  return <div className="max-w-10 overflow-hidden whitespace-nowrap">{children}</div>
}

export const columns: ColumnDef<Study>[] = [
  {
    id: 'actions',
    cell: ({ row }) => {
      const payment = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(payment.id)}>ID 복사</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>상세보기</DropdownMenuItem>
            <DropdownMenuItem>편집</DropdownMenuItem>
            <DropdownMenuItem>삭제</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  },
  rowSelect as ColumnDef<Study>,
  {
    accessorKey: 'id',
    header: ({ column }) => <DataTableColumnHeader column={column} title="ID" />,
    cell: ({ row }) => <EditableCell row={row}>{row.original.id}</EditableCell>
  },
  {
    accessorKey: 'title',
    header: ({ column }) => <DataTableColumnHeader column={column} title="이름" />,
    cell: ({ row }) => <EditableCell row={row}>{row.original.title}</EditableCell>
  },
  {
    accessorKey: 'stack',
    header: ({ column }) => <DataTableColumnHeader column={column} title="스택" />,
    cell: ({ row }) => <EditableCell row={row}>{row.original.stack.join(', ')}</EditableCell>
  },
  {
    accessorKey: 'day',
    header: ({ column }) => <DataTableColumnHeader column={column} title="요일" />,
    cell: ({ row }) => <EditableCell row={row}>{row.original.day}</EditableCell>
  },
  {
    accessorKey: 'startTime',
    header: ({ column }) => <DataTableColumnHeader column={column} title="시작시간" />,
    cell: ({ row }) => <EditableCell row={row}>{row.original.startTime}</EditableCell>
  },
  {
    accessorKey: 'endTime',
    header: ({ column }) => <DataTableColumnHeader column={column} title="종료시간" />,
    cell: ({ row }) => <EditableCell row={row}>{row.original.endTime}</EditableCell>
  },
  {
    accessorKey: 'level',
    header: ({ column }) => <DataTableColumnHeader column={column} title="난이도" />,
    cell: ({ row }) => <EditableCell row={row}>{row.original.level}</EditableCell>
  },
  {
    accessorKey: 'campus',
    header: ({ column }) => <DataTableColumnHeader column={column} title="캠퍼스" />,
    cell: ({ row }) => <EditableCell row={row}>{row.original.campus}</EditableCell>
  },
  {
    accessorKey: 'description',
    header: ({ column }) => <DataTableColumnHeader column={column} title="설명" />,
    cell: ({ row }) => <EditableCell row={row}>{row.original.description}</EditableCell>
  },
  {
    accessorKey: 'isRecruiting',
    header: ({ column }) => <DataTableColumnHeader column={column} title="모집 여부" />,
    cell: ({ row }) => <EditableCell row={row}>{row.original.isRecruiting}</EditableCell>
  },
  {
    accessorKey: 'imageSrc',
    header: ({ column }) => <DataTableColumnHeader column={column} title="이미지" />,
    cell: ({ row }) => <EditableCell row={row}>{row.original.imageSrc}</EditableCell>
  },
  {
    accessorKey: 'mentor',
    header: ({ column }) => <DataTableColumnHeader column={column} title="스터디장" />,
    cell: ({ row }) => <EditableCell row={row}>{row.original.mentor}</EditableCell>
  }
]
