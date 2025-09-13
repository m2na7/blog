'use client'

import Link from 'next/link'

import ThemeToggle from '@/components/theme-toggle'
import { BLOG_CONFIG } from '@/constants/config'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-2xl items-center justify-between border-b border-gray-200 px-4 transition-colors duration-200 dark:border-zinc-800">
        <Link
          href="/"
          className="text-xl font-bold text-gray-900 transition-colors hover:text-gray-700 dark:text-white dark:hover:text-gray-300"
        >
          {BLOG_CONFIG.title}
        </Link>

        <div className="flex items-center space-x-6">
          <nav className="flex items-center space-x-6">
            {BLOG_CONFIG.navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative font-medium text-gray-700 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
