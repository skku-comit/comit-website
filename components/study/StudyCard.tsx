import { Card, CardDescription, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'

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
    <Card className="flex w-60 transform cursor-pointer flex-col items-center justify-center overflow-hidden px-4 py-8 shadow-md transition-transform hover:scale-105  hover:shadow-2xl">
      <Image
        src={imageSrc}
        alt={title}
        width={144}
        height={144}
        className="mb-8 mt-4"
        unoptimized
      ></Image>
      <CardTitle className="text-center text-lg">{title}</CardTitle>
      <CardDescription className="text-center">
        {day} {startTime} ~ {endTime}
      </CardDescription>
      <div className="mt-2 flex w-48 flex-wrap justify-around gap-2">
        {badges.map((badge, index: number) => (
          <Badge key={index} variant="secondary">
            {badge}
          </Badge>
        ))}
      </div>
    </Card>
  )
}
