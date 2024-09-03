import Image from 'next/image'

import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Study } from '@/types'

const RecruitingStatus = ({ isRecruiting }: { isRecruiting: boolean }) => {
  return isRecruiting ? (
    <Badge className="absolute right-2 top-2 font-bold">모집 중</Badge>
  ) : (
    <Badge className="absolute right-2 top-2 bg-slate-400 font-normal">모집 마감</Badge>
  )
}

const WeekDayAndDuration = ({
  day,
  startTime,
  endTime
}: {
  day: string | null
  startTime: string | null
  endTime: string | null
}) => {
  if (day && startTime && endTime) {
    return (
      <p className="text-center text-sm text-gray-500">
        {day} {startTime.substring(0, 5)} ~ {endTime.substring(0, 5)}
      </p>
    )
  } else if (day) {
    return (
      <div className="flex items-center gap-2 text-center text-sm text-gray-500">
        {day}요일 <span className="text-xs text-red-500">(시간 미정)</span>
      </div>
    )
  } else return <div>&nbsp;</div>
}

const BadgeList = ({ badges }: { badges: string[] }) => {
  return (
    <div className="mt-2 flex w-40 justify-center gap-x-2 sm:w-48">
      {badges.map((badge, index: number) => (
        <Badge key={index} variant="secondary">
          {badge}
        </Badge>
      ))}
    </div>
  )
}

export interface StudyCardProps {
  study: Study
  imageSize?: number
  showStatus?: boolean
  imageWrapperClassName?: string
}

export default function StudyCard({ study, imageSize, showStatus, imageWrapperClassName }: StudyCardProps) {
  // Set default for parameters
  imageSize = imageSize ?? 144
  showStatus = showStatus ?? true
  imageWrapperClassName = imageWrapperClassName ?? 'mb-8 mt-4 h-24 w-24 overflow-hidden sm:h-36 sm:w-36'

  const badges = study.stacks.length > 0 ? [study.level, study.stacks[0], study.campus] : [study.level, study.campus]

  return (
    <Card className="relative flex w-44 transform cursor-pointer flex-col items-center justify-center overflow-hidden px-2 py-4 shadow-md transition-transform hover:scale-105 hover:shadow-2xl sm:w-60 sm:px-4 sm:py-8">
      {showStatus && <RecruitingStatus isRecruiting={study.isRecruiting} />}

      <div className={imageWrapperClassName}>
        <Image
          src={study.imageSrc ?? '/empty-300x240.jpg'}
          alt={study.title}
          width={imageSize}
          height={imageSize}
          className="h-full w-full object-cover"
          unoptimized
        />
      </div>

      <p className="text-center text-base font-bold sm:text-lg">{study.title}</p>

      <WeekDayAndDuration day={study.day} startTime={study.startTime} endTime={study.endTime} />

      <BadgeList badges={badges} />
    </Card>
  )
}
