import { FaGithub, FaInstagram, FaRegCopyright } from 'react-icons/fa'
import { RiKakaoTalkFill } from 'react-icons/ri'

import { GITHUB_LINK, INSTAGRAM_LINK, KAKAO_OPEN_CHAT_LINK } from '@/constants/social'

interface FooterProp {
  height: string
}

export default function Footer({ height }: FooterProp) {
  return (
    <footer className="w-full bg-black py-4" style={{ height, transform: 'translateY(-100%)' }}>
      <div className="flex h-full w-full flex-col items-center justify-around">
        <div className="flex items-center gap-1 text-center text-sm font-light text-white">
          <FaRegCopyright />
          <p> 2024 COMIT All rights reserved.</p>
        </div>
        <div className="flex items-center justify-center gap-4">
          <a rel="noreferrer noopener" target="_blank" href={GITHUB_LINK}>
            <FaGithub className="text-xl text-white" />
          </a>
          <a rel="noreferrer noopener" target="_blank" href={KAKAO_OPEN_CHAT_LINK}>
            <RiKakaoTalkFill className="text-xl text-white" />
          </a>
          <a rel="noreferrer noopener" target="_blank" href={INSTAGRAM_LINK}>
            <FaInstagram className="text-xl text-white" />
          </a>
        </div>
      </div>
    </footer>
  )
}
