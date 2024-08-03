'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'

const NavLink = ({ href, isDarkMode, text }: { href: string; isDarkMode: boolean; text: string }) => {
  const pathname = usePathname()
  const ligthModeTextColorClass = pathname === href ? 'text-primary' : 'text-black'
  const textColorClass = isDarkMode ? 'text-white' : ligthModeTextColorClass

  return (
    <Link href={href} className={cn('flex items-center text-xl hover:text-primary', textColorClass)}>
      <p className="font-medium capitalize">{text}</p>
    </Link>
  )
}

export default NavLink
