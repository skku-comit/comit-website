import Image from 'next/image'

import { UserProfile } from '@/types'

interface IntroduceMemberCardProps {
  member: UserProfile
}

export default function IntroduceMemeberCard({ member }: IntroduceMemberCardProps) {
  return (
    <div className="flex items-center gap-8 max-md:flex-col">
      <div className="relative h-[168px] w-[168px] transform overflow-hidden rounded-[40px] shadow-md transition-transform hover:scale-125">
        <Image
          src={member.profileImage ?? ''}
          alt={member.username}
          width={168}
          height={168}
          unoptimized
          className="h-full w-full object-cover"
        />
      </div>
      <div className="h-36 w-80 rounded-3xl border p-5 shadow-md sm:h-44 sm:w-96 sm:p-7">
        <div className="flex flex-col gap-1 sm:gap-2">
          <p className="text-xl font-semibold sm:text-2xl">
            {member.username} / {member.position}
          </p>
          <p className="w-full text-base font-medium sm:text-lg">{member.bio}</p>
        </div>
      </div>
    </div>
  )
}
