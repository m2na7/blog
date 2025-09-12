'use client'

import { useState, useEffect } from 'react'

import { Sun, Moon } from 'lucide-react'

import { cn } from '@/utils/cn'

/**
 * 다크모드 토글 컴포넌트
 * 라이트/다크 모드 간 전환
 */
export default function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // 저장된 테마 설정 불러오기
    const savedTheme =
      (localStorage.getItem('theme') as 'light' | 'dark') || 'light'
    setTheme(savedTheme)

    // 초기 테마 적용
    applyTheme(savedTheme)

    console.log(
      'Theme initialized:',
      savedTheme,
      'HTML class:',
      document.documentElement.classList.contains('dark') ? 'dark' : 'light'
    )
  }, [])

  const applyTheme = (newTheme: 'light' | 'dark') => {
    const root = document.documentElement
    root.classList.toggle('dark', newTheme === 'dark')
  }

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light'

    setTheme(nextTheme)
    localStorage.setItem('theme', nextTheme)
    applyTheme(nextTheme)
  }

  if (!mounted) {
    return (
      <button
        className={cn(
          'rounded-lg bg-gray-100 p-2 text-gray-600 transition-colors dark:bg-slate-800 dark:text-gray-400',
          className
        )}
        aria-label="테마 변경"
      >
        <Moon className="h-5 w-5" />
      </button>
    )
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
        'rounded-lg bg-gray-100 p-2 text-gray-600 transition-colors hover:bg-gray-200 hover:text-gray-900 dark:bg-slate-800 dark:text-gray-400 dark:hover:bg-slate-700 dark:hover:text-white',
        className
      )}
      aria-label={`현재: ${getLabel()}, 클릭하여 변경`}
      title={getLabel()}
    >
      {getIcon()}
    </button>
  )
}
