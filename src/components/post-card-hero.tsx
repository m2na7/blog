import Image from 'next/image'
import Link from 'next/link'

import { Calendar, Clock, ChevronRight } from 'lucide-react'

import type { PostSummary } from '@/lib/posts'
import { cn } from '@/utils/cn'
import { formatDate } from '@/utils/date'

interface PostCardHeroProps {
  post: PostSummary
  className?: string
}

export default function PostCardHero({ post, className }: PostCardHeroProps) {
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
        'group overflow-hidden rounded-3xl bg-white shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl dark:bg-gray-800 dark:shadow-gray-900/20',
        className
      )}
    >
      <Link href={`/posts/${post.slug}`} className="block">
        <div className="relative h-48 overflow-hidden">
          {thumbnail ? (
            <>
              <Image
                src={thumbnail}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            </>
          ) : (
            <>
              <div
                className={`absolute inset-0 bg-gradient-to-br ${gradient}`}
              />
              <div className="absolute inset-0 bg-black/20" />
            </>
          )}

          <div className="absolute inset-0 flex items-end p-6">
            <div className="text-white">
              <h2 className="mb-2 line-clamp-2 text-xl leading-tight font-bold">
                {post.title}
              </h2>
              <div className="flex items-center space-x-4 text-sm text-white/90">
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

        <div className="p-6">
          <p className="mb-4 line-clamp-3 leading-relaxed text-gray-600 dark:text-gray-300">
            {post.description || post.excerpt}
          </p>

          <div className="flex items-center justify-end text-blue-600 transition-colors group-hover:text-blue-700 dark:text-blue-400">
            <span className="mr-1 text-sm font-medium">더 읽기</span>
            <ChevronRight className="h-4 w-4" />
          </div>
        </div>
      </Link>
    </article>
  )
}
