import { redirect } from 'next/navigation'

import { AdminDataTable } from '@/components/admin/DataTable'
import { columns } from '@/components/admin/DataTable/columns/Study'
import { API_ENDPOINTS, ApiEndpoint } from '@/constants/apiEndpoint'
import { ROUTES } from '@/constants/routes'
import { auth } from '@/lib/auth/auth'
import { fetchData } from '@/lib/fetch'
import { Study } from '@/types'

const StudyManagePage = async () => {
  const session = await auth()
  if (!session) {
    redirect(ROUTES.LOGIN.url)
  }
  if (session.error) {
    redirect(ROUTES.LOGIN.url)
  }

  const res = await fetchData(API_ENDPOINTS.ADMIN.STUDY.LIST as ApiEndpoint, {
    headers: {
      Authorization: `Bearer ${session.data?.accessToken}`
    },
    credentials: 'include'
  })
  const studies = (await res.json()).data as Study[]

  return (
    <div className="overflow-auto p-5" style={{ scrollbarWidth: 'thin', scrollbarColor: 'gray transparent' }}>
      <h1 className="mb-3 flex w-full items-center justify-start text-3xl font-extrabold">스터디 관리</h1>

      <AdminDataTable columns={columns} data={studies} />
    </div>
  )
}

export default StudyManagePage
