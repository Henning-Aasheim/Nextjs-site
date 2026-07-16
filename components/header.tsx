'use client';

import { Link } from '@/i18n/navigation';
import { DarkMode } from "./darkmode";
import { useTranslations } from 'next-intl';
import LocaleSwitcher from './locale';
import { useState } from 'react';
import { House, User, Newspaper, Library } from 'lucide-react';


export default function Header() {
    const t = useTranslations('nav');
    const [isOpen, setIsOpen] = useState(false);


    return (
        <header className="w-screen py-6 px-5 md:px-10 bg-secondary
                    dark:bg-[color-mix(in_srgb,var(--color-primary)_12%,var(--color-darkNavyLight))]
                    dark:border-b dark:border-primary/60
                    dark:shadow-[0_4px_20px] dark:shadow-primary/10">
          <nav className=" flex flex-col items-center w-full md:flex-row md:items-center">

  {/* Left spacer (desktop) */}

            <div className="hidden md:flex md:flex-1" />

  {/* Top row on mobile: locale, dark mode, hamburger */}
            <div className='flex w-full gap-8 mx-6 mb-2 md:mb-0 justify-between md:justify-end items-center order-1 md:order-2 md:flex-1'>
              
              <div className='flex items-center gap-8'>
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

{/* Menu links: under the buttons on mobile, centered on desktop */}

{/* The actual links */}

            <div
              className={`
                ${isOpen ? "flex" : "hidden"}
                md:flex
                flex-col items-start
                md:flex-row md:items-center
                gap-5 sm:gap-8
                text-xl font-bold
                order-2
                md:order-1 md:flex-1 md:justify-center
                mt-4 md:mt-0
                whitespace-nowrap
              `}
            >

{/* The actual links */}

              <Link href="/" className="navLinks flex items-center gap-3 text-gray-300 hover:text-white active:text-white" onClick={() => setIsOpen(false)}>
                <span className="w-6 flex justify-center shrink-0 md:hidden">
                  <House size={25} />
                </span>
                <span>{t("home")}</span>
              </Link>

              <Link href="/about" className="navLinks flex items-center gap-3" onClick={() => setIsOpen(false)}>
                <span className="w-6 flex justify-center shrink-0 md:hidden">
                  <User size={25} />
                </span>
                <span>{t("about")}</span>
              </Link>

              <Link href="/articles" className="navLinks flex items-center gap-3" onClick={() => setIsOpen(false)}>
                <span className="w-6 flex justify-center shrink-0 md:hidden">
                  <Newspaper size={25} />
                </span>
                <span>{t("articles")}</span>
              </Link>

              <Link href="/library" className="navLinks flex items-center gap-3" onClick={() => setIsOpen(false)}>
                <span className="w-6 flex justify-center shrink-0 md:hidden">
                  <Library size={25} />
                </span>
                <span>{t("library")}</span>
              </Link>
            </div>
          </nav>
        </header>

    );
}