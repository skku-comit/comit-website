import '../globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import Header from '@/components/admin/Header'
import SideBar from '@/components/admin/Sidebar'
import Footer from '@/components/common/Footer'
import { cn } from '@/lib/utils'

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
  const headerHeight = '5rem'
  const footerHeight = '5rem'

  return (
    <html lang="ko">
      <body className={cn(inter.className, 'h-screen')}>
        <Header height={headerHeight} />
        <div
          className="flex"
          style={{
            paddingTop: headerHeight,
            minHeight: '100%',
            paddingBottom: footerHeight
          }}
        >
          <SideBar className="w-1/5" />
          <div className="w-4/5">{children}</div>
        </div>
        <Footer height={footerHeight} />
      </body>
    </html>
  )
}
