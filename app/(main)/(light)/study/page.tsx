'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { FaSchoolFlag } from 'react-icons/fa6'
import { IoPersonSharp } from 'react-icons/io5'
import { MdOutlineSignalCellularAlt } from 'react-icons/md'
import { RiStackOverflowLine } from 'react-icons/ri'

import SectionBanner from '@/components/common/SectionBanner'
import StudyCard from '@/components/study/StudyCard'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Study as StudyType } from '@/types/Study'

export default function Study() {
  const [studies, setStudies] = useState<StudyType[]>([])
  useEffect(() => {
    const res = fetch('api/studies')
    res.then((res) => res.json()).then((data) => setStudies(data))
  }, [])

  return (
    <>
      <SectionBanner
        title="Study"
        description="CoMit의 스터디 분반을 확인해보세요!"
      />
      {/* TODO: Study API 연결되면 hidden 해제하기 */}
      <Button asChild className="mb-12 hidden w-60 py-6 text-lg font-semibold">
        <Link href="study/open">2024-1 스터디 개설 신청</Link>
      </Button>
      <div className="mb-12 grid grid-cols-2 gap-6 max-sm:px-2 sm:gap-x-16 sm:gap-y-12 lg:grid-cols-4">
        {studies.map((study, index) => (
          <Dialog key={index}>
            <DialogTrigger>
              <StudyCard {...study} />
            </DialogTrigger>
            <DialogContent className="w-[324px] rounded-xl p-6 sm:w-[480px] sm:p-8">
              <div className="break-words text-2xl font-bold">
                {study.title}
              </div>
              {study.day === '' ? null : study.startTime === '' ? (
                <div className="flex gap-3 break-words text-lg text-gray-600">
                  {study.day}요일{' '}
                  <span className="text-base text-red-500">(시간 미정)</span>
                </div>
              ) : (
                <div className="break-words text-lg text-gray-600">
                  {study.day} {study.startTime} ~ {study.endTime}
                </div>
              )}
              <div className="leading-snug">
                <div className="flex gap-6">
                  <div className="flex items-center gap-2">
                    <IoPersonSharp />
                    {study.mentor.name}
                  </div>
                  <div className="flex items-center gap-2">
                    <MdOutlineSignalCellularAlt />
                    {study.level}
                  </div>
                  <div className="flex items-center gap-2">
                    <FaSchoolFlag />
                    {study.campus}
                  </div>
                </div>
                <div className="mb-4 mt-1 flex items-center gap-2 break-words">
                  <RiStackOverflowLine />
                  {study.stack.join(', ')}
                </div>
                <div
                  className="whitespace-pre-line break-keep"
                  dangerouslySetInnerHTML={{ __html: study.description }}
                />
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </>
  )
}
