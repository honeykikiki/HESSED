import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Router } from 'next/router';

import style from '../../styles/css/postCard.module.css';

import PostImages from '../PostCard/PostImage';
import PostIcon from '../PostCard/PostIcon';
import PostContent from '../PostCard/PostContent';
import PostComment from '../PostCard/PostComment';
import PostCardSetButton from './postCardMore/PostCardSetButton';

const PostCard = ({ post }) => {
  const { me } = useSelector((state) => state.user);
  const id = useSelector((state) => state.user.me && state.user.me.id);

  useEffect(() => {
    if (!me) {
      Router.push('/');
    }
  }, []);

  return (
    <section className={style.a}>
      <article className={style.maxWidth}>
        <div className={style.postCard}>
          <div className={style.postHead}>
            <header>
              <div>{<img src="/icon/profle_img.png" />}</div>
              <div>{`${post.User.nickname}`}</div>
              <div>{id ? null : true ? '팔로우' : '언팔로우'}</div>
            </header>
            <PostCardSetButton post={post} />
            {/* {true ?  : null} */}
          </div>

          <div className={style.postImage}>
            <div>
              {post?.Images.length > 0 && <PostImages images={post.Images} />}
              {/* <PostImages images={post.Images} /> */}
              {/* 이미지 사이즈 조절하는법 찾기 */}
            </div>
          </div>

          <div className={style.postIcon}>
            <PostIcon post={post} />
          </div>

          <div className={style.postContent}>
            <PostContent post={post} />
          </div>
          <div className={style.postComment}>
            <PostComment post={post} />
          </div>
        </div>
      </article>
    </section>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    user: PropTypes.object,
    content: PropTypes.string,
    createdAt: PropTypes.string,
    comments: PropTypes.arrayOf(PropTypes.object),
    Images: PropTypes.arrayOf(PropTypes.object),
    Likers: PropTypes.arrayOf(PropTypes.object),
    Retweet: PropTypes.objectOf(PropTypes.any),
  }).isRequired,
};

export default PostCard;
