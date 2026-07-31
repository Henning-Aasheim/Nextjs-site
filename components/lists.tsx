import { ArticleCategory } from "@/types";
import { CATEGORY_COLOR_VARS, CATEGORY_CARD_STYLES, CategoryText } from "./category-badge";
import { CSSProperties } from "react";
import { useFormatter } from "next-intl";
import Link from "next/link";

export type List = {
    id: string | number
    date: string
    category: ArticleCategory
    href: string
    title: string
    external?: boolean
}

export default function List({ items, displayNumber }: { items: List, displayNumber: number }) {

    const format = useFormatter()
    const dateTime = new Date(items.date)

    const content_top = (
        <div className="flex items-center">
                        <span className="min-w-8 text-2xl font-display text-center">
                            {displayNumber}
                        </span>
                    </div>
    )

    const content_bottom = (
                    <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 lg:gap-6 w-full text-sm">
                            <div className="w-full flex justify-between sm:w-auto sm:justify-start sm:items-center sm:gap-2 lg:gap-3">
                                <span className="dateText sm:min-w-36 text-right pr-10 lg:pr-15 text-gray-500">
                                    {format.dateTime(dateTime, { dateStyle: 'long' })}
                                </span>
                                <span className="sm:min-w-28 lg:min-w-48 text-right sm:text-left">
                                    <CategoryText category={items.category} />
                                </span>
                            </div>

                            <h2 className="flex-1 min-w-0 text-lg font-default font-semibold text-left truncate">
                                {items.title}
                            </h2>
                        </div>
                    </div>

    )

    return (
        <li style={{ '--category-color': CATEGORY_COLOR_VARS[items.category] } as CSSProperties}
            key={items.id}
            className={`group hover:bg-black/5 dark:hover:bg-white/10 border-l-4 ${CATEGORY_CARD_STYLES[items.category]}`}>

            <div className='w-full h-full border-b border-gray-600/30'>

                {items.external ? (
                <a href={items.href} key={items.id} target="_blank" rel="noopener noreferrer" className="flex w-full items-stretch gap-6 lg:gap-8 py-4 lg:py-5">{content_top}{content_bottom}</a>
                ) : (
                    <Link href={items.href} key={items.id} className="flex w-full items-stretch gap-6 lg:gap-8 py-4 lg:py-5">{content_top}{content_bottom}</Link>
                )}
                
            </div>

        </li>
    )
}