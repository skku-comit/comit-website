import Link from 'next/link'
import { Suspense } from 'react'

import LoadingSpinner from '@/components/common/LoadingSpinner'
import SectionBanner from '@/components/common/SectionBanner'
import DescriptionCard, { Description } from '@/components/common/Study/DescriptionCard'
import StudyList from '@/components/study/StudyList'
import { Button } from '@/components/ui/button'

const studyOpenDescription: Description = {
  title: '스터디 개설',
  question: '함께 공부하고 싶은 팀원들을 모집하고 싶나요?',
  recommendation: '학기동안 진행되는 스터디를 개설하여 뜻이 맞는 CoMit 부원들을 모집하여, 함께 공부하세요!',
  notices: [
    '스터디 주제는 개발/비개발 등 자유입니다',
    '스터디 개설 비용은 없습니다',
    '스터디장은 책임감있는 태도로 임해주세요'
  ]
}
export default function Study() {
  return (
    <>
      {/* Todo : svg 이미지 구해서 넣기*/}
      <section className="flex h-96 w-full items-center justify-center bg-primary">
        <span className="text-4xl text-white">이미지 자리</span>
        {/* <ImageSection /> */}
      </section>

      <SectionBanner title="스터디 개요" description="" />

      <DescriptionCard description={studyOpenDescription} hasButton={false} />

      {/* TODO: Study API 연결되면 hidden 해제하기 */}
      <Button asChild className="mb-12 hidden w-60 py-6 text-lg font-semibold">
        <Link href="study/open">2024-1 스터디 개설 신청</Link>
      </Button>
      <Suspense fallback={<LoadingSpinner />}>
        <StudyList />
      </Suspense>
    </>
  )
}
