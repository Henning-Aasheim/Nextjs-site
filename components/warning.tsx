'use client';

import { useTranslations } from 'next-intl';
import { TriangleAlert } from 'lucide-react';

export default function Warning() {
    const t = useTranslations('warning');

    return (
        <div className='sticky top-0 z-20 w-full bg-yellow-400 border-b-2 border-black'>
            <h1 className='font-bold py-4 text-sm xs:text-lg sm:text-xl text-center text-black'> 
                <TriangleAlert size={22} className='inline-block mr-4' />
                {t('warning')}
                <TriangleAlert size={22} className='inline-block ml-4' />
            </h1>
        </div>
    );
}

