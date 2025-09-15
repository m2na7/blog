import { Suspense } from 'react'

import { Metadata } from 'next'

import TalkListItem from '@/components/list/talk-list'
import TalkListSkeleton from '@/components/skeleton/talk-list-skeleton'
import Title from '@/components/title'
import { BLOG_CONFIG } from '@/constants/config'
import { getPaginatedTalks } from '@/lib/talks'

interface TalksPageProps {
  searchParams: Promise<{
    page?: string
  }>
}

export const metadata: Metadata = {
  title: 'Talks',
  description: `세미나와 발표 경험을 기록하고 공유해요.`,
}

export default async function TalksPage({ searchParams }: TalksPageProps) {
  const resolvedSearchParams = await searchParams
  const currentPage = parseInt(resolvedSearchParams.page || '1', 10)
  const { talks, pagination } = getPaginatedTalks(
    currentPage,
    BLOG_CONFIG.postsPerPage
  )

  return (
    <div>
      <header className="space-y-4">
        <Title size="lg">Talks</Title>
      </header>

      <Suspense fallback={<TalksLoading />}>
        <div className="divide-y divide-gray-100 dark:divide-gray-800">
          {talks.map((talk) => (
            <TalkListItem key={talk.slug} talk={talk} />
          ))}
        </div>
      </Suspense>
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
