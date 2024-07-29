'use client'

import { useEffect, useState } from 'react'

import { Study } from '@/types/Study'

import LoadingSpinner from '../LoadingSpinner'
import StudyCard from '.'
import { StudyCardProps } from '.'

export interface LazyLoadingStudyCardProp extends Omit<StudyCardProps, 'study'> {
  id: string
}

/**
 * id만 주어지면 fetching부터 loading까지 해주는 StudyCard의 Wrapper
 */
export default function LazyLoadingStudyCard({ id, ...studyCardProps }: LazyLoadingStudyCardProp) {
  const [study, setStudy] = useState<Study>()

  useEffect(() => {
    console.log(`trying to fetch study with id '${id}'`)
    const res = fetch(`api/studies/${id}`)
    res
      .then((res) => res.json())
      .then((data) => {
        setStudy(data)
      })
  }, [id])

  return (
    <>
      {/* Consider using skeleton instead of loading spinner */}
      {!study && <LoadingSpinner />}
      {study && <StudyCard study={study} {...studyCardProps} />}
    </>
  )
}
