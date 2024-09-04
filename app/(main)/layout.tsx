import { Inter } from 'next/font/google'

import HeightPopulatedDiv from '@/components/common/HeightPopulatedBody'
import { Toaster } from '@/components/ui/toaster'
import AuthProvider from '@/lib/auth/AuthProvider'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <AuthProvider>
      <HeightPopulatedDiv headerHeight="5rem" footerHeight="5rem" className={inter.className}>
        {children}
        <Toaster />
      </HeightPopulatedDiv>
    </AuthProvider>
  )
}
