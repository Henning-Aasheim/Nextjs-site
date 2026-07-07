declare module '*.mdx' {
  import type { MDXProps } from 'mdx/types'
  export const frontmatter: {
    image: string
    category: string
    title: string
    author: string
    date: string
    language: string
  }
  const MDXContent: (props: MDXProps) => JSX.Element
  export default MDXContent
}