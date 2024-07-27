'use client'

import { useEffect, useState } from 'react'

import IntroduceMemeberCard from '@/components/about/IntroduceMemberCard'
import { Member } from '@/types/Member'

import LoadingSpinner from '../common/LoadingSpinner'

export default function MemberList() {
  const [members, setMembers] = useState<Member[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const res = fetch('api/members')
    res
      .then((res) => res.json())
      .then((data) => {
        setMembers(data)
        setIsLoading(false)
      })
  }, [])

  return (
    <>
      {isLoading && <LoadingSpinner />}
      {!isLoading && (
        <div className="grid grid-cols-1 gap-x-[5vw] gap-y-12 xl:grid-cols-2">
          {members.map(
            (member, index) => member.displayAtAboutPage && <IntroduceMemeberCard key={index} member={member} />
          )}
        </div>
      )}
    </>
  )
}
