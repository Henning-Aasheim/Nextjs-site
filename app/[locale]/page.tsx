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
    <div className="text-center pt-12 mb-10">
      <img src='/profile_image.jpg' alt="Profile Image" className="w-48 h-48 object-cover rounded-full mx-auto mb-6" />

      <h1 className="text-4xl mb-6 font-default font-bold">{t('header')}</h1>

      <p className="text-xl text-left mb-12 w-4/5 md:w-1/2 xl:w-0.4 mx-auto font-default text-black/80 dark:text-gray-300">{t('description')}</p>

      <h1 className="text-4xl mb-6 font-default font-bold">{t('blog')}</h1>
      <div className="grid gap-8">
        {allArticlesData.map((article) => (
          <article key={article.id} className="group">
              <Link href={`/blog/${article.id}`}>
              <h2 className="text-2xl font-default font-semibold">{article.title}</h2>
              <div className="font-default text-black/70 dark:text-gray-300">{format.dateTime(dateTime, { dateStyle: 'long' })}</div>
            </Link>
          </article>
        ))}
      </div>

    </div>

  
  )
}
