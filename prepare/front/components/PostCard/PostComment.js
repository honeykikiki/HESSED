import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PropTypes from 'prop-types';

import style from '../../styles/css/postComment.module.css';
import useinput from '../../hooks/useinput';
import {
  ADD_COMMENT_REQUEST,
  MAIN_SCREEN_COMMENT_PUSH,
} from '../../reducers/postMainAction';

const PostContent = ({ post }) => {
  const dispatch = useDispatch();
  const { addCommentDone } = useSelector((state) => state.postMainAction);
  const { me } = useSelector((state) => state.userInfo);
  const [comment, onChangeInput, setComment] = useinput('');

  const commentPost = useCallback(
    async (e) => {
      e.preventDefault();
      if (!comment) {
        return alert('댓글을 작성해주세요');
      }
      const formData = new FormData();
      formData.append('bo_no', post.id);
      formData.append('cmt_content', comment);
      formData.append('mem_nickname', me.nickname);

      dispatch({
        type: ADD_COMMENT_REQUEST,
        data: formData,
      });
      dispatch({
        type: MAIN_SCREEN_COMMENT_PUSH,
        data: {
          nickname: me.nickname,
          comment,
          postId: post.id,
        },
      });

      setComment('');
    },
    [comment, me, post, addCommentDone],
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
