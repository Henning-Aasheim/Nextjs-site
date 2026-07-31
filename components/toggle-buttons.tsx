import { useTranslations } from "next-intl"
import { LayoutGrid, ListIcon } from "lucide-react"
import { ArticleCategory } from "@/types"
import { CATEGORY_STYLES } from "./category-badge"

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

    return (
        <div className="flex flex-wrap justify-center gap-3 mb-10">
                <button
                    onClick={() => onChange('all')}
                    className={`categoryFilterButton px-4 py-1.5 rounded-full text-sm font-semibold uppercase tracking-wide border transition-colors cursor-pointer
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
                                    ${active === cat ? CATEGORY_STYLES[cat].replace(/bg-\S+\/15/, 'bg-current/20') : 
                                      'bg-transparent text-black/50 dark:text-white/50 border-black/20 dark:border-white/20 hover:text-black dark:hover:text-white'
                                    }`}>
                        {t(cat)}
                    </button>
                    ))}
              </div>
    )
}