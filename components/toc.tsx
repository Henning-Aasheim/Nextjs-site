'use client'

import { useEffect, useRef, useState } from 'react'
import type { Heading } from '@/app/lib/toc'
import { useTranslations } from 'next-intl'

interface NumberedHeading extends Heading {
  number: number | null
}

export function TableOfContents({ headings }: { headings: Heading[] }) {
  const [activeId, setActiveId] = useState<string>('')
  const observerRef = useRef<IntersectionObserver | null>(null)

  const t = useTranslations('toc');

  useEffect(() => {
    const elements = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => el !== null)

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        })
      },
      { rootMargin: '-100px 0px -66% 0px', threshold: 0 }
    )

    elements.forEach((el) => observerRef.current?.observe(el))
    return () => observerRef.current?.disconnect()
  }, [headings])

  if (headings.length === 0) return null

  // Compute h2 numbers once, before rendering — no mutation during map()
  let count = 0
  const numbered: NumberedHeading[] = headings.map((h) => {
    if (h.level === 2) count++
    return { ...h, number: h.level === 2 ? count : null }
  })

  return (
    <nav className="text-sm sticky top-8 self-start w-[clamp(10rem,20vw,16rem)]">
      <p className="font-semibold text-lg mb-2 text-black/80 dark:text-white/80">
        {t('title')}
      </p>
      <ol className="space-y-1 border-l border-black/10 dark:border-white/10">
        {numbered.map((h) => {
          const isActive = activeId === h.id
          return (
            <li key={h.id} className="list-none">
              <a
                href={`#${h.id}`}
                onClick={(e) => {
                  e.preventDefault()
                  document
                    .getElementById(h.id)
                    ?.scrollIntoView({ behavior: 'smooth' })
                  history.pushState(null, '', `#${h.id}`)
                }}
                className={[
                  'block py-1 border-l-2 -ml-px transition-colors',
                  h.level === 3 ? 'pl-6' : 'pl-3 font-medium',
                  isActive
                    ? 'border-primary text-primary'
                    : 'border-transparent text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white',
                ].join(' ')}
              >
                {h.number !== null ? `${h.number}. ${h.text}` : h.text}
              </a>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}