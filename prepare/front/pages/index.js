import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInView } from 'react-intersection-observer';

import MainLayout from '../components/MainLayout';
import LoginForm from '../components/login/LoginForm';
import PostCard from '../components/PostCard/PostCard';

import style from '../styles/css/postCard.module.css';
import {
  LOAD_MORE_POSTS_REQUEST,
  LOAD_POSTS_REQUEST,
} from '../reducers/postMainAction';
import { PAGE_CHANGE } from '../reducers/postAdd';

import { END } from 'redux-saga';
import wrapper from '../store/configureStore';

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
  const { postCompleat } = useSelector((state) => state.postAdd);

  const [ref, inView] = useInView();

  useEffect(() => {
    if (me && mainPosts.length <= 0 && loadPostFalid) {
      dispatch({
        type: LOAD_POSTS_REQUEST,
      });
      return;
    }

    if (postCompleat) {
      dispatch({
        type: LOAD_POSTS_REQUEST,
      });
      dispatch({
        type: PAGE_CHANGE,
      });
      return;
    }

    if (inView && loadPostMoreFalid && !loadPostsLoading) {
      const formData = new FormData();
      formData.append('page', pageNumber);
      dispatch({
        type: LOAD_MORE_POSTS_REQUEST,
        data: formData,
      });
    }
  }, [
    mainPosts,
    me,
    postCompleat,
    pageNumber,
    loadPostFalid,
    inView,
    loadPostMoreFalid,
    loadPostsLoading,
  ]);

  return (
    <>
      {me ? (
        <MainLayout>
          <div style={{ paddingTop: '30px' }}></div>

          {mainPosts.map((post, i) => {
            return <PostCard key={post.id} post={post} />;
          })}

          <div ref={loadPostMoreFalid && !loadPostsLoading ? ref : undefined} />

          {loadPostMoreFalid ? null : (
            <div className={style.bottomLogo}>@HESSED</div>
          )}

          <div style={{ paddingBottom: '54px' }}></div>
        </MainLayout>
      ) : (
        <LoginForm />
      )}
    </>
  );
};

//  다시 포스트로 넘어갈떄 리랜더링 되는현상

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

export default Home;
