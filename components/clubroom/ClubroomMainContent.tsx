import Image from 'next/image'

import { ClubroomCarousel } from '@/components/clubroom/ClubroomCarousel'
import ClburoomInfoCard from '@/components/clubroom/ClubroomInfoCard'
import { Align } from '@/components/clubroom/ClubroomInfoCard'
import { fadeInLeft, fadeInRight } from '@/lib/animations'
import clubroomImage1 from '@/public/clubroom-image/clubroom1.webp'
import clubroomImage2 from '@/public/clubroom-image/clubroom2.webp'
import clubroomImage3 from '@/public/clubroom-image/clubroom3.webp'
import clubroomImage4 from '@/public/clubroom-image/clubroom4.webp'
import clubroomImage5 from '@/public/clubroom-image/clubroom5.webp'

import { Motion } from '../common/MotionWrapper'

const clubroomInfoCardData = [
  {
    title: '스터디 진행',
    description: '스터디를 위한 번거로운 장소 대여 대신에 간편하게 동아리방을 예약해서 사용하세요!'
  },
  {
    title: '간식 및 도서 제공',
    description: '전공, 교양, 프로그래밍 서적 다수 보유 중입니다. 마음껏 먹을 수 있는 간식도 있어요!'
  },
  {
    title: '모두의 휴식 공간',
    description: '학생회관 3층 03312에 위치한 쾌적하고 넓은 동아리방입니다. 자주 이용해주세요!'
  }
]

const clubroomCarouselData = [clubroomImage1, clubroomImage2, clubroomImage3, clubroomImage4, clubroomImage5]

export default function ClubroomMainContent() {
  return (
    <div className="mb-12 flex items-center justify-center gap-8 space-x-reverse max-md:flex-col xl:gap-12">
      <div className="flex flex-col gap-8">
        <Motion animation={fadeInLeft()}>
          <ClburoomInfoCard {...clubroomInfoCardData[0]} />
        </Motion>
        <Motion animation={fadeInRight()}>
          <ClburoomInfoCard {...clubroomInfoCardData[1]} align={Align.RIGHT} />
        </Motion>
        <Motion animation={fadeInLeft()}>
          <ClburoomInfoCard {...clubroomInfoCardData[2]} />
        </Motion>
      </div>

      <Motion
        animation={fadeInLeft()}
        className="h-[270px] w-[360px] md:h-[300px] md:w-[400px] lg:h-[360px] lg:w-[480px]"
      >
        <ClubroomCarousel
          slides={clubroomCarouselData.map((image, index) => {
            return <Image key={index} src={image} alt="clubroom" className="h-full w-full object-cover" />
          })}
          options={{
            align: 'start',
            loop: true,
            skipSnaps: false,
            inViewThreshold: 0.7
          }}
        />
      </Motion>
    </div>
  )
}
