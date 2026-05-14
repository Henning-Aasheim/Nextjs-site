import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";
import { FileDown } from "lucide-react";


export default function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
    const {locale} = use(params);
     
      // Enable static rendering
      setRequestLocale(locale);

    const t = useTranslations('about');

    const localeToCvPath: Record<string, string> = {
    "no": "/resumes/cv-no.pdf",
    "en-GB": "/resumes/cv-en-GB.pdf",
    //"ja": "/resumes/cv-ja-JP.pdf",
  };

    const cvHref = localeToCvPath[locale] ?? localeToCvPath["no"]; // default to Norwegian


    return (
        <div className="text-center pt-12">
            <h1 className="text-3xl font-bold mb-8 font-default">{t('heading')}</h1>

            <a href={cvHref} className="p-3 font-bold bg-gray-300 hover:bg-gray-600 hover:text-white dark:bg-gray-700 dark:hover:bg-gray-400 dark:text-white dark:hover:text-black text-lg font-default rounded-xl" download>
                <FileDown className="inline mr-2 mb-0.5" />
                {t('resume')}
            </a>
        </div>
    );
}