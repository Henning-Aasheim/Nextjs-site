'use client'

import type { CSSProperties } from 'react'
import Image from 'next/image'
import { useScrollProgress } from '@/hooks/useScrollProgress'
import { BookMeta, BookEra } from '@/types'

export const ERA_COLOR_VARS: Record<BookEra, string> = {
  archaic: 'var(--color-primary)',
  classical: 'var(--color-secondary)',
  medieval: 'var(--color-danger)',
  earlyModern: 'var(--color-tertiary)',
  modern: 'var(--color-quarternary)',
}

function FeaturedBookText({
  book,
  yearLabel,
}: {
  book: BookMeta
  yearLabel: string | null
}) {
  return (
    <div className="px-6 lg:px-10 py-8 space-y-3 text-left">
      <h1 className="text-3xl sm:text-5xl font-bold text-white leading-tight">
        {book.title}
      </h1>
      <p className="text-white/80 text-lg">{book.author}</p>
      {yearLabel && <p className="text-white/70">{yearLabel}</p>}
    </div>
  )
}

export function FeaturedBook({
  book,
  yearLabel,
  era,
}: {
  book: BookMeta
  yearLabel: string | null
  era: BookEra
}) {
  const color = ERA_COLOR_VARS[era]
  const { ref, progress } = useScrollProgress<HTMLDivElement>(250)

  return (
    <div
      ref={ref}
      style={{ '--category-color': color, '--progress': progress } as CSSProperties}
      className="hero-shrink mx-auto bg-(--category-color)/60 rounded-xl overflow-hidden"
    >
      <div className="flex flex-col sm:flex-row items-center sm:items-stretch">
        {/* Text side */}
        <div className="flex-1 order-2 sm:order-1 sm:ml-20">
          <FeaturedBookText book={book} yearLabel={yearLabel} />
        </div>

        {/* Book cover: percentage width so it grows with hero-shrink's
            progress-driven width increase; aspect-2/3 keeps it locked to
            the cover's natural ratio, so height grows along with width */}
        <div className="order-1 sm:order-2 shrink-0 w-1/2 sm:w-2/5 lg:w-[25%]
                        aspect-2/3 relative mx-auto sm:mx-0 my-6 sm:my-10 sm:mr-20">
          <Image
            src={book.image}
            alt={book.title}
            fill
            className="object-contain object-top drop-shadow-xl"
            sizes="(max-width: 1024px) 40vw, 20rem"
          />
        </div>
      </div>
    </div>
  )
}