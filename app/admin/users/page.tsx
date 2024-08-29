import { columns } from '@/components/columns/Study'
import { DataTable } from '@/components/common/DataTable'

const UserManagePage = async () => {
  return (
    <div className="p-5">
      <h1 className="flex w-full items-center justify-start text-3xl font-extrabold">유저 관리</h1>

      <DataTable columns={columns} data={[]} />
    </div>
  )
}

export default UserManagePage
