import { useTranslations } from 'next-intl';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { use } from 'react';
import { Metadata } from 'next';
import { getAllBooks, sortBooksByDate, groupBooksByEra, BOOK_ERAS } from '@/app/lib/books';
import { LibraryCategory } from '@/components/library-category';

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

  const books = sortBooksByDate(getAllBooks(locale));
  const grouped = groupBooksByEra(books);

  return (
    <div className="text-center pt-12">
      <h1 className="text-2xl 2xs:text-6xl md:text-[130px] mb-6 font-default font-bold w-4/5 xl:w-2/5 mx-auto text-danger">
        {t('title')}
      </h1>

      <div className="w-10/11 md:w-4/5 lg:w-1/2 mx-auto text-left mb-10 text-primary">
        <p className="dropcap" style={{ '--dropcap-color': 'var(--color-danger)' } as React.CSSProperties}>
          {t('description')}
        </p>
      </div>

      <div className="w-10/11 md:w-4/5 mx-auto my-12 text-left">
        {BOOK_ERAS.map((era) => (
          <LibraryCategory
            key={era}
            era={era}
            books={grouped[era]}
            locale={locale}
            tDate={tDate}
          />
        ))}
      </div>
    </div>
  );
}
