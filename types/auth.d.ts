import { AccessToken, RefreshToken } from '@/lib/auth/utils'
import { CustomErrorDTO } from '@/lib/response'
import { Role } from '@/types'

interface AuthData {
  error: CustomErrorDTO | null
  data: {
    username: string
    role: Role
    accessToken: AccessToken
    refreshToken: RefreshToken
  } | null
}

export declare module 'next-auth' {
  interface User extends AuthData {}
  interface Session extends AuthData {}
}

export declare module '@auth/core/jwt' {
  interface JWT extends AuthData {}
}
