import './globals.css'

import type { Metadata } from 'next'
import localFont from 'next/font/local'

import { SessionProvider } from '@/lib/auth/SessionProvider'
import { cn } from '@/lib/utils'

const pretendard = localFont({
  src: '../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard'
})

export const metadata: Metadata = {
  metadataBase: new URL('https://skku-comit.dev'),
  title: 'COMIT',
  description: 'SKKU COMIT official website',
  icons: {
    icon: '/favicon.ico',
    apple: '/favicon.ico'
  },
  openGraph: {
    title: 'COMIT - SKKU COMIT Official Website',
    description: 'SKKU COMIT official website',
    images: [
      {
        url: 'https://github.com/skku-comit/comit-website/assets/97675977/deb60102-16d9-41b0-aa16-12d517f20812',
        width: 1200,
        height: 630,
        alt: 'COMIT Banner Image'
      }
    ],
    url: 'https://skku-comit.dev',
    type: 'website'
  },
  keywords: ['SKKU', 'COMIT', 'Official'],
  robots: 'index, follow'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body className={cn(pretendard.variable, 'font-pretendard')}>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  )
}
