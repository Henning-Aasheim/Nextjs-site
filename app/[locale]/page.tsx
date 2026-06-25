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
      <div className="m-4 xs:m-10">
        <div className="flex flex-col lg:grid lg:grid-cols-6 grid-rows-5 lg:grid-rows-9 gap-10 max-w-[1200px] mx-auto">

        <div className="lg:col-span-6 lg:row-span-3 bg-darkBlue">
          <Hero t={t} />
        </div>

        <div className="lg:col-span-4 lg:col-start-1 lg:row-span-2 lg:row-start-4 bg-orange">

          {/* Blog div */}

          <div className="dark:bg-darkAccent text-lightBg py-10 w-10/11 mx-auto">

            <h1 className="text-2xl sm:text-4xl pb-3 font-default font-bold mx-auto border-lightBg border-solid border-b">{t('blog')}</h1>

            <div className="w-full overflow-hidden">
              <ul className="grid grid-cols-1 w-full items-start text-left">
                {visibleArticles.map((article, index) => {
                  const displayNumber = totalArticles - index;
                  const dateTime = new Date(article.date);

                  return (
                    <li key={article.id} className="group w-full mx-auto border-b border-lightBg py-4 hover:bg-orangeDark">
                      <Link href={`/blog/${article.id}`} className="flex w-full items-start gap-6">

                        {/* Main content */}
                        <div className="flex-1">
                          {/* Meta: date + category */}
                          <div className="flex items-center gap-2 text-sm text-lightBg overflow-hidden">
                            <span className="min-w-[2rem] text-2xl font-display text-lightBg text-center">{ displayNumber }</span>
                            <span className="min-w-[9rem]">{format.dateTime(dateTime, { dateStyle: 'long' })}</span>
                            <span className="min-w-[7rem] uppercase tracking-wide text-xs font-semibold text-lightText">{article.category}</span>
                            <h2 className="min-w-[9rem] text-lg sm:text-lg font-default font-semibold text-wrap">{article.title}</h2>
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

        <div className="lg:col-span-2 lg:row-span-2 lg:col-start-5 lg:row-start-4 bg-darkBlue">9</div>
        <div className="lg:col-span-3 lg:row-span-2 lg:row-start-6 bg-orange">10</div>
        <div className="lg:col-span-3 lg:row-span-2 lg:col-start-4 lg:row-start-6 bg-orange">11</div>

      </div>
      </div>
    </div>  
  )
}
