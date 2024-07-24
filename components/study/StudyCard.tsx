import Image from 'next/image'

import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Study } from '@/types/Study'

const WeekDayAndDuration = ({
  day,
  startTime,
  endTime
}: {
  day: string
  startTime: string
  endTime: string
}) => {
  if (day && startTime && endTime) {
    return (
      <p className="text-center text-sm text-gray-500">
        {day} {startTime} ~ {endTime}
      </p>
    )
  } else if (day) {
    return (
      <div className="flex items-center gap-2 text-center text-sm text-gray-500">
        {day}요일 <span className="text-xs text-red-500">(시간 미정)</span>
      </div>
    )
  } else return
}

interface StudyCardProps {
  study: Study
}

export default function StudyCard({ study }: StudyCardProps) {
  const badges = [study.level, study.stack[0], study.campus]
  return (
    <Card className="relative flex w-44 transform cursor-pointer flex-col items-center justify-center overflow-hidden px-2 py-4 shadow-md transition-transform hover:scale-105 hover:shadow-2xl sm:w-60 sm:px-4 sm:py-8">
      {study.isRecruiting ? (
        <Badge className="absolute right-2 top-2 font-bold">모집 중</Badge>
      ) : (
        <Badge className="absolute right-2 top-2 bg-slate-400 font-normal">
          모집 마감
        </Badge>
      )}
      <div className="mb-8 mt-4 h-24 w-24 overflow-hidden sm:h-36 sm:w-36">
        <Image
          src={study.imageSrc}
          alt={study.title}
          width={144}
          height={144}
          className="h-full w-full object-cover"
          unoptimized
        />
      </div>
      <p className="text-center text-base font-bold sm:text-lg">
        {study.title}
      </p>
      <WeekDayAndDuration
        day={study.day}
        startTime={study.startTime}
        endTime={study.endTime}
      />
      <div className="mt-2 flex w-40 flex-wrap justify-around gap-y-2 sm:w-48">
        {badges.map((badge, index: number) => (
          <Badge key={index} variant="secondary">
            {badge}
          </Badge>
        ))}
      </div>
    </Card>
  )
}
