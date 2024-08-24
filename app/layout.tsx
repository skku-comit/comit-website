import './globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import HeightPopulatedBody from '@/components/common/HeightPopulatedBody'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://comit-website.vercel.app'),
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
      <HeightPopulatedBody headerHeight="5rem" footerHeight="5rem" className={inter.className}>
        {children}
      </HeightPopulatedBody>
    </html>
  )
}
