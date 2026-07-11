// components/book-card.tsx
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { BookMeta } from '@/types'

export function BookCard({
  book,
  locale,
  yearLabel,
}: {
  book: BookMeta
  locale: string
  yearLabel: string | null
}) {
  return (
    <div className="group">
      <div className="rounded-lg shadow-md bg-black text-white dark:hover:bg-black overflow-hidden transform-gpu will-change-transform group-hover:-translate-y-3 transition-transform duration-300 pb-2">
        <div className="flex flex-col h-full items-center">
          <Link href={`/${locale}/library/${book.id}`} className="relative flex flex-col h-full items-center">
            <div className="w-full overflow-hidden z-0">
              <Image src={book.image} alt={book.title} width={600} height={900} className="block w-full h-auto object-cover" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t ease-in-out from-black via-darkBg/80 via-30% to-transparent" />
            <div className="absolute bottom-4 w-9/10 mx-auto text-left z-10 min-w-0">
              <h2 className="text-lg font-bold truncate">{book.title}</h2>
              <p>{book.author}</p>
              {yearLabel && <p>{yearLabel}</p>}
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}