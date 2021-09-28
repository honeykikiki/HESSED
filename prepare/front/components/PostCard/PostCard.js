import React from 'react';
import PropTypes from 'prop-types';

import style from '../../styles/css/postCard.module.css';

import PostImages from '../PostCard/PostImage';
import PostIcon from '../PostCard/PostIcon';
import PostContent from '../PostCard/PostContent';
import PostComment from '../PostCard/PostComment';
import { useSelector } from 'react-redux';

const PostCard = ({ post }) => {
  const { me } = useSelector((state) => state.user);
  // const id =
  const id = useSelector((state) => state.user.me && state.user.me.id);

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
            <div className={style.menu}>
              <img src="/icon/btn.svg" />
            </div>
          </div>

          <div className={style.postImage}>
            <div>
              <PostImages images={post.Images} />
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
