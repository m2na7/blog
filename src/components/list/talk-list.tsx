import Link from 'next/link'

import { Calendar, ArrowUpRight, FileText, Play } from 'lucide-react'

import type { TalkSummary } from '@/lib/talks'
import { cn } from '@/utils/cn'
import { formatDate } from '@/utils/date'

interface TalkListProps {
  talk: TalkSummary
  className?: string
}

export default function TalkList({ talk, className }: TalkListProps) {
  return (
    <article
      className={cn(
        'group border-b border-gray-300 px-2 py-6 transition-colors last:border-b-0 hover:bg-gray-50/50 dark:border-zinc-700 dark:hover:bg-zinc-700/20',
        className
      )}
    >
      <Link href={`/talks/${talk.slug}`} className="block">
        <div className="flex items-start justify-between gap-6">
          <div className="min-w-0 flex-1">
            <h2 className="mb-2 line-clamp-2 text-lg font-semibold text-gray-900 transition-colors group-hover:text-blue-600 dark:text-white">
              {talk.title}
            </h2>

            <p className="mb-3 line-clamp-2 text-sm text-gray-600 dark:text-gray-300">
              {talk.description}
            </p>

            <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
              <time dateTime={talk.date} className="flex items-center">
                <Calendar className="mr-1.5 h-4 w-4" />
                {formatDate(talk.date)}
              </time>

              {talk.venue && (
                <span className="flex items-center">
                  <span className="mr-1.5">📍</span>
                  {talk.venue}
                </span>
              )}

              <div className="flex items-center space-x-3">
                {talk.youtubeId && (
                  <span className="flex items-center text-red-500">
                    <Play className="mr-1 h-3 w-3" />
                    <span className="text-xs">영상</span>
                  </span>
                )}

                {talk.slides && (
                  <span className="flex items-center text-blue-500">
                    <FileText className="mr-1 h-3 w-3" />
                    <span className="text-xs">자료</span>
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
