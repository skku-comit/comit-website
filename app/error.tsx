'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'

import { Button } from '@/components/ui/button'

type ErrorProps = {
  error: Error
  reset: () => void
}

const Error = ({ error, reset }: ErrorProps) => {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <h1 className="mb-10 text-4xl font-extrabold">에러 발생!</h1>

      <Image
        src="/b0xercatCatchingBugs.png"
        alt="b0xercat catching bugs"
        width={300}
        height={300}
        className="mb-10 shadow-2xl"
      />

      <p className="mb-5">{error.message}</p>

      <div className="flex items-center justify-center gap-x-3">
        <Button onClick={() => reset()}>재시도</Button>
        <Button asChild>
          <Link href="/">홈으로</Link>
        </Button>
      </div>
    </div>
  )
}

export default Error
