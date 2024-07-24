import BaseEntity from './'
import { Member } from './Member'

export type StudyLevel = '초급' | '초중급' | '중급' | '중상급' | '상급'
export type Stack =
  | 'HTML'
  | 'CSS'
  | 'JavaScript'
  | 'Python'
  | 'Apache'
  | 'C'
  | 'Node.js'
  | 'Express'
  | 'TypeScript'
  | 'Unity'
  | 'C#'
  | 'Kotlin'
  | 'Android'
  | '알고리즘'
  | 'Spring'
  | 'Git'
  | 'React'
  | 'Tailwind'
  | '자료구조'
  | 'AWS'
  | 'PS'
export type Campus = '공통' | '온라인' | '명륜' | '율전'

export type Study = BaseEntity & {
  imageSrc: string
  title: string
  mentor: Member
  day: string
  startTime: string
  endTime: string
  level: StudyLevel
  stack: Stack[]
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
