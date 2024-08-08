'use client'

import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import React, { ReactNode, useCallback, useEffect, useState } from 'react'

interface PropType {
  options?: {
    align?: 'start' | 'center' | 'end'
    loop?: boolean
    skipSnaps?: boolean
    inViewThreshold?: number
  }
  slides: ReactNode[]
}

export const ClubroomCarousel = ({ options, slides }: PropType) => {
  const [emblaRef, embla] = useEmblaCarousel(options, [
    Autoplay({ playOnInit: true, delay: 3600, stopOnInteraction: false })
  ])
  const [selectedIndex, setSelectedindex] = useState(0)

  const onSelect = useCallback(() => {
    if (!embla) return
    setSelectedindex(embla.selectedScrollSnap())
  }, [embla, setSelectedindex])

  useEffect(() => {
    if (!embla) return
    onSelect()
    embla.on('select', onSelect)
  }, [embla, onSelect])

  return (
    <div className="relative w-full cursor-pointer rounded-md">
      <div className="relative overflow-hidden rounded-md" ref={emblaRef}>
        <div className="flex h-[270px] flex-none flex-col flex-wrap md:h-[300px] lg:h-[360px]">
          {slides.map((slide, index) => (
            <div className="relative mx-1 h-[270px] w-full md:h-[300px] lg:h-[360px]" key={index}>
              {slide}
            </div>
          ))}
        </div>
        <div className="absolute bottom-2 right-2 rounded-full bg-[#0e0e0e72] md:bottom-4 md:right-4">
          <div className="flex h-6 w-16 items-center justify-evenly text-sm font-semibold md:h-8 md:w-20 md:text-base">
            <span className="text-white">{selectedIndex + 1}</span>
            <div className="h-[4px] w-[4px] rounded-full bg-[#ffffffb2] md:h-[6px] md:w-[6px]" />
            <span className="text-[#ffffffb2]">{slides.length}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClubroomCarousel
