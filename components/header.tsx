'use client';

import { Link } from '@/i18n/navigation';
import { DarkMode } from "./darkmode";
import { useTranslations } from 'next-intl';
import LocaleSwitcher from './locale';


export default function Header() {
    const t = useTranslations('nav');


    return (
        <header className="w-screen border-b border-black/10 dark:border-white/70 py-6 px-10">
            <nav className="flex items-center w-full">
                {/* Left spacer */}
                <div className="flex-1" />

                {/* Centered links */}
                <div className="flex space-x-12 font-playfair justify-center text-xl">
                    <Link href='/' className="text-gray-800 dark:text-gray-300 font-medium">{t('home')}</Link>
                    <Link href='/about' className="text-gray-800 dark:text-gray-300 font-medium">{t('about')}</Link>
                    <Link href='/blog' className="text-gray-800 dark:text-gray-300 font-medium">{t('blog')}</Link>
                </div>
                
                <div className="flex-1 flex justify-end gap-3 items-center">
                    <LocaleSwitcher />
                    <DarkMode />
                </div>
            </nav>
        </header>
    );
}