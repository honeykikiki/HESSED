import React, { useCallback, useState } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import Image from 'next/image';

import { useDispatch, useSelector } from 'react-redux';
import style from '../../styles/css/postIcon.module.css';
import {
  LIKE_POST_REQUEST,
  SAVE_POST_REQUEST,
  UNLIKE_POST_REQUEST,
  UNSAVE_POST_REQUEST,
} from '../../reducers/postMainAction';

const PostIcon = ({ post }) => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.userInfo);

  const [url, setUrl] = useState();

  const onLike = useCallback(() => {
    dispatch({
      type: LIKE_POST_REQUEST,
      data: {
        bo_no: post.id,
        mem_id: me?.id,
      },
    });
  }, [post.id, me?.id]);
  const onUnLike = useCallback(() => {
    dispatch({
      type: UNLIKE_POST_REQUEST,
      data: {
        bo_no: post.id,
        mem_id: me?.id,
      },
    });
  }, [post.id, me?.id]);

  const onSave = useCallback(() => {
    dispatch({
      type: SAVE_POST_REQUEST,
      data: {
        bo_no: post.id,
        mem_id: me?.id,
      },
    });
  }, [post.id, me?.id]);
  const onUnSave = useCallback(() => {
    dispatch({
      type: UNSAVE_POST_REQUEST,
      data: {
        bo_no: post.id,
        mem_id: me?.id,
      },
    });
  }, [post.id, me?.id]);

  // const handleCopyClipBoard = async (text) => {
  //   try {
  //     await navigator.clipboard.writeText(text);

  //     alert('복사 성공!');
  //   } catch (error) {
  //     alert('복사 실패!');
  //   }
  // };

  const servicePreparing = () => {
    alert('댓글서비스 준비중입니다!');
  };

  const onShare = useCallback(async () => {
    setUrl(`http://localhost:3030/post/${post.id}`);
    // navigator.clipboard.writeText(`${window.location.href}${post.id}`);

    try {
      await navigator.clipboard.writeText(
        `${window.location.href}post/${post.id}`,
      );
      alert('복사 성공!');
    } catch (error) {
      alert('복사 실패!');
    }
  }, [url]);

  return (
    <article className={style.postIcon}>
      <div>
        {/* 좋아요 */}
        {!post.liked ? (
          <div onClick={onLike}>
            <img src="/icon/heartOff.svg" alt="Hearticon" />
          </div>
        ) : post?.liked[0]?.mem_id === me.id ||
          post?.liked?.mem_id === me.id ||
          post?.liked === me.id ? (
          <div onClick={onUnLike}>
            <img src="/icon/heartOn.svg" alt="Hearticon" />
          </div>
        ) : (
          <div onClick={onLike}>
            <img src="/icon/heartOff.svg" alt="Hearticon" />
          </div>
        )}
      </div>

      <div>
        {/* 댓글 */}
        {/* <Link href={`/${post.id}/comment`}> */}
        <a onClick={servicePreparing}>
          <div>
            <img src="/icon/comment.svg" alt="Commenticon" />
          </div>
        </a>
        {/* </Link> */}
      </div>

      <div>
        {/* 공유 */}
        <img src="/icon/share.svg" onClick={onShare} alt="Shareicon" />
      </div>

      <div>
        {/* 저장 */}
        {!post.saved ? (
          <div onClick={onSave}>
            <img src="/icon/saveOff.svg" alt="saveicon" />
          </div>
        ) : post.saved[0]?.mem_id === me.id ||
          post.saved?.mem_id === me.id ||
          post?.liked === me.id ? (
          <div onClick={onUnSave}>
            <img src="/icon/saveOn.svg" alt="saveicon" />
          </div>
        ) : (
          <div onClick={onSave}>
            <img src="/icon/saveOff.svg" alt="saveicon" />
          </div>
        )}
      </div>
    </article>
  );
};

PostIcon.propTypes = {
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

export default PostIcon;
