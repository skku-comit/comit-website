import { redirect } from 'next/navigation'

import { HttpStatusCode } from '@/app/api/utils/httpConsts'
import SectionBanner from '@/components/common/SectionBanner'
import { API_ENDPOINTS, ApiEndpoint } from '@/constants/apiEndpoint'
import { ROUTES } from '@/constants/routes'
import { auth } from '@/lib/auth/auth'
import { fetchData } from '@/lib/fetch'
import { CustomResponse } from '@/lib/response'
import { UnAuthorized } from '@/lib/response/errors'
import { UserProfile } from '@/types'

import ProfileCards from './_components/ProfileCards'

const Profile = async () => {
  const session = await auth()
  if (!session) {
    redirect(ROUTES.LOGIN.url)
  }
  const { accessToken } = session

  const res = await fetchData(API_ENDPOINTS.CLIENT.PROFILE.RETRIEVE as ApiEndpoint, {
    headers: {
      Authorization: `Bearer ${accessToken.token}`
    }
  })
  if (!res.ok) {
    switch (res.status) {
      case HttpStatusCode.UnAuthorized:
        UnAuthorized
      default:
        redirect('/error')
    }
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
