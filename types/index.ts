export interface ArticlePost {
    id: string
    title: string
    date: string
}

export interface ArticleItem {
    image: string
    category: string
    title: string
    author: string
    date: string
    language: string
}

export type BookMeta = {
    id: string
    title: string
    author: string
    translator?: string
    image: string
}

export type Book = BookMeta & {
    content: string
}