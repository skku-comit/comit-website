import SectionBanner from '@/components/common/SectionBanner'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import StudyCard from '@/components/study/StudyCard'

const studyDummyData = [
  {
    imageSrc: 'https://i.esdrop.com/d/f/rWQIyJ1wtg/Z2bQcFPLxZ.svg',
    title: '모바일 앱 프로젝트',
    description: '목 19:30 ~ 21:30',
    badges: ['초급', 'Flutter', '율전']
  },
  {
    imageSrc: 'https://i.esdrop.com/d/f/rWQIyJ1wtg/Z2bQcFPLxZ.svg',
    title: '모바일 앱 프로젝트',
    description: '목 19:30 ~ 21:30',
    badges: ['초급', 'Flutter', '율전']
  },
  {
    imageSrc: 'https://i.esdrop.com/d/f/rWQIyJ1wtg/Z2bQcFPLxZ.svg',
    title: '모바일 앱 프로젝트',
    description: '목 19:30 ~ 21:30',
    badges: ['초급', 'Flutter', '율전']
  },
  {
    imageSrc: 'https://i.esdrop.com/d/f/rWQIyJ1wtg/Z2bQcFPLxZ.svg',
    title: '모바일 앱 프로젝트',
    description: '목 19:30 ~ 21:30',
    badges: ['초급', 'Flutter', '율전']
  },
  {
    imageSrc: 'https://i.esdrop.com/d/f/rWQIyJ1wtg/Z2bQcFPLxZ.svg',
    title: '모바일 앱 프로젝트',
    description: '목 19:30 ~ 21:30',
    badges: ['초급', 'Flutter', '율전']
  },
  {
    imageSrc: 'https://i.esdrop.com/d/f/rWQIyJ1wtg/Z2bQcFPLxZ.svg',
    title: '모바일 앱 프로젝트',
    description: '목 19:30 ~ 21:30',
    badges: ['초급', 'Flutter', '율전']
  },
  {
    imageSrc: 'https://i.esdrop.com/d/f/rWQIyJ1wtg/Z2bQcFPLxZ.svg',
    title: '모바일 앱 프로젝트',
    description: '목 19:30 ~ 21:30',
    badges: ['초급', 'Flutter', '율전']
  },
  {
    imageSrc: 'https://i.esdrop.com/d/f/rWQIyJ1wtg/Z2bQcFPLxZ.svg',
    title: '모바일 앱 프로젝트',
    description: '목 19:30 ~ 21:30',
    badges: [
      '초급',
      'Flutter',
      '율전',
      'Firebase',
      '오프라인',
      '짱 긴 text 입니다'
    ]
  }
]
export default function Study() {
  return (
    <>
      <SectionBanner
        title="Study"
        description="CoMit의 다양한 스터디 분반을 확인해보세요!"
      />
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 mb-8">
        {studyDummyData.map((study, index) => (
          <StudyCard key={index} {...study} />
        ))}
      </div>
      <Button asChild>
        <Link href="study/open">스터디 개설</Link>
      </Button>
    </>
  )
}
