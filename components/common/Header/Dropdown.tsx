'use client'
import { signOut } from 'next-auth/react'
import { IoChevronDownOutline } from 'react-icons/io5'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

interface DropdownHeaderProps {
  name: string
}

const dropdownItems = ['My Studies', 'My Profile', 'Log Out']

export function DropdownHeader({ name }: DropdownHeaderProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="justify-between bg-black ">
          {name}
          <IoChevronDownOutline className="ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-32">
        <DropdownMenuGroup>
          <DropdownMenuItem>My Studies</DropdownMenuItem>
          <DropdownMenuItem>My Profile</DropdownMenuItem>
          {/* TODO: ADMIN 추가하기 */}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
