import BaseEntity from './'
import { Member } from './Member'

export type Level = '초급' | '중급' | '고급'
export type Campus = '공통' | '온라인' | '명륜' | '율전'
export type Day = '월' | '화' | '수' | '목' | '금' | '토' | '일'

export type Study = BaseEntity & {
  imageSrc: string
  title: string
  mentor: Member
  day: Day
  startTime: string
  endTime: string
  level: Level
  stack: string[]
  campus: Campus
  description: string
  isRecruiting: boolean
}

export type StudyRecordStatus = 'opened' | 'closed' | 'reviewing'

export type StudyRecord = BaseEntity & {
  study: Study
  createDate: Date
  status: StudyRecordStatus
}
