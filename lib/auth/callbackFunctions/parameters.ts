import { Account, Profile, Session, User } from 'next-auth'
import { JWT } from 'next-auth/jwt'

import { AccessToken, RefreshToken } from '@/lib/auth/utils'

// 아래 커스텀 타입들은 next-auth의 타입을 확장한 것입니다.
// next-auth의 타입을 확장하려면 아래와 같이 모듈 선언을 해야 합니다.
// declare module 'next-auth' {}
// declare module '@auth/core/jwt' {}
// 이렇게 선언하면 next-auth의 타입을 확장할 수 있습니다.
// 이렇게 선언한 모듈은 types/auth.d.ts에 작성해야 합니다.
// 추후 외부 인증 서비스를 사용할 때 사용하면 됩니다.

export interface CustomAccount extends Account {}

export interface CustomProfile extends Profile {}

export interface CustomSession extends Session {
  cookies: string[]
}

export interface CustomUser extends User {
  id: string
  name: string
  accessToken: AccessToken
  refreshToken: RefreshToken
}

export interface CustomToken extends JWT {
  iat: number
  exp: number
  accessToken: AccessToken
  refreshToken: RefreshToken
}
