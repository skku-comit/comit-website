import React from 'react'

import IntroduceMemeberCard from '@/components/about/IntroduceMemberCard'
import { fetchDatas } from '@/lib/CRUD'
import { Member } from '@/types/Member'
import { Path } from '@/types/URL'

const MemberList = async (): Promise<React.JSX.Element> => {
  const members: Member[] = await fetchDatas('api/members' as Path, 'members')
  return (
    <div className="grid grid-cols-1 gap-x-[5vw] gap-y-12 xl:grid-cols-2">
      {members.map(
        (member) =>
          member.displayAtAboutPage && (
            <IntroduceMemeberCard key={member.id} member={member} />
          )
      )}
    </div>
  )
}

export default MemberList
