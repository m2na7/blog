import type { ComponentType } from 'react'

import Image from 'next/image'

type MDXComponents = Record<string, ComponentType<any>>

export const mdxComponents: MDXComponents = {
  h1: (props) => (
    <h1
      className="mb-4 text-3xl font-bold text-gray-900 dark:text-white"
      {...props}
    />
  ),
  h2: (props) => (
    <h2
      className="mt-8 mb-3 text-2xl font-bold text-gray-900 dark:text-white"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="mt-6 mb-2 text-xl font-semibold text-gray-900 dark:text-white"
      {...props}
    />
  ),

  p: (props) => (
    <p
      className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300"
      {...props}
    />
  ),
  ul: (props) => (
    <ul
      className="mb-4 list-inside list-disc space-y-2 text-gray-700 dark:text-gray-300"
      {...props}
    />
  ),
  ol: (props) => (
    <ol
      className="mb-4 list-inside list-decimal space-y-2 text-gray-700 dark:text-gray-300"
      {...props}
    />
  ),
  li: (props) => <li className="leading-relaxed" {...props} />,
  blockquote: (props) => (
    <blockquote
      className="my-6 border-l-4 border-gray-300 py-2 pl-4 text-gray-600 italic dark:border-gray-600 dark:text-gray-400"
      {...props}
    />
  ),
  code: (props: any) => (
    <code
      className="b rounded-md bg-gray-100 px-1 py-0.5 font-mono text-sm text-gray-800 dark:bg-gray-800 dark:text-gray-200"
      {...props}
    />
  ),
  hr: (props) => (
    <hr className="my-8 border-gray-300 dark:border-gray-600" {...props} />
  ),
  strong: (props) => <strong className="font-semibold" {...props} />,

  a: (props) => (
    <a
      className="text-gray-700 underline decoration-gray-400 transition-colors hover:text-gray-900 hover:decoration-gray-700 dark:text-gray-300 dark:hover:text-white dark:hover:decoration-gray-200"
      target={props.href?.startsWith('http') ? '_blank' : undefined}
      rel={props.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      {...props}
    />
  ),

  img: ({
    src,
    alt,
    ...props
  }: {
    src?: string
    alt?: string
    [key: string]: any
  }) => {
    if (!src) return null

    return (
      <Image
        src={src}
        alt={alt || ''}
        width={672}
        height={400}
        className="my-6 w-full rounded-lg"
        {...props}
      />
    )
  },
}
