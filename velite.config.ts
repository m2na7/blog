import rehypeShiki from '@shikijs/rehype'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'
import remarkDirective from 'remark-directive'
import { defineConfig, s } from 'velite'

import { remarkCallout } from './src/lib/remark-callout'

const getReadingTime = (content: string): number => {
  const cleanContent = content
    .replace(/```[\s\S]*?```/g, '')
    .replace(/!\[.*?\]\(.*?\)/g, '')
    .replace(/\[.*?\]\(.*?\)/g, '')
    .replace(/[#*`_~]/g, '')
    .replace(/\s+/g, ' ')
    .trim()

  const koreanChars = (
    cleanContent.match(
      /[\u3131-\u314e\u314f-\u3163\uac00-\ud7a3\u4e00-\u9fff]/g
    ) || []
  ).length
  const englishWords = (cleanContent.match(/[a-zA-Z]+/g) || []).length

  const readingTimeMinutes = koreanChars / 300 + englishWords / 200

  return Math.max(Math.ceil(readingTimeMinutes), 1)
}

export default defineConfig({
  root: 'content',
  output: {
    data: '.velite',
    assets: 'public/static',
    base: '/static/',
    name: '[name]-[hash:6].[ext]',
    clean: true,
  },
  mdx: {
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
      [
        rehypeShiki,
        {
          themes: {
            light: 'github-light',
            dark: 'github-dark',
          },
        },
      ],
    ],
    remarkPlugins: [remarkDirective, remarkCallout],
  },
  collections: {
    posts: {
      name: 'Post',
      pattern: 'posts/**/index.mdx',
      schema: s
        .object({
          title: s.string().max(99),
          date: s.isodate(),
          description: s.string().max(999),
          draft: s.boolean().default(false),
          image: s.string().optional(),
          thumbnail: s.image().optional(),
          slug: s.slug('posts'),
          metadata: s.metadata(),
          excerpt: s.excerpt(),
          content: s.markdown(),
          code: s.mdx(),
        })
        .transform((data) => ({
          ...data,
          permalink: `/posts/${data.slug}`,
          readingTime: getReadingTime(data.content),
        })),
    },
  },
})
