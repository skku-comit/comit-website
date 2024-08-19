import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { BsDoorOpen } from 'react-icons/bs'
import { CgProfile } from 'react-icons/cg'
import { FaBook } from 'react-icons/fa'
import { FaRegPenToSquare } from 'react-icons/fa6'
import { GiHamburgerMenu } from 'react-icons/gi'
import { IoMdInformationCircleOutline } from 'react-icons/io'
import { IoHomeOutline, IoLaptopOutline } from 'react-icons/io5'
import { MdLogin, MdLogout } from 'react-icons/md'

import { Button } from '@/components/ui/button'
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'
import { Route, ROUTES } from '@/constants/routes'
import { auth } from '@/lib/auth/auth'
import { cn } from '@/lib/utils'
import ComitLogo from '@/public/comit.png'

import { SignOutButton } from './ClientAuthButton'
import { HeaderDropdown } from './Dropdown'
import NavLink from './NavLink'

const DrawerItem = ({ route, icon }: { route: Route; icon: React.ReactNode }) => {
  return (
    <DrawerClose asChild>
      <Link className="flex items-center gap-4 text-3xl font-medium" href={route.url}>
        {icon}
        <p className="flex items-center text-xl">{route.name}</p>
      </Link>
    </DrawerClose>
  )
}

// Constants
const NAVLINK_ROUTES = [ROUTES.ABOUT, ROUTES.STUDY.index, ROUTES.CLUBROOM]
const DEFAULT_DRAWER_ITEMS = [
  { route: ROUTES.HOME, icon: <IoHomeOutline size={27} /> },
  { route: ROUTES.ABOUT, icon: <IoMdInformationCircleOutline size={27} /> },
  { route: ROUTES.STUDY.index, icon: <IoLaptopOutline size={27} /> },
  { route: ROUTES.CLUBROOM, icon: <BsDoorOpen size={27} /> }
]
const LOGGED_OUT_DRAWER_ITEMS = [
  { route: ROUTES.LOGIN, icon: <MdLogin size={27} /> },
  { route: ROUTES.SIGNUP, icon: <FaRegPenToSquare size={24} /> }
]
const LOGGED_IN_DRAWER_ITEMS = [
  { route: ROUTES.MYSTUDY, icon: <FaBook /> },
  { route: ROUTES.PROFILE, icon: <CgProfile /> }
]
const Header = async ({ isDarkMode }: { isDarkMode: boolean }) => {
  const session = await auth()

  const DRAWER_ITEMS = session
    ? [...DEFAULT_DRAWER_ITEMS, ...LOGGED_IN_DRAWER_ITEMS]
    : [...DEFAULT_DRAWER_ITEMS, ...LOGGED_OUT_DRAWER_ITEMS]

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
          {NAVLINK_ROUTES.map((route) => (
            <NavLink key={route.name} href={route.url} isDarkMode={isDarkMode} text={route.name} />
          ))}
        </div>

        {/* Desktop: Sign up / Log in  or User */}
        <div className="hidden h-[40px] w-[270px] items-center justify-between md:flex lg:w-[310px]">
          {session ? (
            <HeaderDropdown
              displayText={session.user?.name as string}
              isDarkMode={isDarkMode}
              items={LOGGED_IN_DRAWER_ITEMS}
            />
          ) : (
            <>
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
            </>
          )}
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
          {DRAWER_ITEMS.map((e) => (
            <DrawerItem key={e.route.name} route={e.route} icon={e.icon} />
          ))}
          {session && (
            <SignOutButton className="flex items-center gap-4 text-3xl font-medium">
              <MdLogout />
              <p className="flex items-center text-xl">Log Out</p>
            </SignOutButton>
          )}
        </DrawerContent>
      </Drawer>
    </header>
  )
}

export default Header
