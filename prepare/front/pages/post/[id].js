import React, { useCallback, useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import Head from 'next/head';
import { useSelector } from 'react-redux';

import style from '../../styles/css/dynamicPost.module.css';
import PostCard from '../../components/PostCard/PostCard';
import MainLayout from '../../components/MainLayout';
const Post = () => {
  const router = useRouter();
  const { id } = router.query;

  const { mainPosts } = useSelector((state) => state.post);
  const { me } = useSelector((state) => state.user);
  const post = mainPosts.find((v) => v.id === +id);

  useEffect(() => {
    if (!me) {
      Router.push('/');
    }
    // if (!post) {
    //   Router.push('/profile');
    // }
  }, [me, post]);

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

export default Post;
