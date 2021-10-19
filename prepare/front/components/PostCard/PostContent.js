import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import style from '../../styles/css/postContent.module.css';
import useInput from '../../hooks/useInput';

const PostContent = ({ post }) => {
  const [more, setMore] = useState(20);
  const [moreButtonOnClick, setMoreButtonOnClick] = useState(true);

  const contentMore = useCallback(() => {
    setMore(post.content.length);
    setMoreButtonOnClick((prev) => !prev);
  }, [more, moreButtonOnClick]);
  const contentbrief = useCallback(() => {
    setMore(20);
    setMoreButtonOnClick((prev) => !prev);
  }, [more, moreButtonOnClick]);

  return (
    <article className={style.art}>
      <div>
        {post.Likers.length > 0 && `좋아요 ${post.Likers.length || 0}개`}
      </div>
      <div className={style.content}>
        <p>{`${post.User.nickname}`}</p>
        {/* <p>{`${post.MEN_NICKNAME}`}</p> */}
        <span>{`${post.content?.slice(0, more)} `}</span>
        {/* <span>{`${post.BO_CONTENT?.slice(0, more)} `}</span> */}
        {/* <span>
          {post.content.split(/(#[^\s#]+)/g).map((v, i) => {
            if (v.match(/(#[^\s#]+)/g)) {
              return (
                <Link href={`/hashtag/${v.slice(1)}`} key={i}>
                  <a style={{ color: '#00376b' }}>{v}</a>
                </Link>
              );
            }
            return v.slice(0, more);
          })}
        </span> */}
        {post.content.length < 20 ? null : moreButtonOnClick ? (
          <button onClick={contentMore}>... 더보기</button>
        ) : (
          <button onClick={contentbrief}>간략하게보기</button>
        )}
        {/* {post.BO_CONTENT.length < 20 ? null : moreButtonOnClick ? (
          <button onClick={contentMore}>... 더보기</button>
        ) : (
          <button onClick={contentbrief}>간략하게보기</button>
        )} */}
      </div>
      {post?.Comments?.length > 2 && (
        // {post?.BO_COMMENTS?.length > 2 && (
        <Link href={`/${post.id}/comment`}>
          {/* <Link href={`/${post.BO_ID}/comment`}> */}
          <a>
            <p className={style.commentMore}>
              {post.Comments.length}개의 댓글 모두보기
              {/* {post?.BO_COMMENTS?.length}개의 댓글 모두보기 */}
            </p>
          </a>
        </Link>
      )}
      <div>
        <div>
          {post.Comments ? (
            <div className={style.comment}>
              <div>
                <span>{`${post.Comments[0]?.User?.nickname ?? ''}`}</span>
                <span>{`${post.Comments[0]?.content ?? ''}`}</span>
                {/* <span>{`${post.BO_COMMENTS[0]?.MEN_NICKNAME ?? ''}`}</span>
                <span>{`${post.BO_COMMENTS[0]?.content ?? ''}`}</span> */}
              </div>
              <div>
                <span>{`${post?.Comments[1]?.User?.nickname ?? ''}  `}</span>
                <span>{`${post?.Comments[1]?.content ?? ''} `}</span>
              </div>
            </div>
          ) : null}
        </div>
      </div>
      <div>
        <p>{`2020년 07월 08일`}</p>
        {/* <p>{`${BO_DATE}`}</p> */}
      </div>
    </article>
  );
};

PostContent.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    User: PropTypes.object,
    content: PropTypes.string,
    createdAt: PropTypes.string,
    Comments: PropTypes.arrayOf(PropTypes.object),
    Images: PropTypes.arrayOf(PropTypes.object),
    Likers: PropTypes.arrayOf(PropTypes.object),
    Retweet: PropTypes.objectOf(PropTypes.any),
  }).isRequired,
};
export default PostContent;
