import Image from 'next/image';

export default function Hero({ t }: { t: (key: string) => string }) {
  return (
    <div className="lg:mx-auto bg-darkBlue">
      <div className="relative flex flex-col lg:block min-h-[40vh]">
        {/* Image side */}
        <div className="w-full lg:w-[65%] ml-auto">
          <Image
            src="/profile_image.jpg"
            alt="Profile Image"
            width={800}
            height={1000}
            className="mask-b-from-20% lg:mask-l-from-50% lg:mask-b-from-100% w-full h-auto object-cover"
          />
        </div>

        {/* Text side */}
        <div className="w-full lg:w-1/2 lg:absolute lg:top-1/2 lg:left-0 lg:-translate-y-1/2">
          <div className="px-6 lg:px-8 py-8 space-y-4 max-w-160 mx-auto">
            <h1 className="nameLogo text-lightBg text-[clamp(2rem,9vw,5rem)] lg:text-[clamp(2rem,5vw,5rem)]">
              {t('header1')}
            </h1>

            <h1 className="nameLogo ml-4 text-orange dark:text-gold text-[clamp(2rem,9vw,5rem)] lg:text-[clamp(2rem,5vw,5rem)]">
              {t('header2')}
            </h1>

            <p className="dropcap text-[clamp(1rem,1.5vw,1.25rem)]">
              {t('description')}
            </p>
          </div>
        </div>
      </div>
    </div>

  );
}