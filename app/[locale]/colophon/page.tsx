import { setRequestLocale, getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('metaColophon');
  return { title: t("title"), description: t("description") };
}

export default async function Colophon({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('colophon');

  let ColophonContent: React.ComponentType;
  try {
    const mod = await import(`@/content/colophon/${locale}.mdx`);
    ColophonContent = mod.default;
  } catch {
    notFound();
  }

  return (
    <div className="text-center pt-12">
      <h1 className="text-5xl mb-6 font-default font-bold w-4/5 xl:w-0.4 mx-auto">
        {t('title')}
      </h1>

      <div className='w-10/11 md:w-4/5 lg:w-1/2 mx-auto text-left mb-10
                      prose prose-p:text-lg
                      dark:prose-p:text-gray-300 '>
        <ColophonContent />
      </div>
    </div>
  );
}
