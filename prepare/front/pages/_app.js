import React, { useEffect, useState } from 'react';
import Head from 'next/head'; // 헤드 컴포넌트
import PropTypes from 'prop-types';

import '../styles/css/style.css';

import wrapper from '../store/configureStore';

const Hessed = ({ Component }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      setLoading(false);
      setTimeout(() => {
        const loadingPage = document.querySelector('.loadingPage');
        loadingPage.style.display = 'none';
      }, 850);
    }
  }, [loading]);
  return (
    <>
      <Head>
        <title>HESSED</title>
        <meta charSet="utf-8" />
        <meta name="og:title" content="HESSED Web App" />
        {/* <meta name="og:url" content="url" /> */}
        <meta name="og:type" content="website" />
        <link rel="og:image" href="/favicon.ico" />
        <meta name="Description" content="HESSED Web App" />
        <meta name="Keywords" content="HESSED sns" />
        <meta name="Author" content="honey-kikiki" />
        <link rel="shortcut" href="/favicon.ico" />
      </Head>

      <div className="loadingPage">
        <div>
          <img src="/icon/HESSED_LOGO-W.png" width="180" alt="LogoImg" />
        </div>
      </div>
      <Component />
    </>
  );
};

Hessed.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(Hessed);
