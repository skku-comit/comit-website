import SectionBanner from '@/components/common/SectionBanner'
import StudySignupForm from '@/components/study/signup/StudySignupForm'
import { API_ENDPOINTS } from '@/constants/apiEndpoint'
import { fetchData } from '@/lib/fetch'
import { Study } from '@/types'

interface StudySignupProps {
  params: {
    id: string
  }
}

const StudySignup = async ({ params }: StudySignupProps) => {
  const { id } = params

  const res = await fetchData(API_ENDPOINTS.STUDY.RETRIEVE(id))
  const study: Study = res.data

  return (
    <>
      <SectionBanner title="스터디 참여 신청" />
      <div className="max-w-[1280px]">
        <StudySignupForm study={study} />
      </div>
    </>
  )
}

export default StudySignup
