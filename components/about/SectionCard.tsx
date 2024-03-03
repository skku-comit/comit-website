'use client'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import Image from 'next/image'
import studyClassImg from '@/public/about-image/studyClass.svg'
import eventImg from '@/public/about-image/event.svg'
import seminarImg from '@/public/about-image/seminar.svg'

type SectionCardProps = {
  title: string
  description: string
  image: string
}
export default function SectionCard({
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
      className="relative h-[300px] w-[300px] rounded-3xl shadow-md sm:h-[360px] sm:w-[360px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={cn(
          'flex h-[230px] w-full items-center justify-center rounded-t-3xl bg-opacity-40 sm:h-[280px]',
          image === 'studyClass'
            ? 'bg-[#FFE873]'
            : image === 'event'
              ? 'bg-[#6DD7B9]'
              : 'bg-[#C875FF]'
        )}
      >
        <div className="flex h-[240px] w-[240px] items-center justify-center sm:h-[300px] sm:w-[300px]">
          {selectImg(image)}
        </div>
      </div>
      <div className="flex h-[70px] items-center justify-center sm:h-[80px]">
        <p className="text-[24px] font-semibold">{title}</p>
      </div>
      {isHovered && (
        <div
          className="absolute left-0 top-0 h-[300px] w-[300px] rounded-3xl bg-black bg-opacity-70 text-white transition ease-in-out sm:h-[360px] sm:w-[360px]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="flex h-[30%] w-full items-center justify-center">
            <p className="text-3xl font-semibold sm:text-4xl ">{title}</p>
          </div>
          <div className="flex w-full items-center justify-center text-justify">
            <p className="w-[240px] text-xl font-medium sm:w-[290px] sm:text-2xl">
              {description}
            </p>
          </div>
        </div>
      )}
    </Card>
  )
}
