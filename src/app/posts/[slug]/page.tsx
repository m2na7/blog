import Image from 'next/image'
import { notFound } from 'next/navigation'

import { Calendar, Clock } from 'lucide-react'
import { Metadata } from 'next'

import { mdxComponents } from '@/components/mdx-components'
import { MDXContent } from '@/components/mdx-contents'
import Title from '@/components/title'
import { BLOG_CONFIG } from '@/constants/config'
import { getAllPosts, getPostBySlug } from '@/lib/posts'
import { formatDate } from '@/utils/date'

interface PostPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const resolvedParams = await params
  const post = getPostBySlug(resolvedParams.slug)

  if (!post) {
    return {
      title: '포스트를 찾을 수 없습니다',
    }
  }

  const ogImage = `${BLOG_CONFIG.url}${post.image}`

  return {
    title: post.title,
    description: post.description || post.excerpt,
    openGraph: {
      title: post.title,
      description: post.description || post.excerpt,
      type: 'article',
      publishedTime: post.date,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description || post.excerpt,
      images: [ogImage],
    },
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const resolvedParams = await params
  const post = getPostBySlug(resolvedParams.slug)

  if (!post) {
    notFound()
  }

  return (
    <article>
      {post.thumbnail && (
        <div className="relative mb-8 aspect-[7/4]">
          <Image
            src={post.thumbnail.src}
            alt={post.title}
            fill
            className="rounded-2xl object-cover"
            blurDataURL={post.thumbnail.blurDataURL}
          />
        </div>
      )}

      {/* 포스트 헤더 */}
      <header className="mt-2 mb-8 space-y-6 border-b border-gray-200 pb-8 max-sm:space-y-4 max-sm:pb-6 dark:border-zinc-600">
        <div className="space-y-6 max-sm:space-y-4">
          <Title size="xl">{post.title}</Title>

          {post.description && (
            <p className="text-lg leading-relaxed text-gray-600 max-sm:text-base dark:text-gray-300">
              {post.description}
            </p>
          )}
        </div>

        {/* 메타 정보 */}
        <div className="flex flex-row items-center justify-between gap-4">
          <div className="flex flex-row items-center space-y-0 space-x-4 text-sm text-gray-600 dark:text-gray-300">
            <time dateTime={post.date} className="flex items-center">
              <Calendar className="mr-1.5 h-4 w-4 max-sm:h-3 max-sm:w-3" />
              {formatDate(post.date)}
            </time>

            {post.readingTimeText && (
              <span className="flex items-center">
                <Clock className="mr-1.5 h-4 w-4 max-sm:mr-1 max-sm:h-3 max-sm:w-3" />
                {post.readingTimeText}
              </span>
            )}
          </div>
        </div>
      </header>

      {/* 포스트 내용 */}
      <div className="prose prose-slate dark:prose-invert prose-base max-sm:prose-sm max-w-none">
        <MDXContent code={post.code} components={mdxComponents} />
      </div>
    </article>
  )
}
