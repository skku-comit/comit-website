import { columns } from '@/components/columns/Study'
import { DataTable } from '@/components/common/DataTable'
import { Button } from '@/components/ui/button'
import { adminStudyDummyData } from '@/lib/dummy'

export default function Reviewing() {
  return (
    // TODO: 더미데이터 대신 study api를 fetch해서 reviewing만 filtering 해서 사용
    <div className="flex flex-col gap-8 pt-24">
      <div className="flex items-center justify-between">
        <div className="text-5xl font-semibold">Reviewing Studies</div>
        <Button>Approve All</Button>
      </div>
      <DataTable columns={columns} data={adminStudyDummyData} />
    </div>
  )
}
