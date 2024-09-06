'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { ROUTES } from '@/constants/routes'
import { extendedSignUpSchema } from '@/constants/zodSchema/signup'
import { DuplicatedCredentialsErrorCode, InvalidSignupCredentialsErrorCode } from '@/lib/auth/errors'
import { cn } from '@/lib/utils'
import Welcome from '@/public/welcome.svg'

export interface FormData {
  username: string
  phoneNumber: string
  studentId: string
  email: string
  password: string
  confirmPassword: string
  consent: boolean
}

export default function Signup() {
  const {
    register,
    handleSubmit,
    getValues,
    setError,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<FormData>({
    mode: 'onBlur',
    resolver: zodResolver(extendedSignUpSchema)
  })
  const router = useRouter()

  const { toast } = useToast()

  const [watchPassword, watchConfirmPassword] = watch(['password', 'confirmPassword'])
  const [isConfirmPasswordBlurred, setIsConfirmPasswordBlurred] = useState(false)
  const [viewPassword, setViewPassword] = useState(false)
  const [viewRetypePassword, setViewRetypePassword] = useState(false)

  const [userName, setuserName] = useState('신규부원')
  const [toggle, setToggle] = useState(false)

  const onSubmit = async (data: FormData) => {
    const res = await signIn('credentials', {
      username: data.username,
      phoneNumber: data.phoneNumber,
      studentId: data.studentId,
      email: data.email,
      password: data.password,
      redirect: false
    })

    if (res?.code === DuplicatedCredentialsErrorCode) {
      ;['username', 'phoneNumber', 'studentId', 'email'].forEach((key) => {
        setError(key as keyof FormData, {
          type: 'manual',
          message: '이미 가입된 회원 정보입니다.'
        })
      })
      toast({
        title: '회원가입 실패',
        description: '이미 가입된 회원 정보입니다.',
        variant: 'destructive'
      })
      return
    }
    if (res?.code === InvalidSignupCredentialsErrorCode) {
      ;['username', 'phoneNumber', 'studentId', 'email', 'password', 'confirmPassword'].forEach((key) => {
        setError(key as keyof FormData, {
          type: 'manual',
          message: '회원가입 정보가 올바르지 않습니다.'
        })
      })
      toast({
        title: '회원가입 실패',
        description: '회원가입 정보가 올바르지 않습니다.',
        variant: 'destructive'
      })
      return
    }

    router.push(ROUTES.HOME.url)
  }

  return (
    <div className="flex w-screen justify-center bg-white sm:bg-gray-100">
      <div className="box-border w-[440px] border-none border-gray-200 bg-white px-6 py-6 sm:w-full sm:border sm:px-7 sm:pb-20 md:my-[42px] md:w-[640px] md:rounded-2xl md:py-[50px]">
        <div className="mt-0 flex flex-col gap-0 sm:mt-1 sm:gap-1">
          <div className="flex items-center gap-1 text-[28px] font-normal sm:text-[32px]/[40px]">
            <h3 className="inline-flex items-center">
              <strong className="font-bold text-primary">{userName}</strong>님 반가워요
            </h3>
            <Image src={Welcome} alt="Welcome" className="-mt-1 h-8 w-8 sm:-mt-1.5 sm:h-9 sm:w-9" />
          </div>
          <p className="text-[14px] text-[#6a6a6a] sm:text-[16px]/[24px]">
            동아리 활동을 시작하기 위한 기본 정보를 입력해 주세요!
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="mb-0 pb-0">
          <div className="mb-2 mt-6 sm:mb-6 sm:mt-10">
            <div className="flex w-full flex-col sm:gap-[18px]">
              <div className="flex flex-col content-start gap-y-0 sm:flex-row sm:gap-y-6">
                <label className="relative box-border w-24 pb-1 pt-2 text-[14px] font-normal text-[#171717] sm:min-w-[120px] sm:py-3 sm:text-base">
                  이름(실명)&nbsp;
                  <span className="inline-block text-destructive">*</span>
                </label>
                <div className="flex flex-grow flex-col gap-y-1 sm:gap-y-2">
                  <input
                    {...register('username', {
                      onBlur: () => setuserName(getValues().username)
                    })}
                    placeholder="실명을 입력해주세요"
                    className={cn(
                      'box-border rounded-lg border border-solid border-[#d2d2d2] py-3 pl-3 pr-4 align-middle text-xs tracking-normal outline-none sm:w-full sm:pl-4 sm:text-sm/[22px]',
                      errors.username && 'border-2 border-destructive'
                    )}
                  />
                  {errors.username && (
                    <p className="block text-xs text-destructive sm:text-xs/[18px]">{errors.username.message}</p>
                  )}
                </div>
              </div>

              <div className="flex flex-col content-start gap-y-0 sm:flex-row sm:gap-y-6">
                <label className="relative box-border w-24 pb-1 pt-2 text-[14px] font-normal text-[#171717] sm:min-w-[120px] sm:py-3 sm:text-base">
                  휴대폰번호&nbsp;
                  <span className="inline-block text-destructive">*</span>
                </label>
                <div className="flex flex-grow flex-col gap-y-1 sm:gap-y-2">
                  <Input
                    {...register('phoneNumber')}
                    placeholder="휴대폰 번호 입력 ('-' 제외 11자리)"
                    className={cn(
                      'box-border h-max w-full rounded-lg border border-solid border-[#d2d2d2] py-3 pl-3 pr-4 align-middle text-xs tracking-normal outline-none sm:pl-4 sm:text-sm/[22px] ',
                      errors.phoneNumber && 'border-2 border-destructive'
                    )}
                  />
                  {errors.phoneNumber && (
                    <p className="block text-xs text-destructive sm:text-xs/[18px]">{errors.phoneNumber.message}</p>
                  )}
                </div>
              </div>

              <div className="flex flex-col content-start gap-y-0 sm:flex-row sm:gap-y-6">
                <label className="relative box-border w-24 pb-1 pt-2 text-[14px] font-normal text-[#171717] sm:min-w-[120px] sm:py-3 sm:text-base">
                  학번&nbsp;
                  <span className="inline-block text-destructive">*</span>
                </label>
                <div className="flex flex-grow flex-col gap-y-1 sm:gap-y-2">
                  <input
                    {...register('studentId')}
                    placeholder="학번 입력 (숫자 10자)"
                    className={cn(
                      'box-border w-full rounded-lg border border-solid border-[#d2d2d2] py-3 pl-3 pr-4 align-middle text-xs tracking-normal outline-none sm:pl-4 sm:text-sm/[22px]',
                      errors.studentId && 'border-2 border-destructive'
                    )}
                  />
                  {errors.studentId && (
                    <p className="block text-xs text-destructive sm:text-xs/[18px]">{errors.studentId.message}</p>
                  )}
                </div>
              </div>

              <div className="flex flex-col content-start gap-y-0 sm:flex-row sm:gap-y-6">
                <label className="relative box-border w-24 pb-1 pt-2 text-[14px] font-normal text-[#171717] sm:min-w-[120px] sm:py-3 sm:text-base">
                  이메일&nbsp;
                  <span className="inline-block text-destructive">*</span>
                </label>
                <div className="flex flex-grow flex-col gap-y-1 sm:gap-y-2">
                  <div className="flex flex-grow items-center gap-x-2">
                    <input
                      {...register('email')}
                      placeholder="이메일 주소 입력 (로그인용)"
                      className={cn(
                        'box-border w-full rounded-lg border border-solid border-[#d2d2d2] py-3 pl-3 pr-4 align-middle text-xs tracking-normal outline-none sm:pl-4 sm:text-sm/[22px]',
                        errors.email && 'border-2 border-destructive'
                      )}
                    />
                  </div>
                  {errors.email && (
                    <p className="block text-xs text-destructive sm:text-xs/[18px]">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div className="flex flex-col content-start gap-y-0 sm:flex-row sm:gap-y-6">
                <label className="relative box-border w-24 pb-1 pt-2 text-[14px] font-normal text-[#171717] sm:min-w-[120px] sm:py-3 sm:text-base">
                  비밀번호&nbsp;
                  <span className="inline-block text-destructive">*</span>
                </label>
                <div className="relative flex flex-grow flex-col gap-y-1 sm:gap-y-2">
                  <input
                    {...register('password')}
                    placeholder="비밀번호 입력 (영문자, 숫자 포함 8~20자)"
                    type={viewPassword ? 'text' : 'password'}
                    className={cn(
                      'box-border w-full rounded-lg border border-solid border-[#d2d2d2] py-3 pl-3 pr-4 align-middle text-xs tracking-normal outline-none sm:pl-4 sm:text-sm/[22px]',
                      errors.password && 'border-2 border-destructive'
                    )}
                  />
                  {typeof watchPassword !== 'undefined' && watchPassword !== '' && (
                    <button
                      className="absolute right-3 top-[14px] h-4 w-4 sm:h-5 sm:w-5"
                      onClick={(event) => {
                        event.preventDefault()
                        setViewPassword(!viewPassword)
                      }}
                    >
                      {viewPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                    </button>
                  )}

                  {errors.password && (
                    <p className="block text-xs text-destructive sm:text-xs/[18px]">{errors.password.message}</p>
                  )}
                </div>
              </div>

              <div className="flex flex-col content-start gap-y-0 sm:flex-row sm:gap-y-6">
                <label className="relative box-border w-24 pb-1 pt-2 text-[14px] font-normal text-[#171717] sm:min-w-[120px] sm:py-3 sm:text-base">
                  비밀번호 확인&nbsp;
                  <span className="inline-block text-destructive">*</span>
                </label>
                <div className="relative flex flex-grow flex-col gap-y-1 sm:gap-y-2">
                  <input
                    {...register('confirmPassword', {
                      onBlur: () => setIsConfirmPasswordBlurred(true)
                    })}
                    placeholder="비밀번호 재입력"
                    type={viewRetypePassword ? 'text' : 'password'}
                    className={cn(
                      'box-border w-full rounded-lg border border-solid border-[#d2d2d2] py-3 pl-3 pr-4 align-middle text-xs tracking-normal outline-none sm:pl-4 sm:text-sm/[22px]',
                      (errors.confirmPassword ||
                        (watchPassword !== watchConfirmPassword && isConfirmPasswordBlurred)) &&
                        'border-2 border-destructive'
                    )}
                  />
                  {typeof watchConfirmPassword !== 'undefined' && watchConfirmPassword !== '' && (
                    <button
                      className="absolute right-3 top-[14px] h-4 w-4 sm:h-5 sm:w-5"
                      onClick={(event) => {
                        event.preventDefault()
                        setViewRetypePassword(!viewRetypePassword)
                      }}
                    >
                      {viewRetypePassword ? <FaRegEye /> : <FaRegEyeSlash />}
                    </button>
                  )}
                  {errors.confirmPassword && watchConfirmPassword == '' && (
                    <p className="block text-xs text-destructive sm:text-xs/[18px]">{errors.confirmPassword.message}</p>
                  )}
                  {watchPassword !== watchConfirmPassword && watchConfirmPassword && isConfirmPasswordBlurred && (
                    <p className="block text-xs text-destructive sm:text-xs/[18px]">동일한 비밀번호를 입력해주세요.</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6 mt-3 box-border rounded-lg bg-[#f7f7f7] px-2 py-3 sm:my-0 sm:p-4">
            <div className="relative flex w-full justify-between">
              <div className="flex items-center text-xs text-[#6a6a6a] sm:text-[14px]/[22px]">
                <input
                  className=" mr-2 h-4 w-4 -translate-y-px text-primary hover:cursor-pointer sm:h-5 sm:w-5"
                  type="checkbox"
                  id="consent"
                  {...register('consent', {
                    required: '개인정보 수집 및 이용 동의 항목에 동의해주세요.'
                  })}
                />

                <label className="mb-1 hover:cursor-pointer" htmlFor="consent">
                  <span className="inline-block text-[#0057ff]">[필수]&nbsp;</span>
                  개인정보 수집 및 이용 동의
                </label>
              </div>
              <input
                id="toggle"
                type="checkbox"
                className="hidden"
                checked={toggle}
                onChange={() => setToggle((prevState) => !prevState)}
              />
              <label htmlFor="toggle" className="cursor-pointer">
                {toggle ? (
                  <span className="absolute right-0 top-[1px] bg-cover text-[10px] sm:top-0 sm:mb-0 sm:text-[16px] ">
                    &#9650;
                  </span>
                ) : (
                  <span className="absolute right-0 top-[1px] bg-cover text-[10px] sm:top-0 sm:mb-0 sm:text-[16px] ">
                    &#9660;
                  </span>
                )}
              </label>
            </div>
            <div className="block">
              {errors.consent && <p className="text-xs/[18px] text-destructive">{errors.consent.message}</p>}
            </div>
            {toggle && (
              <div className="mt-2 box-border w-full rounded-lg bg-[#fff] p-2 text-[10px]/[15px] sm:mt-4 sm:p-4 sm:text-[12px]/[20px]">
                <p className="text-[#222]">
                  성균관대 코딩동아리 &apos;코밋(Comit)&apos; 회원 등록을 위해 아래와 같이 개인정보를 수집 및
                  이용합니다. 동의를 거부할 권리가 있으며 동의 거부시 동아리 회원서비스 이용이 불가합니다.
                </p>
                <ul className="mt-2">
                  <li className="flex list-none items-center">
                    <span className="-mt-[19px] flex items-center text-[24px] sm:-mt-[6px] sm:text-[30px]">
                      &#8901;
                    </span>
                    <p className="relative box-border  inline text-[#6a6a6a]">
                      목적 : 스터디지원 및 프로필 공개등 동아리활동 서비스 제공, <br className="sm:hidden" />
                      각종 맞춤형 서비스 제공
                    </p>
                  </li>
                  <li className="flex list-none items-center">
                    <span className="flex items-center text-[24px] sm:-mt-[6px] sm:text-[30px]">&#8901;</span>
                    <p className="relative mt-1 box-border inline text-[#6a6a6a]">
                      항목 : 이름, 휴대폰번호, 학번, 이메일, 학력사항
                    </p>
                  </li>
                  <li className="flex list-none items-center">
                    <span className="flex items-center text-[24px] sm:-mt-[6px] sm:text-[30px]">&#8901;</span>
                    <p className="relative mt-1 box-border inline text-[#6a6a6a]">
                      보유 및 이용 기간 : 동아리 또는 회원 탈퇴시 즉시 파기
                    </p>
                  </li>
                </ul>
              </div>
            )}
          </div>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="mt-3 block h-11 w-full rounded-lg bg-primary px-3 py-2 text-[15px] font-bold text-[#fff] sm:mt-5 sm:w-full sm:py-[15px] sm:text-[20px]/[26px] md:h-14"
          >
            {isSubmitting ? '제출중...' : '회원가입'}
          </Button>
        </form>
      </div>
    </div>
  )
}
