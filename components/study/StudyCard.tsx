import Image from 'next/image'

import { Badge } from '@/components/ui/badge'
import { Card, CardDescription, CardTitle } from '@/components/ui/card'

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
    <Card className="flex w-44 transform cursor-pointer flex-col items-center justify-center overflow-hidden px-2 py-4 shadow-md transition-transform hover:scale-105 hover:shadow-2xl sm:w-60 sm:px-4 sm:py-8">
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
      <CardTitle className="text-center text-base sm:text-lg">
        {title}
      </CardTitle>
      <CardDescription className="text-center">
        {day} {startTime} ~ {endTime}
      </CardDescription>
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
