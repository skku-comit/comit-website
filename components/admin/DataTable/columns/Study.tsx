'use client'

import { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { GoPencil, GoTrash } from 'react-icons/go'
import { MdContentCopy } from 'react-icons/md'

import EditableCell from '@/components/admin/DataTable/EditableCell'
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
import { API_ENDPOINTS, ApiEndpoint } from '@/constants/apiEndpoint'
import { ROUTES } from '@/constants/routes'
import { fetchData } from '@/lib/fetch'
import { Study } from '@/types'

import DeleteButton from '../../DeleteButton'

export const columns: ColumnDef<Study>[] = [
  {
    id: 'actions',
    cell: ({ row }) => {
      const study = row.original

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
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(study.id.toString())}>
              <MdContentCopy size={13} />
              &nbsp;ID 복사
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={ROUTES.STUDY.SIGNUP(row.original.id.toString()).url}>
                <GoPencil size={13} />
                &nbsp;링크
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={async () => {
                const res = await fetchData(API_ENDPOINTS.ADMIN.STUDY.DELETE(study.id) as ApiEndpoint)
                if (!res.ok) {
                  console.error('Failed to delete', study.id)
                  return
                }
                const data = await res.json() // TODO: 삭제 API 구현
                console.log('Deleted', study.id, data)
              }}
            >
              <GoTrash size={13} />
              &nbsp;삭제
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  },
  rowSelect as ColumnDef<Study>,
  {
    id: 'delete',
    header: '삭제',
    cell: ({ row }) => <DeleteButton id={row.original.id} type="study" />
  },
  {
    accessorKey: 'id',
    header: ({ column }) => <DataTableColumnHeader column={column} title="ID" />,
    cell: ({ row }) => row.original.id
  },
  {
    accessorKey: 'title',
    header: ({ column }) => <DataTableColumnHeader column={column} title="이름" />,
    cell: ({ row }) => row.original.title
  },
  {
    accessorKey: 'stack',
    header: ({ column }) => <DataTableColumnHeader column={column} title="스택" />,
    cell: ({ row }) => row.original.stacks
  },
  {
    accessorKey: 'day',
    header: ({ column }) => <DataTableColumnHeader column={column} title="요일" />,
    cell: ({ row }) => row.original.day
  },
  {
    accessorKey: 'startTime',
    header: ({ column }) => <DataTableColumnHeader column={column} title="시작시간" />,
    cell: ({ row }) => row.original.startTime
  },
  {
    accessorKey: 'endTime',
    header: ({ column }) => <DataTableColumnHeader column={column} title="종료시간" />,
    cell: ({ row }) => row.original.endTime
  },
  {
    accessorKey: 'level',
    header: ({ column }) => <DataTableColumnHeader column={column} title="난이도" />,
    cell: ({ row }) => row.original.level
  },
  {
    accessorKey: 'campus',
    header: ({ column }) => <DataTableColumnHeader column={column} title="캠퍼스" />,
    cell: ({ row }) => row.original.campus
  },
  {
    accessorKey: 'description',
    header: ({ column }) => <DataTableColumnHeader column={column} title="설명" />,
    cell: ({ row }) => row.original.description
  },
  {
    accessorKey: 'isRecruiting',
    header: ({ column }) => <DataTableColumnHeader column={column} title="모집 여부" />,
    cell: ({ row }) => (
      <EditableCell
        submitApiEndpoint={API_ENDPOINTS.ADMIN.STUDY.UPDATE_ISRECRUITING(row.original.id)}
        row={row}
        fieldName="isRecruiting"
      />
    )
  },
  {
    accessorKey: 'imageSrc',
    header: ({ column }) => <DataTableColumnHeader column={column} title="이미지" />,
    cell: ({ row }) => <img src={row.original.imageSrc} alt={row.original.title} className="h-10 w-10" />
  },
  {
    accessorKey: 'mentor',
    header: ({ column }) => <DataTableColumnHeader column={column} title="스터디장" />,
    cell: ({ row }) => row.original.mentor.username
  },
  {
    accessorKey: 'semester',
    header: ({ column }) => <DataTableColumnHeader column={column} title="학기" />,
    cell: ({ row }) => row.original.semester
  }
]
