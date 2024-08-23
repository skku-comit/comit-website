'use client'

import Image from 'next/image'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { cn } from '@/lib/utils'
import Welcome from '@/public/welcome.svg'

const simulatedApi = (data: FormData): Promise<{ success: boolean; data?: FormData; message?: string }> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 서버 사이드 에러 시뮬레이션
      if (Math.random() < 0.5) {
        reject({ message: 'Server error occurred. Please try again.' })
      } else {
        resolve({ success: true, data })
      }
    }, 2000)
  })
}

export interface FormData {
  koreanName: string
  phoneNumber: string
  studentID: string
  email: string
  password: string
  checkPassword: string
  consent: boolean
}

export default function Signup() {
  const {
    register,
    handleSubmit,
    setError,
    getValues,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<FormData>({
    mode: 'onBlur',
    defaultValues: {
      koreanName: '',
      phoneNumber: '',
      studentID: '',
      email: '',
      password: '',
      checkPassword: '',
      consent: false
    }
  })

  const [watchPassword, watchCheckPassword] = watch(['password', 'checkPassword'])
  const [isCheckPasswordBlurred, setIsCheckPasswordBlurred] = useState(false)
  const [userName, setuserName] = useState('신규부원')
  const [toggle, setToggle] = useState(false)

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    // setError("");
    try {
      const response = await simulatedApi(data)
      // 성공 로직 (success message 띄우거나 redirect, etc.)
    } catch (error: any) {
      console.error('Error:', error)
      setError('root', {
        message: error.message
      })
    }
  }

  return (
    <div className="flex w-screen justify-center bg-white sm:bg-gray-100">
      <div className="box-border w-[440px] border-none border-gray-200 bg-white px-7 py-6 sm:w-full sm:border sm:pb-20 md:my-[42px] md:w-[640px] md:rounded-2xl md:py-[50px]">
        <div className="mt-1 flex flex-col gap-1">
          <div className="flex items-center gap-1 text-xl font-normal sm:text-[32px]/[40px]">
            <h3 className="inline-flex items-center">
              <strong className="font-bold text-primary">{userName}</strong>님 반가워요
            </h3>
            <Image src={Welcome} alt="Welcome" className="-mt-1 h-6 w-6 sm:-mt-1.5 sm:h-9 sm:w-9" />
          </div>
          <p className="text-xs text-[#6a6a6a] sm:text-[16px]/[24px]">
            동아리 활동을 시작하기 위한 기본 정보를 입력해 주세요!
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="mb-0 pb-0">
          <div className="mb-6 mt-10">
            <div className="flex w-full flex-col gap-2 sm:gap-[18px]">
              <div className="flex content-start gap-y-6">
                <label className="relative box-border w-24 py-2 text-xs font-normal text-[#171717] sm:min-w-[120px] sm:py-3 sm:text-base">
                  이름(실명)&nbsp;
                  <span className="inline-block text-destructive">*</span>
                </label>
                <div className="flex flex-grow flex-col gap-y-1 sm:gap-y-2">
                  <input
                    {...register('koreanName', {
                      required: '이름을 입력해주세요.',
                      onBlur: () => setuserName(getValues().koreanName)
                    })}
                    placeholder="실명을 입력해주세요."
                    className={cn(
                      'box-border rounded-lg border border-solid border-[#d2d2d2] px-3 py-2 align-middle text-xs tracking-normal outline-none sm:w-full sm:px-4 sm:py-3 sm:text-sm/[22px]',
                      errors.koreanName && 'border-2 border-destructive'
                    )}
                  />
                  {errors.koreanName && (
                    <p className="block text-[8px] text-destructive sm:text-xs/[18px]">{errors.koreanName.message}</p>
                  )}
                </div>
              </div>

              <div className="flex content-start gap-y-6">
                <label className="relative box-border w-24 py-2 text-xs font-normal text-[#171717] sm:min-w-[120px] sm:py-3 sm:text-base">
                  휴대폰번호&nbsp;
                  <span className="inline-block text-destructive">*</span>
                </label>
                <div className="flex flex-grow flex-col gap-y-1 sm:gap-y-2">
                  <input
                    {...register('phoneNumber', {
                      required: '휴대폰번호를 입력해주세요.',
                      pattern: {
                        value: /^010\d{8}$/,
                        message: '휴대폰번호를 다시 확인해주세요.'
                      }
                    })}
                    placeholder="예)01012345678"
                    className={cn(
                      'box-border w-full rounded-lg border border-solid border-[#d2d2d2] px-3 py-2 align-middle text-xs tracking-normal outline-none sm:px-4 sm:py-3 sm:text-sm/[22px]',
                      errors.phoneNumber && 'border-2 border-destructive'
                    )}
                  />
                  {errors.phoneNumber && (
                    <p className="block text-[8px] text-destructive sm:text-xs/[18px]">{errors.phoneNumber.message}</p>
                  )}
                </div>
              </div>

              <div className="flex content-start gap-y-6">
                <label className="relative box-border w-24 py-2 text-xs font-normal text-[#171717] sm:min-w-[120px] sm:py-3 sm:text-base">
                  학번&nbsp;
                  <span className="inline-block text-destructive">*</span>
                </label>
                <div className="flex flex-grow flex-col gap-y-1 sm:gap-y-2">
                  <input
                    {...register('studentID', {
                      required: '학번을 입력해주세요.',
                      pattern: {
                        value: /^20\d{8}$/,
                        message: '학번을 다시 확인해주세요.'
                      }
                    })}
                    placeholder="예)20xx331582"
                    className={cn(
                      'box-border w-full rounded-lg border border-solid border-[#d2d2d2] px-3 py-2 align-middle text-xs tracking-normal outline-none sm:px-4 sm:py-3 sm:text-sm/[22px]',
                      errors.studentID && 'border-2 border-destructive'
                    )}
                  />
                  {errors.studentID && (
                    <p className="block text-[8px] text-destructive sm:text-xs/[18px]">{errors.studentID.message}</p>
                  )}
                </div>
              </div>

              <div className="flex content-start gap-y-6">
                <label className="relative box-border w-24 py-2 text-xs font-normal text-[#171717] sm:min-w-[120px] sm:py-3 sm:text-base">
                  이메일&nbsp;
                  <span className="inline-block text-destructive">*</span>
                </label>
                <div className="flex flex-grow flex-col gap-y-1 sm:gap-y-2">
                  <div className="flex flex-grow items-center gap-x-2">
                    <input
                      {...register('email', {
                        required: '이메일을 입력해주세요.',
                        pattern: {
                          value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                          message: '이메일을 다시 확인해주세요.'
                        }
                      })}
                      placeholder="예)comit10282@g.skku.edu"
                      className={cn(
                        'box-border w-full rounded-lg border border-solid border-[#d2d2d2] px-3 py-2 align-middle text-xs tracking-normal outline-none sm:px-4 sm:py-3 sm:text-sm/[22px]',
                        errors.email && 'border-2 border-destructive'
                      )}
                    />
                  </div>
                  {errors.email && (
                    <p className="block text-[8px] text-destructive sm:text-xs/[18px]">{errors.email.message}</p>
                  )}{' '}
                </div>
              </div>

              <div className="flex content-start gap-y-6">
                <label className="relative box-border w-24 py-2 text-xs font-normal text-[#171717] sm:min-w-[120px] sm:py-3 sm:text-base">
                  비밀번호&nbsp;
                  <span className="inline-block text-destructive">*</span>
                </label>
                <div className="flex flex-grow flex-col gap-y-1 sm:gap-y-2">
                  <input
                    {...register('password', {
                      required: '비밀번호를 입력해주세요.',
                      pattern: {
                        value: /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/,
                        message: '유효한 비밀번호를 입력해주세요.'
                      }
                    })}
                    placeholder="영문자, 숫자 포함 8자 ~ 20자"
                    type="password"
                    className={cn(
                      'box-border w-full rounded-lg border border-solid border-[#d2d2d2] px-3 py-2 align-middle text-xs tracking-normal outline-none sm:px-4 sm:py-3 sm:text-sm/[22px]',
                      errors.password && 'border-2 border-destructive'
                    )}
                  />
                  {errors.password && (
                    <p className="block text-[8px] text-destructive sm:text-xs/[18px]">{errors.password.message}</p>
                  )}
                </div>
              </div>

              <div className="flex content-start gap-y-6">
                <label className="relative box-border w-24 py-2 text-xs font-normal text-[#171717] sm:min-w-[120px] sm:py-3 sm:text-base">
                  비밀번호 확인&nbsp;
                  <span className="inline-block text-destructive">*</span>
                </label>
                <div className="flex flex-grow flex-col gap-y-1 sm:gap-y-2">
                  <input
                    {...register('checkPassword', {
                      required: '비밀번호를 확인해주세요.',
                      onBlur: () => setIsCheckPasswordBlurred(true)
                    })}
                    placeholder="비밀번호를 재입력해주세요."
                    type="password"
                    className={cn(
                      'box-border w-full rounded-lg border border-solid border-[#d2d2d2] px-3 py-2 align-middle text-xs tracking-normal outline-none sm:px-4 sm:py-3 sm:text-sm/[22px]',
                      (errors.checkPassword || (watchPassword !== watchCheckPassword && isCheckPasswordBlurred)) &&
                        'border-2 border-destructive'
                    )}
                  />
                  {errors.checkPassword && watchCheckPassword == '' && (
                    <p className="block text-[8px] text-destructive sm:text-xs/[18px]">
                      {errors.checkPassword.message}
                    </p>
                  )}
                  {watchPassword !== watchCheckPassword && watchCheckPassword && isCheckPasswordBlurred && (
                    <p className="block text-[8px] text-destructive sm:text-xs/[18px]">
                      동일한 비밀번호를 입력해주세요.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="box-border rounded-lg bg-[#f7f7f7] p-2 sm:p-4">
            <div className="relative flex w-full justify-between">
              <div className="flex items-center text-[10px]/[16px] text-[#6a6a6a] sm:text-[14px]/[22px]">
                <input
                  className="mr-[6px] h-3 w-3 -translate-y-px text-primary hover:cursor-pointer sm:mr-2 sm:h-5 sm:w-5"
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
              {errors.consent && (
                <p className="text-[8px] text-destructive sm:text-xs/[18px]">{errors.consent.message}</p>
              )}
            </div>
            {toggle && (
              <div className="mt-2 box-border w-full rounded-lg bg-[#fff] p-2 text-[8px]/[15px] sm:mt-4 sm:p-4 sm:text-[12px]/[20px]">
                <p className="text-[#222]">
                  성균관대 코딩동아리 &apos;코밋(Comit)&apos; 회원 등록을 위해 아래와 같이 개인정보를 수집 및
                  이용합니다. 동의를 거부할 권리가 있으며 동의 거부시 동아리 회원서비스 이용이 불가합니다.
                </p>
                <ul className="mt-2">
                  <li className="flex list-none items-center">
                    <span className="flex items-center text-[20px] sm:-mt-[6px] sm:text-[30px]">&#8901;</span>
                    <p className="relative box-border  inline text-[#6a6a6a]">
                      목적 : 스터디지원 및 프로필 공개등 동아리활동 서비스 제공, 각종 맞춤형 서비스 제공
                    </p>
                  </li>
                  <li className="flex list-none items-center">
                    <span className="flex items-center text-[20px] sm:-mt-[6px] sm:text-[30px]">&#8901;</span>
                    <p className="relative mt-1 box-border inline text-[#6a6a6a]">
                      항목 : 이름, 휴대폰번호, 학번, 이메일, 학력사항
                    </p>
                  </li>
                  <li className="flex list-none items-center">
                    <span className="flex items-center text-[20px] sm:-mt-[6px] sm:text-[30px]">&#8901;</span>
                    <p className="relative mt-1 box-border inline text-[#6a6a6a]">
                      보유 및 이용 기간 : 동아리 또는 회원 탈퇴시 즉시 파기
                    </p>
                  </li>
                </ul>
              </div>
            )}
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-3 w-1/3 rounded-lg border border-solid border-[#d2d2d2] bg-primary px-3 py-2 hover:opacity-80 sm:mt-5 sm:w-full sm:py-[15px]"
            >
              {isSubmitting ? (
                <span className="block text-xs font-bold text-[#fff] sm:text-[20px]/[26px]">제출중...</span>
              ) : (
                <span className="block text-xs font-bold text-[#fff] sm:text-[20px]/[26px]">입력완료</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
