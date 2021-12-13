import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
// import { Router } from 'next/router';
import Link from 'next/link';

import style from '../../styles/css/postCard.module.css';

import PostImages from '../PostCard/PostImage';
import PostIcon from '../PostCard/PostIcon';
import PostContent from '../PostCard/PostContent';
import PostComment from '../PostCard/PostComment';
import PostCardSetButton from './postCardMore/PostCardSetButton';
import { baseURL } from '../../config/config';
import PostHeader from './PostHeader';

const PostCard = ({ post }) => {
  return (
    <>
      <section className={style.a}>
        <article className={style.maxWidth}>
          <div className={style.postCard}>
            <div className={style.postHead}>
              <header>
                <PostHeader post={post} />
              </header>
              <PostCardSetButton post={post} />
              {/* {true ?  : null} */}
            </div>

            <div className={style.postImage}>
              <div>
                {post?.Images.length > 0 && <PostImages images={post.Images} />}
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
    </>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    user: PropTypes.object,
    content: PropTypes.string,
    data: PropTypes.string,
    comments: PropTypes.arrayOf(PropTypes.object),
    Images: PropTypes.arrayOf(PropTypes.object),
    Likers: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

export default PostCard;
