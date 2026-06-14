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
  const t = useTranslations('LocaleSwitcher')

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
        <Earth size={30} className='hover:scale-110'/>
      </button>
      {isOpen && (
        <div className='absolute right-0 bg-darkKhaki dark:bg-darkAccent rounded-md py-2 w-50 mt-2 shadow-lg z-10'>
          <button onClick={() => switchLocale('en-GB')} className={locale === 'en-GB' ? 'block w-full py-2 px-10 font-bold text-gray-800 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600' : 'block w-full py-2 px-10 text-gray-800 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'}>{t('en')}</button>
          <button onClick={() => switchLocale('ja')}    className={locale === 'ja'    ? 'block w-full py-2 px-10 font-bold text-gray-800 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600' : 'block w-full py-2 px-10 text-gray-800 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'}>{t('ja')}</button>
          <button onClick={() => switchLocale('no')}    className={locale === 'no'    ? 'block w-full py-2 px-10 font-bold text-gray-800 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600' : 'block w-full py-2 px-10 text-gray-800 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'}>{t('no')}</button>
        </div>
      )}
    </div>
    )
}
