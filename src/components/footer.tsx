import Link from 'next/link'

import { Github, Linkedin } from 'lucide-react'

import { BLOG_CONFIG } from '@/constants/config'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="mt-14 dark:bg-slate-800">
      <div className="mx-auto flex max-w-2xl flex-col items-end gap-6 border-t border-gray-200 px-2 py-10 dark:border-slate-600">
        <p className="mb-4 text-center text-sm text-gray-600 md:mb-0 md:text-left dark:text-gray-400">
          © {currentYear} {BLOG_CONFIG.author}. All rights reserved.
        </p>

        <div className="flex items-center space-x-4">
          {BLOG_CONFIG.social.github && (
            <Link
              href={BLOG_CONFIG.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </Link>
          )}

          {BLOG_CONFIG.social.linkedin && (
            <Link
              href={BLOG_CONFIG.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </Link>
          )}
        </div>
      </div>
    </footer>
  )
}
