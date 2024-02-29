'use client'

import SectionBanner from '@/components/common/SectionBanner'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { SetStateAction, useRef, useState } from 'react'
import { z } from 'zod'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Badge } from '@/components/ui/badge'
import StudyCard from '@/components/study/StudyCard'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'

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
  imageSrc: z.string({
    required_error: '이미지를 업로드해주세요'
  }),
  title: z.string().min(1, { message: '스터디 제목을 입력해주세요' }),
  day: z.enum(['월', '화', '수', '목', '금', '토', '일'], {
    required_error: '요일을 선택해주세요'
  }),
  startTime: z.string().min(1, { message: '시작 시간을 입력해주세요' }),
  endTime: z.string().min(1, { message: '종료 시간을 입력해주세요' }),
  campus: z.enum(['율전', '명륜', '온라인'], {
    required_error: '캠퍼스를 선택해주세요'
  }),
  level: z.enum(['입문', '초급', '중급', '고급'], {
    required_error: '난이도를 선택해주세요'
  }),
  stack: z.array(z.string(), {
    required_error: '스택을 입력해주세요'
  }),
  description: z.string().min(1, { message: '설명을 입력해주세요' })
})

export default function OpenStudy() {
  const {
    handleSubmit,
    register,
    setValue,
    getValues,
    watch,
    control,
    trigger,
    formState: { errors, isValid }
  } = useForm<StudyForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      stack: []
    }
  })

  const watchedStacks = watch('stack')
  // TODO: study API 연결
  const onSubmit = (data: StudyForm) => {
    console.log(data)
  }

  const [stackError, setStackError] = useState('')
  const [currentStack, setCurrentStack] = useState('')
  const [image, setImage] = useState<string>('')

  const fileRef = useRef<HTMLInputElement>(null)
  const handleClick = () => {
    fileRef?.current?.click()
  }
  const handleChange = (e: React.ChangeEvent) => {
    const targetFiles = (e.target as HTMLInputElement).files as FileList
    const selectedFile = URL.createObjectURL(targetFiles[0])
    setImage(selectedFile)
    setValue('imageSrc', selectedFile)
    trigger('imageSrc')
  }

  const handleInputChange = (e: {
    target: { value: SetStateAction<string> }
  }) => {
    setCurrentStack(e.target.value)
  }
  const handleEnterPress = (e: { key: string }) => {
    if (
      currentStack.trim() === '' ||
      (watchedStacks && watchedStacks.length >= 4)
    ) {
      if (watchedStacks && watchedStacks.length >= 4)
        setStackError('스택은 최대 4개까지만 입력 가능합니다')
      return
    }
    if (e.key === 'Enter' && currentStack.trim() !== '') {
      setValue(
        'stack',
        getValues('stack')
          ? getValues('stack').concat(currentStack)
          : [currentStack]
      )
      setCurrentStack('')
      trigger('stack')
    }
  }
  return (
    <>
      <SectionBanner
        title="Open Study"
        description="새로운 스터디 분반을 개설합니다!"
      />
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
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
            {errors.imageSrc && (
              <p className="text-sm text-red-500">{errors.imageSrc.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <p className="text-xl font-semibold">스터디 제목</p>
              <Input
                placeholder="스터디 제목을 입력해주세요"
                id="title"
                {...register('title')}
                className="w-full rounded-xl border border-slate-300"
              />
              {errors.title && (
                <p className="text-sm text-red-500">{errors.title.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-xl font-semibold">시간</p>
              <div className="flex justify-between">
                <div className="flex flex-col gap-1">
                  <Input
                    placeholder="시작 시간"
                    id="startTime"
                    {...register('startTime')}
                    className="w-48 rounded-xl border border-slate-300"
                  />
                  {errors.startTime && (
                    <p className="text-sm text-red-500">
                      {errors.startTime.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <Input
                    placeholder="종료 시간"
                    id="endTime"
                    {...register('endTime')}
                    className="w-48 rounded-xl border border-slate-300"
                  />
                  {errors.endTime && (
                    <p className="text-sm text-red-500">
                      {errors.endTime.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-xl font-semibold">요일</p>
              <Controller
                control={control}
                name="day"
                render={({ field: { onChange, value } }) => (
                  <div className="flex gap-6">
                    <label className="flex gap-2">
                      <input
                        type="radio"
                        onChange={() => onChange('월')}
                        checked={value === '월'}
                        className="accent-black"
                      />
                      월
                    </label>
                    <label className="flex gap-2">
                      <input
                        type="radio"
                        onChange={() => onChange('화')}
                        checked={value === '화'}
                        className="accent-black"
                      />
                      화
                    </label>
                    <label className="flex gap-2">
                      <input
                        type="radio"
                        onChange={() => onChange('수')}
                        checked={value === '수'}
                        className="accent-black"
                      />
                      수
                    </label>
                    <label className="flex gap-2">
                      <input
                        type="radio"
                        onChange={() => onChange('목')}
                        checked={value === '목'}
                        className="accent-black"
                      />
                      목
                    </label>
                    <label className="flex gap-2">
                      <input
                        type="radio"
                        onChange={() => onChange('금')}
                        checked={value === '금'}
                        className="accent-black"
                      />
                      금
                    </label>
                    <label className="flex gap-2">
                      <input
                        type="radio"
                        onChange={() => onChange('토')}
                        checked={value === '토'}
                        className="accent-black"
                      />
                      토
                    </label>
                    <label className="flex gap-2">
                      <input
                        type="radio"
                        onChange={() => onChange('일')}
                        checked={value === '일'}
                        className="accent-black"
                      />
                      일
                    </label>
                  </div>
                )}
              />
              {errors.day && (
                <p className="text-sm text-red-500">{errors.day.message}</p>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col gap-1">
            <p className="text-xl font-semibold">캠퍼스</p>
            <Controller
              control={control}
              name="campus"
              render={({ field: { onChange, value } }) => (
                <div className="flex gap-6">
                  <label className="flex gap-2">
                    <input
                      type="radio"
                      onChange={() => onChange('율전')}
                      checked={value === '율전'}
                      className="accent-black"
                    />
                    율전
                  </label>
                  <label className="flex gap-2">
                    <input
                      type="radio"
                      onChange={() => onChange('명륜')}
                      checked={value === '명륜'}
                      className="accent-black"
                    />
                    명륜
                  </label>
                  <label className="flex gap-2">
                    <input
                      type="radio"
                      onChange={() => onChange('온라인')}
                      checked={value === '온라인'}
                      className="accent-black"
                    />
                    온라인
                  </label>
                </div>
              )}
            />
            {errors.campus && (
              <p className="text-sm text-red-500">{errors.campus.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-xl font-semibold">난이도</p>
            <Controller
              control={control}
              name="level"
              render={({ field: { onChange, value } }) => (
                <div className="flex gap-6">
                  <label className="flex gap-2">
                    <input
                      type="radio"
                      onChange={() => onChange('입문')}
                      checked={value === '입문'}
                      className="accent-black"
                    />
                    입문
                  </label>
                  <label className="flex gap-2">
                    <input
                      type="radio"
                      onChange={() => onChange('초급')}
                      checked={value === '초급'}
                      className="accent-black"
                    />
                    초급
                  </label>
                  <label className="flex gap-2">
                    <input
                      type="radio"
                      onChange={() => onChange('중급')}
                      checked={value === '중급'}
                      className="accent-black"
                    />
                    중급
                  </label>
                  <label className="flex gap-2">
                    <input
                      type="radio"
                      onChange={() => onChange('고급')}
                      checked={value === '고급'}
                      className="accent-black"
                    />
                    고급
                  </label>
                </div>
              )}
            />
            {errors.level && (
              <p className="text-sm text-red-500">{errors.level.message}</p>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-xl font-semibold">주제 / 기술 스택</p>
          {stackError && <p className="text-sm text-red-500">{stackError}</p>}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Input
                  placeholder="주제를 입력해주세요"
                  id="stack"
                  value={currentStack}
                  onChange={handleInputChange}
                  onKeyDown={handleEnterPress}
                  className="w-60 rounded-xl border border-slate-300"
                />
                <Button
                  type="button"
                  variant="secondary"
                  className="absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 p-3 text-2xl text-gray-600"
                  disabled={
                    currentStack.trim() === '' ||
                    (watchedStacks && watchedStacks.length >= 4)
                  }
                  onClick={() => {
                    setValue(
                      'stack',
                      getValues('stack')
                        ? getValues('stack').concat(currentStack)
                        : [currentStack]
                    )
                    setCurrentStack('')
                    trigger('stack')
                  }}
                >
                  +
                </Button>
              </div>
              <Button
                variant={'secondary'}
                className="p-3"
                type="button"
                onClick={() => {
                  setStackError('')
                  setValue('stack', [])
                }}
              >
                Reset
              </Button>
            </div>
            {errors.stack && (
              <p className="-mt-2 text-sm text-red-500">
                {errors.stack.message}
              </p>
            )}
            <div className="flex gap-4 rounded-2xl">
              {watchedStacks &&
                watchedStacks.map((stack, index) => (
                  <Badge variant="secondary" key={index}>
                    {stack}
                  </Badge>
                ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-xl font-semibold">설명</p>
          <Textarea
            placeholder="스터디 목표, 배우는 내용, 선행돼야 하는 지식 등을 구체적으로 작성해주세요"
            id="description"
            {...register('description')}
            className="h-48 w-full rounded-xl border border-slate-300"
          />
          {errors.description && (
            <p className="text-sm text-red-500">{errors.description.message}</p>
          )}
        </div>
        <div className="my-8 flex justify-between">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                className="px-8 font-extrabold"
                variant="outline"
                disabled={!isValid}
              >
                미리 보기
              </Button>
            </DialogTrigger>
            <DialogContent className="flex justify-center p-8 sm:max-w-[425px]">
              <StudyCard
                campus={getValues('campus')}
                day={getValues('day')}
                imageSrc={getValues('imageSrc')}
                endTime={getValues('endTime')}
                level={getValues('level')}
                stack={getValues('stack')}
                startTime={getValues('startTime')}
                title={getValues('title')}
              />
            </DialogContent>
          </Dialog>

          <Button type="submit" className="px-8 font-extrabold">
            제출하기
          </Button>
        </div>
      </form>
    </>
  )
}
