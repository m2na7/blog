import Link from 'next/link'

import PostCard from '@/components/post-card'
import { BLOG_CONFIG } from '@/constants/config'
import { getAllPosts } from '@/lib/posts'

export default function HomePage() {
  const allPosts = getAllPosts()
  const recentPosts = allPosts.slice(0, 6)

  return (
    <div className="space-y-12">
      <section className="space-y-4 py-12 text-center">
        <h1 className="text-4xl font-bold text-gray-900 md:text-5xl dark:text-white">
          m2na's dev blog
        </h1>
        <p className="mx-auto max-w-2xl text-xl leading-relaxed text-gray-600 dark:text-gray-300">
          {BLOG_CONFIG.description}
        </p>
        <p className="text-gray-500 dark:text-gray-400">기록하고 공유해요.</p>
      </section>

      {recentPosts.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              최신 포스트
            </h2>
            <Link
              href="/posts"
              className="font-medium text-blue-600 transition-colors hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200"
            >
              전체 보기 →
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
