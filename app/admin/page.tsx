import { redirect } from 'next/navigation'

import { columns } from '@/components/columns/Study'
import { DataTable } from '@/components/common/DataTable'
import { API_ENDPOINTS } from '@/constants/apiEndpoint'
import { fetchData } from '@/lib/fetch'
import { Study } from '@/types'

export default async function Admin() {
  const res = await fetchData(API_ENDPOINTS.STUDY.LIST)
  if (!res.ok) {
    switch (res.status) {
      default:
        redirect('/error')
    }
  }
  const json = await res.json()
  const data: Study[] = json.data

  return (
    <div className="p-5">
      <h1 className="flex w-full items-center justify-start text-xl">Dashboard</h1>
      <DataTable columns={columns} data={data} />
    </div>
  )
}
