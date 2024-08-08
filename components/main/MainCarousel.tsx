'use client'

import AutoScroll from 'embla-carousel-auto-scroll'
import Image from 'next/image'
import { useRef } from 'react'

import { dummyStackUrl } from '@/lib/dummy'

import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel'

export const MainCarousel = () => {
  const plugin = useRef(AutoScroll({ playOnInit: true }))
  return (
    <div className="mt-8 flex h-[128px] w-full items-center">
      <Carousel
        className="pointer-events-none flex w-full items-center justify-between"
        opts={{
          align: 'start',
          loop: true
        }}
        plugins={[plugin.current]}
      >
        <CarouselContent>
          {dummyStackUrl.map((item, index) => {
            return (
              <CarouselItem key={index} className="basis-1/8 flex items-center">
                <div className="h-28 w-28 sm:h-32 sm:w-32">
                  <Image
                    width={128}
                    height={128}
                    src={item}
                    unoptimized
                    alt="stack"
                    className="h-full w-full object-cover"
                    key={index}
                  ></Image>
                </div>
              </CarouselItem>
            )
          })}
        </CarouselContent>
      </Carousel>
    </div>
  )
}
