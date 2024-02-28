'use client'
import Link from 'next/link'
import Image from 'next/image'
import ComitLogo from '@/public/comit.png'
import { Button } from '@/components/ui/button'
import { usePathname } from 'next/navigation'
import { GiHamburgerMenu } from 'react-icons/gi'
import { cn } from '@/lib/utils'

export function NavLink({ href }: { href: string }) {
  const pathname = usePathname()
  return (
    <Link
      href={`/${href}`}
      className={cn(
        'flex items-center text-xl',
        ['/', '/signup', '/login'].includes(pathname) && 'text-white'
      )}
    >
      <p className="font-medium capitalize">{href}</p>
    </Link>
  )
}
export default function Header() {
  const pathname = usePathname()
  return (
    <header
      className={cn(
        'fixed top-0 z-10 flex h-20 w-full justify-center',
        ['/', '/signup', '/login'].includes(pathname)
          ? 'bg-black'
          : 'border-b border-b-gray-200 bg-white'
      )}
    >
      <nav className="flex h-full w-[1280px] items-center justify-between px-4">
        <Link href="/">
          <div className="flex items-center gap-2">
            <Image src={ComitLogo} alt="comit_logo" width={32} height={37} />
            <p
              className={cn(
                'text-xl font-semibold',
                ['/', '/signup', '/login'].includes(pathname) && 'text-white'
              )}
            >
              CoMit
            </p>
          </div>
        </Link>
        <div className="hidden md:flex md:gap-10 lg:gap-24">
          <NavLink href="about" />
          <NavLink href="study" />
          <NavLink href="clubroom" />
        </div>
        <div className="hidden h-[40px] w-[270px] items-center justify-between md:flex lg:w-[310px]">
          <Button className="h-[36px] w-[120px] text-base lg:w-[140px]" asChild>
            <Link href="/signup">Sign up</Link>
          </Button>
          <Button
            className={cn(
              'h-[36px] w-[120px] text-base lg:w-[140px]',
              ['/', '/signup', '/login'].includes(pathname) && 'border-white'
            )}
            variant="outline"
            asChild
          >
            <Link href="/login">Log in</Link>
          </Button>
        </div>
        <GiHamburgerMenu className="md:hidden" size={32}/>
      </nav>
    </header>
  )
}
