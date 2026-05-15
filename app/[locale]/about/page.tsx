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
        <div className="relative w-10/11 md:w-4/5 xl:w-2/3 mx-auto pt-12 mb-10 flex flex-col lg:flex-row">
            {/* LEFT COLUMN */}
            <div className="flex-none min-w-[10rem] lg:mr-10 pr-0 mb-8">
                <div className="flex justify-center items-center flex-col">
                <img
                    src="/profile_image.jpg"
                    alt="Profile Image"
                    className="w-40 h-40 object-cover rounded-full"
                />
                <h1 className="text-2xl font-bold font-default mt-5">
                    {t('profile-heading')}
                </h1>
                <h2 className="text-1xl font-default italic mt-1">
                    {t('work-title')}
                </h2>
                <h2 className="text-1xl font-default mt-1">
                    {t('employer')}
                </h2>
                </div>
            </div>

            {/* RIGHT COLUMN (second + bottom content) */}
            <div className="lg:w-2/3 mx-auto">
                {/* second div content */}
                <h1 className="text-3xl font-bold font-default">
                {t('heading')}
                </h1>

                <p className="text-xl mb-10 text-left font-default text-black/80 dark:text-gray-300">
                {t('description')}
                </p>

                <a
                href={cvHref}
                className="p-3 mb-3 font-bold bg-gray-300 hover:bg-gray-600 hover:text-white
                            dark:bg-gray-700 dark:hover:bg-gray-400 dark:text-white dark:hover:text-black
                            text-lg font-default rounded-xl"
                download
                >
                <FileDown className="inline mr-2 mb-0.5" />
                {t('resume')}
                </a>

                {/* “bottom” content, now aligned under the second div */}
                <div className="mt-8 lg:mt-10">
                    <h1 className="text-3xl font-bold font-default">
                        {t('experience-heading')}
                    </h1>
                    <ol className="list-disc list-inside mb-10 mt-8">
                        <li className="mb-2 list-none flex items-center">
                            <div className="relative">
                                <span>
                                    <img
                                    src="/uio_segl_pos.svg"
                                    alt="University of Oslo Logo"
                                    className="block dark:hidden w-15 h-15 absolute left-0 top-1"
                                    />
                                    <img
                                    src="/uio_segl_neg.svg"
                                    alt="University of Oslo Logo"
                                    className="hidden dark:block w-15 h-15 absolute left-0 top-1"
                                    />
                                </span>
                                <div className="flex flex-col ml-8 pl-15">
                                    <h2 className="text-2xl font-default font-bold">{t('experience-1-title')}</h2>
                                    <h3 className="text-1xl font-default italic">{t('experience-1-employer')}</h3>
                                    <time className="text-sm font-default text-black/70 dark:text-gray-300">{t('experience-1-date')}</time>
                                </div>
                            </div>
                        </li>
                    </ol>
                </div>
            </div>
        </div>
    );
}