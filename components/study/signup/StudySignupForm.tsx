'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import LoadingSpinner from '@/components/common/LoadingSpinner'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { Textarea } from '@/components/ui/textarea'
import { API_ENDPOINTS } from '@/constants/apiEndpoint'
import { fetchData } from '@/lib/fetch'
import { Study } from '@/types'

export interface StudySignupRequest {
  study_id: string
  user_id: string
  applicationMotiv: string
}

const Subheader = ({ children }: { children: React.ReactNode }) => {
  return <h3 className="mb-2 text-2xl font-bold lg:mb-5">{children}</h3>
}

interface IStudySignupForm {
  applicationMotiv: string
}

const schema = z.object({
  applicationMotiv: z.string().min(1, { message: '지원 동기를 입력해주세요' }).max(300, { message: '300자 이내' })
})

interface StudySignupFormProps {
  study: Study
}

const StudySignupForm = ({ study }: StudySignupFormProps) => {
  const duration = (startTime: string | null, endTime: string | null) => {
    if (!startTime || !endTime) {
      return '(시간 미정)'
    }
    return `${startTime.substring(0, 5)} ~ ${endTime.substring(0, 5)}`
  }

  // Form related logics
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting }
  } = useForm<IStudySignupForm>({
    resolver: zodResolver(schema)
  })

  const onValid = async (formData: IStudySignupForm) => {
    const TEST_USER_ID = 'b5851320-d374-4763-a7d5-70427602c19b' // 손장수
    const requestBody: StudySignupRequest = {
      study_id: study.id,
      user_id: TEST_USER_ID,
      applicationMotiv: formData.applicationMotiv
    }
    const jsonData = JSON.stringify(requestBody)
    const res = await fetchData(API_ENDPOINTS.STUDY.SIGNUP(study.id), {
      headers: {
        'Content-Type': 'application/json'
      },
      body: jsonData
    })
    console.log(res)
  }

  return (
    <form onSubmit={handleSubmit(onValid)} className="p-3">
      <div className="mb-5 flex flex-col divide-y divide-gray-300">
        <div className="pb-10">
          <Subheader>1. 신청 스터디 확인</Subheader>
          <div className="mb-2 grid grid-cols-12 gap-5">
            {/* 스터디 사진과 기본 정보 */}
            <div className="col-span-12 block md:flex md:gap-5 lg:col-span-6">
              <div className="mb-3 flex justify-center">
                <Image
                  src={study.imageSrc}
                  alt="study image"
                  sizes="100vw"
                  width={200}
                  height={200}
                  className="rounded-xl p-3 md:border"
                />
              </div>
              {/* 스터디 기본 정보 */}
              <div className="space-y-1 lg:space-y-3">
                <h4 className="text-xl font-bold">{study.title}</h4>
                <HoverCard>
                  <HoverCardTrigger>
                    <p className="underline-offset-2 hover:underline">@{study.mentor.name}</p>
                  </HoverCardTrigger>
                  <HoverCardContent>
                    {/* TODO: 스터디장 정보 기입 */}
                    {/* {study.mentor.bio} */}
                  </HoverCardContent>
                </HoverCard>
                <p>
                  {study.campus}
                  {study.day && ` | ${study.day}`}
                </p>
                <p>{duration(study.startTime, study.endTime)}</p>
                <p>{study.level}</p>
                <div className="overflow-auto">
                  <div className="flex justify-start gap-x-2">
                    {study.stack.map((s) => (
                      <Badge key={s} variant="secondary" className="text-xs">
                        {s}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 스터디 상세 설명 */}
            <div className="col-span-12 lg:col-span-6">
              <div className="lg:rounded-lg lg:border">
                <p
                  className="whitespace-pre-line break-all p-1 lg:p-3"
                  dangerouslySetInnerHTML={{ __html: study.description }}
                />
              </div>
            </div>
          </div>

          {/* 참고 사항 */}
          <div className="text-sm lg:space-y-1">
            <p>* 스터디 장소, 날짜, 시간을 다시 한번 확인해주세요.</p>
            <p>* 다중 스터디 신청은 가능합니다 (여러 스터디 참여 가능)</p>
          </div>
        </div>

        <div className="pt-10">
          <Subheader>
            3. 지원동기 작성&nbsp;
            <span className="text-lg">(300자 이내)</span>
          </Subheader>

          <div>
            <div className="mb-3 text-sm lg:space-y-1">
              <p>* 자신의 열정 및 스터디 참여 의지를 어필해주세요</p>
              <p>* 지원동기는 스터디 신청 기간동안 자유롭게 수정 가능합니다</p>
            </div>

            <div className="rounded-xl">
              <Textarea
                id="applicationMotiv"
                {...register('applicationMotiv')}
                placeholder="지원 동기를 입력해주세요"
                className={errors.applicationMotiv ? 'border-destructive' : ''}
              />
              {errors.applicationMotiv && <p className="text-destructive">{errors.applicationMotiv.message}</p>}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? (
            <>
              <LoadingSpinner size={14} />
              &nbsp;&nbsp;
              <span>제출 중</span>
            </>
          ) : (
            '제출하기'
          )}
        </Button>
      </div>
    </form>
  )
}

export default StudySignupForm
