import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_COMMENT_REQUEST } from '../../reducers/post';
import PropTypes from 'prop-types';

import style from '../../styles/css/postComment.module.css';
import useInput from '../../hooks/useInput';

const PostContent = ({ post }) => {
  const dispatch = useDispatch();
  const { addCommentDone } = useSelector((state) => state.post);

  const id = useSelector((state) => state.user.me?.id);
  const [comment, onChangeInput, setComment] = useInput('');

  useEffect(() => {
    if (addCommentDone) {
      setComment('');
    }
  }, [addCommentDone]);

  const commentPost = useCallback(
    (e) => {
      e.preventDefault();
      if (!comment) {
        return alert('댓글을 작성해주세요');
      }
      dispatch({
        type: ADD_COMMENT_REQUEST,
        data: {
          content: comment,
          postId: post.id,
          User: { id, nickname: 'kikiki' },
        },
      });
    },
    [comment, id],
  );

  return (
    <>
      <form className={style.form}>
        <textarea
          className={style.text}
          placeholder="댓글달기..."
          autoComplete="off"
          autoCorrect="off"
          value={comment}
          onChange={onChangeInput}
        ></textarea>
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
    createdAt: PropTypes.string,
    comments: PropTypes.arrayOf(PropTypes.object),
    Images: PropTypes.arrayOf(PropTypes.object),
    Likers: PropTypes.arrayOf(PropTypes.object),
    Retweet: PropTypes.objectOf(PropTypes.any),
  }).isRequired,
};

export default PostContent;
