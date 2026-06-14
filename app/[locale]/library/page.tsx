import { useTranslations } from 'next-intl';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { use } from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import { getAllBooks, sortBooksByDate } from '@/app/lib/books';
import Link from 'next/link';
import { formatBookYear } from '@/app/lib/yearFormat';

type Params = { locale: string };

// Metadata
export async function generateMetadata(
  { params }: { params: Promise<Params> }
): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('metaLibrary');

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default function Library(
  { params }: { params: Promise<Params> }
) {
  const { locale } = use(params);

  setRequestLocale(locale);

  const t = useTranslations('library');
  const tDate = useTranslations('Date');       // <- for year formatting

  const books = sortBooksByDate(getAllBooks(locale));

  return (
    <div className="text-center pt-12">
      <h1 className="text-2xl 2xs:text-6xl md:text-[130px] mb-6 font-default font-bold w-4/5 xl:w-2/5 mx-auto">
        {t('title')}
      </h1>

      <div className='w-10/11 md:w-4/5 lg:w-1/2 mx-auto text-left mb-10'>
        <p className="dropcap">{t('description')}</p>
      </div>
      
      <div className='w-10/11 md:w-4/5 lg:w-1/2 mx-auto'>
        <h2 className="text-6xl">{t('books')}:</h2>
      </div>

      <div className="w-10/11 md:w-4/5 mx-auto my-12">
        <ul className="grid grid-cols-1 s:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 items-start text-left">
          {books.map((book) => {
            const yearLabel = formatBookYear(tDate, {
              year: book.year,
              yearRange: book.yearRange,
            });

            return (
              <li key={book.id} className="mb-2">
                <Link
                  href={`/${locale}/library/${book.id}`}
                  className="flex flex-col h-full items-center" // center card contents
                >
                  {/* Fixed-width, fixed-height image slot */}
                  <div className="w-[180px] h-[270px] flex items-start justify-center">
                    <Image
                      src={book.image}
                      alt={book.title}
                      width={180}
                      height={270}
                      className="w-[180px] h-auto max-h-[270px]"
                    />
                  </div>

                  {/* Text always starts after the same slot height */}
                  <div className="mt-2 w-[180px] text-left">
                    <h2 className="text-xl">{book.title}</h2>
                    <p>{book.author}</p>
                    {yearLabel && <p>{yearLabel}</p>}
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
