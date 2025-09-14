import { type ReactNode } from 'react'

import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'

import Footer from '@/components/footer'
import Header from '@/components/header'

import '@/styles/global.css'

export const metadata: Metadata = {
  title: {
    default: 'm2na.dev',
    template: '%s | m2na.dev',
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
      <body className="min-h-screen bg-white antialiased transition-colors duration-200 dark:bg-gray-900">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="mx-auto w-full max-w-2xl flex-1 py-8 max-sm:px-4">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
