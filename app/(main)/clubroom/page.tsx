import ClburoomInfoCard from '@/components/clubroom/ClubroomInfoCard'
import SectionBanner from '@/components/common/SectionBanner'
import { Align } from '@/components/clubroom/ClubroomInfoCard'
import Image from 'next/image'
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

export default function Clubroom() {
  return (
    <>
      <SectionBanner
        title="Clubroom"
        description="CoMit의 동아리방을 소개합니다!"
      />
      <div className="flex items-center gap-12 flex-row-reverse space-x-reverse max-md:flex-col mb-12">
        <div className="flex justify-center max-md:w-[90%]">
          <Image
            src={clubroomImg}
            alt="comit-clubroom"
            height={440}
            className="rounded-xl object-contain"
          />
        </div>
        <div className="flex flex-col gap-8">
          <ClburoomInfoCard {...clubroomInfoCardData[0]} />
          <ClburoomInfoCard {...clubroomInfoCardData[1]} align={Align.RIGHT} />
          <ClburoomInfoCard {...clubroomInfoCardData[2]} />
        </div>
      </div>
    </>
  )
}
