export const BLOG_CONFIG = {
  title: 'm2na.dev',
  description: '기록하고 공유해요.',
  author: 'Minha Kang',
  url: 'https://m2na.dev',

  postsPerPage: 5,
  enableComments: true,
  enableAnalytics: true,

  social: {
    github: 'https://github.com/m2na7',
    linkedin: 'https://linkedin.com/in/m2na',
    email: 'mailto:minha3082@naver.com',
  },

  navigation: [
    { name: 'Posts', href: '/posts' },
    { name: 'Talks', href: '/talks' },
  ],
} as const

export type BLOG_CONFIG = typeof BLOG_CONFIG
