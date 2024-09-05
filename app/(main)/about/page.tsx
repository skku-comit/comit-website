import React, { Suspense } from 'react'

import MemberList from '@/components/about/MemberList'
import SectionCard, { SectionCardProps } from '@/components/about/SectionCard'
import LoadingSpinner from '@/components/common/LoadingSpinner'
import SectionBanner from '@/components/common/SectionBanner'
import eventImg from '@/public/about-image/event.svg'
import seminarImg from '@/public/about-image/seminar.svg'
import studyClassImg from '@/public/about-image/studyClass.svg'

const sectionCardData: SectionCardProps[] = [
  {
    id: 1,
    title: '스터디 분반',
    description: '자유롭게 스터디를 개설하고 스터디에 참가하며 다양한 사람들과 지식을 공유합니다',
    image: studyClassImg,
    backgroundColor: 'bg-[#FFE873]'
  },
  {
    id: 2,
    title: '세미나 행사',
    description: '외부 인사들 혹은 COMIT 선배님들을 초청하여 개발 세미나를 진행합니다',
    image: seminarImg,
    backgroundColor: 'bg-[#6DD7B9]'
  },
  {
    id: 3,
    title: '이벤트',
    description:
      '네트워킹을 위해 주기적으로 친목 행사를 진행하며, 연합 해커톤 등 타 동아리와의 교류 행사에 참여할 수 있습니다',
    image: eventImg,
    backgroundColor: 'bg-[#C875FF]'
  }
]

const About = () => {
  return (
    <>
      <SectionBanner title="About" description="중앙 코딩 동아리 CoMit을 소개합니다!" />
      <div className="flex flex-col items-center pt-6 md:pt-12">
        <div className="grid grid-cols-1 items-center gap-12 sm:grid-cols-2 md:gap-20 xl:grid-cols-3">
          {sectionCardData.map((data) => (
            <SectionCard key={data.id} {...data} />
          ))}
        </div>
        <div className="mb-24 mt-60 flex w-full flex-col items-center">
          <p className="mb-20 text-4xl font-semibold text-black">CoMit 임원진</p>
          <Suspense fallback={<LoadingSpinner />}>
            <MemberList />
          </Suspense>
        </div>
      </div>
    </>
  )
}

export default About
