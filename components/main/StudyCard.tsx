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
}

export default function StudyCard({
  imageSrc,
  title,
  day,
  startTime,
  endTime,
  campus,
  stack,
  level
}: StudyCardProps) {
  const badges = [level, stack[0], campus]
  return (
    <Card className="flex w-44 transform flex-col items-center justify-center overflow-hidden px-2 py-4 sm:w-64 sm:px-4 sm:py-8">
      <div className="mb-8 mt-4 h-24 w-24 overflow-hidden sm:h-44 sm:w-44">
        <Image
          src={imageSrc}
          alt={title}
          width={176}
          height={176}
          className="h-full w-full object-cover"
          unoptimized
        ></Image>
      </div>
      <p className="text-center text-base font-bold sm:text-lg">{title}</p>
      {day === '' ? null : startTime === '' ? (
        <p className="text-center text-base text-gray-500">
          {day}요일 <span className="text-red-500">(시간 미정)</span>
        </p>
      ) : (
        <p className="text-center text-base text-gray-500">
          {day} {startTime} ~ {endTime}
        </p>
      )}
      <div className="mt-2 flex w-40 flex-wrap justify-around gap-2 sm:w-52">
        {badges.map((badge, index: number) => (
          <Badge
            key={index}
            variant="secondary"
            className="flex items-center justify-center px-3 sm:h-7"
          >
            {badge}
          </Badge>
        ))}
      </div>
    </Card>
  )
}
