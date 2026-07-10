import { getAllArticles, getArticleData } from "../lib/articles"
import Link from "next/link"
import { getFormatter, getTranslations, setRequestLocale } from "next-intl/server";
import Hero from "@/components/hero";

export default async function Home({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = await params;
 
  // Enable static rendering
  setRequestLocale(locale);

  // SERVER APIs instead of hooks
  const t = await getTranslations({ locale, namespace: "home" });
  const format = await getFormatter({ locale });

  const allArticlesData = getAllArticles();
  
  const visibleArticles = [...allArticlesData]
  .sort((a, b) => {
    const aTime = new Date(a.frontmatter.date).getTime();
    const bTime = new Date(b.frontmatter.date).getTime();
    return bTime - aTime; // newest first
  })
  .slice(0, 5); 

  const newestArticleMeta = visibleArticles[0] ?? null;

  // Load full newest article (with contentHtml + excerpt) safely
  const newestArticle = newestArticleMeta
    ? await getArticleData(newestArticleMeta.id)
    : null;

  const totalArticles = allArticlesData.length;

  return (
    <div className="w-full">
      <div className="m-4 xs:m-6">
        <div className="
  flex flex-col
  lg:grid lg:grid-cols-6 lg:grid-rows-9
  lg:auto-rows-[1fr]      // each row = 1fr at lg
  gap-6 max-w-[1200px] mx-auto
">
        <div className="lg:col-span-6 lg:row-span-3 lg:h-full">
          <Hero t={t} />
        </div>

        {/* Blog div */}
        <div className="lg:col-span-4 lg:col-start-1 lg:row-span-3 lg:row-start-4 
                        bg-secondary dark:rounded-lg
                        dark:bg-[color-mix(in_srgb,var(--color-secondary)_12%,var(--color-darkNavyLight))]
                        dark:border dark:border-secondary/60
                        dark:shadow-[0_0_20px] dark:shadow-secondary/10">

          <div className="text-white py-10 w-10/11 mx-auto">

            <h1 className="text-2xl sm:text-4xl pb-3 mx-auto border-white border-solid border-b">{t('articles')}</h1>

            <div className="w-full overflow-hidden">
              <ul className="grid grid-cols-1 w-full items-start text-left">
                {visibleArticles.map((article, index) => {
                  const displayNumber = totalArticles - index;
                  const dateTime = new Date(article.frontmatter.date);

                  return (
                    <li
                      key={article.id}
                      className="group w-full mx-auto border-b border-white py-4 hover:bg-primary"
                    >
                      <Link
                        href={`/articles/${article.id}`}
                        className="flex w-full items-stretch gap-6"
                      >
                        {/* Number column (always vertically centered) */}
                        <div className="flex items-center">
                          <span className="min-w-[2rem] text-2xl font-display text-lightBg text-center">
                            {displayNumber}
                          </span>
                        </div>

                        {/* Right side: date, category, title */}
                        <div className="flex-1">
                          {/* Wrapper for meta + title */}
                          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 w-full text-sm text-white">
                            {/* Date + category row */}
                            <div
                              className="
                                w-full
                                flex justify-between
                                sm:w-auto sm:justify-start sm:items-center sm:gap-2
                              "
                            >
                              <span className="sm:min-w-[9rem]">
                                {format.dateTime(dateTime, { dateStyle: "long" })}
                              </span>

                              <span
                                className="
                                  uppercase tracking-wide text-xs font-semibold text-background
                                  text-right sm:text-left sm:min-w-[7rem]
                                "
                              >
                                {article.frontmatter.category}
                              </span>
                            </div>

                            {/* Title */}
                            <h2 className="sm:min-w-[9rem] text-lg font-default font-semibold text-wrap">
                              {article.frontmatter.title}
                            </h2>
                          </div>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>

        {/* Newest article */}
        <div className="lg:col-span-2 lg:row-span-3 lg:col-start-5 lg:row-start-4 
                        bg-danger dark:rounded-lg
                        dark:bg-[color-mix(in_srgb,var(--color-danger)_12%,var(--color-darkNavyLight))]
                        dark:border dark:border-danger/60
                        dark:shadow-[0_0_20px] dark:shadow-danger/10">
              {newestArticle && (
                <section className="m-5">
                  <h2 className="text-white text-4xl text-center my-5">{t('newestArticle')}</h2>
                  <div className="max-w-[20rem] mx-auto">
                    <Link href={`/articles/${newestArticle.id}`} className="block">
                      <img src={newestArticle.image} alt={newestArticle.title} className="mb-2 lg:w-full aspect-3/2 object-cover max-h-[20rem] mx-auto" />
                      <div className="text-white text-2xl mb-2">{newestArticle.title}</div>
                      <div className="relative w-full mx-auto min-h-[1rem] text-gray-300 text-sm">
                        <span className="absolute left-0 ">{format.dateTime(new Date(newestArticle.date), { dateStyle: 'long' })}</span>
                        <span className="absolute right-0 uppercase text-background">{newestArticle.category}</span>
                      </div>
                      <p className="mt-3 text-white text-sm">{newestArticle.excerpt}</p>
                    </Link>
                  </div>
                </section>
              )}
        </div>

        <div className="lg:col-span-3 lg:row-span-2 lg:row-start-7 
                        bg-primary dark:rounded-lg
                        dark:bg-[color-mix(in_srgb,var(--color-primary)_12%,var(--color-darkNavyLight))]
                        dark:border dark:border-primary/60
                        dark:shadow-[0_0_20px] dark:shadow-primary/10">10</div>
        <div className="lg:col-span-3 lg:row-span-2 lg:col-start-4 lg:row-start-7 
                        bg-secondary dark:rounded-lg
                        dark:bg-[color-mix(in_srgb,var(--color-secondary)_12%,var(--color-darkNavyLight))]
                        dark:border dark:border-secondary/60
                        dark:shadow-[0_0_20px] dark:shadow-secondary/10">11</div>

      </div>
      </div>
    </div>  
  )
}
