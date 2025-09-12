import { compile } from '@mdx-js/mdx'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeHighlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'

/**
 * 목차(TOC) 항목 타입 정의
 */
export interface TocItem {
  id: string
  title: string
  level: number
}

/**
 * MDX 콘텐츠를 컴파일하는 함수
 * @param content - MDX 마크다운 콘텐츠
 * @returns 컴파일된 MDX 코드 문자열
 */
export async function compileMDXToCode(content: string): Promise<string> {
  try {
    console.log('Compiling MDX content:', content.slice(0, 100) + '...')

    const compiledCode = await compile(content, {
      outputFormat: 'function-body',
      remarkPlugins: [],
      rehypePlugins: [
        rehypeSlug,
        [
          rehypeAutolinkHeadings,
          {
            behavior: 'wrap',
            properties: {
              className: ['anchor'],
            },
          },
        ],
        rehypeHighlight,
      ],
    })

    const codeString = String(compiledCode)
    console.log('MDX compilation successful:', !!codeString)
    return codeString
  } catch (error) {
    console.error('MDX compilation error:', error)
    throw error
  }
}
