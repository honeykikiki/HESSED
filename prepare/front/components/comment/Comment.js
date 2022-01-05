import React, { useState, useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';

import { useDispatch, useSelector } from 'react-redux';

import { baseURL } from '../../config/config';

import useinput from '../../hooks/useinput';
import style from '../../styles/css/dynamicComment.module.css';
import CommentsToReply from './CommentsToReply';
import CommentOptionBtn from './CommentOptionBtn';
import { timeCalculator } from '../../hooks/timer/timeCalculator';
import { ADD_COMMENT_REPLY_REQUEST } from '../../reducers/postMainAction';

const Comment = ({ postComments }) => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.userInfo);
  const { addCommentReplyDone } = useSelector((state) => state.postMainAction);

  const [commentBool] = useState(true);

  const [commentReply, onChangeInput, setCommentReply] = useinput('');
  const [commentToReply, setcommentToReply] = useState(true);

  const ref = useRef();
  const handleResizeHeight = useCallback(() => {
    if (ref === null || ref.current === null) {
      return;
    }
    ref.current.style.height = '20px';
    ref.current.style.height = `${ref.current.scrollHeight}px`;
  }, []); // 댓글창 크기 자동조절

  useEffect(() => {
    // if (ref === null || ref.current === null) {
    //   return;
    // }
    if (!me) {
      Router.push('/');
    }
    // if (addCommentReplyDone) {
    //   setCommentReply('');
    //   dispatch({
    //     type: COMMENT_TO_REPLY_CLOSE,
    //   });
    // }
  }, [me, addCommentReplyDone]);

  const onClickPostUserInfo = useCallback(() => {
    setcommentToReply((prev) => !prev);
  }, [commentToReply]);

  const onClickReplyClose = useCallback(() => {
    setcommentToReply((prev) => !prev);
  }, [commentToReply]);

  const onClickAddReply = useCallback(
    (e) => {
      e.preventDefault();
      if (!commentReply) {
        return alert('댓글을 작성해주세요');
      }

      const formDate = new FormData();
      formDate.append('bo_no', postComments.postId);
      formDate.append('cmt_no', postComments.commentId);
      formDate.append('cmt_content', commentReply);
      formDate.append('mem_nickname', me.nickname);
      dispatch({
        type: ADD_COMMENT_REPLY_REQUEST,
        data: formDate,
      });
    },
    [postComments.commentId, commentReply, me],
  );

  return (
    <>
      {postComments.depth === 0 ? (
        <li>
          <div>
            <div className={style.userIcon}>
              {postComments.User.profileImg ? (
                <img
                  src={`${baseURL}/${postComments.User.profileImg}`}
                  alt="profileImg"
                />
              ) : (
                <img src="/icon/profileBasic.svg" alt="profileImg" />
              )}
            </div>
          </div>

          <div className={style.contentInComment}>
            <span>{postComments.User.nickname}</span>
            {postComments.content.length < 20 ? (
              <span>{postComments.content}</span>
            ) : (
              <>
                <br />
                <span>{postComments.content}</span>
              </>
            )}
            <CommentOptionBtn postComments={postComments} bool={commentBool} />

            <div className={style.timeAndReply}>
              <div>{timeCalculator(postComments)}</div>
              <div>
                <button onClick={onClickPostUserInfo}>답글 달기</button>
              </div>
            </div>
            {postComments.Comments.length > 0 && (
              <CommentsToReply postComments={postComments.Comments} />
            )}
          </div>
        </li>
      ) : null}

      {!commentToReply ? (
        <div className={style.Replyform}>
          <div className={style.commentBox}>
            <div onClick={onClickReplyClose}>X</div>
            <p>{postComments.User.nickname} 님에게 답글 남기는 중</p>
          </div>
          <form>
            <input
              type="text"
              className={style.text}
              ref={ref}
              defaultValue={postComments.User.nickname}
              // placeholder={`${postComments.User.nickname} 님에게 답글달기..`}
              value={commentReply}
              onInput={handleResizeHeight}
              onChange={onChangeInput}
              // eslint-disable-next-line react/jsx-no-duplicate-props

              required
            />
            <button onClick={onClickAddReply}>게시</button>
          </form>
        </div>
      ) : null}
    </>
  );
};

Comment.propTypes = {
  postComments: PropTypes.shape({
    commentId: PropTypes.number,
    User: PropTypes.objectOf(PropTypes.string),
    content: PropTypes.string,
    date: PropTypes.string,
    depth: PropTypes.number,
    // Comments: PropTypes.arrayOf,
  }).isRequired,
};

export default Comment;
