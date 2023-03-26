import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import '../styles/globals.css';
import { useEffect } from 'react';
import Router from 'next/router';
import * as gtag from '../lib/gtag';
import React from 'react';
import ReactDOM from 'react-dom';

const isProduction = process.env.NODE_ENV === 'production';
const isBrowser = typeof window !== 'undefined';

if (!isProduction && isBrowser) {
  const axe = require('@axe-core/react');
  const AXE_DELAY = 1000;
  axe(React, ReactDOM, AXE_DELAY);
}

const MyApp = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    if (isProduction && isBrowser) {
      const handleRouteChange = (url: string) => {
        gtag.reportPageView(url);
      };
      Router.events.on('routeChangeComplete', handleRouteChange);
      return () => {
        Router.events.off('routeChangeComplete', handleRouteChange);
      };
    }
    return () => false;
  }, []);

  return (
    <>
      <ThemeProvider attribute="class" enableSystem={true} defaultTheme="dark">
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
};

export default MyApp;
