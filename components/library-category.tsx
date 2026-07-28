'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { BookMeta, BookEra } from '@/types'
import { BookCard } from './book-card'

const VISIBLE_COUNT = 5

const ERA_STYLES: Record<BookEra, string> = {
  archaic: `text-primary`,
  classical: `text-secondary`,
  medieval: `text-danger`,
  earlyModern: `text-tertiary`,
  modern: `text-quarternary`,
}

export function LibraryCategory({
  era,
  books,
}: {
  era: BookEra
  books: (BookMeta & { yearLabel: string | null })[]
}) {
  const t = useTranslations('library')
  const [expanded, setExpanded] = useState(false)

  if (books.length === 0) return null

  const canExpand = books.length > VISIBLE_COUNT
  const visibleBooks = expanded ? books : books.slice(0, VISIBLE_COUNT)

  return (
    <div className="mt-10 md:mt-30 pb-10 md:pb-30 border-b border-gray-600/30 dark:border-white/40">
      <section className={`m-5 px-2 s:px-10 ${ERA_STYLES[era]}`}>
        <h3 className="text-3xl sm:text-4xl font-default font-bold mb-6">
          {t(`eras.${era}` as 'eras.archaic')}
        </h3>

        {/* Desktop / tablet: fixed 8-column grid */}
        <div className="hidden lg:block">

          <div className="grid grid-cols-5 gap-5 items-start">
            {visibleBooks.map((book) => (
              <BookCard key={book.id} book={book} yearLabel={book.yearLabel} />
            ))}
          </div>

          {canExpand && (
            <div className="flex justify-center mt-6">
              <button
                onClick={() => setExpanded((v) => !v)}
                className="flex items-center gap-2 font-bold cursor-pointer"
              >
                {expanded ? t('showLess') : t('loadMore')}
                {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
            </div>
          )}
        </div>

        {/* Mobile: carousel */}
        <div className="lg:hidden -mx-4 relative">
          <div
              className="
              flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth
              px-12 xs:px-16 pb-4
              mask-l-from-70% mask-r-from-70%
              [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
              "
          >
              {books.map((book) => (
              <div key={book.id} className="w-36 xs:w-40 shrink-0 snap-center">
                  <BookCard book={book} yearLabel={book.yearLabel} />
              </div>
              ))}
          </div>
        </div>
      </section>
    </div>
  )
}