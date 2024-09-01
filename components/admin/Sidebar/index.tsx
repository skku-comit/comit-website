'use client'

import { useState } from 'react'
import { GoBook } from 'react-icons/go'
import { IoHomeOutline } from 'react-icons/io5'
import { IoPeopleOutline } from 'react-icons/io5'
import { LiaAngleDoubleRightSolid } from 'react-icons/lia'

import NavLink from '@/components/admin/Sidebar/NavLink'
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { ROUTES } from '@/constants/routes'
import { cn } from '@/lib/utils'

export default function SideBar({ className }: { className?: string }) {
  const [open, setOpen] = useState<boolean>(false)
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <div className="p-4">
          <LiaAngleDoubleRightSolid size={24} className="text-gray-500 hover:text-primary" />
        </div>
      </SheetTrigger>
      <SheetContent side={'left'} className="w-60">
        <SheetTitle />
        <SheetDescription />
        <div className={cn(className, 'p-5')}>
          <div className="flex flex-col gap-y-6">
            <NavLink
              href={ROUTES.ADMIN.DASHBOARD.url}
              icon={<IoHomeOutline size={28} />}
              onClick={() => setOpen(false)}
            >
              Dashboard
            </NavLink>
            <NavLink href={ROUTES.ADMIN.STUDY.url} icon={<GoBook size={28} />} onClick={() => setOpen(false)}>
              Study
            </NavLink>
            <NavLink href={ROUTES.ADMIN.USER.url} icon={<IoPeopleOutline size={28} />} onClick={() => setOpen(false)}>
              User
            </NavLink>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
