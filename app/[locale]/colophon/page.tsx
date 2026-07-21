import { setRequestLocale, getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { TableOfContents } from "@/components/toc";
import { extractHeadings } from "@/app/lib/toc";
import { getArticleByLocale } from "@/app/lib/articles";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('metaColophon');
  return { title: t("title"), description: t("description") };
}

export default async function Colophon({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('colophon');

  let ColophonContent: React.ComponentType;
  try {
    const mod = await import(`@/content/colophon/${locale}.mdx`);
    ColophonContent = mod.default;
  } catch {
    notFound();
  }

  const rawArticle = getArticleByLocale(locale)
  const headings = rawArticle ? extractHeadings(rawArticle.content) : []

  return (
    <div className="p-10 m-5 mx-auto">
      <h1 className="text-5xl mb-6 font-default font-bold w-4/5 xl:w-0.4 mx-auto text-center">
        {t('title')}
      </h1>

      <div className="md:grid md:grid-cols-[clamp(10rem,20vw,16rem)_minmax(0,700px)] xl:grid-cols-[clamp(10rem,20vw,16rem)_minmax(0,700px)_clamp(10rem,20vw,16rem)] md:gap-10 lg:justify-center mx-auto">
        <aside className="md:sticky md:top-8 md:self-start">
          <TableOfContents headings={headings} />
        </aside>

        <div className='mx-auto text-left mb-10
                        prose prose-p:text-lg
                        dark:prose-h2:text-white dark:prose-h3:text-gray-300 dark:prose-p:text-gray-300 dark:prose-em:text-white
                        dark:prose-strong:text-white dark:prose-li:text-gray-300 dark:prose-ul:marker:text-white dark:prose-a:text-white '>
          <ColophonContent />
        </div>

        <div aria-hidden />
      </div>
    </div>
  );
}