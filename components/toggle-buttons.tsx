'use client'

import { useTranslations } from "next-intl"
import { LayoutGrid, ListIcon } from "lucide-react"
import { ArticleCategory } from "@/types"
import { useEffect, useRef, useState } from "react"

export const FILTER_CATEGORY_STYLES: Record<ArticleCategory, string> = {
  politics: `
    bg-violet/20 border-violet text-black
    dark:bg-violet/20 dark:text-white
  `,
  international: `
    bg-cyan/20 border-cyan text-black
    dark:bg-cyan/20 dark:text-white
  `,
  economy: `
    bg-red/20 border-red text-black
    dark:bg-red/20 dark:text-white
  `,
  society: `
    bg-yellow/20 border-yellow text-black
    dark:bg-yellow/20 dark:text-white
  `,
  webDevelopment: `
    bg-purple/20 border-purple text-black
    dark:bg-purple/20 dark:text-white
  `,
}


type View = 'cards' | 'list'

export function CardListButtons({ view, onChange }: { view: View, onChange: (view: View) => void }) {
    const t = useTranslations('cardListToggle')


    return (
        <div className="flex justify-center sm:justify-end w-4/5 sm:w-3/5 md:w-4/5 2xl:w-10/11 mx-auto mb-4 gap-2">

            <button
                onClick={() => onChange('cards')}
                aria-pressed={view === 'cards'}
                aria-label={t('cardView')}
                className={`p-2 rounded-full border transition-colors cursor-pointer
                    ${view === 'cards'
                        ? 'bg-cyan text-white border-cyan'
                        : 'bg-transparent text-cyan/80 dark:text-white/60 border-cyan/60 dark:border-white/20 hover:text-cyan dark:hover:text-white'
                    }`}
            >
                <LayoutGrid size={18} />
            </button>

            <button
                onClick={() => onChange('list')}
                aria-pressed={view === 'list'}
                aria-label={t('listView')}
                className={`p-2 rounded-full border transition-colors cursor-pointer
                    ${view === 'list'
                        ? 'bg-cyan text-white border-cyan'
                        : 'bg-transparent text-cyan/80 dark:text-white/60 border-cyan/60 dark:border-white/20 hover:text-cyan dark:hover:text-white'
                    }`}
            >
                <ListIcon size={18} />
            </button>

        </div>
    )

}

const ARTICLE_CATEGORIES: ArticleCategory[] = [
  'politics',
  'international',
  'economy',
  'society',
  'webDevelopment',
]

type Active = ArticleCategory | 'all'

export function CategoryButtons({active, onChange }: { active: Active, onChange: (active: Active) => void}) {

    const t = useTranslations('categories')

    const scrollRef = useRef<HTMLDivElement>(null)
      const [canScrollLeft, setCanScrollLeft] = useState(false)
      const [canScrollRight, setCanScrollRight] = useState(false)
    
      const updateScrollState = () => {
        const el = scrollRef.current
        if (!el) return
        setCanScrollLeft(el.scrollLeft > 4)
        setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4)
      }
    
      useEffect(() => {
        updateScrollState()
        const el = scrollRef.current
        if (!el) return
    
        el.addEventListener('scroll', updateScrollState)
        window.addEventListener('resize', updateScrollState)
        return () => {
          el.removeEventListener('scroll', updateScrollState)
          window.removeEventListener('resize', updateScrollState)
        }
      }, [])

    return (
        <div ref={scrollRef}
            className={`categoryFilter flex flex-nowrap [-ms-overflow-style:none] scrollbar-none [&::-webkit-scrollbar]:hidden gap-3 overflow-x-auto transition-[mask-image]
                        ${canScrollLeft ? 'mask-l-from-70%' : ''}
                        ${canScrollRight ? 'mask-r-from-70%' : ''}`}>
                <button
                    onClick={() => onChange('all')}
                    className={`categoryFilterButton shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold uppercase tracking-wide border transition-colors cursor-pointer
                        ${active === 'all'
                        ? 'bg-cyan text-white border-cyan'
                        : 'bg-transparent text-cyan/80 dark:text-white/60 border-cyan/60 dark:border-white/20 hover:text-cyan dark:hover:text-white'
                        }`}
                    >
                    {t('all')}
                    </button>
        
                    {ARTICLE_CATEGORIES.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => onChange(cat)}
                        className={`categoryFilterButton px-4 py-1.5 rounded-full text-sm 
                                    font-semibold uppercase tracking-wide border transition-colors cursor-pointer
                                    ${active === cat ? FILTER_CATEGORY_STYLES[cat] : 
                                      'bg-transparent text-black/50 dark:text-white/50 border-black/20 dark:border-white/20 hover:text-black/80 dark:hover:text-white'
                                    }`}>
                        {t(cat)}
                    </button>
                    ))}
              </div>
    )
}