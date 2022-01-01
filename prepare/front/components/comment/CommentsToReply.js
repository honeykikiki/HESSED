import React, { useRef, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';
import style from '../../styles/css/dynamicComment.module.css';
import useinput from '../../hooks/useinput';

import { ADD_COMMENT_REPLY_REQUEST } from '../../reducers/postMainAction';
import { COMMENT_TO_REPLY_CLOSE } from '../../reducers/menu';

import CommentOptionBtn from './CommentOptionBtn';
import { baseURL } from '../../config/config';
import { timeCalculator } from '../../hooks/timer/timeCalculator';

const CommentsToReply = ({ postComments }) => {
  const dispatch = useDispatch();
  const { commentToReply } = useSelector((state) => state.menu);
  const { addCommentReplyDone } = useSelector((state) => state.postMainAction);

  const [reply, , setReply] = useinput(true);
  const [commentReply, onChangeInput, setCommentReply] = useinput('');

  const ref = useRef();
  const handleResizeHeight = useCallback(() => {
    if (ref === null || ref.current === null) {
      return;
    }
    ref.current.style.height = '20px';
    ref.current.style.height = `${ref.current.scrollHeight}px`;
  }, []); // 댓글창 크기 자동조절

  useEffect(() => {
    if (ref === null || ref.current === null) {
      return;
    }
    if (addCommentReplyDone) {
      setCommentReply('');
      dispatch({
        type: COMMENT_TO_REPLY_CLOSE,
      });
    }
  }, [addCommentReplyDone]);

  const onClickReply = useCallback(() => {
    setReply((prev) => !prev);
  }, [reply]);

  const onClickReplyClose = useCallback(() => {
    dispatch({
      type: COMMENT_TO_REPLY_CLOSE,
    });
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
      formDate.append('mem_nickname', postComments.User.nickname);

      dispatch({
        type: ADD_COMMENT_REPLY_REQUEST,
        data: formDate,
      });
    },
    [postComments, commentReply],
  );

  return (
    <>
      {!postComments ? null : reply ? (
        <button type="button" onClick={onClickReply}>
          <span />
          <p>답글 보기({postComments.Comments.length}개)</p>
        </button>
      ) : (
        <button type="button" onClick={onClickReply}>
          <span />
          <p>답글 숨기기</p>
        </button>
      )}

      {/* 댓글 더보기 컴포넌트 분리하기 */}
      <div>
        <div>
          {!reply && (
            <ul>
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
                  <span>{postComments.content}</span>
                  <span>
                    <CommentOptionBtn
                      postComments={postComments}
                      bool={false}
                    />
                  </span>
                  <div className={style.timeAndReply}>
                    {timeCalculator(postComments)}
                  </div>
                </div>
              </li>
            </ul>
          )}
        </div>

        {!commentToReply ? (
          <div className={style.form}>
            <div className={style.commentBox}>
              <div onClick={onClickReplyClose}>X</div>
              <p>{postComments.User.nickname} 님에게 답글 남기는 중</p>
            </div>
            <form>
              <textarea
                className={style.text}
                ref={ref}
                onInput={handleResizeHeight}
                placeholder="답글달기.."
                autoComplete="off"
                autoCorrect="off"
                value={commentReply}
                onChange={onChangeInput}
                required
              />
              <button onClick={onClickAddReply}>게시</button>
            </form>
          </div>
        ) : null}
      </div>
    </>
  );
};

CommentsToReply.proptypes = {
  postComments: PropTypes.shape({
    commentId: PropTypes.number,
    User: PropTypes.objectOf(PropTypes.string),
    content: PropTypes.string,
    date: PropTypes.string,
    depth: PropTypes.number,
    Comments: PropTypes.arrayOf,
  }).isRequired,
};

export default CommentsToReply;
