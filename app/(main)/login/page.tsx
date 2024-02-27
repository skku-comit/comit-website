'use client'

import Image from 'next/image'
import ComitOwl from '@/public/comitOwl.png'
import { Button } from '@/components/ui/button'
import { BsEye, BsEyeSlash } from 'react-icons/bs'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  return (
    <div className="flex max-h-lvh w-full justify-center bg-black pb-20 pt-8 text-white">
      <div className="flex w-[480px] flex-col items-center gap-4 rounded-[32px] bg-[#121212] p-16">
        <Image src={ComitOwl} alt="comit_owl" width={164} />
        <p className="mb-12 text-center text-3xl font-semibold">
          Log in to your account
        </p>
        <div className="flex w-full flex-col gap-1">
          <p className="text-xl font-semibold">Email</p>
          <Input
            className="h-14 rounded-xl border-2 border-[#494949] bg-transparent"
            type="email"
          />
        </div>
        <div className="flex w-full flex-col gap-1">
          <p className="text-xl font-semibold">Password</p>
          <div className="relative">
            <Input
              className="h-14 rounded-xl border-2 border-[#494949] bg-transparent"
              type={showPassword ? 'text' : 'password'}
            />
            {!showPassword ? (
              <BsEyeSlash
                className="absolute right-4 top-1/2 -translate-y-1/2 transform cursor-pointer"
                size={20}
                onClick={() => setShowPassword(true)}
              />
            ) : (
              <BsEye
                className="absolute right-4 top-1/2 -translate-y-1/2 transform cursor-pointer"
                size={20}
                onClick={() => setShowPassword(false)}
              />
            )}
          </div>
        </div>
        <Button className="mt-4 h-14 w-full rounded-xl text-xl font-semibold">
          Log In
        </Button>
      </div>
    </div>
  )
}
