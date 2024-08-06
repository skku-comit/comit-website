import React from 'react'

import IntroduceMemeberCard from '@/components/about/IntroduceMemberCard'
import { API_ENDPOINTS } from '@/constants/apiEndpoint'
import { fetchData } from '@/lib/fetch'
import { Member } from '@/types/Member'

const MemberList = async (): Promise<React.JSX.Element> => {
  const members: Member[] = await fetchData(API_ENDPOINTS.MEMBER.LIST)
  return (
    <div className="grid grid-cols-1 gap-x-[5vw] gap-y-12 xl:grid-cols-2">
      {members.map((member) => member.displayAtAboutPage && <IntroduceMemeberCard key={member.id} member={member} />)}
    </div>
  )
}

export default MemberList
