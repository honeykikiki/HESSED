import React from 'react';

import style from '../../styles/css/postIcon.module.css';

const PostIcon = () => {
  return (
    <article className={style.postIcon}>
      <div>{false ? <img src="/icon/heartOn.svg" /> : <img src="/icon/heartOff.svg" />}</div>
      <div>{<img src="/icon/comment.svg" />}</div>
      <div>
        <img src="/icon/share.svg" />
      </div>
      <div>{false ? <img src="/icon/saveOn.svg" /> : <img src="/icon/saveOff.svg" />}</div>
    </article>
  );
};

export default PostIcon;
