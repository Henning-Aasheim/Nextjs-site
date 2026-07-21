import { useTranslations } from 'next-intl';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { use } from 'react';
import { Metadata } from 'next';
import { getAllBooks, sortBooksByDate, groupBooksByEra, BOOK_ERAS } from '@/app/lib/books';
import { formatBookYear } from '@/app/lib/yearFormat';
import { LibraryCategory } from '@/components/library-category';
import { ExpandableText } from '@/components/expandable-text';

type Params = { locale: string };

export async function generateMetadata(
  { params }: { params: Promise<Params> }
): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('metaLibrary');
  return { title: t('title'), description: t('description') };
}

export default function Library({ params }: { params: Promise<Params> }) {
  const { locale } = use(params);
  setRequestLocale(locale);

  const t = useTranslations('library');
  const tDate = useTranslations('Date');

  const books = sortBooksByDate(getAllBooks(locale)).map((book) => ({
    ...book,
    yearLabel: formatBookYear(tDate, { year: book.year, yearRange: book.yearRange }),
  }));
  const grouped = groupBooksByEra(books);

  return (
    <div className="text-center mt-5 mx-auto w-10/11 md:w-4/5 max-w-[1200px]">
      <div className='mx-auto dark:rounded-lg mb-5 p-5
                      dark:bg-[color-mix(in_srgb,var(--color-danger)_12%,var(--color-darkNavyLight))]
                      dark:border dark:border-danger/60
                      dark:shadow-[0_0_20px] dark:shadow-danger/10'>
        <h1 className="text-5xl mb-5 font-default font-bold mx-auto">
          {t('title')}
        </h1>

        <div className="text-lg text-left">

          {/* Mobile: collapsible preview */}
          <div className="lg:hidden">
            <ExpandableText dropcapClassName='dropcap-library'>{t('description')}</ExpandableText>
          </div>

          <p className="dropcap dropcap-library hidden lg:block">
            {t('description')}
          </p>
        </div>
      </div>

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
  );
}
