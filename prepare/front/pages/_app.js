import React from 'react';
import Head from 'next/head'; // 헤드 컴포넌트

import PropTypes from 'prop-types';

import '../styles/css/style.css';

import wrapper from '../store/configureStore';

const Hessed = ({ Component }) => {
  return (
    <>
      <Head>
        <title>YOUTHHILLTOP</title>
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
        <meta name="author" content="honey-kikiki" />
        <meta property="twitter:card" content="YOUTHHILLTOP 공동체 커뮤니티" />
        <meta property="twitter:title" content="YOUTHHILLTOP" />
        <meta
          property="twitter:description"
          content="YOUTHHILLTOP 공동체 커뮤니티"
        />
        <meta
          property="twitter:image"
          content="https://hessed-app.vercel.app//icon/YOUTHHILLTOP-green.png"
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
