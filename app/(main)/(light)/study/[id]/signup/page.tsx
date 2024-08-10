import { API_ENDPOINTS } from '@/constants/apiEndpoint'
import { fetchData } from '@/lib/fetch'
import { Study } from '@/types'

interface StudySignupProps {
  params: {
    slug: string
  }
}

const StudySignup = async ({ params }: StudySignupProps) => {
  const { slug } = params

  const res = await fetchData(API_ENDPOINTS.STUDY.RETRIEVE(slug))
  const studyData: Study = res.data

  return <>{studyData}</>
}

export default StudySignup
