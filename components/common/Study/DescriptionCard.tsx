import Link from 'next/link'

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
    <div className="relative flex w-full max-w-[550px]  flex-col items-start justify-start gap-4 rounded-3xl bg-[#F4F7FA] p-6 lg:w-[45%] xl:p-10">
      <div className="text-3xl font-bold">{description.title}</div>
      <div className="text-xl font-semibold">{description.question}</div>
      <div className="mt-4 text-pretty text-xl font-semibold">{description.recommendation}</div>
      <ul className="mt-5 list-outside list-disc text-wrap pl-5">
        {description.notices.map((notice) => (
          <li key={notice} className="mb-3 text-pretty text-sm text-[#6A6D70] md:text-base">
            {notice}
          </li>
        ))}
      </ul>
      {hasButton && (
        <Button asChild variant="default" className="bottom-2 right-4 self-end font-semibold sm:absolute">
          <Link href="study/open">스터디 개설신청</Link>
        </Button>
      )}
    </div>
  )
}
