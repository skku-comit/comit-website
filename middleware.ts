import { NextResponse } from 'next/server'

import { auth } from '@/lib/auth/auth'

import { ROUTES } from './constants/routes'

export async function middleware() {
  const session = await auth() // NextAuth session Check Logic
  if (!session) {
    return NextResponse.redirect(ROUTES.HOME.url)
  }
}

// Routes that middleware should be applied
// TODO: mypage PAGE 생성시 ROUTE 일치시키고, ROUTE Type 사용하여 matcher 정의
export const config = {
  matcher: ['/mypage']
}
