import { SessionProvider } from 'next-auth/react'
import React from 'react'

import { auth } from './auth'

interface AuthProviderProps {
  children: React.ReactNode
}

const AuthProvider = async ({ children }: AuthProviderProps) => {
  const session = await auth()

  return <SessionProvider session={session}>{children}</SessionProvider>
}

export default AuthProvider
