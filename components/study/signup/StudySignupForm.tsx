'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { FaSchoolFlag } from 'react-icons/fa6'
import { IoTime } from 'react-icons/io5'
import { MdOutlineSignalCellularAlt } from 'react-icons/md'
import { RiStackOverflowLine } from 'react-icons/ri'
import { z } from 'zod'

import LoadingSpinner from '@/components/common/LoadingSpinner'
import UserHoverCard from '@/components/common/User/HoverCard'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Study } from '@/types'

export interface StudySignupRequest {
  username: string
  studentId: number
  github: string
  study_id: string
  applicationMotiv: string
}

const Subheader = ({ children }: { children: React.ReactNode }) => {
  return <h3 className="mb-2 text-2xl font-bold lg:mb-5">{children}</h3>
}

interface IStudySignupForm {
  username: string
  studentId: number
  github: string
  applicationMotiv: string
}

const schema = z.object({
  applicationMotiv: z.string().min(1, { message: '지원 동기를 입력해주세요' }).max(300, { message: '300자 이내' })
})

interface StudySignupFormProps {
  study: Study
}

const StudySignupForm = ({ study }: StudySignupFormProps) => {
  // TODO: 신청 취소 기능 추가
  // TODO: 스터디 신청 정규화
  // study-participants 이외에도 studyEnrollment라는 다른 테이블 만들기 -> 신청 한것과 실제 스터디 진행 인원 분리
  // StudyEnrollment 엔티티 추가 및 CRUD API 엔드포인트 추가
  // StudyEnrollment에는 createdAt, editedAt 추가해서 마지막으로 수정한 날짜도 UI에서 확인 가능하게 하기
  useEffect(() => {
    // TODO: 신청서 데이터 가져와서 채워 넣기
  }, [])

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
    resolver: zodResolver(schema),
    defaultValues: {
      username: '손장수',
      studentId: 2019313647,
      github: 'github.com/skku-comit/comit-website'
    }
  })

  const onValid = async (formData: IStudySignupForm) => {
    // const requestBody: StudySignupRequest = {
    //   username: formData.username,
    //   studentId: formData.studentId,
    //   github: formData.github,
    //   study_id: study.id,
    //   applicationMotiv: formData.applicationMotiv
    // }
    // TODO: 스터디 참여 신청 API 구현 후 연결
    // const res = await fetchData(API_ENDPOINTS.CLIENT.STUDY.SIGNUP(study.id) as ApiEndpoint, {
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(requestBody)
    // })
    // if (res.ok) {
    //   const data = await res.json()
    //   console.log(data)
    //   alert(data)
    //   // TODO: 신청 성공 시 처리 로직 추가
    //   return
    // }
    // switch (res.status) {
    //   case HttpStatusCode.BadRequest:
    //     const json: CustomResponse = await res.json()
    //     switch (json.error!.errorType) {
    //       case AlreadySignedup.errorType:
    //         alert('이미 신청 되었습니다.')
    //         break
    //       default:
    //         throw new Error('Uncaught Error!')
    //     }
    //     break
    //   default:
    //     throw new Error('Uncaught Error!')
    // }
  }

  return (
    <form onSubmit={handleSubmit(onValid)} className="p-3">
      <div className="mb-5 flex flex-col divide-y divide-gray-300">
        <div className="pb-10">
          <Subheader>신청 스터디 확인</Subheader>
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
              <div className="space-y-1 rounded-lg bg-slate-100 p-5 md:bg-transparent md:p-0 lg:space-y-3">
                <h4 className="mb-3 text-xl font-bold">{study.title}</h4>

                <UserHoverCard user={study.mentor} />
                <p className="flex items-center gap-2">
                  <FaSchoolFlag />
                  {study.campus}
                  {study.day && ` | ${study.day}`}
                </p>
                <p className="flex items-center gap-2">
                  <IoTime />
                  {duration(study.startTime, study.endTime)}
                </p>
                <p className="flex items-center gap-2">
                  <MdOutlineSignalCellularAlt />
                  {study.level}
                </p>
                <div className="overflow-auto">
                  <div className="flex justify-start gap-x-2">
                    <RiStackOverflowLine />
                    {study.stacks.map((s) => (
                      <Badge key={s} variant="secondary" className="text-xs">
                        {s}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 스터디 상세 설명 */}
            <div className="col-span-12 mb-5 lg:col-span-6 lg:mb-0">
              <h4 className="mb-2 text-lg font-extrabold">스터디 설명</h4>
              <p className="whitespace-pre-line break-all" dangerouslySetInnerHTML={{ __html: study.description }} />
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
            지원동기 작성&nbsp;
            <span className="text-lg">(300자 이내)</span>
          </Subheader>

          <div>
            <div className="mb-3 text-sm lg:space-y-1">
              <p>* 아래 정보는 스터디장에게 제공됩니다</p>
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
