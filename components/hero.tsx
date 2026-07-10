import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function Hero({ t }: { t: (key: string) => string }) {

  const trsl = useTranslations('hero')

  return (
  <div className="lg:mx-auto bg-primary h-full
                 dark:rounded-lg dark:overflow-hidden
                 dark:bg-[color-mix(in_srgb,var(--color-primary)_12%,var(--color-darkNavyLight))]
                 dark:border dark:border-primary/60
                 dark:shadow-[0_0_20px] dark:shadow-primary/10">
    {/* Labels */}
    <div className='relative z-10 text-white hidden xs:block'>

    <span className='absolute mt-5 left-10 uppercase text-sm md:text-base'>{trsl('left')}</span>

    <div className='absolute mt-8 hidden md:block transform
                    left-7/24  -translate-x-7/24
                    lg:left-1/4  lg:-translate-x-1/4
                    xl:left-9/40 xl:-translate-x-9/40 
                    border border-b border-white md:w-[15vw] lg:w-[clamp(1rem,18vw,19rem)]' />

    <span className='absolute mt-5 left-1/2 transform -translate-x-1/2 uppercase text-sm md:text-base'>{trsl('centre')}</span>

    <div className='absolute mt-8 hidden md:block transform
                    left-17/24  -translate-x-17/24
                    lg:left-3/4 lg:-translate-x-3/4 
                    xl:left-31/40 xl:-translate-x-31/40 
                    border border-b border-white md:w-[15vw] lg:w-[clamp(1rem,18vw,19rem)]' />

    <span className='absolute mt-5 right-10 text-right uppercase text-sm md:text-base'>{trsl('right')}</span>

  </div>

    {/* Main content wrapper should also stretch */}
    <div className="relative flex flex-col lg:block min-h-[40vh] lg:h-full">
      {/* Image side */}
      <div className="w-full lg:w-[65%] ml-auto lg:h-full">
        <Image
          src="/profile_image.jpg"
          alt="Profile Image"
          width={800}
          height={1000}
          className="
            mask-b-from-20% lg:mask-l-from-50% lg:mask-b-from-100%
            w-full h-full object-cover    // h-full instead of h-auto
          "
        />
      </div>

      {/* Text side */}
      <div className="
        w-full lg:w-1/2
        lg:absolute lg:top-1/2 lg:left-0 lg:-translate-y-1/2
      ">
        <div className="px-6 lg:px-8 py-8 space-y-4 max-w-160 mx-auto">
          <h1 className="nameLogo text-white text-4xl xs:text-5xl sm:text-6xl xl:text-7xl">
            {t('header1')}
          </h1>
          <h1 className="nameLogo ml-4 text-background text-4xl xs:text-5xl sm:text-6xl xl:text-7xl">
            {t('header2')}
          </h1>

          <p className="dropcap text-white sm:text-lg lg:text-xl">
            {t('description')}
          </p>
        </div>
      </div>
    </div>
  </div>
);
}