import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import { useDispatch, useSelector } from 'react-redux';
import style from '../../styles/css/postContent.module.css';
import { GET_GOOD_LIST_REQUEST } from '../../reducers/getIdPost';

const PostContent = ({ post }) => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.userInfo);
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

  const newDate = new Date();
  const newHours = newDate.getHours();
  const newDay = newDate.getDate();
  const newMinutes = newDate.getMinutes();

  const createAt = post.date.split(' ').slice(0, 1);
  const date = createAt[0].split('-');
  const Year = date[0];
  const Month = date[1];
  const Day = date[2];

  const createAtTime = post.date.split(' ').slice(1, 2);
  const time = createAtTime[0].split(':');
  const hour = Number(time[0]);
  const minutes = Number(time[1]);

  return (
    <article className={style.art}>
      {post.likedNumber === 0 ? null : (
        <Link href={`/post/${post.id}/goodList`}>
          <a>
            <div onClick={getGoodList}>
              {`좋아요 ${post.likedNumber}개`}
              {post.likedNumber === 1 ? (
                <em>
                  {!post.likeMember
                    ? ` ${me?.nickname}님 이 좋아합니다`
                    : ` ${post.likeMember}님 이 좋아합니다`}
                </em>
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
        <span className={style.usernickname}>{`${post.User.nickname} `}</span>
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
          {post.Comments.length > 0 ? (
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
        {newDay !== Number(Day) ? (
          // 게시물 올린 날이 같은 날이면 시간을 보여주고 다른 날짜면 게시 날짜를 보여준다
          <p>{`20${Year}년 ${Month}월 ${Day}일`}</p>
        ) : newHours - hour <= 1 ? (
          // 게시물이 올린지 1시간이 넘어가면 시간단위로 보여주고 아니면 분으로 보여준다
          newHours + newMinutes > hour + minutes ? (
            // 올린시간 1시59분 지금시간 2시 1분 이라 가정할떄 60 < 3 false
            <p>{`${newHours - hour}시간 전`}</p>
          ) : newMinutes >= minutes ? (
            // 게시물 올린시간보다 지금시간이 작으면 올린시간 - 지금시간 아니면 60 - 올린시간  + 지금시간
            <p>{`${newMinutes - minutes}분 전`}</p>
          ) : (
            <p>{`${60 - minutes + newMinutes}분 전`}</p>
          )
        ) : (
          <p>{`${newHours - hour}시간 전`}</p>
        )}
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
