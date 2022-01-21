import React from 'react';
import Head from 'next/head'; // 헤드 컴포넌트

import PropTypes from 'prop-types';

import '../styles/css/style.css';

import wrapper from '../store/configureStore';

const Hessed = ({ Component }) => {
  return (
    <>
      <Head>
        <title>HESSED</title>
        <meta charSet="utf-8" />
        <meta name="title" content="HESSED" />
        <meta name="og:title" content="HESSED Web App" />

        <meta name="og:url" content="https://hessed-app.vercel.app/" />
        <meta name="og:type" content="website" />
        <meta name="og:description" content="HESSED 공동체 커뮤니티" />
        <meta
          rel="og:image"
          href="https://hessed-app.vercel.app//icon/HESSED-green.png"
        />
        <meta name="Description" content="HESSED Web App" />
        <meta name="Keywords" content="HESSED sns" />
        <meta name="Author" content="honey-kikiki" />
        <meta property="twitter:card" content="HESSED 공동체 커뮤니티" />
        <meta property="twitter:title" content="HESSED" />
        <meta property="twitter:description" content="HESSED 공동체 커뮤니티" />
        <meta
          property="twitter:image"
          content="https://hessed-app.vercel.app//icon/HESSED-green.png"
        />

        <meta
          httpEquiv="Content-Security-Policy"
          // content="upgrade-insecure-requests"
          content="form-action 'none'"
        />

        {/* 
        <meta
          httpEquiv="Content-Security-Policy-Report-Only"
          content="upgrade-insecure-requests form-action 'none'"
        /> */}
        {/* 보안 */}
        <meta
          content="text/html; charset=UTF-8; X-Content-Type-Options=nosniff"
          httpEquiv="Content-Type"
        />
        <link rel="shortcut" href="/favicon.ico" />
      </Head>
      <Component />
    </>
  );
};

Hessed.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(Hessed);
