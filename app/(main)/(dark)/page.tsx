'use client'

import AutoScroll from 'embla-carousel-auto-scroll'
import { motion, useAnimation } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import { BsChevronCompactDown } from 'react-icons/bs'
import { FaAngleRight } from 'react-icons/fa6'
import { useInView } from 'react-intersection-observer'

import StudyCard from '@/components/main/StudyCard'
import { Button } from '@/components/ui/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem
} from '@/components/ui/carousel'
import { dummyStackUrl, studyDummyData } from '@/lib/dummy'
import mainPicture from '@/public/mainPicture.svg'

export default function Home() {
  const controls = useAnimation()
  const [ref, inView] = useInView({ triggerOnce: true })
  const plugin = useRef(AutoScroll({ playOnInit: true }))
  const mainIntroduceTextFirstLine = ['개발자', '를 꿈꾸는']
  const mainIntroduceTextSecondLine = ['모든 ', '학생', '들을 ', '위해서']
  const subIntroduceTextFirstLine = [
    '자유롭게 ',
    '지식을 ',
    '공유하고 ',
    '개발할 ',
    '수 ',
    '있는'
  ]
  const subIntroduceTextSecondLine = [
    '성균관대학교 ',
    '중앙 ',
    '코딩 ',
    '동아리'
  ]

  const renderAnimatedText = (text: Array<string>) => {
    return text.map((item: string, index: number) => {
      if (item === '개발자' || item === '학생') {
        return (
          <motion.span
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: index / 5 }}
            className="text-primary"
          >
            {item}
          </motion.span>
        )
      } else {
        return (
          <motion.span
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: index / 10 }}
          >
            {item}
          </motion.span>
        )
      }
    })
  }
  return (
    <div className="flex min-h-screen w-[100%] flex-col items-center bg-black text-center text-white">
      <div className="w-[92%] lg:w-[1280px]">
        <div className="relative flex h-[90vh] items-start justify-center md:items-center">
          <div className="flex items-center justify-between max-lg:flex-col lg:flex-row-reverse">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="flex justify-center"
            >
              <Image
                src={mainPicture}
                width={600}
                height={600}
                alt="mainPicture"
                className="h-[600px] w-[600px] max-xl:h-[400px] max-xl:w-[400px] max-sm:mb-6 max-sm:h-[76vw] max-sm:w-[90%]"
                priority
              />
            </motion.div>
            <div className="flex flex-col gap-6 max-sm:items-center xl:gap-8">
              <span className="break-keep text-left text-[9vw] font-semibold leading-tight sm:text-[40px] lg:text-[44px] xl:text-[64px]">
                {renderAnimatedText(mainIntroduceTextFirstLine)}
                <br />
                {renderAnimatedText(mainIntroduceTextSecondLine)}
              </span>
              <span className="break-keep text-center text-[6vw] font-semibold sm:text-left sm:text-[24px]">
                <span className="leading-10 max-sm:hidden">
                  {renderAnimatedText(subIntroduceTextFirstLine)}
                </span>
                <span className="sm:hidden"> </span>
                <br className="max-sm:hidden" />
                {renderAnimatedText(subIntroduceTextSecondLine)}
              </span>
              <div className="w-full">
                <div className="flex items-center justify-between sm:justify-between lg:justify-normal lg:gap-16">
                  <p className="text-left text-4xl font-extrabold leading-[70px] text-primary xl:text-[70px]">
                    {renderAnimatedText(['C', 'O', 'M', 'I', 'T'])}
                  </p>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                  >
                    <Button
                      variant="outline"
                      className="h-12 w-40 rounded-2xl border-none text-xl font-semibold text-black max-sm:h-10 max-sm:w-32 max-sm:text-lg xl:h-[60px] xl:w-[190px] xl:text-[24px]"
                      asChild
                    >
                      <Link href="https://docs.google.com/forms/d/1f7CI81EpjJ87A3lyOszSsZbcGz-zu9CAHLnubHdD-zA/viewform?edit_requested=true">
                        신규 지원
                      </Link>
                    </Button>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-4 flex w-full justify-center sm:bottom-0">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [1, 0.6, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: inView ? 0 : 1 }}
                transition={{ duration: 0.25 }}
              >
                <BsChevronCompactDown size={84} className="text-white" />
              </motion.div>
            </motion.div>
          </div>
        </div>
        <div className="flex flex-col max-sm:-mt-16">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: inView ? 1 : 0 }}
            transition={{
              duration: 0.25
            }}
          >
            <p className="mb-8 text-center text-5xl text-[70px] font-semibold max-xl:hidden lg:text-left">
              About
            </p>
          </motion.div>
          <div className="flex justify-center gap-x-16 font-semibold max-lg:flex-col xl:justify-between">
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: inView ? 1 : 0, y: inView ? 100 : 0 }}
              transition={{ duration: 1, ease: [0.6, -0.05, 0.01, 0.9] }}
            >
              <p className="text-[40px]">누적 스터디 개설</p>
              <p className="text-left text-[90px] max-lg:mb-12 max-lg:text-center">
                50+
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: inView ? 1 : 0, y: inView ? 100 : 0 }}
              transition={{
                duration: 1,
                ease: [0.6, -0.05, 0.01, 0.9],
                delay: 0.5
              }}
            >
              <p className="text-[40px]">평균 신규 지원</p>
              <p className="text-left text-[90px] max-lg:mb-12 max-lg:text-center">
                150+
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: inView ? 1 : 0, y: inView ? 100 : 0 }}
              transition={{
                duration: 1,
                ease: [0.6, -0.05, 0.01, 0.9],
                delay: 1.0
              }}
            >
              <p className="text-[40px]">평균 스터디 개설</p>
              <p className="text-left text-[90px] max-lg:text-center">15+</p>
            </motion.div>
          </div>
        </div>
        <div className="mt-48 flex justify-center xl:mt-72">
          <div className="w-full font-semibold">
            <p className="text-left text-[70px] max-xl:hidden">Study</p>
            <p className="items-start text-left text-[40px] max-xl:text-center">
              다뤄진 기술 스택
            </p>
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
                      <CarouselItem
                        key={index}
                        className="basis-1/8 flex items-center"
                      >
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
          </div>
        </div>
        <div className="mt-[50px] flex justify-between xl:mt-32">
          <div className="flex w-full flex-col font-semibold max-xl:items-center">
            <div className="flex items-center justify-between">
              <p className="text-left text-[40px] max-xl:text-center">
                개설된 스터디
              </p>
              <Button
                variant="outline"
                className="h-9 w-28 rounded-xl border-none text-base text-black max-xl:hidden"
                asChild
              >
                <Link href="/study">더보기</Link>
              </Button>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-12 xl:mb-32 xl:grid-cols-4">
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
