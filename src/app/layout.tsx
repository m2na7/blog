import { type ReactNode } from 'react'

import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'

import Footer from '@/components/footer'
import Header from '@/components/header'

import '@/styles/global.css'

export const metadata: Metadata = {
  title: {
    default: 'm2na',
    template: '%s | m2na',
  },
  description: "m2na's blog",
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    title: 'm2na',
    url: 'https://m2na.dev',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="ko" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="min-h-screen bg-white antialiased transition-colors duration-200 dark:bg-gray-300">
        <ThemeProvider attribute="class">
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-8">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
