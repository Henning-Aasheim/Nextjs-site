import type { MDXComponents } from 'mdx/types'
import { BarChart } from '@/components/bar'
import { DropCap } from '@/components/dropcap'
import { Lang } from '@/components/languages'
import { Term } from '@/components/tooltip'
import Link from 'next/link'
 
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    BarChart: (props) => <BarChart {...props} />,
    Link: (props) => <Link {...props} />,
    DropCap: (props) => <DropCap {...props} />,
    Lang: (props) => <Lang {...props} />,
    Term: (props) => <Term {...props} />,
  }
}

// How to solve Uncaught Error: Expected component `COMPONENT_NAME` to be defined: you likely forgot to import, pass, or provide it.
//
// Solution: The problem was that I used MDXRemote for the books, and import() for all the others. This meant that the components never worked on books, but did on articles and the colophon. Now the rendering engines have been harmonised.