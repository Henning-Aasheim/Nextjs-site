'use client';

import { useTranslations } from "next-intl";

export default function Footer() {

    const t = useTranslations('footer');

    return (
    <footer className="mt-auto  border-t border-black/10 dark:border-white/70 px-6 py-6 text-center font-default">
        {t('copyright')}<br />
        {t('description')}
    </footer>

    );
}