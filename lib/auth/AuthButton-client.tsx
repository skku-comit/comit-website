// TODO: 현재 페이지 삭제
'use client'
import { useSession } from 'next-auth/react'
import React from 'react'

import { Button } from '@/components/ui/button'

import { signIn, signOut } from './server-actions'
const AuthButtonClient = () => {
  const session = useSession()
  return session?.data?.user ? (
    <Button
      onClick={async () => {
        await signOut()
        await signIn()
      }}
    >
      {session.data?.user?.name} : Sign Out{' '}
    </Button>
  ) : (
    <Button onClick={async () => await signIn()}>Sign In</Button>
  )
}

export default AuthButtonClient
