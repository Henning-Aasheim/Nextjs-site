import type { MDXComponents } from 'mdx/types'
import BarChart from '@/components/bar' 
import Link from 'next/link'
 
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    BarChart,
    Link,
  }
}