import Image from 'next/image'
import Link from 'next/link'

import { IntroDock } from '@/components/intro-dock'
import PostCard from '@/components/post-card'
import Title from '@/components/title'
import { getAllPosts } from '@/lib/posts'
import type { PostSummary } from '@/lib/posts'

export default function HomePage() {
  const allPosts = getAllPosts()
  const recentPosts = allPosts.slice(0, 2)

  return (
    <div className="space-y-12 max-sm:space-y-8">
      <AboutMeSection />
      {recentPosts.length > 0 && (
        <RecentPostSection recentPosts={recentPosts} />
      )}
    </div>
  )
}

function AboutMeSection() {
  return (
    <section className="space-y-8 border-b border-gray-200 pb-8 transition-colors duration-200 dark:border-zinc-700">
      <div className="flex">
        <Image
          src="/assets/m2na_profile.png"
          alt="profile"
          width={120}
          height={120}
          className="rounded-full object-cover"
        />
      </div>
      <div className="space-y-6 text-sm leading-relaxed">
        <p>Frontend Engineer 강민하입니다. 👋 </p>
        <div className="space-y-1">
          <p>
            무엇을 만들든 ‘왜’를 먼저 고민하며, 더 나은 방법을 찾아가는 과정을
            즐깁니다.
          </p>
          <p>
            지식과 경험을 나누며 동료와 함께 지속적으로 성장하고, 서로의
            인사이트를 주고받는 과정을 중시해요.
          </p>
        </div>

        <p className="mb-1">
          다양한 오픈소스에 기여하며 커뮤니티와 함께 성장하고 있어요.
        </p>
        <ul className="ml-4 space-y-1">
          <li>
            • TanStack (
            <a
              href="https://github.com/TanStack/query/pulls?q=author%3Am2na7+is%3Aclosed"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TanStack Query Pull Request list"
            >
              query
            </a>
            ,{' '}
            <a
              href="https://github.com/TanStack/form/pulls?q=author%3Am2na7+is%3Aclosed"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TanStack Form Pull Request list"
            >
              form
            </a>
            )
          </li>
          <li>
            • toss (
            <a
              href="https://github.com/toss/suspensive/pulls?q=author%3Am2na7+is%3Aclosed"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Toss Suspensive Pull Request list"
            >
              suspensive
            </a>
            ,{' '}
            <a
              href="https://github.com/toss/react-simplikit/pulls?q=author%3Am2na7+is%3Aclosed"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Toss React-Simplikit Pull Request list"
            >
              react-simplikit
            </a>
            )
          </li>
          <li>
            •{' '}
            <a
              href="https://github.com/react-hook-form/react-hook-form/pulls?q=author%3Am2na7+is%3Aclosed"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="React Hook Form Pull Request list"
            >
              react-hook-form
            </a>
          </li>
        </ul>
      </div>

      <IntroDock />
    </section>
  )
}

function RecentPostSection({ recentPosts }: { recentPosts: PostSummary[] }) {
  return (
    <section>
      <div className="mb-6 flex flex-row items-center justify-between space-y-0">
        <div className="space-y-3">
          <Title size="md">Recent Posts</Title>
          <h2 className="text-[15px] text-zinc-600 max-sm:text-sm dark:text-zinc-300">
            최근에 공유된 포스트들을 확인해보세요.
          </h2>
        </div>

        <Link
          href="/posts"
          className="group mt-8 flex w-fit items-center space-x-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-all focus:bg-gray-50 active:bg-gray-100 max-sm:px-3 max-sm:text-xs md:hover:bg-gray-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-gray-300 dark:focus:bg-zinc-700 dark:active:bg-zinc-600 dark:md:hover:bg-zinc-700"
          aria-label="포스트 전체 보기"
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
