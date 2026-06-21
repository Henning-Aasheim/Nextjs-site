import { getSortedArticles } from "../lib/articles"
import Link from "next/link"
import { useFormatter, useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";
import Hero from "@/components/hero";

export default function Home({ params }: { params: Promise<{ locale: string, date: string }> }) {
  const {locale} = use(params);
 
  // Enable static rendering
  setRequestLocale(locale);
  
  const t = useTranslations('home');
  const allArticlesData = getSortedArticles();

  const format = useFormatter()
  const dateTime = new Date(allArticlesData[0].date)

  return (
    <div className="w-full">

      <Hero t={t} />

  {/* Blog div */}

      <div className="dark:bg-darkAccent text-gold py-10 border-t border-solid border-gold">

        <h1 className="text-2xl sm:text-4xl mb-6 pb-3 font-default font-bold w-4/5 
                       md:w-1/2 xl:w-0.4 mx-auto border-gold border-solid border-b">{t('blog')}</h1>

        <div className="my-12">
  <ul className="grid grid-cols-1 gap-6 w-full items-start text-left">
    {allArticlesData.slice(0, 2).map((article, index) => {
      const dateTime = new Date(article.date);

      return (
        <li
          key={article.id}
          className="group w-4/5 mx-auto mb-2 border-b border-gray-700 pb-4"
        >
          <Link
            href={`/blog/${article.id}`}
            className="flex items-start gap-4"
          >
            {/* Number */}
            <div className="text-2xl font-mono text-gray-500 w-8 text-right">
              {index + 1}
            </div>

            {/* Main content */}
            <div className="flex-1">
              {/* Meta: date + category */}
              <div className="mb-1 flex flex-wrap items-center gap-2 text-sm text-gray-400">
                <span>{format.dateTime(dateTime, { dateStyle: 'long' })}</span>
                <span className="h-1 w-1 rounded-full bg-gray-500" />
                <h2 className="text-lg sm:text-2xl font-default font-semibold mb-1">{article.title} </h2>
                <span className="h-1 w-1 rounded-full bg-gray-500" />
                <span className="uppercase tracking-wide text-xs font-semibold text-indigo-400">
                  {article.category}
                </span>
              </div>

              {/* Title */}
              
            </div>
          </Link>
        </li>
      );
    })}
  </ul>
</div>

      </div>

    </div>  
  )
}
