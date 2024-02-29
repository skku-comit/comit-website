'use client'

import SectionBanner from '@/components/common/SectionBanner'
import Image from 'next/image'
import ComitOwl from '@/public/comitOwl.png'
import { Button } from '@/components/ui/button'
import { BsEye, BsEyeSlash } from 'react-icons/bs'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useRef, useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'

interface StudyForm {
  imageSrc: string
  title: string
  day: string
  startTime: string
  endTime: string
  campus: string
  level: string
  stack: string[]
  description: string
}

// TODO: 백엔드와 논의 후 schema 수정
const schema = z.object({
  imageSrc: z.string(),
  title: z.string().min(2, { message: '제목은 2자 이상이어야 합니다' }),
  day: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  campus: z.string(),
  level: z.string(),
  stack: z.array(z.string()),
  description: z.string().min(10, { message: '설명은 10자 이상이어야 합니다' })
})

export default function OpenStudy() {
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<StudyForm>({
    resolver: zodResolver(schema)
  })

  // TODO: login API 연결
  const onSubmit = (data: StudyForm) => {
    console.log(data)
  }

  const [image, setImage] = useState<string>('')
  const fileRef = useRef<HTMLInputElement>(null)
  const handleClick = () => {
    fileRef?.current?.click()
  }
  const handleChange = (e: React.ChangeEvent) => {
    const targetFiles = (e.target as HTMLInputElement).files as FileList
    const selectedFile = URL.createObjectURL(targetFiles[0])
    setImage(selectedFile)
    console.log(image)
  }
  return (
    <>
      <SectionBanner
        title="Open Study"
        description="새로운 스터디 분반을 개설합니다!"
      />
      <form className="flex flex-col gap-2">
        <div className="flex gap-8">
          <div className="flex flex-col gap-1">
            <p className="text-xl font-semibold">이미지</p>
            <div
              onClick={handleClick}
              className="flex h-52 w-52 items-center justify-center overflow-hidden rounded-lg border border-slate-300"
            >
              {!image ? (
                <p className="text-5xl font-light text-slate-300">+</p>
              ) : (
                <Image
                  src={image}
                  width={208}
                  height={208}
                  alt={image}
                  className="h-full w-full object-cover"
                />
              )}
            </div>
            <Input
              className="hidden"
              accept="image/*"
              type="file"
              ref={fileRef}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <p className="text-xl font-semibold">스터디 제목</p>
              <Input
                placeholder="스터디 제목을 입력해주세요"
                id="title"
                {...register('title')}
                className="w-96 rounded-xl border border-slate-300"
              />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-xl font-semibold">시간</p>
              <div className="flex justify-between">
                <Input
                  placeholder="시작 시간"
                  id="startTime"
                  {...register('startTime')}
                  className="w-44 rounded-xl border border-slate-300"
                />
                <Input
                  placeholder="종료 시간"
                  id="endTime"
                  {...register('endTime')}
                  className="w-44 rounded-xl border border-slate-300"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-xl font-semibold">요일</p>
              <Input
                id="day"
                {...register('day')}
                className="w-96 rounded-xl border border-slate-300"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col gap-1">
            <p className="text-xl font-semibold">장소</p>
            <Input
              id="campus"
              {...register('campus')}
              className="w-72 rounded-xl border border-slate-300"
            />
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-xl font-semibold">난이도</p>
            <Input
              id="level"
              {...register('level')}
              className="w-72 rounded-xl border border-slate-300"
            />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-xl font-semibold">주제 / 기술 스택</p>
          <Input
            placeholder="주제를 입력해주세요"
            id="stack"
            {...register('stack')}
            className="w-72 rounded-xl border border-slate-300"
          />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-xl font-semibold">설명</p>
          <Textarea
            placeholder="스터디 목표, 배우는 내용, 선행돼야 하는 지식 등을 구체적으로 작성해주세요"
            id="description"
            {...register('description')}
            className="h-48 w-full rounded-xl border border-slate-300"
          />
        </div>
        <div className="my-8 flex justify-between">
          <Button className="px-8 font-extrabold" variant="outline" disabled>
            미리 보기
          </Button>
          <Button
            type="submit"
            className="px-8 font-extrabold"
            onClick={handleSubmit(onSubmit)}
          >
            제출하기
          </Button>
        </div>
      </form>
    </>
  )
}
