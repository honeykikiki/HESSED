import React, { useEffect, useState } from 'react';
import Router from 'next/router';

import style from '../styles/css/loading.module.css';

const Loading = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (loading) {
      setLoading(false);
      setTimeout(() => {
        Router.push('/');
      }, 1000);
    }
  });

  return (
    <>
      <div className={style.loadingPage}>
        <h1>HESSED</h1>
      </div>
    </>
  );
};

export default Loading;
