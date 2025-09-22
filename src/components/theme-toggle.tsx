'use client'

import { useEffect, useState } from 'react'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import { useKeyboard } from '@/hooks/use-keyboard'
import { cn } from '@/utils/cn'

const THEMES = {
  theme: 'theme',
  light: 'light',
  dark: 'dark',
  system: 'system',
} as const

interface ThemeToggleProps {
  className?: string
}

export default function ThemeToggle({ className }: ThemeToggleProps) {
  const [mounted, setMounted] = useState(false)
  const { setTheme, resolvedTheme } = useTheme()

  useEffect(() => {
    setMounted(true)

    if (!localStorage.getItem(THEMES.theme)) {
      setTheme(THEMES.system)
    }
  }, [setTheme])

  const toggleTheme = () => {
    const newTheme = resolvedTheme === THEMES.light ? THEMES.dark : THEMES.light
    setTheme(newTheme)
  }
  const isLight = mounted ? resolvedTheme === THEMES.light : true

  const { keyboardProps } = useKeyboard({
    onKeyDown: (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        toggleTheme()
      }
    },
  })

  return (
    <button
      onClick={toggleTheme}
      tabIndex={0}
      {...keyboardProps}
      className={cn(
        'group relative inline-flex h-8 w-14 cursor-pointer items-center rounded-full transition-all duration-300 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:outline-none',
        isLight ? 'bg-gray-100' : 'bg-gray-600',
        className
      )}
      aria-label={`${isLight ? '라이트' : '다크'} 모드`}
      title={`${isLight ? '다크' : '라이트'} 모드로 변경`}
    >
      <div
        className={cn(
          'absolute top-1 h-6 w-6 rounded-full bg-white shadow-sm transition-all duration-300 group-hover:scale-105',
          isLight ? 'translate-x-7' : 'translate-x-1'
        )}
      >
        <div className="flex h-full w-full items-center justify-center">
          {isLight ? (
            <Sun className="h-3.5 w-3.5 text-amber-500 transition-transform duration-300 group-hover:rotate-90" />
          ) : (
            <Moon className="h-3.5 w-3.5 text-gray-600 transition-transform duration-300 group-hover:-rotate-30" />
          )}
        </div>
      </div>
    </button>
  )
}
