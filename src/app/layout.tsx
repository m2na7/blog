import { type ReactNode } from 'react'

import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'

import Footer from '@/components/footer'
import Header from '@/components/header'
import { BLOG_CONFIG } from '@/constants/config'

import '@/styles/global.css'

export const metadata: Metadata = {
  title: {
    default: BLOG_CONFIG.title,
    template: '%s | ' + BLOG_CONFIG.title,
  },
  description: BLOG_CONFIG.description,
  icons: {
    icon: `${BLOG_CONFIG.url}/favicon.ico`,
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    title: BLOG_CONFIG.title,
    url: BLOG_CONFIG.url,
    images: [
      {
        url: `${BLOG_CONFIG.url}/assets/og_image.png`,
        alt: BLOG_CONFIG.title,
      },
    ],
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
