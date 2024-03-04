import { columns } from '@/components/columns/Study'
import { DataTable } from '@/components/common/DataTable'
import { Button } from '@/components/ui/button'
import { adminStudyDummyData } from '@/lib/dummy'

export default function Opened() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div className="text-5xl font-semibold">Opened Studies</div>
        <Button>Close All</Button>
      </div>

      <DataTable columns={columns} data={adminStudyDummyData} />
    </div>
  )
}
