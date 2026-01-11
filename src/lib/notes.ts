import { notes } from '../../.velite'
import type { Note } from '../../.velite'

export interface NoteData extends Note {
  readingTimeText: string
}

export interface NoteSummary extends Omit<Note, 'content' | 'code'> {
  readingTimeText: string
}

/**
 * 모든 노트의 메타데이터를 가져오는 함수
 * @returns 노트 메타데이터 배열 (최신순 정렬)
 */
export function getAllNotes(): NoteSummary[] {
  const publishedNotes = notes.filter(
    (note) => !(note.draft && process.env.NODE_ENV === 'production')
  )

  return publishedNotes
    .map((note) => {
      const { content, code, ...noteWithoutContent } = note
      return {
        ...noteWithoutContent,
        readingTimeText: `${note.readingTime} min read`,
      }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

/**
 * 특정 노트의 상세 데이터를 가져오는 함수
 * @param slug - 노트 슬러그
 * @returns 노트 상세 데이터
 */
export function getNoteBySlug(slug: string): NoteData | null {
  const note = notes.find((n) => n.slug === slug)

  if (!note) {
    return null
  }

  if (note.draft && process.env.NODE_ENV === 'production') {
    return null
  }

  return {
    ...note,
    readingTimeText: `${note.readingTime} min read`,
  }
}

/**
 * 페이지네이션된 노트 목록을 가져오는 함수
 * @param page - 페이지 번호 (1부터 시작)
 * @param pageSize - 페이지당 노트 수
 * @returns 페이지네이션된 노트 데이터와 메타정보
 */
export function getPaginatedNotes(page: number = 1, pageSize: number = 10) {
  const allNotes = getAllNotes()
  const totalNotes = allNotes.length
  const totalPages = Math.ceil(totalNotes / pageSize)
  const startIndex = (page - 1) * pageSize
  const endIndex = startIndex + pageSize
  const notesSlice = allNotes.slice(startIndex, endIndex)

  return {
    notes: notesSlice,
    pagination: {
      currentPage: page,
      totalPages,
      totalNotes,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    },
  }
}

/**
 * 이전/다음 노트 정보를 가져오는 함수
 * @param currentSlug - 현재 노트 슬러그
 * @returns 이전/다음 노트 정보
 */
export function getAdjacentNotes(currentSlug: string) {
  const allNotes = getAllNotes()
  const currentIndex = allNotes.findIndex((note) => note.slug === currentSlug)

  if (currentIndex === -1) {
    return { prevNote: null, nextNote: null }
  }

  return {
    prevNote:
      currentIndex < allNotes.length - 1 ? allNotes[currentIndex + 1] : null,
    nextNote: currentIndex > 0 ? allNotes[currentIndex - 1] : null,
  }
}
