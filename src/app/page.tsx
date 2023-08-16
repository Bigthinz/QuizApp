'use client';

import Head from 'next/head';
import * as React from 'react';

import ButtonLink from '@/components/links/ButtonLink';
import UnderlineLink from '@/components/links/UnderlineLink';

import Logo from '~/svg/Logo.svg';

export default function HomePage() {
  return (
    <main>
      <Head>
        <title>Quiz App</title>
      </Head>
      <section className='bg-white'>
        <div className='layout relative flex min-h-screen flex-col items-center justify-center py-12 text-center'>
          <Logo className='w-16' />
          <h1 className='mt-4'>Welcome To Quiz Brand</h1>
          <p className='mt-2 text-sm text-gray-800'>
            Please Login to continue{' '}
          </p>

          <ButtonLink className='mt-6' href='/login' variant='light'>
            Login
          </ButtonLink>

          <footer className='absolute bottom-2 text-gray-700'>
            © {new Date().getFullYear()} By{' '}
            <UnderlineLink href='#'>King David</UnderlineLink>
          </footer>
        </div>
      </section>
    </main>
  );
}
