'use client'

import { useEffect, useState } from 'react'

import StudyCard from '@/components/main/StudyCard'
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
            <StudyCard key={index} study={study} />
          ))}
        </div>
      )}
    </>
  )
}