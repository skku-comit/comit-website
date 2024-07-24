'use client'

import React, { useEffect, useState } from 'react'
import { FaSchoolFlag } from 'react-icons/fa6'
import { IoPersonSharp } from 'react-icons/io5'
import { MdOutlineSignalCellularAlt } from 'react-icons/md'
import { RiStackOverflowLine } from 'react-icons/ri'

import StudyCard from '@/components/common/StudyCard'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Study } from '@/types/Study'

import LoadingSpinner from '../common/LoadingSpinner'

export default function StudyList() {
  const [studies, setStudies] = useState<Study[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const res = fetch('api/studies')
    res
      .then((res) => res.json())
      .then((data) => {
        setStudies(data)
        setIsLoading(false)
      })
  }, [])

  return (
    <>
      {isLoading && <LoadingSpinner />}
      {!isLoading && (
        <div className="mb-12 grid grid-cols-2 gap-6 max-sm:px-2 sm:gap-x-16 sm:gap-y-12 lg:grid-cols-4">
          {studies.map((study, index) => (
            <Dialog key={index}>
              <DialogTrigger>
                <StudyCard
                  study={study}
                  imageSize={144}
                  showStatus={true}
                  imageWrapperClassName="mb-8 mt-4 h-24 w-24 overflow-hidden sm:h-36 sm:w-36"
                />
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
      )}
    </>
  )
}
