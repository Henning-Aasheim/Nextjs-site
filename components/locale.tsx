'use client'

import { usePathname, useRouter } from '@/i18n/navigation'
import { useLocale } from 'next-intl'
import { useTranslations } from 'next-intl'

export default function LocaleSwitcher() {

  const router = useRouter()
  const pathname = usePathname()
  const locale = useLocale()
  const t = useTranslations('LocaleSwitcher')

  const switchLocale = (newLocale: string) => {
    if (newLocale !== locale) {
        router.replace(pathname, { locale: newLocale })
        router.refresh()
    }
  }

  return (
    <select value={locale} onChange={(e) => switchLocale(e.target.value)} 
    className="min-w-35 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded px-2 py-1">
        <option value="en">{t('en')}</option>
        <option value="ja">{t('ja')}</option>
        <option value="no">{t('no')}</option>
    </select>
    )
}