import SectionBanner from '@/components/common/SectionBanner'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import StudyCard from '@/components/study/StudyCard'
import { studyDummyData } from '@/lib/dummy'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { IoPersonSharp } from 'react-icons/io5'
import { FaSchoolFlag } from 'react-icons/fa6'
import { RiStackOverflowLine } from 'react-icons/ri'
import { MdOutlineSignalCellularAlt } from 'react-icons/md'

export default function Study() {
  return (
    <>
      <SectionBanner
        title="Study"
        description="CoMit의 스터디 분반을 확인해보세요!"
      />
      <div className="max-sm:px-2 grid gap-6 sm:gap-x-16 sm:gap-y-12 grid-cols-2 lg:grid-cols-4">
        {studyDummyData.map((study, index) => (
          <Dialog key={index}>
            <DialogTrigger asChild>
              <StudyCard {...study} />
            </DialogTrigger>
            <DialogContent className="p-8 sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="text-2xl">{study.title}</DialogTitle>
                <DialogDescription className="text-lg">
                  {study.day} {study.startTime} ~ {study.endTime}
                </DialogDescription>
              </DialogHeader>
              <div className="leading-snug">
                <div className="flex gap-6">
                  <div className="flex items-center gap-2">
                    <IoPersonSharp />
                    {study.mentor}
                  </div>
                  <div className="flex items-center gap-2">
                    <MdOutlineSignalCellularAlt />
                    {study.level}
                  </div>
                  <div className="flex items-center gap-2">
                    <FaSchoolFlag />
                    {study.campus}
                  </div>
                </div>
                <div className="mb-4 flex items-center gap-2">
                  <RiStackOverflowLine />
                  {study.stack.join(', ')}
                </div>
                <pre style={{ fontFamily: 'Inter, sans-serif' }}>
                  {study.description}
                </pre>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>

      <Button asChild className="my-12 w-60 py-6 text-lg font-semibold">
        <Link href="study/open">스터디 개설하기</Link>
      </Button>
    </>
  )
}
