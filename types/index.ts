export interface ArticlePost {
    id: string
    title: string
    date: string
}

export type ArticleCategory =
  | 'politics'
  | 'international'
  | 'economy'
  | 'society'
  | 'webDevelopment'

export interface ArticleMeta {
    image: string
    category: ArticleCategory
    tags?: string[]
    title: string
    author: string
    date: string
    language: string
}

export interface ArticleContent {
    id: string
    frontmatter: ArticleMeta
    content: string
}

export type Era = 'BCE'|'CE'

export type YearValue = {
  value: number; // 1, 2, 3, ... always positive
  era: Era;
  approx?: boolean;
};

export type YearRange = {
  start: YearValue;
  end: YearValue;
  approx?: boolean;
};

export type BookEra = 'archaic' | 'classical' | 'medieval' | 'earlyModern' | 'modern'

export type BookMeta = {
    id: string
    title: string
    author: string
    date: string
    translator?: string[]
    image: string
    year?: YearValue
    yearRange?: YearRange
    era?: BookEra
}

export type Book = BookMeta & {
    content: string
}