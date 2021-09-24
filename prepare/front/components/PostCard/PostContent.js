import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';

import style from '../../styles/css/postContent.module.css';
import useInput from '../../hooks/useInput';

const PostContent = ({ post }) => {
  const [more, setMore] = useState(50);
  const [moreButtonOnClick, setMoreButtonOnClick] = useState(true);

  const contentMore = useCallback(() => {
    setMore(post.content.length);
    setMoreButtonOnClick((prev) => !prev);
  }, [more, moreButtonOnClick]);
  const contentbrief = useCallback(() => {
    setMore(50);
    setMoreButtonOnClick((prev) => !prev);
  }, [more, moreButtonOnClick]);

  return (
    <article className={style.art}>
      <div>{`좋아요 0개`}</div>
      <div className={style.content}>
        <p>{`${post.User.nickname}`}</p>
        <span>{`${post.content.slice(0, more)} `}</span>
        {moreButtonOnClick ? (
          <button onClick={contentMore}>... 더보기</button>
        ) : (
          <button onClick={contentbrief}>간략하게보기</button>
        )}
      </div>
      {post.Comments.length > 2 && (
        <p className={style.commentMore}>
          {post.Comments.length}개의 댓글 모두보기
        </p>
      )}
      <div>
        <p>
          {post.Comments ? (
            <div className={style.comment}>
              <div>
                <span>{`${post.Comments[0]?.User?.nickname}`}</span>
                <span>{`${post.Comments[0].content}`}</span>
              </div>
              <div>
                <span>{`${post.Comments[1]?.User?.nickname ?? ''}  `}</span>
                <span>{`${post.Comments[1]?.content ?? ''} `}</span>
              </div>
            </div>
          ) : null}
        </p>
      </div>
      <div>
        <p>{`2020년 07월 08일`}</p>
      </div>
    </article>
  );
};

PostContent.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string,
    user: PropTypes.object,
    content: PropTypes.string,
    createdAt: PropTypes.string,
    comments: PropTypes.arrayOf(PropTypes.object),
    Images: PropTypes.arrayOf(PropTypes.object),
    Likers: PropTypes.arrayOf(PropTypes.object),
    Retweet: PropTypes.objectOf(PropTypes.any),
  }).isRequired,
};
export default PostContent;
