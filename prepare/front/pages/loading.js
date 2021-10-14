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

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req }) => {
      // 로그인이 풀리는 현상, 서버에서 공유하지 않는 쿠ㄱ
      // const cookie = req ? req.headers.cookie : '';
      // axios.defaults.headers.Cookie = '';
      // if (req && cookie) {
      //   axios.defaults.headers.Cookie = cookie;
      // }
      store.dispatch({
        type: LOAD_POSTS_REQUEST,
      });
      store.dispatch(END);
      await store.sagaTask.toPromise();
    },
);

export default Loading;
