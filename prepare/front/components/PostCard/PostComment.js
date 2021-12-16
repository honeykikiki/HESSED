import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PropTypes from 'prop-types';

import style from '../../styles/css/postComment.module.css';
import useInput from '../../hooks/useInput';
import { ADD_COMMENT_REQUEST } from '../../reducers/postMainAction';

const PostContent = ({ post }) => {
  const dispatch = useDispatch();
  const { addCommentDone } = useSelector((state) => state.postMainAction);
  const { me } = useSelector((state) => state.userInfo);

  // const id = useSelector((state) => state.user.me?.id);
  const [comment, onChangeInput, setComment] = useInput('');

  const commentPost = useCallback(
    (e) => {
      e.preventDefault();
      if (!comment) {
        return alert('댓글을 작성해주세요');
      }
      dispatch({
        type: ADD_COMMENT_REQUEST,
        data: {
          postId: +post.id,
          commentId:
            post.Comments[post.Comments.length - 1]?.commentId + 1 || 1,
          User: {
            id: me.id,
            nickname: me.nickname,
          },
          content: comment,
          // bo_no : post.id
          // mem_id: me.id,
          // cmt_content: comment,
          // comments: [],
        },
      });
      setComment('');
    },
    [comment],
  );

  return (
    <>
      <form className={style.form}>
        <textarea
          className={style.text}
          placeholder="댓글달기준비중입니다..."
          autoComplete="off"
          autoCorrect="off"
          value={comment}
          onChange={onChangeInput}
        />
        <button onClick={commentPost}>게시</button>
      </form>
    </>
  );
};

PostContent.propTypes = {
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

export default PostContent;
