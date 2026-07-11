'use client'

import { useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { BookMeta, BookEra } from '@/types'
import { BookCard } from './book-card'

type BookWithYearLabel = BookMeta & { yearLabel: string | null }

const BREAKPOINTS = [
  { minWidth: 2000, columns: 5 },
  { minWidth: 1280, columns: 4 },
  { minWidth: 1024, columns: 3 },
]

function getColumns(width: number) {
  for (const bp of BREAKPOINTS) {
    if (width >= bp.minWidth) return bp.columns
  }
  return 3
}

function useGridColumns() {
  const [columns, setColumns] = useState(3)

  useEffect(() => {
    const update = () => setColumns(getColumns(window.innerWidth))
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  return columns
}

export function LibraryCategory({
  era,
  books,
  locale,
}: {
  era: BookEra
  books: (BookMeta & { yearLabel: string | null })[]
  locale: string
}) {
  const t = useTranslations('library')
  const [expanded, setExpanded] = useState(false)
  const columns = useGridColumns()

  if (books.length === 0) return null

  const visibleCount = columns * 2
  const canExpand = books.length > visibleCount
  const visibleBooks = expanded ? books : books.slice(0, visibleCount)

  return (
    <section className="mb-16 p-5 dark:border dark:border-danger dark:rounded-lg
                        dark:bg-[color-mix(in_srgb,var(--color-danger)_12%,var(--color-darkNavyLight))]
                        dark:shadow-danger/10">
      <h3 className="text-3xl sm:text-4xl font-default font-bold mb-6">
        {t(`eras.${era}`)}
      </h3>

      {/* Desktop / tablet: clipped grid */}
      <div className="hidden lg:block">
        <div className="grid grid-cols-3 xl:grid-cols-4 huge:grid-cols-5 gap-6 items-start">
          {visibleBooks.map((book) => (
            <BookCard key={book.id} book={book} locale={locale} yearLabel={book.yearLabel} />
          ))}
        </div>

        {canExpand && !expanded && (
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background dark:from-darkNavy to-transparent pointer-events-none" />
        )}

        {canExpand && (
          <div className="flex justify-center mt-4">
            <button
              onClick={() => setExpanded((v) => !v)}
              className="flex items-center gap-2 font-bold text-primary dark:text-white hover:text-danger cursor-pointer"
            >
              {expanded ? t('showLess') : t('loadMore')}
              {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
          </div>
        )}
      </div>

      {/* Mobile: carousel */}
      <div className="lg:hidden -mx-4 px-4">
        <div
          className="
            flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 scroll-smooth
            [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
          "
        >
          {books.map((book) => (
            <div key={book.id} className="w-40 xs:w-48 shrink-0 snap-start">
              <BookCard book={book} locale={locale} yearLabel={book.yearLabel} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}