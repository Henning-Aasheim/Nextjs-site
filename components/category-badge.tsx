import { useTranslations } from 'next-intl'
import { ArticleCategory } from '@/types'

export const CATEGORY_CARD_STYLES: Record<ArticleCategory, string> = {
  politics: `
    bg-bgDark border-l-5 border-primary
    dark:bg-darkNavyLight dark:border-primary/60
    dark:shadow-[0_0_20px] dark:shadow-primary/10
  `,
  international: `
    bg-bgDark border-l-5 border-secondary
    dark:bg-darkNavyLight dark:border-secondary/60
    dark:shadow-[0_0_20px] dark:shadow-secondary/10
  `,
  economy: `
    bg-bgDark border-l-5 border-danger
    dark:bg-darkNavyLight dark:border-danger/60
    dark:shadow-[0_0_20px] dark:shadow-danger/10
  `,
  society: `
    bg-bgDark border-l-5 border-gold
    dark:bg-darkNavyLight dark:border-gold/60
    dark:shadow-[0_0_20px] dark:shadow-gold/10
  `,
  webDevelopment: `
    bg-bgDark border-l-5 border-purple
    dark:bg-darkNavyLight dark:border-purple/60
    dark:shadow-[0_0_20px] dark:shadow-purple/10
  `,
}

export const CATEGORY_STYLES: Record<ArticleCategory, string> = {
  politics: `
    bg-primary text-white border border-primary
    dark:bg-primary dark:text-white dark:border-primary/70
  `,
  international: `
    bg-secondary text-white border border-secondary
    dark:bg-secondary dark:text-white dark:border-secondary/70
  `,
  economy: `
    bg-danger text-white border border-danger
    dark:bg-danger dark:text-white dark:border-danger/70
  `,
  society: `
    bg-gold text-darkNavy border border-gold
    dark:bg-gold dark:text-darkNavy dark:border-gold/70
  `,
  webDevelopment: `
    bg-purple text-white border border-purple
    dark:bg-purple dark:text-white dark:border-purple/70
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
        <span className={`font-semibold uppercase pr-2 sm:pr-0 text-secondary ${CATEGORY_TEXT[category]}`}>
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