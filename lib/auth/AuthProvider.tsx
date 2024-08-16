import { SessionProvider } from 'next-auth/react'
import React from 'react'

import { auth, BASE_AUTH_PATH } from './auth'

interface AuthProviderProps {
  children: React.ReactNode
}

const AuthProvider = async ({ children }: AuthProviderProps) => {
  const session = await auth()
  if (session && session.user) {
    session.user = {
      name: session.user.name,
      email: session.user.email
    }
  }
  return (
    <SessionProvider basePath={BASE_AUTH_PATH} session={session}>
      {children}
    </SessionProvider>
  )
}

export default AuthProvider
