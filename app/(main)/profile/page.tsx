import { redirect } from 'next/navigation'
import React from 'react'

import { HttpStatusCode } from '@/app/api/utils/httpConsts'
import { API_ENDPOINTS, ApiEndpoint } from '@/constants/apiEndpoint'
import { ROUTES } from '@/constants/routes'
import { auth } from '@/lib/auth/auth'
import { fetchData } from '@/lib/fetch'
import { CustomResponse } from '@/lib/response'
import { UnAuthorized } from '@/lib/response/errors'
import { UserProfile } from '@/types'

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
      <div className="flex max-w-7xl flex-col items-center justify-center">
        <p>{user.profileImage ?? '이미지 없음'}</p>

        <p>{user.username}</p>
        <p>{user.email}</p>
        <p>{user.studentId}</p>
        <p>{user.phoneNumber}</p>

        <p>{user.position}</p>

        <p>{user.bio ?? '자기소개 없음'}</p>
        <p>{user.github ?? '깃허브 없음'}</p>
        <p>{user.blog ?? '블로그 없음'}</p>
      </div>
    </div>
  )
}

export default Profile
