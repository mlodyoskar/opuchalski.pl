import '../styles/globals.css';
import { Metadata } from 'next';
import Script from 'next/script';
import Navigation from '../components/Navigation';

const gaTrackingId = process.env.GA_TRACKING_ID;

export const metadata: Metadata = {
  title: 'Oskar Puchalski',
  description:
    'Frontend and product engineer based in Warsaw. I build fast web products and write about the craft behind them.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        {gaTrackingId && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${gaTrackingId}`}
            />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${gaTrackingId}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}
      </head>
      <body className="min-h-screen bg-[#0d0d0c] text-zinc-100 antialiased">
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <header className="sticky top-0 z-20 bg-transparent">
          <div className="mx-auto max-w-6xl px-6 md:px-8 2xl:max-w-[92rem] 2xl:px-12">
            <div className="flex min-h-20 items-center justify-between">
              <Navigation />
            </div>
          </div>
        </header>
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
      </body>
    </html>
  );
}
