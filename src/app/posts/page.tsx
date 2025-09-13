import { Suspense } from 'react'

import { Metadata } from 'next'

import PostList from '@/components/list/post-list'
import PostListSkeleton from '@/components/skeleton/post-list-skeleton'
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
    <>
      <header className="space-y-4">
        <Title size="lg">Posts</Title>
        <p className="text-gray-600 dark:text-gray-300">
          총 {pagination.totalPosts}개의 게시물이 있습니다.
        </p>
      </header>

      <Suspense fallback={<PostsLoading />}>
        <div className="divide-y divide-gray-100 dark:divide-gray-800">
          {posts.map((post) => (
            <PostList key={post.slug} post={post} />
          ))}
        </div>
      </Suspense>
    </>
  )
}

function PostsLoading() {
  return (
    <div className="divide-y divide-gray-100 dark:divide-gray-800">
      {[...Array(6)].map((_, i) => (
        <PostListSkeleton key={i} />
      ))}
    </div>
  )
}
