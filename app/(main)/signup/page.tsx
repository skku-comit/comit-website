'use client'

import Image from 'next/image'
import ComitOwl from '@/public/comitOwl.png'
import { Button } from '@/components/ui/button'
import { BsEye, BsEyeSlash } from 'react-icons/bs'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'

interface SignupForm {
  name: string
  email: string
  password: string
}

// TODO: 백엔드와 논의 후 schema 수정
const schema = z.object({
  name: z.string().min(2, { message: '이름은 2자 이상이어야 합니다' }),
  email: z.string().email({ message: '올바른 이메일 주소를 입력해주세요' }),
  password: z.string().min(6, { message: '비밀번호는 6자 이상이어야 합니다' })
})

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false)

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<SignupForm>({
    resolver: zodResolver(schema)
  })

  // TODO: signup API 연결
  const onSubmit = (data: SignupForm) => {
    console.log(data)
  }

  return (
    <div className="flex w-full justify-center bg-black pb-20 pt-8 text-white">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-[480px] flex-col items-center gap-4 rounded-[32px] bg-[#121212] p-16 pb-8"
      >
        <Image src={ComitOwl} alt="comit_owl" width={164} />
        <p className="mb-8 text-center text-3xl font-semibold">Sign Up</p>
        <div className="flex w-full flex-col gap-1">
          <p className="text-xl font-semibold">Full Name</p>
          <Input
            id="name"
            {...register('name')}
            className="h-14 rounded-xl border-2 border-[#494949] bg-transparent"
            type="text"
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>
        <div className="flex w-full flex-col gap-1">
          <p className="text-xl font-semibold">Email</p>
          <Input
            id="email"
            {...register('email')}
            className="h-14 rounded-xl border-2 border-[#494949] bg-transparent"
            type="email"
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div className="flex w-full flex-col gap-1">
          <p className="text-xl font-semibold">Password</p>
          <div className="relative">
            <Input
              id="password"
              {...register('password')}
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
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>
        <Button className="my-4 h-14 w-full rounded-xl text-xl font-semibold">
          Sign Up
        </Button>
        <div className="flex items-center justify-between">
          <p>Already have an account?</p>
          <Button variant="link" className="text-white" asChild>
            <Link href="/login">Log In</Link>
          </Button>
        </div>
      </form>
    </div>
  )
}
