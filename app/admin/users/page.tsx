import { AdminDataTable } from '@/components/admin/DataTable'
import { columns } from '@/components/admin/DataTable/columns/User'

const UserManagePage = async () => {
  return (
    <div className="p-5">
      <h1 className="flex w-full items-center justify-start text-3xl font-extrabold">유저 관리</h1>

      <AdminDataTable columns={columns} data={[]} />
    </div>
  )
}

export default UserManagePage
