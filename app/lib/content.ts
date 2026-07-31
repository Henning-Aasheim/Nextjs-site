import { ArticleContent } from "@/types"
import { CivitaItem } from "../[locale]/about/page" 
import type { Cards } from "../../components/cards"
import type { List } from "@/components/lists"

export function articleToCard(article: ArticleContent): Cards {
  return {
    id: article.id,
    title: article.frontmatter.title,
    image: article.frontmatter.image,
    excerpt: article.excerpt,
    date: article.frontmatter.date,
    category: article.frontmatter.category,
    href: `/articles/${article.id}`,
    external: false,
  }
}

export function civitaToCard(item: CivitaItem): Cards {
  return {
    id: item.id,
    title: item.title,
    image: item.image,
    excerpt: item.excerpt,
    date: item.date,
    category: item.category,
    href: item.url,
    external: true,
  }
}

export function articleToList(article: ArticleContent): List {
  return {
    id: article.id,
    title: article.frontmatter.title,
    date: article.frontmatter.date,
    category: article.frontmatter.category,
    href: `/articles/${article.id}`,
    external: false,
  }
}

export function civitaToList(item: CivitaItem): List {
  return {
    id: item.id,
    title: item.title,
    date: item.date,
    category: item.category,
    href: item.url,
    external: true,
  }
}