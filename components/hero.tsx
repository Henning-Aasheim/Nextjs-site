import Image from 'next/image';

export default function Hero({ t }: { t: (key: string) => string }) {
  return (
    <div className="max-w-[1200px] md:mx-auto bg-darkBlue">
      <div className="relative flex flex-col lg:flex-row min-h-[40vh]">

        {/* Image side */}
        <div className="w-full lg:w-1/2 order-1 lg:order-2 ml-auto flex">
          <Image
            src="/profile_image.jpg"
            alt="Profile Image"
            width={800}  height={1000}
            className="mask-b-from-20% lg:mask-l-from-50% lg:mask-b-from-100% w-full h-auto object-cover" />
        </div>

        {/* Text side */}
        <div className="lg:relative w-full lg:w-1/2 order-2 md:order-1 flex items-center mb-2">
          <div className="lg:absolute lg:right-6 lg:ml-8 lg:mb-2 px-6 lg:px-0 py-8 lg:py-0 space-y-4 max-w-160 mx-auto lg:mx-0" >
            <h1 className="nameLogo text-lightBg text-[clamp(2rem,9vw,5rem)] lg:text-[clamp(2rem,5vw,5rem)]">{t('header1')}</h1>

            <h1 className="nameLogo ml-4 text-orange dark:text-gold text-[clamp(2rem,9vw,5rem)] lg:text-[clamp(2rem,5vw,5rem)]">{t('header2')}</h1>

            <p className="dropcap text-[clamp(1rem,1.5vw,1.25rem)]">{t('description')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}