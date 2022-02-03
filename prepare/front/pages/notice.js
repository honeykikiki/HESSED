import React, { useCallback, useEffect, useState } from 'react';
import Router from 'next/router';

import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { END } from 'redux-saga';
import MainLayout from '../components/MainLayout';
import styles from '../styles/css/dynamicPost.module.css';
import style from '../styles/css/notice.module.css';
import NoticeContent from '../components/notice/NoticeContent';
import { GET_NOTICE_REQUEST } from '../reducers/content';

import wrapper from '../store/configureStore';

const Notice = () => {
  const { notice } = useSelector((state) => state.content);
  const { me } = useSelector((state) => state.userInfo);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!me || !notice) {
      Router.push('/');
    }
    if (notice.length === 0) {
      dispatch({
        type: GET_NOTICE_REQUEST,
      });
    }
  }, [me, notice]);

  const onClickBack = useCallback(() => {
    Router.push('/');
  }, []);

  return (
    <MainLayout>
      <div className={styles.head}>
        <div onClick={onClickBack}>
          <img src="/icon/back.svg" width="12px" alt="BackIcon" />
        </div>
        <div>공지사항</div>
      </div>
      <div style={{ paddingTop: '54px' }} />

      <article className={style.a}>
        <section className={style.maxWidth}>
          <div className={style.noticeWrap}>
            <p>새로운 공지</p>
            <div>
              {notice[0] ? <NoticeContent content={notice[0]} /> : null}
            </div>
            <p>지난 공지</p>
            <div>
              {/* {lastNotice?.map((v) => {
                return <NoticeContent content={v} />;
              })} */}
            </div>
          </div>
        </section>
      </article>
      <div style={{ paddingTop: '54px' }} />
    </MainLayout>
  );
};

// export const getServerSideProps = wrapper.getStaticProps(
//   (store) =>
//     async ({ req }) => {
//       const cookie = req ? req.headers.cookie : '';
//       axios.defaults.headers.Cookie = '';
//       if (req && cookie) {
//         axios.defaults.headers.Cookie = cookie;
//       }
//       store.dispatch({
//         type: GET_NOTICE_REQUEST,
//       });
//       store.dispatch(END);
//       await store.sagaTask.toPromise();
//     },
// );

export default Notice;
