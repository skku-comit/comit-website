import Image from 'next/image'

import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'

interface StudyCardProps {
  imageSrc: string
  title: string
  day: string
  startTime: string
  endTime: string
  campus: string
  stack: string[]
  level: string
  isRecruiting?: boolean
}

export default function StudyCard({
  imageSrc,
  title,
  day,
  startTime,
  endTime,
  campus,
  stack,
  level,
  isRecruiting
}: StudyCardProps) {
  const badges = [level, stack[0], campus]
  return (
    <Card className="relative flex w-44 transform cursor-pointer flex-col items-center justify-center overflow-hidden px-2 py-4 shadow-md transition-transform hover:scale-105 hover:shadow-2xl sm:w-60 sm:px-4 sm:py-8">
      {isRecruiting ? (
        <Badge className="absolute right-2 top-2 font-bold">모집 중</Badge>
      ) : (
        <Badge className="absolute right-2 top-2 bg-slate-400 font-normal">
          모집 마감
        </Badge>
      )}
      <div className="mb-8 mt-4 h-24 w-24 overflow-hidden sm:h-36 sm:w-36">
        <Image
          src={imageSrc}
          alt={title}
          width={144}
          height={144}
          className="h-full w-full object-cover"
          unoptimized
        ></Image>
      </div>
      <p className="text-center text-base font-bold sm:text-lg">{title}</p>
      {day === '' ? null : startTime === '' ? (
        <div className="flex items-center gap-2 text-center text-sm text-gray-500">
          {day}요일 <span className="text-xs text-red-500">(시간 미정)</span>
        </div>
      ) : (
        <p className="text-center text-sm text-gray-500">
          {day} {startTime} ~ {endTime}
        </p>
      )}
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
