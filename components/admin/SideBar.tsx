'use client'
import Link from 'next/link'
import { BiBookBookmark } from 'react-icons/bi'
import { IoHomeSharp } from 'react-icons/io5'
import { usePathname } from 'next/navigation'
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
          href="/admin/studies"
          className={cn(
            'flex items-center justify-start hover:text-primary',
            path === '/admin/studies' ? 'text-primary' : 'text-black'
          )}
        >
          <BiBookBookmark size={28} />
          <p className="pl-[17px] text-[20px] font-medium">Studies</p>
        </Link>
      </div>
    </div>
  )
}
