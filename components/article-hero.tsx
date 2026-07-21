'use client'

import type { CSSProperties } from 'react'
import { useScrollProgress } from '@/hooks/useScrollProgress'
import { useFormatter } from 'next-intl'
import { Calendar } from 'lucide-react'
import Image from 'next/image'

function ArticleHeroText({
  title,
  lede,
  categoryLabel,
  date,
}: {
  title: string
  lede?: string
  categoryLabel: string
  date: Date
}) {
  const format = useFormatter()

  return (
    <div className="px-6 lg:px-8 py-8 space-y-4 mx-auto max-w-160 lg:m-0 lg:max-w-none">
      <span className="hero-top block !static !mt-0 text-white">{categoryLabel}</span>

      <h1 className="text-3xl sm:text-5xl lg:text-5xl font-bold text-white leading-tight">
        {title}
      </h1>

      {lede && (
        <p className="dropcap text-white xl:text-lg lg:pr-25 xl:pr-50">
          {lede}
        </p>
      )}

      <div className="flex items-center gap-1.5 text-white/80 text-sm pt-2">
        <Calendar size={15} className="shrink-0" />
        <span>{format.dateTime(date, { dateStyle: 'long' })}</span>
      </div>
    </div>
  )
}

export function ArticleHero({
  title,
  lede,
  image,
  color,
  categoryLabel,
  date,
}: {
  title: string
  lede?: string
  image: string
  color: string
  categoryLabel: string
  date: Date
}) {
  const { ref, progress } = useScrollProgress<HTMLDivElement>(250)

  return (
    <div className="relative" style={{ '--category-color': color } as CSSProperties}>
      <div
        ref={ref}
        style={{ '--progress': progress } as CSSProperties}
        className="hero-shrink lg:mx-auto bg-(--category-color) rounded-xl
                   dark:rounded-lg overflow-hidden
                   dark:bg-[color-mix(in_srgb,var(--category-color)_12%,var(--color-darkNavyLight))]
                   dark:border dark:border-[color-mix(in_srgb,var(--category-color)_60%,transparent)]
                   dark:shadow-[0_0_20px] dark:shadow-[color-mix(in_srgb,var(--category-color)_10%,transparent)]"
      >
        <div className="relative flex flex-col lg:block">
          {/* Image side */}
          <div className="relative w-full lg:w-[65%] ml-auto aspect-3/2">
            <Image
              src={image}
              alt={title}
              fill
              className="
                mask-b-from-20% lg:mask-l-from-50% lg:mask-b-from-100%
                object-cover
              "
            />
          </div>

          {/* Text side: mobile only, stacked below the image */}
          <div className="w-full -mt-16 xs:-mt-30 md:mt-0 lg:hidden z-5">
            <ArticleHeroText title={title} lede={lede} categoryLabel={categoryLabel} date={date} />
          </div>
        </div>
      </div>

      {/* Text side: desktop — pinned against the outer wrapper so it
          stays put on screen while the shrinking background scrolls behind it */}
      <div className="hidden lg:block absolute top-1/2 left-0 w-2/3 -translate-y-1/2">
        <ArticleHeroText title={title} lede={lede} categoryLabel={categoryLabel} date={date} />
      </div>
    </div>
  )
}