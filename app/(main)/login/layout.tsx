import React from 'react'

import AuthProvider from '@/lib/auth/AuthProvider'

const LoginLayout = ({ children }: { children: React.ReactNode }) => {
  return <AuthProvider>{children}</AuthProvider>
}

export default LoginLayout
