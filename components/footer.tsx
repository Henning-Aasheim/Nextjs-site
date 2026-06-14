'use client';

import { useTranslations } from "next-intl";
import Link from "next/link";

export default function Footer() {

    const t = useTranslations('footer');

    const currentYear = new Date().getFullYear();

    return (
    <footer className="text-sm sm:text-base mt-auto border-t border-black/10 dark:border-gold px-6 py-6 text-center font-default">
        <div className="w-10/11 xs:6/8 mx-auto">

    {/* Upper part of the footer */}

            <div className="mb-6 grid grid-cols-1 s:grid-cols-2 md:grid-cols-5 gap-5">

    {/* First column: author description */}

                <div className="inline-block md:col-span-2">
                    <div className="mb-4 text-left">
                        <div className="inline-block align-middle">
                            <img src='/profile_image.jpg' className="w-12 h-12 object-cover rounded-full mx-auto border-gold border"></img>
                        </div>
                        <div className="inline-block ml-4 align-middle text-lg md:text-xl lg:text-2xl font-bold">{t('author')}</div>
                    </div>
                    <div className="text-left max-w-[34ch]">
                        <p className="dark:text-gray-400">{t('authorDescription')}</p>
                    </div>
                </div>

    {/* Second column: currently sitemap */}

                <div className="inline-block text-left 
                                mr-10 
                                lg:mr-15">
                    <div className="text-lg font-bold mb-2">{t('titleCol_1')}</div>
                    <ul className="flex-col text-black/70 dark:text-white/70">
                        <li className="mb-2">
                            <Link href='/' className="hover:border-b hover:text-orange">Home</Link>
                        </li>
                        <li className="mb-2">
                            <Link href='/about' className="hover:border-b hover:text-orange">About</Link>
                        </li>
                        <li className="mb-2">
                            <Link href='/blog' className="hover:border-b hover:text-orange">Blog</Link>
                        </li>
                    </ul>
                </div>

    {/* Third column: colophon ++ */}

                <div className="inline-block text-left mr-10 lg:mr-15">
                    <div className="text-lg font-bold mb-2">{t('titleCol_2')}</div>
                    <ul className="flex-col text-black/70 dark:text-white/70">
                        <li className="mb-2">
                            <Link href='/colophon' className="hover:border-b hover:text-orange">{t('link1_col3')}</Link>
                        </li>
                        <li className="mb-2">
                            <Link href='/library' className="hover:border-b hover:text-orange">{t('link2_col3')}</Link>
                        </li>
                        <li className="mb-2">
                            <Link href='/' className="hover:border-b hover:text-orange">{t('link3_col3')}</Link>
                        </li>
                    </ul>
                </div>

    {/* Fourth column: colophon ++ */}

                <div className="inline-block text-left mr-10 lg:mr-15">
                    <div className="text-lg font-bold mb-2">{t('titleCol_3')}</div>
                    <ul className="flex-col text-black/70 dark:text-white/70">
                        <li className="mb-2">
                            <Link href='/' className="hover:border-b hover:text-orange">Colophon</Link>
                        </li>
                        <li className="mb-2">
                            <Link href='/about' className="hover:border-b hover:text-orange">temp</Link>
                        </li>
                        <li className="mb-2">
                            <Link href='/blog' className="hover:border-b hover:text-orange">temp</Link>
                        </li>
                    </ul>
                </div>

            </div>


    {/* Lower part of the footer */}

            <div className="mb-5 border-solid border-b border-textblue dark:border-gold"/>

            <div>
                © {currentYear} {t('copyright')} {t('description')}
            </div>
        </div>
    </footer>

    );
}