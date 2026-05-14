import { getSortedArticles } from "../lib/articles"
import Link from "next/link"
import { useFormatter, useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";

export default function Home({ params }: { params: Promise<{ locale: string, date: string }> }) {
  const {locale} = use(params);
 
  // Enable static rendering
  setRequestLocale(locale);
  const t = useTranslations('home');
  const allArticlesData = getSortedArticles();

  const format = useFormatter()
  const dateTime = new Date(allArticlesData[0].date)

  return (
    <div className="text-center pt-12">
      <h1 className="text-4xl mb-6 font-default font-bold">{t('header')}</h1>

      <div className="grid gap-8">
        {allArticlesData.map((article) => (
          <article key={article.id} className="group">
              <Link href={`/blog/${article.id}`}>
              <h2 className="text-2xl font-default font-semibold">{article.title}</h2>
              <div className="font-default text-black/70 dark:text-olive-400">{format.dateTime(dateTime, { dateStyle: 'long' })}</div>
            </Link>
          </article>
        ))}
      </div>

    </div>

  
  )
}
