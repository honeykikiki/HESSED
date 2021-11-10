import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MainLayout from '../components/MainLayout';
import LoginForm from '../components/login/LoginForm';
import PostCard from '../components/PostCard/PostCard';
import { LOAD_MORE_POSTS_REQUEST, LOAD_POSTS_REQUEST } from '../reducers/post';

import { END } from 'redux-saga';
import wrapper from '../store/configureStore';

const Home = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const { mainPosts, hasMorePosts, loadPostsLoading } = useSelector(
    (state) => state.post,
  );

  useEffect(() => {
    if (me && mainPosts.length <= 0) {
      const lastId = mainPosts[mainPosts.length - 1]?.id;
      // const lastId = mainPosts[mainPosts.length - 1]?.MEN_ID;
      dispatch({
        type: LOAD_POSTS_REQUEST,
      });
    }

    function onScroll() {
      if (
        window.scrollY + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        if (hasMorePosts && !loadPostsLoading) {
          const lastId = mainPosts[mainPosts.length - 1]?.id;
          // const lastId = mainPosts[mainPosts.length - 1]?.MEN_ID;
          dispatch({
            type: LOAD_MORE_POSTS_REQUEST,
          });
        }
      }
    }

    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [mainPosts, me]);

  return (
    <>
      {me ? (
        <MainLayout>
          <div style={{ paddingTop: '30px' }}></div>

          {mainPosts.map((post, i) => {
            return <PostCard key={post.id} post={post} />;
          })}

          {hasMorePosts ? null : <div>@HESSED</div>}
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
