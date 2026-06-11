import { getAllBooks, getBookById } from '@/app/lib/books';
import { routing } from '@/i18n/routing';
import { setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';
import Image from 'next/image';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';

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

  const book = getBookById(locale, id);     // <-- (locale, id)

  return (
    <main>
      <article>
        <header>
          <Image
            src={book.image}
            alt={book.title}
            width={200}
            height={300}
          />
          <h1>{book.title}</h1>
          <p>Author: {book.author}</p>
          {book.translator && <p>Translator: {book.translator}</p>}
        </header>

        <section style={{ marginTop: '2rem' }}>
          <MDXRemote
            source={book.content}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
              },
            }}
          />
        </section>
      </article>
    </main>
  );
}