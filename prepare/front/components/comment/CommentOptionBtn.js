import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import style from '../../styles/css/postCard.module.css';

import { useDispatch, useSelector } from 'react-redux';
import {
  REMOVE_COMMENT_REPLY_REQUEST,
  REMOVE_COMMENT_REQUEST,
} from '../../reducers/post';

const CommentOptionBtn = ({
  post,
  postId,
  commentId,
  bool,
  commentReplyCheckdId,
}) => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const [optionButton, setOptionButton] = useState(true);

  const onClickOptionOpen = useCallback(() => {
    if (optionButton) {
      setOptionButton(false);
      return;
    }
  }, [optionButton]);
  const onClickOptionClose = useCallback(() => {
    if (!optionButton) {
      setOptionButton(true);
      return;
    }
  }, [optionButton]);

  const onClickCommentRemove = useCallback(() => {
    dispatch({
      type: REMOVE_COMMENT_REQUEST,
      data: {
        commentId,
        postId: +postId,
        userId: me.id,
      },
    });
  }, [commentId]);

  const onClickCommentReplyRemove = useCallback(() => {
    dispatch({
      type: REMOVE_COMMENT_REPLY_REQUEST,
      data: {
        commentId,
        commentReplyId: commentReplyCheckdId,
        postId: +postId,
        userId: me.id,
      },
    });
  }, [commentId, commentReplyCheckdId, postId]);

  return (
    <>
      {bool ? (
        //댓글용
        <span
          className={style.menu}
          style={{
            backgroundImage: 'url(/icon/btn.svg)',
          }}
          onClick={onClickOptionOpen}
        >
          <img />
          {/* {post.User. === me.id}/{me.id} */}
          {optionButton ? null : me.id === post.User.id ? (
            <div
              className={style.optionButton}
              style={{ border: '1px solid black' }}
            >
              <div onClick={onClickCommentRemove}>
                <p>삭제</p>
              </div>
              <div onClick={onClickOptionClose}>
                <p>취소</p>
              </div>
            </div>
          ) : (
            <div
              className={style.optionButton}
              style={{ border: '1px solid black' }}
            >
              <div style={{ color: 'red' }}>
                <p>신고</p>
              </div>
              <div onClick={onClickOptionClose}>
                <p>취소</p>
              </div>
            </div>
          )}
        </span>
      ) : (
        //답글용
        <span
          className={style.menu}
          style={{
            backgroundImage: 'url(/icon/btn.svg)',
          }}
          onClick={onClickOptionOpen}
        >
          <img />
          {/* {post.User. === me.id}/{me.id} */}
          {optionButton ? null : me.id === post.User.id ? (
            <div
              className={style.optionButton}
              style={{ border: '1px solid black' }}
            >
              <div onClick={onClickCommentReplyRemove}>
                <p>삭제</p>
              </div>
              <div onClick={onClickOptionClose}>
                <p>취소</p>
              </div>
            </div>
          ) : (
            <div
              className={style.optionButton}
              style={{ border: '1px solid black' }}
            >
              <div style={{ color: 'red' }}>
                <p>신고</p>
              </div>
              <div onClick={onClickOptionClose}>
                <p>취소</p>
              </div>
            </div>
          )}
        </span>
      )}
    </>
  );
};

CommentOptionBtn.propTypes = {
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
  postId: PropTypes.number.isRequired,
  commentId: PropTypes?.number.isRequired,
  bool: PropTypes.bool.isRequired,
  commentReplyCheckdId: PropTypes?.number.isRequired,
};

export default CommentOptionBtn;