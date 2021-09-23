import React, { useCallback } from 'react';

import style from '../../styles/css/postComment.module.css';

const PostContent = () => {
  const commentPost = useCallback((e) => {
    e.preventDefault();
  }, []);

  return (
    <>
      <form className={style.form} onClick={commentPost}>
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
