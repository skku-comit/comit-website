import { Table } from '@tanstack/react-table'
import Link from 'next/link'
import { IoAddCircleOutline } from 'react-icons/io5'

import { DataTableViewOptions } from '@/components/common/DataTable/ViewOptions'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface AdminDataTableHeaderProps<TData> {
  table: Table<TData>
}

const AdminDataTableHeader = ({ table }: AdminDataTableHeaderProps<any>) => {
  return (
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
  )
}

export default AdminDataTableHeader
