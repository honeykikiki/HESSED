import React, { useCallback } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

import style from '../../styles/css/postIcon.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { LIKE_POST_REQUEST, UNLIKE_POST_REQUEST } from '../../reducers/post';
import { SAVE_POST_REQUEST, UNSAVE_POST_REQUEST } from '../../reducers/user';

const PostIcon = ({ post }) => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const liked = post.Likers?.find((v) => v.id === me.id);
  const saved = me?.Saved.find((v) => v.id === post.id);

  const onLike = useCallback(() => {
    dispatch({
      type: LIKE_POST_REQUEST,
      data: {
        postId: post.id,
        userId: me.id,
      },
      // data: {
      //   bo_no: post.BO_NO,
      //   mem_id: me.MEN_ID,
      // },
    });
  }, [post.id, me.id]);
  const onUnLike = useCallback(() => {
    dispatch({
      type: UNLIKE_POST_REQUEST,
      data: {
        postId: post.id,
        userId: me.id,
      },
      // data: {
      //   bo_no: post.BO_NO,
      //   mem_id: me.MEN_ID,
      // },
    });
  }, []);

  const onSave = useCallback(() => {
    dispatch({
      type: SAVE_POST_REQUEST,
      data: {
        postId: post.id,
        userId: me.id,
      },
      // data: {
      //   bo_no: post.BO_NO,
      //   mem_id: me.MEN_ID,
      // },
    });
  }, []);

  const onUnSave = useCallback(() => {
    dispatch({
      type: UNSAVE_POST_REQUEST,
      data: {
        postId: post.id,
        userId: me.id,
      },
      // data: {
      //   bo_no: post.BO_NO,
      //   mem_id: me.MEN_ID,
      // },
    });
  }, []);

  const onShare = useCallback(() => {}, []);
  return (
    <article className={style.postIcon}>
      <div>
        {/* 좋아요 */}
        {liked ? (
          <div onClick={onUnLike}>
            <img src="/icon/heartOn.svg" />
          </div>
        ) : (
          <div onClick={onLike}>
            <img src="/icon/heartOff.svg" />
          </div>
        )}
      </div>
      <div>
        {/* 댓글 */}
        <Link href={`/${post.id}/comment`}>
          <a>
            <div>
              <img src="/icon/comment.svg" />
            </div>
          </a>
        </Link>
      </div>
      <div>
        {/* 공유 */}
        <img src="/icon/share.svg" onClick={onShare} />
      </div>
      <div>
        {/* 저장 */}
        {saved ? (
          <div onClick={onUnSave}>
            <img src="/icon/saveOn.svg" />
          </div>
        ) : (
          <div onClick={onSave}>
            <img src="/icon/saveOff.svg" />
          </div>
        )}
      </div>
    </article>
  );
};

PostIcon.propTypes = {
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

export default PostIcon;
