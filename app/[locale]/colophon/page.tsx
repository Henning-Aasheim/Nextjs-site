import { useTranslations } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { use } from "react";
import { Metadata } from "next";

// This is the metadata for the page

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata>{
  const {locale} = await params;

  setRequestLocale(locale);
  console.log('This redirects to', locale)

  const t = await getTranslations('metaColophon');

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function Colophon({ params }: { params: Promise<{ locale: string, date: string }> }) {
  const {locale} = use(params);
 
  // Enable static rendering
  setRequestLocale(locale);
  
  const t = useTranslations('colophon');


  return (
    <div className="text-center pt-12">

      <h1 className="text-6xl sm:text-[130px] mb-6 font-default font-bold w-4/5 xl:w-0.4 mx-auto">{t('title')}</h1>

      <div className='w-10/11 md:w-4/5 lg:w-1/2 mx-auto text-left mb-10'>
        <p className="dropcap" style={{ '--dropcap-color': 'var(--color-danger)' } as React.CSSProperties}>{t('description')}</p>
      </div>

  

    </div>  
  )
}
