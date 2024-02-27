import mainPicture from '@/public/mainPicture.svg'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

import { SlArrowLeft } from 'react-icons/sl'
import { SlArrowRight } from 'react-icons/sl'

import {
  Carousel,
  CarouselItem,
  CarouselContent,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
const dummyStackUrl: string[] = [
  'https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg',
  'https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg',
  'https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg',
  'https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg',
  'https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg',
  'https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg',
  'https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg',
  'https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg',
  'https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg',
  'https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg',
  'https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg',
  'https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg'
]

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-black text-center text-white">
      <div className="w-full">
        <div className="mt-[12.3%] flex justify-center">
          <div className="mt-[3.5%]">
            <h1 className="text-left text-[70px] font-semibold">
              <span className="text-primary">개발자</span>를 꿈꾸는
            </h1>
            <h1 className="text-[70px] font-semibold">
              모든 <span className="text-primary">학생</span>들을 위하여
            </h1>
            <p className="text-left text-[24px] font-semibold">
              자유롭게 지식을 공유하고 개발할 수 있는
            </p>
            <p className="text-left text-[24px] font-semibold">
              성균관대하교 중앙 코딩 동아리
            </p>
            <div className="flex w-[70%] items-center justify-between">
              <p className="text-left text-[72px] font-extrabold text-primary">
                COMIT
              </p>
              <Button
                variant="secondary"
                className="h-[60px] w-[190px] rounded-2xl text-[24px] font-semibold"
              >
                신규 지원
              </Button>
            </div>
          </div>
          <div>
            <Image src={mainPicture} alt="mainPicture"></Image>
          </div>
        </div>
      </div>
      <div className="mt-[26.4%] flex justify-center">
        <div className="w-[60%]">
          <p className="text-left text-[70px] font-semibold">About</p>
          <div className="flex justify-between font-semibold">
            <div>
              <p className="text-[40px]">누적 스터디 개설</p>
              <p className="text-[90px]">50+</p>
            </div>
            <div>
              <p className="text-[40px]">평균 신규 지원</p>
              <p className="text-[90px]">120+</p>
            </div>
            <div>
              <p className="text-[40px]">평균 스터디 개설</p>
              <p className="text-[90px]">15+</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-[23%] flex justify-center">
        <div className="w-[65%] font-semibold">
          <p className="text-left text-[70px]">Study</p>
          <p className="mt-[78px] items-start text-left text-[40px]">
            다뤄진 기술 스택
          </p>
          <div className="flex h-[128px] w-full items-center">
            <Carousel
              className="flex w-full items-center justify-between"
              opts={{ align: 'start' }}
            >
              <CarouselPrevious />
              <CarouselContent>
                {dummyStackUrl.map((item, index) => {
                  return (
                    <CarouselItem key={index} className="basis-1/8">
                      <div>
                        <Image
                          width={128}
                          height={128}
                          src={item}
                          unoptimized
                          alt="stack"
                          key={index}
                        ></Image>
                      </div>
                    </CarouselItem>
                  )
                })}
              </CarouselContent>
              <CarouselNext />
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  )
}
