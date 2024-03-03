'use client'
import { FaInstagram, FaGithub, FaRegCopyright } from 'react-icons/fa'
import { RiKakaoTalkFill } from 'react-icons/ri'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

export default function Footer() {
  const pathname = usePathname()

  return (
    <footer
      className={cn(
        'h-24 w-full py-4',
        ['/', '/signup', '/login'].includes(pathname)
          ? 'bg-gray-800'
          : 'bg-black'
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
            href="https://open.kakao.com/o/sowtukag"
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
