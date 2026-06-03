import { getArticleData, getAllArticleIds } from "@/app/lib/articles";
import { getFormatter, setRequestLocale} from 'next-intl/server';

export async function generateStaticParams() {
  const locales = ['en', 'ja', 'no']
  const posts = await getAllArticleIds()

  return locales.flatMap((locale) => 
    posts.map((post) => ({
    locale,
    id: post.params.id,
  }))
 )
}

export default async function Article(props: { params: Promise<{id: string, locale: string, date: string}> }) {
    const params = await props.params
    const articleContent = await getArticleData(params.id)

    setRequestLocale(params.locale)

    const format = await getFormatter()
    const dateTime = new Date(articleContent.date)

    return (
        <section className="mx-auto mb-10 w-4/5 md:w-1/2 xl:w-1/3">
            <img src={articleContent.image} alt={articleContent.title} className="rounded-lg mt-10 object-cover aspect-3/2" />
            <h1 className="flex text-2xl sm:text-4xl font-default font-bold text-center py-5">{articleContent.title}</h1>
                <div className="font-default text-black/70 dark:text-white/70 pb-5">{format.dateTime(dateTime, { dateStyle: 'long' })}</div>
            <article className="article" dangerouslySetInnerHTML={{ __html: articleContent.contentHtml }} />
        </section>
    );
}
