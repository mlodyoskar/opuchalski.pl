import React from 'react';
import { MetaProps } from '../types/layout';
import Head from './Head';
import Navigation from './Navigation';

type LayoutProps = {
  children: React.ReactNode;
  customMeta?: MetaProps;
};

export const WEBSITE_HOST_URL = 'https://opuchalski.pl';

export const Layout = ({ children, customMeta }: LayoutProps) => {
  return (
    <>
      <Head customMeta={customMeta} />
      <header className="sticky top-0 z-10 border-b border-gray-800 backdrop-blur-lg backdrop-filter">
        <div className="mx-auto max-w-5xl px-8 ">
          <div className="flex items-center justify-between py-4">
            <Navigation />
          </div>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-5xl px-8 py-4">{children}</div>
      </main>
      <footer className="py-8">
        <div className="mx-auto max-w-5xl px-8"></div>
      </footer>
    </>
  );
};
