import { redirect } from 'next/navigation'

import { HttpStatusCode } from '@/app/api/utils/httpConsts'
import SectionBanner from '@/components/common/SectionBanner'
import StudySignupForm from '@/components/study/signup/StudySignupForm'
import { API_ENDPOINTS, ApiEndpoint } from '@/constants/apiEndpoint'
import { ROUTES } from '@/constants/routes'
import { auth } from '@/lib/auth/auth'
import { fetchData } from '@/lib/fetch'
import { CustomResponse } from '@/lib/response'
import { Study } from '@/types'

interface StudySignupProps {
  params: {
    id: number
  }
}

const StudySignup = async ({ params }: StudySignupProps) => {
  const session = await auth()
  if (!session) {
    redirect(ROUTES.LOGIN.url)
  }
  if (session.error) {
    redirect(ROUTES.LOGIN.url)
  }

  const { id } = params

  const res = await fetchData(API_ENDPOINTS.CLIENT.STUDY.RETRIEVE(id) as ApiEndpoint, {
    headers: {
      Authorization: `Bearer ${session.data?.accessToken}`
    },
    credentials: 'include',
    cache: 'no-cache'
  })
  if (!res.ok) {
    switch (res.status) {
      case HttpStatusCode.NotFound:
        throw new Error(`존재하지 않는 스터디입니다. '${id}'`)
      default:
        throw new Error('스터디 정보를 불러오는 중 오류가 발생했습니다.')
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
