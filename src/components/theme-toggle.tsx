'use client'

import { useEffect, useState } from 'react'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import { cn } from '@/utils/cn'

interface ThemeToggleProps {
  className?: string
}

export default function ThemeToggle({ className }: ThemeToggleProps) {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button
        className={cn(
          'rounded-xl bg-gray-100 p-3 text-gray-600 transition-all duration-200 dark:bg-gray-800 dark:text-gray-300',
          className
        )}
        aria-label="테마 변경"
      >
        <Moon className="h-5 w-5" />
      </button>
    )
  }

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  const getIcon = () => {
    return theme === 'light' ? (
      <Sun className="h-5 w-5" />
    ) : (
      <Moon className="h-5 w-5" />
    )
  }

  const getLabel = () => {
    return theme === 'light' ? '라이트 모드' : '다크 모드'
  }

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        'group relative cursor-pointer rounded-xl bg-gray-100 p-3 text-gray-600 transition-all duration-300 hover:scale-110 hover:bg-gray-200 hover:text-gray-900 active:scale-95 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-blue-400',
        className
      )}
      aria-label={`현재: ${getLabel()}, 클릭하여 변경`}
      title={getLabel()}
    >
      <div className="relative transition-transform duration-300 group-hover:rotate-12">
        {getIcon()}
      </div>

      {/* 글로우 효과 */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 transition-opacity duration-300 group-hover:opacity-20 dark:from-blue-500 dark:to-purple-500" />
    </button>
  )
}
