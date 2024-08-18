'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { SITE } from '@/utils/constants';
import { Navigation } from '@/components/';
import SearchBar from './SearchBar';
import SearchButton from './SearchButton';
import HamburgerButton from './HamburgerButton';
import useIsMobile from '@/hooks/useIsMobile';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const inputRef = useRef(null);
  const isMobile = useIsMobile();

  const handleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMobile) {
      focusInput();
    }
  };

  const focusInput = () => {
    inputRef.current.focus();
  };

  return (
    <>
      <header className='relative bg-black text-white/90 h-13 py-3.5 px-6 md:px-12 sticky text-center top-0 z-40'>
        <nav className='flex justify-between 2xl:container 2xl:mx-auto 2xl:px-12'>
          <div className='flex space-x-2'>
            <Link href='/' className='font-bold uppercase'>
              {SITE.NAME}
            </Link>
            <Navigation className={'hidden md:block'} />
          </div>
          <div className='flex space-x-2'>
            <SearchButton onClick={handleMenu} isOpen={isMenuOpen} />
            <HamburgerButton onClick={handleMenu} isOpen={isMenuOpen} />
          </div>
        </nav>
      </header>
      <motion.div
        initial={{ opacity: 0, display: 'none' }}
        animate={{
          opacity: isMenuOpen ? 1 : 0,
          display: isMenuOpen ? 'block' : 'none',
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={`hover:cursor-pointer backdrop-blur-sm bg-neutral-700/70 fixed h-dvh w-full overflow-hidden ${
          isMenuOpen ? 'z-40' : 'z-0'
        }`}
        onClick={handleMenu}
      />
      <motion.div
        initial={{ maxHeight: 0 }}
        animate={{ maxHeight: isMenuOpen ? 'calc(100dvh - 52px)' : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={`bg-black fixed h-dvh md:h-96 w-full overflow-hidden z-40`}
      >
        <SearchBar inputRef={inputRef} />
        <div className='absolute bottom-0 flex gap-4 block md:hidden px-6 py-3 w-full'>
          <Navigation
            className={
              'text-white/90 rounded-lg bg-neutral-600 px-4 py-2 md:max-w-fit hover:bg-neutral-500 transition duration-300 w-1/2 text-center'
            }
          />
        </div>
      </motion.div>
    </>
  );
};

export default Header;
