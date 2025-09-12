import { Suspense } from 'react'

import { Metadata } from 'next'

import PostListItem from '@/components/post-list-item'
import Title from '@/components/title'
import { BLOG_CONFIG } from '@/constants/config'
import { getPaginatedPosts } from '@/lib/posts'

interface PostsPageProps {
  searchParams: Promise<{
    page?: string
  }>
}

export const metadata: Metadata = {
  title: 'Posts',
  description: `${BLOG_CONFIG.title}의 Posts`,
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
          총 {pagination.totalPosts}개의 게시물이 있습니다.
        </p>
      </header>
      <Suspense fallback={<PostsLoading />}>
        <div className="divide-y divide-gray-100 dark:divide-gray-800">
          {posts.map((post) => (
            <PostListItem key={post.slug} post={post} />
          ))}
        </div>
      </Suspense>
    </div>
  )
}

function PostsLoading() {
  return (
    <div className="divide-y divide-gray-100 dark:divide-gray-800">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="animate-pulse py-6">
          <div className="flex items-start justify-between gap-6">
            <div className="min-w-0 flex-1 space-y-3">
              <div className="h-6 w-3/4 rounded bg-gray-200 dark:bg-gray-700"></div>
              <div className="h-4 w-full rounded bg-gray-200 dark:bg-gray-700"></div>
              <div className="h-4 w-2/3 rounded bg-gray-200 dark:bg-gray-700"></div>
              <div className="flex space-x-2">
                <div className="h-6 w-16 rounded bg-gray-200 dark:bg-gray-700"></div>
                <div className="h-6 w-20 rounded bg-gray-200 dark:bg-gray-700"></div>
              </div>
            </div>
            <div className="flex-shrink-0">
              <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
