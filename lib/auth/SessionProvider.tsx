'use client'
import { usePathname } from 'next/navigation'
import { getSession } from 'next-auth/react'
import { createContext, useContext, useEffect, useState } from 'react'

import { AuthDataData, AuthDataError } from '@/types/auth'

type SuccessAuthData = { error: null; data: AuthDataData }
type FailAuthData = { error: AuthDataError; data: null }

const SessionContent = createContext<SuccessAuthData | FailAuthData | null>(null)

export const SessionProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()
  const [session, setSession] = useState<SuccessAuthData | FailAuthData | null>(null) // error, data 둘 중 하나만 존재할 수 있음

  useEffect(() => {
    getSession().then((res) => {
      if (!res) return setSession(null)
      if (res.error) {
        setSession({ error: res.error, data: null } as FailAuthData)
      } else if (res.data) {
        return setSession({
          error: null,
          data: res.data
        } as SuccessAuthData)
      } else {
        setSession(null)
      }
    })
  }, [pathname]) // 페이지를 이동할 때마다 세션을 갱신
  return <SessionContent.Provider value={session}>{children}</SessionContent.Provider>
}

// 클라이언트 컴포넌트용 커스텀 훅
export const useSession = () => {
  return useContext(SessionContent)
}
