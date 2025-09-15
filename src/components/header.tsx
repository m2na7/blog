'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import ThemeToggle from '@/components/theme-toggle'
import { BLOG_CONFIG } from '@/constants/config'
import { cn } from '@/utils/cn'

export default function Header() {
  const pathname = usePathname()
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-2xl items-center justify-between border-b border-gray-200 transition-colors duration-200 max-sm:px-4 dark:border-zinc-800">
        <Link
          href="/"
          className="group relative overflow-hidden text-xl font-bold text-gray-900 max-sm:text-lg dark:text-white"
        >
          {BLOG_CONFIG.title}
        </Link>

        <div className="flex items-center space-x-6 max-sm:space-x-3">
          <nav className="flex items-center space-x-0">
            {BLOG_CONFIG.navigation.map((item) => {
              const isActive =
                pathname === item.href || pathname.startsWith(item.href)

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'px-4 py-2 text-[15px] font-medium no-underline transition-colors duration-200',
                    isActive
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200'
                  )}
                >
                  {item.name}
                </Link>
              )
            })}
          </nav>

          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
