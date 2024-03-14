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

interface SignupForm {
  name: string
  studentID: number
  email: string
  password: string
}

// TODO: 백엔드와 논의 후 schema 수정
const schema = z.object({
  name: z.string().min(2, { message: '이름은 2자 이상이어야 합니다' }),
  studentID: z.number({ required_error: '올바른 학번을 입력해주세요' }),
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
    <div className="flex w-full justify-center bg-black pt-8 text-white">
      <UnderConstructionDialog />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-[88%] max-w-[480px] flex-col items-center gap-2 rounded-[32px] bg-[#121212] p-8 pb-8 sm:gap-4 sm:p-16 md:w-[480px]"
      >
        <Image src={ComitOwl} alt="comit_owl" width={164} />
        <p className="mb-4 text-center text-2xl font-semibold sm:mb-8 sm:text-3xl">
          Sign Up
        </p>
        <div className="flex w-full flex-col gap-1">
          <p className="text-xl font-semibold">Full Name</p>
          <Input
            id="name"
            {...register('name')}
            className="h-12 rounded-xl border-2 border-[#494949] bg-transparent sm:h-14"
            type="text"
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>
        <div className="flex w-full flex-col gap-1">
          <p className="text-xl font-semibold">Student ID</p>
          <Input
            id="studentID"
            {...register('studentID', { valueAsNumber: true })}
            className="h-12 rounded-xl border-2 border-[#494949] bg-transparent sm:h-14"
            type="number"
          />
          {errors.studentID && (
            <p className="text-sm text-red-500">올바른 학번을 입력해주세요</p>
          )}
        </div>
        <div className="flex w-full flex-col gap-1">
          <p className="text-xl font-semibold">Email</p>
          <Input
            id="email"
            {...register('email')}
            className="h-12 rounded-xl border-2 border-[#494949] bg-transparent sm:h-14"
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
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>
        <Button className="my-4 h-12 w-full rounded-xl text-xl font-semibold sm:h-14">
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
