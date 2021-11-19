import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';

import { useDispatch, useSelector } from 'react-redux';
import { COMMENT_TO_REPLY_OPEN } from '../../reducers/menu';
import { baseURL } from '../../config/config';

import style from '../../styles/css/dynamicComment.module.css';
import CommentsToReply from './CommentsToReply';
import CommentOptionBtn from './CommentOptionBtn';

const Comment = ({ post }) => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);

  const [userId, setUserId] = useState();
  const [nickname, setNickname] = useState();
  const [commentId, setCommentId] = useState();

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
    <div>
      {post?.Comments.map((v, i) => {
        return (
          <ul key={v.commentId}>
            <li>
              <div>
                <div
                  className={style.userIcon}
                  // style={{
                  //   background: `${baseURL}/${post.User.profileImg.url}`,
                  //   backgroundSize: 'contain',
                  // }}
                >
                  {v.User.nickname[0]}
                </div>
              </div>

              <div className={style.contentInComment}>
                <span>{v.User.nickname}</span>
                <span>{v.content}</span>
                {/* <span
                  style={{
                    backgroundImage: 'url(/icon/btn.svg)',
                    cursor: 'pointer',
                  }}
                >
                  <img />
                </span> */}
                <span onClick={onClickOption(v)}>
                  <CommentOptionBtn
                    post={v}
                    postId={post.id}
                    bool={true}
                    commentId={commentId}
                  />
                </span>
              </div>
            </li>

            <div className={style.timeAndReply}>
              <div>
                <p>시간</p>
              </div>
              <div>
                <button
                  style={{ marginTop: -20 }}
                  onClick={onClickPostUserInfo(v)}
                >
                  답글 달기
                </button>
              </div>
            </div>

            <li className={style.reply}>
              <CommentsToReply
                v={v}
                userId={userId}
                nickname={nickname}
                commentId={commentId}
                onClickOption={onClickOption}
                post={post}
              />
            </li>
          </ul>
        );
      })}
    </div>
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
