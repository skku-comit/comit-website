import { AccessToken, RefreshToken } from '@/lib/auth/utils'
import { Role } from '@/types'

export declare module 'next-auth' {
  interface User {
    role: Role
    accessToken: AccessToken
    refreshToken: RefreshToken
  }
  interface Session {
    message: string
    role: Role
    accessToken: AccessToken
    refreshToken: RefreshToken
  }
}
export declare module '@auth/core/jwt' {
  interface JWT {
    iat: number
    exp: number
    role: Role
    accessToken: AccessToken
    refreshToken: RefreshToken
  }
}
