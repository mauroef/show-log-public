'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { IMAGE_URLS } from '@/utils/constants';
import { Pie } from '@/components';

const Skeleton = ({ className }) => (
  <div
    className={`animate-pulse bg-neutral-600 w-full aspect-[2/3] md:aspect-[16/9] 2xl:rounded-b-2xl ${className}`}
  ></div>
);

const DetailHeader = ({
  average,
  headline,
  landscape,
  portrait,
  subheadline,
}) => {
  const [isPortraitLoaded, setIsPortraitLoaded] = useState(false);
  const [isLandscapeLoaded, setIsLandscapeLoaded] = useState(false);

  return (
    <section className='relative'>
      <div className='2xl:rounded-b-2xl w-full'>
        {!isPortraitLoaded && <Skeleton className='block md:hidden' />}
        <Image
          alt={headline}
          width={1280}
          height={1920}
          className={`w-full block md:hidden ${
            isPortraitLoaded ? '' : 'hidden'
          } mask-gradient ${portrait ? '' : 'invisible'}`}
          src={`${IMAGE_URLS.BASE_LEAD}${portrait}`}
          priority
          onLoad={() => setIsPortraitLoaded(true)}
        />
        {!isLandscapeLoaded && <Skeleton className='hidden md:block' />}
        <Image
          alt={headline}
          width={1280}
          height={720}
          className={`2xl:rounded-b-2xl w-full hidden ${
            isLandscapeLoaded ? 'md:block' : 'md:hidden'
          } ${landscape ? '' : 'invisible'}`}
          src={`${IMAGE_URLS.BASE_LEAD}${landscape}`}
          priority
          onLoad={() => setIsLandscapeLoaded(true)}
        />
        <div className='hidden md:block absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent 2xl:rounded-b-2xl'></div>
      </div>
      <div
        className='absolute bottom-10 left-12 leading-normal max-w-2xl flex hidden md:block'
        style={{ minWidth: 'calc(100% - 96px)' }}
      >
        <header className='flex justify-between aign-items-center'>
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className='text-white text-6xl self-center'
          >
            {headline}
          </motion.h1>
          <div
            className='p-2 rounded-lg'
            style={{ backdropFilter: 'blur(60px) saturate(200%)' }}
          >
            <Pie percentage={average} color={'white'} />
          </div>
        </header>
        {subheadline !== '' && (
          <div
            className='mt-4 p-4 rounded-lg'
            style={{ backdropFilter: 'blur(60px) saturate(200%)' }}
          >
            <h2 className='text-gray-300 md:text-xl'>{subheadline}</h2>
          </div>
        )}
      </div>
    </section>
  );
};

export default DetailHeader;
