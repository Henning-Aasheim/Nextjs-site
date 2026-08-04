'use client'

import { useState } from 'react'
import { useTranslations, useFormatter } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { ArticleContent, ArticleCategory } from '@/types'
import { CategoryText } from './category-badge'
import { CategoryButtons } from './toggle-buttons'
import { articleToList } from '@/app/lib/content'
import List from './lists'

export function RecentArticlesList({
  articles,
}: {
  articles: ArticleContent[]
}) {
  const t = useTranslations('article-list')

  const format = useFormatter()
  const [active, setActive] = useState<ArticleCategory | 'all'>('all')

  const filtered =
    active === 'all'
      ? articles
      : articles.filter((a) => a.frontmatter.category === active)

  const visible = filtered.slice(0, 5)

  /* ---- LIST ITEMS ---- */

  const listItems = articles.map(articleToList) /* Sets the type of each article metadata to a list item */

  const displayNumber = new Map<string | number, number>() /* maps article IDs to their display numbers */

  listItems.forEach((item, index) => {
    displayNumber.set(item.id, listItems.length - index) /* Assigns a display number to each list item based on its position */
  })

  const filtered_list =
    active === 'all'
      ? listItems
      : listItems.filter((item) => item.category === active)

  const visible_list = filtered_list.slice(0, 5)

  return (
    <div className="mx-auto">
      <h2 className="text-2xl sm:text-4xl pb-3 mx-auto border-gray-600/30 dark:border-white/40 border-solid border-b">
        {t('title')}
      </h2>

      {/* Filter row: single line, scrollable, edge-fades only when there's more to scroll */}
      <div className='mt-5 pb-5 border-b border-gray-600/30 dark:border-white/40'>
        <CategoryButtons active={active} onChange={setActive}></CategoryButtons>
      </div>

      <div className="w-full overflow-hidden">
        <ul className="grid grid-cols-1 w-full items-start text-left">

          {visible_list.map((item) => {
            return (
              <List items={item} displayNumber={displayNumber.get(item.id)!} key={item.id}></List> /* The ! operator asserts that the value is not undefined */
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