import Link from 'next/link'

import { Calendar, Clock, ChevronRight } from 'lucide-react'

import type { PostSummary } from '@/lib/posts'
import { cn } from '@/utils/cn'
import { formatDate } from '@/utils/date'

interface PostCardProps {
  post: PostSummary
  className?: string
}

export default function PostCard({ post, className }: PostCardProps) {
  return (
    <article
      className={cn(
        'rounded-2xl border border-gray-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-md dark:border-slate-700 dark:bg-slate-800',
        className
      )}
    >
      <Link href={`/posts/${post.slug}`} className="block p-6">
        {/* 포스트 제목 */}
        <h2 className="mb-3 line-clamp-2 text-xl font-semibold text-gray-900 transition-colors hover:text-gray-700 dark:text-white dark:hover:text-gray-300">
          {post.title}
        </h2>

        {/* 포스트 설명 */}
        <p className="mb-4 line-clamp-3 leading-relaxed text-gray-600 dark:text-gray-300">
          {post.description || post.excerpt}
        </p>

        {/* 메타 정보 */}
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center space-x-4">
            <time dateTime={post.date} className="flex items-center">
              <Calendar className="mr-1.5 h-4 w-4" />
              {formatDate(post.date)}
            </time>

            {post.readingTimeText && (
              <span className="flex items-center">
                <Clock className="mr-1 h-4 w-4" />
                {post.readingTimeText}
              </span>
            )}
          </div>

          {/* 읽기 더보기 화살표 */}
          <div className="group flex items-center text-gray-600 dark:text-gray-400">
            <span className="mr-1 font-medium">읽기</span>
            <ChevronRight className="h-4 w-4 transform transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </Link>
    </article>
  )
}
