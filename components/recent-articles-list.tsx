'use client'

import { useEffect, useRef, useState } from 'react'
import { useTranslations, useFormatter } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { ArticleContent, ArticleCategory } from '@/types'
import { CategoryText } from './category-badge'

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
  const tCatShort = useTranslations('categoriesShort')
  const format = useFormatter()
  const [active, setActive] = useState<ArticleCategory | 'all'>('all')

  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const updateScrollState = () => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 4)
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4)
  }

  useEffect(() => {
    updateScrollState()
    const el = scrollRef.current
    if (!el) return

    el.addEventListener('scroll', updateScrollState)
    window.addEventListener('resize', updateScrollState)
    return () => {
      el.removeEventListener('scroll', updateScrollState)
      window.removeEventListener('resize', updateScrollState)
    }
  }, [])

  const filtered =
    active === 'all'
      ? articles
      : articles.filter((a) => a.frontmatter.category === active)

  const visible = filtered.slice(0, 5)

  return (
    <div className="mx-auto">
      <h1 className="text-2xl sm:text-4xl pb-3 mx-auto border-gray-600/30 border-solid border-b">
        {t('title')}
      </h1>

      {/* Filter row: single line, scrollable, edge-fades only when there's more to scroll */}
      <div
        ref={scrollRef}
        className={`
          flex flex-nowrap gap-2 lg:gap-4 mt-4 lg:mt-6 pb-4 lg:pb-6
          overflow-x-auto
          [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
          border-b border-gray-600/30
          transition-[mask-image]
          ${canScrollLeft ? 'mask-l-from-70%' : ''}
          ${canScrollRight ? 'mask-r-from-70%' : ''}
        `}
      >
        <button
          onClick={() => setActive('all')}
          className={`categoryFilterButton shrink-0 px-3 py-1 lg:px-4 lg:py-1.5 rounded-full text-xs lg:text-sm font-semibold uppercase tracking-wide border transition-colors cursor-pointer
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
            className={`categoryFilterButton shrink-0 px-3 py-1 lg:px-4 lg:py-1.5 rounded-full text-xs lg:text-sm font-semibold uppercase tracking-wide border transition-colors cursor-pointer
              ${active === cat
                ? 'bg-secondary/30 text-secondary border-gray-600/30'
                : 'bg-transparent text-gray-600/60 border-gray-600/30 hover:text-gray-600'
              }`}
          >
            <span className="hidden lg:inline">{tCat(cat)}</span>
            <span className="lg:hidden">{tCatShort(cat)}</span>
          </button>
        ))}
      </div>

      <div className="w-full overflow-hidden">
        <ul className="grid grid-cols-1 w-full items-start text-left">
          {visible.map((article) => {
            const displayNumber = totalArticles - articles.indexOf(article)
            const dateTime = new Date(article.frontmatter.date)

            return (
              <li
                key={article.id}
                className="group w-full mx-auto border-b border-gray-600/30 hover:bg-bgDark dark:hover:bg-secondary/20"
              >
                <Link href={`/articles/${article.id}`} className="flex w-full items-stretch gap-6 lg:gap-8 py-4 lg:py-6">
                  <div className="flex items-center">
                    <span className="min-w-[2rem] text-2xl font-display text-center">
                      {displayNumber}
                    </span>
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 lg:gap-6 w-full text-sm">
                      <div className="w-full flex justify-between sm:w-auto sm:justify-start sm:items-center sm:gap-2 lg:gap-3">
                        <span className="dateText sm:min-w-[9rem] text-right pr-10 lg:pr-15 text-gray-500">
                          {format.dateTime(dateTime, { dateStyle: 'long' })}
                        </span>
                        <span className="sm:min-w-[7rem] lg:min-w-[12rem] text-right sm:text-left">
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