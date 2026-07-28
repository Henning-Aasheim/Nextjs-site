import { useTranslations } from 'next-intl'
import { ArticleCategory } from '@/types'

export const CATEGORY_CARD_STYLES: Record<ArticleCategory, string> = {
  politics: `border-violet`,
  international: `border-cyan`,
  economy: `border-red`,
  society: `border-yellow`,
  webDevelopment: `border-purple`,
}

export const CATEGORY_STYLES: Record<ArticleCategory, string> = {
  politics: `
    bg-violet text-white
    dark:bg-violet dark:text-white
  `,
  international: `
    bg-cyan text-white
    dark:bg-cyan dark:text-white
  `,
  economy: `
    bg-red text-white
    dark:bg-red dark:text-white
  `,
  society: `
    bg-yellow text-black
    dark:bg-yellow dark:text-black
  `,
  webDevelopment: `
    bg-purple text-white
    dark:bg-purple dark:text-white
  `,
}

// Outline-only, lighter weight — used for the tag system, always
// tied to the parent article's category color.
export const TAG_STYLES: Record<ArticleCategory, string> = {
  politics: `text-violet border border-violet/40 dark:text-violet/90 dark:border-violet/40`,
  international: `text-cyan border border-cyan/40 dark:text-cyan/90 dark:border-cyan/40`,
  economy: `text-red border border-red/40 dark:text-red/90 dark:border-red/40`,
  society: `text-yellow border border-gold/40 dark:text-gold dark:border-yellow/40`,
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
  politics: 'var(--color-violet)',
  international: 'var(--color-cyan)',
  economy: 'var(--color-red)',
  society: 'var(--color-yellow)',
  webDevelopment: 'var(--color-purple)',
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
        <span className={`font-semibold uppercase pr-2 sm:pr-0 text-cyan dark:text-cyan ${CATEGORY_TEXT[category]}`}>
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