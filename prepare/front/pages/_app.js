import React, { useEffect, useState } from 'react';
import Head from 'next/head'; // 헤드 컴포넌트
import PropTypes from 'prop-types';

import '../styles/css/style.css';
import wrapper from '../store/configureStore';
import { END } from 'redux-saga';
import { LOAD_POSTS_REQUEST } from '../reducers/post';

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

// export const getServerSideProps = wrapper.getServerSideProps(
//   (store) =>
//     async ({ req }) => {
//       // 로그인이 풀리는 현상, 서버에서 공유하지 않는 쿠ㄱ
//       // const cookie = req ? req.headers.cookie : '';
//       // axios.defaults.headers.Cookie = '';
//       // if (req && cookie) {
//       //   axios.defaults.headers.Cookie = cookie;
//       // }
//       store.dispatch({
//         type: LOAD_POSTS_REQUEST,
//       });
//       store.dispatch(END);
//       await store.sagaTask.toPromise();
//     },
// );

Hessed.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(Hessed);
