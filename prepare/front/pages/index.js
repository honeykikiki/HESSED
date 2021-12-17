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

      return;
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

  return (
    <>
      {me ? (
        <MainLayout>
          <div style={{ paddingTop: '30px' }} />

          {mainPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}

          <div ref={loadPostMoreFalid && !loadPostsLoading ? ref : undefined} />

          {loadPostMoreFalid ? null : (
            <div className={style.bottomLogo}>@HESSED</div>
          )}

          <div style={{ paddingBottom: '54px' }} />
        </MainLayout>
      ) : (
        <LoginForm />
      )}
    </>
  );
};

export default Home;
