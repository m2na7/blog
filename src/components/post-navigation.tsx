import Link from 'next/link'

import { ArrowLeft, ArrowRight } from 'lucide-react'

import { cn } from '@/utils/cn'

interface NavigationItem {
  title: string
  slug: string
}

interface PostNavigationProps {
  prevPost?: NavigationItem | null
  nextPost?: NavigationItem | null
  type?: 'posts' | 'talks'
}

export default function PostNavigation({
  prevPost,
  nextPost,
  type = 'posts',
}: PostNavigationProps) {
  if (!prevPost && !nextPost) {
    return null
  }

  return (
    <nav
      className="mt-12 mb-6 max-sm:mt-8 max-sm:mb-4"
      aria-label="포스트 네비게이션"
    >
      <div className="mt-6 grid grid-cols-1 gap-16 max-sm:mt-4 max-sm:gap-2 sm:grid-cols-2">
        {prevPost ? (
          <NavigationCard post={prevPost} direction="prev" type={type} />
        ) : (
          <div />
        )}

        {nextPost ? (
          <NavigationCard post={nextPost} direction="next" type={type} />
        ) : (
          <div />
        )}
      </div>
    </nav>
  )
}

interface NavigationCardProps {
  post: NavigationItem
  direction: 'prev' | 'next'
  type: string
}

function NavigationCard({ post, direction, type }: NavigationCardProps) {
  const isPrev = direction === 'prev'
  const Icon = isPrev ? ArrowLeft : ArrowRight

  return (
    <Link
      href={`/${type}/${post.slug}`}
      className={cn(
        'group relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-50 to-zinc-100 p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg max-sm:rounded-lg max-sm:p-3 dark:from-zinc-900 dark:to-zinc-800',
        isPrev ? 'max-sm:mr-10' : 'max-sm:ml-10'
      )}
      aria-label={`${isPrev ? '이전' : '다음'} 포스트: ${post.title}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/3 to-blue-600/3 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div
        className={cn('relative flex items-center space-x-3 max-sm:space-x-2')}
      >
        {isPrev && (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/80 transition-transform duration-300 group-hover:scale-105 max-sm:h-6 max-sm:w-6 dark:bg-zinc-800/80">
            <Icon
              className="h-4 w-4 text-zinc-600 max-sm:h-3 max-sm:w-3 dark:text-zinc-300"
              aria-hidden="true"
            />
          </div>
        )}

        <div className={cn('min-w-0 flex-1', !isPrev && 'max-sm:text-right')}>
          <p className="text-xs font-medium tracking-wider text-zinc-400 uppercase max-sm:text-[11px] dark:text-zinc-500">
            {isPrev ? '이전 글' : '다음 글'}
          </p>
          <h3 className="mt-1 text-sm font-medium text-zinc-900 transition-colors duration-300 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
            {post.title}
          </h3>
        </div>

        {!isPrev && (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/80 transition-transform duration-300 group-hover:scale-105 max-sm:h-6 max-sm:w-6 dark:bg-zinc-800/80">
            <Icon
              className="h-4 w-4 text-zinc-600 max-sm:h-3 max-sm:w-3 dark:text-zinc-300"
              aria-hidden="true"
            />
          </div>
        )}
      </div>
    </Link>
  )
}
