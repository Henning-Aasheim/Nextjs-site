'use client'

import { useState } from 'react'
import { useTranslations, useFormatter } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { ArticleContent, ArticleCategory } from '@/types'
import { CategoryText } from './category-badge'
import { CategoryButtons } from './toggle-buttons'

export function RecentArticlesList({
  articles,
  totalArticles,
}: {
  articles: ArticleContent[]
  totalArticles: number
}) {
  const t = useTranslations('article-list')

  const format = useFormatter()
  const [active, setActive] = useState<ArticleCategory | 'all'>('all')

  const filtered =
    active === 'all'
      ? articles
      : articles.filter((a) => a.frontmatter.category === active)

  const visible = filtered.slice(0, 5)

  return (
    <div className="mx-auto">
      <h1 className="text-2xl sm:text-4xl pb-3 mx-auto border-gray-600/30 dark:border-white/40 border-solid border-b">
        {t('title')}
      </h1>

      {/* Filter row: single line, scrollable, edge-fades only when there's more to scroll */}
      <div className='mt-5 pb-5 border-b border-gray-600/30 dark:border-white/40'>
        <CategoryButtons active={active} onChange={setActive}></CategoryButtons>
      </div>

      <div className="w-full overflow-hidden">
        <ul className="grid grid-cols-1 w-full items-start text-left">



          {visible.map((article) => {
            const displayNumber = totalArticles - articles.indexOf(article)
            const dateTime = new Date(article.frontmatter.date)

            return (
              <li
                key={article.id}
                className="group w-full mx-auto border-b border-gray-600/30 dark:border-white/40 hover:bg-black/5 dark:hover:bg-white/10"
              >
                <Link href={`/articles/${article.id}`} className="flex w-full items-stretch gap-6 lg:gap-8 py-4 lg:py-6 md:pl-6">
                  <div className="flex items-center">
                    <span className="min-w-8 text-2xl font-display text-center">
                      {displayNumber}
                    </span>
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 lg:gap-6 w-full text-sm">
                      <div className="w-full flex justify-between sm:w-auto sm:justify-start sm:items-center sm:gap-2 lg:gap-3">
                        <span className="dateText sm:min-w-36 text-right pr-10 lg:pr-15 text-gray-500 dark:text-white/60">
                          {format.dateTime(dateTime, { dateStyle: 'long' })}
                        </span>
                        <span className="sm:min-w-28 lg:min-w-48 text-right sm:text-left">
                          <CategoryText category={article.frontmatter.category} />
                        </span>
                      </div>

                      <h2 className="sm:min-w-36 text-lg font-default font-semibold text-wrap">
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