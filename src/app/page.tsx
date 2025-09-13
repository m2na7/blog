import Link from 'next/link'

import PostCardHero from '@/components/post-card-hero'
import Title from '@/components/title'
import { getAllPosts } from '@/lib/posts'

export default function HomePage() {
  const allPosts = getAllPosts()
  const recentPosts = allPosts.slice(0, 3)

  return (
    <div className="space-y-12">
      {recentPosts.length > 0 && (
        <section>
          <div className="mb-2 flex items-center justify-between">
            <div>
              <Title size="lg" className="mb-4">
                최근 포스트
              </Title>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                새롭게 작성된 포스트들을 확인해보세요.
              </p>
            </div>
            <Link
              href="/posts"
              className="group mt-3 flex items-center space-x-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:bg-gray-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-gray-300 dark:hover:bg-zinc-700"
            >
              <span>전체 보기</span>
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>

          <div className="grid gap-8">
            {recentPosts.map((post, index) => (
              <PostCardHero
                key={post.slug}
                post={post}
                className={index === 0 ? 'md:col-span-2' : ''}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
