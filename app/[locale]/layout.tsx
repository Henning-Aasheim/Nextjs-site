import type { Metadata } from "next";
import { Playfair_Display, Playfair_Display_SC, Yuji_Syuku, Noto_Serif } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { ThemeProvider } from "next-themes";
import { NextIntlClientProvider, hasLocale } from "next-intl"; 
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { setRequestLocale, getTranslations } from "next-intl/server";
import Warning from "@/components/warning";

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
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


export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata>{
  const {locale} = await params;

  setRequestLocale(locale);

  const t = await getTranslations('meta');

  return {
    title: t("title"), // e.g. "My site – English", "Meine Seite – Deutsch"
    description: t("description"),
    // etc.
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}


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
      className={`${playfair.variable} ${notoSerif.variable} ${yuji.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-default bg-khaki dark:bg-gray-900 text-textblue dark:text-white">
        <NextIntlClientProvider locale={locale}>
          <ThemeProvider attribute='class' enableSystem defaultTheme="system">
            <Warning />
            <Header />
              {children}
            <Footer />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
