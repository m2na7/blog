import type { MDXComponents } from 'mdx/types'
import * as runtime from 'react/jsx-runtime'

interface MDXProps {
  code: string
  components?: MDXComponents
}

export function MDXContent({ code, components }: MDXProps) {
  const Component = useMDXComponent(code)
  return <Component components={components} />
}

function useMDXComponent(code: string) {
  const fn = new Function(code)
  return fn({ ...runtime }).default
}
