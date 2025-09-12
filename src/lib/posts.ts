import { posts } from '../../.velite'
import type { Post } from '../../.velite'

export interface PostData extends Post {
  readingTimeText: string
}

export interface PostSummary extends Omit<Post, 'content' | 'code'> {
  readingTimeText: string
}

/**
 * 모든 포스트의 메타데이터를 가져오는 함수
 * @returns 포스트 메타데이터 배열 (최신순 정렬)
 */
export function getAllPosts(): PostSummary[] {
  const publishedPosts = posts.filter(
    (post) => !(post.draft && process.env.NODE_ENV === 'production')
  )

  return publishedPosts
    .map((post) => {
      const { content, code, ...postWithoutContent } = post
      return {
        ...postWithoutContent,
        readingTimeText: `${post.readingTime} min read`,
      }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

/**
 * 특정 포스트의 상세 데이터를 가져오는 함수
 * @param slug - 포스트 슬러그
 * @returns 포스트 상세 데이터
 */
export function getPostBySlug(slug: string): PostData | null {
  const post = posts.find((p) => p.slug === slug)

  if (!post) {
    return null
  }

  if (post.draft && process.env.NODE_ENV === 'production') {
    return null
  }

  return {
    ...post,
    readingTimeText: `${post.readingTime} min read`,
  }
}

/**
 * 페이지네이션된 포스트 목록을 가져오는 함수
 * @param page - 페이지 번호 (1부터 시작)
 * @param pageSize - 페이지당 포스트 수
 * @returns 페이지네이션된 포스트 데이터와 메타정보
 */
export function getPaginatedPosts(page: number = 1, pageSize: number = 10) {
  const allPosts = getAllPosts()
  const totalPosts = allPosts.length
  const totalPages = Math.ceil(totalPosts / pageSize)
  const startIndex = (page - 1) * pageSize
  const endIndex = startIndex + pageSize
  const postsSlice = allPosts.slice(startIndex, endIndex)

  return {
    posts: postsSlice,
    pagination: {
      currentPage: page,
      totalPages,
      totalPosts,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    },
  }
}
