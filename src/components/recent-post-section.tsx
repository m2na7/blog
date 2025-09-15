import Link from 'next/link'

import PostCard from '@/components/post-card'
import Title from '@/components/title'
import type { PostSummary } from '@/lib/posts'

export default function RecentPostSection({
  recentPosts,
}: {
  recentPosts: PostSummary[]
}) {
  return (
    <section>
      <div className="mb-6 flex flex-row items-center justify-between space-y-0">
        <div className="space-y-3">
          <Title size="md">Recent Posts</Title>
          <p className="text-zinc-600 max-sm:text-sm dark:text-zinc-300">
            최근에 공유된 포스트들을 확인해보세요.
          </p>
        </div>

        <Link
          href="/posts"
          className="group mt-8 flex w-fit items-center space-x-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-all focus:bg-gray-50 active:bg-gray-100 max-sm:px-3 max-sm:text-xs md:hover:bg-gray-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-gray-300 dark:focus:bg-zinc-700 dark:active:bg-zinc-600 dark:md:hover:bg-zinc-700"
        >
          <span>전체 보기</span>
          <span className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>

      <div className="flex gap-8 max-sm:flex-col">
        {recentPosts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  )
}
