'use client'

import { usePathname, useRouter } from '@/i18n/navigation'
import { useLocale } from 'next-intl'
import { useTranslations } from 'next-intl'
import { Earth } from 'lucide-react'
import { useRef, useState } from 'react'
import { useOutsideClick } from './dropdown'

export default function LocaleSwitcher() {

  const router = useRouter()
  const pathname = usePathname()
  const locale = useLocale()
  const t = useTranslations('localeSwitcher')

  const switchLocale = (newLocale: string) => {
    if (newLocale !== locale) {
        router.replace(pathname, { locale: newLocale })
        router.refresh()
    }
  }

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useOutsideClick(dropdownRef, () => setIsOpen(false));

  return (
    <div ref={dropdownRef} className="relative">
      <button className='block cursor-pointer' onClick={() => setIsOpen(!isOpen)}>
        <Earth size={30} className='toggleButtons'/>
      </button>
      {isOpen && (
        <div className='absolute right-0 bg-secondary dark:bg-darkAccent rounded-md py-2 w-50 mt-2 shadow-lg z-20'>
          <button onClick={() => switchLocale('en-GB')} className={locale === 'en-GB' ? 'localeButton font-bold' : 'localeButton'}>{t('en')}</button>
          <button onClick={() => switchLocale('ja')}    className={locale === 'ja'    ? 'localeButton font-bold' : 'localeButton'}>{t('ja')}</button>
          <button onClick={() => switchLocale('no')}    className={locale === 'no'    ? 'localeButton font-bold' : 'localeButton'}>{t('no')}</button>
        </div>
      )}
    </div>
    )
}
