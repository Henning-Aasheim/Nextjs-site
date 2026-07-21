'use client'

import { useState } from 'react'
import { useTranslations, useFormatter } from 'next-intl'
import { Link } from '@/i18n/navigation'
import type { ArticleContent, ArticleCategory } from '@/types'
import { CategoryBadge, CATEGORY_CARD_STYLES, CATEGORY_STYLES, CATEGORY_COLOR_VARS } from './category-badge'
import { Calendar } from 'lucide-react'
import type { CSSProperties } from "react";

const ARTICLE_CATEGORIES: ArticleCategory[] = [
  'politics',
  'international',
  'economy',
  'society',
  'webDevelopment',
]

export function ArticlesList({ articles }: { articles: ArticleContent[] }) {
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
            className={`categoryFilterButton px-4 py-1.5 rounded-full text-sm font-semibold uppercase tracking-wide border transition-colors cursor-pointer
                ${active === 'all'
                ? 'bg-secondary text-white border-secondary'
                : 'bg-transparent text-secondary/80 dark:text-white/60 border-secondary/60 dark:border-white/20 hover:text-secondary dark:hover:text-white'
                }`}
            >
            {tCat('all')}
            </button>

            {ARTICLE_CATEGORIES.map((cat) => (
            <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`categoryFilterButton px-4 py-1.5 rounded-full text-sm font-semibold uppercase tracking-wide border transition-colors cursor-pointer
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
                      mx-auto gap-10">
        {filtered.map((article) => {
          const dateTime = new Date(article.frontmatter.date)

          return (
            <article
              style={{ '--category-color': CATEGORY_COLOR_VARS[article.frontmatter.category] } as CSSProperties}
              className={`group hover:scale-105 transition-transform duration-100 mb-5
                          rounded-lg overflow-hidden
                          text-gray-800 hover:text-(--category-color)
                          dark:text-gray-300 dark:hover:text-(--category-color)
                          flex flex-col h-full
                          ${CATEGORY_CARD_STYLES[article.frontmatter.category]}`}
              key={article.id}
>
              <Link href={`/articles/${article.id}`} className="flex flex-col flex-1 rounded-lg">
                {/* Image: 3:2 ratio, scales with the card's actual rendered width */}
                <div className="relative w-full aspect-3/2 shrink-0">
                  <img
                    src={article.frontmatter.image}
                    alt={article.frontmatter.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2">
                    <CategoryBadge category={article.frontmatter.category} />
                  </div>
                </div>

                {/* Text: fills remaining height, date pinned to bottom */}
                <div className="p-3 flex flex-col flex-1 mx-2">
                  <h2 className="text-lg sm:text-xl font-default font-semibold text-center leading-7 line-clamp-2">
                    {article.frontmatter.title}
                  </h2>

                  <p className="mt-2 text-left text-gray-500 dark:text-gray-400 line-clamp-3">
                    {article.excerpt}
                  </p>

                  <div className="flex items-center justify-start gap-1.5 text-gray-500 dark:text-gray-400 mt-auto pt-2">
                    <Calendar size={15} className="shrink-0" />
                    <span>{format.dateTime(dateTime, { dateStyle: 'long' })}</span>
                  </div>
                </div>
              </Link>
            </article>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <p className="text-black/50 dark:text-white/50 mt-10">{tCat('no-articles')}</p>
      )}
    </>
  )
}