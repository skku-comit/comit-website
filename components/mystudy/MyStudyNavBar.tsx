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
        <ul className="max-sm:flex">
          <Link href="/mystudy" className="cursor-pointer">
            <li
              className={cn(
                'px-3 py-2 font-normal',
                pathname.startsWith('/mystudy') && pathname !== '/mystudy/feedback'
                  ? 'font-bold text-purple-600'
                  : 'text-gray-600'
              )}
            >
              나의 스터디
            </li>
          </Link>
          <Link href="/mystudy/feedback" className="cursor-pointer">
            <li
              className={cn(
                'px-3 py-2 font-normal',
                pathname === '/mystudy/feedback' ? 'font-bold text-purple-600' : 'text-gray-600'
              )}
            >
              스터디 피드백
            </li>
          </Link>
          {/* TODO: 코밋 스터디 가이드 추가 */}
          {/* <Link
            href="https://alluring-raccoon-85b.notion.site/1-0-a73896153c484a38a1749dfd76f46094"
            className="cursor-pointer"
          >
            <li className="px-3 py-[10px] font-normal" style={pathname === '노션링크' ? activeStyle : {}}>
              스터디 가이드
            </li>
          </Link> */}
        </ul>
      </nav>
    </div>
  )
}
