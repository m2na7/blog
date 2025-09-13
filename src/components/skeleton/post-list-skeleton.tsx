import { cn } from '@/utils/cn'

interface Props {
  className?: string
}

export default function PostListSkeleton({ className }: Props) {
  return (
    <article
      className={cn(
        'border-b border-gray-300 px-2 py-6 last:border-b-0 dark:border-gray-800',
        className
      )}
    >
      <div className="animate-pulse">
        <div className="flex items-start justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="h-18 w-18 rounded-lg bg-gray-200 dark:bg-gray-700"></div>
            </div>

            <div className="min-w-0 flex-1 space-y-3">
              <div className="mt-2 mb-4 h-5 w-80 rounded bg-gray-200 dark:bg-gray-700"></div>

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
          </div>

          <div className="flex-shrink-0">
            <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700"></div>
          </div>
        </div>
      </div>
    </article>
  )
}
