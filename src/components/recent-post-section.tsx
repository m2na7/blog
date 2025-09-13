import Link from 'next/link'

import PostCardHero from '@/components/post-card-hero'
import Title from '@/components/title'
import type { PostSummary } from '@/lib/posts'

export default function RecentPostSection({
  recentPosts,
}: {
  recentPosts: PostSummary[]
}) {
  return (
    <section>
      <div className="mb-2 flex flex-row items-center justify-between space-y-0">
        <div>
          <Title size="md" className="mb-4">
            Recent Posts
          </Title>
          <p className="mt-2 text-base text-gray-600 max-sm:text-sm dark:text-gray-300">
            최근에 작성된 포스트들을 확인해보세요.
          </p>
        </div>
        <Link
          href="/posts"
          className="group mt-3 flex w-fit items-center space-x-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:bg-gray-50 max-sm:px-3 max-sm:text-xs dark:border-zinc-700 dark:bg-zinc-800 dark:text-gray-300 dark:hover:bg-zinc-700"
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
  )
}
