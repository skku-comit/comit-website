import { redirect } from 'next/navigation'
import React from 'react'

import IntroduceMemeberCard from '@/components/about/IntroduceMemberCard'
import { API_ENDPOINTS, ApiEndpoint } from '@/constants/apiEndpoint'
import { fetchData } from '@/lib/fetch'
import { CustomResponse } from '@/lib/response'
import { UserProfile } from '@/types'

const MemberList = async (): Promise<React.JSX.Element> => {
  const res = await fetchData(API_ENDPOINTS.CLIENT.STAFF_LIST as ApiEndpoint, {
    next: { revalidate: 60 }
  })
  if (!res.ok) {
    switch (res.status) {
      default:
        redirect('/error')
    }
  }
  const json: CustomResponse = await res.json()
  const members: UserProfile[] = json.data

  return (
    <div className="grid grid-cols-1 gap-x-[5vw] gap-y-12 xl:grid-cols-2">
      {members.map((member) => (
        <IntroduceMemeberCard key={member.id} member={member} />
      ))}
    </div>
  )
}

export default MemberList
