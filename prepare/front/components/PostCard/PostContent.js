import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import { useDispatch, useSelector } from 'react-redux';
import style from '../../styles/css/postContent.module.css';
import { GET_GOOD_LIST_REQUEST } from '../../reducers/getIdPost';
import { LOAD_COMMENT_REQUEST } from '../../reducers/postMainAction';
import { timeCalculator } from '../../hooks/timer/timeCalculator';

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

  const loadPostRequest = useCallback(() => {
    const formData = new FormData();
    formData.append('bo_no', post.id);
    dispatch({
      type: LOAD_COMMENT_REQUEST,
      data: formData,
    });
  }, [post]);

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
            <br />
            <Link href={`/${post.id}/comment`}>
              <a>
                {post.content.split('\n').map((v) => {
                  return (
                    <span key={v}>
                      {v}
                      <br />
                    </span>
                  );
                })}
              </a>
            </Link>
          </span>
        )}

        {post.content.length < 20 ? null : moreButtonOnClick ? (
          <button onClick={contentMore}>... 더보기</button>
        ) : null}
      </div>

      <Link href={`/${post.id}/comment`}>
        <a>
          <p className={style.commentMore} onClick={loadPostRequest}>
            {post.Comments.length >= 2
              ? `${post.Comments.length}개의댓글 모두보기`
              : null}
          </p>
        </a>
      </Link>

      <div>
        <div>
          {post.Comments.length > 0 ? (
            <Link href={`/${post.id}/comment`}>
              <a>
                <div className={style.comment}>
                  {post.Comments[0] ? (
                    <div>
                      <span>{`${post.Comments[0]?.mem_nickname}`}</span>
                      <span>{`${post.Comments[0]?.cmt_content}`}</span>
                    </div>
                  ) : null}
                  {post.Comments[1] ? (
                    <div>
                      <span>{`${post.Comments[1]?.mem_nickname}`}</span>
                      <span>{`${post.Comments[1]?.cmt_content}`}</span>
                    </div>
                  ) : null}
                  {/* {post.Comments[2] ? (
                    <div>
                      <span>{`${post.Comments[2]?.nickname}`}</span>
                      <span>{`${post.Comments[2]?.comment}`}</span>
                    </div>
                  ) : null} */}
                </div>
              </a>
            </Link>
          ) : null}
        </div>
      </div>
      <div className={style.timeCalculator}>{timeCalculator(post)}</div>
    </article>
  );
};

PostContent.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    user: PropTypes.object,
    content: PropTypes.string,
    data: PropTypes.string,
    Comments: PropTypes.arrayOf(PropTypes.object),
    Images: PropTypes.arrayOf(PropTypes.object),
    Likers: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};
export default PostContent;
