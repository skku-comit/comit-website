import Link from 'next/link'
import { redirect } from 'next/navigation'

import StudyCard from '@/components/common/StudyCard'
import { API_ENDPOINTS, ApiEndpoint } from '@/constants/apiEndpoint'
import { fetchData } from '@/lib/fetch'
import { CustomResponse } from '@/lib/response'
import { Study } from '@/types'

export const ExampleStudyList = async (): Promise<React.JSX.Element> => {
  const res = await fetchData(API_ENDPOINTS.STUDY.LIST as ApiEndpoint)
  if (!res.ok) {
    switch (res.status) {
      default:
        redirect('/error')
    }
  }
  const json: CustomResponse = await res.json()
  const studyList: Study[] = json.data
  const exampleStudies = studyList ? studyList.slice(0, 4) : []

  return (
    <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-12 xl:mb-32 xl:grid-cols-4">
      {exampleStudies.map((study) => (
        <Link key={study.id} href="study/">
          <StudyCard
            study={study}
            imageSize={176}
            showStatus={false}
            imageWrapperClassName="mb-8 mt-4 h-24 w-24 overflow-hidden sm:h-44 sm:w-44"
          />
        </Link>
      ))}
    </div>
  )
}

export default ExampleStudyList
