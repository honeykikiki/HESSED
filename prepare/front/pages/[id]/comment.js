import React, { useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import Head from 'next/head';
import { useSelector } from 'react-redux';

import PostInContent from '../../components/comment/PostInContent';

const Post = () => {
  const router = useRouter();
  const { id } = router.query;
  const { mainPosts } = useSelector((state) => state.postMainAction);
  const { boardOneViewPost } = useSelector((state) => state.getIdPost);
  const { me } = useSelector((state) => state.userInfo);
  const post = mainPosts.find((v) => v.id === +id);
  useEffect(() => {
    if (!me) {
      Router.replace('/');
    }
  }, [me]);
  return (
    <>
      <Head>
        <title>{`HESSED ${post?.User.nickname} 님의 게사글`}</title>
        <meta
          name="description"
          content={`${post?.User.nickname}님의 게시글`}
        />
        <meta
          property="og:title"
          content={`${post?.User.nickname}님의 게시글`}
        />
        <meta
          property="og:description"
          content={`${post?.User.nickname}님의 게시글`}
        />
        <meta
          property="og:image"
          content="/icon/HESSED_LOGO-W.png"
          layout="fill"
        />
        {/* <meta property="og:url" content={`https://nodebird.com/user/${id}`} /> */}
      </Head>

      {post ? (
        <PostInContent post={post} />
      ) : boardOneViewPost ? (
        <PostInContent post={boardOneViewPost} />
      ) : null}
    </>
  );
};

export default Post;
