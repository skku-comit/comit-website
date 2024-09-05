import NextAuth, { NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { z } from 'zod'

import { HttpStatusCode } from '@/app/api/utils/httpConsts'
import { API_ENDPOINTS, ApiEndpoint } from '@/constants/apiEndpoint'
import signInSchema from '@/constants/zodSchema/signin'
import { signUpSchema } from '@/constants/zodSchema/signup'
import { CustomToken } from '@/lib/auth/callbackFunctions/parameters'
import { AccessToken, RefreshToken } from '@/lib/auth/utils'
import { fetchData } from '@/lib/fetch'
import { Role } from '@/types'

export const BASE_AUTH_PATH = '/api/auth'

const authOptions: NextAuthConfig = {
  providers: [
    Credentials({
      credentials: {
        username: { label: 'Name', type: 'text' },
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      /**
       * 로그인 또는 회원가입 시 호출되는 함수
       * @param credentials 유저가 입력한 로그인 정보
       * @returns `null`을 반환하면 로그인 실패, `object`를 반환하면 로그인 성공되어 `jwt` 콜백의 `token`으로 전달됨
       */
      authorize: async (credentials) => {
        if (credentials.username) {
          const userInfo = await signUpSchema.parseAsync(credentials)
          return _signIn('signup', userInfo)
        }
        const userInfo = await signInSchema.parseAsync(credentials)
        return _signIn('login', userInfo)
      }
    })
  ],
  callbacks: {
    jwt: async ({ token, user }): Promise<CustomToken | null> => {
      // 토큰 없는 상태(로그인 X)에서 로그인 시도
      if (user !== undefined) {
        token.role = user.role
        token.accessToken = user.accessToken
        token.refreshToken = user.refreshToken
        return token
      }

      // AT, RT 변환
      token.accessToken = new AccessToken(token.accessToken.token)
      token.refreshToken = new RefreshToken(token.refreshToken.token)

      if (!token.accessToken.isExpired) {
        return token
      }

      // 액세스 토큰이 만료된 경우, 리프레시 토큰을 사용하여 새로운 액세스 토큰 발급
      const refreshedTokenOrNull = await refreshAccessToken(token.refreshToken)
      if (!refreshedTokenOrNull) {
        return null
      }

      const { role, accessToken, refreshToken } = refreshedTokenOrNull
      token.role = role
      token.accessToken = accessToken
      token.refreshToken = refreshToken
      return token
    },
    session: async ({ session, token }) => {
      session.role = token.role
      session.accessToken = token.accessToken
      session.refreshToken = token.refreshToken
      return session
    }
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions)

async function refreshAccessToken(
  refreshToken: RefreshToken
): Promise<{ role: Role; accessToken: AccessToken; refreshToken: RefreshToken } | null> {
  const res = await fetchData(API_ENDPOINTS.AUTH.REISSUE as ApiEndpoint, {
    headers: {
      Cookie: `refresh=${refreshToken.token}`
    },
    credentials: 'include',
    cache: 'no-store'
  })
  const data = await res.json()

  if (!res.ok) {
    if (res.status === HttpStatusCode.UnAuthorized) return null // Refresh Token이 만료된 경우
    // TODO: 그냥 에러 발생시키는 것이 아니라 에러 처리 로직 추가
    throw new Error(data.message)
  }
  const newAccessToken = res.headers.get('access')
  const newRefreshToken = res.headers.get('Set-Cookie')
  if (!newAccessToken || !newRefreshToken) {
    throw new Error('Failed to refresh access token')
  }

  return {
    role: data.role,
    accessToken: new AccessToken(newAccessToken),
    refreshToken: new RefreshToken(newRefreshToken)
  }
}

async function _signIn(type: 'signup' | 'login', body: z.infer<typeof signUpSchema> | z.infer<typeof signInSchema>) {
  const apiEndpoint = type === 'signup' ? API_ENDPOINTS.AUTH.SIGNUP : API_ENDPOINTS.AUTH.LOGIN
  const res = await fetchData(apiEndpoint as ApiEndpoint, {
    body: JSON.stringify(body),
    cache: 'no-store'
  })

  if (!res.ok) {
    if (res.status === HttpStatusCode.UnAuthorized) return null
    throw new Error(res.statusText)
  }

  const accessToken = res.headers.get('access')
  const refreshToken = res.headers.get('Set-Cookie')
  if (!accessToken || !refreshToken) return null

  const data = (await res.json()).data

  return {
    name: data.username,
    role: data.role,
    accessToken: new AccessToken(accessToken),
    refreshToken: new RefreshToken(refreshToken)
  }
}
