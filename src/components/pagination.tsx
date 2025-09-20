'use client'

import Link from 'next/link'

import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  basePath: string
}

export default function Pagination({
  currentPage,
  totalPages,
  basePath,
}: PaginationProps) {
  if (totalPages <= 1) return null

  const getPageNumbers = (): (number | string)[] => {
    const delta = 1
    const range: (number | string)[] = []
    const rangeWithDots: (number | string)[] = []

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i)
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...')
    } else {
      rangeWithDots.push(1)
    }

    rangeWithDots.push(...range)

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages)
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages)
    }

    return rangeWithDots
  }

  const pageNumbers = getPageNumbers()

  return (
    <nav className="flex items-center justify-end pt-4">
      <div className="flex items-center gap-1">
        <Link
          href={currentPage > 1 ? `${basePath}?page=${currentPage - 1}` : '#'}
          aria-label="이전 페이지"
          className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${
            currentPage > 1
              ? 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
              : 'pointer-events-none cursor-not-allowed text-gray-300 dark:text-gray-600'
          }`}
        >
          <ChevronLeft className="h-4 w-4" />
        </Link>

        {pageNumbers.map((page, index) => {
          if (page === '...') {
            return (
              <span
                key={`ellipsis-${index}`}
                className="flex h-9 w-9 items-center justify-center text-gray-400 dark:text-gray-500"
              >
                ...
              </span>
            )
          }

          const isActive = page === currentPage

          if (isActive) {
            return (
              <span
                key={page}
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-700 text-sm font-medium text-white dark:bg-zinc-100 dark:text-black"
              >
                {page}
              </span>
            )
          }

          return (
            <Link
              key={page}
              href={`${basePath}?page=${page}`}
              aria-label={`${page}페이지로 이동`}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-zinc-800 dark:hover:text-gray-100"
            >
              {page}
            </Link>
          )
        })}

        <Link
          href={
            currentPage < totalPages
              ? `${basePath}?page=${currentPage + 1}`
              : '#'
          }
          aria-label="다음 페이지"
          className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${
            currentPage < totalPages
              ? 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-zinc-800'
              : 'pointer-events-none cursor-not-allowed text-gray-300 dark:text-gray-600'
          }`}
        >
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
    </nav>
  )
}
