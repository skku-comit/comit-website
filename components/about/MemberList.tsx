import React from 'react'

import IntroduceMemeberCard from '@/components/about/IntroduceMemberCard'
// import { API_ENDPOINTS } from '@/constants/apiEndpoint'
// import { fetchData } from '@/lib/fetch'
import { User } from '@/types'

const MemberList = async (): Promise<React.JSX.Element> => {
  // const res = await fetchData(API_ENDPOINTS.MEMBER.LIST)
  // const members: User[] = res.data
  const members: User[] = []

  return (
    <div className="grid grid-cols-1 gap-x-[5vw] gap-y-12 xl:grid-cols-2">
      {members.map((member) => member.isStaff && <IntroduceMemeberCard key={member.id} member={member} />)}
    </div>
  )
}

export default MemberList
