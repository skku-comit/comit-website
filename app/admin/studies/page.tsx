import { columns } from '@/components/columns/admin/Study'
import { DataTable } from '@/components/common/DataTable'
import { API_ENDPOINTS } from '@/constants/apiEndpoint'
import { fetchData } from '@/lib/fetch'
import { Study } from '@/types'

const StudyManagePage = async () => {
  const res = await fetchData(API_ENDPOINTS.STUDY.LIST)
  const studies = (await res.json()).data as Study[]

  return (
    <div className="overflow-auto p-5" style={{ scrollbarWidth: 'thin', scrollbarColor: 'gray transparent' }}>
      <h1 className="flex w-full items-center justify-start text-3xl font-extrabold">스터디 관리</h1>

      <DataTable columns={columns} data={studies} />
    </div>
  )
}

export default StudyManagePage
