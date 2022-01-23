import React, { useCallback, useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';

import { END } from 'redux-saga';
import style from '../../styles/css/dynamicPost.module.css';
import PostCard from '../../components/PostCard/PostCard';
import MainLayout from '../../components/MainLayout';

import { GET_ID_POST_REQUEST } from '../../reducers/getIdPost';
import { MY_POST_AND_SAVE_POST_GET_REQUEST } from '../../reducers/userPost';
import { PROFILE } from '../../reducers/menu';

import wrapper from '../../store/configureStore';

const Post = () => {
  const router = useRouter();
  const { id } = router.query;

  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.userInfo);
  const { boardOneViewPost } = useSelector((state) => state.getIdPost);
  const { loginNotConnected } = useSelector((state) => state.postMainAction);
  const { deleteCompleat } = useSelector((state) => state.postAdd);

  useEffect(() => {
    if (id) {
      dispatch({
        type: GET_ID_POST_REQUEST,
        data: { bo_no: +id, mem_id: me?.id },
      });
    }
    if (loginNotConnected) {
      Router.push('/');
    }
    if (deleteCompleat) {
      Router.push('/profile');
    }
  }, [id, loginNotConnected, me, deleteCompleat]);

  const onClickBack = useCallback(() => {
    dispatch({
      type: MY_POST_AND_SAVE_POST_GET_REQUEST,
      data: { mem_id: me?.id },
    });
    dispatch({
      type: PROFILE,
    });
    Router.push('/profile');
  }, []);

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

          <div style={{ paddingTop: '34px' }} />
          <PostCard post={boardOneViewPost} />
          <div style={{ paddingBottom: '54px' }} />
        </section>
      )}
    </MainLayout>
  );
};

// export const getServerSideProps = wrapper.getServerSideProps(
//   (store) =>
//     async ({ req, params }) => {
//       store.dispatch({
//         type: MY_POST_AND_SAVE_POST_GET_REQUEST,
//         data: { mem_id : Number(params.id)},
//       });
//       store.dispatch(END);
//       await store.sagaTask.toPromise();
//     },
// );

export default Post;
