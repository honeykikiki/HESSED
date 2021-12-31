import React, { useEffect, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Router from 'next/router';

import {
  ADD_COMMENT_REQUEST,
  LOAD_COMMENT_REQUEST,
} from '../../reducers/postMainAction';

import style from '../../styles/css/dynamicComment.module.css';

import useinput from '../../hooks/useinput';
import Comment from './Comment';
import { baseURL } from '../../config/config';
import { timeCalculator } from '../../hooks/timer/timeCalculator';

const PostInContent = ({ post }) => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.userInfo);
  const { addCommentDone } = useSelector((state) => state.postMainAction);
  const { commentToReply } = useSelector((state) => state.menu);
  const { postComments } = useSelector((state) => state.postMainAction);

  const [comment, onChangeInput, setComment] = useinput('');

  const ref = useRef();
  const handleResizeHeight = useCallback(() => {
    if (ref === null || ref.current === null) {
      return;
    }
    ref.current.style.height = '20px';
    ref.current.style.height = `${ref.current.scrollHeight}px`;
  }, []); // 댓글창 크기 자동조절

  useEffect(() => {
    if (!me) {
      Router.push('/');
    }
    if (addCommentDone) {
      const formData = new FormData();
      formData.append('bo_no', post.id);
      dispatch({
        type: LOAD_COMMENT_REQUEST,
        data: formData,
      });
    }
  }, [addCommentDone, me, post]);

  const commentPost = useCallback(
    (e) => {
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
      ref.current.style.height = '20px';
      setComment('');
    },
    [comment, post, me],
  );

  const onClickBack = useCallback(() => {
    Router.back();
  }, []);

  console.log(postComments);

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
                <img
                  src={`${baseURL}${post.User.profileImg}`}
                  alt="profileImg"
                />
              ) : (
                <img src="/icon/profileBasic.svg" alt="profileImg" />
              )}
            </div>

            <p>{post?.User.nickname}</p>
          </div>

          <div className={style.postContent}>
            {post.content.split('\n').map((v) => {
              return (
                <span key={v}>
                  {v}
                  <br />
                </span>
              );
            })}
          </div>

          <div className={style.time}>
            <div>{timeCalculator(post)}</div>
          </div>
        </div>
        <div className={style.postComment}>
          {postComments.map((v) => {
            return (
              <ul>
                <Comment post={post} postComments={v} />
              </ul>
            );
          })}
          {/* {postComments
            ? 
            : null} */}
        </div>
      </div>

      {commentToReply ? (
        <div className={style.form}>
          <form>
            <textarea
              className={style.text}
              ref={ref}
              onInput={handleResizeHeight}
              placeholder="댓글달기.."
              autoComplete="off"
              autoCorrect="off"
              value={comment}
              onChange={onChangeInput}
              required
            />
            <button onClick={commentPost}>게시</button>
          </form>
        </div>
      ) : null}
    </div>
  );
};

PostInContent.propTypes = {
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

export default PostInContent;
