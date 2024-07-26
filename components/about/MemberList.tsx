import React from 'react'

import IntroduceMemeberCard from '@/components/about/IntroduceMemberCard'
import { baseURL } from '@/types/baseURL'
import { Member } from '@/types/Member'

async function fetchMembers() {
  const res = await fetch(`${baseURL}/api/members`)
  if (!res.ok) {
    throw new Error('Failed to Fetch Members')
  }

  return res.json()
}

const MemberList = async (): Promise<React.JSX.Element> => {
  const members: Member[] = await fetchMembers()
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
