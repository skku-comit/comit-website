import Link from 'next/link'
import { FaCheck } from 'react-icons/fa6'
import { MdOutlineDangerous } from 'react-icons/md'
import { RiKakaoTalkFill } from 'react-icons/ri'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { ROUTES } from '@/constants/routes'
import { KAKAO_OPEN_CHAT_LINK } from '@/constants/social'
import { auth } from '@/lib/auth/auth'

type Description = {
  title: string
  question: string
  recommendation: string
  notices: string[]
}

const StudyOpenRejectDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="self-center font-semibold sm:absolute sm:bottom-4 sm:right-4">
          스터디 개설
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-x-1 text-destructive">
            <MdOutlineDangerous size={24} />
            권한 없음
          </DialogTitle>
        </DialogHeader>
        <DialogDescription asChild>
          <div>
            관리자 인증이 필요합니다.{<br />}
            스터디 개설을 희망하시면 임원진에게 카카오톡으로 권한을 요청해주세요.
            <div className="flex items-center justify-end">
              <Button asChild className="mt-3 self-center font-semibold">
                <Link href={KAKAO_OPEN_CHAT_LINK} target="_blank">
                  <RiKakaoTalkFill size={24} className="me-1" />
                  카카오톡으로 요청
                </Link>
              </Button>
            </div>
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}

export interface DescriptionCardProps {
  description: Description
  hasButton: boolean
}

export default async function DescriptionCard({ description, hasButton }: DescriptionCardProps) {
  const session = await auth()
  const role = session?.data?.role
  const canOpenStudy = role ? ['ROLE_VERIFIED', 'ROLE_ADMIN'].includes(role) : false

  return (
    <div className="relative flex w-full max-w-[550px]  flex-col items-start justify-start gap-2 rounded-3xl bg-[#F4F7FA] px-4 py-6 shadow-md sm:gap-4 sm:px-6 lg:w-[45%] xl:p-10">
      <div className="flex items-center gap-2 text-2xl font-extrabold sm:text-3xl">
        <FaCheck className="text-primary" size={32} />
        {description.title}
      </div>
      <div className="text-[15px] font-semibold text-black sm:text-xl">{description.question}</div>
      <div className="text-pretty text-[15px] font-semibold text-black sm:text-xl">{description.recommendation}</div>
      <ul className="list-outside list-disc text-wrap pl-5 sm:mt-5">
        {description.notices.map((notice: string) => (
          <li key={notice} className="mb-2 text-pretty text-sm text-gray-700 sm:mb-3 md:text-base">
            {notice}
          </li>
        ))}
      </ul>
      {hasButton &&
        (canOpenStudy ? (
          <Button asChild variant="outline" className="self-center font-semibold sm:absolute sm:bottom-4 sm:right-4">
            <Link href={ROUTES.STUDY.OPEN.url}>스터디 개설</Link>
          </Button>
        ) : (
          <StudyOpenRejectDialog />
        ))}
    </div>
  )
}
