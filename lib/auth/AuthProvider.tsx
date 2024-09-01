import { SessionProvider } from 'next-auth/react'
import React from 'react'

import { auth } from './auth'

interface AuthProviderProps {
  children: React.ReactNode
}

const AuthProvider = async ({ children }: AuthProviderProps) => {
  const session = await auth()

  if (session && session.user) {
    session.user = {
      name: session.user.name,
      email: session.user.email,
      accessToken: session.user.accessToken,
      refreshToken: session.user.refreshToken
    }
  }

  return <SessionProvider session={session}>{children}</SessionProvider>
}

export default AuthProvider
