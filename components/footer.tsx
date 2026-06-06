'use client';

import { useTranslations } from "next-intl";
import Link from "next/link";

export default function Footer() {

    const t = useTranslations('footer');

    return (
    <footer className="text-sm sm:text-base mt-auto border-t border-black/10 dark:border-white/70 px-6 py-6 text-center font-default">
        <div className="w-6/8 mx-auto">

            <div className="mb-6">
                <div className="inline-block w-90 text-left align-top">
                    <div className="mb-4">
                        <div className="inline-block align-middle">
                            <img src='/profile_image.jpg' className="w-12 h-12 object-cover rounded-full mx-auto border-gold border"></img>
                        </div>
                        <div className="inline-block ml-4 align-middle text-2xl">{t('author')}</div>
                    </div>
                    <div className="">
                        <p>{t('authorDescription')}</p>
                    </div>
                </div>

                <div className="inline-block w-35 text-left ml-20">
                    <div className="text-lg font-bold mb-2">{t('titleCol_1')}</div>
                    <ul className="flex-col text-black/70 dark:text-white/70">
                        <li className="mb-2">
                            <Link href='/' className="hover:border-b">Home</Link>
                        </li>
                        <li className="mb-2">
                            <Link href='/about' className="hover:border-b">About</Link>
                        </li>
                        <li className="mb-2">
                            <Link href='/blog' className="hover:border-b">Blog</Link>
                        </li>
                    </ul>
                </div>

                <div className="inline-block w-35 text-left ml-20">
                    <div className="text-lg font-bold mb-2">{t('titleCol_2')}</div>
                    <ul className="flex-col text-black/70 dark:text-white/70">
                        <li className="mb-2">
                            <Link href='/' className="hover:border-b">Colophon</Link>
                        </li>
                        <li className="mb-2">
                            <Link href='/about' className="hover:border-b">temp</Link>
                        </li>
                        <li className="mb-2">
                            <Link href='/blog' className="hover:border-b">temp</Link>
                        </li>
                    </ul>
                </div>

            </div>

            <div className="mb-5 border-solid border-b border-textblue dark:border-white/70"/>

            <div>
                {t('copyright')} {t('description')}
            </div>
        </div>
    </footer>

    );
}