'use client';

import { Link } from '@/i18n/navigation';
import { usePathname } from '@/i18n/navigation';
import { DarkMode } from "./darkmode";
import { useTranslations } from 'next-intl';
import LocaleSwitcher from './locale';
import { useState } from 'react';
import { House, User, Newspaper, Library } from 'lucide-react';

const NAV_LINKS = [
  { href: '/', key: 'home', icon: House },
  { href: '/about', key: 'about', icon: User },
  { href: '/articles', key: 'articles', icon: Newspaper },
  { href: '/library', key: 'library', icon: Library },
] as const;

export default function Header() {
    const t = useTranslations('nav');
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const isActive = (href: string) =>
      href === '/' ? pathname === '/' : pathname.startsWith(href);

    return (
        <header className="w-full py-6 px-5 md:px-10 bg-secondary
                    dark:bg-[color-mix(in_srgb,var(--color-primary)_12%,var(--color-darkNavyLight))]
                    dark:border-b dark:border-primary/60
                    dark:shadow-[0_4px_20px] dark:shadow-primary/10">
          <nav className="max-w-[1200px] mx-auto flex flex-col md:flex-row md:items-center md:justify-end gap-4 md:gap-10 w-full">

  {/* Top row on mobile: locale + dark mode on the left, hamburger on the right.
      On desktop this whole block collapses to just the locale/darkmode group,
      right-aligned via the parent nav's md:justify-end. */}
            <div className='flex w-full md:w-auto gap-8 justify-between md:justify-end items-center order-1 md:order-2'>

              <div className="flex items-center gap-8">
                <LocaleSwitcher />
                <DarkMode />
              </div>

  {/* Mobile menu button */}

              <button
                className={`md:hidden ${isOpen ? "text-red-500 hover:scale-110 cursor-pointer" : "toggleButtons"}`}
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? (

                  // Close icon (X)

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.3}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>

                ) : (

                  // Hamburger menu icon

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.3}
                      d="M4 6h16M4 12h16m-7 6h7"
                    />
                  </svg>
                )}
              </button>
            </div>

{/* Links: centred in the mobile dropdown, right-aligned in the desktop row */}

            <div
              className={`
                ${isOpen ? "flex" : "hidden"}
                md:flex
                flex-col items-center
                md:flex-row md:items-center md:justify-end
                gap-5 sm:gap-8
                text-xl font-bold
                order-2 md:order-1
                w-full md:w-auto
                whitespace-nowrap
              `}
            >
              {NAV_LINKS.map(({ href, key, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className={`navLinks flex items-center gap-3 ${isActive(href) ? 'navLinks-active' : ''}`}
                  onClick={() => setIsOpen(false)}
                >
                  <span className="w-6 flex justify-center shrink-0 md:hidden">
                    <Icon size={25} />
                  </span>
                  <span>{t(key)}</span>
                </Link>
              ))}
            </div>
          </nav>
        </header>

    );
}