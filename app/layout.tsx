import './globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'COMIT',
  description: 'SKKU COMIT official website',
  icons: {
    icon: '/favicon.ico'
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta property="og:url" content="https://comit-website.vercel.app/" />
        <meta property="og:title" content="COMIT" />
        <meta property="og:description" content="SKKU COMIT official website" />
        <meta
          property="og:image"
          content="https://github.com/skku-comit/comit-website/assets/97675977/deb60102-16d9-41b0-aa16-12d517f20812"
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
