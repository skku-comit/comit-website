'use client'
import '../mystudy.css'

// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { notFound, redirect } from 'next/navigation'
import { useEffect, useState } from 'react'
import EasyEdit, { Types } from 'react-easy-edit'

import { HttpStatusCode } from '@/app/api/utils/httpConsts'
//절대경로
//절대경로
import { Button } from '@/components/ui/button'
import { API_ENDPOINTS } from '@/constants/apiEndpoint'
import { fetchData } from '@/lib/fetch'
import { Study } from '@/types'

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

interface StudyDetailProps {
  params: {
    id: number
  }
}

export default function StudyDetailPage({ params }: StudyDetailProps) {
  const [editing, setEditing] = useState(false)
  const [study, setStudy] = useState<Study>()

  const StudyData: StudyData = {
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
  }
  const { id } = params

  useEffect(() => {
    fetchData(API_ENDPOINTS.CLIENT.STUDY.RETRIEVE(id)).then((res) => {
      if (!res.ok) {
        switch (res.status) {
          case HttpStatusCode.NotFound:
            notFound()
          default:
            redirect('/error')
        }
      }
      return res.json().then((json) => {
        setStudy(json.data)
        console.log(json.data)
      })
    })
  }, [])

  //받은 아이디로 get 요청 한번 더 보내기(세부 스터디 정보)
  return (
    <>
      <div id="mystudy-body__content" className="box-border flex w-full flex-1 flex-col pb-16 pt-8">
        <div id="study-container" className="relative mt-4 flex items-start">
          <img src={StudyData.imageSrc} alt="studyimage" className="mr-8 h-52 w-52 border object-cover" />
          <div className="mt-4 flex flex-col gap-3 text-[17px] font-medium">
            <div className="flex items-center">
              <h3 className=" flex items-center overflow-hidden whitespace-nowrap text-[#212529]">
                <span className="mr-2 font-semibold">스터디 제목:</span>
                {
                  <EasyEdit
                    type={Types.TEXT}
                    value={StudyData.title}
                    onSave={(val) => console.log(val)}
                    saveButtonLabel={<span className="text-green-500">수정</span>}
                    cancelButtonLabel={<span className="text-red-500">취소</span>}
                  />
                }
              </h3>
              <span className="absolute right-2 inline-block whitespace-nowrap rounded-xl bg-purple-600 px-2 py-[3px] text-[15px] font-bold text-white">
                {StudyData.position}
              </span>
            </div>
            <h3 className=" flex items-center overflow-hidden whitespace-nowrap text-[#212529]">
              <span className="mr-2 box-border font-semibold text-[#3e4042]">캠퍼스:</span>
              {
                <EasyEdit
                  type="select"
                  options={[
                    { label: '공통', value: '공통' },
                    { label: '율전', value: '율전' },
                    { label: '명륜', value: '명륜' }
                  ]}
                  onSave={(val) => console.log(val)}
                  placeholder={StudyData.campus}
                  saveButtonLabel={<span className="text-green-500">수정</span>}
                  cancelButtonLabel={<span className="text-red-500">취소</span>}
                />
              }
            </h3>
            <h3 className="flex items-center overflow-hidden whitespace-nowrap text-[#212529]">
              <span className="mr-2 box-border font-semibold text-[#3e4042]">스터디 레벨:</span>
              {
                <EasyEdit
                  type="select"
                  options={[
                    { label: '초급', value: '초급' },
                    { label: '중급', value: '중급' },
                    { label: '상급', value: '상급' }
                  ]}
                  onSave={(val) => console.log(val)}
                  placeholder={study?.level}
                  saveButtonLabel={<span className="text-green-500">수정</span>}
                  cancelButtonLabel={<span className="text-red-500">취소</span>}
                />
              }
            </h3>

            <h3 className="flex items-center overflow-hidden whitespace-nowrap text-[#212529]">
              <span className="mr-2 box-border font-semibold text-[#3e4042]">
                관련 스택
                <span className="text-sm text-gray-600">(스택 간에는 쉼표(,)를 사용해 구분해 주세요.)</span>:
              </span>
              <EasyEdit
                type={Types.TEXT}
                value={StudyData.stack.join(', ')}
                onSave={(val) => console.log(val)}
                saveButtonLabel={<span className="text-green-500">수정</span>}
                cancelButtonLabel={<span className="text-red-500">취소</span>}
              />
            </h3>
            <h3 className="flex items-center overflow-hidden whitespace-nowrap text-[#212529]">
              <span className="mr-2 box-border font-semibold text-[#3e4042]">요일 및 시간대:</span>
              <EasyEdit
                type="select"
                options={[
                  { label: '월요일', value: '월요일' },
                  { label: '화요일', value: '화요일' },
                  { label: '수요일', value: '수요일' },
                  { label: '목요일', value: '목요일' },
                  { label: '금요일', value: '금요일' },
                  { label: '토요일', value: '토요일' },
                  { label: '일요일', value: '일요일' }
                ]}
                onSave={(val) => console.log(val)}
                placeholder={`${StudyData.day}요일`}
                saveButtonLabel={<span className="text-green-500">수정</span>}
                cancelButtonLabel={<span className="text-red-500">취소</span>}
              />
              <span>&nbsp;&nbsp;</span>

              <EasyEdit
                type={Types.TIME}
                value={StudyData.startTime}
                onSave={(val) => console.log(val)}
                placeholder="Select time"
                saveButtonLabel={<span className="text-green-500">수정</span>}
                cancelButtonLabel={<span className="text-red-500">취소</span>}
              />
              <span>&nbsp;~&nbsp;</span>
              <EasyEdit
                type={Types.TIME}
                value={StudyData.endTime}
                onSave={(val) => console.log(val)}
                saveButtonLabel={<span className="text-green-500">수정</span>}
                cancelButtonLabel={<span className="text-red-500">취소</span>}
                placeholder="Select time"
              />
            </h3>

            {/* You can add more study details here */}
          </div>
        </div>
        <div className="mt-4 box-border w-full text-[17px] font-medium text-[#3e4042]">
          <span className="text-[18px] font-bold">스터디 설명</span>
          <br />
          <textarea
            name="study-description"
            id="description"
            className="mt-2 min-h-6 w-full px-2 py-1"
            disabled={!editing}
            autoFocus={editing}
          >
            {StudyData.description}
          </textarea>
          {!editing ? (
            <Button
              className="px-2 py-1 text-[16px]"
              onClick={() => {
                setEditing(true)
              }}
            >
              수정
            </Button>
          ) : (
            <div className="flex gap-x-2">
              <Button
                className="px-2 py-1 text-[16px]"
                onClick={() => {
                  setEditing(false)
                }}
              >
                제출
              </Button>

              <Button
                className="bg-slate-500 px-2 py-1 text-[16px] hover:bg-slate-400"
                onClick={() => {
                  setEditing(false)
                }}
              >
                취소
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
