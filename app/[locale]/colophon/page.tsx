import { useTranslations } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { use } from "react";
import { Metadata } from "next";

// This is the metadata for the page

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata>{
  const {locale} = await params;

  setRequestLocale(locale);

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

      <p className="dropcap">{t('description')}</p>

  

    </div>  
  )
}
