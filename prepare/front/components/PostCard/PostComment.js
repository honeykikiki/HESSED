import React from 'react';

import style from '../../styles/css/postComment.module.css';

const PostContent = () => {
  return (
    <>
      <form className={style.form}>
        <textarea
          className={style.text}
          placeholder="댓글달기..."
          autoComplete="off"
          autoCorrect="off"
        ></textarea>
        <button>게시</button>
      </form>
    </>
  );
};

export default PostContent;
