import React from 'react';
import PropTypes from 'prop-types';

import style from '../../styles/css/postCard.module.css';

import PostImages from './PostImage';
import PostIcon from './PostIcon';
import PostContent from './PostContent';
import PostComment from './PostComment';
import PostCardSetButton from './postCardMore/PostCardSetButton';
import PostHeader from './PostHeader';

const PostCard = ({ post }) => {
  return (
    <>
      <section className={style.a}>
        <article className={style.maxWidth}>
          <div className={style.postCard}>
            <div className={style.postHead}>
              <PostHeader post={post} />
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
