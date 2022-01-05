import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';
import style from '../../styles/css/postCard.module.css';

import {
  REMOVE_COMMENT_REPLY_REQUEST,
  REMOVE_COMMENT_REQUEST,
} from '../../reducers/postMainAction';

const CommentOptionBtn = ({ postComments, bool }) => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.userInfo);
  const [optionButton, setOptionButton] = useState(true);

  useEffect(() => {
    if (!optionButton) {
      document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
      return () => {
        const scrollY = document.body.style.top;
        document.body.style.cssText = '';
        window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
      };
    }
  }, [optionButton]);

  const onClickOptionOpen = useCallback(() => {
    if (optionButton) {
      setOptionButton(false);
    }
  }, [optionButton]);

  const onClickOptionClose = useCallback(() => {
    if (!optionButton) {
      setOptionButton(true);
    }
  }, [optionButton]);

  const onClickCommentRemove = useCallback(() => {
    const formData = new FormData();
    formData.append('cmt_no', postComments.commentId);
    dispatch({
      type: REMOVE_COMMENT_REQUEST,
      data: formData,
    });
  }, [postComments]);

  const onClickCommentReplyRemove = useCallback(() => {
    const formData = new FormData();
    formData.append('cmt_no', postComments.commentId);
    dispatch({
      type: REMOVE_COMMENT_REPLY_REQUEST,
      data: formData,
    });
  }, [postComments]);

  const Declaration = useCallback(() => {
    alert('신고되었습니다.');
  }, []);

  return (
    <>
      {bool ? (
        // 댓글용
        <span className={style.menu} onClick={onClickOptionOpen}>
          <img style={{ marginBottom: '-3px' }} src="/icon/btn.svg" alt="img" />
          {optionButton ? null : me.nickname === postComments.User.nickname ? (
            <div className={style.buttonWrap} onClick={onClickOptionClose}>
              <div
                className={style.optionButton}
                style={{ border: '1px solid black' }}
              >
                <div onClick={onClickCommentRemove} style={{ color: 'red' }}>
                  <p>삭제</p>
                </div>
                <div onClick={onClickOptionClose}>
                  <p>취소</p>
                </div>
              </div>
            </div>
          ) : (
            <div className={style.buttonWrap} onClick={onClickOptionClose}>
              <div
                className={style.optionButton}
                style={{ border: '1px solid black' }}
              >
                <div style={{ color: 'red' }} onClick={Declaration}>
                  <p>신고</p>
                </div>
                <div onClick={onClickOptionClose}>
                  <p>취소</p>
                </div>
              </div>
            </div>
          )}
        </span>
      ) : (
        // 답글용
        <span className={style.menu} onClick={onClickOptionOpen}>
          <img style={{ marginBottom: '-3px' }} src="/icon/btn.svg" alt="img" />
          {optionButton ? null : me.nickname === postComments.User.nickname ? (
            <div className={style.buttonWrap} onClick={onClickOptionClose}>
              <div
                className={style.optionButton}
                style={{ border: '1px solid black' }}
              >
                <div
                  onClick={onClickCommentReplyRemove}
                  style={{ color: 'red' }}
                >
                  <p>삭제</p>
                </div>
                <div onClick={onClickOptionClose}>
                  <p>취소</p>
                </div>
              </div>
            </div>
          ) : (
            <div className={style.buttonWrap} onClick={onClickOptionClose}>
              <div
                className={style.optionButton}
                style={{ border: '1px solid black' }}
              >
                <div style={{ color: 'red' }} onClick={Declaration}>
                  <p>신고</p>
                </div>
                <div onClick={onClickOptionClose}>
                  <p>취소</p>
                </div>
              </div>
            </div>
          )}
        </span>
      )}
    </>
  );
};

CommentOptionBtn.propTypes = {
  postComments: PropTypes.shape({
    commentId: PropTypes.number,
    User: PropTypes.objectOf(PropTypes.string),
    content: PropTypes.string,
    date: PropTypes.string,
    depth: PropTypes.number,
    // Comments: PropTypes.arrayOf(null),
  }).isRequired,
};

export default CommentOptionBtn;
