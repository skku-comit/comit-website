import Image from 'next/image'
import Link from 'next/link'

import Profile from '@/components/common/Header/Profile'
import ComitLogo from '@/public/comit.png'

export default function Header({ height }: { height: string }) {
  return (
    <header
      className="fixed top-0 z-10 flex h-20 w-full justify-center border-b border-b-gray-200 bg-white"
      style={{ height }}
    >
      <nav className="flex h-full w-[96vw] items-center justify-between">
        <Link href="/">
          <div className="flex items-center gap-2">
            <Image src={ComitLogo} alt="comit_logo" width={32} height={37} />
            <p className="text-xl font-semibold text-black">CoMit</p>
          </div>
        </Link>
        <div className="flex h-[40px] items-center justify-between">
          <Profile />
        </div>
      </nav>
    </header>
  )
}
