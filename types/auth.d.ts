import { AccessToken, RefreshToken } from '@/lib/auth/utils'

export declare module 'next-auth' {
  interface User {
    accessToken: AccessToken
    refreshToken: RefreshToken
  }
  interface Session {
    message: string
    accessToken: AccessToken
    refreshToken: RefreshToken
  }
}
export declare module '@auth/core/jwt' {
  interface JWT {
    iat: number
    exp: number
    accessToken: AccessToken
    refreshToken: RefreshToken
  }
}
