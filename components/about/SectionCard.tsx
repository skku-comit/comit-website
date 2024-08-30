'use client'
import Image from 'next/image'
import { useState } from 'react'

import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

export interface SectionCardProps {
  id: number
  title: string
  description: string
  image: string
  backgroundColor?: string
}

export default function SectionCard({ id, title, description, image, backgroundColor }: SectionCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Card
      className="relative h-[300px] w-[300px] rounded-3xl shadow-md md:h-[360px] md:w-[360px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={cn(
          'flex h-[230px] w-full items-center justify-center rounded-t-3xl bg-opacity-40 md:h-[280px]',
          backgroundColor
        )}
      >
        <div className="flex h-[240px] w-[240px] items-center justify-center md:h-[300px] md:w-[300px]">
          <Image src={image} alt={title} width={300} />
        </div>
      </div>
      <div className="flex h-[70px] items-center justify-center md:h-[80px]">
        <p className="text-[24px] font-semibold">{title}</p>
      </div>
      {isHovered && (
        <div
          className={cn(
            'duration-600 absolute left-0 top-0 h-[300px] w-[300px] rounded-3xl text-transparent transition ease-linear hover:bg-black/70 hover:text-white md:h-[360px] md:w-[360px]'
          )}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="flex h-[30%] w-full items-center justify-center">
            <p className="text-3xl font-semibold md:text-4xl ">{title}</p>
          </div>
          <div className="flex w-full items-center justify-center text-justify">
            <p className="w-[240px] text-xl font-medium md:w-[290px] md:text-2xl">{description}</p>
          </div>
        </div>
      )}
    </Card>
  )
}
