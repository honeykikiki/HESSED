import React, { useCallback, useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import Head from 'next/head';
import { useSelector } from 'react-redux';

import style from '../../styles/css/dynamicPost.module.css';
import PostCard from '../../components/PostCard/PostCard';
import MainLayout from '../../components/MainLayout';

import { END } from 'redux-saga';
import wrapper from '../../store/configureStore';
import { LOAD_POSTS_REQUEST } from '../../reducers/post';

const Post = () => {
  const router = useRouter();
  const { id } = router.query;

  const { mainPosts } = useSelector((state) => state.post);
  const { me } = useSelector((state) => state.user);
  const post = mainPosts.find((v) => v.id === +id);

  const onClickBack = useCallback(() => {
    Router.back();
  }, []);

  return (
    <MainLayout>
      {post && (
        <Head>
          <title>{`HESSED ${post?.User.nickname} 님의 게시글`}</title>
        </Head>
      )}

      {post && (
        <section>
          <div className={style.head}>
            <div onClick={onClickBack}>
              <img src="/icon/back.svg" width="12px" />
            </div>
            <div>{`${post?.User.nickname}님의 게시글`}</div>
          </div>
          <PostCard post={post} />
        </section>
      )}
    </MainLayout>
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

export default Post;
