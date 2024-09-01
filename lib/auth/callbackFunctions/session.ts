import { serialize } from 'cookie'

import { CustomSession, CustomToken } from '@/lib/auth/callbackFunctions/parameters'

export default async function session({ session, token }: { session: CustomSession; token: CustomToken }) {
  if (token.accessToken) {
    const accessTokenCookie = serialize('accessToken', token.accessToken.token, {
      httpOnly: token.accessToken.httpOnly,
      secure: process.env.NODE_ENV === 'production',
      maxAge: token.accessToken.expiresIn,
      path: '/'
    })
    session.cookies = session.cookies || []
    session.cookies.push(accessTokenCookie)
  }

  if (token.refreshToken) {
    const refreshTokenCookie = serialize('refreshToken', token.refreshToken.token, {
      httpOnly: token.refreshToken.httpOnly,
      secure: process.env.NODE_ENV === 'production',
      maxAge: token.refreshToken.expiresIn,
      path: '/'
    })
    session.cookies = session.cookies || []
    session.cookies.push(refreshTokenCookie)
  }

  return session
}
