'use client'
import { usePathname } from 'next/navigation'
import { FaGithub, FaInstagram, FaRegCopyright } from 'react-icons/fa'
import { RiKakaoTalkFill } from 'react-icons/ri'

import { cn } from '@/lib/utils'

export default function Footer() {
  const pathname = usePathname()
  const isDarkMode = ['/', '/signup', '/login'].includes(pathname)
  return (
    <footer
      className={cn(
        'relative h-24 w-full py-4',
        isDarkMode ? 'bg-gray-800' : 'bg-black'
      )}
    >
      <div className="flex h-full w-full flex-col items-center justify-around">
        <div className="flex items-center gap-1 text-center text-sm font-light text-white">
          <FaRegCopyright />
          <p> 2024 COMIT All rights reserved.</p>
        </div>
        <div className="flex items-center justify-center gap-4">
          <a
            rel="noreferrer noopener"
            target="_blank"
            href="https://github.com/skku-comit"
          >
            <FaGithub className="text-xl text-white" />
          </a>
          <a
            rel="noreferrer noopener"
            target="_blank"
            href="https://open.kakao.com/o/g8OGIihg"
          >
            <RiKakaoTalkFill className="text-xl text-white" />
          </a>
          <a
            rel="noreferrer noopener"
            target="_blank"
            href="https://www.instagram.com/skku_comit/"
          >
            <FaInstagram className="text-xl text-white" />
          </a>
        </div>
      </div>
    </footer>
  )
}
