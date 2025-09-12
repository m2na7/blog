import Link from 'next/link'

import PostCard from '@/components/post-card'
import Title from '@/components/title'
import { getAllPosts } from '@/lib/posts'

export default function HomePage() {
  const allPosts = getAllPosts()
  const recentPosts = allPosts.slice(0, 6)

  return (
    <div>
      {recentPosts.length > 0 && (
        <section className="space-y-[6.4px]">
          <div className="flex items-center justify-between">
            <div>
              <Title size="lg">최신 포스트</Title>
              <p className="mt-4 text-gray-600 dark:text-gray-400">
                최근에 작성한 포스트예요.
              </p>
            </div>
            <Link
              href="/posts"
              className="group flex items-center space-x-2 rounded-full border border-gray-200 bg-white px-4 py-2 font-medium text-gray-700 transition-all hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              <span>전체 보기</span>
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
            {recentPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
