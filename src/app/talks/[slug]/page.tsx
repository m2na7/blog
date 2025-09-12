import { notFound } from 'next/navigation'

import { ExternalLink, Play, FileText, Calendar } from 'lucide-react'
import { Metadata } from 'next'

import { MDXContent } from '@/components/mdx-contents'
import Title from '@/components/title'
import { getAllTalks, getTalkBySlug } from '@/lib/talks'
import { formatDate } from '@/utils/date'

interface TalkPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const talks = getAllTalks()
  return talks.map((talk) => ({
    slug: talk.slug,
  }))
}

export async function generateMetadata({
  params,
}: TalkPageProps): Promise<Metadata> {
  const resolvedParams = await params
  const talk = getTalkBySlug(resolvedParams.slug)

  if (!talk) {
    return {}
  }

  return {
    title: talk.title,
    description: talk.description,
    openGraph: {
      title: talk.title,
      description: talk.description,
      type: 'article',
      publishedTime: talk.date,
    },
  }
}

export default async function TalkPage({ params }: TalkPageProps) {
  const resolvedParams = await params
  const talk = getTalkBySlug(resolvedParams.slug)

  if (!talk) {
    notFound()
  }

  return (
    <article className="space-y-8">
      <header className="space-y-6">
        <Title size="lg">{talk.title}</Title>

        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center">
            <Calendar className="mr-1.5 h-4 w-4" />
            {formatDate(talk.date)}
          </div>
          {talk.venue && (
            <div className="flex items-center">
              <span className="mr-1.5">📍</span>
              {talk.venue}
            </div>
          )}
        </div>

        {talk.description && (
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {talk.description}
          </p>
        )}

        <div className="flex flex-wrap gap-3">
          {talk.slides && (
            <a
              href={talk.slides}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-600"
            >
              <FileText className="mr-2 h-4 w-4" />
              발표 자료 보기
              <ExternalLink className="ml-2 h-3 w-3" />
            </a>
          )}

          {talk.demo && (
            <a
              href={talk.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              데모 보기
            </a>
          )}
        </div>
      </header>

      {talk.youtubeId && (
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Play className="h-5 w-5 text-red-500" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              발표 영상
            </h2>
          </div>
          <div className="relative aspect-video overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
            <iframe
              src={`https://www.youtube.com/embed/${talk.youtubeId}`}
              title={talk.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          </div>
        </div>
      )}

      <div className="prose prose-gray dark:prose-invert max-w-none">
        <MDXContent code={talk.code} />
      </div>
    </article>
  )
}
