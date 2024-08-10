import Image from 'next/image'

import SectionBanner from '@/components/common/SectionBanner'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { API_ENDPOINTS } from '@/constants/apiEndpoint'
import { fetchData } from '@/lib/fetch'
import { Study } from '@/types'

interface StudySignupProps {
  params: {
    id: string
  }
}

const Subheader = ({ children }: { children: string }) => {
  return <h3 className="text-lg">{children}</h3>
}

const StudySignup = async ({ params }: StudySignupProps) => {
  const { id } = params

  const res = await fetchData(API_ENDPOINTS.STUDY.RETRIEVE(id))
  const study: Study = res.data

  const duration = (startTime: string | null, endTime: string | null) => {
    if (!startTime || !endTime) {
      return '(시간 미정)'
    }
    return `${startTime.substring(0, 5)} ~ ${endTime.substring(0, 5)}`
  }

  return (
    <>
      <SectionBanner title="스터디 참여 신청" />

      <Subheader>1. 신청 스터디 확인</Subheader>
      <div>
        <Image src={study.imageSrc} alt="study image" width={300} height={300} />
        <div>
          <h4>{study.title}</h4>
          <p>{study.mentor.name}</p>
          <p>
            {study.campus}
            {study.day && ` | ${study.day}`}
          </p>
          <p>{duration(study.startTime, study.endTime)}</p>
          <p>{study.level}</p>
          <div className="flex justify-start gap-x-2">
            {study.stack.map((s) => (
              <Badge key={s} variant="secondary">
                {s}
              </Badge>
            ))}
          </div>

          <div className="rounded-xl border p-2">
            <p className="whitespace-pre-line break-keep" dangerouslySetInnerHTML={{ __html: study.description }} />
          </div>
        </div>

        <div>
          <p>* 스터디 장소, 날짜, 시간을 다시 한번 확인해주세요.</p>
          <p>* 다중 스터디 신청은 가능합니다 (여러 스터디 참여 가능)</p>
        </div>
      </div>

      <Subheader>3. 지원동기 작성</Subheader>
      <span>300자 이내</span>
      <div>
        <p>* 자신의 열정 및 스터디 참여 의지를 어필해주세요</p>
        <p>* 지원동기는 스터디 신청 기간동안 자유롭게 수정 가능합니다</p>

        <div className="rounded-xl border p-2">
          <Input />
        </div>
      </div>
    </>
  )
}

export default StudySignup
