/* eslint-disable no-restricted-globals */
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';

import Router from 'next/router';
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
    if (!me) {
      Router.push('/login');
    }
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
    alert('공지사항 서비스 준비중입니다.');
  }, []);

  return (
    <>
      {me && (
        <MainLayout>
          <div style={{ paddingTop: '44px' }} />

          <div className={style.setting} onClick={service}>
            {/* <Link href="/notice"> */}
            <a>
              <img src="/icon/notice.png" alt="icon" />
              <p className={style.noticeNumber}>{/* <span>5</span> */}</p>
            </a>
            {/* </Link> */}
          </div>

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
                  <div className={style.bottomLogo}>@HESSED</div>
                </a>
              </Link>
            )}
          </div>

          <div style={{ paddingBottom: '54px' }} />
        </MainLayout>
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
//       store.dispatch({
//         type: LOAD_POSTS_REQUEST,
//       });
//       store.dispatch(END);
//       await store.sagaTask.toPromise();
//     },
// );

export default Home;
