'use client'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import Image from 'next/image'
import studyClassImg from '@/public/about-image/studyClass.svg'
import eventImg from '@/public/about-image/event.svg'
import seminarImg from '@/public/about-image/seminar.svg'

type SectionCardProps = {
  bgColor?: string
  bgColorCode?: string
  title: string
  description: string
  image: string
}
export default function SectionCard({
  bgColor,
  title,
  description,
  image
}: SectionCardProps) {
  const selectImg = (image: string) => {
    switch (image) {
      case 'studyClass':
        return (
          <Image src={studyClassImg} alt={title} width={300} height={300} />
        )
      case 'event':
        return <Image src={eventImg} alt={title} width={300} height={300} />
      case 'seminar':
        return <Image src={seminarImg} alt={title} width={300} height={300} />
    }
  }
  const [isHovered, setIsHovered] = useState(false)
  return (
    <Card
      className="relative h-[360px] w-[360px] rounded-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent
        className={cn(
          'flex h-[300px] w-full items-center rounded-t-xl bg-opacity-40',
          image === 'studyClass'
            ? 'bg-[#FFE873]'
            : image === 'event'
              ? 'bg-[#6DD7B9]'
              : 'bg-[#C875FF]'
        )}
      >
        {selectImg(image)}
      </CardContent>
      <div className="flex h-[60px] items-center justify-center">
        <p className="text-[24px] font-semibold">{title}</p>
      </div>
      {isHovered && (
        <div
          className="absolute left-0 top-0 h-[360px] w-[360px] rounded-xl bg-[#000000] bg-opacity-70 text-white"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="flex h-[30%] w-full items-center justify-center">
            <p className="text-[36px] font-semibold">{title}</p>
          </div>
          <div className="flex w-full items-center justify-center">
            <p className="w-[290px] text-[25px] font-medium">{description}</p>
          </div>
        </div>
      )}
    </Card>
  )
}
