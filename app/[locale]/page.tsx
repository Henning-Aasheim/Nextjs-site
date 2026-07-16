import { getAllArticles, getArticleData } from "../lib/articles"
import Link from "next/link"
import { getFormatter, getTranslations, setRequestLocale } from "next-intl/server";
import Hero from "@/components/hero";
import { RecentArticlesList } from "@/components/recent-articles-list";

export default async function Home({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "home" });
  const format = await getFormatter({ locale });

  const allArticlesData = getAllArticles();

  const sortedArticles = [...allArticlesData].sort((a, b) => {
    const aTime = new Date(a.frontmatter.date).getTime();
    const bTime = new Date(b.frontmatter.date).getTime();
    return bTime - aTime;
  });

  const newestArticleMeta = sortedArticles[0] ?? null;
  const newestArticle = newestArticleMeta
    ? await getArticleData(newestArticleMeta.id)
    : null;

  const totalArticles = allArticlesData.length;

  return (
    <div className="w-full">
      <div className="m-4 xs:m-6">

{/* HERO */}

        <div className="h-full lg:">
            <Hero t={t} />
          </div>

        <div className="flex flex-col max-w-[1200px] mx-auto">

{/* Newest article — unchanged */}

          <div className="lg:col-span-2 lg:row-span-3 lg:col-start-5 lg:row-start-4 
                          bg-background dark:rounded-lg
                          dark:bg-[color-mix(in_srgb,var(--color-danger)_12%,var(--color-darkNavyLight))]
                          dark:border dark:border-danger/60
                          dark:shadow-[0_0_20px] dark:shadow-danger/10 dark:hover:shadow-danger/40">
            {newestArticle && (
              <section className="m-5">
                <h2 className="text-4xl text-center my-5">{t('newestArticle')}</h2>
                <div className="max-w-[20rem] mx-auto">
                  <Link href={`/articles/${newestArticle.id}`} className="block">
                    <img src={newestArticle.image} alt={newestArticle.title} className="mb-2 lg:w-full aspect-3/2 object-cover max-h-[20rem] mx-auto" />
                    <div className="text-2xl mb-2">{newestArticle.title}</div>
                    <div className="relative w-full mx-auto min-h-[1rem] text-gray-600 text-sm">
                      <span className="absolute left-0 ">{format.dateTime(new Date(newestArticle.date), { dateStyle: 'long' })}</span>
                      <span className="absolute right-0 uppercase text-secondary">{newestArticle.category}</span>
                    </div>
                    <p className="mt-3 text-sm">{newestArticle.excerpt}</p>
                  </Link>
                </div>
              </section>
            )}
          </div>

{/* Blog div */}

          <div className="bg-background dark:rounded-lg
                          dark:bg-[color-mix(in_srgb,var(--color-secondary)_12%,var(--color-darkNavyLight))]
                          dark:border dark:border-secondary/60
                          dark:shadow-[0_0_20px] dark:shadow-secondary/10">
            <RecentArticlesList articles={sortedArticles} totalArticles={totalArticles} />
          </div>

          {/* placeholder blocks 10/11 unchanged */}
          <div className="bg-background dark:rounded-lg
                          dark:bg-[color-mix(in_srgb,var(--color-tertiary)_12%,var(--color-darkNavyLight))]
                          dark:border dark:border-tertiary/60
                          dark:shadow-[0_0_20px] dark:shadow-tertiary/10">10</div>
          <div className="bg-background dark:rounded-lg
                          dark:bg-[color-mix(in_srgb,var(--color-quarternary)_12%,var(--color-darkNavyLight))]
                          dark:border dark:border-quarternary/60
                          dark:shadow-[0_0_20px] dark:shadow-quarternary/10">11</div>
        </div>
      </div>
    </div>  
  )
}