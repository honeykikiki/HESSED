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
      }, 100);
    }
  }, [loading]);
  return (
    <>
      <Head>
        <meta charSet="utf8" />
        <title>HESSED</title>
      </Head>
      <div className="loadingPage">
        <div>
          <img src="/icon/HESSED_LOGO-W.png" width="180" />
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
