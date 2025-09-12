import Image from 'next/image'

import type { MDXComponents } from 'mdx/types'

export const mdxComponents: MDXComponents = {
  h1: (props) => <h2 {...props} />,
  h2: (props) => <h3 {...props} />,
  h3: (props) => <h4 {...props} />,

  p: (props) => <p {...props} />,
  ul: (props) => <ul {...props} />,
  ol: (props) => <ol {...props} />,
  li: (props) => <li {...props} />,
  blockquote: (props) => <blockquote {...props} />,
  code: (props) => <code {...props} />,
  pre: (props) => <pre {...props} />,
  hr: (props) => <hr {...props} />,
  strong: (props) => <strong {...props} />,
  em: (props) => <em {...props} />,

  a: (props) => (
    <a
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
        className="rounded-lg"
        {...props}
      />
    )
  },
}
