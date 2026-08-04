import { useTranslations } from 'next-intl'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { use } from 'react'
import { Metadata } from 'next'
import { getAllBooks, sortBooksByDate, groupBooksByEra, BOOK_ERAS } from '@/app/lib/books'
import { formatBookYear } from '@/app/lib/yearFormat'
import { LibraryCategory } from '@/components/library-category'
import { ExpandableText } from '@/components/expandable-text'
import { FeaturedBook } from '@/components/featured-book'

type Params = { locale: string };

export async function generateMetadata(
  { params }: { params: Promise<Params> }
): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale)
  const t = await getTranslations('metaLibrary')
  return { title: t('title'), description: t('description') }
}

export default function Library({ params }: { params: Promise<Params> }) {
  const { locale } = use(params)
  setRequestLocale(locale)

  const t = useTranslations('library')
  const tDate = useTranslations('Date')

  const books = sortBooksByDate(getAllBooks(locale)).map((book) => ({
    ...book,
    yearLabel: formatBookYear(tDate, { year: book.year, yearRange: book.yearRange }),
  }))
  const grouped = groupBooksByEra(books)

  const featured = books[books.length - 1]

  return (
    <main className='m-4 xs:m-6'>
      <div className="max-w-300 mx-auto">

        <div className='mt-10 md:mt-30 pb-10 md:pb-30 mx-auto'>
          <section className='m-5 px-2 s:px-10'>

            <h1 className="text-5xl mb-5 font-default font-bold text-center">
            {t('title')}
          </h1>

          <div className="text-lg text-left">

            {/* Mobile: collapsible preview */}
            <div className="lg:hidden">
              <ExpandableText dropcapClassName='dropcap'>{t('description')}</ExpandableText>
            </div>

            <p className="dropcap hidden lg:block">
              {t('description')}
            </p>

          </div>
          </section>
        </div>

        {featured?.era && (
          <FeaturedBook book={featured} yearLabel={featured.yearLabel} era={featured.era} />
        )}

        <div className="mx-auto text-left">

          {BOOK_ERAS.map((era) => (
            <LibraryCategory
              key={era}
              era={era}
              books={grouped[era]}
            />
          ))}

        </div>
      </div>
    </main>
  );
}
