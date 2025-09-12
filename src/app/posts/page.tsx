import { Suspense } from 'react'

import { Metadata } from 'next'

import PostCard from '@/components/post-card'
import Title from '@/components/title'
import { BLOG_CONFIG } from '@/constants/config'
import { getPaginatedPosts } from '@/lib/posts'

interface PostsPageProps {
  searchParams: Promise<{
    page?: string
  }>
}

export const metadata: Metadata = {
  title: '포스트',
  description: `${BLOG_CONFIG.title}의 모든 포스트를 확인해보세요.`,
}

export default async function PostsPage({ searchParams }: PostsPageProps) {
  const resolvedSearchParams = await searchParams
  const currentPage = parseInt(resolvedSearchParams.page || '1', 10)
  const { posts, pagination } = getPaginatedPosts(
    currentPage,
    BLOG_CONFIG.postsPerPage
  )

  return (
    <div className="space-y-8">
      <header className="space-y-4">
        <Title size="lg">Posts</Title>
        <p className="text-gray-600 dark:text-gray-300">
          총 {pagination.totalPosts}개의 포스트가 있습니다.
        </p>
      </header>
      <Suspense fallback={<PostsLoading />}>
        <div className="space-y-6">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </Suspense>
    </div>
  )
}

function PostsLoading() {
  return (
    <div className="space-y-6">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="animate-pulse rounded-2xl border border-gray-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800"
        >
          <div className="space-y-3">
            <div className="h-6 w-3/4 rounded bg-gray-200 dark:bg-slate-700"></div>
            <div className="h-4 w-full rounded bg-gray-200 dark:bg-slate-700"></div>
            <div className="h-4 w-2/3 rounded bg-gray-200 dark:bg-slate-700"></div>
            <div className="flex space-x-2 pt-2">
              <div className="h-6 w-16 rounded-full bg-gray-200 dark:bg-slate-700"></div>
              <div className="h-6 w-20 rounded-full bg-gray-200 dark:bg-slate-700"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
