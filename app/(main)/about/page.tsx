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
      '외부 인사를 초청하거나 CoMit 선배님을 모시고 세미나를 진행합니다',
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
      <div className="w-[1280px]">
        <div className="flex items-center justify-between">
          <SectionCard {...sectionCardData.class} />
          <SectionCard {...sectionCardData.seminar} />
          <SectionCard {...sectionCardData.event} />
        </div>
        <div className="mb-[100px] mt-[200px] w-full">
          <p className="mb-8 text-4xl font-semibold text-black">임원진 소개</p>
          <div className="grid grid-cols-2 gap-4">
            {dummyPeopleData.map((person, index) => (
              <IntroduceMemeberCard key={index} {...person} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
