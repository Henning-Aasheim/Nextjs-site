import { getAllArticleIds, getArticleById } from "@/app/lib/articles";
import { extractHeadings } from "@/app/lib/toc";
import { routing } from "@/i18n/routing";
import { getFormatter, setRequestLocale } from 'next-intl/server';
import { notFound } from "next/navigation";
import { TableOfContents } from "@/components/toc";
import { CATEGORY_COLOR_VARS } from "@/components/category-badge";
import type { ArticleCategory } from "@/types";
import type { CSSProperties } from "react";

interface ArticleProps {
  params: Promise<{ id: string, locale: string }>;
}

export async function generateStaticParams() {
  return getAllArticleIds().map((article) => ({ id: article.params.id, locale: routing.defaultLocale }));
}

export async function generateMetadata({ params }: ArticleProps) {
  const { id } = await params
  try {
    const { frontmatter } = await import(`@/content/articles/${id}.mdx`)
    return {
      title: frontmatter.title,
      description: frontmatter.category,
      openGraph: {
        title: frontmatter.title,
        description: frontmatter.category,
        images: [frontmatter.image],
      },
    };
  } catch {
    return {}
  }
}

export default async function Article({ params }: ArticleProps) {
  const { id, locale } = await params
  setRequestLocale(locale)
  const format = await getFormatter()

  let ArticleContent: React.ComponentType
  let frontmatter: { image: string; title: string; date: string; category: ArticleCategory }

  try {
    const mod = await import(`@/content/articles/${id}.mdx`)
    ArticleContent = mod.default
    frontmatter = mod.frontmatter
  } catch {
    notFound()
  }

  const rawArticle = getArticleById(id)
  const headings = rawArticle ? extractHeadings(rawArticle.content) : []

  const dateTime = new Date(frontmatter.date)

  const categoryColor = CATEGORY_COLOR_VARS[frontmatter.category]

  return (
    <section className="m-5 xs:m-10" style={{ '--category-color': categoryColor } as CSSProperties}>
      <div className="max-w-[700px] mx-auto">
        <img
          src={frontmatter.image}
          alt={frontmatter.title}
          className="object-cover aspect-3/2 mx-auto w-full"
        />
        <h1 className="text-xl sm:text-4xl font-bold text-center py-5 mx-auto text-(--category-color) dark:text-white">{frontmatter.title}</h1>
        <div className="text-black/70 dark:text-white/70 pb-5 text-center">{format.dateTime(dateTime, { dateStyle: 'long' })}</div>
      </div>

      {/* [TOC] [article, fixed width, always centered] [spacer, same size as TOC] */}
      <div className="md:grid md:grid-cols-[clamp(10rem,20vw,16rem)_minmax(0,700px)] xl:grid-cols-[clamp(10rem,20vw,16rem)_minmax(0,700px)_clamp(10rem,20vw,16rem)] md:gap-10 lg:justify-center mx-auto">
        <aside className="hidden md:block sticky top-8 self-start">
          <TableOfContents headings={headings} />
        </aside>

        <article className="article-body prose mx-auto
                            prose-h2:scroll-mt-24 prose-h2:text-xl md:prose-h2:text-3xl prose-h2:text-(--category-color)
                            prose-h3:scroll-mt-24 prose-h3:text-lg md:prose-h3:text-2xl prose-h3:text-(--category-color)
                            md:prose-p:text-xl 
                            md:prose-ul:text-xl prose-ul:marker:text-black 
                            dark:prose-h2:text-white 
                            dark:prose-h3:text-gray-300 
                            dark:prose-p:text-gray-300
                            dark:prose-ul:marker:text-white
                            dark:prose-li:text-gray-300
                            dark:prose-a:text-white
                            dark:prose-em:text-white
                            dark:prose-strong:text-white">
          <ArticleContent />
        </article>

        <div aria-hidden />
      </div>
    </section>
  );
}
