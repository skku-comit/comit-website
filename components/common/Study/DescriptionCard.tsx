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
    <div className="relative flex w-full max-w-[550px]  flex-col items-start justify-start gap-4 rounded-3xl bg-[#F4F7FA] p-6 shadow-md lg:w-[45%] xl:p-10">
      <div className="flex gap-2 text-3xl font-extrabold">
        <FaCheck className="text-primary" size={32} />
        {description.title}
      </div>
      <div className="text-xl font-semibold text-black">{description.question}</div>
      <div className="text-pretty text-xl font-semibold text-black">{description.recommendation}</div>
      <ul className="mt-5 list-outside list-disc text-wrap pl-5">
        {description.notices.map((notice) => (
          <li key={notice} className="mb-3 text-pretty text-sm text-gray-700 md:text-base">
            {notice}
          </li>
        ))}
      </ul>
      {hasButton && (
        <Button asChild variant="outline" className="bottom-4 right-4 self-end font-semibold sm:absolute">
          <Link href="study/open">스터디 개설</Link>
        </Button>
      )}
    </div>
  )
}
