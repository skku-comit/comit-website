import { redirect } from 'next/navigation'

import SectionBanner from '@/components/common/SectionBanner'
import { API_ENDPOINTS, ApiEndpoint } from '@/constants/apiEndpoint'
import { ROUTES } from '@/constants/routes'
import { auth } from '@/lib/auth/auth'
import { fetchData } from '@/lib/fetch'
import { CustomResponse } from '@/lib/response'
import { UserProfile } from '@/types'

import ProfileCards from './_components/ProfileCards'

const Profile = async () => {
  const session = await auth()
  if (!session) {
    redirect(ROUTES.LOGIN.url)
  }
  if (session.error) {
    redirect(ROUTES.LOGIN.url)
  }

  const res = await fetchData(API_ENDPOINTS.CLIENT.PROFILE.RETRIEVE as ApiEndpoint, {
    headers: {
      Authorization: `Bearer ${session.data?.accessToken}`
    },
    credentials: 'include'
  })
  if (!res.ok) {
    throw new Error('프로필 정보를 불러오는 중 오류가 발생했습니다.')
  }

  const json: CustomResponse = await res.json()
  const user: UserProfile = json.data
  return (
    <div className="flex flex-col items-center justify-center">
      <SectionBanner title="내 프로필" />
      <div className="flex max-w-7xl flex-col items-center justify-center pb-12 sm:pb-24">
        <ProfileCards session={session} user={user} />
      </div>
    </div>
  )
}

export default Profile
