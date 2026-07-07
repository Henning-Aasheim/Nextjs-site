import { getArticleById, getAllArticleIds } from "@/app/lib/articles";
import { routing } from "@/i18n/routing";
import { getFormatter, setRequestLocale} from 'next-intl/server';
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { MDXRemote } from 'next-mdx-remote/rsc';

interface ArticleProps {
  params: Promise<{ id: string, locale: string }>;
}

// This generates the static paths to the articles based on locale and article id

export async function generateStaticParams() {
  return getAllArticleIds().map((article) => ({ id: article.params.id, locale: routing.defaultLocale }));
}

// This generates metadata by using the title and category for each article

export async function generateMetadata({ params }: ArticleProps) {
  const { id } = await params
  const article = await getArticleById(id)
  if (!article) return {}
  return {
    title: article.frontmatter.title,
    description: article.frontmatter.category,
    openGraph: {
      title: article.frontmatter.title,
      description: article.frontmatter.category,
      images: [article.frontmatter.image],
    },
  };
}

// This is the main page component

export default async function Article({ params }: ArticleProps) {
  const { id, locale } = await params
  const article = await getArticleById(id)

  const format = await getFormatter()

  if (!article) notFound()

  const dateTime = new Date(article.frontmatter.date)
  return (
    <section className="mx-auto md:w-4/5 xl:w-3/5 max-w-[900px] p-10 m-5 bg-white/20">
      <img src={article.frontmatter.image} alt={article.frontmatter.title} className="object-cover aspect-3/2 mx-auto" />
              <div className="max-w-[65ch] mx-auto">
                <h1 className="text-xl sm:text-4xl font-default font-bold text-center py-5 mx-auto text-primary">{article.frontmatter.title}</h1>
                <div className="font-default text-black/70 dark:text-white/70 pb-5">{format.dateTime(dateTime, { dateStyle: 'long' })}</div>
            </div>
          <article className="prose mx-auto prose-ul:marker:text-black prose-h2:before:content-['§_'] 
                            prose-h2:before:text-primary prose-h2:before:text-sm prose-h2:before:top-1
                              prose-h2:before:left-0 prose-h2:before:absolute prose-h2:relative prose-h2:pl-2">
            <MDXRemote source={article.content} />
          </article>
        </section>


    );
}
