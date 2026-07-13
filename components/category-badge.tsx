import { useTranslations } from 'next-intl'
import { ArticleCategory } from '@/types'

export const CATEGORY_STYLES: Record<ArticleCategory, string> = {
  politics: `
    bg-primary/15 text-primary border border-primary/40
    dark:bg-[color-mix(in_srgb,var(--color-primary)_20%,var(--color-darkNavyLight))]
    dark:text-white dark:border-primary/50
  `,
  international: `
    bg-secondary/15 text-secondary border border-secondary/40
    dark:bg-[color-mix(in_srgb,var(--color-secondary)_20%,var(--color-darkNavyLight))]
    dark:text-white dark:border-secondary/50
  `,
  economy: `
    bg-danger/15 text-danger border border-danger/40
    dark:bg-[color-mix(in_srgb,var(--color-danger)_20%,var(--color-darkNavyLight))]
    dark:text-white dark:border-danger/50
  `,
  society: `
    bg-gold/15 text-darkGold border border-gold/40
    dark:bg-[color-mix(in_srgb,var(--color-gold)_20%,var(--color-darkNavyLight))]
    dark:text-white dark:border-gold/50
  `,
  webDevelopment: `
    bg-purple/15 text-purple border border-purple/40
    dark:bg-[color-mix(in_srgb,var(--color-purple)_25%,var(--color-darkNavyLight))]
    dark:text-white dark:border-purple/50
  `,
}

// Outline-only, lighter weight — used for the tag system, always
// tied to the parent article's category color.
export const TAG_STYLES: Record<ArticleCategory, string> = {
  politics: `text-primary border border-primary/40 dark:text-primary/90 dark:border-primary/40`,
  international: `text-secondary border border-secondary/40 dark:text-secondary/90 dark:border-secondary/40`,
  economy: `text-danger border border-danger/40 dark:text-danger/90 dark:border-danger/40`,
  society: `text-darkGold border border-gold/40 dark:text-gold dark:border-gold/40`,
  webDevelopment: `text-purple border border-purple/40 dark:text-purple/90 dark:border-purple/40`,
}

export const CATEGORY_TEXT: Record<ArticleCategory, string> = {
  politics: `text-politics-text dark:text-politics-text`,
  international: `text-international-text dark:text-international-text`,
  economy: `text-economy-text dark:text-economy-text`,
  society: `text-society-text dark:text-society-text`,
  webDevelopment: `text-web-dev-text dark:text-web-dev-text`,
}

export function CategoryBadge({
  category,
  variant = 'default',
}: {
  category: ArticleCategory
  variant?: 'default' | 'compact'
}) {
  const t = useTranslations(variant === 'compact' ? 'categoriesShort' : 'categories')

  return (
    <span
      className={`categoryBadge inline-block rounded-full font-semibold uppercase tracking-wide backdrop-blur-sm whitespace-nowrap
        ${variant === 'compact' ? 'text-[0.65rem] px-2 py-0.5' : 'text-xs px-3 py-1'}
        ${CATEGORY_STYLES[category]}`}
    >
      {t(category)}
    </span>
  )
}

export function CategoryText({ category }: { category: ArticleCategory }) {
    const t = useTranslations('categoriesShort')

    return <span className={`font-semibold uppercase ${CATEGORY_TEXT[category]}`}>{t(category)}</span>
}


// If I need it, it is here
export function TagBadge({ category, tag }: { category: ArticleCategory; tag: string }) {
  return (
    <span
      className={`inline-block px-2 py-0.5 rounded-full text-[0.65rem] font-medium tracking-wide whitespace-nowrap
        ${TAG_STYLES[category]}`}
    >
      #{tag}
    </span>
  )
}