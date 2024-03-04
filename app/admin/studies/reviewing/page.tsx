import { columns } from '@/components/columns/Study'
import { DataTable } from '@/components/common/DataTable'
import { Button } from '@/components/ui/button'
import { adminStudyDummyData } from '@/lib/dummy'

export default function Reviewing() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div className="text-5xl font-semibold">Reviewing Studies</div>
        <Button>Approve All</Button>
      </div>

      <DataTable columns={columns} data={adminStudyDummyData} />
    </div>
  )
}
