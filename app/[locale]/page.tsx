import { getAllArticles, getArticleData } from "../lib/articles"
import Link from "next/link"
import { getFormatter, getTranslations, setRequestLocale } from "next-intl/server"
import Hero from "@/components/hero"
import { RecentArticlesList } from "@/components/recent-articles-list"
import Shinshu from '../icons/shinshu.svg'

export default async function Home({
  params,
}: {
  params: { locale: string }
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations({ locale, namespace: "home" })
  const format = await getFormatter({ locale })

  const allArticlesData = await getAllArticles()

  const sortedArticles = [...allArticlesData].sort((a, b) => {
    const aTime = new Date(a.frontmatter.date).getTime()
    const bTime = new Date(b.frontmatter.date).getTime()
    return bTime - aTime
  })

  const newestArticleMeta = sortedArticles[0] ?? null
  const newestArticle = newestArticleMeta
    ? await getArticleData(newestArticleMeta.id)
    : null

  const totalArticles = allArticlesData.length

  return (
    <div className="w-full">
      <div className="m-4 xs:m-6">

{/* NAME */}

        <div className="max-w-300 mx-auto mt-10 md:mt-15 lg:mt-30 flex flex-row">
          <div className="w-full md:w-5/13"><Shinshu className="h-50 mx-auto fill-gray-800 dark:fill-white md:float-right md:pr-20"/></div>
          <div className="nameLogo hidden md:inline md:w-8/13 md:pl-20 md:border-l md:border-gray-400">{t('name')}</div>
        </div>

{/* HERO */}

        <div className="h-full max-w-300 mx-auto mt-10 md:mt-15 lg:mt-30">
            <Hero />
          </div>

{/* I have to see if I can do something with this div. I now have a lot of divs saying the same, find something that doesn't break the scroll */}

        <div className="flex flex-col max-w-300 mx-auto">

{/* Newest article — unchanged */}

          <div className="mt-10 md:mt-30 pb-10 md:pb-30 border-b border-gray-600/30 dark:border-white/40">
            {newestArticle && (
              <section className="m-5 px-2 s:px-10">

                <div className="flex flex-wrap items-center justify-start gap-2 my-5 text-sm text-gray-500 dark:text-white/60">
                  <span>{t('newestArticle')}</span>
                  <span aria-hidden="true">·</span>
                  <span>{format.dateTime(new Date(newestArticle.date), { dateStyle: 'long' })}</span>
                  <span aria-hidden="true">·</span>
                  <span className="uppercase text-cyan">{newestArticle.category}</span>
                </div>

                
                  <div className="flex flex-col sm:flex-row gap-6 items-start">

                    {/* Text column */}
                    <div className="flex-1 order-2 sm:order-1">
                      <div className="text-3xl sm:text-5xl lg:text-8xl mb-2">{newestArticle.title}</div>
                      <p className="mt-3 md:text-lg max-w-[42ch] sm:pr-6 text-gray-500 dark:text-white/60">{newestArticle.excerpt}</p>
                      <Link href={`/articles/${newestArticle.id}`} className="inline-block mt-5 px-5 py-2 text-lg text-gray-200 
                                                                              hover:text-white hover:shadow-lg bg-cyan 
                                                                              rounded-full hover:scale-105 dark:bg-cyan/60">{t('articleButton')}</Link>
                    </div>

                    {/* Image column */}
                    <img
                      src={newestArticle.image}
                      alt={newestArticle.title}
                      className="order-1 sm:order-2 w-full sm:w-2/5 shrink-0 aspect-3/2 object-cover max-h-80 self-center"
                    />
                  </div>
                
              </section>
            )}
          </div>

{/* Blog div */}

          <div className="mt-10 md:mt-30 pb-10 md:pb-30 md:px-10 border-b border-gray-600/30 dark:border-white/40">
            <RecentArticlesList articles={sortedArticles} totalArticles={totalArticles} />
          </div>

{/* placeholder blocks 10/11 unchanged */}
          <div className="mt-10 md:mt-30 pb-10 md:pb-30 border-b border-gray-600/30 dark:border-white/40">10</div>


{/* placeholder blocks 10/11 unchanged */}
          <div className="mt-10 md:mt-30 pb-10 md:pb-30 border-b border-gray-600/30 dark:border-white/40">11</div>


        </div>
      </div>
    </div>  
  )
}