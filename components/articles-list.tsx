'use client'

import { useState } from 'react'
import { useTranslations, useFormatter } from 'next-intl'
import { Link } from '@/i18n/navigation'
import type { ArticleContent, ArticleCategory } from '@/types'
import { CategoryBadge, CategoryText, CATEGORY_CARD_STYLES, CATEGORY_STYLES, CATEGORY_COLOR_VARS } from './category-badge'
import { Calendar, LayoutGrid, List as ListIcon } from 'lucide-react'
import type { CSSProperties } from "react";

const ARTICLE_CATEGORIES: ArticleCategory[] = [
  'politics',
  'international',
  'economy',
  'society',
  'webDevelopment',
]

export function ArticlesList({ articles }: { articles: ArticleContent[] }) {
  const t = useTranslations('article-list')
  const tCat = useTranslations('categories')
  const format = useFormatter()
  const [active, setActive] = useState<ArticleCategory | 'all'>('all')
  const [view, setView] = useState<'cards' | 'list'>('cards')

  const totalArticles = articles.length

  const filtered =
    active === 'all'
      ? articles
      : articles.filter((a) => a.frontmatter.category === active)

  return (
    <>
      {/* View toggle */}
      <div className="flex justify-center sm:justify-end w-4/5 sm:w-3/5 md:w-4/5 2xl:w-10/11 mx-auto mb-4 gap-2">
        <button
          onClick={() => setView('cards')}
          aria-pressed={view === 'cards'}
          aria-label={t('cardView')}
          className={`p-2 rounded-full border transition-colors cursor-pointer
            ${view === 'cards'
              ? 'bg-cyan text-white border-cyan'
              : 'bg-transparent text-cyan/80 dark:text-white/60 border-cyan/60 dark:border-white/20 hover:text-cyan dark:hover:text-white'
            }`}
        >
          <LayoutGrid size={18} />
        </button>
        <button
          onClick={() => setView('list')}
          aria-pressed={view === 'list'}
          aria-label={t('listView')}
          className={`p-2 rounded-full border transition-colors cursor-pointer
            ${view === 'list'
              ? 'bg-cyan text-white border-cyan'
              : 'bg-transparent text-cyan/80 dark:text-white/60 border-cyan/60 dark:border-white/20 hover:text-cyan dark:hover:text-white'
            }`}
        >
          <ListIcon size={18} />
        </button>
      </div>

      {/* Filter bar */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        <button
            onClick={() => setActive('all')}
            className={`categoryFilterButton px-4 py-1.5 rounded-full text-sm font-semibold uppercase tracking-wide border transition-colors cursor-pointer
                ${active === 'all'
                ? 'bg-cyan text-white border-cyan'
                : 'bg-transparent text-cyan/80 dark:text-white/60 border-cyan/60 dark:border-white/20 hover:text-cyan dark:hover:text-white'
                }`}
            >
            {tCat('all')}
            </button>

            {ARTICLE_CATEGORIES.map((cat) => (
            <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`categoryFilterButton px-4 py-1.5 rounded-full text-sm 
                            font-semibold uppercase tracking-wide border transition-colors cursor-pointer
                            ${active === cat ? CATEGORY_STYLES[cat].replace(/bg-\S+\/15/, 'bg-current/20') : 
                              'bg-transparent text-black/50 dark:text-white/50 border-black/20 dark:border-white/20 hover:text-black dark:hover:text-white'
                            }`}>
                {tCat(cat)}
            </button>
            ))}
      </div>

      {view === 'cards' ? (
        /* Grid */
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
                            bg-black/8 dark:bg-white/10 border-l-5
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
      ) : (
        /* List */
        <ul className="w-4/5 sm:w-3/5 md:w-4/5 2xl:w-10/11 mx-auto flex flex-col">
          {filtered.map((article) => {
            const displayNumber = totalArticles - articles.indexOf(article)
            const dateTime = new Date(article.frontmatter.date)

            return (
              <li
                style={{ '--category-color': CATEGORY_COLOR_VARS[article.frontmatter.category] } as CSSProperties}
                key={article.id}
                className={`group hover:bg-black/5 dark:hover:bg-white/10 border-l-4 ${CATEGORY_CARD_STYLES[article.frontmatter.category]}`}
              >
                <div className='w-full h-full border-b border-gray-600/30'>
                  <Link
                  style={{ '--category-color': CATEGORY_COLOR_VARS[article.frontmatter.category] } as CSSProperties}
                  key={article.id}
                  href={`/articles/${article.id}`}
                  className="flex w-full items-stretch gap-6 lg:gap-8 py-4 lg:py-5"
                >
                  <div className="flex items-center">
                    <span className="min-w-8 text-2xl font-display text-center">
                      {displayNumber}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 lg:gap-6 w-full text-sm">
                      <div className="w-full flex justify-between sm:w-auto sm:justify-start sm:items-center sm:gap-2 lg:gap-3">
                        <span className="dateText sm:min-w-36 text-right pr-10 lg:pr-15 text-gray-500">
                          {format.dateTime(dateTime, { dateStyle: 'long' })}
                        </span>
                        <span className="sm:min-w-28 lg:min-w-48 text-right sm:text-left">
                          <CategoryText category={article.frontmatter.category} />
                        </span>
                      </div>

                      <h2 className="flex-1 min-w-0 text-lg font-default font-semibold text-left truncate">
                        {article.frontmatter.title}
                      </h2>
                    </div>
                  </div>
                </Link>
                </div>
              </li>
            )
          })}
        </ul>
      )}

      {filtered.length === 0 && (
        <p className="text-black/50 dark:text-white/50 mt-10">{tCat('no-articles')}</p>
      )}
    </>
  )
}