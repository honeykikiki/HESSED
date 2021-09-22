import React from 'react';

import style from '../../styles/css/postContent.module.css';

const PostContent = () => {
  return (
    <article className={style.art}>
      <div>{`좋아요 0개`}</div>
      <div>
        <p>{`nickname #ooo #ooo ...입니다`}</p>
      </div>
      <div>
        <p>{false ? `comment` : null}</p>
      </div>
      <br />
      <div>
        <p>{`2020년 07월 08일`}</p>
      </div>
    </article>
  );
};

export default PostContent;
