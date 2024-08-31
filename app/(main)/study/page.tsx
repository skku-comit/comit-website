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
      recommendation: '학기 동안 진행되는 스터디를 개설하여 뜻이 맞는 CoMit 부원들을 모집하여, 함께 공부하세요!',
      notices: [
        '부적절한 스터디는 관리자에 의해 삭제될 수 있습니다',
        '스터디 주제는 개발 / 비개발 등 자유입니다',
        '스터디장은 책임감 있는 태도로 임해주세요'
      ]
    },
    hasButton: true
  },
  {
    description: {
      title: '스터디 참여',
      question: '혼자 공부하기 막막했던 적 있으신가요?',
      recommendation: 'CoMit 부원들이 개설한 다양한 스터디에 참여하여 함께 공부하며 성장하세요!',
      notices: [
        '스터디원 선정은 스터디장의 권한입니다',
        '스터디 장소는 스터디원들과 함께 조정해주세요',
        '다중 스터디 참여도 가능합니다'
      ]
    },
    hasButton: false
  }
]
export default function Study() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex max-w-7xl flex-col items-center justify-center">
        <section className="flex w-full max-w-6xl flex-col justify-start">
          <SectionBanner title="스터디 개요" description="" className="h-40 w-full" />

          <div className="flex w-full flex-col items-center justify-start gap-10 px-3 lg:flex-row lg:items-start lg:justify-between">
            {descriptions.map((data) => (
              <DescriptionCard key={data.description.title} description={data.description} hasButton={data.hasButton} />
            ))}
          </div>
        </section>

        <section className="mt-10 flex w-full max-w-7xl justify-center">
          <SectionBanner
            title="CoMit의 스터디 분반들을 확인해보세요!"
            description="* 스터디카드를 클릭하여 세부사항을 확인하세요"
            titleClassName="text-lg
           sm:text-3xl text-pretty text-center"
            descriptionClassName="text-sm text-[#6A6D70] text-center text-pretty"
          />
        </section>

        <Suspense fallback={<LoadingSpinner />}>
          <StudyList />
        </Suspense>
      </div>
    </div>
  )
}
