'use client'
import Link from 'next/link'
import Image from 'next/image'
import ComitLogo from '@/public/comit.png'
import { Button } from '@/components/ui/button'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

export function NavLink({ href }: { href: string }) {
  const pathname = usePathname()
  return (
    <Link
      href={`/${href}`}
      className={cn(
        'flex items-center',
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
        'fixed top-0 z-10 h-20 w-full',
        ['/', '/signup', '/login'].includes(pathname) ? 'bg-black' : 'bg-white'
      )}
    >
      <nav className="flex h-full items-center justify-around">
        <Link href="/">
          <div className="flex items-center gap-2">
            <Image src={ComitLogo} alt="comit_logo" width={29} height={34} />
            <p
              className={cn(
                'font-semibold',
                ['/', '/signup', '/login'].includes(pathname) && 'text-white'
              )}
            >
              CoMit
            </p>
          </div>
        </Link>
        <div className="flex w-[21dvw] justify-between">
          <NavLink href="about" />
          <NavLink href="study" />
          <NavLink href="clubroom" />
        </div>
        <div className="flex h-[40px] w-[310px] items-center justify-between">
          <Button className="h-[30px] w-[140px]" asChild>
            <Link href="/signup">Sign up</Link>
          </Button>
          <Button
            className={cn(
              'h-[30px] w-[140px]',
              ['/', '/signup', '/login'].includes(pathname) && 'border-white'
            )}
            variant="outline"
            asChild
          >
            <Link href="/login">Log in</Link>
          </Button>
        </div>
      </nav>
    </header>
  )
}
