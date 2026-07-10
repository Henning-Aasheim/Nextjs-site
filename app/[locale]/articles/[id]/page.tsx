import { getAllArticleIds, getArticleById } from "@/app/lib/articles";
import { extractHeadings } from "@/app/lib/toc";
import { routing } from "@/i18n/routing";
import { getFormatter, setRequestLocale } from 'next-intl/server';
import { notFound } from "next/navigation";
import { TableOfContents } from "@/components/toc";

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
  let frontmatter: { image: string; title: string; date: string }

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

  return (
    <section className="mx-auto p-10 m-5">
      <div className="max-w-[700px] mx-auto">
        <img
          src={frontmatter.image}
          alt={frontmatter.title}
          className="object-cover aspect-3/2 mx-auto w-full"
        />
        <h1 className="text-xl sm:text-4xl font-default font-bold text-center py-5 mx-auto text-primary">{frontmatter.title}</h1>
        <div className="font-default text-black/70 dark:text-white/70 pb-5 text-center">{format.dateTime(dateTime, { dateStyle: 'long' })}</div>
      </div>

      {/* [TOC] [article, fixed width, always centered] [spacer, same size as TOC] */}
      <div className="lg:grid lg:grid-cols-[clamp(10rem,20vw,16rem)_minmax(0,700px)_clamp(10rem,20vw,16rem)] lg:gap-5 lg:justify-center mx-auto">
        <aside className="hidden lg:block sticky top-8 self-start">
          <TableOfContents headings={headings} />
        </aside>

        <article className="article-body prose mx-auto prose-ul:marker:text-black prose-h2:scroll-mt-24 prose-h3:scroll-mt-24 prose-h2:text-3xl">
          <ArticleContent />
        </article>

        <div aria-hidden />
      </div>
    </section>
  );
}
