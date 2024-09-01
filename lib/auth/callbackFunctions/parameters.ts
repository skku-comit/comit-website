import { Account, Profile, Session, User } from 'next-auth'
import { JWT } from 'next-auth/jwt'

import { AccessToken, RefreshToken } from '@/lib/auth/utils'

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
  id: number
  iat: number
  exp: number
  accessToken: AccessToken
  refreshToken: RefreshToken
}
