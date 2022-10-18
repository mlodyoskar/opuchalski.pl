import { Html, Head, Main, NextScript } from 'next/document';

export const Document = () => {
  return (
    <Html lang="pl">
      <Head />
      <body className="bg-bg-light text-gray-900 dark:bg-bg-dark dark:text-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
