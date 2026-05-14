'use client';

import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";

export default function Footer() {

    const t = useTranslations('footer');

    return (
    <footer className="mt-auto border-t border-black/10 dark:border-white/70 px-6 py-6 text-center font-playfair">
        {t('copyright')}<br />
        {t('description')}
    </footer>

    );
}