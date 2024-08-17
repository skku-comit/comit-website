'use client'

import { signIn, signOut } from 'next-auth/react'
import React from 'react'

import { Button } from '@/components/ui/button'

interface ButtonProps {
  children: React.ReactNode
  asChild?: boolean
  className?: string
}

export const SignInButton = ({ children, asChild = false, className }: ButtonProps) => {
  const Comp = asChild ? Button : 'button'

  return (
    <Comp onClick={() => signIn()} className={className}>
      {children}
    </Comp>
  )
}

export const SignOutButton = ({ children, asChild = false, className }: ButtonProps) => {
  const Comp = asChild ? Button : 'button'

  return (
    <Comp onClick={() => signOut()} className={className}>
      {children}
    </Comp>
  )
}
