import Link from 'next/link'

import { Calendar, ArrowUpRight, FileText, Play, MapPin } from 'lucide-react'

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
        'group border-b border-gray-300 px-2 py-6 transition-colors last:border-b-0 hover:bg-gray-50/50 focus:bg-gray-50/50 active:bg-gray-100/50 dark:border-zinc-700 dark:hover:bg-zinc-700/20 dark:focus:bg-zinc-700/20 dark:active:bg-zinc-700/30',
        className
      )}
    >
      <Link href={`/talks/${talk.slug}`} className="block">
        <div className="flex items-start justify-between gap-3 sm:gap-6">
          <div className="min-w-0 flex-1">
            <h2 className="mb-2 line-clamp-2 text-base font-semibold text-gray-900 transition-colors group-hover:text-blue-600 group-focus:text-blue-600 group-active:text-blue-600 sm:text-lg dark:text-white">
              {talk.title}
            </h2>

            <p className="mb-3 line-clamp-2 text-xs text-gray-600 sm:text-sm dark:text-gray-300">
              {talk.description}
            </p>

            <div className="flex flex-col space-y-2 text-xs text-gray-500 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-6 sm:text-sm dark:text-gray-400">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <time dateTime={talk.date} className="flex items-center">
                  <Calendar className="mr-1.5 h-3.5 w-3.5 max-sm:mr-1 max-sm:h-3 max-sm:w-3" />
                  {formatDate(talk.date)}
                </time>

                {talk.venue && (
                  <span className="flex items-center">
                    <MapPin className="mr-1.5 h-3.5 w-3.5 max-sm:mr-1 max-sm:h-3 max-sm:w-3" />
                    <span className="truncate">{talk.venue}</span>
                  </span>
                )}
              </div>

              <div className="flex items-center space-x-2 sm:space-x-3">
                {talk.youtubeId && (
                  <span className="flex items-center text-red-500">
                    <Play className="mr-0.5 h-3 w-3 sm:mr-1" />
                    <span className="text-xs">영상</span>
                  </span>
                )}

                {talk.slides && (
                  <span className="flex items-center text-blue-500">
                    <FileText className="mr-0.5 h-3 w-3 sm:mr-1" />
                    <span className="text-xs">자료</span>
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex-shrink-0">
            <div className="hover-icon flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-400 transition-all group-hover:bg-blue-100 group-hover:text-blue-600 group-focus:bg-blue-100 group-focus:text-blue-600 group-active:bg-blue-200 group-active:text-blue-700 sm:h-10 sm:w-10 dark:bg-zinc-800 dark:text-zinc-500 dark:group-hover:bg-zinc-700 dark:group-hover:text-zinc-400 dark:group-focus:bg-zinc-700 dark:group-focus:text-zinc-400 dark:group-active:bg-zinc-600 dark:group-active:text-zinc-300">
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-focus:translate-x-0.5 group-focus:-translate-y-0.5 group-active:translate-x-0.5 group-active:-translate-y-0.5 sm:h-5 sm:w-5" />
            </div>
          </div>
        </div>
      </Link>
    </article>
  )
}
