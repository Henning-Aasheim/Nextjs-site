'use client'

import { useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { BookMeta, BookEra } from '@/types'
import { BookCard } from './book-card'
import { DateTranslator } from '@/app/lib/yearFormat'

function useTwoRowClip(itemCount: number) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [maxHeight, setMaxHeight] = useState<number | null>(null)
  const [canExpand, setCanExpand] = useState(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const measure = () => {
      if (!el.clientWidth) return // hidden (mobile view) — skip until visible
      const items = Array.from(el.children) as HTMLElement[]
      if (items.length === 0) return

      const firstTop = items[0].offsetTop
      const secondRowItem = items.find((i) => i.offsetTop > firstTop)

      if (!secondRowItem) {
        setMaxHeight(null)
        setCanExpand(false)
        return
      }

      const secondTop = secondRowItem.offsetTop
      const secondRowHeight = items
        .filter((i) => i.offsetTop === secondTop)
        .reduce((max, i) => Math.max(max, i.offsetHeight), 0)

      const thirdRowItem = items.find((i) => i.offsetTop > secondTop)

      setMaxHeight(secondTop - firstTop + secondRowHeight)
      setCanExpand(Boolean(thirdRowItem))
    }

    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [itemCount])

  return { containerRef, maxHeight, canExpand }
}

export function LibraryCategory({
  era,
  books,
  locale,
  tDate,
}: {
  era: BookEra
  books: BookMeta[]
  locale: string
  tDate: DateTranslator
}) {
  const t = useTranslations('library')
  const [expanded, setExpanded] = useState(false)
  const { containerRef, maxHeight, canExpand } = useTwoRowClip(books.length)

  if (books.length === 0) return null

  return (
    <section className="mb-16">
      <h3 className="text-3xl sm:text-4xl font-default font-bold mb-6">
        {t(`eras.${era}`)}
      </h3>

      {/* Desktop / tablet: clipped grid */}
      <div className="hidden lg:block relative">
        <div
          ref={containerRef}
          className="
            grid grid-cols-3 xl:grid-cols-4 huge:grid-cols-5 gap-6 items-start
            overflow-hidden transition-[max-height] duration-500 ease-in-out
          "
          style={{
            maxHeight: expanded ? undefined : maxHeight ? `${maxHeight}px` : undefined,
          }}
        >
          {books.map((book) => (
            <BookCard key={book.id} book={book} locale={locale} tDate={tDate} />
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
              <BookCard book={book} locale={locale} tDate={tDate} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}