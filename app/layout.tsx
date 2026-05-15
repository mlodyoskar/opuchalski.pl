import '../styles/globals.css';
import { Metadata } from 'next';
import Script from 'next/script';
import Navigation from '../components/Navigation';

const gaTrackingId = process.env.GA_TRACKING_ID;

export const metadata: Metadata = {
  title: 'Oskar Puchalski',
  description:
    'Witaj na moim blogu. Tworzę cyfrowe doświadczenia, piszę o programowaniu webowym i dzielę się wiedzą na temat nowoczesnych technologii.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl" data-scroll-behavior="smooth">
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
      <body className="bg-bg-dark text-white">
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
      </body>
    </html>
  );
}
