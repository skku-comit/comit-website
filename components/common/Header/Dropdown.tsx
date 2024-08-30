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
import { Route } from '@/constants/routes'

import { SignOutButton } from './ClientAuthButton'

interface HeaderDropdownProps {
  displayText: string
  items: {
    route: Route
    icon: React.JSX.Element
  }[]
}

export function HeaderDropdown({ displayText, items }: HeaderDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={'outline'} className="justify-between border-none hover:bg-transparent">
          {displayText}
          <IoChevronDownOutline className="ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-32">
        <DropdownMenuGroup>
          {items.map((item) => (
            <DropdownMenuItem key={item.route.name}>{item.route.name}</DropdownMenuItem>
          ))}

          {/* TODO: ADMIN Dropdown 추가하기 */}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <SignOutButton className="w-full">
          <DropdownMenuItem>Log out</DropdownMenuItem>
        </SignOutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
