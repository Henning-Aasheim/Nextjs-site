import { useTranslations } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { use } from "react";
import { Metadata } from "next";
import Image from "next/image";
import { getAllBooks } from "@/app/lib/books";
import Link from "next/link";

// This is the metadata for the page

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata>{
  const {locale} = await params;

  setRequestLocale(locale);

  const t = await getTranslations('metaLibrary');

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function Library({ params }: { params: Promise<{ locale: string, id: string }> }) {
  const {locale} = use(params);
 
  // Enable static rendering
  setRequestLocale(locale);
  
  const t = useTranslations('library');

  const books = getAllBooks(locale);


  return (
    <div className="text-center pt-12">

        <h1 className="text-2xl 2xs:text-6xl md:text-[130px] mb-6 font-default font-bold w-4/5 xl:w-2/5 mx-auto">{t('title')}</h1>

        <p className="dropcap">{t('description')}</p>

        <ul>
          {books.map((book) => (
            <li key={book.id} className="flex gap-1 mb-2">
              <div className="min-w-30">
                <Link href={`/${locale}/library/${book.id}`}>
                  <Image src={book.image} alt={book.title} width={120} height={180} />
                  <div>
                    <h2>{book.title}</h2>
                    <p>{book.author}</p>
                  </div>
                </Link>
              </div>
            </li>
          ))}
        </ul>

    </div>  
  )
}