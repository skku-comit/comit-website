import Link from 'next/link'
import { FaCheck } from 'react-icons/fa6'

import { Button } from '@/components/ui/button'

type Description = {
  title: string
  question: string
  recommendation: string
  notices: string[]
}

export interface DescriptionCardProps {
  description: Description
  hasButton: boolean
}

export default function DescriptionCard({ description, hasButton }: DescriptionCardProps) {
  return (
    <div className="relative flex w-full max-w-[550px]  flex-col items-start justify-start gap-2 rounded-3xl bg-[#F4F7FA] px-4 py-6 shadow-md sm:gap-4 sm:px-6 lg:w-[45%] xl:p-10">
      <div className="flex items-center gap-2 text-2xl font-extrabold sm:text-3xl">
        <FaCheck className="text-primary" size={32} />
        {description.title}
      </div>
      <div className="text-[15px] font-semibold text-black sm:text-xl">{description.question}</div>
      <div className="text-pretty text-[15px] font-semibold text-black sm:text-xl">{description.recommendation}</div>
      <ul className="list-outside list-disc text-wrap pl-5 sm:mt-5">
        {description.notices.map((notice) => (
          <li key={notice} className="mb-2 text-pretty text-sm text-gray-700 sm:mb-3 md:text-base">
            {notice}
          </li>
        ))}
      </ul>
      {hasButton && (
        <Button asChild variant="outline" className="self-center font-semibold sm:absolute sm:bottom-4 sm:right-4">
          <Link href="study/open">스터디 개설</Link>
        </Button>
      )}
    </div>
  )
}
