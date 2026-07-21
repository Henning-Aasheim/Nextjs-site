'use client'

import { useEffect, useRef, useState } from 'react'
import type { Heading } from '@/app/lib/toc'
import { useTranslations } from 'next-intl'
import { ChevronDown, ChevronUp, List } from 'lucide-react'
import { useOutsideClick, useCloseOnScroll } from './dropdown'

interface NumberedHeading extends Heading {
  number: number | null
}

function numberHeadings(headings: Heading[]): NumberedHeading[] {
  let count = 0
  return headings.map((h) => {
    if (h.level === 2) count++
    return { ...h, number: h.level === 2 ? count : null }
  })
}

function TocLink({
  heading,
  isActive,
  onNavigate,
}: {
  heading: NumberedHeading
  isActive: boolean
  onNavigate: () => void
}) {
  return (
    <a
      href={`#${heading.id}`}
      onClick={(e) => {
        e.preventDefault()
        document.getElementById(heading.id)?.scrollIntoView({ behavior: 'smooth' })
        history.pushState(null, '', `#${heading.id}`)
        onNavigate()
      }}
      className={[
        'block py-1 border-l-2 -ml-px transition-colors',
        heading.level === 3 ? 'pl-6' : 'pl-3 font-medium',
        isActive
          ? 'border-(--category-color) text-(--category-color)'
          : 'border-transparent text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white',
      ].join(' ')}
    >
      {heading.number !== null ? `${heading.number}. ${heading.text}` : heading.text}
    </a>
  )
}

export function TableOfContents({ headings }: { headings: Heading[] }) {
  const [activeId, setActiveId] = useState<string>('')
  const observerRef = useRef<IntersectionObserver | null>(null)

  const t = useTranslations('toc')

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

  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  useOutsideClick(dropdownRef, () => setIsOpen(false))
  useCloseOnScroll(dropdownRef, () => setIsOpen(false))

  if (headings.length === 0) return null

  const numbered = numberHeadings(headings)
  const activeHeading = numbered.find((h) => h.id === activeId)

  return (
    <>
      {/* Mobile: dropdown */}
      <div ref={dropdownRef} className="md:hidden relative mb-6">
        <button
          onClick={() => setIsOpen((v) => !v)}
          className="flex w-full items-center justify-between gap-2 px-4 py-3 rounded-lg font-semibold cursor-pointer
                     border border-(--category-color) text-(--category-color)
                     dark:border-gray-400 dark:text-white/80"
        >
          <span className="flex items-center gap-2 truncate">
            <List size={18} className="shrink-0" />
            <span className="truncate">
              {activeHeading ? activeHeading.text : t('title')}
            </span>
          </span>
          {isOpen ? <ChevronUp size={18} className="shrink-0" /> : <ChevronDown size={18} className="shrink-0" />}
        </button>

        {isOpen && (
          <div
            className="absolute left-0 right-0 mt-2 py-3 px-4 rounded-lg shadow-lg z-20 max-h-[60vh] overflow-y-auto
                       bg-background dark:bg-darkNavyLight
                       border border-(--category-color) dark:border-gray-400"
          >
            <ol className="space-y-1 border-l border-(--category-color) dark:border-gray-400">
              {numbered.map((h) => (
                <li key={h.id} className="list-none">
                  <TocLink heading={h} isActive={activeId === h.id} onNavigate={() => setIsOpen(false)} />
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>

      {/* Desktop: sticky sidebar */}
      <nav className="hidden md:block text-sm sticky top-8 self-start w-[clamp(10rem,20vw,16rem)]">
        <p className="font-semibold text-xl mb-4 text-(--category-color) dark:text-white/80 border-b border-(--category-color) dark:border-gray-300">
          {t('title')}
        </p>
        <ol className="space-y-1 border-l border-(--category-color) dark:border-gray-400">
          {numbered.map((h) => (
            <li key={h.id} className="list-none">
              <TocLink heading={h} isActive={activeId === h.id} onNavigate={() => {}} />
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}