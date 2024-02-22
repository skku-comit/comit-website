import Link from 'next/link'
import Image from 'next/image'
import ComitLogo from '@/public/comit.png'
import { Button } from '@/components/ui/button'

export default function Header() {
  const buttonStyle = {
    backgroundColor: 'purple',
    color: 'white'
  }

  return (
    <header className="absolute h-[80px] w-full">
      <nav className="flex h-full items-center justify-around">
        <Link href="/">
          <div className=" flex">
            <Image
              src={ComitLogo}
              alt="comit logo"
              width={29}
              height={34}
            ></Image>
            <div className="flex items-center">
              <p className="ml-2 font-semibold">CoMit</p>
            </div>
          </div>
        </Link>
        <nav className="flex w-[21dvw] justify-between">
          <Link href="/about" className="flex items-center">
            <p className="font-medium">About</p>
          </Link>
          <Link href="/study" className="flex items-center">
            <p className="font-medium">Study</p>
          </Link>
          <Link href="/clubroom" className="flex items-center">
            <p className="font-medium">Clubroom</p>
          </Link>
        </nav>
        <div className="flex h-[40px] w-[310px] justify-between">
          <Button className="h-[30px] w-[140px]">Sign up</Button>
          <Button className="h-[30px] w-[140px]" variant={'outline'}>
            Log in
          </Button>
        </div>
      </nav>
    </header>
  )
}
