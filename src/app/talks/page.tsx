import { Suspense } from 'react'

import { Metadata } from 'next'

import TalkListItem from '@/components/list/talk-list'
import Pagination from '@/components/pagination'
import TalkListSkeleton from '@/components/skeleton/talk-list-skeleton'
import Title from '@/components/title'
import { BLOG_CONFIG } from '@/constants/config'
import { getPaginatedTalks } from '@/lib/talks'
import {
  generatePaginatedParams,
  getCurrentPageFromSearchParams,
} from '@/utils/pagination'

interface TalksPageProps {
  searchParams: Promise<{
    page?: string
  }>
}

export const metadata: Metadata = {
  title: 'Talks',
  description: `외부 발표 경험을 기록하고 공유해요.`,
}

export async function generateStaticParams() {
  return generatePaginatedParams(getPaginatedTalks, BLOG_CONFIG.postsPerPage)
}

export default async function TalksPage({ searchParams }: TalksPageProps) {
  const resolvedSearchParams = await searchParams
  const currentPage = getCurrentPageFromSearchParams(resolvedSearchParams)
  const { talks, pagination } = getPaginatedTalks(
    currentPage,
    BLOG_CONFIG.postsPerPage
  )

  return (
    <div>
      <header className="mb-2 space-y-2">
        <Title size="lg">Talks</Title>
        <h2 className="text-zinc-600 max-sm:text-sm dark:text-zinc-300">
          외부 발표 경험을 기록하고 공유해요.
        </h2>
      </header>

      <Suspense fallback={<TalksLoading />}>
        <div className="divide-y divide-gray-100 dark:divide-gray-800">
          {talks.map((talk) => (
            <TalkListItem key={talk.slug} talk={talk} />
          ))}
        </div>
      </Suspense>

      <Pagination
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        basePath="/talks"
      />
    </div>
  )
}

function TalksLoading() {
  return (
    <div className="divide-y divide-gray-100 dark:divide-gray-800">
      {[...Array(3)].map((_, i) => (
        <TalkListSkeleton key={i} />
      ))}
    </div>
  )
}
