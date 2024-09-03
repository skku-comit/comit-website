'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import React from 'react'
import { CgSpinner } from 'react-icons/cg'
import { CiSettings } from 'react-icons/ci'
import { HiOutlineUserGroup } from 'react-icons/hi2'
import { IoIosLogOut } from 'react-icons/io'
import { IoChevronDownOutline, IoPersonOutline } from 'react-icons/io5'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { ROUTES } from '@/constants/routes'

interface MenuItemProps {
  icon: React.ReactNode
  href: string
  children: React.ReactNode
}

const MenuItem = ({ icon, href, children }: MenuItemProps) => {
  const router = useRouter()

  return (
    <DropdownMenuItem
      className="flex items-center justify-start gap-x-3 hover:cursor-pointer"
      onSelect={() => router.push(href)}
    >
      {icon}
      {children}
    </DropdownMenuItem>
  )
}

function Profile() {
  const { status, data: session } = useSession()
  const RANDOM_PROFILE_IMAGE = 'https://picsum.photos/50/50'

  if (!session) {
    return (
      <>
        {status === 'loading' ? (
          <CgSpinner className="animate-spin" size={30} />
        ) : (
          <div className="flex justify-center gap-x-5 font-bold text-black">
            <Link href={ROUTES.LOGIN.url}>로그인</Link>|<Link href={ROUTES.SIGNUP.url}>회원가입</Link>
          </div>
        )}
      </>
    )
  }

  const iconSize = 20

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="max-md:hidden">
        <div className="flex items-center justify-center gap-x-3 text-primary">
          <Avatar>
            <AvatarImage src={session.user?.image ?? RANDOM_PROFILE_IMAGE} />
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
          {session.user?.name}
          <IoChevronDownOutline className="ml-2" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="rounded-lg">
        <DropdownMenuLabel className="flex items-center gap-x-3 py-3">
          <Avatar>
            <AvatarImage src={session.user?.image ?? RANDOM_PROFILE_IMAGE} />
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
          <div>
            <div>{session.user?.name}</div>
            <div className="font-normal">{session.user?.email}</div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />
        <MenuItem icon={<IoPersonOutline size={iconSize} />} href={ROUTES.PROFILE.url}>
          내 프로필
        </MenuItem>
        <MenuItem icon={<HiOutlineUserGroup size={iconSize} />} href={ROUTES.MYSTUDY.url}>
          내 스터디
        </MenuItem>

        <DropdownMenuSeparator />
        <MenuItem icon={<CiSettings size={iconSize} />} href={ROUTES.ADMIN.DASHBOARD.url}>
          관리자
        </MenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={() => signOut()}
          className="flex h-full w-full items-center justify-start gap-x-3 p-2 hover:cursor-pointer"
        >
          <IoIosLogOut size={iconSize} />
          로그아웃
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default Profile
