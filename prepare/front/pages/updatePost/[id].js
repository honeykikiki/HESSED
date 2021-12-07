import React, { useCallback, useEffect, useRef } from 'react';
import Router, { useRouter } from 'next/router';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';

import style from '../../styles/css/dynamicPost.module.css';
import MainLayout from '../../components/MainLayout';

import { GET_ID_POST_REQUEST } from '../../reducers/getIdPost';
import { baseURL } from '../../config/config';
import PostImages from '../../components/PostCard/PostImage';
import useInput from '../../hooks/useInput';
import { UPDATE_POST_REQUEST } from '../../reducers/postAdd';

const Post = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { boardOneViewPost } = useSelector((state) => state.getIdPost);
  const { loginNotConnected } = useSelector((state) => state.postMainAction);
  const { me } = useSelector((state) => state.userInfo);
  const { updateCompleat } = useSelector((state) => state.postAdd);
  const { id } = router.query;
  const [content, onChangeContent, setContetn] = useInput();

  const ref = useRef();
  const handleResizeHeight = useCallback(() => {
    if (ref === null || ref.current === null) {
      return;
    }
    ref.current.style.height = '20px';
    ref.current.style.height = ref.current.scrollHeight + 'px';
  }, []); //댓글창 크기 자동조절

  useEffect(() => {
    if (!me || updateCompleat) {
      Router.push('/');
    }
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
  }, [me, updateCompleat]);

  const updatePost = useCallback((e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append(mem_id, me.id);
    formData.append(bo_no, id);
    formData.append(bo_content, content);
    dispatch({
      type: UPDATE_POST_REQUEST,
      data: formData,
    });
  }, []);

  return (
    <MainLayout>
      {boardOneViewPost && (
        <Head>
          <title>{`HESSED ${boardOneViewPost?.User.nickname} 님의 게시글`}</title>
        </Head>
      )}

      {boardOneViewPost && (
        <section className={style.wrap}>
          <article className={style.maxWidth}>
            <div className={style.head}>
              <div onClick={onClickBack}>
                <img src="/icon/back.svg" width="12px" alt="BackIcon" />
              </div>
              <div>{`${boardOneViewPost.User.nickname}님의 게시글 수정하기`}</div>
            </div>
            <div style={{ paddingTop: '34px' }}></div>
            <div className={style.postImage}>
              {boardOneViewPost.Images ? (
                <PostImages images={boardOneViewPost.Images} />
              ) : null}
            </div>
            <form onSubmit={updatePost} className={style.textInput}>
              <textarea
                name="bo_content"
                type="text"
                placeholder="문구를 입력해주세요"
                ref={ref}
                onInput={handleResizeHeight}
                onChange={onChangeContent}
                required
              />
              <button>수정하기</button>
            </form>
          </article>
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
