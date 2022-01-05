import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import style from '../../styles/css/dynamicComment.module.css';
import useinput from '../../hooks/useinput';

import CommentOptionBtn from './CommentOptionBtn';
import { baseURL } from '../../config/config';
import { timeCalculator } from '../../hooks/timer/timeCalculator';

const CommentsToReply = ({ postComments }) => {
  const [reply, , setReply] = useinput(true);

  const onClickReply = useCallback(() => {
    setReply((prev) => !prev);
  }, [reply]);

  return (
    <>
      {!postComments ? null : reply ? (
        <button
          className={style.commentsMore}
          type="button"
          onClick={onClickReply}
        >
          <span />
          <p>답글 보기({postComments.length}개)</p>
        </button>
      ) : (
        <button
          className={style.commentsMore}
          type="button"
          onClick={onClickReply}
        >
          <span />
          <p>답글 숨기기</p>
        </button>
      )}

      {!reply && (
        <ul className={style.reply}>
          {postComments.map((comment) => {
            return (
              <li key={comment.date}>
                <div>
                  <div className={style.userIcon}>
                    {comment.User.profileImg ? (
                      <img
                        src={`${baseURL}/${comment.User.profileImg}`}
                        alt="profileImg"
                      />
                    ) : (
                      <img src="/icon/profileBasic.svg" alt="profileImg" />
                    )}
                  </div>
                </div>

                <div className={style.contentInComment}>
                  <span>{comment.User.nickname}</span>
                  <span>{comment.content}</span>
                  <CommentOptionBtn postComments={comment} bool={false} />

                  <div className={style.timeAndReply}>
                    {timeCalculator(comment)}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
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
