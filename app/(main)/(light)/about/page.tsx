import IntroduceMemeberCard from '@/components/about/IntroduceMemberCard'
import SectionCard from '@/components/about/SectionCard'
import SectionBanner from '@/components/common/SectionBanner'
import { dummyPeopleData } from '@/lib/dummy'

const sectionCardData = {
  class: {
    title: '스터디 분반',
    description:
      '자유롭게 스터디를 개설하고 스터디에 참가하며 다양한 사람들과 지식을 공유합니다',
    image: 'studyClass'
  },
  seminar: {
    title: '세미나 행사',
    description:
      '외부 인사들을 초청하거나 COMIT 선배님들을 모시고 세미나를 진행합니다',
    image: 'seminar'
  },
  event: {
    title: '이벤트',
    description:
      '네트워킹을 위해 주기적으로 친목 행사를 진행하며, 연합 해커톤 등 타 동아리와의 교류 행사에 참여할 수 있습니다',
    image: 'event'
  }
}

export default function About() {
  return (
    <>
      <SectionBanner
        title="About"
        description="중앙 코딩 동아리 CoMit을 소개합니다!"
      />
      <div className="flex flex-col items-center pt-6 md:pt-12">
        <div className="grid grid-cols-1 items-center gap-20 sm:grid-cols-2 xl:grid-cols-3">
          <SectionCard {...sectionCardData.class} />
          <SectionCard {...sectionCardData.seminar} />
          <SectionCard {...sectionCardData.event} />
        </div>
        <div className="mb-24 mt-60 flex w-full flex-col items-center">
          <p className="mb-20 text-4xl font-semibold text-black">
            CoMit 임원진
          </p>
          <div className="grid grid-cols-1 gap-x-[5vw] gap-y-12 xl:grid-cols-2">
            {dummyPeopleData.map((person, index) => (
              <IntroduceMemeberCard key={index} {...person} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
