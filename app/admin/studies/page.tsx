import { AdminDataTable } from '@/components/admin/DataTable'
import { columns } from '@/components/admin/DataTable/columns/Study'
import { API_ENDPOINTS, ApiEndpoint } from '@/constants/apiEndpoint'
import { fetchData } from '@/lib/fetch'
import { Study } from '@/types'

const StudyManagePage = async () => {
  const res = await fetchData(API_ENDPOINTS.CLIENT.STUDY.LIST as ApiEndpoint)
  const studies = (await res.json()).data as Study[]

  return (
    <div className="overflow-auto p-5" style={{ scrollbarWidth: 'thin', scrollbarColor: 'gray transparent' }}>
      <h1 className="mb-3 flex w-full items-center justify-start text-3xl font-extrabold">스터디 관리</h1>

      <AdminDataTable columns={columns} data={studies} />
    </div>
  )
}

export default StudyManagePage
