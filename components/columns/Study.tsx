'use client'

import { ColumnDef } from '@tanstack/react-table'

import { Study } from '@/types'

export const columns: ColumnDef<Study>[] = [
  {
    accessorKey: 'id',
    header: () => <div className="ml-8 min-w-24 text-left text-base">ID</div>,
    cell: ({ row }) => <p className="ml-8 text-base">{row.original.id}</p>
  },
  {
    accessorKey: 'title',
    header: () => <div className="min-w-96 text-left text-base">Title</div>,
    cell: ({ row }) => <div className="text-base">{row.original.title}</div>
  },
  {
    accessorKey: 'mentor',
    header: () => <div className="min-w-48 text-base">Mentor</div>,
    cell: ({ row }) => <p className="text-center text-base">{row.original.mentor}</p>
  },
  {
    accessorKey: 'createDate',
    header: () => <div className="mr-8 min-w-56 text-base">Mentor</div>,
    cell: ({ row }) => <p className="mr-8 text-center text-base">{row.original.createdDate.toString()}</p>
  }
]
