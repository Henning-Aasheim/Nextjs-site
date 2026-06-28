import { useFormatter, useTranslations } from "next-intl";
import { getSortedArticles } from "../../lib/articles";
import { setRequestLocale, getTranslations } from "next-intl/server";
import Link from "next/link";
import { use } from "react";
import { Metadata } from "next";

// This is the metadata for the page

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata>{
  const {locale} = await params;

  setRequestLocale(locale);

  const t = await getTranslations('metaArticles');

  return {
    title: t("title"),
    description: t("description"),
  };
}

// This is the main page component 

export default function articlesPage({ params }: { params: Promise<{ locale: string, date: string }> }) {
    const {locale} = use(params);
             
    // Enable static rendering
    setRequestLocale(locale);

    const t = useTranslations('articles');

    const allArticlesData = getSortedArticles();
    const format = useFormatter()
    const dateTime = new Date(allArticlesData[0].date)

    return (
        <div className="text-center pt-12 mb-10 w-10/11 mx-auto 2xl:w-5/6">
            <h1 className="text-3xl font-bold mb-8 font-default">{t('heading')}</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 
                            w-4/5 sm:w-3/5 md:w-4/5 2xl:w-10/11
                            mx-auto md:gap-10">
                {allArticlesData.map((article) => (
                    <article key={article.id} className="group hover:scale-105 transition-transform duration-100 mb-5">
                        <div className="flex justify-center mb-5">
                            <Link href={`/articles/${article.id}`} className="w-full">
                                <img src={article.image} alt={article.title} className="rounded-lg mb-2 w-full aspect-3/2 object-cover" />
                                <h2 className="text-lg sm:text-2xl font-default font-semibold 
                                               text-center">{article.title}</h2>
                                <div className="font-default text-black/70 dark:text-gray-300">{format.dateTime(dateTime, { dateStyle: 'long' })}</div>
                            </Link>
                        </div>
                    </article>
        ))}
      </div>

        </div>
    );
}