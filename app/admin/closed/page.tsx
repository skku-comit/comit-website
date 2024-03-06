import { columns } from '@/components/columns/Study'
import { DataTable } from '@/components/common/DataTable'
import { adminStudyDummyData } from '@/lib/dummy'

export default function Closed() {
  return (
    // TODO: 더미데이터 대신 study api를 fetch해서 closed만 filtering 해서 사용
    <div className="flex flex-col gap-8 pt-24">
      <div className="text-5xl font-semibold">Closed Studies</div>
      <DataTable columns={columns} data={adminStudyDummyData} />
    </div>
  )
}
