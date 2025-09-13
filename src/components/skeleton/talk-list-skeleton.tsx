import { cn } from '@/utils/cn'

interface TalkListItemSkeletonProps {
  className?: string
}

export default function TalkListItemSkeleton({
  className,
}: TalkListItemSkeletonProps) {
  return (
    <article
      className={cn(
        'border-b border-gray-300 px-2 py-6 last:border-b-0 dark:border-gray-800',
        className
      )}
    >
      <div className="animate-pulse">
        <div className="flex items-start justify-between gap-6">
          <div className="min-w-0 flex-1 space-y-4">
            <div className="mb-[16.8px] h-6 w-3/4 rounded bg-gray-200 dark:bg-gray-700"></div>

            <div className="mb-6 h-4 w-80 rounded bg-gray-200 dark:bg-gray-700"></div>

            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="h-4 w-4 rounded bg-gray-200 dark:bg-gray-700"></div>
                <div className="h-4 w-24 rounded bg-gray-200 dark:bg-gray-700"></div>
              </div>

              <div className="flex items-center space-x-2">
                <div className="h-4 w-4 rounded bg-gray-200 dark:bg-gray-700"></div>
                <div className="h-4 w-16 rounded bg-gray-200 dark:bg-gray-700"></div>
              </div>
            </div>
          </div>

          <div className="flex-shrink-0">
            <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700"></div>
          </div>
        </div>
      </div>
    </article>
  )
}
