import { useTranslations } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { use } from "react";
import { FileDown, Link } from "lucide-react";
import { Metadata } from "next";
import Shinshu from "../../icons/shinshu.svg";
import Civita from "../../icons/civita.svg";
import UiO from "../../icons/uio_segl.svg";

// This is the metadata for the page

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata>{
  const {locale} = await params;

  setRequestLocale(locale);

  const t = await getTranslations('metaAbout');

  return {
    title: t("title"),
    description: t("description"),
  };
}

// This is the main page component

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


    // This is the links to the civita work


    const civita = [
        {
            id: 1,
            url: 'https://civita.no/notat/mikrobrikkekrigen/',
            title: 'Mikrobrikkekrigen',
            image: '/civita/mikrobrikker.webp',
        },
        {
            id: 2,
            url: 'https://civita.no/notat/det-indiske-valget-er-india-pa-vei-bort-fra-sin-demokratiske-tradisjon/',
            title: 'Det indiske valget',
            image: '/civita/india.webp',
        },
        {
            id: 3,
            url: 'https://civita.no/podcast/digitale-utfordringer-del-3-kampen-om-mikrochipene/',
            title: 'Kampen om mikrochipene',
            image: '/civita/podkast.webp',
        },
        {
            id: 4,
            url: 'https://civita.no/notat/har-norsk-offentlig-sektor-et-produktivitetsproblem/',
            title: 'Norsk offentlig sektor og produktivitet',
            image: '/civita/offentlig_sektor.webp',
        },
    ];


    return (
        <div className="relative w-10/11 md:w-4/5 xl:w-2/3 mx-auto pt-12 mb-10 flex flex-col lg:flex-row">


    {/* PROFILE IMAGE */}


            <div className="flex-none min-w-40 lg:mr-10 pr-0 mb-8">
                <div className="sticky flex top-30 
                                justify-center items-center flex-col"> {/* The top-30 has to change when the warning banner is removed */}
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

                <p className="text-base sm:text-xl mb-10 text-left font-default text-black/80 dark:text-gray-300">
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


    {/* Current experience */}


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

    
    {/* 2nd experience */}


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


    {/* 3rd experience */}


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


    {/* Education */}


                <div className="mt-8 lg:mt-10">
                    <h1 className="text-xl sm:text-3xl font-bold font-default">
                        {t('education-heading')}
                    </h1>
                    <ol className="list-disc list-inside mb-10 mt-8">


    {/* Master's degree */}


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


    {/* Bachelor's degree */}


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


    {/* Bachelor's degree */}


                        <li className="mb-2 list-none flex items-center">
                            <div className="relative">
                                <span>
                                    <UiO width={60} height={60} className="block absolute left-0 top-1 fill-textblue dark:fill-white" />
                                </span>
                                <div className="flex flex-col ml-8 pl-15">
                                    <h2 className="text-lg sm:text-2xl font-default font-bold">{t('education-3-title')}</h2>
                                    <h3 className="text-base sm:text-1xl font-default italic">{t('education-3-university')}</h3>
                                    <time className="text-sm font-default text-black/70 dark:text-gray-300">{t('education-3-date')}</time>
                                </div>
                            </div>
                        </li>
    

    {/* Exchange */}


                        <li className="mb-2 list-none flex items-center">
                            <div className="relative">
                                <span>
                                    <Shinshu width={60} height={60} className="block absolute left-0 top-1 fill-textblue dark:fill-white" />
                                </span>
                                <div className="flex flex-col ml-8 pl-15">
                                    <h2 className="text-lg sm:text-2xl font-default font-bold">{t('education-4-title')}</h2>
                                    <h3 className="text-base sm:text-1xl font-default italic">{t('education-4-university')}</h3>
                                    <time className="text-sm font-default text-black/70 dark:text-gray-300">{t('education-4-date')}</time>
                                </div>
                            </div>
                        </li>
                    </ol>
                </div>


    {/* Previous work */}


                <div className="lg:mt-10">
                    <h1 className="text-xl sm:text-3xl font-bold font-default mb-6">{t('previous-work')}</h1>

                    <div className=''>
                        {civita.map((item) => (
                            <article key={item.id} className="group">
                                <a href={item.url}>
                                    <div className="flex flex-row flex-wrap rounded-xl mb-4 items-center
                                                    hover:border-solid hover:border hover:bg-khaki-dark hover:border-gray-300 
                                                    hover:scale-102 hover:transition-transform transition-colors duration-500 ease-in-out
                                                    hover:shadow-xl">
                                        <img src={item.image} alt={item.title} className="w-28 h-16 object-cover rounded-lg mr-4" />
                                        <h2 className="font-bold text-base sm:text-xl md:text-2xl flex-1">{item.title}</h2>
                                    </div>
                                </a>
                            </article>
                        ))}
                    </div>
                    
                </div>

            </div>
        </div>
    );
}

