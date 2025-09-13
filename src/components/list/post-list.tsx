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
        'group border-b border-gray-300 px-2 py-6 transition-colors last:border-b-0 hover:bg-gray-50/50 dark:border-zinc-700 dark:hover:bg-zinc-700/20',
        className
      )}
    >
      <Link href={`/posts/${post.slug}`} className="block">
        <div className="flex items-start justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="relative h-18 w-18 overflow-hidden rounded-lg">
                <Image
                  src={post.thumbnail ?? ''}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="min-w-0 flex-1">
              <h2 className="mt-1 mb-2 line-clamp-2 text-lg font-semibold text-gray-900 transition-colors group-hover:text-blue-600 dark:text-white">
                {post.title}
              </h2>

              <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
                <time dateTime={post.date} className="flex items-center">
                  <Calendar className="mr-1.5 h-4 w-4" />
                  {formatDate(post.date)}
                </time>

                {post.readingTimeText && (
                  <span className="flex items-center">
                    <Clock className="mr-1.5 h-4 w-4" />
                    {post.readingTimeText}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex-shrink-0">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-400 transition-all group-hover:bg-blue-100 group-hover:text-blue-600 dark:bg-zinc-800 dark:text-zinc-500 dark:group-hover:bg-zinc-700 dark:group-hover:text-zinc-400">
              <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </div>
        </div>
      </Link>
    </article>
  )
}
