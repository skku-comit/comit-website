'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'

const NavLink = ({ href, text }: { href: string; text: string }) => {
  const pathname = usePathname()
  const parentPathname = pathname.split('/')[1]
  const hrefWithoutSlash = href.substring(1)
  const textColorClass = parentPathname === hrefWithoutSlash ? 'text-primary' : 'text-black'

  return (
    <Link href={href} className={cn('flex items-center text-xl hover:text-primary', textColorClass)}>
      <p className="font-bold capitalize">{text}</p>
    </Link>
  )
}

export default NavLink
