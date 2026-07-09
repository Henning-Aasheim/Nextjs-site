import type { Metadata } from "next";
import { Playfair_Display, Playfair_Display_SC, Yuji_Syuku, Noto_Serif, Quintessential, Felipa, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { ThemeProvider } from "next-themes";
import { NextIntlClientProvider, hasLocale } from "next-intl"; 
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { setRequestLocale, getTranslations } from "next-intl/server";
import Warning from "@/components/warning";

// Fonts

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  weight: ['400'],
});

const playfairSC = Playfair_Display_SC({
  variable: '--font-playfair-sc',
  subsets: ['latin'],
  weight: ['400', '700', '900'],
});

const notoSerif = Noto_Serif({
  variable: '--font-notoSerif',
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

const yuji = Yuji_Syuku({
  variable: '--font-yuji',
  weight: '400',
});

const quint = Quintessential({
  variable: '--font-quint',
  weight: '400',
})

const felipa = Felipa({
  variable: '--font-quint',
  weight: '400',
})

const cgaramond = Cormorant_Garamond({
  variable: '--font-cgaramond',
  weight: ["400", "500", "600", "700"],
})

// Metadata for the main page

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata>{
  const {locale} = await params;

  setRequestLocale(locale);

  const t = await getTranslations('meta');

  return {
    title: t("title"),
    description: t("description"),
  };
}

// This generates the static paths for the locales

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

// This is the root Layout component

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const {locale} = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  } 

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${playfair.variable} 
                  ${notoSerif.variable} 
                  ${yuji.variable} 
                  ${quint.variable} 
                  ${felipa.variable} 
                  ${cgaramond.variable} h-full antialiased`}

    >
      <body className="min-h-full flex flex-col font-default 
                     bg-background text-primary dark:text-white dark:bg-darkBlue">
        <NextIntlClientProvider locale={locale}>
          <ThemeProvider attribute='class' enableSystem defaultTheme="system">
            <Warning /> {/* Temporary warning component. If I remove this, I have to change the about page sticky profile image. */}
            <Header />
              {children}
            <Footer />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
