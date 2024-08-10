'use client'

import { columns } from '@/components/columns/Study'
import { DataTable } from '@/components/common/DataTable'

export default function Opened() {
  return (
    <div className="flex flex-col gap-8 pt-24">
      <div className="text-5xl font-semibold">Opened Studies</div>
      <DataTable columns={columns} data={[]} />
    </div>
  )
}
