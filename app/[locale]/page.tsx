import { getSortedArticles } from "../lib/articles"
import Link from "next/link"
import Date from "@/components/date";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";

export default function Home({ params }: { params: Promise<{ locale: string }> }) {
  const {locale} = use(params);
 
  // Enable static rendering
  setRequestLocale(locale);
  const t = useTranslations('home');
  const allArticlesData = getSortedArticles();

  return (
    <div className="text-center pt-12">
      <h1 className="text-4xl mb-6 font-playfair font-bold">{t('header')}</h1>

      <div className="grid gap-8">
        {allArticlesData.map((article) => (
          <article key={article.id} className="group">
              <Link href={`/blog/${article.id}`}>
              <h2 className="text-2xl font-playfair font-semibold">{article.title}</h2>
              <div className="font-playfair-sc text-black/70 dark:text-olive-400"><Date dateString={article.date} /></div>
            </Link>
          </article>
        ))}
      </div>

    </div>

  
  )
}
