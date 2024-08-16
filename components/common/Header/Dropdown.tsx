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
import { cn } from '@/lib/utils'

interface DropdownHeaderProps {
  name: string
  isDarkMode: boolean
}

const dropdownItems = ['My Studies', 'My Profile', 'Log Out']

export function DropdownHeader({ name, isDarkMode }: DropdownHeaderProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={isDarkMode ? 'default' : 'outline'}
          className={cn('justify-between', isDarkMode ? 'bg-black' : 'border-none hover:bg-transparent')}
        >
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
