import rehypeShiki from '@shikijs/rehype'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'
import remarkDirective from 'remark-directive'
import { defineConfig, s } from 'velite'

import { remarkCallout } from './src/lib/remark-callout'

const getReadingTime = (content: string): number => {
  return Math.max(Math.floor(content.split(' ').length / 250), 1)
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
      pattern: 'posts/**/*.mdx',
      schema: s
        .object({
          title: s.string().max(99),
          date: s.isodate(),
          description: s.string().max(999),
          tags: s.array(s.string()),
          draft: s.boolean().default(false),
          image: s.string().optional(),
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
