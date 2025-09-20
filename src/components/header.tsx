'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import ThemeToggle from '@/components/theme-toggle'
import { BLOG_CONFIG } from '@/constants/config'
import { cn } from '@/utils/cn'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 backdrop-blur-md transition-colors duration-200 dark:border-zinc-800">
      <div className="mx-auto flex h-16 max-w-2xl items-center justify-between transition-colors duration-200 max-sm:px-4">
        <Link
          href="/"
          className="group relative overflow-hidden text-xl font-bold text-gray-900 max-sm:text-lg dark:text-white"
        >
          {BLOG_CONFIG.title}
        </Link>

        <div className="flex items-center space-x-6 max-sm:space-x-3">
          <nav className="flex items-center space-x-0">
            {BLOG_CONFIG.navigation.map((item) => (
              <NavLink key={item.href} item={item} />
            ))}
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}

interface NavItem {
  name: string
  href: string
}

function NavLink({ item }: { item: NavItem }) {
  const pathname = usePathname()

  const isActive = pathname === item.href || pathname.startsWith(item.href)

  return (
    <Link
      href={item.href}
      className={cn(
        'rounded-2xl px-4 py-2 text-[15px] font-medium no-underline transition-all duration-200 hover:bg-zinc-100 focus-visible:bg-zinc-100 active:bg-zinc-200 dark:hover:bg-zinc-800 dark:focus-visible:bg-zinc-800 dark:active:bg-zinc-700',
        isActive
          ? 'text-blue-600 dark:text-blue-400'
          : 'text-zinc-700 hover:text-zinc-900 focus-visible:text-zinc-900 active:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100 dark:focus-visible:text-zinc-100 dark:active:text-zinc-100'
      )}
    >
      {item.name}
    </Link>
  )
}
