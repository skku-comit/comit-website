'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { TimePicker } from 'antd'
import type { Dayjs } from 'dayjs'
import Image from 'next/image'
import { SetStateAction, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { MdHelpOutline } from 'react-icons/md'
import { z } from 'zod'

import SectionBanner from '@/components/common/SectionBanner'
import UnderConstructionDialog from '@/components/common/UnderConstructionDialog'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Textarea } from '@/components/ui/textarea'

type Day = '월' | '화' | '수' | '목' | '금' | '토' | '일'
type Campus = '율전' | '명륜' | '온라인'
type Level = '입문' | '초급' | '중급' | '고급'
interface StudyForm {
  imageSrc: string
  title: string
  startTime: string
  endTime: string
  day: Day
  campus: Campus
  level: Level
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
  startTime: z.string({
    required_error: '시작 시간을 입력해주세요'
  }),
  endTime: z.string({
    required_error: '종료 시간을 입력해주세요'
  }),
  campus: z.enum(['율전', '명륜', '온라인'], {
    required_error: '캠퍼스를 선택해주세요'
  }),
  level: z.enum(['입문', '초급', '중급', '고급'], {
    required_error: '난이도를 선택해주세요'
  }),
  stack: z.array(z.string()).min(1, { message: '스택을 입력해주세요' }),
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
    setError,
    clearErrors,
    formState: { errors, isValid }
  } = useForm<StudyForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      stack: []
    }
  })
  // TODO: study API 연결
  const onSubmit = (data: StudyForm) => {
    console.log(data)
    document.getElementById('closeDialog')?.click()
  }

  // Image
  const [image, setImage] = useState<string>('')

  const fileRef = useRef<HTMLInputElement>(null)
  const handleClick = () => {
    fileRef?.current?.click()
  }
  const handleFileChange = (e: React.ChangeEvent) => {
    const targetFiles = (e.target as HTMLInputElement).files as FileList
    // 예외 Case: 파일 입력 후 다시 닫을때
    if (targetFiles.length) {
      const selectedFile = URL.createObjectURL(targetFiles[0])
      setImage(selectedFile)
      setValue('imageSrc', selectedFile)
    }
  }
  // Stack
  const watchedStacks = watch('stack')
  const [stackError, setStackError] = useState('')
  const [currentStack, setCurrentStack] = useState('')

  const handleStackChange = (e: { target: { value: SetStateAction<string> } }) => {
    setCurrentStack(e.target.value)
  }
  const handleStackAdd = (e: { key: string }) => {
    if (currentStack.trim() === '' || (watchedStacks && watchedStacks.length >= 4)) {
      if (watchedStacks && watchedStacks.length >= 4) setStackError('스택은 최대 4개까지만 입력 가능합니다')
      return
    }
    if (e.key === 'Enter' && currentStack.trim() !== '') {
      setValue('stack', getValues('stack') ? getValues('stack').concat(currentStack) : [currentStack])
      setCurrentStack('')
    }
  }
  // Time
  const [startTime, setStartTime] = useState<Dayjs | null>(null)
  const [endTime, setEndTime] = useState<Dayjs | null>(null)

  const onChangeStartTime = (time: Dayjs) => {
    setValue('startTime', time.format('HH:mm'))
    setStartTime(time)
  }
  const onChangeEndTime = (time: Dayjs) => {
    setValue('endTime', time.format('HH:mm'))
    setEndTime(time)
  }

  // Iterators
  const dayOptions: Day[] = ['월', '화', '수', '목', '금', '토', '일']
  const campusOptions: Campus[] = ['율전', '명륜', '온라인']
  const levelOptions: Level[] = ['입문', '초급', '중급', '고급']

  return (
    <>
      <SectionBanner title="Open Study" description="새로운 스터디 분반을 개설합니다!" />
      <form className="flex flex-col gap-4 max-sm:px-3" onSubmit={handleSubmit(onSubmit)}>
        <UnderConstructionDialog />
        <div className="flex gap-8 max-md:flex-col max-md:gap-4">
          <div className="flex flex-col gap-1">
            <p className="text-xl font-semibold">이미지</p>
            <div
              onClick={handleClick}
              className="flex h-52 w-52 items-center justify-center overflow-hidden rounded-lg border border-slate-300"
            >
              {!image ? (
                <p className="text-5xl font-light text-slate-300">+</p>
              ) : (
                <Image src={image} width={208} height={208} alt={image} className="h-full w-full object-cover" />
              )}
            </div>
            <Input className="hidden" accept="image/*" type="file" ref={fileRef} onChange={handleFileChange} />
            {errors.imageSrc && <p className="text-sm text-red-500">{errors.imageSrc.message}</p>}
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
              {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-xl font-semibold">시간</p>
              <div className="flex justify-between max-md:gap-4">
                <div className="flex flex-col gap-1">
                  <TimePicker
                    placeholder="시작 시간"
                    value={startTime}
                    onChange={onChangeStartTime}
                    className="w-36 rounded-xl border border-slate-300 px-4 sm:w-48"
                    format="HH:mm"
                    size="large"
                    needConfirm={false}
                    changeOnScroll
                  />
                  {errors.startTime && <p className="text-sm text-red-500">{errors.startTime.message}</p>}
                </div>
                <div className="flex flex-col gap-1">
                  <TimePicker
                    placeholder="종료 시간"
                    value={endTime}
                    onChange={onChangeEndTime}
                    className="w-36 rounded-xl border border-slate-300 px-4 sm:w-48"
                    format="HH:mm"
                    size="large"
                    needConfirm={false}
                    changeOnScroll
                  />
                  {errors.endTime && <p className="text-sm text-red-500">{errors.endTime.message}</p>}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-xl font-semibold">요일</p>
              <Controller
                control={control}
                name="day"
                render={({ field: { onChange, value } }) => (
                  <div className="flex gap-3 sm:gap-6">
                    {dayOptions.map((day) => (
                      <label key={day} className="flex gap-1 sm:gap-2">
                        <input
                          type="radio"
                          onChange={() => onChange(day)}
                          checked={value === day}
                          className="accent-black"
                        />
                        {day}
                      </label>
                    ))}
                  </div>
                )}
              />
              {errors.day && <p className="text-sm text-red-500">{errors.day.message}</p>}
            </div>
          </div>
        </div>

        <div className="flex justify-between max-md:flex-col max-md:gap-4">
          <div className="flex flex-col gap-1">
            <p className="text-xl font-semibold">캠퍼스</p>
            <Controller
              control={control}
              name="campus"
              render={({ field: { onChange, value } }) => (
                <div className="flex gap-6">
                  {campusOptions.map((campus) => (
                    <label key={campus} className="flex gap-2">
                      <input
                        type="radio"
                        onChange={() => onChange(campus)}
                        checked={value === campus}
                        className="accent-black"
                      />
                      {campus}
                    </label>
                  ))}
                </div>
              )}
            />
            {errors.campus && <p className="text-sm text-red-500">{errors.campus.message}</p>}
          </div>

          <div className="flex flex-col gap-1">
            <p className="text-xl font-semibold">난이도</p>
            <Controller
              control={control}
              name="level"
              render={({ field: { onChange, value } }) => (
                <div className="flex gap-6">
                  {levelOptions.map((level) => (
                    <label key={level} className="flex gap-2">
                      <input
                        type="radio"
                        onChange={() => onChange(level)}
                        checked={value === level}
                        className="accent-black"
                      />
                      {level}
                    </label>
                  ))}
                </div>
              )}
            />
            {errors.level && <p className="text-sm text-red-500">{errors.level.message}</p>}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <p className="text-xl font-semibold">주제 / 기술 스택</p>
            <Popover>
              <PopoverTrigger asChild>
                <button>
                  <MdHelpOutline className="hover:text-gray-600" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="mb-2 flex w-64 justify-center text-sm" side="top">
                <ul>
                  <li>스택은 최대 4개까지 입력 가능하며</li>
                  <li>첫번째 스택만 카드에 표시됩니다.</li>
                </ul>
              </PopoverContent>
            </Popover>
          </div>
          {stackError && <p className="text-sm text-red-500">{stackError}</p>}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Input
                  placeholder="주제를 입력해주세요"
                  id="stack"
                  value={currentStack}
                  onChange={handleStackChange}
                  onKeyDown={handleStackAdd}
                  className="w-60 rounded-xl border border-slate-300"
                />
                <Button
                  type="button"
                  variant="secondary"
                  className="absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 p-3 text-2xl text-gray-600"
                  disabled={currentStack.trim() === '' || (watchedStacks && watchedStacks.length >= 4)}
                  onClick={() => {
                    const newStack = getValues('stack').concat(currentStack)
                    if (new Set(newStack).size === getValues('stack').length) {
                      setError('stack', {
                        type: 'Duplicate',
                        message: '중복 스택이 존재합니다'
                      })
                    } else {
                      clearErrors('stack')
                      setValue(
                        'stack',
                        getValues('stack') ? newStack : [currentStack]
                      )
                    }
                    setCurrentStack('')
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
            {errors.stack && <p className="-mt-2 text-sm text-red-500">{errors.stack.message}</p>}
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
          {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
        </div>
        <div className="my-8 flex justify-end">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button type="button" className="px-8 font-extrabold">
                제출하기
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="flex flex-col p-8 sm:max-w-[425px]">
              <AlertDialogHeader>
                <AlertDialogTitle>제출하시겠습니까?</AlertDialogTitle>
                <AlertDialogDescription>
                  스터디 개설이 승인되기 전까지 내용 수정 및 삭제가 불가하며, 반드시 내용을 수정하거나 삭제해야 하는
                  경우 관리자에게 문의해주세요.
                </AlertDialogDescription>
              </AlertDialogHeader>
              {/* TODO: study dialog 추가 */}
              <div className="flex justify-center">
                {/* TODO: study open에 맞게 StudyCard 수정 */}
                {/* <StudyCard
                  campus={getValues('campus') || ''}
                  day={getValues('day') || ''}
                  imageSrc={
                    getValues('imageSrc') ||
                    // TODO: 다른 이미지 저장으로 대체
                    'https://github.com/skku-comit/comit-website/assets/97675977/5ac14e32-87e6-40c0-9572-33cab7822abd'
                  }
                  endTime={getValues('endTime') || ''}
                  level={getValues('level') || ''}
                  stack={getValues('stack') || ''}
                  startTime={getValues('startTime') || ''}
                  title={getValues('title') || ''}
                /> */}
              </div>           
              {!isValid && <p className="text-sm text-red-500">모든 항목을 입력해주세요</p>}
              <AlertDialogFooter>
                <AlertDialogCancel>취소</AlertDialogCancel>
                <AlertDialogAction type="submit" onClick={handleSubmit(onSubmit)} disabled={!isValid}>
                  확인
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </form>
    </>
  )
}
