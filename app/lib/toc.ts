import { remark } from 'remark'
import { visit } from 'unist-util-visit'
import GithubSlugger from 'github-slugger'

export interface Heading {
  id: string
  text: string
  level: 2 | 3
}

// Recursively collect text from a node and all its descendants,
// so emphasis/strong/link/inlineCode wrappers don't swallow words.
function getNodeText(node: any): string {
  if (node.type === 'text' || node.type === 'inlineCode') {
    return node.value ?? ''
  }
  if (Array.isArray(node.children)) {
    return node.children.map(getNodeText).join('')
  }
  return ''
}

export function extractHeadings(content: string): Heading[] {
  const tree = remark().parse(content)
  const slugger = new GithubSlugger()
  const headings: Heading[] = []

  visit(tree, 'heading', (node: any) => {
    if (node.depth !== 2 && node.depth !== 3) return

    const text = getNodeText(node).trim()
    if (!text) return

    headings.push({
      id: slugger.slug(text),
      text,
      level: node.depth,
    })
  })

  return headings
}