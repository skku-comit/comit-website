'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'

const NavLink = ({
  href,
  icon,
  children,
  className,
  onClick
}: {
  href: string
  icon: React.ReactNode
  children: React.ReactNode
  className?: string
  onClick?: () => void
}) => {
  const pathname = usePathname()
  const [_, parentPathname, childPathname] = pathname.split('/')
  const hrefWithoutSlash = href.substring(1)
  const rootPathname = childPathname ? `${parentPathname}/${childPathname}` : parentPathname

  const activeClass = rootPathname === hrefWithoutSlash ? 'text-primary' : 'text-black'

  return (
    <Link
      href={href}
      className={cn('flex items-center justify-start gap-x-4 hover:text-primary', activeClass, className)}
      onClick={onClick}
    >
      {icon}
      <p className="text-lg font-bold">{children}</p>
    </Link>
  )
}

export default NavLink
