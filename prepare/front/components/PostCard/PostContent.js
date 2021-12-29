import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import { useDispatch } from 'react-redux';
import style from '../../styles/css/postContent.module.css';
import { GET_GOOD_LIST_REQUEST } from '../../reducers/getIdPost';

const PostContent = ({ post }) => {
  const dispatch = useDispatch();
  const [more, setMore] = useState(20);
  const [moreButtonOnClick, setMoreButtonOnClick] = useState(true);

  const contentMore = useCallback(() => {
    setMore(post.content.length);
    setMoreButtonOnClick((prev) => !prev);
  }, [more, moreButtonOnClick]);

  const getGoodList = useCallback(() => {
    dispatch({
      type: GET_GOOD_LIST_REQUEST,
      data: { postId: post.id },
    });
  }, [post]);

  // const contentbrief = useCallback(() => {
  //   setMore(20);
  //   setMoreButtonOnClick((prev) => !prev);
  // }, [more, moreButtonOnClick]);

  const createAt = post.date.split(' ').slice(0, 1);
  const date = createAt[0].split('-');
  const Year = date[0];
  const Month = date[1];
  const Day = date[2];

  return (
    <article className={style.art}>
      {post.likedNumber === 0 ? null : (
        <Link href={`/post/${post.id}/goodList`}>
          <a>
            <div onClick={getGoodList}>
              {`좋아요 ${post.likedNumber}개`}
              {post.likedNumber === 1 ? (
                <em>{` ${post.likeMember}님 이 좋아합니다`}</em>
              ) : (
                <em>{` ${post.likeMember}님 외 ${
                  post.likedNumber - 1
                }명 이 좋아합니다`}</em>
              )}
            </div>
          </a>
        </Link>
      )}

      <div className={style.content}>
        <p>{`${post.User.nickname}`}</p>
        {more < 21 ? (
          <span onClick={contentMore}>
            {`${post.content?.slice(0, more)} `}
          </span>
        ) : (
          <span>
            {post.content.split('\n').map((v) => {
              return (
                <span key={v}>
                  {v}
                  <br />
                </span>
              );
            })}
          </span>
        )}

        {post.content.length < 20 ? null : moreButtonOnClick ? (
          <button onClick={contentMore}>... 더보기</button>
        ) : null}
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
