import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MainLayout from '../components/MainLayout';
import LoginForm from '../components/login/LoginForm';
import PostCard from '../components/PostCard/PostCard';
import {
  LOAD_MORE_POSTS_REQUEST,
  LOAD_POSTS_REQUEST,
  PAGE_CHANGE,
} from '../reducers/post';
import style from '../styles/css/postCard.module.css';

import { END } from 'redux-saga';
import wrapper from '../store/configureStore';

const Home = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const { mainPosts, loadPostsLoading, postCompleat, addPostFalid, pageMore } =
    useSelector((state) => state.post);

  const [pageNumber, setPageNumber] = useState(2);

  let number = 0;

  // useEffect(() => {
  //   if (inView && hasMorePosts && !loadPostsLoading) {
  //     const lastId = mainPosts[mainPosts.length - 1]?.id;
  //     dispatch({
  //       type: LOAD_POSTS_REQUEST,
  //       lastId,
  //     });
  //   }
  // }, [inView, hasMorePosts, loadPostsLoading, mainPosts, id]);

  useEffect(() => {
    if (me && mainPosts.length <= 0 && addPostFalid) {
      dispatch({
        type: LOAD_POSTS_REQUEST,
      });
    }

    if (postCompleat) {
      dispatch({
        type: LOAD_POSTS_REQUEST,
      });
      dispatch({
        type: PAGE_CHANGE,
      });
    }

    function onScroll() {
      if (
        window.scrollY + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        if (!loadPostsLoading && number === 0) {
          const formData = new FormData();
          formData.append('page', pageNumber);
          dispatch({
            type: LOAD_MORE_POSTS_REQUEST,
            data: formData,
          });
          number = 1;
        }
      }
    }

    if (pageMore) {
      number = 0;
      setPageNumber((prev) => prev + 1);
    }

    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [mainPosts, me, postCompleat, number, pageMore]);

  return (
    <>
      {me ? (
        <MainLayout>
          <div style={{ paddingTop: '30px' }}></div>

          {mainPosts.map((post, i) => {
            return <PostCard key={post.id} post={post} />;
          })}
          {/* <div ref={!loadPostsLoading ? ref : undefined} /> */}

          {addPostFalid ? null : (
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
