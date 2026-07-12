'use client'

import { useState } from 'react'
import { useTranslations, useFormatter } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { ArticleContent, ArticleCategory } from '@/types'
import { CategoryBadge, CATEGORY_STYLES } from './category-badge'

const ARTICLE_CATEGORIES: ArticleCategory[] = [
  'politics',
  'international',
  'economy',
  'society',
  'webDevelopment',
]

export const CATEGORY_CARD_STYLES: Record<ArticleCategory, string> = {
  politics: `
    bg-primary
    dark:bg-[color-mix(in_srgb,var(--color-primary)_12%,var(--color-darkNavyLight))]
    dark:border dark:border-primary/60
    dark:shadow-[0_0_20px] dark:shadow-primary/10
  `,
  international: `
    bg-secondary
    dark:bg-[color-mix(in_srgb,var(--color-secondary)_12%,var(--color-darkNavyLight))]
    dark:border dark:border-secondary/60
    dark:shadow-[0_0_20px] dark:shadow-secondary/10
  `,
  economy: `
    bg-danger
    dark:bg-[color-mix(in_srgb,var(--color-danger)_12%,var(--color-darkNavyLight))]
    dark:border dark:border-danger/60
    dark:shadow-[0_0_20px] dark:shadow-danger/10
  `,
  society: `
    bg-gold
    dark:bg-[color-mix(in_srgb,var(--color-gold)_12%,var(--color-darkNavyLight))]
    dark:border dark:border-gold/60
    dark:shadow-[0_0_20px] dark:shadow-gold/10
  `,
  webDevelopment: `
    bg-purple
    dark:bg-[color-mix(in_srgb,var(--color-purple)_12%,var(--color-darkNavyLight))]
    dark:border dark:border-purple/60
    dark:shadow-[0_0_20px] dark:shadow-purple/10
  `,
}

export function ArticlesList({ articles, category, }: { articles: ArticleContent[], category: ArticleCategory }) {
  const tCat = useTranslations('categories')
  const format = useFormatter()
  const [active, setActive] = useState<ArticleCategory | 'all'>('all')

  const filtered =
    active === 'all'
      ? articles
      : articles.filter((a) => a.frontmatter.category === active)

  return (
    <>
      {/* Filter bar */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        <button
          onClick={() => setActive('all')}
          className={`px-4 py-1.5 rounded-full text-sm font-semibold uppercase tracking-wide border transition-colors cursor-pointer
            ${active === 'all'
              ? 'bg-primary text-white border-primary'
              : 'bg-transparent text-primary/70 dark:text-white/60 border-primary/30 dark:border-white/20 hover:text-primary dark:hover:text-white'
            }`}
        >
          {tCat('all')}
        </button>

        {ARTICLE_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold uppercase tracking-wide border transition-colors cursor-pointer
              ${active === cat
                ? CATEGORY_STYLES[cat].replace(/bg-\S+\/15/, 'bg-current/20')
                : 'bg-transparent text-black/50 dark:text-white/50 border-black/20 dark:border-white/20 hover:text-black dark:hover:text-white'
              }`}
          >
            {tCat(cat)}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 
                      w-4/5 sm:w-3/5 md:w-4/5 2xl:w-10/11
                      mx-auto md:gap-10">
        {filtered.map((article) => {
          const dateTime = new Date(article.frontmatter.date)

          return (
            <article key={article.id} className={`group hover:scale-105 transition-transform duration-100 mb-5
                                                rounded-lg overflow-hidden
                                                ${CATEGORY_CARD_STYLES[article.frontmatter.category]}`}>
              <div className="flex justify-center mb-5">
                <Link href={`/articles/${article.id}`} className="w-full">
                  <div className="relative mb-2">
                    <img
                      src={article.frontmatter.image}
                      alt={article.frontmatter.title}
                      className="w-full aspect-3/2 object-cover"
                    />
                    <div className="absolute top-2 left-2">
                      <CategoryBadge category={article.frontmatter.category} />
                    </div>
                  </div>
                  <h2 className="text-lg sm:text-2xl font-default font-semibold text-center text-gray-300 hover:text-white">
                    {article.frontmatter.title}
                  </h2>
                  <div className="font-default text-black/70 dark:text-gray-300">
                    {format.dateTime(dateTime, { dateStyle: 'long' })}
                  </div>
                </Link>
              </div>
            </article>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <p className="text-black/50 dark:text-white/50 mt-10">
          {/* Optional: add an "emptyState" key to messages if you want this translated */}
          No articles in this category yet.
        </p>
      )}
    </>
  )
}