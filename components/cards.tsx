import Link from "next/link";
import { Calendar } from "lucide-react";
import { CSSProperties } from "react";
import { CATEGORY_COLOR_VARS, CategoryBadge } from "./category-badge";
import { useFormatter } from "next-intl";
import { ArticleCategory } from "@/types";


export type Cards = {
    id: string | number
    date:string
    category:ArticleCategory
    href:string
    title:string
    image: string
    excerpt:string
    external?:boolean
}

export default function Cards({ items }: { items: Cards }){

    const format = useFormatter()
    const dateTime = new Date(items.date)

    // Image and label
    const content_top = (
            <div className="content_top">

                <img src={items.image} alt={items.title} />

                <div className="absolute top-2 left-2">
                    <CategoryBadge category={items.category} />
                </div>

            </div>
    )

    // Title, excerpt, and date
    const content_bottom = (
            <div className="content_bottom">
                            
                <h2>{items.title}</h2>
                <p>{items.excerpt}</p>
            
                <div className="date">
                            <Calendar size={15} className="shrink-0" />
                            <span>{format.dateTime(dateTime, { dateStyle: 'long'})}</span>
                </div>

            </div>

    )

    return(
        <article 
            style={{ '--category-color': CATEGORY_COLOR_VARS[items.category] } as CSSProperties}
            className='card'
            key={items.id}>
            
            {items.external ? (
                <a href={items.href} key={items.id} target="_blank" rel="noopener noreferrer" className="card_link">{content_top}{content_bottom}</a>
            ) : (
                <Link href={items.href} key={items.id} className="card_link">{content_top}{content_bottom}</Link>
            )}

        </article>
    )
}
