import React, { useEffect, useCallback, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Router from 'next/router';

import { ADD_COMMENT_REQUEST } from '../../reducers/post';

import style from '../../styles/css/dynamicComment.module.css';
import useInput from '../../hooks/useInput';
import Comment from './Comment';

const PostInComment = ({ post }) => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const { addCommentDone } = useSelector((state) => state.post);
  const { commentToReply } = useSelector((state) => state.menu);

  const [comment, onChangeInput, setComment] = useInput('');

  const createAt = post.date.split(' ').slice(0, 1);
  const date = createAt[0].split('-');
  const Year = date[0];
  const Month = date[1];
  const Day = date[2];

  const ref = useRef();
  const handleResizeHeight = useCallback(() => {
    if (ref === null || ref.current === null) {
      return;
    }
    ref.current.style.height = '20px';
    ref.current.style.height = ref.current.scrollHeight + 'px';
  }, []); //댓글창 크기 자동조절

  // useEffect(() => {
  //   if (me) {
  //     return;
  //   }
  //   Router.push('/');
  // }, []); //로그인 안되있을떄 뒤로 보내기

  useEffect(() => {
    if (addCommentDone) {
      setComment('');
      // ref.current.style.height = '20px';
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
          postId: post.id,
          User: {
            id: me.id,
            nickname: me.nickname,
          },
          content: comment,
        },
      });
    },
    [comment, post, me],
  );

  const onClickBack = useCallback(() => {
    Router.back();
  }, []);

  return (
    <div className={style.mComment}>
      <div className={style.head}>
        <div onClick={onClickBack}>
          <img src="/icon/back.svg" width="12px" alt="backIcon" />
        </div>
        <div>댓글</div>
      </div>

      <div>
        <div className={style.mContent}>
          <div className={style.userNickname}>
            <div className={style.userIcon}>
              {post.User.profileImg ? (
                <img src={post.User.profileImg.url} alt="profileImg" />
              ) : (
                <img src="/icon/profileBasic.svg" alt="profileImg" />
              )}
            </div>

            <p>{post?.User.nickname}</p>
          </div>

          <div className={style.postContent}>{post?.content}</div>

          <div className={style.time}>{`${Year}년 ${Month}월 ${Day}일`}</div>
        </div>
        <div className={style.postComment}>
          <Comment post={post} />
        </div>
      </div>

      {commentToReply ? (
        <div className={style.form}>
          <form>
            <textarea
              className={style.text}
              ref={ref}
              onInput={handleResizeHeight}
              placeholder={`댓글달기..`}
              autoComplete="off"
              autoCorrect="off"
              value={comment}
              onChange={onChangeInput}
              required
            ></textarea>
            {true}
            <button onClick={commentPost}>게시</button>
          </form>
        </div>
      ) : null}
    </div>
  );
};

PostInComment.propTypes = {
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

export default PostInComment;
