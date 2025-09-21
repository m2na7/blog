import Image from 'next/image'
import Link from 'next/link'

import { Marquee } from '@/components/ui/marquee'
import type { PostSummary } from '@/lib/posts'
import { cn } from '@/utils/cn'

interface PostMarqueeProps {
  posts: PostSummary[]
}

const PostCard = ({ post }: { post: PostSummary }) => {
  const thumbnail = (post as any).thumbnail

  return (
    <Link href={`/posts/${post.slug}`}>
      <article
        className={cn(
          'relative h-[200px] w-64 overflow-hidden rounded-lg shadow-sm transition-all duration-300',
          'hover:scale-[1.02] hover:shadow-md',
          'max-sm:h-[180px] max-sm:w-56'
        )}
      >
        {thumbnail ? (
          <Image
            src={thumbnail}
            alt={`${post.title} 썸네일`}
            fill
            className="pointer-events-none object-cover transition-all duration-300 select-none hover:blur-sm"
            draggable={false}
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-gray-400 to-gray-600 transition-all duration-300 select-none hover:blur-sm" />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        <div className="relative flex h-full flex-col justify-end p-4 max-sm:p-3">
          <h3 className="text-[15px] leading-normal font-semibold text-white max-sm:text-sm">
            {post.title}
          </h3>
        </div>

        <div className="absolute inset-0 flex items-center bg-black/70 p-4 opacity-0 transition-opacity duration-300 hover:opacity-100 active:opacity-100 max-sm:p-3 dark:bg-black/80">
          <p className="text-center text-sm font-medium text-white/95 max-sm:text-xs max-sm:leading-relaxed">
            {post.description || post.excerpt}
          </p>
        </div>
      </article>
    </Link>
  )
}

export function PostMarquee({ posts }: PostMarqueeProps) {
  const firstRow = posts.slice(0, Math.ceil(posts.length / 2))
  const secondRow = posts.slice(Math.ceil(posts.length / 2))

  return (
    <div className="relative mx-auto flex max-w-[1000px] flex-col max-sm:max-w-full">
      <Marquee
        pauseOnHover
        className="[--duration:40s] [--gap:1rem] max-sm:[--duration:35s] max-sm:[--gap:0.75rem]"
      >
        {firstRow.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </Marquee>
      <Marquee
        reverse
        pauseOnHover
        className="mt-2 [--duration:40s] [--gap:1rem] max-sm:[--duration:35s] max-sm:[--gap:0.75rem]"
      >
        {secondRow.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent max-sm:w-16 dark:from-zinc-900"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent max-sm:w-16 dark:from-zinc-900"></div>
    </div>
  )
}
