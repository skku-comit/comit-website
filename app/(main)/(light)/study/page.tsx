import { Suspense } from 'react'

import LoadingSpinner from '@/components/common/LoadingSpinner'
import SectionBanner from '@/components/common/SectionBanner'
import DescriptionCard, { DescriptionCardProps } from '@/components/common/Study/DescriptionCard'
import StudyList from '@/components/study/StudyList'

const descriptions: DescriptionCardProps[] = [
  {
    description: {
      title: '스터디 개설',
      question: '함께 공부하고 싶은 팀원들을 모집하고 싶나요?',
      recommendation: '학기동안 진행되는 스터디를 개설하여 뜻이 맞는 CoMit 부원들을 모집하여, 함께 공부하세요!',
      notices: [
        '스터디 주제는 개발/비개발 등 자유입니다',
        '스터디장은 책임감있는 태도로 임해주세요',
        '스터디 개설 비용은 없습니다'
      ]
    },
    hasButton: true
  },
  {
    description: {
      title: '스터디 참여',
      question: '혼자 공부하기 지루하고 막막했던적 있으신가요?',
      recommendation: 'CoMit 부원들이 개설한 다양한 스터디에 참여하여 함께 공부하며 성장하세요!',
      notices: [
        '스터디원 선정은 스터디장 권한입니다',
        '스터디 장소/시간은 자유롭게 조정하세요',
        '스터디는 다중 참여가 가능합니다'
      ]
    },
    hasButton: false
  }
]
export default function Study() {
  return (
    <>
      {/* Todo : svg 이미지 구해서 넣기*/}
      <section className="flex h-96 w-full items-center justify-center bg-primary">
        <span className="text-4xl text-white">이미지 자리</span>
        {/* <ImageSection /> */}
      </section>

      <section className="flex w-4/5 max-w-[1300px] flex-col justify-start border-2 border-solid border-red-500 lg:w-[90%]">
        <SectionBanner title="스터디 개요" description="" className="h-40 w-full" />

        <div className="flex w-full flex-col items-center justify-start gap-10 lg:flex-row lg:items-start lg:justify-between">
          {descriptions.map((data) => (
            <DescriptionCard key={data.description.title} description={data.description} hasButton={data.hasButton} />
          ))}
        </div>
      </section>

      <Suspense fallback={<LoadingSpinner />}>
        <StudyList />
      </Suspense>
    </>
  )
}
