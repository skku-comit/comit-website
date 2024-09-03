'use client'

import Link from 'next/link'
// import { IoPersonOutline } from 'react-icons/io5'

interface StudyData {
  imageSrc: string
  title: string
  mentor: string
  day: string
  startTime: string
  endTime: string
  level: string
  stack: string[]
  campus: string
  description: string
  isRecruiting: boolean
  position: string
}

export default function MyStudy() {
  const UserStudyList: StudyData[] = [
    {
      imageSrc: 'https://p92.hu/binaries/content/gallery/p92website/technologies/htmlcssjs-overview.png',
      title: '웹 개발 초급',
      mentor: 'Udemy 공통',
      day: '수',
      startTime: '19시',
      endTime: '21시',
      level: '초급',
      stack: ['HTML', 'CSS', 'JavaScript'],
      campus: '공통',
      description:
        'Udemy의 Web 부트캠프 강의를 기반으로 초급 html/css부터 javascript 문법 공부를 통해 자신만의 랜딩 페이지를 만드는 것이 목표입니다. 웹개발에 관심이 있으며 처음 접해보는 분들에게 권장됩니다.',
      isRecruiting: true,
      position: '스터디장'
    },
    {
      imageSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg',
      title: 'C언어 초급',
      mentor: 'Udemy 공통',
      day: '요일 미정',
      startTime: '',
      endTime: '',
      level: '초급',
      stack: ['C'],
      campus: '공통',
      description:
        'Udemy의 c언어 부트캠프 강의를 기반으로 개발환경 세팅과 c언어의 초급 문법부터 공부하여 학기말에 간단한 자유 프로젝트를 제작하는 것이 목표입니다. 프로그래밍이나 c에 대해 지식이 없는 분들에기 권장드립니다.',
      isRecruiting: true,
      position: '부원'
    },
    {
      imageSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg',
      title: '백엔드 node.js',
      mentor: '박지은',
      day: '금',
      startTime: '19:30',
      endTime: '21:00',
      level: '중급',
      stack: ['node.js', 'Express', 'Typescript'],
      campus: '율전',
      description:
        'Udemy 강의 [NodeJS - The Complete Guide] 를 들으면서 Node, Express, Typescript를 학습하는 스터디입니다. Javascript에 능숙하고 웹 동작 원리에 대한 이해가 있는 분들께 권장드립니다. 세부적인 스터디 진행 방식은 모집 후 토의를 통해 결정할 예정입니다. 강의 런타임이 38.5시간으로 긴 편인데 학기 중에 시간 투자해서 같이 완강까지 달릴 분들 신청해주세요!\n\n<a href="https://www.udemy.com/course/nodejs-the-complete-guide/" target="_blank" style="color: blue">[유데미 강의 링크]</a>',
      isRecruiting: false,
      position: '부원'
    }
  ]

  return (
    <>
      <div id="mystudy-body__content" className="flex max-w-full flex-1 flex-col pb-16 sm:pt-8">
        <div className="flex border-b border-[#dee2e6]">
          <button className="h-[45px] px-3 text-[16px] font-medium text-[#adb5bd]">스터디장</button>
        </div>
        <div id="studylist-container" className="mb-10">
          {/* 받아온 JSON 데이터 중 스터디장인 것을 마이스터디 페이지 카드로 변환 */}
          {UserStudyList.map(
            (study, index) =>
              study.position === '스터디장' && (
                <Link href="/mystudy/43" className="cursor-pointer" key={index}>
                  <div className="border-b-solid  flex border-b border-b-[#dee2e6] px-4 py-[18px]">
                    <div className=" flex-auto">
                      {/* //card 내의 첫번째 행: 개설 혹은 참여, 스터디 제목 display */}
                      <div className="mb-1  flex items-center">
                        <div className="mr-2  flex items-center">
                          <span className="inline-block whitespace-nowrap rounded-xl bg-purple-600 px-[8px] py-[4px] text-center align-baseline text-xs font-bold text-white">
                            {study.position}
                          </span>
                        </div>
                        <h3 className="flex-1 overflow-hidden whitespace-nowrap text-[18px] font-bold text-[#212529]">
                          {study.title}
                        </h3>
                      </div>
                      {/* //card 내의 두번째 행: 설명 display */}
                      <div className="max-h-18 overflow-hidden text-ellipsis whitespace-normal text-left text-[14px] text-[#495057]">
                        {study.description}
                      </div>
                      {/* //card 내의 세번째 행: 태그 버튼 목록 display */}
                      <div className="mt-2  flex flex-wrap">
                        <button className="m-0 mb-[5px] mr-2 flex h-[26px] w-fit items-center whitespace-nowrap rounded border-none bg-[#eff3fa] px-2 py-1 text-[13px] leading-[1.38rem]">
                          <span className=" text-[#3e4042]">{study.campus}</span>
                        </button>
                        <button className="m-0 mb-[5px] mr-2 flex h-[26px] w-fit items-center whitespace-nowrap rounded border-none bg-[#eff3fa] px-2 py-1 text-[13px] leading-[1.38rem]">
                          <span className=" text-[#3e4042]">{study.level}</span>
                        </button>
                        {study.stack.map((stack, index) => (
                          <button
                            key={index}
                            className="m-0 mb-[5px] mr-2 flex h-[26px] w-fit items-center whitespace-nowrap rounded border-none bg-[#eff3fa] px-2 py-1 text-[13px] leading-[1.38rem]"
                          >
                            <span className=" text-[#3e4042]">{stack}</span>
                          </button>
                        ))}
                      </div>
                      {/* //card 내의 네번째 행: 스터디장, 스터디 인원 보여주는 card별 footer */}
                      <div className="mt-4 flex justify-between overflow-auto text-ellipsis whitespace-nowrap text-sm font-normal text-[#868e96]">
                        <div className="max-w-lg flex-auto">
                          <span className="flex-shrink overflow-hidden text-ellipsis whitespace-nowrap"></span>
                          <span>{study.mentor}</span>
                          <span> · </span>
                          <span>
                            {study.day} {study.startTime}
                            {study.startTime && '~'}
                            {study.endTime}
                          </span>
                        </div>
                        {/* <div className="flex items-center gap-1">
                          <IoPersonOutline />
                          <span className="text-sm font-bold">인원 미정</span>
                        </div> */}
                      </div>
                    </div>
                  </div>
                </Link>
              )
          )}
        </div>
      </div>
    </>
  )
}
