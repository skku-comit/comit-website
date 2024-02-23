'use client'
import Link from 'next/link'
import Image from 'next/image'
import ComitLogo from '@/public/comit.png'
import { Button } from '@/components/ui/button'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

export default function Header() {
  const pathname = usePathname()
  return (
    <header
      className={cn('fixed top-0 h-20 w-full', pathname === '/' && 'bg-black')}
    >
      <nav className="flex h-full items-center justify-around">
        <Link href="/">
          <div className="flex items-center gap-2">
            <Image
              src={ComitLogo}
              alt="comit logo"
              width={29}
              height={34}
            ></Image>
            <p
              className={cn('font-semibold', pathname === '/' && 'text-white')}
            >
              CoMit
            </p>
          </div>
        </Link>
        <div className="flex w-[21dvw] justify-between">
          <Link
            href="/about"
            className={cn(
              'flex items-center',
              pathname === '/' && 'text-white'
            )}
          >
            <p className="font-medium">About</p>
          </Link>
          <Link
            href="/study"
            className={cn(
              'flex items-center',
              pathname === '/' && 'text-white'
            )}
          >
            <p className="font-medium">Study</p>
          </Link>
          <Link
            href="/clubroom"
            className={cn(
              'flex items-center',
              pathname === '/' && 'text-white'
            )}
          >
            <p className="font-medium">Clubroom</p>
          </Link>
        </div>
        <div className="flex h-[40px] w-[310px] items-center justify-between">
          <Button className="h-[30px] w-[140px]" asChild>
            <Link href="/signup">Sign up</Link>
          </Button>
          <Button className={cn('h-[30px] w-[140px]', pathname === '/' && 'border-white')} variant="outline" asChild>
            <Link href="/login">Log in</Link>
          </Button>
        </div>
      </nav>
    </header>
  )
}
