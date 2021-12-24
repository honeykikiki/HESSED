import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import style from '../../styles/css/postContent.module.css';

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

  const createAt = post.date.split(' ').slice(0, 1);
  const date = createAt[0].split('-');
  const Year = date[0];
  const Month = date[1];
  const Day = date[2];

  return (
    <article className={style.art}>
      <div>
        {`좋아요 ${post.likedNumber}개`}
        {/* {post.Likers.length > 0 && `좋아요 ${post.Likers.length || 0}개`} */}
      </div>
      <div className={style.content}>
        <p>{`${post.User.nickname}`}</p>
        <span>{`${post.content?.slice(0, more)} `}</span>

        {post.content.length < 20 ? null : moreButtonOnClick ? (
          <button onClick={contentMore}>... 더보기</button>
        ) : (
          <button onClick={contentbrief}>간략하게보기</button>
        )}
      </div>
      {post?.Comments?.length > 2 && (
        <Link href={`/${post.id}/comment`}>
          <a>
            <p className={style.commentMore}>
              {post.Comments.length}개의 댓글 모두보기
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
        <p>{`${Year}년 ${Month}월 ${Day}일`}</p>
      </div>
    </article>
  );
};

PostContent.propTypes = {
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
export default PostContent;
