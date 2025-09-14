import type { MetadataRoute } from 'next'

import { BLOG_CONFIG } from '@/constants/config'
import { getAllPosts } from '@/lib/posts'
import { getAllTalks } from '@/lib/talks'

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts()
  const talks = getAllTalks()

  const postUrls = posts.map((post) => ({
    url: `${BLOG_CONFIG.url}/posts/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const talkUrls = talks.map((talk) => ({
    url: `${BLOG_CONFIG.url}/talks/${talk.slug}`,
    lastModified: new Date(talk.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [
    {
      url: BLOG_CONFIG.url,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BLOG_CONFIG.url}/posts`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BLOG_CONFIG.url}/talks`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...postUrls,
    ...talkUrls,
  ]
}
