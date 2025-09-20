import { Suspense } from 'react'

import { Metadata } from 'next'

import PostList from '@/components/list/post-list'
import Pagination from '@/components/pagination'
import PostListSkeleton from '@/components/skeleton/post-list-skeleton'
import Title from '@/components/title'
import { BLOG_CONFIG } from '@/constants/config'
import { getPaginatedPosts } from '@/lib/posts'
import {
  generatePaginatedParams,
  getCurrentPageFromSearchParams,
} from '@/utils/pagination'

interface PostsPageProps {
  searchParams: Promise<{
    page?: string
  }>
}

export const metadata: Metadata = {
  title: 'Posts',
  description: `개발 기술과 경험을 기록하고 공유해요.`,
}

export async function generateStaticParams() {
  return generatePaginatedParams(getPaginatedPosts, BLOG_CONFIG.postsPerPage)
}

export default async function PostsPage({ searchParams }: PostsPageProps) {
  const resolvedSearchParams = await searchParams
  const currentPage = getCurrentPageFromSearchParams(resolvedSearchParams)
  const { posts, pagination } = getPaginatedPosts(
    currentPage,
    BLOG_CONFIG.postsPerPage
  )

  return (
    <>
      <header className="mb-2 space-y-2">
        <Title size="lg">Posts</Title>
        <h2 className="text-[15px] text-zinc-600 max-sm:text-sm dark:text-zinc-300">
          개발 관련 기술과 경험을 기록하고 공유해요.
        </h2>
      </header>

      <Suspense fallback={<PostsLoading count={posts.length} />}>
        <div className="divide-y divide-gray-100 dark:divide-gray-800">
          {posts.map((post) => (
            <PostList key={post.slug} post={post} />
          ))}
        </div>
      </Suspense>

      <Pagination
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        basePath="/posts"
      />
    </>
  )
}

function PostsLoading({ count }: { count: number }) {
  return (
    <div className="divide-y divide-gray-100 dark:divide-gray-800">
      {[...Array(count)].map((_, i) => (
        <PostListSkeleton key={i} />
      ))}
    </div>
  )
}
