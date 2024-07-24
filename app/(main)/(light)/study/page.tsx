import Link from 'next/link'

import SectionBanner from '@/components/common/SectionBanner'
import StudyList from '@/components/study/StudyList'
import { Button } from '@/components/ui/button'

export default function Study() {
  return (
    <>
      <SectionBanner
        title="Study"
        description="CoMit의 스터디 분반을 확인해보세요!"
      />
      {/* TODO: Study API 연결되면 hidden 해제하기 */}
      <Link href="study/open">
        <Button
          asChild
          className="mb-12 hidden w-60 py-6 text-lg font-semibold"
        >
          2024-1 스터디 개설 신청
        </Button>
      </Link>
      <StudyList />
    </>
  )
}
