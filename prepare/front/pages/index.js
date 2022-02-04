/* eslint-disable no-restricted-globals */
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import axios from 'axios';

import Router from 'next/router';
import { END } from 'redux-saga';
import MainLayout from '../components/MainLayout';
import PostCard from '../components/PostCard/PostCard';

import style from '../styles/css/postCard.module.css';
import {
  LOAD_MORE_POSTS_REQUEST,
  LOAD_POSTS_REQUEST,
} from '../reducers/postMainAction';
import { PAGE_CHANGE } from '../reducers/postAdd';
import MemberListBox from '../components/memberList/MemberListBox';
import Loading from '../components/loading/loading';

import wrapper from '../store/configureStore';
import Login from './login';
import { GET_NOTICE_REQUEST } from '../reducers/content';

const Home = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.userInfo);
  const {
    mainPosts,
    loadPostsLoading,
    loadPostFalid,
    loadPostMoreFalid,
    pageNumber,
  } = useSelector((state) => state.postMainAction);
  const { postCompleat, updateCompleat } = useSelector(
    (state) => state.postAdd,
  );

  const [ref, inView] = useInView();

  useEffect(() => {
    // if (!me) {
    //   Router.push('/login');
    // }
    if (me && mainPosts.length <= 0 && loadPostFalid) {
      dispatch({
        type: LOAD_POSTS_REQUEST,
        data: { mem_id: me.id },
      });
      return;
    }

    if (postCompleat || updateCompleat) {
      dispatch({
        type: PAGE_CHANGE,
      });
      if (postCompleat) {
        dispatch({
          type: LOAD_POSTS_REQUEST,
          data: { mem_id: me.id },
        });
      }
    }

    if (inView && loadPostMoreFalid && !loadPostsLoading) {
      const formData = new FormData();
      formData.append('page', pageNumber);
      formData.append('mem_id', me?.id);
      dispatch({
        type: LOAD_MORE_POSTS_REQUEST,
        data: formData,
      });
    }
  }, [
    mainPosts,
    me,
    postCompleat,
    updateCompleat,
    pageNumber,
    loadPostFalid,
    inView,
    loadPostMoreFalid,
    loadPostsLoading,
  ]);

  const service = useCallback(() => {
    if (me.grade === 'admin') {
      dispatch({
        type: GET_NOTICE_REQUEST,
      });
    } else {
      alert('서비스 준비중입니다.');
    }
  }, [me]);

  return (
    <>
      {me ? (
        <MainLayout>
          <div style={{ paddingTop: '44px' }} />
          {me.grade === 'admin' ? (
            <div className={style.setting} onClick={service}>
              <Link href="/notice">
                <a>
                  <img src="/icon/notice.png" alt="icon" />
                  <p className={style.noticeNumber}>{/* <span>5</span> */}</p>
                </a>
              </Link>
            </div>
          ) : (
            <div className={style.setting} onClick={service}>
              <a>
                <img src="/icon/notice.png" alt="icon" />
                <p className={style.noticeNumber}>{/* <span>5</span> */}</p>
              </a>
            </div>
          )}

          <MemberListBox />

          <div className={style.postCardWrap}>
            {mainPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}

            <div
              ref={loadPostMoreFalid && !loadPostsLoading ? ref : undefined}
            />

            {loadPostsLoading ? <Loading /> : null}

            {loadPostMoreFalid ? null : (
              <Link href="https://open.kakao.com/o/sJECgaRd">
                <a target="_blank">
                  <div className={style.bottomLogo}>@YOUTHHILLTOP</div>
                </a>
              </Link>
            )}
          </div>

          <div style={{ paddingBottom: '54px' }} />
        </MainLayout>
      ) : (
        <Login />
      )}
    </>
  );
};

// export const getServerSideProps = wrapper.getServerSideProps(
//   (store) =>
//     async ({ req, params }) => {
//       const cookie = req ? req.headers.cookie : '';
//       axios.defaults.headers.Cookie = '';
//       if (req && cookie) {
//         axios.defaults.headers.Cookie = cookie;
//       }

//       // store.dispatch({
//       //   type: LOAD_POSTS_REQUEST,
//       //   // data: { mem_id: 'jin@n.com' },
//       // });
//       store.dispatch(END);
//       await store.sagaTask.toPromise();
//     },
// );

export default Home;
