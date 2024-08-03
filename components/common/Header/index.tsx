import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
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

import NavLink from './NavLink'

const DrawerItem = ({ href, icon, text }: { href: string; icon: React.ReactNode; text: string }) => {
  return (
    <DrawerClose asChild>
      <Link className="flex items-center gap-4 text-3xl font-medium" href={href}>
        {icon}
        <p className="flex items-center text-xl">{text}</p>
      </Link>
    </DrawerClose>
  )
}

const Header = ({ isDarkMode }: { isDarkMode: boolean }) => {
  return (
    <header
      className={cn(
        'fixed top-0 z-10 flex h-20 w-full justify-center px-4',
        isDarkMode ? 'bg-black' : 'border-b border-b-gray-200 bg-white'
      )}
    >
      <nav className="flex h-full w-screen max-w-[1280px] items-center justify-between">
        {/* Common: Logo */}
        <Link href="/">
          <div className="flex items-center gap-2">
            <Image src={ComitLogo} alt="comit_logo" width={32} height={37} />
            <p className={cn('text-xl font-semibold', isDarkMode && 'text-white')}>CoMit</p>
          </div>
        </Link>

        {/* Desktop: Links */}
        <div className="hidden md:flex md:gap-10 lg:gap-24">
          <NavLink href="/study" isDarkMode={isDarkMode} text="Study" />
          <NavLink href="/about" isDarkMode={isDarkMode} text="About" />
          <NavLink href="/clubroom" isDarkMode={isDarkMode} text="Clubroom" />
        </div>

        {/* Desktop: Sign up / Log in */}
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

      {/* Mobile: Drawer */}
      <Drawer>
        <DrawerTrigger>
          <GiHamburgerMenu className={cn('md:hidden', isDarkMode && 'text-white')} size={32} />
        </DrawerTrigger>
        <DrawerContent
          className={cn(
            'hide-scrollbar flex flex-col gap-4 px-6 pb-6',
            isDarkMode && 'border-gray-900 bg-black text-slate-200'
          )}
        >
          <DrawerItem href="/" text="Home" icon={<IoHomeOutline size={27} />} />
          <DrawerItem href="/about" text="About" icon={<IoMdInformationCircleOutline size={27} />} />
          <DrawerItem href="/study" text="Study" icon={<IoLaptopOutline size={27} />} />
          <DrawerItem href="/clubroom" text="Clubroom" icon={<BsDoorOpen size={27} />} />
          <DrawerItem href="/login" text="Log in" icon={<MdLogin size={27} />} />
          <DrawerItem href="/signup" text="Sign up" icon={<FaRegPenToSquare size={24} />} />
        </DrawerContent>
      </Drawer>
    </header>
  )
}

export default Header
