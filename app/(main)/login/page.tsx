'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { BsEye, BsEyeSlash } from 'react-icons/bs'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ROUTES } from '@/constants/routes'
import signInSchema from '@/constants/zodSchema/signin'
import { InvalidSigninErrorCode } from '@/lib/auth/errors'
import ComitOwl from '@/public/comitOwl.png'

interface LoginForm {
  email: string
  password: string
}

export default function Login() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)

  const {
    handleSubmit,
    register,
    setError,
    formState: { errors, isSubmitting }
  } = useForm<LoginForm>({
    resolver: zodResolver(signInSchema)
  })

  // TODO: 에러 핸들링 코드 작성
  const onSubmit = async (data: LoginForm) => {
    const res = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false
    })

    if (res?.code === InvalidSigninErrorCode) {
      setError('email', {
        type: 'manual',
        message: '이메일 또는 비밀번호가 일치하지 않습니다.'
      })
      setError('password', {
        type: 'manual',
        message: '이메일 또는 비밀번호가 일치하지 않습니다.'
      })
      return
    }

    router.push(ROUTES.HOME.url)
  }

  return (
    <div className="flex w-screen justify-center bg-white sm:bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="my-10 flex h-[720px] w-[480px] flex-col items-center gap-4 rounded-2xl bg-white p-8 sm:p-14"
      >
        <Image src={ComitOwl} alt="comit_owl" width={164} />
        <p className="mb-6 text-center text-xl font-semibold sm:mb-12 sm:text-3xl">회원 로그인</p>
        <div className="flex w-full flex-col gap-1">
          <p className="text-xl">이메일</p>
          <Input
            id="email"
            {...register('email')}
            className="h-12 rounded-xl border border-[#d2d2d2] bg-transparent sm:h-14"
            type="email"
          />
          {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
        </div>
        <div className="flex w-full flex-col gap-1">
          <p className="text-xl">비밀번호</p>
          <div className="relative">
            <Input
              id="password"
              {...register('password')}
              className="h-12 rounded-xl border border-[#d2d2d2] bg-transparent sm:h-14"
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
        <Button className="my-4 h-12 w-full rounded-xl text-xl font-semibold sm:h-14" disabled={isSubmitting}>
          로그인
        </Button>
        <div className="flex items-center justify-between">
          <p>계정이 없으신가요?</p>
          <Button variant="link" className="text-base font-bold" asChild>
            <Link href="/signup">회원가입</Link>
          </Button>
        </div>
      </form>
    </div>
  )
}
