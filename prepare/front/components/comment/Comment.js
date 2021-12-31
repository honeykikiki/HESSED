import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';

import { useDispatch, useSelector } from 'react-redux';
import { COMMENT_TO_REPLY_OPEN } from '../../reducers/menu';
import { baseURL } from '../../config/config';

import style from '../../styles/css/dynamicComment.module.css';
import CommentsToReply from './CommentsToReply';
import CommentOptionBtn from './CommentOptionBtn';
import { timeCalculator } from '../../hooks/timer/timeCalculator';

const Comment = ({ post, postComments }) => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.userInfo);

  const [userId, setUserId] = useState();
  const [nickname, setNickname] = useState();
  const [commentId, setCommentId] = useState();
  const [commentBool] = useState(true);

  useEffect(() => {
    if (!me) {
      Router.push('/');
    }
  }, [me]);

  const onClickPostUserInfo = useCallback(
    (v) => () => {
      setUserId(v.User.id);
      setNickname(v.User.nickname);
      setCommentId(v.commentId);
      dispatch({
        type: COMMENT_TO_REPLY_OPEN,
      });
    },
    [],
  );
  const onClickOption = useCallback(
    (v) => () => {
      setCommentId(v.commentId);
    },
    [commentId],
  );

  return (
    <>
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

          {postComments.content.length > 20 ? (
            <span>{postComments.content}</span>
          ) : (
            <>
              <br />
              <span>{postComments.content}</span>
            </>
          )}
          {/* <span onClick={onClickOption(postComments)}>
            <CommentOptionBtn
              postComments={postComments}
              postId={post.id}
              commentId={commentId}
              bool={commentBool}
            />
          </span> */}
          <div className={style.timeAndReply}>
            <div>
              <p>{timeCalculator(postComments)}</p>
            </div>
            <div>
              {/* <button
                style={{ marginTop: -20 }}
                onClick={onClickPostUserInfo(postComments)}
              >
                답글 달기
              </button> */}
            </div>
          </div>
        </div>
      </li>

      {/* 여기서 답글 반복문 돌리기 */}

      {/* <li className={style.reply}>
        <CommentsToReply
          postComments={postComments}
          userId={userId}
          nickname={nickname}
          commentId={commentId}
          onClickOption={onClickOption}
          post={post}
        />
      </li> */}
    </>
  );
};

Comment.propTypes = {
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

export default Comment;
