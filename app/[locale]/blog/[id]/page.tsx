import { getArticleData, getAllArticleIds } from "@/app/lib/articles";
import Date from "@/components/date";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";


export default async function Article(props: { params: Promise<{id: string}> }) {
    const params = await props.params
    const articleContent = await getArticleData(params.id)

    return (
        <section className="mx-auto w-4/5 md:w-1/2 xl:w-1/3">
            <h1 className="flex text-4xl font-playfair font-bold text-center py-5">{articleContent.title}</h1>
                <div className="font-playfair text-black/50 dark:text-white/70 pb-5"><Date dateString={articleContent.date} /></div>
            <article className="article" dangerouslySetInnerHTML={{ __html: articleContent.contentHtml }} />
        </section>
    );
}
