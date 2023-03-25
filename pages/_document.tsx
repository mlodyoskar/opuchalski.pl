import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export const Document = () => {
  return (
    <Html lang="pl">
      <Head />
      <body className="bg-bg-light text-gray-900 dark:bg-bg-dark dark:text-white">
        <Main />
        <NextScript />
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GA_TRACKING_ID}`}
        />

        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.GA_TRACKING_ID}', {
              page_path: window.location.pathname
            });
          `.trim(),
          }}
        />
      </body>
    </Html>
  );
};

export default Document;
