import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Suspense } from 'react'
import { BsChevronCompactDown } from 'react-icons/bs'
import { FaAngleRight } from 'react-icons/fa6'

import LoadingSpinner from '@/components/common/LoadingSpinner'
import { Motion } from '@/components/common/MotionWrapper'
import ExampleStudyList from '@/components/main/ExampleStudyList'
import { MainCarousel } from '@/components/main/MainCarousel'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/constants/routes'
import { fadeIn } from '@/lib/animations'
import mainPicture from '@/public/mainPicture.svg'

const mainIntroduceTextFirstLine: Array<string> = ['개발자', '를 꿈꾸는']
const mainIntroduceTextSecondLine: Array<string> = ['모든 ', '학생', '들을 ', '위해서']
const subIntroduceTextFirstLine: Array<string> = ['자유롭게 ', '지식을 ', '공유하고 ', '개발할 ', '수 ', '있는']
const subIntroduceTextSecondLine: Array<string> = ['성균관대학교 ', '중앙 ', '코딩 ', '동아리']
const aboutData: { description: string; number: number }[] = [
  {
    description: '누적 스터디 개설',
    number: 70
  },
  {
    description: '평균 신규 지원',
    number: 80
  },
  {
    description: '평균 스터디 개설',
    number: 10
  }
]

const Home = () => {
  const renderAnimatedText = (text: Array<string>) => {
    return text.map((item: string, index: number) => {
      if (item === '개발자' || item === '학생') {
        return (
          <Motion key={index} tag="span" animation={fadeIn(1, index / 5)} className="text-primary">
            {item}
          </Motion>
        )
      } else {
        return (
          <Motion key={index} tag="span" animation={fadeIn(1, index / 10)}>
            {item}
          </Motion>
        )
      }
    })
  }

  return (
    <div className="flex w-full flex-col items-center text-center">
      <div className="container">
        <div className="relative flex h-[90vh] items-start justify-center md:items-center">
          <div className="flex items-center justify-between max-lg:flex-col lg:flex-row-reverse">
            <Motion animation={fadeIn()} className="flex justify-center">
              <Image
                src={mainPicture}
                width={600}
                height={600}
                alt="mainPicture"
                className="h-[600px] w-[600px] max-xl:h-[400px] max-xl:w-[400px] max-sm:mb-6 max-sm:h-[76vw] max-sm:w-[90%]"
                priority
              />
            </Motion>
            <div className="flex flex-col gap-6 max-sm:items-center xl:gap-8">
              <span className="break-keep text-left text-[9vw] font-semibold leading-tight sm:text-[40px] lg:text-[44px] xl:text-[64px]">
                {renderAnimatedText(mainIntroduceTextFirstLine)}
                <br />
                {renderAnimatedText(mainIntroduceTextSecondLine)}
              </span>
              <span className="break-keep text-center text-[6vw] font-semibold sm:text-left sm:text-[24px]">
                <span className="leading-10 max-sm:hidden">{renderAnimatedText(subIntroduceTextFirstLine)}</span>
                <span className="sm:hidden" />
                <br className="max-sm:hidden" />
                {renderAnimatedText(subIntroduceTextSecondLine)}
              </span>
              <div className="w-full">
                <div className="flex items-center justify-between sm:justify-between lg:justify-normal lg:gap-16">
                  <p className="text-left text-4xl font-semibold leading-[70px] text-primary xl:text-[70px]">
                    {renderAnimatedText(['C', 'O', 'M', 'I', 'T'])}
                  </p>
                  {/* Todo: 동아리 신청 기간을 백엔드로 부터 받아, disabled 기간을 설정 */}
                  <Motion animation={fadeIn()}>
                    <Button
                      disabled
                      className="h-12 w-40 rounded-2xl border-none text-xl font-semibold lg:h-[60px] lg:w-[190px] lg:text-[24px]"
                    >
                      <Link href={ROUTES.SIGNUP.url}>신규 지원</Link>
                    </Button>
                  </Motion>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-4 flex w-full justify-center sm:bottom-0">
            <Motion
              animation={{
                initial: { opacity: 0 },
                animate: { opacity: [1, 0.6, 1] },
                transition: { duration: 2, repeat: Infinity }
              }}
            >
              <Motion
                animation={{
                  initial: { opacity: 1 },
                  whileInView: { opacity: 0 },
                  transition: { duration: 0.25 }
                }}
              >
                <BsChevronCompactDown size={84} />
              </Motion>
            </Motion>
          </div>
        </div>
        <div className="flex flex-col max-sm:-mt-16">
          <Motion
            animation={{
              initial: { opacity: 0, y: 100 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: {
                duration: 0.25
              }
            }}
          >
            <p className="mb-8 text-center text-5xl text-[70px] font-semibold max-xl:hidden lg:text-left">About</p>
          </Motion>
          <div className="flex justify-center gap-x-16 font-semibold max-lg:flex-col xl:justify-between">
            {aboutData.map((about, index) => (
              <Motion
                key={about.description}
                animation={{
                  initial: { opacity: 0, y: 100 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  transition: { duration: 1, ease: [0.6, -0.05, 0.01, 0.9], delay: index * 0.5 }
                }}
              >
                <p className="text-[40px]">{about.description}</p>
                <p className="text-left text-[90px] max-lg:mb-12 max-lg:text-center">{about.number}+</p>
              </Motion>
            ))}
          </div>
        </div>
        <div className="mt-48 flex justify-center xl:mt-72">
          <div className="w-full font-semibold">
            <p className="text-left text-[70px] max-xl:hidden">Study</p>
            <p className="items-start text-left text-[40px] max-xl:text-center">다뤄진 기술 스택</p>
            <MainCarousel />
          </div>
        </div>
        <div className="mt-[50px] flex justify-between xl:mt-32">
          <div className="flex w-full flex-col font-semibold max-xl:items-center">
            <div className="flex items-center justify-between">
              <p className="text-left text-[40px] max-xl:text-center">개설된 스터디</p>
              <Button
                variant="outline"
                className="h-9 w-28 rounded-md border-none text-base text-black max-xl:hidden"
                asChild
              >
                <Link href="/study">더보기</Link>
              </Button>
            </div>
            <Suspense fallback={<LoadingSpinner />}>
              <ExampleStudyList />
            </Suspense>
            <Button className="relative my-12 w-64 border-none py-6 text-lg font-semibold xl:hidden" asChild>
              <Link href="/study">
                스터디 더보기
                <FaAngleRight className="absolute right-12" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
