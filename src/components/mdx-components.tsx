import type { ComponentType } from 'react'

import Image from 'next/image'

type MDXComponents = Record<string, ComponentType<any>>

export const mdxComponents: MDXComponents = {
  h1: (props) => (
    <div className="mb-6 max-sm:mb-4">
      <h1
        className="mb-3 text-3xl font-bold text-gray-900 max-sm:mb-2 max-sm:text-2xl dark:text-white"
        {...props}
      />
      <hr className="border-gray-200 dark:border-gray-700" />
    </div>
  ),
  h2: (props) => (
    <div className="mt-12 mb-6 max-sm:mt-8 max-sm:mb-4">
      <h2
        className="mb-3 text-2xl font-bold text-gray-900 max-sm:mb-2 max-sm:text-xl dark:text-white"
        {...props}
      />
      <hr className="border-gray-200 dark:border-gray-700" />
    </div>
  ),
  h3: (props) => (
    <h3
      className="mt-6 mb-2 text-xl font-semibold text-gray-900 max-sm:mt-4 max-sm:mb-1 max-sm:text-lg dark:text-white"
      {...props}
    />
  ),

  p: (props) => (
    <p
      className="mb-4 leading-relaxed text-gray-700 max-sm:mb-3 dark:text-gray-200"
      {...props}
    />
  ),
  ul: (props) => (
    <ul
      className="mb-4 list-inside list-disc space-y-2 text-gray-700 max-sm:mb-3 max-sm:space-y-1 dark:text-gray-200"
      {...props}
    />
  ),
  ol: (props) => (
    <ol
      className="mb-4 list-inside list-decimal space-y-2 text-gray-700 max-sm:mb-3 max-sm:space-y-1 dark:text-gray-200"
      {...props}
    />
  ),
  li: (props) => <li className="leading-relaxed" {...props} />,
  blockquote: (props) => (
    <blockquote
      className="my-6 border-l-4 border-blue-400 pt-2 pb-[0.5px] pl-4 text-base text-gray-400 italic max-sm:my-4 dark:border-zinc-400 dark:text-gray-100"
      {...props}
    />
  ),
  code: (props: any) => (
    <code
      className="mr-[2px] rounded-md bg-stone-100 px-1 py-0.5 font-mono text-sm text-zinc-700 transition-colors duration-200 max-sm:text-xs dark:bg-zinc-700 dark:text-zinc-100"
      {...props}
    />
  ),
  hr: (props) => (
    <hr className="my-8 border-gray-300 dark:border-gray-600" {...props} />
  ),
  strong: (props) => <strong className="font-semibold" {...props} />,

  a: (props) => (
    <a
      className="text-gray-700 underline decoration-gray-400 transition-colors hover:text-gray-900 hover:decoration-gray-700 dark:text-gray-200 dark:hover:text-white dark:hover:decoration-gray-200"
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
        className="my-1 w-full rounded-lg"
        {...props}
      />
    )
  },
}
