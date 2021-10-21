import React, { useEffect, useCallback, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { ADD_COMMENT_REQUEST } from '../../reducers/post';

import style from '../../styles/css/dynamicComment.module.css';
import useInput from '../../hooks/useInput';
import Router from 'next/router';
import Comment from './Comment';

const MobileComment = ({ post }) => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const { addCommentDone } = useSelector((state) => state.post);
  const { commentToReply } = useSelector((state) => state.menu);

  const [comment, onChangeInput, setComment] = useInput('');

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
          commentId:
            post.Comments[post.Comments.length - 1]?.commentId + 1 || 1,
          User: {
            id: me.id,
            nickname: me.nickname,
          },
          content: comment,
          Comments: [],
          // bo_no : post.id
          // mem_no: me.id,
          // cmt_content: comment,
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
          <img src="/icon/back.svg" width="12px" />
        </div>
        <div>댓글</div>
      </div>

      <div>
        <div className={style.mContent}>
          <div className={style.userNickname}>
            <div className={style.userIcon}>{post?.User.nickname[0]}</div>
            <p>{post?.User.nickname}</p>
          </div>
          <div className={style.postContent}>{post?.content}</div>
          <div className={style.time}>시간</div>
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
              // placeholder="댓글달기..."
              placeholder={`댓글달기..`}
              autoComplete="off"
              autoCorrect="off"
              maxLength="140"
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

MobileComment.propTypes = {
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

export default MobileComment;
