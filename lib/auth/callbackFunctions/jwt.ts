import { User } from 'next-auth'
import { JWT } from 'next-auth/jwt'

import { API_ENDPOINTS, ApiEndpoint } from '@/constants/apiEndpoint'
import { CustomToken } from '@/lib/auth/callbackFunctions/parameters'
import { AccessToken, RefreshToken } from '@/lib/auth/utils'
import { fetchData } from '@/lib/fetch'

export default async function jwt({ token, user }: { token: JWT; user: User }): Promise<CustomToken> {
  // 첫 로그인 시에만 jwt: JWT, user: User로 들어옴
  // 이후에는 jwt: CustomToken, user: CustomUser로 들어옴
  console.log('=== jwt ===')
  console.log('token:', token)
  console.log('user:', user)

  if (user !== undefined) {
    token.id = user.id
    token.accessToken = user.accessToken
    token.refreshToken = user.refreshToken
    return token as CustomToken
  }
  token.accessToken = new AccessToken(token.accessToken.token)
  token.refreshToken = new RefreshToken(token.refreshToken.token)

  if (!token.accessToken.isExpired) {
    console.log(`액세스 토큰이 만료되지 않았으므로 그대로 반환합니다. 남은 시간: ${token.accessToken.expiresIn}`)
    return token
  }

  // 액세스 토큰이 만료된 경우, 리프레시 토큰을 사용하여 새로운 액세스 토큰 발급
  const refreshedToken = await refreshAccessToken(token.refreshToken)
  token.accessToken = refreshedToken.accessToken
  token.refreshToken = refreshedToken.refreshToken
  return token
}

async function refreshAccessToken(
  refreshToken: RefreshToken
): Promise<{ accessToken: AccessToken; refreshToken: RefreshToken }> {
  try {
    const res = await fetchData(API_ENDPOINTS.AUTH.REISSUE as ApiEndpoint, {
      headers: {
        Cookie: `refresh=${refreshToken.token}`
      }
    })
    const data = await res.json()

    if (!res.ok) {
      throw new Error(data.message)
    }
    const newAccessToken = res.headers.get('access')
    const newRefreshToken = res.headers.get('Set-Cookie')
    if (!newAccessToken || !newRefreshToken) {
      throw new Error('Failed to refresh access token')
    }

    return {
      accessToken: new AccessToken(newAccessToken),
      refreshToken: new RefreshToken(newRefreshToken)
    }
  } catch (error) {
    console.error('Error refreshing access token:', error.message)
    throw error
  }
}
