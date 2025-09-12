import fs from 'fs'
import path from 'path'

import matter from 'gray-matter'
import readingTime from 'reading-time'

import { compileMDXToCode } from './mdx'

export interface PostFrontmatter {
  title: string
  date: string
  description: string
  tags: string[]
  draft?: boolean
  image?: string
}

export interface PostData extends PostFrontmatter {
  slug: string
  content: string
  code?: string
  readingTime: string
  excerpt: string
}

const postsDirectory = path.join(process.cwd(), 'content/posts')

/**
 * 모든 포스트의 메타데이터를 가져오는 함수
 * @returns 포스트 메타데이터 배열 (최신순 정렬)
 */
export function getAllPosts(): Omit<PostData, 'content'>[] {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  const posts = fileNames
    .filter((name) => name.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)
      const frontmatter = data as PostFrontmatter

      if (frontmatter.draft && process.env.NODE_ENV === 'production') {
        return null
      }

      const excerpt =
        content
          .replace(/^#.*$/gm, '')
          .replace(/```[\s\S]*?```/g, '')
          .replace(/!\[.*?\]\(.*?\)/g, '')
          .replace(/\[.*?\]\(.*?\)/g, '')
          .replace(/[#*`]/g, '')
          .trim()
          .slice(0, 150) + '...'

      return {
        slug,
        ...frontmatter,
        excerpt,
        readingTime: readingTime(content).text,
      }
    })
    .filter(Boolean) as Omit<PostData, 'content'>[]

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

/**
 * 특정 포스트의 상세 데이터를 가져오는 함수
 * @param slug - 포스트 슬러그
 * @param includeMDX - MDX 컴파일 여부 (기본값: false)
 * @returns 포스트 상세 데이터
 */
export async function getPostBySlug(
  slug: string,
  includeMDX: boolean = false
): Promise<PostData | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    const frontmatter = data as PostFrontmatter

    if (frontmatter.draft && process.env.NODE_ENV === 'production') {
      return null
    }

    const excerpt =
      content
        .replace(/^#.*$/gm, '')
        .replace(/```[\s\S]*?```/g, '')
        .replace(/!\[.*?\]\(.*?\)/g, '')
        .replace(/\[.*?\]\(.*?\)/g, '')
        .replace(/[#*`]/g, '')
        .trim()
        .slice(0, 150) + '...'

    const postData: PostData = {
      slug,
      ...frontmatter,
      content,
      excerpt,
      readingTime: readingTime(content).text,
    }

    if (includeMDX) {
      postData.code = await compileMDXToCode(content)
    }

    return postData
  } catch (error) {
    return null
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
  const posts = allPosts.slice(startIndex, endIndex)

  return {
    posts,
    pagination: {
      currentPage: page,
      totalPages,
      totalPosts,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    },
  }
}

/**
 * 태그별 포스트를 가져오는 함수
 * @param tag - 태그명
 * @returns 해당 태그를 가진 포스트 배열
 */
export function getPostsByTag(tag: string): Omit<PostData, 'content'>[] {
  const allPosts = getAllPosts()
  return allPosts.filter((post) =>
    post.tags.some((postTag) => postTag.toLowerCase() === tag.toLowerCase())
  )
}

/**
 * 모든 태그를 가져오는 함수 (사용 빈도순 정렬)
 * @returns 태그 배열과 각 태그의 포스트 수
 */
export function getAllTags(): { name: string; count: number }[] {
  const allPosts = getAllPosts()
  const tagCount: Record<string, number> = {}

  allPosts.forEach((post) => {
    post.tags.forEach((tag) => {
      tagCount[tag] = (tagCount[tag] || 0) + 1
    })
  })

  return Object.entries(tagCount)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
}
