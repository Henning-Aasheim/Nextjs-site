'use client';

import { useTranslations } from "next-intl";
import { Link } from '@/i18n/navigation';

export default function Footer() {

    const t = useTranslations('footer');

    const currentYear = new Date().getFullYear();

    return (
    <footer className="text-sm sm:text-base mt-auto px-6 py-6 text-center font-default
                    bg-secondary
                    dark:bg-[color-mix(in_srgb,var(--color-secondary)_12%,var(--color-darkNavyLight))]
                    dark:border-t dark:border-secondary/60
                    dark:shadow-[0_-4px_20px] dark:shadow-secondary/10">
        <div className="w-10/11 xs:6/8 mx-auto">

    {/* Upper part of the footer */}

            <div className="mb-6 grid grid-cols-1 s:grid-cols-2 lg:grid-cols-5 gap-5">

    {/* First column: author description */}

                <div className="inline-block lg:col-span-2">
                    <div className="mb-4 text-left">
                        <div className="inline-block align-middle">
                            <img src='/profile_image.jpg' className="w-12 h-12 object-cover rounded-full mx-auto border-background border"></img>
                        </div>
                        <div className="inline-block ml-4 align-middle text-lg md:text-xl lg:text-2xl font-bold text-white">{t('author')}</div>
                    </div>
                    <div className="text-left max-w-[34ch]">
                        <p className="text-gray-300">{t('authorDescription')}</p>
                    </div>
                </div>

    {/* Second column: currently sitemap */}

                <div className="inline-block text-left 
                                mr-10 
                                lg:mr-15">
                    <div className="text-lg font-bold mb-2 text-white border-gray-300 border-b">{t('titleCol_1')}</div>
                    <ul className="flex-col text-gray-300 dark:text-white/70">
                        <li className="mb-2">
                            <Link href='/' className="footer-links">{t('link1_col2')}</Link>
                        </li>
                        <li className="mb-2">
                            <Link href='/about' className="footer-links">{t('link2_col2')}</Link>
                        </li>
                        <li className="mb-2">
                            <Link href='/articles' className="footer-links">{t('link3_col2')}</Link>
                        </li>
                    </ul>
                </div>

    {/* Third column: colophon ++ */}

                <div className="inline-block text-left mr-10 lg:mr-15">
                    <div className="text-lg font-bold mb-2 text-white border-gray-300 border-b">{t('titleCol_2')}</div>
                    <ul className="flex-col text-gray-300 dark:text-white/70">
                        <li className="mb-2">
                            <Link href='/colophon' className="footer-links">{t('link1_col3')}</Link>
                        </li>
                        <li className="mb-2">
                            <Link href='/library' className="footer-links">{t('link2_col3')}</Link>
                        </li>
                        <li className="mb-2">
                            <Link href='/' className="footer-links">{t('link3_col3')}</Link>
                        </li>
                    </ul>
                </div>

    {/* Fourth column: colophon ++ */}

                <div className="inline-block text-left mr-10 lg:mr-15">
                    <div className="text-lg font-bold mb-2 text-white border-gray-300 border-b">{t('titleCol_3')}</div>
                    <ul className="flex-col text-gray-300 dark:text-white/70">
                        <li className="mb-2">
                            <Link href='/' className="footer-links">{t('link1_col4')}</Link>
                        </li>
                        <li className="mb-2">
                            <Link href='/about' className="footer-links">{t('link2_col4')}</Link>
                        </li>
                        <li className="mb-2">
                            <Link href='/articles' className="footer-links">{t('link3_col4')}</Link>
                        </li>
                    </ul>
                </div>

            </div>


    {/* Lower part of the footer */}

            <div className="mb-5 border-solid border-b border-gray-300 dark:border-secondary"/>

            <div className="text-gray-300">
                © {currentYear} {t('copyright')} {t('description')}
            </div>
        </div>
    </footer>

    );
}