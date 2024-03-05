'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'

import { ClubroomCarousel } from '@/components/clubroom/ClubroomCarousel'
import ClburoomInfoCard from '@/components/clubroom/ClubroomInfoCard'
import { Align } from '@/components/clubroom/ClubroomInfoCard'
import SectionBanner from '@/components/common/SectionBanner'
import clubroomImg from '@/public/comit-clubroom.jpg'

const clubroomInfoCardData = [
  {
    title: '스터디 진행',
    description:
      '스터디를 위한 번거로운 장소 대여 대신에 간편하게 동아리방을 예약해서 사용하세요!'
  },
  {
    title: '간식 및 도서 제공',
    description:
      '대충 트렌드에 맞는 개발 서적과 존맛탱구리 간식을 제공한다는 글'
  },
  {
    title: '모두의 휴식 공간',
    description:
      '바쁜 일상 속 한 줄기 빛 같은 동방의 소파.. 모두 함께해요~~ 뭐라 쓰면 좋지!'
  }
]

const clubroomCarouselData = Array.from({ length: 6 }, (_, i) => i + 1)
export default function Clubroom() {
  const [activeIndex, setActiveIndex] = useState<number>(0)

  return (
    <>
      <SectionBanner
        title="Clubroom"
        description="CoMit의 동아리방을 소개합니다!"
      />
      <div className="mb-12 flex flex-row-reverse items-center justify-center gap-8 space-x-reverse max-md:flex-col xl:gap-12">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="h-[270px] w-[360px] md:h-[300px] md:w-[400px] lg:h-[360px] lg:w-[480px]"
        >
          <ClubroomCarousel
            slides={clubroomCarouselData.map((item) => {
              return (
                <Image
                  key={item}
                  src={clubroomImg}
                  alt="clubroom"
                  className="h-full w-full object-cover"
                  objectFit="cover"
                />
              )
            })}
            options={{
              align: 'start',
              loop: true,
              skipSnaps: false,
              inViewThreshold: 0.7
            }}
          />
        </motion.div>
        <div className="flex flex-col gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ClburoomInfoCard {...clubroomInfoCardData[0]} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ClburoomInfoCard
              {...clubroomInfoCardData[1]}
              align={Align.RIGHT}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ClburoomInfoCard {...clubroomInfoCardData[2]} />
          </motion.div>
        </div>
      </div>
    </>
  )
}
