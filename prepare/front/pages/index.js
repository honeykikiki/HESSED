import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MainLayout from '../components/MainLayout';
import LoginForm from '../components/login/LoginForm';
import PostCard from '../components/PostCard/PostCard';
import { LOAD_POSTS_REQUEST } from '../reducers/post';

import { END } from 'redux-saga';
import wrapper from '../store/configureStore';

const Home = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const { mainPosts, hasMorePosts, loadPostsLoading } = useSelector(
    (state) => state.post,
  );

  useEffect(() => {
    function onScroll() {
      console.log(
        window.scrollY,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        -300,
      );
      if (
        window.scrollY + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        if (hasMorePosts && !loadPostsLoading) {
          const lastId = mainPosts[mainPosts.length - 1]?.id;
          dispatch({
            type: LOAD_POSTS_REQUEST,
            lastId,
          });
        }
      }
    }

    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [mainPosts]);

  return (
    <>
      {me ? (
        <MainLayout>
          <div style={{ paddingTop: '30px' }}></div>

          {mainPosts.map((v) => {
            return <PostCard key={v.id} post={v} />;
          })}

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
//       console.log('start');
//       store.dispatch({
//         type: LOAD_POSTS_REQUEST,
//       });
//       store.dispatch(END);
//       await store.sagaTask.toPromise();
//     },
// );

export default Home;
