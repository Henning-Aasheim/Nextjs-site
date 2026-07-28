import { useTranslations } from 'next-intl'
import { ArticleCategory } from '@/types'

export const CATEGORY_CARD_STYLES: Record<ArticleCategory, string> = {
  politics: `border-primary`,
  international: `border-secondary`,
  economy: `border-danger`,
  society: `border-tertiary`,
  webDevelopment: `border-quarternary`,
}

export const CATEGORY_STYLES: Record<ArticleCategory, string> = {
  politics: `
    bg-primary text-white
    dark:bg-primary dark:text-white
  `,
  international: `
    bg-secondary text-white
    dark:bg-secondary dark:text-white
  `,
  economy: `
    bg-danger text-white
    dark:bg-danger dark:text-white
  `,
  society: `
    bg-tertiary text-black
    dark:bg-tertiary dark:text-black
  `,
  webDevelopment: `
    bg-quarternary text-white
    dark:bg-quarternary dark:text-white
  `,
}

// Outline-only, lighter weight — used for the tag system, always
// tied to the parent article's category color.
export const TAG_STYLES: Record<ArticleCategory, string> = {
  politics: `text-primary border border-primary/40 dark:text-primary/90 dark:border-primary/40`,
  international: `text-secondary border border-secondary/40 dark:text-secondary/90 dark:border-secondary/40`,
  economy: `text-danger border border-danger/40 dark:text-danger/90 dark:border-danger/40`,
  society: `text-tertiary border border-gold/40 dark:text-gold dark:border-gold/40`,
  webDevelopment: `text-quarternary border border-purple/40 dark:text-purple/90 dark:border-purple/40`,
}

// Keeping this if I want to make changes
export const CATEGORY_TEXT: Record<ArticleCategory, string> = {
  politics: `text-background dark:text-background`,
  international: `text-background dark:text-background`,
  economy: `text-background dark:text-background`,
  society: `text-background dark:text-background`,
  webDevelopment: `text-background dark:text-background`,
}

export const CATEGORY_COLOR_VARS: Record<ArticleCategory, string> = {
  politics: 'var(--color-politics-text)',
  international: 'var(--color-international-text)',
  economy: 'var(--color-economy-text)',
  society: 'var(--color-society-text)',
  webDevelopment: 'var(--color-web-dev-text)',
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
    const t = useTranslations('categories')
    const tShort = useTranslations('categoriesShort')

    return (
        <span className={`font-semibold uppercase pr-2 sm:pr-0 text-secondary dark:text-secondary ${CATEGORY_TEXT[category]}`}>
            <span className="hidden lg:inline">{t(category)}</span>
            <span className="lg:hidden">{tShort(category)}</span>
        </span>
    )
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