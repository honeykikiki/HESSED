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

const Comment = ({ postComments }) => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.userInfo);

  const [commentBool] = useState(true);

  useEffect(() => {
    if (!me) {
      Router.push('/');
    }
  }, [me]);

  const onClickPostUserInfo = useCallback(() => {
    dispatch({
      type: COMMENT_TO_REPLY_OPEN,
    });
  }, []);

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

            {/* <span>
              <CommentOptionBtn
                postComments={postComments}
                bool={commentBool}
              />
            </span> */}

            <div className={style.timeAndReply}>
              <div>{timeCalculator(postComments)}</div>
              <div>
                {/* <button
                  style={{ marginTop: -20 }}
                  onClick={onClickPostUserInfo}
                >
                  답글 달기
                </button> */}
              </div>
            </div>
          </div>
        </li>
      ) : (
        // <li className={style.reply}>
        //   <CommentsToReply postComments={postComments} />
        // </li>
        <div />
      )}
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
