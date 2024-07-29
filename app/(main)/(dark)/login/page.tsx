'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { BsEye, BsEyeSlash } from 'react-icons/bs'
import { z } from 'zod'

import UnderConstructionDialog from '@/components/common/UnderConstructionDialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import ComitOwl from '@/public/comitOwl.png'

interface LoginForm {
  email: string
  password: string
}

// TODO: 백엔드와 논의 후 schema 수정
const schema = z.object({
  email: z.string().email({ message: '올바른 이메일 주소를 입력해주세요' }),
  password: z.string().min(6, { message: '비밀번호는 6자 이상이어야 합니다' })
})

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<LoginForm>({
    resolver: zodResolver(schema)
  })

  // TODO: login API 연결
  const onSubmit = (data: LoginForm) => {
    console.log(data)
  }

  return (
    <div className="flex max-h-lvh w-full justify-center bg-black pt-8 text-white">
      <UnderConstructionDialog />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-[88%] max-w-[480px] flex-col items-center gap-4 rounded-[32px] bg-[#121212] p-8 pb-8 sm:p-16 md:w-[480px]"
      >
        <Image src={ComitOwl} alt="comit_owl" width={164} />
        <p className="mb-6 text-center text-xl font-semibold sm:mb-12 sm:text-3xl">Log in to your account</p>
        <div className="flex w-full flex-col gap-1">
          <p className="text-xl font-semibold">Email</p>
          <Input
            id="email"
            {...register('email')}
            className="h-12 rounded-xl border-2 border-[#494949] bg-transparent sm:h-14"
            type="email"
          />
          {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
        </div>
        <div className="flex w-full flex-col gap-1">
          <p className="text-xl font-semibold">Password</p>
          <div className="relative">
            <Input
              id="password"
              {...register('password')}
              className="h-12 rounded-xl border-2 border-[#494949] bg-transparent sm:h-14"
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
          {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
        </div>
        <Button className="my-4 h-12 w-full rounded-xl text-xl font-semibold sm:h-14">Log In</Button>
        <div className="flex items-center justify-between">
          <p>Don&apos;t have an account?</p>
          <Button variant="link" className="text-white" asChild>
            <Link href="/signup">Sign Up</Link>
          </Button>
        </div>
      </form>
    </div>
  )
}
