'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function MyStudyLeftSide() {
  const pathname = usePathname()
  const activeStyle = {
    color: '#9333ea', // purple-600
    fontWeight: 'bold'
  }

  return (
    <div id="mystudy-left-side" className="mr-10 mt-11 box-border hidden w-40 sm:block">
      <nav id="mystudy-body__navigation" className="m-0 box-border p-0">
        <h6 className="mb-4 box-border h-5 text-[12px] font-medium text-[#adb5bd]">함께 공부해요</h6>
        <ul id="mystudy-aside" className=" m-0 box-border p-0 text-[17px]">
          <Link href="/mystudies" className="cursor-pointer">
            <li className="box-border px-3 py-[10px] font-normal" style={pathname === '/mystudies' ? activeStyle : {}}>
              나의 스터디
            </li>
          </Link>
          <Link href="/mystudies/comit-github" className="cursor-pointer">
            <li
              className="box-border px-3 py-[10px] font-normal"
              style={pathname === '/mystudies/comit-github' ? activeStyle : {}}
            >
              스터디 피드백
            </li>
          </Link>

          <Link
            href="https://alluring-raccoon-85b.notion.site/1-0-a73896153c484a38a1749dfd76f46094"
            className="cursor-pointer"
          >
            <li className="box-border px-3 py-[10px] font-normal" style={pathname === '노션링크' ? activeStyle : {}}>
              스터디 가이드
            </li>
          </Link>
        </ul>
      </nav>
    </div>
  )
}
