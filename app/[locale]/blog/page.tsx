import { useFormatter, useTranslations } from "next-intl";
import { getSortedArticles } from "../../lib/articles";
import { setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { use } from "react";

export default function BlogPage({ params }: { params: Promise<{ locale: string, date: string }> }) {
    const {locale} = use(params);
             
    // Enable static rendering
    setRequestLocale(locale);

    const t = useTranslations('blog');

    const allArticlesData = getSortedArticles();
    const format = useFormatter()
    const dateTime = new Date(allArticlesData[0].date)

    return (
        <div className="text-center pt-12 mb-10 w-5/6 mx-auto lg:w-5/6 2xl:w-5/6">
            <h1 className="text-3xl font-bold mb-8 font-default">{t('heading')}</h1>

            <div className="grid grid-cols-1 w-10/11 mx-auto md:grid-cols-2 md:gap-10 2xl:grid-cols-3 md:w-4/5 2xl:w-10/11">
                {allArticlesData.map((article) => (
                    <article key={article.id} className="group ">
                        <div className="flex justify-center">
                            <Link href={`/blog/${article.id}`}>
                                <h2 className="text-2xl font-default font-semibold text-center">{article.title}</h2>
                                <div className="font-default text-black/70 dark:text-gray-300">{format.dateTime(dateTime, { dateStyle: 'long' })}</div>
                            </Link>
                        </div>
                    </article>
        ))}
      </div>

        </div>
    );
}