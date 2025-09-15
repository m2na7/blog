import Image from 'next/image'
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
  const gradients = [
    'from-blue-500 via-purple-500 to-pink-500',
    'from-emerald-400 via-cyan-400 to-blue-500',
    'from-orange-400 via-red-400 to-pink-400',
    'from-green-400 via-blue-500 to-purple-600',
    'from-yellow-400 via-orange-500 to-red-500',
  ]

  const gradientIndex = post.title.length % gradients.length
  const gradient = gradients[gradientIndex]

  const thumbnail = (post as any).thumbnail

  return (
    <article
      className={cn(
        'group relative flex-1 overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl focus:-translate-y-1 focus:shadow-xl active:-translate-y-0.5 active:shadow-lg sm:rounded-3xl dark:bg-zinc-800 dark:shadow-gray-900/20',
        className
      )}
    >
      <Link href={`/posts/${post.slug}`} className="block">
        <div className="relative h-40 overflow-hidden sm:h-48">
          {thumbnail ? (
            <>
              <Image
                src={thumbnail}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105 group-focus:scale-105 group-active:scale-102"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent dark:from-black/40 dark:via-black/20 dark:to-transparent" />
            </>
          ) : (
            <>
              <div
                className={`absolute inset-0 bg-gradient-to-br ${gradient}`}
              />
              <div className="absolute inset-0 bg-black/20" />
            </>
          )}

          <div className="absolute inset-0 flex items-end p-4 sm:p-6">
            <div className="text-white">
              <h2 className="mb-2 text-lg leading-tight font-bold max-sm:text-base">
                {post.title}
              </h2>
              <div className="flex flex-col space-y-1 text-xs text-white/90 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4 sm:text-sm">
                <time dateTime={post.date} className="flex items-center">
                  <Calendar className="mr-1 h-3 w-3" />
                  {formatDate(post.date)}
                </time>
                {post.readingTimeText && (
                  <span className="flex items-center">
                    <Clock className="mr-1 h-3 w-3" />
                    {post.readingTimeText}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 max-sm:mb-5 max-sm:p-4">
          <p className="mb-10 text-sm leading-relaxed text-zinc-600 max-sm:mb-3 dark:text-zinc-200">
            {post.description || post.excerpt}
          </p>

          <div className="absolute bottom-6 flex items-center text-blue-600 transition-colors group-hover:text-blue-700 group-focus:text-blue-700 group-active:text-blue-800 max-sm:bottom-4 dark:text-blue-400 dark:group-focus:text-blue-300 dark:group-active:text-blue-500">
            <span className="mr-1 text-sm font-medium max-sm:text-xs">
              더 읽기
            </span>
            <ChevronRight className="h-4 w-4 max-sm:h-3 max-sm:w-3" />
          </div>
        </div>
      </Link>
    </article>
  )
}
