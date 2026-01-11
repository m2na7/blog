import Image from 'next/image'
import { notFound } from 'next/navigation'

import { Calendar, Clock } from 'lucide-react'
import { Metadata } from 'next'

import { mdxComponents } from '@/components/mdx/mdx-components'
import { MDXContent } from '@/components/mdx/mdx-contents'
import PostNavigation from '@/components/post-navigation'
import ScrollProgressBar from '@/components/scroll-progress-bar'
import Title from '@/components/title'
import { BLOG_CONFIG } from '@/constants/config'
import { getAllNotes, getNoteBySlug, getAdjacentNotes } from '@/lib/notes'
import { formatDate } from '@/utils/date'

interface NotePageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const notes = getAllNotes()
  return notes.map((note) => ({
    slug: note.slug,
  }))
}

export async function generateMetadata({
  params,
}: NotePageProps): Promise<Metadata> {
  const resolvedParams = await params
  const note = getNoteBySlug(resolvedParams.slug)

  if (!note) {
    return {
      title: '노트를 찾을 수 없습니다',
    }
  }

  const ogImage = note.thumbnail
    ? `${BLOG_CONFIG.url}${note.thumbnail.src}`
    : `${BLOG_CONFIG.url}/og-default.png`

  return {
    title: note.title,
    description: note.description || note.excerpt,
    openGraph: {
      title: note.title,
      description: note.description || note.excerpt,
      type: 'article',
      publishedTime: note.date,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: note.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: note.title,
      description: note.description || note.excerpt,
      images: [ogImage],
    },
  }
}

export default async function NotePage({ params }: NotePageProps) {
  const resolvedParams = await params
  const note = getNoteBySlug(resolvedParams.slug)

  if (!note) {
    notFound()
  }

  const { prevNote, nextNote } = getAdjacentNotes(resolvedParams.slug)

  return (
    <>
      <ScrollProgressBar />
      <article>
        {note.thumbnail && (
          <div className="relative mb-8 aspect-[7/4]">
            <Image
              src={note.thumbnail.src}
              alt={note.title}
              fill
              className="rounded-2xl object-cover"
              blurDataURL={note.thumbnail.blurDataURL}
            />
          </div>
        )}

        {/* 노트 헤더 */}
        <header className="mt-2 mb-8 space-y-6 border-b border-gray-200 pb-8 transition-colors duration-200 max-sm:space-y-4 max-sm:pb-6 dark:border-zinc-600">
          <div className="space-y-6 max-sm:space-y-4">
            <Title size="xl">{note.title}</Title>

            {note.description && (
              <p className="text-lg leading-relaxed text-gray-600 max-sm:text-base dark:text-gray-300">
                {note.description}
              </p>
            )}
          </div>

          {/* 메타 정보 */}
          <div className="flex flex-row items-center justify-between gap-4">
            <div className="flex flex-row items-center space-y-0 space-x-4 text-sm text-gray-600 dark:text-gray-300">
              <time dateTime={note.date} className="flex items-center">
                <Calendar className="mr-1.5 h-4 w-4 max-sm:h-3 max-sm:w-3" />
                {formatDate(note.date)}
              </time>

              {note.readingTimeText && (
                <span className="flex items-center">
                  <Clock className="mr-1.5 h-4 w-4 max-sm:mr-1 max-sm:h-3 max-sm:w-3" />
                  {note.readingTimeText}
                </span>
              )}
            </div>
          </div>
        </header>

        {/* 노트 내용 */}
        <div className="prose prose-slate dark:prose-invert prose-base max-sm:prose-sm max-w-none">
          <MDXContent code={note.code} components={mdxComponents} />
        </div>

        {/* 이전/다음 노트 네비게이션 */}
        <PostNavigation prevPost={prevNote} nextPost={nextNote} type="notes" />
      </article>
    </>
  )
}
