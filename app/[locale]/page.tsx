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
        <div className="grid gap-8 w-4/5 md:w-1/2 xl:w-0.4 mx-auto">
          {allArticlesData.map((article) => (
            <article key={article.id} className="group max-w-lg mx-auto">
                <Link href={`/blog/${article.id}`}>
                  <h2 className="text-lg sm:text-2xl mb-2 mx-2 sm:mx-0 font-default font-semibold 
                              group-hover:scale-110 group-hover:transition-transform transition-duration-100">{article.title}</h2>
                  <div className="font-default text-gray-300 
                                group-hover:scale-110 group-hover:transition-transform transition-duration-100">{format.dateTime(dateTime, { dateStyle: 'long' })}</div>
              </Link>
            </article>
          ))}
        </div>

      </div>

    </div>  
  )
}
