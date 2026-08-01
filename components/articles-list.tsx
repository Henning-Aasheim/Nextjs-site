'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import type { ArticleContent, ArticleCategory } from '@/types'
import { articleToCard, articleToList } from '@/app/lib/content'
import Cards from './cards'
import List from './lists'
import { CardListButtons, CategoryButtons } from './toggle-buttons'


export function ArticlesList({ articles }: { articles: ArticleContent[] }) {

  const t = useTranslations('categories')

  const [active, setActive] = useState<ArticleCategory | 'all'>('all')
  const [view, setView] = useState<'cards' | 'list'>('cards')

  const allItems = articles.map(articleToList)

  const displayNumber = new Map<string | number, number>()
  allItems.forEach((item, index) => {
    displayNumber.set(item.id, allItems.length - index)
  })

  const filtered_list = active === 'all'
      ? allItems
      : allItems.filter((item) => item.category === active)



  const filtered =
    active === 'all'
      ? articles
      : articles.filter((a) => a.frontmatter.category === active)

  const cards = filtered.map(articleToCard)

  return (
    <>
      {/* View toggle */}
      <CardListButtons view={view} onChange={setView}></CardListButtons>
      {/* Filter bar */}
      <CategoryButtons active={active} onChange={setActive}></CategoryButtons>

      {view === 'cards' ? (
        /* Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 
                        w-4/5 sm:w-3/5 md:w-4/5 2xl:w-10/11
                        mx-auto gap-10">
          {cards.map((item) => {
            return <Cards items={item} key={item.id}></Cards>
          })}
        </div>

      ) : (

        /* List */
        <ul className="w-4/5 sm:w-3/5 md:w-4/5 2xl:w-10/11 mx-auto flex flex-col">
          {filtered_list.map((item) => {
            return (
              <List items={item} displayNumber={displayNumber.get(item.id)!} key={item.id}></List>
            )
          })}
        </ul>
      )}

      {filtered.length === 0 && (
        <p className="text-black/50 dark:text-white/50 mt-10 text-center">{t('no-articles')}</p>
      )}
    </>
  )
}