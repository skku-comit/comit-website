import { Database } from '@/database.types'

/**
 * Base[Type] vs [Type]
 * Base[Type]: Supabase Column을 바탕으로 생성된 타입
 * [Type]: 위 Base[Type]이 놓치는 정보들(varchar 타입에서 옵션 지정 등)을 추가한 타입
 */
type BaseUser = Database['public']['Tables']['profile']['Row']
type BaseStudy = Database['public']['Tables']['study']['Row']

export type Access = 'member' | 'verified' | 'admin'
export type User = BaseUser & {
  access: Access
}

export type Level = '초급' | '중급' | '고급'
export type Campus = '공통' | '온라인' | '명륜' | '율전'
export type Day = '월' | '화' | '수' | '목' | '금' | '토' | '일'
export type Study = BaseStudy & {
  campus: Campus
  day: Day | null
  level: Level
  mentor: User
}
