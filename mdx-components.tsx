import type { MDXComponents } from 'mdx/types'
import { BarChart } from '@/components/bar'
import { DropCap } from '@/components/dropcap'
import { Lang } from '@/components/languages'
import Link from 'next/link'
 
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    BarChart: (props) => <BarChart {...props} />,
    Link: (props) => <Link {...props} />,
    DropCap: (props) => <DropCap {...props} />,
    Lang: (props) => <Lang {...props} />,
  }
}