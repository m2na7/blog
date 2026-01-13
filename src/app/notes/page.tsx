import { Metadata } from 'next'

import NoteList from '@/components/list/note-list'
import Pagination from '@/components/pagination'
import Title from '@/components/title'
import { BLOG_CONFIG } from '@/constants/config'
import { getPaginatedNotes } from '@/lib/notes'
import {
  generatePaginatedParams,
  getCurrentPageFromSearchParams,
} from '@/utils/pagination'

interface NotesPageProps {
  searchParams: Promise<{
    page?: string
  }>
}

export const metadata: Metadata = {
  title: 'Notes',
  description: `개인적인 회고와 생각을 기록하고 공유해요.`,
}

export async function generateStaticParams() {
  return generatePaginatedParams(getPaginatedNotes, BLOG_CONFIG.postsPerPage)
}

export default async function NotesPage({ searchParams }: NotesPageProps) {
  const resolvedSearchParams = await searchParams
  const currentPage = getCurrentPageFromSearchParams(resolvedSearchParams)
  const { notes, pagination } = getPaginatedNotes(
    currentPage,
    BLOG_CONFIG.postsPerPage
  )

  return (
    <>
      <header className="mb-2 space-y-2">
        <Title size="lg">Notes</Title>
        <h2 className="text-[15px] text-zinc-600 max-sm:text-sm dark:text-zinc-300">
          개인적인 회고와 생각을 기록하고 공유해요.
        </h2>
      </header>

      <div className="divide-y divide-gray-100 dark:divide-gray-800">
        {notes.map((note) => (
          <NoteList key={note.slug} note={note} />
        ))}
      </div>

      <Pagination
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        basePath="/notes"
      />
    </>
  )
}
