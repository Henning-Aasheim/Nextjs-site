import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { BookMeta } from '@/types'

export function BookCard({
  book,
  yearLabel,
}: {
  book: BookMeta
  yearLabel: string | null
}) {
  return (
    <div className="group">
      <Link
        href={`/library/${book.id}`}
        className="
          flex flex-col
          transform-gpu will-change-transform
          group-hover:-translate-y-2 transition-transform duration-300
        "
      >
        {/* Image: full cover shown, never cropped */}
        <div className="relative w-full aspect-[2/3]">
          <Image
            src={book.image}
            alt={book.title}
            fill
            className="object-contain object-top"
            sizes="(max-width: 1024px) 30vw, 12vw"
          />
        </div>

        {/* Text: below the image, natural height */}
        <div className="px-2 py-2 text-left">
          <h2 className="text-sm font-bold leading-tight line-clamp-2 text-white">
            {book.title}
          </h2>
          <p className="text-xs text-gray-200 truncate">{book.author}</p>
          {yearLabel && <p className="text-xs text-gray-300 dark:text-gray-400">{yearLabel}</p>}
        </div>
      </Link>
    </div>
  )
}