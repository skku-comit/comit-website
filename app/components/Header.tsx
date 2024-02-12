import Link from 'next/link'
import Image from 'next/image'
import ComitLogo from '@/public/comit.png'

export default function Header() {
  return (
    <header className="p-4">
      <nav className="flex items-center gap-10 text-2xl">
        <Link href="/">
          <Image src={ComitLogo} alt="comit" width={60} />
        </Link>
        <Link href="/about">About</Link>
        <Link href="/study">Study</Link>
        <Link href="/room">Room</Link>
      </nav>
    </header>
  )
}
