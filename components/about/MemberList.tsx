import React from 'react'

import IntroduceMemeberCard from '@/components/about/IntroduceMemberCard'
import { fetchData } from '@/lib/fetch'
import { User } from '@/types'
import { ROUTES } from '@/types/URL'

const MemberList = async (): Promise<React.JSX.Element> => {
  const members: User[] = await fetchData(ROUTES.MEMBER.LIST)
  return (
    <div className="grid grid-cols-1 gap-x-[5vw] gap-y-12 xl:grid-cols-2">
      {members.map((member) => member.isStaff && <IntroduceMemeberCard key={member.id} member={member} />)}
    </div>
  )
}

export default MemberList
