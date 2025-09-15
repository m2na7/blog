import Image from 'next/image'
import Link from 'next/link'

import { Calendar, Clock, ArrowUpRight } from 'lucide-react'

import type { PostSummary } from '@/lib/posts'
import { cn } from '@/utils/cn'
import { formatDate } from '@/utils/date'

interface PostListProps {
  post: PostSummary
  className?: string
}

export default function PostList({ post, className }: PostListProps) {
  return (
    <article
      className={cn(
        'group border-b border-gray-300 px-2 py-6 transition-colors last:border-b-0 hover:bg-gray-50/50 focus:bg-gray-50/50 active:bg-gray-100/50 dark:border-zinc-700 dark:hover:bg-zinc-700/20 dark:focus:bg-zinc-700/20 dark:active:bg-zinc-700/30',
        className
      )}
    >
      <Link href={`/posts/${post.slug}`} className="block">
        <div className="flex items-start justify-between gap-6 max-sm:gap-3">
          <div className="flex items-start gap-4 max-sm:gap-3">
            <div className="flex-shrink-0">
              <div className="relative h-18 w-18 overflow-hidden rounded-lg max-sm:h-14 max-sm:w-14">
                <Image
                  src={post.thumbnail ?? ''}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="min-w-0 flex-1">
              <h2 className="mt-1 mb-2 line-clamp-2 text-lg font-semibold text-gray-900 transition-colors group-focus:text-blue-600 group-active:text-blue-600 max-sm:text-base md:group-hover:text-blue-600 dark:text-white">
                {post.title}
              </h2>

              <div className="flex items-center space-x-6 text-sm text-gray-500 max-sm:text-xs dark:text-gray-400">
                <time dateTime={post.date} className="flex items-center">
                  <Calendar className="mr-1.5 h-4 w-4 max-sm:mr-1 max-sm:h-3 max-sm:w-3" />
                  {formatDate(post.date)}
                </time>

                {post.readingTimeText && (
                  <span className="flex items-center">
                    <Clock className="mr-1.5 h-4 w-4 max-sm:mr-1 max-sm:h-3 max-sm:w-3" />
                    {post.readingTimeText}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex-shrink-0">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-400 transition-all group-hover:bg-blue-100 group-hover:text-blue-600 group-focus:bg-blue-100 group-focus:text-blue-600 group-active:bg-blue-200 group-active:text-blue-700 max-sm:h-8 max-sm:w-8 dark:bg-zinc-800 dark:text-zinc-500 dark:group-hover:bg-zinc-700 dark:group-hover:text-zinc-400 dark:group-focus:bg-zinc-700 dark:group-focus:text-zinc-400 dark:group-active:bg-zinc-600 dark:group-active:text-zinc-300">
              <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-focus:translate-x-0.5 group-focus:-translate-y-0.5 group-active:translate-x-0.5 group-active:-translate-y-0.5 max-sm:h-4 max-sm:w-4" />
            </div>
          </div>
        </div>
      </Link>
    </article>
  )
}
