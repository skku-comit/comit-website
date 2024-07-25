'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

import StudyCard from '@/components/common/StudyCard'
import { Study } from '@/types/Study'

import LoadingSpinner from '../common/LoadingSpinner'

export default function ExampleStudyList() {
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

  const exampleStudies = studies.slice(0, 4)

  return (
    <>
      {isLoading && <LoadingSpinner />}
      {!isLoading && (
        <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-12 xl:mb-32 xl:grid-cols-4">
          {exampleStudies.map((study, index) => (
            <Link key={index} href="study/">
              <StudyCard
                study={study}
                imageSize={176}
                showStatus={false}
                imageWrapperClassName="mb-8 mt-4 h-24 w-24 overflow-hidden sm:h-44 sm:w-44"
              />
            </Link>
          ))}
        </div>
      )}
    </>
  )
}
