import { Html, Head, Main, NextScript } from 'next/document';

export const Document = () => {
  return (
    <Html lang="pl">
      <Head />
      <body className="bg-bg-light text-gray-900 dark:bg-bg-dark dark:text-white">
        <Main />
        <NextScript />

        <script
          defer
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GA_TRACKING_ID}`}
        />

        <script
          defer
          dangerouslySetInnerHTML={{
            __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.GA_TRACKING_ID}', {
                  page_path: window.location.pathname,
                });
          `,
          }}
        />
      </body>
    </Html>
  );
};

export default Document;
