'use client'

import { ColumnDef } from '@tanstack/react-table'

export interface Study {
  id: string
  title: string
  mentor: string
  createDate: string
}

export const columns: ColumnDef<Study>[] = [
  {
    accessorKey: 'id',
    header: () => <div className="ml-4 min-w-12 text-left text-base">ID</div>,
    cell: ({ row }) => <p className="ml-4 text-base">{row.original.id}</p>
  },
  {
    accessorKey: 'title',
    header: () => <div className="min-w-72 text-left text-base">Title</div>,
    cell: ({ row }) => <div className="text-base">{row.original.title}</div>
  },
  {
    accessorKey: 'mentor',
    header: () => <div className="min-w-36 text-base">Mentor</div>,
    cell: ({ row }) => (
      <p className="text-center text-base">{row.original.mentor}</p>
    )
  },
  {
    accessorKey: 'createDate',
    header: () => <div className="mr-4 text-base">Mentor</div>,
    cell: ({ row }) => (
      <p className="mr-4 text-center text-base">{row.original.createDate}</p>
    )
  }
]
