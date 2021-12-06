import React, { useCallback, useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';

import style from '../../styles/css/dynamicPost.module.css';
import PostCard from '../../components/PostCard/PostCard';
import MainLayout from '../../components/MainLayout';

import { END } from 'redux-saga';
import wrapper from '../../store/configureStore';
import { GET_ID_POST_REQUEST } from '../../reducers/getIdPost';

const Post = () => {
  const router = useRouter();
  const { id } = router.query;

  const dispatch = useDispatch();

  const { boardOneViewPost } = useSelector((state) => state.getIdPost);
  const { loginNotConnected } = useSelector((state) => state.postMainAction);

  useEffect(() => {
    if (id) {
      dispatch({
        type: GET_ID_POST_REQUEST,
        data: { bo_no: +id },
      });
    }
    if (loginNotConnected) {
      Router.push('/');
    }
  }, [id, loginNotConnected]);

  const onClickBack = useCallback(() => {
    Router.back();
  }, []);

  console.log(boardOneViewPost);

  return (
    <MainLayout>
      {boardOneViewPost && (
        <Head>
          <title>{`HESSED ${boardOneViewPost?.User.nickname} 님의 게시글`}</title>
        </Head>
      )}

      {boardOneViewPost && (
        <section>
          <div className={style.head}>
            <div onClick={onClickBack}>
              <img src="/icon/back.svg" width="12px" alt="BackIcon" />
            </div>
            <div>{`${boardOneViewPost.User.nickname}님의 게시글`}</div>
          </div>
          <div style={{ paddingTop: '34px' }}></div>
          <PostCard post={boardOneViewPost} />
        </section>
      )}
    </MainLayout>
  );
};

// export const getServerSideProps = wrapper.getServerSideProps(
//   (store) =>
//     async ({ req, params }) => {
//       store.dispatch({
//         type: LOAD_POSTS_REQUEST,
//         data: params.id,
//       });
//       store.dispatch(END);
//       await store.sagaTask.toPromise();
//     },
// );

export default Post;
