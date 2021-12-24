import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';

import PostInComment from '../../components/comment/PostInComment';

const Post = () => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const { mainPosts } = useSelector((state) => state.postMainAction);
  const post = mainPosts.find((v) => v.id === +id);

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
      {post ? <PostInComment post={post} /> : null}
    </>
  );
};

export default Post;
