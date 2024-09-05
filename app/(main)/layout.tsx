import HeightPopulatedDiv from '@/components/common/HeightPopulatedBody'
import { Toaster } from '@/components/ui/toaster'
import AuthProvider from '@/lib/auth/AuthProvider'

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <AuthProvider>
      <HeightPopulatedDiv headerHeight="5rem" footerHeight="5rem">
        {children}
        <Toaster />
      </HeightPopulatedDiv>
    </AuthProvider>
  )
}
