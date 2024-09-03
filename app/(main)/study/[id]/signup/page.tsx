import { notFound, redirect } from 'next/navigation'

import { HttpStatusCode } from '@/app/api/utils/httpConsts'
import SectionBanner from '@/components/common/SectionBanner'
import StudySignupForm from '@/components/study/signup/StudySignupForm'
import { API_ENDPOINTS, ApiEndpoint } from '@/constants/apiEndpoint'
import { fetchData } from '@/lib/fetch'
import { CustomResponse } from '@/lib/response'
import { Study } from '@/types'

interface StudySignupProps {
  params: {
    id: number
  }
}

const StudySignup = async ({ params }: StudySignupProps) => {
  const { id } = params

  const res = await fetchData(API_ENDPOINTS.CLIENT.STUDY.RETRIEVE(id) as ApiEndpoint)
  if (!res.ok) {
    switch (res.status) {
      case HttpStatusCode.NotFound:
        notFound()
      default:
        redirect('/error')
    }
  }
  const json: CustomResponse = await res.json()
  const study: Study = json.data

  return (
    <div className="flex flex-col items-center">
      <SectionBanner title="스터디 참여 신청" />
      <div className="max-w-5xl">
        <StudySignupForm study={study} />
      </div>
    </div>
  )
}

export default StudySignup
