'use client'

import { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import { GoPencil, GoTrash } from 'react-icons/go'
import { MdContentCopy } from 'react-icons/md'

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
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { API_ENDPOINTS } from '@/constants/apiEndpoint'
import { ROUTES } from '@/constants/routes'
import { fetchData } from '@/lib/fetch'
import { Study } from '@/types'

interface EditableCellProps {
  fieldName: keyof Study
  row: {
    original: Study
  }
  readonly?: boolean
}

const EditableCell: React.FC<EditableCellProps> = ({ fieldName, row, readonly }) => {
  const initialValue = row.original[fieldName]
  const [open, setOpen] = useState<boolean>(false)
  const [value, setValue] = useState<string | number | boolean | string[]>(initialValue ?? '')
  const [inputValue, setInputValue] = useState<string | number | boolean | string[]>(initialValue ?? '')
  const id = row.original.id

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    console.log('submit', id, fieldName, inputValue)
    const res = await fetchData(API_ENDPOINTS.STUDY.UPDATE(id), {
      body: JSON.stringify({ [fieldName]: inputValue }),
      cache: 'no-cache'
    })
    if (!res.ok) {
      console.error('Failed to update', fieldName, id, inputValue)
      return
    }
    const data = await res.json()
    console.log('Updated', fieldName, id, inputValue, data)
    setValue(inputValue)
    setOpen(false)
  }

  const inputClass = 'py-1 m-0 h-8 text-xs'

  return (
    <Popover open={open} onOpenChange={() => setOpen(!readonly && true)}>
      <PopoverTrigger className="m-1 h-full w-full rounded border hover:bg-slate-200">
        <div className="max-w-[16rem] overflow-hidden whitespace-nowrap px-2 text-start">{value.toString()}</div>
      </PopoverTrigger>
      <PopoverContent className="p-2" onEscapeKeyDown={() => setOpen(false)}>
        <form onSubmit={handleSubmit}>
          {typeof inputValue === 'boolean' ? (
            <Input
              type="checkbox"
              checked={inputValue}
              onChange={() => setInputValue((prev) => !prev)}
              className={inputClass}
            />
          ) : (
            <Input value={inputValue} onChange={(e) => setInputValue(e.target.value)} className={inputClass} />
          )}
          <div className="mt-2 flex justify-end gap-x-2">
            <Button variant="ghost" type="reset" onClick={() => setOpen(false)} className="h-8 p-2 text-sm">
              취소
            </Button>
            <Button type="submit" className="h-8 p-2 text-sm">
              저장
            </Button>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  )
}

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
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(study.id)}>
              <MdContentCopy size={13} />
              &nbsp;ID 복사
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={ROUTES.STUDY.SIGNUP(row.original.id).url}>
                <GoPencil size={13} />
                &nbsp;링크
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={async () => {
                const res = await fetchData(API_ENDPOINTS.STUDY.DELETE(study.id))
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
    accessorKey: 'id',
    header: ({ column }) => <DataTableColumnHeader column={column} title="ID" />,
    cell: ({ row }) => <EditableCell row={row} fieldName="id" readonly={true} />
  },
  {
    accessorKey: 'title',
    header: ({ column }) => <DataTableColumnHeader column={column} title="이름" />,
    cell: ({ row }) => <EditableCell row={row} fieldName="title" />
  },
  {
    accessorKey: 'stack',
    header: ({ column }) => <DataTableColumnHeader column={column} title="스택" />,
    cell: ({ row }) => <EditableCell row={row} fieldName="stack" />
  },
  {
    accessorKey: 'day',
    header: ({ column }) => <DataTableColumnHeader column={column} title="요일" />,
    cell: ({ row }) => <EditableCell row={row} fieldName="day" />
  },
  {
    accessorKey: 'startTime',
    header: ({ column }) => <DataTableColumnHeader column={column} title="시작시간" />,
    cell: ({ row }) => <EditableCell row={row} fieldName="startTime" />
  },
  {
    accessorKey: 'endTime',
    header: ({ column }) => <DataTableColumnHeader column={column} title="종료시간" />,
    cell: ({ row }) => <EditableCell row={row} fieldName="endTime" />
  },
  {
    accessorKey: 'level',
    header: ({ column }) => <DataTableColumnHeader column={column} title="난이도" />,
    cell: ({ row }) => <EditableCell row={row} fieldName="level" />
  },
  {
    accessorKey: 'campus',
    header: ({ column }) => <DataTableColumnHeader column={column} title="캠퍼스" />,
    cell: ({ row }) => <EditableCell row={row} fieldName="campus" />
  },
  {
    accessorKey: 'description',
    header: ({ column }) => <DataTableColumnHeader column={column} title="설명" />,
    cell: ({ row }) => <EditableCell row={row} fieldName="description" />
  },
  {
    accessorKey: 'isRecruiting',
    header: ({ column }) => <DataTableColumnHeader column={column} title="모집 여부" />,
    cell: ({ row }) => <EditableCell row={row} fieldName="isRecruiting" />
  },
  {
    accessorKey: 'imageSrc',
    header: ({ column }) => <DataTableColumnHeader column={column} title="이미지" />,
    cell: ({ row }) => <EditableCell row={row} fieldName="imageSrc" />
  },
  {
    accessorKey: 'mentor',
    header: ({ column }) => <DataTableColumnHeader column={column} title="스터디장" />,
    cell: ({ row }) => <EditableCell row={row} fieldName="mentor" />
  }
]
