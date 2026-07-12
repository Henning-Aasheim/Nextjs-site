import { getAllArticles } from "../../lib/articles";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { ArticlesList } from "@/components/articles-list";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('metaArticles');

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function ArticlesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('articles');
  const articles = getAllArticles();

  return (
    <div className="text-center pt-12 mb-10 w-10/11 mx-auto 2xl:w-5/6">
      <h1 className="text-3xl font-bold mb-8 font-default">{t('heading')}</h1>
      <ArticlesList articles={articles} />
    </div>
  );
}