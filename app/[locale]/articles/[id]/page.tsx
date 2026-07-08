import { getAllArticleIds } from "@/app/lib/articles";
import { routing } from "@/i18n/routing";
import { getFormatter, setRequestLocale } from 'next-intl/server';
import { notFound } from "next/navigation";

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

  const dateTime = new Date(frontmatter.date)

  return (
    <section className="mx-auto md:w-4/5 xl:w-3/5 max-w-[900px] p-10 m-5 bg-white/20">
      <img src={frontmatter.image} alt={frontmatter.title} className="object-cover aspect-3/2 mx-auto" />
      <div className="max-w-[65ch] mx-auto">
        <h1 className="text-xl sm:text-4xl font-default font-bold text-center py-5 mx-auto text-primary">{frontmatter.title}</h1>
        <div className="font-default text-black/70 dark:text-white/70 pb-5">{format.dateTime(dateTime, { dateStyle: 'long' })}</div>
      </div>
      <article className="article-body prose mx-auto article-body prose-ul:marker:text-black">
        <ArticleContent />
      </article>
    </section>
  );
}
