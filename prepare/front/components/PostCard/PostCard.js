import React from 'react';

import style from '../../styles/css/postCard.module.css';

import PostImages from '../PostCard/PostImage';
import PostIcon from '../PostCard/PostIcon';
import PostContent from '../PostCard/PostContent';
import PostComment from '../PostCard/PostComment';

const PostCard = () => {
  return (
    <section className={style.a}>
      <article className={style.maxWidth}>
        <div className={style.postCard}>
          <div className={style.postHead}>
            <header>
              <div>{<img src="/icon/profle_img.png" />}</div>
              <div>{'nickname'}</div>
              <div>{true ? '팔로우' : '언팔로우'}</div>
            </header>
            <div className={style.menu}>
              <img src="/icon/btn.svg" />
            </div>
          </div>

          <div className={style.postImage}>
            <div>
              <PostImages />
              {/* 이미지 사이즈 조절하는법 찾기 */}
            </div>
          </div>

          <div className={style.postIcon}>
            <PostIcon />
          </div>

          <div className={style.postContent}>
            <PostContent />
          </div>
          <div className={style.postComment}>
            <PostComment />
          </div>
        </div>
      </article>
    </section>
  );
};

export default PostCard;
