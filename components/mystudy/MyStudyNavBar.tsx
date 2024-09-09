'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'

export default function MyStudyNavBar() {
  const pathname = usePathname()

  return (
    <div className="mt-0 sm:mt-11 sm:w-40 lg:mr-10">
      <nav className="flex flex-col gap-4">
        <h6 className="text-sm font-medium text-gray-400 max-sm:hidden">함께 공부해요</h6>
        <ul className="font-normal text-gray-600 max-sm:flex">
          <Link href="/mystudy" className="cursor-pointer">
            <li
              className={cn(
                'px-3 py-2 hover:text-gray-600/70',
                pathname.startsWith('/mystudy') &&
                  pathname !== '/mystudy/feedback' &&
                  'text-purple-600 hover:text-purple-600/70'
              )}
            >
              나의 스터디
            </li>
          </Link>
          <Link href="/mystudy/feedback" className="cursor-pointer">
            <li
              className={cn(
                'px-3 py-2 hover:text-gray-600/70',
                pathname === '/mystudy/feedback' && 'text-purple-600 hover:text-purple-600/70'
              )}
            >
              스터디 피드백
            </li>
          </Link>
          <Link
            href="https://flannel-captain-bca.notion.site/1-0-3ebecc3cf59c43f9b28d664795d38e9a"
            className="cursor-pointer"
          >
            <li className="px-3 py-2 hover:text-gray-600/70">스터디 가이드</li>
          </Link>
        </ul>
      </nav>
    </div>
  )
}
