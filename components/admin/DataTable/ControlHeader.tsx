import { Table } from '@tanstack/react-table'
import React from 'react'
import { IoAddCircleOutline } from 'react-icons/io5'

import RowAction from '@/components/admin/DataTable/RowAction'
import { DataTableViewOptions } from '@/components/common/DataTable/ViewOptions'
import { Button } from '@/components/ui/button'

interface ControlHeaderProps {
  table: Table<any>
  getRowSelection: () => Record<string, boolean>
}

const ControlHeader = ({ table, getRowSelection }: ControlHeaderProps) => {
  return (
    <div className="flex w-full items-center justify-between">
      <RowAction table={table} getRowSelection={getRowSelection} />

      <div className="flex gap-x-2">
        <Button className="h-8 px-3">
          <IoAddCircleOutline size={20} />
          &nbsp;Create
        </Button>
        <DataTableViewOptions table={table} />
      </div>
    </div>
  )
}

export default ControlHeader
