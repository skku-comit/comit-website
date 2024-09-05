import NextAuth, { AuthError, NextAuthConfig, User } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { z } from 'zod'

import { HttpStatusCode } from '@/app/api/utils/httpConsts'
import { API_ENDPOINTS, ApiEndpoint } from '@/constants/apiEndpoint'
import signInSchema from '@/constants/zodSchema/signin'
import { signUpSchema } from '@/constants/zodSchema/signup'
import { AccessToken, RefreshToken } from '@/lib/auth/utils'
import { fetchData } from '@/lib/fetch'
import { AuthData } from '@/types/auth'

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
    jwt: async ({ token, user }) => {
      if (user === undefined) {
        return token
      }
      if (token.error) {
        return token
      }

      // 토큰 없는 상태(로그인 X)에서 로그인 시도
      if (user.data?.username) {
        token.data = {
          username: user.data.username,
          role: user.data.role,
          accessToken: user.data.accessToken,
          refreshToken: user.data.refreshToken
        }
        return token
      }

      // 유저 에러 발생 시
      if (user.error || token.data === null) {
        token.error = user.error
        return token
      }

      // AT, RT 변환
      token.data.accessToken = new AccessToken(token.data.accessToken.token)
      token.data.refreshToken = new RefreshToken(token.data.refreshToken.token)

      if (!token.data.accessToken.isExpired) return token

      // 액세스 토큰이 만료된 경우, 리프레시 토큰을 사용하여 새로운 액세스 토큰 발급
      const refreshedTokenOrNull = await refreshAccessToken(token.data.refreshToken)
      if (!refreshedTokenOrNull) return null
      if (refreshedTokenOrNull.data === null) return null

      const { data } = refreshedTokenOrNull
      token.data = { ...data }
      return token
    },
    session: async ({ session, token }) => {
      if (token.error) {
        session.error = token.error
        return session
      }
      if (token.data === null || session.data === null) {
        return session
      }

      session.data = { ...token.data }
      return session
    }
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions)

async function refreshAccessToken(refreshToken: RefreshToken): Promise<AuthData | null> {
  const res = await fetchData(API_ENDPOINTS.AUTH.REISSUE as ApiEndpoint, {
    headers: {
      Cookie: `refresh=${refreshToken.token}`
    },
    credentials: 'include',
    cache: 'no-store'
  })
  const data = await res.json()

  if (!res.ok) {
    switch (res.status) {
      case HttpStatusCode.UnAuthorized:
        return null
      default:
        throw new AuthError('액세스 토큰 갱신 중 에러가 발생했습니다.', {
          errorType: 'RefreshAccessToken/InternalServerError',
          detail: '액세스 토큰 갱신 중 에러가 발생했습니다.'
        })
    }
  }
  const newAccessToken = res.headers.get('access')
  const newRefreshToken = res.headers.get('Set-Cookie')
  if (!newAccessToken || !newRefreshToken) {
    throw new AuthError('서버에서 액세스 토큰 또는 리프레시 토큰을 반환하지 않았습니다.', {
      errorType: 'RefreshAccessToken/InternalServerError',
      detail: '서버에서 액세스 토큰 또는 리프레시 토큰을 반환하지 않았습니다.'
    })
  }

  return {
    error: null,
    data: {
      username: data.username,
      role: data.role,
      accessToken: new AccessToken(newAccessToken),
      refreshToken: new RefreshToken(newRefreshToken)
    }
  }
}

async function _signIn(
  type: 'signup' | 'login',
  body: z.infer<typeof signUpSchema> | z.infer<typeof signInSchema>
): Promise<User> {
  // 요청 전송
  const apiEndpoint = type === 'signup' ? API_ENDPOINTS.AUTH.SIGNUP : API_ENDPOINTS.AUTH.LOGIN
  const res = await fetchData(apiEndpoint as ApiEndpoint, {
    body: JSON.stringify(body),
    cache: 'no-store'
  })

  // 에러 처리
  if (!res.ok) {
    if (type === 'signup') {
      switch (res.status) {
        case HttpStatusCode.BadRequest:
          throw new AuthError('회원가입 정보가 올바르지 않습니다.', {
            errorType: 'Signin/BadRequest',
            detail: '회원가입 정보가 올바르지 않습니다.'
          })
        case HttpStatusCode.Conflict:
          throw new AuthError('이미 존재하는 회원 정보입니다.', {
            errorType: 'Signin/Conflict',
            detail: '이미 존재하는 회원 정보입니다.'
          })
        default:
          throw new AuthError('회원가입 중 에러가 발생했습니다.', {
            errorType: 'Signin/InternalServerError',
            detail: '회원가입 중 에러가 발생했습니다.'
          })
      }
    } else {
      switch (res.status) {
        case HttpStatusCode.UnAuthorized:
          throw new AuthError('아이디 또는 비밀번호가 올바르지 않습니다.', {
            errorType: 'Signin/Unauthorized',
            detail: '아이디 또는 비밀번호가 올바르지 않습니다.'
          })
        default:
          throw new AuthError('로그인 중 에러가 발생했습니다. 다시 시도해주세요.', {
            errorType: 'Signin/InternalServerError',
            detail: '로그인 중 에러가 발생했습니다. 다시 시도해주세요.'
          })
      }
    }
  }

  // AT, RT 추출
  const accessToken = res.headers.get('access')
  const refreshToken = res.headers.get('Set-Cookie')
  if (!accessToken || !refreshToken) {
    throw new AuthError('서버에서 액세스 토큰 또는 리프레시 토큰을 반환하지 않았습니다.', {
      errorType: 'Signin/InternalServerError',
      detail: '서버에서 액세스 토큰 또는 리프레시 토큰을 반환하지 않았습니다.'
    })
  }

  // 결과 반환
  const data = (await res.json()).data

  return {
    error: null,
    data: {
      username: data.username,
      role: data.role,
      accessToken: new AccessToken(accessToken),
      refreshToken: new RefreshToken(refreshToken)
    }
  }
}
