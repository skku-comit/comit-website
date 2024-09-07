import Link from 'next/link'
import { redirect } from 'next/navigation'

import { API_ENDPOINTS, ApiEndpoint } from '@/constants/apiEndpoint'
import { ROUTES } from '@/constants/routes'
import { auth } from '@/lib/auth/auth'
import { fetchData } from '@/lib/fetch'
import { CustomResponse } from '@/lib/response'
import { Study } from '@/types'

export default async function MyStudy() {
  const session = await auth()
  if (!session) {
    redirect(ROUTES.LOGIN.url)
  }
  if (session.error) {
    redirect(ROUTES.LOGIN.url)
  }
  const accessToken = session.data?.accessToken

  const res = await fetchData(API_ENDPOINTS.CLIENT.PROFILE.CREATED_STUDY as ApiEndpoint, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
    credentials: 'include',
    cache: 'no-cache'
  })
  if (!res.ok) {
    throw new Error('스터디 정보를 불러오는 중 오류가 발생했습니다.')
  }

  const json: CustomResponse = await res.json()
  const studyList: Study[] = json.data

  return (
    <>
      <div id="mystudy-body__content" className="flex max-w-full flex-1 flex-col pb-16 sm:pt-8">
        <div className="flex border-b border-[#dee2e6]">
          <button className="h-[45px] border-b border-[#1b1c1d] px-3 text-[16px] font-bold text-[#1b1c1d]">
            스터디장
          </button>
        </div>
        <div id="studylist-container" className="mb-10">
          {/* 받아온 JSON 데이터 중 스터디장인 것을 마이스터디 페이지 카드로 변환 */}
          {studyList.map((study, index) => (
            <Link href={`/mystudy/${study.id}`} className="cursor-pointer" key={index}>
              <div className="border-b-solid  flex border-b border-b-[#dee2e6] px-0 py-[18px] sm:px-4">
                <div className=" flex-auto">
                  {/* //card 내의 첫번째 행: 개설 혹은 참여, 스터디 제목 display */}
                  <div className="mb-1 flex-col items-center sm:flex sm:flex-row">
                    <div className="mb-2 mr-2 flex items-center sm:mb-0">
                      <span className="inline-block whitespace-nowrap rounded-xl bg-purple-600 px-[7.8px] py-[4.2px] text-center align-baseline text-xs font-bold leading-none text-white sm:px-2 sm:py-1">
                        스터디장
                      </span>
                    </div>

                    <h3 className="flex-1 overflow-hidden whitespace-nowrap text-[16px]/[25px] font-bold text-[#212529] sm:text-[18px]">
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
                    {study.stacks.map((stack, index) => (
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
                      <span>{study.mentor.username}</span>
                      <span> · </span>
                      <span>
                        {study.day} {study.startTime}
                        {study.startTime && '~'}
                        {study.endTime}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
