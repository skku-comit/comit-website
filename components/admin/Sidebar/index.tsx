import { GoBook } from 'react-icons/go'
import { IoHomeOutline } from 'react-icons/io5'
import { IoPeopleOutline } from 'react-icons/io5'

import NavLink from '@/components/admin/Sidebar/NavLink'
import { ROUTES } from '@/constants/routes'
import { cn } from '@/lib/utils'

export default function SideBar({ className }: { className?: string }) {
  return (
    <div className={cn(className, 'border-e p-5')}>
      <div className="flex flex-col gap-y-6">
        <NavLink href={ROUTES.ADMIN.DASHBOARD.url} icon={<IoHomeOutline size={28} />}>
          Dashboard
        </NavLink>
        <NavLink href={ROUTES.ADMIN.STUDY.url} icon={<GoBook size={28} />}>
          Study
        </NavLink>
        <NavLink href={ROUTES.ADMIN.USER.url} icon={<IoPeopleOutline size={28} />}>
          User
        </NavLink>
      </div>
    </div>
  )
}
