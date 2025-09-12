import { talks } from '../../.velite'
import type { Talk } from '../../.velite'

export interface TalkData extends Talk {}

export interface TalkSummary extends Omit<Talk, 'content' | 'code'> {}

/**
 * 모든 발표의 메타데이터를 가져오는 함수
 * @returns 발표 메타데이터 배열 (최신순 정렬)
 */
export function getAllTalks(): TalkSummary[] {
  const publishedTalks = talks.filter(
    (talk) => !(talk.draft && process.env.NODE_ENV === 'production')
  )

  return publishedTalks
    .map((talk) => {
      const { content, code, ...talkWithoutContent } = talk
      return talkWithoutContent
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

/**
 * 특정 발표의 상세 데이터를 가져오는 함수
 * @param slug - 발표 슬러그
 * @returns 발표 상세 데이터
 */
export function getTalkBySlug(slug: string): TalkData | null {
  const talk = talks.find((t) => t.slug === slug)

  if (!talk) {
    return null
  }

  if (talk.draft && process.env.NODE_ENV === 'production') {
    return null
  }

  return talk
}

/**
 * 페이지네이션된 발표 목록을 가져오는 함수
 * @param page - 페이지 번호 (1부터 시작)
 * @param pageSize - 페이지당 발표 수
 * @returns 페이지네이션된 발표 데이터와 메타정보
 */
export function getPaginatedTalks(page: number = 1, pageSize: number = 10) {
  const allTalks = getAllTalks()
  const totalTalks = allTalks.length
  const totalPages = Math.ceil(totalTalks / pageSize)
  const startIndex = (page - 1) * pageSize
  const endIndex = startIndex + pageSize
  const talksSlice = allTalks.slice(startIndex, endIndex)

  return {
    talks: talksSlice,
    pagination: {
      currentPage: page,
      totalPages,
      totalTalks,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    },
  }
}
