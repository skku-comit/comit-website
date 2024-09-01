import NextAuth, { NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { z } from 'zod'

import { HttpStatusCode } from '@/app/api/utils/httpConsts'
import { API_ENDPOINTS, ApiEndpoint } from '@/constants/apiEndpoint'
import jwt from '@/lib/auth/callbackFunctions/jwt'
import { CustomUser } from '@/lib/auth/callbackFunctions/parameters'
import redirect from '@/lib/auth/callbackFunctions/redirect'
import session from '@/lib/auth/callbackFunctions/session'
import { AccessToken, RefreshToken } from '@/lib/auth/utils'
import { fetchData } from '@/lib/fetch'

export const BASE_AUTH_PATH = '/api/auth'

const signInSchema = z.object({
  email: z.string({ required_error: 'Email is required' }).min(1, 'Email is required').email('Invalid email'),
  password: z
    .string({ required_error: 'Password is required' })
    .min(1, 'Password is required')
    .min(6, 'Password must be more than 8 characters')
    .max(32, 'Password must be less than 32 characters')
})

const authOptions: NextAuthConfig = {
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      /**
       * 로그인 또는 회원가입 시 호출되는 함수
       * @param credentials 유저가 입력한 로그인 정보
       * @returns `null`을 반환하면 로그인 실패, `object`를 반환하면 로그인 성공되어 `jwt` 콜백의 `token`으로 전달됨
       */
      authorize: async (credentials: Partial<Record<'email' | 'password', unknown>>): Promise<CustomUser | null> => {
        const { email, password } = await signInSchema.parseAsync(credentials)

        const res = await fetchData(API_ENDPOINTS.AUTH.LOGIN as ApiEndpoint, {
          body: JSON.stringify({
            email,
            password
          })
        })
        if (!res.ok) {
          switch (res.status) {
            case HttpStatusCode.UnAuthorized:
              return null
            default:
              throw new Error(res.statusText)
          }
        }

        const accessToken = res.headers.get('access')
        const refreshToken = res.headers.get('Set-Cookie')
        if (!accessToken || !refreshToken) return null

        const data = (await res.json()).data

        return {
          id: data.id,
          name: data.name,
          accessToken: new AccessToken(accessToken),
          refreshToken: new RefreshToken(refreshToken)
        }
      }
    })
  ],
  callbacks: {
    redirect,
    jwt,
    session
  },
  basePath: BASE_AUTH_PATH,
  secret: process.env.AUTH_SECRET
}

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions)
