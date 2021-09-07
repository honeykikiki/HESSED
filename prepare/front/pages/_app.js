import React, { useEffect, useState } from 'react';
import Head from 'next/head'; // 헤드 컴포넌트
import PropTypes from 'prop-types';

import '../styles/css/style.css';

const Hessed = ({ Component }) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (loading) {
      setLoading(false);
      setTimeout(() => {
        const loadingPage = document.querySelector('.loadingPage');
        loadingPage.style.display = 'none';
      }, 1000);
    }
  }, [loading]);
  return (
    <>
      <Head>
        <meta charSet="utf8" />
        <title>HESSED</title>
      </Head>
      <div className="loadingPage">
        <h1>HESSED</h1>
      </div>
      <Component />
    </>
  );
};

Hessed.propTypes = {
  Component: PropTypes.elementType.isRequiredssss,
};

export default Hessed;
