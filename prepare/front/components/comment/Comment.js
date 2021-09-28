import React, { useState, useCallback, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import style from '../../styles/css/dynamicComment.module.css';
import useInput from '../../hooks/useInput';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import {
  COMMENT_TO_REPLY_CLOSE,
  COMMENT_TO_REPLY_OPEN,
} from '../../reducers/menu';
import { ADD_COMMENT_REPLY_REQUEST } from '../../reducers/post';

const Comment = ({ mainPosts, id }) => {
  const dispatch = useDispatch();
  const { commentToReply } = useSelector((state) => state.menu);
  const { me } = useSelector((state) => state.user);
  const { addCommentReplyDone } = useSelector((state) => state.post);

  const [reply, onChangereply, setReply] = useInput(true);
  const [userId, setUserId] = useState(null);
  const [nickname, setNickname] = useState(null);

  const [commentReply, onChangeInput, setCommentReply] = useInput('');

  const ref = useRef();
  const handleResizeHeight = useCallback(() => {
    if (ref === null || ref.current === null) {
      return;
    }
    ref.current.style.height = '20px';
    ref.current.style.height = ref.current.scrollHeight + 'px';
  }, []); //댓글창 크기 자동조절

  const onClickReply = useCallback(() => {
    setReply((prev) => !prev);
  }, [reply]);

  const onClick = useCallback(
    (v) => () => {
      setUserId(v.id);
      setNickname(v.nickname);
      dispatch({
        type: COMMENT_TO_REPLY_OPEN,
      });
    },
    [userId, nickname],
  );

  const onClickReplyClose = useCallback(
    (data) => {
      dispatch({
        type: COMMENT_TO_REPLY_CLOSE,
        data,
      });
    },
    [commentToReply],
  );

  useEffect(() => {
    if (addCommentReplyDone) {
      setCommentReply('');
      ref.current.style.height = '20px';
    }
  }, [addCommentReplyDone]);

  const onClickAddReply = useCallback(
    (e) => {
      e.preventDefault();
      if (!commentReply) {
        return alert('댓글을 작성해주세요');
      }

      dispatch({
        type: ADD_COMMENT_REPLY_REQUEST,
        data: {
          content: commentReply,
          postId: Number(id),
          userId: userId,
          User: {
            id: me.id,
            nickname: me.nickname,
          },
        },
      });
    },
    [commentReply, userId],
  );

  return (
    <div>
      {mainPosts?.Comments.map((v, i) => {
        return (
          <ul key={v.id}>
            <li>
              <div>
                <div
                  className={style.userIcon}
                  // style={{
                  //   background: 'url(/icon/profle_img.png) ',
                  //   backgroundSize: 'contain',
                  // }}
                >
                  {v.User.nickname[0]}
                </div>
              </div>

              <div className={style.contentInComment}>
                <span>{v.User.nickname}</span>
                <span>{v.content}</span>
              </div>
            </li>

            <div className={style.timeAndReply}>
              <div>
                <p>시간</p>
              </div>
              <div>
                <button style={{ marginTop: -20 }} onClick={onClick(v.User)}>
                  답글 달기
                </button>
              </div>
            </div>
            {/* {console.log(v)}
            {console.log(Boolean(v.Comments[0]?.content))}
            {console.log(v.Comments)} */}
            <li className={style.reply}>
              {!v.Comments[i]?.content ? null : reply ? (
                <button onClick={onClickReply}>
                  <span></span>
                  <p>답글 보기({v.Comments.length}개)</p>
                </button>
              ) : (
                <button onClick={onClickReply}>
                  <span></span>
                  <p>답글 숨기기</p>
                </button>
              )}
              {/* 댓글 더보기 컴포넌트 분리하기 */}
              <div>
                {!reply ? (
                  <div>
                    {v.Comments &&
                      v.Comments.map((v, i) => {
                        return (
                          <ul>
                            <li>
                              <div>
                                <div
                                  className={style.userIcon}
                                  // style={{
                                  //   background: 'url(/icon/profle_img.png) ',
                                  //   backgroundSize: 'contain',
                                  // }}
                                >
                                  {v.User.nickname[0]}
                                </div>
                              </div>

                              <div className={style.contentInComment}>
                                <span>{v.User.nickname}</span>
                                <span>{v.content}</span>
                              </div>
                            </li>
                          </ul>
                        );
                      })}
                  </div>
                ) : null}

                {!commentToReply ? (
                  <div className={style.form}>
                    <div className={style.commentBox}>
                      <div onClick={onClickReplyClose}>X</div>
                      <p>{nickname} 님에게 답글 남기는 중</p>
                    </div>
                    <form>
                      <textarea
                        className={style.text}
                        ref={ref}
                        onInput={handleResizeHeight}
                        placeholder={`답글달기..`}
                        autoComplete="off"
                        autoCorrect="off"
                        maxLength="140"
                        value={commentReply}
                        onChange={onChangeInput}
                        required
                      ></textarea>
                      <button onClick={onClickAddReply}>게시</button>
                    </form>
                  </div>
                ) : null}
              </div>
            </li>
          </ul>
        );
      })}
    </div>
  );
};

export default Comment;
