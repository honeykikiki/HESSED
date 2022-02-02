/* eslint-disable @next/next/no-title-in-document-head */
import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const originalRenderPage = ctx.renderPage;
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          // eslint-disable-next-line react/jsx-props-no-spreading
          enhanceApp: (App) => (props) => <App {...props} />,
        });
      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: <>{initialProps.styles}</>,
      };
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    return (
      <Html>
        <Head>
          <meta charSet="utf-8" />
          <meta name="title" content="YOUTHHILLTOP" />
          <meta name="og:title" content="YOUTHHILLTOP Web App" />

          <meta name="og:url" content="https://hessed-app.vercel.app/" />
          <meta name="og:type" content="website" />
          <meta name="og:description" content="YOUTHHILLTOP 공동체 커뮤니티" />
          <meta
            rel="og:image"
            href="https://hessed-app.vercel.app//icon/YOUTHHILLTOP-green.png"
          />
          <meta name="description" content="YOUTHHILLTOP Web App" />
          <meta name="keywords" content="YOUTHHILLTOP sns" />
          <meta name="Author" content="honey-kikiki" />
          <meta
            property="twitter:card"
            content="YOUTHHILLTOP 공동체 커뮤니티"
          />
          <meta property="twitter:title" content="YOUTHHILLTOP" />
          <meta
            property="twitter:description"
            content="YOUTHHILLTOP 공동체 커뮤니티"
          />
          <meta
            property="twitter:image"
            content="https://hessed-app.vercel.app//icon/YOUTHHILLTOP-green.png"
          />

          <link rel="manifest" href="/manifest.json" />
          <link href="/favicon.ico" rel="icon" type="image/png" sizes="16x16" />
          <link href="/favicon.ico" rel="icon" type="image/png" sizes="32x32" />
          <link rel="apple-touch-icon" href="/apple-icon.png" />
          <meta name="theme-color" content="#409857" />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
