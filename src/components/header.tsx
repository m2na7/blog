'use client'

import Link from 'next/link'
import { BLOG_CONFIG } from '@/constants/config'
import ThemeToggle from '@/components/theme-toggle'

export default function Header() {
  return (
    <header className="w-full bg-transparent">
      <div className="mx-auto flex h-16 max-w-2xl items-center justify-between">
        <Link
          href="/"
          className="text-xl font-bold text-gray-900 transition-colors hover:text-blue-600 dark:text-white dark:hover:text-blue-400"
        >
          {BLOG_CONFIG.title}
        </Link>

        <div className="flex items-center space-x-6">
          <nav className="flex items-center space-x-6">
            {BLOG_CONFIG.navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-medium text-gray-700 transition-colors hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
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
