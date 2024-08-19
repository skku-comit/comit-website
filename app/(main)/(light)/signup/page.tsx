'use client'

import Image from 'next/image'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

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
    <div className="flex min-h-screen w-screen justify-center bg-gray-100">
      <div className="my-[60px] box-border w-[640px] border border-gray-200 bg-white px-10 py-[60px]">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1 text-[32px]/[40px] font-normal">
            <h3 className="inline-flex items-center">
              <strong className="font-bold text-purple-600">{userName}</strong>님 반가워요
            </h3>
            <Image src={Welcome} alt="Welcome" />
          </div>
          <p className="text-[#6a6a6a]">동아리 활동을 시작하기 위한 기본 정보를 입력해 주세요!</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="my-12">
            <div className="flex w-full flex-col gap-5">
              <div className="flex content-start gap-y-6">
                <label className="relative box-border min-w-[120px] py-3 pb-3 text-base font-normal text-[#171717]">
                  이름(실명)&nbsp;
                  <span className="inline-block text-[#ff0000]">*</span>
                </label>
                <div className="flex flex-grow flex-col gap-y-2">
                  <input
                    {...register('koreanName', {
                      required: '이름을 입력해주세요.',
                      onBlur: () => setuserName(getValues().koreanName)
                    })}
                    placeholder="실명을 입력해주세요."
                    className="box-border w-full rounded-lg border border-solid border-[#d2d2d2] px-4 py-3 align-middle text-sm/[22px] tracking-normal outline-none"
                  />
                  {errors.koreanName && (
                    <p className="block text-xs/[18px] text-[#ff0000]">{errors.koreanName.message}</p>
                  )}
                </div>
              </div>

              <div className="flex content-start gap-y-6">
                <label className="relative box-border min-w-[120px] py-3 pb-3 text-base font-normal text-[#171717]">
                  휴대폰번호&nbsp;
                  <span className="inline-block text-[#ff0000]">*</span>
                </label>
                <div className="flex flex-grow flex-col gap-y-2">
                  <input
                    {...register('phoneNumber', {
                      required: '휴대폰번호를 입력해주세요.',
                      pattern: {
                        value: /^010\d{8}$/,
                        message: '휴대폰번호를 다시 확인해주세요.'
                      }
                    })}
                    placeholder="예)01012345678"
                    className="box-border w-full rounded-lg border border-solid border-[#d2d2d2] px-4 py-3 align-middle text-sm/[22px] tracking-normal outline-none"
                  />
                  {errors.phoneNumber && (
                    <p className="block text-xs/[18px] text-[#ff0000]">{errors.phoneNumber.message}</p>
                  )}
                </div>
              </div>

              <div className="flex content-start gap-y-6">
                <label className="relative box-border min-w-[120px] py-3 pb-3 text-base font-normal text-[#171717]">
                  학번&nbsp;
                  <span className="inline-block text-[#ff0000]">*</span>
                </label>
                <div className="flex flex-grow flex-col gap-y-2">
                  <input
                    {...register('studentID', {
                      required: '학번을 입력해주세요.',
                      pattern: {
                        value: /^20\d{8}$/,
                        message: '학번을 다시 확인해주세요.'
                      }
                    })}
                    placeholder="예)20xx331582"
                    className="box-border w-full rounded-lg border border-solid border-[#d2d2d2] px-4 py-3 align-middle text-sm/[22px] tracking-normal outline-none"
                  />
                  {errors.studentID && (
                    <p className="block text-xs/[18px] text-[#ff0000]">{errors.studentID.message}</p>
                  )}
                </div>
              </div>

              <div className="flex content-start gap-y-6">
                <label className="relative box-border min-w-[120px] py-3 pb-3 text-base font-normal text-[#171717]">
                  이메일&nbsp;
                  <span className="inline-block text-[#ff0000]">*</span>
                </label>
                <div className="flex flex-grow flex-col gap-y-2">
                  <div className="flex flex-grow items-center gap-x-2">
                    <input
                      {...register('email', {
                        required: '이메일을 입력해주세요.',
                        pattern: {
                          value: /^[a-zA-Z0-9+-\_.]/,
                          message: '이메일을 다시 확인해주세요.'
                        }
                      })}
                      placeholder="예)comit10282"
                      className="box-border h-[48px] w-full rounded-lg border border-solid border-[#d2d2d2] px-4 py-3 align-middle text-sm/[22px] tracking-normal outline-none"
                    />
                    <div className="flex h-[54px] w-[138px] flex-shrink-0 justify-center rounded-lg border border-solid border-[#d2d2d2] px-[12px] py-[15px]">
                      <span className=" block text-sm/[22px] text-gray-500">@g.skku.edu</span>
                    </div>
                  </div>
                  {errors.email && <p className="block text-xs/[18px] text-[#ff0000]">{errors.email.message}</p>}{' '}
                </div>
              </div>

              <div className="flex content-start gap-y-6">
                <label className="relative box-border min-w-[120px] py-3 pb-3 text-base font-normal text-[#171717]">
                  비밀번호&nbsp;
                  <span className="inline-block text-[#ff0000]">*</span>
                </label>
                <div className="flex flex-grow flex-col gap-y-2">
                  <input
                    {...register('password', {
                      required: '비밀번호를 입력해주세요.',
                      pattern: {
                        value: /^[a-zA-Z\d]{8,20}$/i,
                        message: '유효한 비밀번호를 입력해주세요.'
                      }
                    })}
                    placeholder="영문자, 숫자 포함 8자 ~ 20자"
                    type="password"
                    className="box-border w-full rounded-lg border border-solid border-[#d2d2d2] px-4 py-3 align-middle text-sm/[22px] tracking-normal outline-none"
                  />
                  {errors.password && <p className="block text-xs/[18px] text-[#ff0000]">{errors.password.message}</p>}
                </div>
              </div>

              <div className="flex content-start gap-y-6">
                <label className="relative box-border min-w-[120px] py-3 pb-3 text-base font-normal text-[#171717]">
                  비밀번호 확인&nbsp;
                  <span className="inline-block text-[#ff0000]">*</span>
                </label>
                <div className="flex flex-grow flex-col gap-y-2">
                  <input
                    {...register('checkPassword', {
                      required: '비밀번호를 확인해주세요.',
                      onBlur: () => setIsCheckPasswordBlurred(true)
                    })}
                    type="password"
                    className="box-border w-full rounded-lg border border-solid border-[#d2d2d2] px-4 py-3 align-middle text-sm/[22px] tracking-normal outline-none"
                  />
                  {errors.checkPassword && (
                    <p className="block text-xs/[18px] text-[#ff0000]">{errors.checkPassword.message}</p>
                  )}
                  {watchPassword !== watchCheckPassword && watchCheckPassword && isCheckPasswordBlurred && (
                    <p className="block text-xs/[18px] text-[#ff0000]">동일한 비밀번호를 입력해주세요.</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="box-border rounded-lg bg-[#f7f7f7] px-[16px] py-[20px]">
            <div className="relative flex w-full justify-between">
              <div className="flex items-center text-[14px]/[22px] text-[#6a6a6a]">
                <input
                  className="mr-2 h-5 w-5 text-purple-600 hover:cursor-pointer"
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
              <input id="toggle" type="checkbox" className="hidden" />
              <label htmlFor="toggle" className="cursor-pointer checked:rotate-180">
                <span className="absolute right-0 top-0 h-[18px] w-[18px] bg-[18px_18px]">&#9660;</span>
              </label>
            </div>
            <div className="block">
              {errors.consent && <p className="text-xs/[18px] text-[#ff0000]">{errors.consent.message}</p>}
            </div>

            <div className="mt-4 box-border w-full rounded-lg bg-[#fff] p-4 text-[12px]/[20px]">
              <p className="text-[#222]">
                성균관대 코딩동아리 &apos;코밋(Comit)&apos; 회원 등록을 위해 아래와 같이 개인정보를 수집 및 이용합니다.
                동의를 거부할 권리가 있으며 동의 거부시 동아리 회원서비스 이용이 불가합니다.
              </p>
              <ul className="mt-2">
                <li className="flex list-none items-center">
                  <span className="-mt-[6px] flex items-center text-[30px] leading-[20px]">&#8901;</span>
                  <p className="relative box-border  text-[#6a6a6a]">
                    목적 : 스터디지원 및 프로필 공개등 동아리활동 서비스 제공, 각종 맞춤형 서비스 제공
                  </p>
                </li>
                <li className="flex list-none items-center">
                  <span className="-mt-[6px] flex items-center text-[30px] leading-[20px]">&#8901;</span>
                  <p className="relative mt-1 box-border text-[#6a6a6a]">
                    항목 : 이름, 휴대폰번호, 학번, 이메일, 학력사항
                  </p>
                </li>
                <li className="flex list-none items-center">
                  <span className="-mt-[6px] flex items-center text-[30px] leading-[20px]">&#8901;</span>
                  <p className="relative mt-1 box-border text-[#6a6a6a]">
                    보유 및 이용 기간 : 동아리 또는 회원 탈퇴시 즉시 파기
                  </p>
                </li>
              </ul>
            </div>
          </div>

          {errors.root && <p style={{ color: 'red' }}>{errors.root.message}</p>}
          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-5 w-full rounded-lg border border-solid border-[#d2d2d2] bg-purple-600 px-3 py-[15px]"
          >
            {isSubmitting ? (
              <span className="block text-lg/[26px] font-bold text-[#fff]">제출중...</span>
            ) : (
              <span className="block text-lg/[26px] font-bold text-[#fff]">입력완료</span>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
