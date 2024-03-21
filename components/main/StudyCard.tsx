'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

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
  showDialog: boolean
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
  showDialog
}: StudyCardProps) {
  const badges = [level, stack[0], campus]
  const router = useRouter()
  return (
    <Card
      className="flex w-44 transform cursor-pointer flex-col items-center justify-center overflow-hidden px-2 py-4 transition-opacity hover:opacity-90 sm:w-64 sm:px-4 sm:py-8"
      onClick={() => {
        if (!showDialog) {
          router.push('/study')
        }
      }}
    >
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
        <div className="flex items-center gap-2 text-center text-sm text-gray-500 sm:text-base">
          {day}요일 <span className="text-xs text-red-500">(시간 미정)</span>
        </div>
      ) : (
        <p className="text-center text-sm text-gray-500 sm:text-base">
          {day} {startTime} ~ {endTime}
        </p>
      )}
      <div className="mt-2 flex w-40 flex-wrap justify-around gap-2 sm:w-52">
        {badges.map((badge, index: number) => (
          <Badge
            key={index}
            variant="secondary"
            className="flex items-center justify-center px-2.5 sm:h-7 sm:px-3"
          >
            {badge}
          </Badge>
        ))}
      </div>
    </Card>
  )
}
