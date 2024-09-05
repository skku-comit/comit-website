import NextAuth, { NextAuthConfig, User } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { z } from 'zod'

import { HttpStatusCode } from '@/app/api/utils/httpConsts'
import { API_ENDPOINTS, ApiEndpoint } from '@/constants/apiEndpoint'
import signInSchema from '@/constants/zodSchema/signin'
import { signUpSchema } from '@/constants/zodSchema/signup'
import { isAccessTokenExpired } from '@/lib/auth/utils'
import { fetchData } from '@/lib/fetch'

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
      // 토큰 없는 상태(로그인 X)에서 로그인 시도
      if (user && user.data?.username) {
        return {
          data: {
            username: user.data.username,
            image: user.data.image,
            email: user.data.email,
            role: user.data.role,
            accessToken: user.data.accessToken,
            refreshToken: user.data.refreshToken
          },
          error: null
        }
      }

      // 토큰에 데이터가 없음(토큰 손상됨) -> 로그아웃
      if (!token.data) return null

      if (!isAccessTokenExpired(token.data.accessToken)) {
        return token
      }

      // 액세스 토큰이 만료된 경우, 리프레시 토큰을 사용하여 새로운 액세스 토큰 발급
      const refreshedTokenOrNull = await refreshAccessToken(token.data.refreshToken)
      if (!refreshedTokenOrNull) return null // 리프레시 토큰이 만료된 경우
      return refreshedTokenOrNull // 새로운 액세스 토큰 반환
    },
    session: async ({ session, token }) => {
      return { ...session, ...token }
    }
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions)

async function refreshAccessToken(refreshToken: string) {
  const res = await fetchData(API_ENDPOINTS.AUTH.REISSUE as ApiEndpoint, {
    headers: {
      Cookie: `refresh=${refreshToken}`
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
        return {
          error: {
            errorType: 'RefreshAccessToken/InternalServerError',
            status: HttpStatusCode.InternalServerError,
            detail: '액세스 토큰 갱신 중 에러가 발생했습니다.'
          },
          data: null
        }
    }
  }
  const newAccessToken = res.headers.get('access')
  const newRefreshToken = res.headers.get('Set-Cookie')
  if (!newAccessToken || !newRefreshToken) {
    return {
      error: {
        errorType: 'Signin/InternalServerError',
        status: HttpStatusCode.InternalServerError,
        detail: '서버에서 액세스 토큰 또는 리프레시 토큰을 반환하지 않았습니다.'
      },
      data: null
    }
  }

  return {
    data: {
      username: data.username,
      image: data.image,
      email: data.email,
      role: data.role,
      accessToken: newAccessToken,
      refreshToken: newRefreshToken
    },
    error: null
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
          return {
            error: {
              errorType: 'Signin/BadRequest',
              status: HttpStatusCode.BadRequest,
              detail: '회원가입 정보가 올바르지 않습니다.'
            },
            data: null
          }
        case HttpStatusCode.Conflict:
          return {
            error: {
              errorType: 'Signin/Conflict',
              status: HttpStatusCode.Conflict,
              detail: '이미 존재하는 회원 정보입니다.'
            },
            data: null
          }
        default:
          return {
            error: {
              errorType: 'Signin/InternalServer',
              status: HttpStatusCode.InternalServerError,
              detail: '회원가입 중 에러가 발생했습니다.'
            },
            data: null
          }
      }
    } else {
      switch (res.status) {
        case HttpStatusCode.UnAuthorized:
          return {
            error: {
              errorType: 'Signin/Unauthorized',
              status: HttpStatusCode.UnAuthorized,
              detail: '아이디 또는 비밀번호가 올바르지 않습니다.'
            },
            data: null
          }
        default:
          return {
            error: {
              errorType: 'Signin/InternalServerError',
              status: HttpStatusCode.InternalServerError,
              detail: '로그인 중 에러가 발생했습니다.'
            },
            data: null
          }
      }
    }
  }

  // AT, RT 추출
  const accessToken = res.headers.get('access')
  const refreshToken = res.headers.get('Set-Cookie')
  if (!accessToken || !refreshToken) {
    return {
      error: {
        errorType: 'Signin/InternalServerError',
        status: HttpStatusCode.InternalServerError,
        detail: '서버에서 액세스 토큰 또는 리프레시 토큰을 반환하지 않았습니다.'
      },
      data: null
    }
  }

  // 결과 반환
  const data = (await res.json()).data

  return {
    error: null,
    data: {
      username: data.username,
      image: data.image,
      email: data.email,
      role: data.role,
      accessToken: accessToken,
      refreshToken: refreshToken
    }
  }
}
