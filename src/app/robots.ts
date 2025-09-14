import type { MetadataRoute } from 'next'

import { BLOG_CONFIG } from '@/constants/config'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${BLOG_CONFIG.url}/sitemap.xml`,
  }
}
