import HeightPopulatedDiv from '@/components/common/HeightPopulatedBody'
import { Toaster } from '@/components/ui/toaster'

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <HeightPopulatedDiv headerHeight="5rem" footerHeight="5rem">
      {children}
      <Toaster />
    </HeightPopulatedDiv>
  )
}
