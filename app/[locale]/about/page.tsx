import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";
import { FileDown } from "lucide-react";
import Shinshu from "../../icons/shinshu.svg";
import Civita from "../../icons/civita.svg";
import UiO from "../../icons/uio_segl.svg";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

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

    const civita = [
        {
            url: 'https://civita.no/notat/mikrobrikkekrigen/',
            title: 'Mikrobrikkekrigen',
            image: '',
        },
        {
            url: 'https://civita.no/notat/det-indiske-valget-er-india-pa-vei-bort-fra-sin-demokratiske-tradisjon/',
            title: 'Det indiske valget',
            image: '',
        },
        {
            url: 'https://civita.no/notat/har-norsk-offentlig-sektor-et-produktivitetsproblem/',
            title: 'Norsk offentlig sektor og produktivitet',
            image: '',
        },
    ];


    return (
        <div className="relative w-10/11 md:w-4/5 xl:w-2/3 mx-auto pt-12 mb-10 flex flex-col lg:flex-row">


            {/* PROFILE IMAGE */}


            <div className="flex-none min-w-40 lg:mr-10 pr-0 mb-8">
                <div className="flex justify-center items-center flex-col">
                <img
                    src="/profile_image.jpg"
                    alt="Profile Image"
                    className="w-40 h-40 object-cover rounded-full"
                />
                <h1 className="text-lg sm:text-2xl font-bold font-default mt-5">
                    {t('profile-heading')}
                </h1>
                <h2 className="text-base sm:text-1xl font-default italic mt-1">
                    {t('work-title')}
                </h2>
                <h2 className="text-base sm:text-1xl font-default mt-1">
                    {t('employer')}
                </h2>
                </div>
            </div>



            {/* Introduction and experience */}


            <div className="lg:w-2/3 mx-auto">

                {/* Introduction and resume */}
                <h1 className="text-xl sm:text-3xl font-bold font-default">
                {t('heading')}
                </h1>

                <p className="text-sm sm:text-xl mb-10 text-left font-default text-black/80 dark:text-gray-300">
                {t('description')}
                </p>

                {/* Resume download button */}

                <div className="flex justify-center lg:justify-start">
                    <a
                    href={cvHref}
                    className="p-3 mb-3 font-bold border-solid border-2 border-textblue bg-khaki-dark hover:text-white
                               hover:bg-purple dark:bg-gray-700 dark:text-white
                                text-lg font-default rounded-xl"
                    download
                    >
                    <FileDown className="inline mr-2 mb-0.5" />
                    {t('resume')}
                    </a>
                </div>

                {/* Experience */}
                <div className="mt-8 lg:mt-10">
                    <h1 className="text-xl sm:text-3xl font-bold font-default">
                        {t('experience-heading')}
                    </h1>
                    <ol className="list-disc list-inside mb-10 mt-8">
                        <li className="mb-2 list-none flex items-center">
                            <div className="relative">
                                <span>
                                    <UiO width={60} height={60} className="block absolute left-0 top-1 fill-textblue dark:fill-white" />
                                </span>
                                <div className="flex flex-col ml-8 pl-15">
                                    <h2 className="text-lg sm:text-2xl font-default font-bold">{t('experience-1-title')}</h2>
                                    <h3 className="text-base sm:text-1xl font-default italic">{t('experience-1-employer')}</h3>
                                    <time className="text-sm font-default text-black/70 dark:text-gray-300">{t('experience-1-date')}</time>
                                </div>
                            </div>
                        </li>
                        <li className="mb-2 list-none flex items-center">
                            <div className="relative">
                                <span>
                                    <UiO width={60} height={60} className="block absolute left-0 top-1 fill-textblue dark:fill-white" />
                                </span>
                                <div className="flex flex-col ml-8 pl-15">
                                    <h2 className="text-lg sm:text-2xl font-default font-bold">{t('experience-2-title')}</h2>
                                    <h3 className="text-1xl font-default italic">{t('experience-2-employer')}</h3>
                                    <time className="text-sm font-default text-black/70 dark:text-gray-300">{t('experience-2-date')}</time>
                                </div>
                            </div>
                        </li>
                        <li className="mb-2 list-none flex items-center">
                            <div className="relative">
                                <span>
                                    <Civita width={60} height={60} className="block absolute left-0 top-1 fill-textblue dark:fill-white" />
                                </span>
                                <div className="flex flex-col ml-8 pl-15">
                                    <h2 className="text-lg sm:text-2xl font-default font-bold">{t('experience-3-title')}</h2>
                                    <h3 className="text-base sm:text-1xl font-default italic">{t('experience-3-employer')}</h3>
                                    <time className="text-sm font-default text-black/70 dark:text-gray-300">{t('experience-3-date')}</time>
                                </div>
                            </div>
                        </li>
                    </ol>
                </div>

                <div className="mt-8 lg:mt-10">
                    <h1 className="text-xl sm:text-3xl font-bold font-default">
                        {t('education-heading')}
                    </h1>
                    <ol className="list-disc list-inside mb-10 mt-8">
                        <li className="mb-2 list-none flex items-center">
                            <div className="relative">
                                <span>
                                    <UiO width={60} height={60} className="block absolute left-0 top-1 fill-textblue dark:fill-white" />
                                </span>
                                <div className="flex flex-col ml-8 pl-15">
                                    <h2 className="text-lg sm:text-2xl font-default font-bold">{t('education-1-title')}</h2>
                                    <h3 className="text-base sm:text-1xl font-default italic">{t('education-1-university')}</h3>
                                    <time className="text-sm font-default text-black/70 dark:text-gray-300">{t('education-1-date')}</time>
                                </div>
                            </div>
                        </li>
                        <li className="mb-2 list-none flex items-center">
                            <div className="relative">
                                <span>
                                    <UiO width={60} height={60} className="block absolute left-0 top-1 fill-textblue dark:fill-white" />
                                </span>
                                <div className="flex flex-col ml-8 pl-15">
                                    <h2 className="text-lg sm:text-2xl font-default font-bold">{t('education-2-title')}</h2>
                                    <h3 className="text-base sm:text-1xl font-default italic">{t('education-2-university')}</h3>
                                    <time className="text-sm font-default text-black/70 dark:text-gray-300">{t('education-2-date')}</time>
                                </div>
                            </div>
                        </li>
                        <li className="mb-2 list-none flex items-center">
                            <div className="relative">
                                <span>
                                    <Shinshu width={60} height={60} className="block absolute left-0 top-1 fill-textblue dark:fill-white" />
                                </span>
                                <div className="flex flex-col ml-8 pl-15">
                                    <h2 className="text-lg sm:text-2xl font-default font-bold">{t('education-3-title')}</h2>
                                    <h3 className="text-base sm:text-1xl font-default italic">{t('education-3-university')}</h3>
                                    <time className="text-sm font-default text-black/70 dark:text-gray-300">{t('education-3-date')}</time>
                                </div>
                            </div>
                        </li>
                    </ol>
                </div>

                <div className="lg:mt-10">
                    <h1 className="text-xl sm:text-3xl font-bold font-default">{t('previous-work')}</h1>
                    
                </div>

            </div>
        </div>
    );
}

