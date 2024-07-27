'use client'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { BsDoorOpen } from 'react-icons/bs'
import { FaRegPenToSquare } from 'react-icons/fa6'
import { GiHamburgerMenu } from 'react-icons/gi'
import { IoMdInformationCircleOutline } from 'react-icons/io'
import { IoHomeOutline, IoLaptopOutline } from 'react-icons/io5'
import { MdLogin } from 'react-icons/md'

import { Button } from '@/components/ui/button'
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'
import { cn } from '@/lib/utils'
import ComitLogo from '@/public/comit.png'

export function NavLink({ href }: { href: string }) {
  const pathname = usePathname()
  const isDarkMode = ['/', '/signup', '/login'].includes(pathname)
  return (
    <Link
      href={`/${href}`}
      className={cn('flex items-center text-xl hover:text-primary', isDarkMode && 'text-white')}
      scroll={true}
    >
      <p className="font-medium capitalize">{href}</p>
    </Link>
  )
}
export default function Header() {
  const pathname = usePathname()
  const isDarkMode = ['/', '/signup', '/login'].includes(pathname)

  const router = useRouter()
  return (
    <header
      className={cn(
        'fixed top-0 z-10 flex h-20 w-full justify-center px-4',
        isDarkMode ? 'bg-black' : 'border-b border-b-gray-200 bg-white'
      )}
    >
      <nav className="flex h-full w-screen max-w-[1280px] items-center justify-between">
        <Link href="/">
          <div className="flex items-center gap-2">
            <Image src={ComitLogo} alt="comit_logo" width={32} height={37} />
            <p className={cn('text-xl font-semibold', isDarkMode && 'text-white')}>CoMit</p>
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
            className={cn('h-[36px] w-[120px] text-base lg:w-[140px]', isDarkMode && 'border-white')}
            variant="outline"
            asChild
          >
            <Link href="/login">Log in</Link>
          </Button>
        </div>
      </nav>
      <Drawer>
        <DrawerTrigger>
          <GiHamburgerMenu className={cn('md:hidden', isDarkMode && 'text-white')} size={32} />
        </DrawerTrigger>
        <DrawerContent
          className={cn('flex flex-col gap-4 px-6 pb-6', isDarkMode && 'border-gray-900 bg-black text-slate-200')}
        >
          <DrawerClose>
            <div
              className="flex items-center gap-4 text-3xl font-medium"
              onClick={() => {
                router.push('/')
              }}
            >
              <IoHomeOutline size={27} />
              <p className="flex items-center text-xl">Home</p>
            </div>
          </DrawerClose>
          <DrawerClose>
            <div
              className="flex items-center gap-4 text-3xl font-medium"
              onClick={() => {
                router.push('/about')
              }}
            >
              <IoMdInformationCircleOutline size={27} />
              <p className="flex items-center text-xl">About</p>
            </div>
          </DrawerClose>
          <DrawerClose>
            <div
              className="flex items-center gap-4 text-3xl font-medium"
              onClick={() => {
                router.push('/study')
              }}
            >
              <IoLaptopOutline size={27} />
              <p className="flex items-center text-xl">Study</p>
            </div>
          </DrawerClose>
          <DrawerClose>
            <div
              className="flex items-center gap-4 text-3xl font-medium"
              onClick={() => {
                router.push('/clubroom')
              }}
            >
              <BsDoorOpen size={27} />
              <p className="flex items-center text-xl">Clubroom</p>
            </div>
          </DrawerClose>
          <DrawerClose>
            <div
              className="flex items-center gap-4 text-3xl font-medium"
              onClick={() => {
                router.push('/login')
              }}
            >
              <MdLogin size={27} />
              <p className="flex items-center text-xl">Log in</p>
            </div>
          </DrawerClose>
          <DrawerClose>
            <div
              className="flex items-center gap-4 text-3xl font-medium"
              onClick={() => {
                router.push('/signup')
              }}
            >
              <FaRegPenToSquare size={24} />
              <p className="flex items-center text-xl">Sign up</p>
            </div>
          </DrawerClose>
        </DrawerContent>
      </Drawer>
    </header>
  )
}
