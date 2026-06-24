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
  
  const visibleArticles = [...allArticlesData]
  .sort((a, b) => {
    const aTime = new Date(a.date).getTime();
    const bTime = new Date(b.date).getTime();
    return bTime - aTime; // newest first
  })
  .slice(0, 5); 

  const totalArticles = allArticlesData.length;

  return (
    <div className="w-full">

        <Hero t={t} />

  {/* Blog div */}

      <div className="dark:bg-darkAccent text-gold py-10">

        <h1 className="text-2xl sm:text-4xl mb-6 pb-3 font-default font-bold w-4/5 
                       md:w-1/2 xl:w-0.4 mx-auto border-gold border-solid border-b">{t('blog')}</h1>

        <div className="my-12">
          <ul className="grid grid-cols-1 gap-6 w-full items-start text-left">
            {visibleArticles.map((article, index) => {
              const displayNumber = totalArticles - index;
              const dateTime = new Date(article.date);

              return (
                <li
                  key={article.id}
                  className="group w-4/5 2xl:w-1/2 mx-auto mb-2 border-b border-gray-700 pb-4"
                >
                  <Link
                    href={`/blog/${article.id}`}
                    className="flex w-full items-start gap-6"
                  >
                    {/* Number */}
                    <div className="text-2xl font-mono text-gray-500 w-8 text-right">
                      { displayNumber }
                    </div>

                    {/* Main content */}
                    <div className="flex-1">
                      {/* Meta: date + category */}
                      <div className="mb-1 flex flex-wrap items-center gap-2 text-sm text-gray-400">
                        <span className="min-w-[9rem]">{format.dateTime(dateTime, { dateStyle: 'long' })}</span>
                        <span className="min-w-[7rem] uppercase tracking-wide text-xs font-semibold text-indigo-400">{article.category}</span>
                        <h2 className="text-lg sm:text-2xl font-default font-semibold mb-1">{article.title}</h2>
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
