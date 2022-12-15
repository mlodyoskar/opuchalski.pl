import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import { Analytics } from '@vercel/analytics/react';
import '../styles/globals.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <ThemeProvider attribute="class" enableSystem={true} defaultTheme="dark">
        <Component {...pageProps} />
      </ThemeProvider>
      <Analytics />
    </>
  );
};

export default MyApp;
