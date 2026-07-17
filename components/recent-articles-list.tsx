'use client'

import { useRef, useState } from 'react'
import { useTranslations, useFormatter } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { ChevronDown } from 'lucide-react'
import { ArticleContent, ArticleCategory } from '@/types'
import { CategoryText } from './category-badge'
import { useOutsideClick } from './dropdown'

const ARTICLE_CATEGORIES: ArticleCategory[] = [
  'politics',
  'international',
  'economy',
  'society',
  'webDevelopment',
]

export function RecentArticlesList({
  articles,
  totalArticles,
}: {
  articles: ArticleContent[]
  totalArticles: number
}) {
  const t = useTranslations('article-list')
  const tCat = useTranslations('categories')
  const format = useFormatter()
  const [active, setActive] = useState<ArticleCategory | 'all'>('all')
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  useOutsideClick(dropdownRef, () => setIsOpen(false))

  const filtered =
    active === 'all'
      ? articles
      : articles.filter((a) => a.frontmatter.category === active)

  const visible = filtered.slice(0, 5)

  const selectCategory = (cat: ArticleCategory | 'all') => {
    setActive(cat)
    setIsOpen(false)
  }

  return (
    <div className="mx-auto">
      <h1 className="text-2xl sm:text-4xl pb-3 mx-auto border-gray-600/30 border-solid border-b">
        {t('title')}
      </h1>

      {/* Desktop / tablet: button row */}
      <div className="hidden sm:flex flex-wrap gap-2 mt-4 pb-4 border-b border-gray-600/30">
        <button
          onClick={() => setActive('all')}
          className={`categoryFilterButton px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide border transition-colors cursor-pointer
            ${active === 'all'
              ? 'bg-secondary text-white border-gray-600/30'
              : 'bg-transparent text-gray-600/60 border-gray-600/30 hover:text-gray-600'
            }`}
        >
          {tCat('all')}
        </button>

        {ARTICLE_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`categoryFilterButton px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide border transition-colors cursor-pointer
              ${active === cat
                ? 'bg-white text-black border-gray-600/30'
                : 'bg-transparent text-gray-600/60 border-gray-600/30 hover:text-gray-600'
              }`}
          >
            {tCat(cat)}
          </button>
        ))}
      </div>

      {/* Mobile: dropdown */}
      <div ref={dropdownRef} className="relative sm:hidden mt-4 pb-4 border-gray-600/30 border-solid border-b">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="categoryFilterButton flex items-center justify-between w-full px-3 py-2 rounded-md text-xs font-semibold uppercase tracking-wide border border-gray-600 cursor-pointer"
        >
          {active === 'all' ? tCat('all') : tCat(active)}
          <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute left-0 right-0 bg-bgDark rounded-md py-2 mt-2 shadow-lg z-20
                          dark:bg-[color-mix(in_srgb,var(--color-primary)_12%,var(--color-darkNavyLight))]
                          dark:border dark:border-primary/60
                          dark:shadow-[0_0_20px] dark:shadow-primary/10">
            <button
              onClick={() => selectCategory('all')}
              className={active === 'all' ? 'localeButton font-bold' : 'localeButton'}
            >
              {tCat('all')}
            </button>
            {ARTICLE_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => selectCategory(cat)}
                className={active === cat ? 'localeButton font-bold' : 'localeButton'}
              >
                {tCat(cat)}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="w-full overflow-hidden">
        <ul className="grid grid-cols-1 w-full items-start text-left">
          {visible.map((article) => {
            const displayNumber = totalArticles - articles.indexOf(article)
            const dateTime = new Date(article.frontmatter.date)

            return (
              <li
                key={article.id}
                className="group w-full mx-auto border-b border-gray-600/30 py-4 hover:bg-bgDark dark:hover:bg-secondary/20"
              >
                <Link href={`/articles/${article.id}`} className="flex w-full items-stretch gap-6">
                  <div className="flex items-center">
                    <span className="min-w-[2rem] text-2xl font-display text-center">
                      {displayNumber}
                    </span>
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 w-full text-sm">
                      <div className="w-full flex justify-between sm:w-auto sm:justify-start sm:items-center sm:gap-2">
                        <span className="dateText sm:min-w-[9rem] text-right pr-10 lg:pr-15">
                          {format.dateTime(dateTime, { dateStyle: 'long' })}
                        </span>
                        <span className="sm:min-w-[7rem] text-right sm:text-left">
                          <CategoryText category={article.frontmatter.category} />
                        </span>
                      </div>

                      <h2 className="sm:min-w-[9rem] text-lg font-default font-semibold text-wrap">
                        {article.frontmatter.title}
                      </h2>
                    </div>
                  </div>
                </Link>
              </li>
            )
          })}
        </ul>

        {visible.length === 0 && (
          <p className="text-gray-500 py-6 text-center">{t('no-articles')}</p>
        )}
      </div>
    </div>
  )
}