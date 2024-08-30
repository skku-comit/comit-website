'use client'

import { ColumnDef } from '@tanstack/react-table'

import { User } from '@/types'

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'id',
    header: () => <div className="ml-8 min-w-24 text-left text-base">ID</div>,
    cell: ({ row }) => <p className="ml-8 text-base">{row.original.id}</p>
  },
  {
    accessorKey: 'createDate',
    header: () => <div className="mr-8 min-w-56 text-base">Mentor</div>,
    cell: ({ row }) => <p className="mr-8 text-center text-base">{row.original.createdDate.toString()}</p>
  }
]
