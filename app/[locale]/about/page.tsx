import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";

export default function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
    const {locale} = use(params);
     
      // Enable static rendering
      setRequestLocale(locale);

    const t = useTranslations('about');

    return (
        <div className="text-center pt-12">
            <h1 className="text-3xl font-bold mb-8 font-playfair">{t('heading')}</h1>
        </div>
    );
}