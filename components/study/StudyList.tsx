import { redirect } from 'next/navigation'
import { FaSchoolFlag } from 'react-icons/fa6'
import { IoPersonSharp } from 'react-icons/io5'
import { MdOutlineSignalCellularAlt } from 'react-icons/md'
import { RiStackOverflowLine } from 'react-icons/ri'

import StudyCard from '@/components/common/StudyCard'
import UserHoverCard from '@/components/common/User/HoverCard'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { API_ENDPOINTS, ApiEndpoint } from '@/constants/apiEndpoint'
import { fetchData } from '@/lib/fetch'
import { CustomResponse } from '@/lib/response'
import { Study } from '@/types'

const StudyList = async () => {
  const res = await fetchData(API_ENDPOINTS.STUDY.LIST as ApiEndpoint, {
    cache: 'no-cache'
  })
  if (!res.ok) {
    switch (res.status) {
      default:
        redirect('/error')
    }
  }
  const json: CustomResponse = await res.json()
  const studies: Study[] = json.data

  return (
    <div className="mb-12 grid grid-cols-2 gap-3 max-sm:px-2 sm:gap-y-12 lg:grid-cols-4 lg:gap-x-14">
      {studies.map((study) => (
        <Dialog key={study.id}>
          <DialogTrigger className="flex justify-center">
            <StudyCard
              study={study}
              imageSize={144}
              showStatus={true}
              imageWrapperClassName="mb-8 mt-4 h-24 w-24 overflow-hidden sm:h-36 sm:w-36"
            />
          </DialogTrigger>
          <DialogContent className="w-[324px] rounded-xl p-6 sm:w-[480px] sm:p-8">
            <DialogTitle className="break-words text-2xl font-bold">{study.title}</DialogTitle>
            {!study.day ? null : !study.startTime || !study.endTime ? (
              <div className="flex gap-3 break-words text-lg text-gray-600">
                {study.day}요일 <span className="text-base text-red-500">(시간 미정)</span>
              </div>
            ) : (
              <div className="break-words text-lg text-gray-600">
                {study.day} {study.startTime.substring(0, 5)} ~ {study.endTime.substring(0, 5)}
              </div>
            )}
            <div className="leading-snug">
              <div className="flex gap-6">
                <div className="flex items-center gap-2">
                  <IoPersonSharp />
                  <UserHoverCard user={study.mentor} />
                </div>
                <div className="flex items-center gap-2">
                  <MdOutlineSignalCellularAlt />
                  {study.level}
                </div>
                <div className="flex items-center gap-2">
                  <FaSchoolFlag />
                  {study.campus}
                </div>
              </div>
              <div className="mb-4 mt-1 flex items-center gap-2 break-words">
                <RiStackOverflowLine />
                {study.stack.join(', ')}
              </div>
              <div className="whitespace-pre-line break-keep" dangerouslySetInnerHTML={{ __html: study.description }} />
            </div>

            {/* 24-2 수강신청 기능 미사용으로 인한 주석 처리 */}
            {/* <div className="flex justify-end">
              <Button asChild>
                <Link href={ROUTES.STUDY.SIGNUP(study.id).url}>신청하기</Link>
              </Button>
            </div> */}
          </DialogContent>
        </Dialog>
      ))}
    </div>
  )
}

export default StudyList
