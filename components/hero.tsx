import Image from 'next/image';

export default function Hero({ t }: { t: (key: string) => string }) {
  return (
    <div className="w-full">
      <div
        className="relative flex flex-col lg:flex-row min-h-[40vh]">
        {/* Image side */}
        <div className="w-full lg:w-1/2 order-1 lg:order-2 ml-auto flex">
          <Image
            src="/profile_image.jpg"
            alt="Profile Image"
            width={800}  height={1000}
            className="mask-b-from-20% lg:mask-l-from-50% w-full h-auto object-cover" />
        </div>

        {/* Text side */}
        <div className="w-full lg:w-1/2 order-2 md:order-1 flex items-center ">
          <div className="px-6 lg:px-10 py-8 lg:py-0 space-y-4 max-w-[40rem] mx-auto lg:mx-0" >
            <h1 className="nameLogo dark:text-white text-[clamp(2rem,9vw,5rem)] lg:text-[clamp(2rem,5vw,5rem)] ">{t('header1')}</h1>

            <h1 className="nameLogo ml-4 text-gold italic text-[clamp(2rem,9vw,5rem)] lg:text-[clamp(2rem,5vw,5rem)]">{t('header2')}</h1>

            <p className="dropcap text-[clamp(1rem,1.5vw,1.25rem)]">{t('description')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}