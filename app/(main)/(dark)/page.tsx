'use client'

import { useRef } from 'react'
import mainPicture from '@/public/mainPicture.svg'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import StudyCard from '@/components/main/StudyCard'
import Autoplay from 'embla-carousel-autoplay'
import { dummyStackUrl, studyDummyData } from '@/lib/dummy'

import {
  Carousel,
  CarouselItem,
  CarouselContent,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import { FaAngleRight } from 'react-icons/fa6'

export default function Home() {
  const plugin = useRef(Autoplay({ delay: 2500 }))
  return (
    <div className="flex min-h-screen w-[100%] flex-col items-center bg-black text-center text-white">
      <div className="w-[100%] lg:w-[1280px]">
        <div className="flex items-center justify-between max-xl:flex-col xl:mt-36 xl:flex-row-reverse">
          <Image
            src={mainPicture}
            width={600}
            height={600}
            alt="mainPicture"
            className="h-[600px] w-[600px] max-xl:h-[400px] max-xl:w-[400px]"
          ></Image>
          <div className="flex flex-col gap-6 xl:gap-8">
            <p className="text-left text-[40px] font-semibold leading-tight xl:text-[64px]">
              <span className="text-primary">개발자</span>를 꿈꾸는
              <br />
              모든 <span className="text-primary">학생</span>들을 위하여
            </p>
            <p className="text-left text-[24px] font-semibold max-xl:text-xl">
              자유롭게 지식을 공유하고 개발할 수 있는
              <br />
              성균관대학교 중앙 코딩 동아리
            </p>
            <div className="flex items-center max-xl:justify-between xl:gap-16">
              <p className="text-left text-4xl font-extrabold leading-[70px] text-primary xl:text-[70px]">
                COMIT
              </p>
              <Button
                variant="secondary"
                className="h-12 w-40 rounded-2xl text-xl font-semibold xl:h-[60px] xl:w-[190px] xl:text-[24px]"
              >
                신규 지원
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-28 flex flex-col xl:mt-[330px]">
          <p className="mb-8 text-left text-5xl text-[70px] font-semibold max-xl:hidden">
            About
          </p>
          <div className="flex w-full justify-between font-semibold max-xl:flex-col">
            <div>
              <p className="text-[40px]">누적 스터디 개설</p>
              <p className="text-left text-[90px] max-xl:mb-12 max-xl:text-center">
                50+
              </p>
            </div>
            <div>
              <p className="text-[40px]">평균 신규 지원</p>
              <p className="text-left text-[90px] max-xl:mb-12 max-xl:text-center">
                120+
              </p>
            </div>
            <div>
              <p className="text-[40px]">평균 스터디 개설</p>
              <p className="text-left text-[90px] max-xl:text-center">15+</p>
            </div>
          </div>
        </div>
        <div className="mt-24 flex justify-center xl:mt-[240px]">
          <div className="w-full font-semibold">
            <p className="text-left text-[70px] max-xl:hidden">Study</p>
            <p className="items-start text-left text-[40px] max-xl:text-center">
              다뤄진 기술 스택
            </p>
            <div className="mt-8 flex h-[128px] w-full items-center">
              <Carousel
                className="flex w-full items-center justify-between"
                opts={{ align: 'start' }}
                plugins={[plugin.current]}
              >
                <CarouselPrevious />
                <CarouselContent>
                  {dummyStackUrl.map((item, index) => {
                    return (
                      <CarouselItem
                        key={index}
                        className="basis-1/8 flex items-center"
                      >
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
        <div className="mt-[50px] flex justify-between">
          <div className="flex w-full flex-col font-semibold max-xl:items-center">
            <div className="flex items-center justify-between">
              <p className="text-left text-[40px] max-xl:text-center">
                개설된 스터디
              </p>
              <Button
                variant="outline"
                className="h-[30px] w-[100px] rounded-2xl border-none text-black max-xl:hidden"
                asChild
              >
                <Link href="/study">더보기</Link>
              </Button>
            </div>
            <div className="mt-8 grid xl:grid-cols-4 gap-4 sm:gap-12 grid-cols-2 xl:mb-32">
              {studyDummyData.slice(0, 4).map((item, index) => {
                return <StudyCard {...item} key={index} />
              })}
            </div>
            <Button
              variant="outline"
              className="relative my-12 w-64 border-none py-6 text-lg font-semibold text-gray-600 xl:hidden"
              asChild
            >
              <Link href="/study">
                스터디 더보기
                <FaAngleRight className="absolute right-12 text-gray-600" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
