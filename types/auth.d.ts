import { Role } from '@/types'

interface AuthData {
  username: string
  image?: string | null // 아직 백엔드에서 반영 안됨
  email?: string | null // 아직 백엔드에서 반영 안됨
  role: Role
  accessToken: string
  refreshToken: string
}

export declare module 'next-auth' {
  interface User extends AuthData {}
  interface Session extends AuthData {}
}

export declare module '@auth/core/jwt' {
  interface JWT extends AuthData {}
}
