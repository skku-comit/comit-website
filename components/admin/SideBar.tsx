'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AiOutlineFileSearch } from 'react-icons/ai'
import { BiBookBookmark } from 'react-icons/bi'
import { IoMdBook } from 'react-icons/io'
import { IoHomeSharp } from 'react-icons/io5'

import { cn } from '@/lib/utils'

function NavLink({ href, buttonName }: { href: string; buttonName: string }) {
  return (
    <Link
      href={`/${href}`}
      className="flex items-center px-4 text-[20px] font-medium hover:text-primary"
    >
      <p>{buttonName}</p>
    </Link>
  )
}
export default function SideBar() {
  const path = usePathname()
  return (
    <div className="fixed left-0 top-20 flex h-full w-[300px] justify-center shadow-2xl">
      <div className="mt-4 flex w-[50%] flex-col gap-4">
        <Link
          href="/admin"
          className={cn(
            'flex items-center justify-start hover:text-primary',
            path === '/admin' ? 'text-primary' : 'text-black'
          )}
        >
          <IoHomeSharp size={28} />
          <p className="pl-[17px] text-[20px] font-medium">Dashboard</p>
        </Link>
        <Link
          href="/admin/reviewing"
          className={cn(
            'flex items-center justify-start hover:text-primary',
            path === '/admin/reviewing' ? 'text-primary' : 'text-black'
          )}
        >
          <AiOutlineFileSearch size={28} />
          <p className="pl-[17px] text-[20px] font-medium">Reviewing</p>
        </Link>
        <Link
          href="/admin/opened"
          className={cn(
            'flex items-center justify-start hover:text-primary',
            path === '/admin/opened' ? 'text-primary' : 'text-black'
          )}
        >
          <IoMdBook size={28} />
          <p className="pl-[17px] text-[20px] font-medium">Opened</p>
        </Link>
        <Link
          href="/admin/closed"
          className={cn(
            'flex items-center justify-start hover:text-primary',
            path === '/admin/closed' ? 'text-primary' : 'text-black'
          )}
        >
          <BiBookBookmark size={28} />
          <p className="pl-[17px] text-[20px] font-medium">Closed</p>
        </Link>
      </div>
    </div>
  )
}
