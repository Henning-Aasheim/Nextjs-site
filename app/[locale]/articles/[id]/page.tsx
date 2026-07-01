import { getArticleData, getAllArticleIds } from "@/app/lib/articles";
import { routing } from "@/i18n/routing";
import { getFormatter, setRequestLocale} from 'next-intl/server';
import { Metadata } from "next";

// This generates the static paths to the articles based on locale and article id

export async function generateStaticParams() {
  const locales = await routing.locales
  const posts = await getAllArticleIds()

  return locales.flatMap((locale) => 
    posts.map((post) => ({
    locale,
    id: post.params.id,
  }))
 )
}

// This generates metadata by using the title and category for each article

export async function generateMetadata(props: { params: Promise<{id: string}> }): Promise<Metadata>{
  const params = await props.params
  const articleContent = await getArticleData(params.id)

  return {
    title: articleContent.title, 
    description: articleContent.category,
  };
}

// This is the main page component

export default async function Article(props: { params: Promise<{id: string, locale: string, date: string}> }) {
    const params = await props.params
    const articleContent = await getArticleData(params.id)

    setRequestLocale(params.locale)

    const format = await getFormatter()
    const dateTime = new Date(articleContent.date)

    return (
        <section className="mx-auto md:w-4/5 xl:w-3/5 max-w-[900px] p-10 m-5 bg-white/20">
            <img src={articleContent.image} alt={articleContent.title} className="object-cover aspect-3/2 mx-auto" />
              <div className="max-w-[65ch] mx-auto">
                <h1 className="text-xl sm:text-4xl font-default font-bold text-center py-5 mx-auto text-center text-primary">{articleContent.title}</h1>
                <div className="font-default text-black/70 dark:text-white/70 pb-5">{format.dateTime(dateTime, { dateStyle: 'long' })}</div>
            </div>
          <article className="prose mx-auto prose-ul:marker:text-black prose-h2:before:content-['§_'] 
                            prose-h2:before:text-primary prose-h2:before:text-sm prose-h2:before:top-1
                              prose-h2:before:left-0 prose-h2:before:absolute prose-h2:relative prose-h2:pl-2" 
                            dangerouslySetInnerHTML={{ __html: articleContent.contentHtml }} />
        </section>
    );
}
