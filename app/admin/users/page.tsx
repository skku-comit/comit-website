import { redirect } from 'next/navigation'

import { AdminDataTable } from '@/components/admin/DataTable'
import { columns } from '@/components/admin/DataTable/columns/User'
import { API_ENDPOINTS, ApiEndpoint } from '@/constants/apiEndpoint'
import { ROUTES } from '@/constants/routes'
import { auth } from '@/lib/auth/auth'
import { fetchData } from '@/lib/fetch'
import { User } from '@/types'

const UserManagePage = async () => {
  const session = await auth()
  if (!session) {
    redirect(ROUTES.LOGIN.url)
  }
  if (session.error) {
    redirect(ROUTES.LOGIN.url)
  }
  const accessToken = session.data?.accessToken

  const res = await fetchData(API_ENDPOINTS.ADMIN.USER.LIST as ApiEndpoint, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
    credentials: 'include'
  })
  const users = (await res.json()).data as User[]

  return (
    <div className="p-5">
      <h1 className="flex w-full items-center justify-start text-3xl font-extrabold">유저 관리</h1>

      <AdminDataTable columns={columns} data={users} />
    </div>
  )
}

export default UserManagePage
