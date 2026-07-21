import { getAllBooks, getBookById } from '@/app/lib/books';
import { routing } from '@/i18n/routing';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import Image from 'next/image';
import { formatBookYear } from '@/app/lib/yearFormat';

export const dynamic = 'error';

type Params = { locale: string; id: string };

//
// 1) Generate all static paths
//
export async function generateStaticParams(): Promise<Params[]> {
  const locales = routing.locales; // usually a string[] from next-intl
  const params: Params[] = [];

  for (const locale of locales) {
    const books = getAllBooks(locale);
    for (const book of books) {
      params.push({ locale, id: book.id });
    }
  }

  return params;
}

//
// 2) Metadata per book (params is a Promise here)
//
export async function generateMetadata(
  { params }: { params: Promise<Params> }
): Promise<Metadata> {
  const { locale, id } = await params;      // <-- await the Promise
  const book = getBookById(locale, id);     // <-- correct argument order

  return {
    title: book.title,
    description: book.title,
  };
}

//
// 3) Page component (params is also a Promise)
//
export default async function BookPage(
  { params }: { params: Promise<Params> }
) {
  const { locale, id } = await params;      // <-- await the Promise

  // required by next-intl
  setRequestLocale(locale);
  const t = await getTranslations('books');
  const tDate = await getTranslations('Date'); 

  const book = getBookById(locale, id);     // <-- (locale, id)

  const yearLabel = formatBookYear(tDate, {
    year: book.year,
    yearRange: book.yearRange,
  })

  const { default: BookContent } = await import(`@/content/books/${locale}/${id}.mdx`)

  return (
    <main>
      <article className='max-w-160 mx-auto mt-6 px-4 sx:p-0'>
        <header>
          <Image src={book.image} alt={book.title} width={400} height={600} className='mx-auto mb-4'/>
          <h1 className='text-2xl text-center mb-4'>{book.title}</h1>
          <div className='text-gray-600 dark:text-gray-400'>
            <p className=''>{t('author')}: {book.author}</p>
            {yearLabel && <p className=''>{yearLabel}</p>}
            {book.translator && <p>{t('translator')}: {new Intl.ListFormat(locale, {style: 'long', type: 'conjunction'}).format(book.translator)}</p>}
          </div>
        </header>

        <section className='my-8'>
          <BookContent />
        </section>
      </article>
    </main>
  );
}