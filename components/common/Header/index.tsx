'use client'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { BsDoorOpen } from 'react-icons/bs'
import { FaRegPenToSquare } from 'react-icons/fa6'
import { GiHamburgerMenu } from 'react-icons/gi'
import { HiOutlineUserCircle } from 'react-icons/hi2'
import { IoMdInformationCircleOutline } from 'react-icons/io'
import { IoHomeOutline, IoLaptopOutline } from 'react-icons/io5'
import { MdLogin, MdLogout } from 'react-icons/md'
import { PiBooksLight } from 'react-icons/pi'

import Profile from '@/components/common/Header/Profile'
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'
import { Route, ROUTES } from '@/constants/routes'
import { useSession } from '@/lib/auth/SessionProvider'
import ComitLogo from '@/public/comit.png'

import { SignOutButton } from './ClientAuthButton'
import NavLink from './NavLink'

const DrawerItem = ({ route, icon }: { route: Route; icon: React.ReactNode }) => {
  return (
    <DrawerClose asChild>
      <Link className="flex items-center gap-4 text-3xl font-medium" href={route.url}>
        {icon}
        <p className="flex items-center text-xl font-bold">{route.name}</p>
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
  { route: ROUTES.MYSTUDY, icon: <PiBooksLight size={28} /> },
  { route: ROUTES.PROFILE, icon: <HiOutlineUserCircle /> }
]
const Header = ({ height }: { height: string }) => {
  const session = useSession()

  const DRAWER_ITEMS = session
    ? [...DEFAULT_DRAWER_ITEMS, ...LOGGED_IN_DRAWER_ITEMS]
    : [...DEFAULT_DRAWER_ITEMS, ...LOGGED_OUT_DRAWER_ITEMS]

  return (
    <header
      className="fixed top-0 z-10 flex w-full justify-center border-b border-b-gray-200 bg-white px-4"
      style={{ height }}
    >
      <nav className="flex h-full w-screen max-w-[1280px] items-center justify-between">
        {/* Common: Logo */}
        <Link href="/">
          <div className="flex items-center gap-2">
            <Image src={ComitLogo} alt="comit_logo" width={32} height={37} />
            <p className="text-xl font-semibold">CoMit</p>
          </div>
        </Link>

        {/* Desktop: Links */}
        <div className="hidden md:flex md:gap-10 lg:gap-24">
          {NAVLINK_ROUTES.map((route) => (
            <NavLink key={route.name} href={route.url} text={route.name} />
          ))}
        </div>

        {/* Desktop: Sign up / Log in  or User */}
        <Profile />
      </nav>

      {/* Mobile: Drawer */}
      <Drawer>
        <DrawerTrigger>
          <GiHamburgerMenu className="md:hidden" size={32} />
        </DrawerTrigger>
        <DrawerContent className="hide-scrollbar flex flex-col gap-4 px-6 pb-6">
          {DRAWER_ITEMS.map((e) => (
            <DrawerItem key={e.route.name} route={e.route} icon={e.icon} />
          ))}
          {session && (
            <SignOutButton className="flex items-center gap-4 text-3xl font-medium">
              <MdLogout />
              <p className="flex items-center text-xl font-bold">로그아웃</p>
            </SignOutButton>
          )}
        </DrawerContent>
      </Drawer>
    </header>
  )
}

export default Header
